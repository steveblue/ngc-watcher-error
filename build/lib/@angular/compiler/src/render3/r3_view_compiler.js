/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/render3/r3_view_compiler", ["require", "exports", "tslib", "@angular/compiler/src/compile_metadata", "@angular/compiler/src/compiler_util/expression_converter", "@angular/compiler/src/expression_parser/ast", "@angular/compiler/src/identifiers", "@angular/compiler/src/lifecycle_reflector", "@angular/compiler/src/output/output_ast", "@angular/compiler/src/parse_util", "@angular/compiler/src/selector", "@angular/compiler/src/template_parser/template_ast", "@angular/compiler/src/util", "@angular/compiler/src/render3/r3_identifiers", "@angular/compiler/src/render3/r3_types"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compile_metadata_1 = require("@angular/compiler/src/compile_metadata");
    var expression_converter_1 = require("@angular/compiler/src/compiler_util/expression_converter");
    var ast_1 = require("@angular/compiler/src/expression_parser/ast");
    var identifiers_1 = require("@angular/compiler/src/identifiers");
    var lifecycle_reflector_1 = require("@angular/compiler/src/lifecycle_reflector");
    var o = require("@angular/compiler/src/output/output_ast");
    var parse_util_1 = require("@angular/compiler/src/parse_util");
    var selector_1 = require("@angular/compiler/src/selector");
    var template_ast_1 = require("@angular/compiler/src/template_parser/template_ast");
    var util_1 = require("@angular/compiler/src/util");
    var r3_identifiers_1 = require("@angular/compiler/src/render3/r3_identifiers");
    var r3_types_1 = require("@angular/compiler/src/render3/r3_types");
    /** Name of the context parameter passed into a template function */
    var CONTEXT_NAME = 'ctx';
    /** Name of the creation mode flag passed into a template function */
    var CREATION_MODE_FLAG = 'cm';
    /** Name of the temporary to use during data binding */
    var TEMPORARY_NAME = '_t';
    /** The prefix reference variables */
    var REFERENCE_PREFIX = '_r';
    /** The name of the implicit context reference */
    var IMPLICIT_REFERENCE = '$implicit';
    /** Name of the i18n attributes **/
    var I18N_ATTR = 'i18n';
    var I18N_ATTR_PREFIX = 'i18n-';
    /** I18n separators for metadata **/
    var MEANING_SEPARATOR = '|';
    var ID_SEPARATOR = '@@';
    function compileDirective(outputCtx, directive, reflector, bindingParser, mode) {
        var definitionMapValues = [];
        var field = function (key, value) {
            if (value) {
                definitionMapValues.push({ key: key, value: value, quoted: false });
            }
        };
        // e.g. 'type: MyDirective`
        field('type', outputCtx.importExpr(directive.type.reference));
        // e.g. `selector: [[[null, 'someDir', ''], null]]`
        field('selector', createDirectiveSelector(directive.selector));
        // e.g. `factory: () => new MyApp(injectElementRef())`
        field('factory', createFactory(directive.type, outputCtx, reflector, directive.queries));
        // e.g. `hostBindings: (dirIndex, elIndex) => { ... }
        field('hostBindings', createHostBindingsFunction(directive, outputCtx, bindingParser));
        // e.g. `attributes: ['role', 'listbox']`
        field('attributes', createHostAttributesArray(directive, outputCtx));
        // e.g 'inputs: {a: 'a'}`
        field('inputs', createInputsObject(directive, outputCtx));
        var className = compile_metadata_1.identifierName(directive.type);
        className || util_1.error("Cannot resolver the name of " + directive.type);
        var definitionField = outputCtx.constantPool.propertyNameOf(1 /* Directive */);
        var definitionFunction = o.importExpr(r3_identifiers_1.Identifiers.defineDirective).callFn([o.literalMap(definitionMapValues)]);
        if (mode === 0 /* PartialClass */) {
            // Create the partial class to be merged with the actual class.
            outputCtx.statements.push(new o.ClassStmt(
            /* name */ className, 
            /* parent */ null, 
            /* fields */ [new o.ClassField(
                /* name */ definitionField, 
                /* type */ o.INFERRED_TYPE, 
                /* modifiers */ [o.StmtModifier.Static], 
                /* initializer */ definitionFunction)], 
            /* getters */ [], 
            /* constructorMethod */ new o.ClassMethod(null, [], []), 
            /* methods */ []));
        }
        else {
            // Create back-patch definition.
            var classReference = outputCtx.importExpr(directive.type.reference);
            // Create the back-patch statement
            outputCtx.statements.push(new o.CommentStmt(r3_types_1.BUILD_OPTIMIZER_COLOCATE));
            outputCtx.statements.push(classReference.prop(definitionField).set(definitionFunction).toStmt());
        }
    }
    exports.compileDirective = compileDirective;
    function compileComponent(outputCtx, component, pipes, template, reflector, bindingParser, mode) {
        var definitionMapValues = [];
        var field = function (key, value) {
            if (value) {
                definitionMapValues.push({ key: key, value: value, quoted: false });
            }
        };
        // e.g. `type: MyApp`
        field('type', outputCtx.importExpr(component.type.reference));
        // e.g. `selector: [[['my-app'], null]]`
        field('selector', createDirectiveSelector(component.selector));
        var selector = component.selector && selector_1.CssSelector.parse(component.selector);
        var firstSelector = selector && selector[0];
        // e.g. `attr: ["class", ".my.app"]
        // This is optional an only included if the first selector of a component specifies attributes.
        if (firstSelector) {
            var selectorAttributes = firstSelector.getAttrs();
            if (selectorAttributes.length) {
                field('attrs', outputCtx.constantPool.getConstLiteral(o.literalArr(selectorAttributes.map(function (value) { return value != null ? o.literal(value) : o.literal(undefined); })), 
                /* forceShared */ true));
            }
        }
        // e.g. `factory: function MyApp_Factory() { return new MyApp(injectElementRef()); }`
        field('factory', createFactory(component.type, outputCtx, reflector, component.queries));
        // e.g `hostBindings: function MyApp_HostBindings { ... }
        field('hostBindings', createHostBindingsFunction(component, outputCtx, bindingParser));
        // e.g. `template: function MyComponent_Template(_ctx, _cm) {...}`
        var templateTypeName = component.type.reference.name;
        var templateName = templateTypeName ? templateTypeName + "_Template" : null;
        var pipeMap = new Map(pipes.map(function (pipe) { return [pipe.name, pipe]; }));
        var templateFunctionExpression = new TemplateDefinitionBuilder(outputCtx, outputCtx.constantPool, reflector, CONTEXT_NAME, ROOT_SCOPE.nestedScope(), 0, component.template.ngContentSelectors, templateTypeName, templateName, pipeMap, component.viewQueries)
            .buildTemplateFunction(template, []);
        field('template', templateFunctionExpression);
        // e.g `inputs: {a: 'a'}`
        field('inputs', createInputsObject(component, outputCtx));
        // e.g. `features: [NgOnChangesFeature(MyComponent)]`
        var features = [];
        if (component.type.lifecycleHooks.some(function (lifecycle) { return lifecycle == lifecycle_reflector_1.LifecycleHooks.OnChanges; })) {
            features.push(o.importExpr(r3_identifiers_1.Identifiers.NgOnChangesFeature, null, null).callFn([outputCtx.importExpr(component.type.reference)]));
        }
        if (features.length) {
            field('features', o.literalArr(features));
        }
        var definitionField = outputCtx.constantPool.propertyNameOf(2 /* Component */);
        var definitionFunction = o.importExpr(r3_identifiers_1.Identifiers.defineComponent).callFn([o.literalMap(definitionMapValues)]);
        if (mode === 0 /* PartialClass */) {
            var className = compile_metadata_1.identifierName(component.type);
            className || util_1.error("Cannot resolver the name of " + component.type);
            // Create the partial class to be merged with the actual class.
            outputCtx.statements.push(new o.ClassStmt(
            /* name */ className, 
            /* parent */ null, 
            /* fields */ [new o.ClassField(
                /* name */ definitionField, 
                /* type */ o.INFERRED_TYPE, 
                /* modifiers */ [o.StmtModifier.Static], 
                /* initializer */ definitionFunction)], 
            /* getters */ [], 
            /* constructorMethod */ new o.ClassMethod(null, [], []), 
            /* methods */ []));
        }
        else {
            var classReference = outputCtx.importExpr(component.type.reference);
            // Create the back-patch statement
            outputCtx.statements.push(new o.CommentStmt(r3_types_1.BUILD_OPTIMIZER_COLOCATE), classReference.prop(definitionField).set(definitionFunction).toStmt());
        }
    }
    exports.compileComponent = compileComponent;
    // TODO: Remove these when the things are fully supported
    function unknown(arg) {
        throw new Error("Builder " + this.constructor.name + " is unable to handle " + arg.constructor.name + " yet");
    }
    function unsupported(feature) {
        if (this) {
            throw new Error("Builder " + this.constructor.name + " doesn't support " + feature + " yet");
        }
        throw new Error("Feature " + feature + " is not supported yet");
    }
    var BINDING_INSTRUCTION_MAP = (_a = {},
        _a[template_ast_1.PropertyBindingType.Property] = r3_identifiers_1.Identifiers.elementProperty,
        _a[template_ast_1.PropertyBindingType.Attribute] = r3_identifiers_1.Identifiers.elementAttribute,
        _a[template_ast_1.PropertyBindingType.Class] = r3_identifiers_1.Identifiers.elementClassNamed,
        _a[template_ast_1.PropertyBindingType.Style] = r3_identifiers_1.Identifiers.elementStyleNamed,
        _a);
    function interpolate(args) {
        args = args.slice(1); // Ignore the length prefix added for render2
        switch (args.length) {
            case 3:
                return o.importExpr(r3_identifiers_1.Identifiers.interpolation1).callFn(args);
            case 5:
                return o.importExpr(r3_identifiers_1.Identifiers.interpolation2).callFn(args);
            case 7:
                return o.importExpr(r3_identifiers_1.Identifiers.interpolation3).callFn(args);
            case 9:
                return o.importExpr(r3_identifiers_1.Identifiers.interpolation4).callFn(args);
            case 11:
                return o.importExpr(r3_identifiers_1.Identifiers.interpolation5).callFn(args);
            case 13:
                return o.importExpr(r3_identifiers_1.Identifiers.interpolation6).callFn(args);
            case 15:
                return o.importExpr(r3_identifiers_1.Identifiers.interpolation7).callFn(args);
            case 17:
                return o.importExpr(r3_identifiers_1.Identifiers.interpolation8).callFn(args);
        }
        (args.length >= 19 && args.length % 2 == 1) ||
            util_1.error("Invalid interpolation argument length " + args.length);
        return o.importExpr(r3_identifiers_1.Identifiers.interpolationV).callFn([o.literalArr(args)]);
    }
    function pipeBinding(args) {
        switch (args.length) {
            case 0:
                // The first parameter to pipeBind is always the value to be transformed followed
                // by arg.length arguments so the total number of arguments to pipeBind are
                // arg.length + 1.
                return r3_identifiers_1.Identifiers.pipeBind1;
            case 1:
                return r3_identifiers_1.Identifiers.pipeBind2;
            case 2:
                return r3_identifiers_1.Identifiers.pipeBind3;
            default:
                return r3_identifiers_1.Identifiers.pipeBindV;
        }
    }
    var pureFunctionIdentifiers = [
        r3_identifiers_1.Identifiers.pureFunction0, r3_identifiers_1.Identifiers.pureFunction1, r3_identifiers_1.Identifiers.pureFunction2, r3_identifiers_1.Identifiers.pureFunction3, r3_identifiers_1.Identifiers.pureFunction4,
        r3_identifiers_1.Identifiers.pureFunction5, r3_identifiers_1.Identifiers.pureFunction6, r3_identifiers_1.Identifiers.pureFunction7, r3_identifiers_1.Identifiers.pureFunction8
    ];
    function getLiteralFactory(outputContext, literal) {
        var _a = outputContext.constantPool.getLiteralFactory(literal), literalFactory = _a.literalFactory, literalFactoryArguments = _a.literalFactoryArguments;
        literalFactoryArguments.length > 0 || util_1.error("Expected arguments to a literal factory function");
        var pureFunctionIdent = pureFunctionIdentifiers[literalFactoryArguments.length] || r3_identifiers_1.Identifiers.pureFunctionV;
        // Literal factories are pure functions that only need to be re-invoked when the parameters
        // change.
        return o.importExpr(pureFunctionIdent).callFn(tslib_1.__spread([literalFactory], literalFactoryArguments));
    }
    var BindingScope = /** @class */ (function () {
        function BindingScope(parent) {
            this.parent = parent;
            this.map = new Map();
            this.referenceNameIndex = 0;
        }
        BindingScope.prototype.get = function (name) {
            var current = this;
            while (current) {
                var value = current.map.get(name);
                if (value != null) {
                    // Cache the value locally.
                    this.map.set(name, value);
                    return value;
                }
                current = current.parent;
            }
            return null;
        };
        BindingScope.prototype.set = function (name, value) {
            !this.map.has(name) ||
                util_1.error("The name " + name + " is already defined in scope to be " + this.map.get(name));
            this.map.set(name, value);
            return this;
        };
        BindingScope.prototype.nestedScope = function () { return new BindingScope(this); };
        BindingScope.prototype.freshReferenceName = function () {
            var current = this;
            // Find the top scope as it maintains the global reference count
            while (current.parent)
                current = current.parent;
            var ref = "" + REFERENCE_PREFIX + current.referenceNameIndex++;
            return ref;
        };
        return BindingScope;
    }());
    var ROOT_SCOPE = new BindingScope(null).set('$event', o.variable('$event'));
    var TemplateDefinitionBuilder = /** @class */ (function () {
        function TemplateDefinitionBuilder(outputCtx, constantPool, reflector, contextParameter, bindingScope, level, ngContentSelectors, contextName, templateName, pipes, viewQueries) {
            if (level === void 0) { level = 0; }
            var _this = this;
            this.outputCtx = outputCtx;
            this.constantPool = constantPool;
            this.reflector = reflector;
            this.contextParameter = contextParameter;
            this.bindingScope = bindingScope;
            this.level = level;
            this.ngContentSelectors = ngContentSelectors;
            this.contextName = contextName;
            this.templateName = templateName;
            this.pipes = pipes;
            this.viewQueries = viewQueries;
            this._dataIndex = 0;
            this._bindingContext = 0;
            this._referenceIndex = 0;
            this._temporaryAllocated = false;
            this._prefix = [];
            this._creationMode = [];
            this._bindingMode = [];
            this._hostMode = [];
            this._refreshMode = [];
            this._postfix = [];
            this._projectionDefinitionIndex = 0;
            this.unsupported = unsupported;
            this.invalid = invalid;
            // Whether we are inside a translatable element (`<p i18n>... somewhere here ... </p>)
            this._inI18nSection = false;
            this._i18nSectionIndex = -1;
            // Maps of placeholder to node indexes for each of the i18n section
            this._phToNodeIdxes = [{}];
            // These should be handled in the template or element directly.
            this.visitReference = invalid;
            this.visitVariable = invalid;
            this.visitEvent = invalid;
            this.visitElementProperty = invalid;
            this.visitAttr = invalid;
            // These should be handled in the template or element directly
            this.visitDirective = invalid;
            this.visitDirectiveProperty = invalid;
            this._valueConverter = new ValueConverter(outputCtx, function () { return _this.allocateDataSlot(); }, function (name, localName, slot, value) {
                bindingScope.set(localName, value);
                var pipe = pipes.get(name);
                pipe || util_1.error("Could not find pipe " + name);
                var pipeDefinition = constantPool.getDefinition(pipe.type.reference, 3 /* Pipe */, outputCtx, /* forceShared */ true);
                _this._creationMode.push(o.importExpr(r3_identifiers_1.Identifiers.pipe)
                    .callFn([
                    o.literal(slot), pipeDefinition, pipeDefinition.callMethod(r3_identifiers_1.Identifiers.NEW_METHOD, [])
                ])
                    .toStmt());
            });
        }
        TemplateDefinitionBuilder.prototype.buildTemplateFunction = function (asts, variables) {
            try {
                // Create variable bindings
                for (var variables_1 = tslib_1.__values(variables), variables_1_1 = variables_1.next(); !variables_1_1.done; variables_1_1 = variables_1.next()) {
                    var variable = variables_1_1.value;
                    var variableName = variable.name;
                    var expression = o.variable(this.contextParameter).prop(variable.value || IMPLICIT_REFERENCE);
                    var scopedName = this.bindingScope.freshReferenceName();
                    var declaration = o.variable(scopedName).set(expression).toDeclStmt(o.INFERRED_TYPE, [
                        o.StmtModifier.Final
                    ]);
                    // Add the reference to the local scope.
                    this.bindingScope.set(variableName, o.variable(scopedName));
                    // Declare the local variable in binding mode
                    this._bindingMode.push(declaration);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (variables_1_1 && !variables_1_1.done && (_a = variables_1.return)) _a.call(variables_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // Collect content projections
            if (this.ngContentSelectors && this.ngContentSelectors.length > 0) {
                var contentProjections = getContentProjection(asts, this.ngContentSelectors);
                this._contentProjections = contentProjections;
                if (contentProjections.size > 0) {
                    var infos_1 = [];
                    Array.from(contentProjections.values()).forEach(function (info) {
                        if (info.selector) {
                            infos_1[info.index - 1] = info.selector;
                        }
                    });
                    var projectionIndex = this._projectionDefinitionIndex = this.allocateDataSlot();
                    var parameters = [o.literal(projectionIndex)];
                    !infos_1.some(function (value) { return !value; }) || util_1.error("content project information skipped an index");
                    if (infos_1.length > 1) {
                        parameters.push(this.outputCtx.constantPool.getConstLiteral(asLiteral(infos_1), /* forceShared */ true));
                    }
                    this.instruction.apply(this, tslib_1.__spread([this._creationMode, null, r3_identifiers_1.Identifiers.projectionDef], parameters));
                }
            }
            try {
                // Define and update any view queries
                for (var _b = tslib_1.__values(this.viewQueries), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var query = _c.value;
                    // e.g. r3.Q(0, SomeDirective, true);
                    var querySlot = this.allocateDataSlot();
                    var predicate = getQueryPredicate(query, this.outputCtx);
                    var args = [
                        /* memoryIndex */ o.literal(querySlot, o.INFERRED_TYPE),
                        /* predicate */ predicate,
                        /* descend */ o.literal(query.descendants, o.INFERRED_TYPE)
                    ];
                    if (query.read) {
                        args.push(this.outputCtx.importExpr(query.read.identifier.reference));
                    }
                    this.instruction.apply(this, tslib_1.__spread([this._creationMode, null, r3_identifiers_1.Identifiers.query], args));
                    // (r3.qR(tmp = r3.ɵld(0)) && (ctx.someDir = tmp));
                    var temporary = this.temp();
                    var getQueryList = o.importExpr(r3_identifiers_1.Identifiers.load).callFn([o.literal(querySlot)]);
                    var refresh = o.importExpr(r3_identifiers_1.Identifiers.queryRefresh).callFn([temporary.set(getQueryList)]);
                    var updateDirective = o.variable(CONTEXT_NAME)
                        .prop(query.propertyName)
                        .set(query.first ? temporary.prop('first') : temporary);
                    this._bindingMode.push(refresh.and(updateDirective).toStmt());
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            template_ast_1.templateVisitAll(this, asts);
            var creationMode = this._creationMode.length > 0 ?
                [o.ifStmt(o.variable(CREATION_MODE_FLAG), this._creationMode)] :
                [];
            try {
                // Generate maps of placeholder name to node indexes
                // TODO(vicb): This is a WIP, not fully supported yet
                for (var _e = tslib_1.__values(this._phToNodeIdxes), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var phToNodeIdx = _f.value;
                    if (Object.keys(phToNodeIdx).length > 0) {
                        var scopedName = this.bindingScope.freshReferenceName();
                        var phMap = o.variable(scopedName)
                            .set(mapToExpression(phToNodeIdx, true))
                            .toDeclStmt(o.INFERRED_TYPE, [o.StmtModifier.Final]);
                        this._prefix.push(phMap);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_g = _e.return)) _g.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return o.fn([
                new o.FnParam(this.contextParameter, null), new o.FnParam(CREATION_MODE_FLAG, o.BOOL_TYPE)
            ], tslib_1.__spread(this._prefix, creationMode, this._bindingMode, this._hostMode, this._refreshMode, this._postfix), o.INFERRED_TYPE, null, this.templateName);
            var e_1, _a, e_2, _d, e_3, _g;
        };
        // LocalResolver
        TemplateDefinitionBuilder.prototype.getLocal = function (name) { return this.bindingScope.get(name); };
        // TemplateAstVisitor
        TemplateDefinitionBuilder.prototype.visitNgContent = function (ast) {
            var info = this._contentProjections.get(ast);
            info || util_1.error("Expected " + ast.sourceSpan + " to be included in content projection collection");
            var slot = this.allocateDataSlot();
            var parameters = [o.literal(slot), o.literal(this._projectionDefinitionIndex)];
            if (info.index !== 0) {
                parameters.push(o.literal(info.index));
            }
            this.instruction.apply(this, tslib_1.__spread([this._creationMode, ast.sourceSpan, r3_identifiers_1.Identifiers.projection], parameters));
        };
        TemplateDefinitionBuilder.prototype._computeDirectivesArray = function (directives) {
            var _this = this;
            var directiveIndexMap = new Map();
            var directiveExpressions = directives.filter(function (directive) { return !directive.directive.isComponent; }).map(function (directive) {
                directiveIndexMap.set(directive.directive.type.reference, _this.allocateDataSlot());
                return _this.typeReference(directive.directive.type.reference);
            });
            return {
                directivesArray: directiveExpressions.length ?
                    this.constantPool.getConstLiteral(o.literalArr(directiveExpressions), /* forceShared */ true) :
                    o.literal(null),
                directiveIndexMap: directiveIndexMap
            };
        };
        // TemplateAstVisitor
        TemplateDefinitionBuilder.prototype.visitElement = function (element) {
            var _this = this;
            var elementIndex = this.allocateDataSlot();
            var componentIndex = undefined;
            var referenceDataSlots = new Map();
            var wasInI18nSection = this._inI18nSection;
            var outputAttrs = {};
            var attrI18nMetas = {};
            var i18nMeta = '';
            // Elements inside i18n sections are replaced with placeholders
            // TODO(vicb): nested elements are a WIP in this phase
            if (this._inI18nSection) {
                var phName = element.name.toLowerCase();
                if (!this._phToNodeIdxes[this._i18nSectionIndex][phName]) {
                    this._phToNodeIdxes[this._i18nSectionIndex][phName] = [];
                }
                this._phToNodeIdxes[this._i18nSectionIndex][phName].push(elementIndex);
            }
            try {
                // Handle i18n attributes
                for (var _a = tslib_1.__values(element.attrs), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var attr = _b.value;
                    var name_1 = attr.name;
                    var value = attr.value;
                    if (name_1 === I18N_ATTR) {
                        if (this._inI18nSection) {
                            throw new Error("Could not mark an element as translatable inside of a translatable section");
                        }
                        this._inI18nSection = true;
                        this._i18nSectionIndex++;
                        this._phToNodeIdxes[this._i18nSectionIndex] = {};
                        i18nMeta = value;
                    }
                    else if (name_1.startsWith(I18N_ATTR_PREFIX)) {
                        attrI18nMetas[name_1.slice(I18N_ATTR_PREFIX.length)] = value;
                    }
                    else {
                        outputAttrs[name_1] = value;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
            }
            // Element creation mode
            var component = findComponent(element.directives);
            var nullNode = o.literal(null, o.INFERRED_TYPE);
            var parameters = [o.literal(elementIndex)];
            // Add component type or element tag
            if (component) {
                parameters.push(this.typeReference(component.directive.type.reference));
                componentIndex = this.allocateDataSlot();
            }
            else {
                parameters.push(o.literal(element.name));
            }
            // Add the attributes
            var i18nMessages = [];
            var attributes = [];
            var hasI18nAttr = false;
            Object.getOwnPropertyNames(outputAttrs).forEach(function (name) {
                var value = outputAttrs[name];
                attributes.push(o.literal(name));
                if (attrI18nMetas.hasOwnProperty(name)) {
                    hasI18nAttr = true;
                    var meta = parseI18nMeta(attrI18nMetas[name]);
                    var variable = _this.constantPool.getTranslation(value, meta);
                    attributes.push(variable);
                }
                else {
                    attributes.push(o.literal(value));
                }
            });
            var attrArg = nullNode;
            if (attributes.length > 0) {
                attrArg = hasI18nAttr ? getLiteralFactory(this.outputCtx, o.literalArr(attributes)) :
                    this.constantPool.getConstLiteral(o.literalArr(attributes), true);
            }
            parameters.push(attrArg);
            // Add directives array
            var _d = this._computeDirectivesArray(element.directives), directivesArray = _d.directivesArray, directiveIndexMap = _d.directiveIndexMap;
            parameters.push(directiveIndexMap.size > 0 ? directivesArray : nullNode);
            if (component && componentIndex != null) {
                // Record the data slot for the component
                directiveIndexMap.set(component.directive.type.reference, componentIndex);
            }
            if (element.references && element.references.length > 0) {
                var references = compile_metadata_1.flatten(element.references.map(function (reference) {
                    var slot = _this.allocateDataSlot();
                    referenceDataSlots.set(reference.name, slot);
                    // Generate the update temporary.
                    var variableName = _this.bindingScope.freshReferenceName();
                    _this._bindingMode.push(o.variable(variableName, o.INFERRED_TYPE)
                        .set(o.importExpr(r3_identifiers_1.Identifiers.load).callFn([o.literal(slot)]))
                        .toDeclStmt(o.INFERRED_TYPE, [o.StmtModifier.Final]));
                    _this.bindingScope.set(reference.name, o.variable(variableName));
                    return [reference.name, reference.originalValue];
                })).map(function (value) { return o.literal(value); });
                parameters.push(this.constantPool.getConstLiteral(o.literalArr(references), /* forceShared */ true));
            }
            else {
                parameters.push(nullNode);
            }
            // Remove trailing null nodes as they are implied.
            while (parameters[parameters.length - 1] === nullNode) {
                parameters.pop();
            }
            // Generate the instruction create element instruction
            if (i18nMessages.length > 0) {
                (_e = this._creationMode).push.apply(_e, tslib_1.__spread(i18nMessages));
            }
            this.instruction.apply(this, tslib_1.__spread([this._creationMode, element.sourceSpan, r3_identifiers_1.Identifiers.createElement], parameters));
            var implicit = o.variable(this.contextParameter);
            try {
                // Generate element input bindings
                for (var _f = tslib_1.__values(element.inputs), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var input = _g.value;
                    if (input.isAnimation) {
                        this.unsupported('animations');
                    }
                    var convertedBinding = this.convertPropertyBinding(implicit, input.value);
                    var instruction = BINDING_INSTRUCTION_MAP[input.type];
                    if (instruction) {
                        // TODO(chuckj): runtime: security context?
                        this.instruction(this._bindingMode, input.sourceSpan, instruction, o.literal(elementIndex), o.literal(input.name), convertedBinding);
                    }
                    else {
                        this.unsupported("binding " + template_ast_1.PropertyBindingType[input.type]);
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_h = _f.return)) _h.call(_f);
                }
                finally { if (e_5) throw e_5.error; }
            }
            // Generate directives input bindings
            this._visitDirectives(element.directives, implicit, elementIndex, directiveIndexMap);
            // Traverse element child nodes
            if (this._inI18nSection && element.children.length == 1 &&
                element.children[0] instanceof template_ast_1.TextAst) {
                var text = element.children[0];
                this.visitSingleI18nTextChild(text, i18nMeta);
            }
            else {
                template_ast_1.templateVisitAll(this, element.children);
            }
            // Finish element construction mode.
            this.instruction(this._creationMode, element.endSourceSpan || element.sourceSpan, r3_identifiers_1.Identifiers.elementEnd);
            // Restore the state before exiting this node
            this._inI18nSection = wasInI18nSection;
            var e_4, _c, _e, e_5, _h;
        };
        TemplateDefinitionBuilder.prototype._visitDirectives = function (directives, implicit, nodeIndex, directiveIndexMap) {
            try {
                for (var directives_1 = tslib_1.__values(directives), directives_1_1 = directives_1.next(); !directives_1_1.done; directives_1_1 = directives_1.next()) {
                    var directive = directives_1_1.value;
                    var directiveIndex = directiveIndexMap.get(directive.directive.type.reference);
                    // Creation mode
                    // e.g. D(0, TodoComponentDef.n(), TodoComponentDef);
                    var directiveType = directive.directive.type.reference;
                    var kind = directive.directive.isComponent ? 2 /* Component */ : 1 /* Directive */;
                    try {
                        // Note: *do not cache* calls to this.directiveOf() as the constant pool needs to know if the
                        // node is referenced multiple times to know that it must generate the reference into a
                        // temporary.
                        // Bindings
                        for (var _a = tslib_1.__values(directive.inputs), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var input = _b.value;
                            var convertedBinding = this.convertPropertyBinding(implicit, input.value);
                            this.instruction(this._bindingMode, directive.sourceSpan, r3_identifiers_1.Identifiers.elementProperty, o.literal(nodeIndex), o.literal(input.templateName), o.importExpr(r3_identifiers_1.Identifiers.bind).callFn([convertedBinding]));
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    // e.g. MyDirective.ngDirectiveDef.h(0, 0);
                    this._hostMode.push(this.definitionOf(directiveType, kind)
                        .callMethod(r3_identifiers_1.Identifiers.HOST_BINDING_METHOD, [o.literal(directiveIndex), o.literal(nodeIndex)])
                        .toStmt());
                    // e.g. r(0, 0);
                    this.instruction(this._refreshMode, directive.sourceSpan, r3_identifiers_1.Identifiers.refreshComponent, o.literal(directiveIndex), o.literal(nodeIndex));
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (directives_1_1 && !directives_1_1.done && (_d = directives_1.return)) _d.call(directives_1);
                }
                finally { if (e_7) throw e_7.error; }
            }
            var e_7, _d, e_6, _c;
        };
        // TemplateAstVisitor
        TemplateDefinitionBuilder.prototype.visitEmbeddedTemplate = function (ast) {
            var templateIndex = this.allocateDataSlot();
            var templateRef = this.reflector.resolveExternalReference(identifiers_1.Identifiers.TemplateRef);
            var templateDirective = ast.directives.find(function (directive) { return directive.directive.type.diDeps.some(function (dependency) {
                return dependency.token != null && (compile_metadata_1.tokenReference(dependency.token) == templateRef);
            }); });
            var contextName = this.contextName && templateDirective && templateDirective.directive.type.reference.name ?
                this.contextName + "_" + templateDirective.directive.type.reference.name :
                null;
            var templateName = contextName ? contextName + "_Template_" + templateIndex : "Template_" + templateIndex;
            var templateContext = "ctx" + this.level;
            var _a = this._computeDirectivesArray(ast.directives), directivesArray = _a.directivesArray, directiveIndexMap = _a.directiveIndexMap;
            // e.g. C(1, C1Template)
            this.instruction(this._creationMode, ast.sourceSpan, r3_identifiers_1.Identifiers.containerCreate, o.literal(templateIndex), directivesArray, o.variable(templateName));
            // e.g. Cr(1)
            this.instruction(this._refreshMode, ast.sourceSpan, r3_identifiers_1.Identifiers.containerRefreshStart, o.literal(templateIndex));
            // Generate directives
            this._visitDirectives(ast.directives, o.variable(this.contextParameter), templateIndex, directiveIndexMap);
            // e.g. cr();
            this.instruction(this._refreshMode, ast.sourceSpan, r3_identifiers_1.Identifiers.containerRefreshEnd);
            // Create the template function
            var templateVisitor = new TemplateDefinitionBuilder(this.outputCtx, this.constantPool, this.reflector, templateContext, this.bindingScope.nestedScope(), this.level + 1, this.ngContentSelectors, contextName, templateName, this.pipes, []);
            var templateFunctionExpr = templateVisitor.buildTemplateFunction(ast.children, ast.variables);
            this._postfix.push(templateFunctionExpr.toDeclStmt(templateName, null));
        };
        // TemplateAstVisitor
        TemplateDefinitionBuilder.prototype.visitBoundText = function (ast) {
            var nodeIndex = this.allocateDataSlot();
            // Creation mode
            this.instruction(this._creationMode, ast.sourceSpan, r3_identifiers_1.Identifiers.text, o.literal(nodeIndex));
            // Refresh mode
            this.instruction(this._refreshMode, ast.sourceSpan, r3_identifiers_1.Identifiers.textCreateBound, o.literal(nodeIndex), this.bind(o.variable(CONTEXT_NAME), ast.value, ast.sourceSpan));
        };
        // TemplateAstVisitor
        TemplateDefinitionBuilder.prototype.visitText = function (ast) {
            // Text is defined in creation mode only.
            this.instruction(this._creationMode, ast.sourceSpan, r3_identifiers_1.Identifiers.text, o.literal(this.allocateDataSlot()), o.literal(ast.value));
        };
        // When the content of the element is a single text node the translation can be inlined:
        //
        // `<p i18n="desc|mean">some content</p>`
        // compiles to
        // ```
        // /**
        // * @desc desc
        // * @meaning mean
        // */
        // const MSG_XYZ = goog.getMsg('some content');
        // i0.ɵT(1, MSG_XYZ);
        // ```
        TemplateDefinitionBuilder.prototype.visitSingleI18nTextChild = function (text, i18nMeta) {
            var meta = parseI18nMeta(i18nMeta);
            var variable = this.constantPool.getTranslation(text.value, meta);
            this.instruction(this._creationMode, text.sourceSpan, r3_identifiers_1.Identifiers.text, o.literal(this.allocateDataSlot()), variable);
        };
        TemplateDefinitionBuilder.prototype.allocateDataSlot = function () { return this._dataIndex++; };
        TemplateDefinitionBuilder.prototype.bindingContext = function () { return "" + this._bindingContext++; };
        TemplateDefinitionBuilder.prototype.instruction = function (statements, span, reference) {
            var params = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                params[_i - 3] = arguments[_i];
            }
            statements.push(o.importExpr(reference, null, span).callFn(params, span).toStmt());
        };
        TemplateDefinitionBuilder.prototype.typeReference = function (type) { return this.outputCtx.importExpr(type); };
        TemplateDefinitionBuilder.prototype.definitionOf = function (type, kind) {
            return this.constantPool.getDefinition(type, kind, this.outputCtx);
        };
        TemplateDefinitionBuilder.prototype.temp = function () {
            if (!this._temporaryAllocated) {
                this._prefix.push(new o.DeclareVarStmt(TEMPORARY_NAME, undefined, o.DYNAMIC_TYPE));
                this._temporaryAllocated = true;
            }
            return o.variable(TEMPORARY_NAME);
        };
        TemplateDefinitionBuilder.prototype.convertPropertyBinding = function (implicit, value) {
            var pipesConvertedValue = value.visit(this._valueConverter);
            var convertedPropertyBinding = expression_converter_1.convertPropertyBinding(this, implicit, pipesConvertedValue, this.bindingContext(), expression_converter_1.BindingForm.TrySimple, interpolate);
            (_a = this._refreshMode).push.apply(_a, tslib_1.__spread(convertedPropertyBinding.stmts));
            return convertedPropertyBinding.currValExpr;
            var _a;
        };
        TemplateDefinitionBuilder.prototype.bind = function (implicit, value, sourceSpan) {
            return this.convertPropertyBinding(implicit, value);
        };
        return TemplateDefinitionBuilder;
    }());
    function getQueryPredicate(query, outputCtx) {
        var predicate;
        if (query.selectors.length > 1 || (query.selectors.length == 1 && query.selectors[0].value)) {
            var selectors = query.selectors.map(function (value) { return value.value; });
            selectors.some(function (value) { return !value; }) && util_1.error('Found a type among the string selectors expected');
            predicate = outputCtx.constantPool.getConstLiteral(o.literalArr(selectors.map(function (value) { return o.literal(value); })));
        }
        else if (query.selectors.length == 1) {
            var first = query.selectors[0];
            if (first.identifier) {
                predicate = outputCtx.importExpr(first.identifier.reference);
            }
            else {
                util_1.error('Unexpected query form');
                predicate = o.literal(null);
            }
        }
        else {
            util_1.error('Unexpected query form');
            predicate = o.literal(null);
        }
        return predicate;
    }
    function createFactory(type, outputCtx, reflector, queries) {
        var args = [];
        var elementRef = reflector.resolveExternalReference(identifiers_1.Identifiers.ElementRef);
        var templateRef = reflector.resolveExternalReference(identifiers_1.Identifiers.TemplateRef);
        var viewContainerRef = reflector.resolveExternalReference(identifiers_1.Identifiers.ViewContainerRef);
        try {
            for (var _a = tslib_1.__values(type.diDeps), _b = _a.next(); !_b.done; _b = _a.next()) {
                var dependency = _b.value;
                if (dependency.isValue) {
                    unsupported('value dependencies');
                }
                if (dependency.isHost) {
                    unsupported('host dependencies');
                }
                var token = dependency.token;
                if (token) {
                    var tokenRef = compile_metadata_1.tokenReference(token);
                    if (tokenRef === elementRef) {
                        args.push(o.importExpr(r3_identifiers_1.Identifiers.injectElementRef).callFn([]));
                    }
                    else if (tokenRef === templateRef) {
                        args.push(o.importExpr(r3_identifiers_1.Identifiers.injectTemplateRef).callFn([]));
                    }
                    else if (tokenRef === viewContainerRef) {
                        args.push(o.importExpr(r3_identifiers_1.Identifiers.injectViewContainerRef).callFn([]));
                    }
                    else {
                        var value = token.identifier != null ? outputCtx.importExpr(tokenRef) : o.literal(tokenRef);
                        args.push(o.importExpr(r3_identifiers_1.Identifiers.inject).callFn([value]));
                    }
                }
                else {
                    unsupported('dependency without a token');
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_8) throw e_8.error; }
        }
        var queryDefinitions = [];
        try {
            for (var queries_1 = tslib_1.__values(queries), queries_1_1 = queries_1.next(); !queries_1_1.done; queries_1_1 = queries_1.next()) {
                var query = queries_1_1.value;
                var predicate = getQueryPredicate(query, outputCtx);
                // e.g. r3.Q(null, SomeDirective, false) or r3.Q(null, ['div'], false)
                var parameters = [
                    /* memoryIndex */ o.literal(null, o.INFERRED_TYPE),
                    /* predicate */ predicate,
                    /* descend */ o.literal(query.descendants)
                ];
                if (query.read) {
                    parameters.push(outputCtx.importExpr(query.read.identifier.reference));
                }
                queryDefinitions.push(o.importExpr(r3_identifiers_1.Identifiers.query).callFn(parameters));
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (queries_1_1 && !queries_1_1.done && (_d = queries_1.return)) _d.call(queries_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        var createInstance = new o.InstantiateExpr(outputCtx.importExpr(type.reference), args);
        var result = queryDefinitions.length > 0 ? o.literalArr(tslib_1.__spread([createInstance], queryDefinitions)) :
            createInstance;
        return o.fn([], [new o.ReturnStatement(result)], o.INFERRED_TYPE, null, type.reference.name ? type.reference.name + "_Factory" : null);
        var e_8, _c, e_9, _d;
    }
    exports.createFactory = createFactory;
    // Turn a directive selector into an R3-compatible selector for directive def
    function createDirectiveSelector(selector) {
        return asLiteral(parseSelectorsToR3Selector(selector_1.CssSelector.parse(selector)));
    }
    function createHostAttributesArray(directiveMetadata, outputCtx) {
        var values = [];
        var attributes = directiveMetadata.hostAttributes;
        try {
            for (var _a = tslib_1.__values(Object.getOwnPropertyNames(attributes)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                var value = attributes[key];
                values.push(o.literal(key), o.literal(value));
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_10) throw e_10.error; }
        }
        if (values.length > 0) {
            return outputCtx.constantPool.getConstLiteral(o.literalArr(values));
        }
        return null;
        var e_10, _c;
    }
    // Return a host binding function or null if one is not necessary.
    function createHostBindingsFunction(directiveMetadata, outputCtx, bindingParser) {
        var statements = [];
        var temporary = function () {
            var declared = false;
            return function () {
                if (!declared) {
                    statements.push(new o.DeclareVarStmt(TEMPORARY_NAME, undefined, o.DYNAMIC_TYPE));
                    declared = true;
                }
                return o.variable(TEMPORARY_NAME);
            };
        }();
        var hostBindingSourceSpan = parse_util_1.typeSourceSpan(directiveMetadata.isComponent ? 'Component' : 'Directive', directiveMetadata.type);
        // Calculate the queries
        for (var index = 0; index < directiveMetadata.queries.length; index++) {
            var query = directiveMetadata.queries[index];
            // e.g. r3.qR(tmp = r3.ld(dirIndex)[1]) && (r3.ld(dirIndex)[0].someDir = tmp);
            var getDirectiveMemory = o.importExpr(r3_identifiers_1.Identifiers.load).callFn([o.variable('dirIndex')]);
            // The query list is at the query index + 1 because the directive itself is in slot 0.
            var getQueryList = getDirectiveMemory.key(o.literal(index + 1));
            var assignToTemporary = temporary().set(getQueryList);
            var callQueryRefresh = o.importExpr(r3_identifiers_1.Identifiers.queryRefresh).callFn([assignToTemporary]);
            var updateDirective = getDirectiveMemory.key(o.literal(0, o.INFERRED_TYPE))
                .prop(query.propertyName)
                .set(query.first ? temporary().prop('first') : temporary());
            var andExpression = callQueryRefresh.and(updateDirective);
            statements.push(andExpression.toStmt());
        }
        var directiveSummary = directiveMetadata.toSummary();
        // Calculate the host property bindings
        var bindings = bindingParser.createBoundHostProperties(directiveSummary, hostBindingSourceSpan);
        var bindingContext = o.importExpr(r3_identifiers_1.Identifiers.load).callFn([o.variable('dirIndex')]);
        if (bindings) {
            try {
                for (var bindings_1 = tslib_1.__values(bindings), bindings_1_1 = bindings_1.next(); !bindings_1_1.done; bindings_1_1 = bindings_1.next()) {
                    var binding = bindings_1_1.value;
                    var bindingExpr = expression_converter_1.convertPropertyBinding(null, bindingContext, binding.expression, 'b', expression_converter_1.BindingForm.TrySimple, function () { return util_1.error('Unexpected interpolation'); });
                    statements.push.apply(statements, tslib_1.__spread(bindingExpr.stmts));
                    statements.push(o.importExpr(r3_identifiers_1.Identifiers.elementProperty)
                        .callFn([
                        o.variable('elIndex'), o.literal(binding.name),
                        o.importExpr(r3_identifiers_1.Identifiers.bind).callFn([bindingExpr.currValExpr])
                    ])
                        .toStmt());
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (bindings_1_1 && !bindings_1_1.done && (_a = bindings_1.return)) _a.call(bindings_1);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
        // Calculate host event bindings
        var eventBindings = bindingParser.createDirectiveHostEventAsts(directiveSummary, hostBindingSourceSpan);
        if (eventBindings) {
            try {
                for (var eventBindings_1 = tslib_1.__values(eventBindings), eventBindings_1_1 = eventBindings_1.next(); !eventBindings_1_1.done; eventBindings_1_1 = eventBindings_1.next()) {
                    var binding = eventBindings_1_1.value;
                    var bindingExpr = expression_converter_1.convertActionBinding(null, bindingContext, binding.handler, 'b', function () { return util_1.error('Unexpected interpolation'); });
                    var bindingName = binding.name && compile_metadata_1.sanitizeIdentifier(binding.name);
                    var typeName = compile_metadata_1.identifierName(directiveMetadata.type);
                    var functionName = typeName && bindingName ? typeName + "_" + bindingName + "_HostBindingHandler" : null;
                    var handler = o.fn([new o.FnParam('event', o.DYNAMIC_TYPE)], tslib_1.__spread(bindingExpr.stmts, [new o.ReturnStatement(bindingExpr.allowDefault)]), o.INFERRED_TYPE, null, functionName);
                    statements.push(o.importExpr(r3_identifiers_1.Identifiers.listener).callFn([o.literal(binding.name), handler]).toStmt());
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (eventBindings_1_1 && !eventBindings_1_1.done && (_b = eventBindings_1.return)) _b.call(eventBindings_1);
                }
                finally { if (e_12) throw e_12.error; }
            }
        }
        if (statements.length > 0) {
            var typeName = directiveMetadata.type.reference.name;
            return o.fn([new o.FnParam('dirIndex', o.NUMBER_TYPE), new o.FnParam('elIndex', o.NUMBER_TYPE)], statements, o.INFERRED_TYPE, null, typeName ? typeName + "_HostBindings" : null);
        }
        return null;
        var e_11, _a, e_12, _b;
    }
    function createInputsObject(directive, outputCtx) {
        if (Object.getOwnPropertyNames(directive.inputs).length > 0) {
            return outputCtx.constantPool.getConstLiteral(mapToExpression(directive.inputs));
        }
        return null;
    }
    var ValueConverter = /** @class */ (function (_super) {
        tslib_1.__extends(ValueConverter, _super);
        function ValueConverter(outputCtx, allocateSlot, definePipe) {
            var _this = _super.call(this) || this;
            _this.outputCtx = outputCtx;
            _this.allocateSlot = allocateSlot;
            _this.definePipe = definePipe;
            _this.pipeSlots = new Map();
            return _this;
        }
        // AstMemoryEfficientTransformer
        ValueConverter.prototype.visitPipe = function (ast, context) {
            // Allocate a slot to create the pipe
            var slot = this.pipeSlots.get(ast.name);
            if (slot == null) {
                slot = this.allocateSlot();
                this.pipeSlots.set(ast.name, slot);
            }
            var slotPseudoLocal = "PIPE:" + slot;
            var target = new ast_1.PropertyRead(ast.span, new ast_1.ImplicitReceiver(ast.span), slotPseudoLocal);
            var bindingId = pipeBinding(ast.args);
            this.definePipe(ast.name, slotPseudoLocal, slot, o.importExpr(bindingId));
            var value = ast.exp.visit(this);
            var args = this.visitAll(ast.args);
            return new ast_1.FunctionCall(ast.span, target, tslib_1.__spread([new ast_1.LiteralPrimitive(ast.span, slot), value], args));
        };
        ValueConverter.prototype.visitLiteralArray = function (ast, context) {
            var _this = this;
            return new expression_converter_1.BuiltinFunctionCall(ast.span, this.visitAll(ast.expressions), function (values) {
                // If the literal has calculated (non-literal) elements transform it into
                // calls to literal factories that compose the literal and will cache intermediate
                // values. Otherwise, just return an literal array that contains the values.
                var literal = o.literalArr(values);
                return values.every(function (a) { return a.isConstant(); }) ?
                    _this.outputCtx.constantPool.getConstLiteral(literal, true) :
                    getLiteralFactory(_this.outputCtx, literal);
            });
        };
        ValueConverter.prototype.visitLiteralMap = function (ast, context) {
            var _this = this;
            return new expression_converter_1.BuiltinFunctionCall(ast.span, this.visitAll(ast.values), function (values) {
                // If the literal has calculated (non-literal) elements  transform it into
                // calls to literal factories that compose the literal and will cache intermediate
                // values. Otherwise, just return an literal array that contains the values.
                var literal = o.literalMap(values.map(function (value, index) { return ({ key: ast.keys[index].key, value: value, quoted: ast.keys[index].quoted }); }));
                return values.every(function (a) { return a.isConstant(); }) ?
                    _this.outputCtx.constantPool.getConstLiteral(literal, true) :
                    getLiteralFactory(_this.outputCtx, literal);
            });
        };
        return ValueConverter;
    }(ast_1.AstMemoryEfficientTransformer));
    function invalid(arg) {
        throw new Error("Invalid state: Visitor " + this.constructor.name + " doesn't handle " + o.constructor.name);
    }
    function findComponent(directives) {
        return directives.filter(function (directive) { return directive.directive.isComponent; })[0];
    }
    var ContentProjectionVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(ContentProjectionVisitor, _super);
        function ContentProjectionVisitor(projectionMap, ngContentSelectors) {
            var _this = _super.call(this) || this;
            _this.projectionMap = projectionMap;
            _this.ngContentSelectors = ngContentSelectors;
            _this.index = 1;
            return _this;
        }
        ContentProjectionVisitor.prototype.visitNgContent = function (ast) {
            var selectorText = this.ngContentSelectors[ast.index];
            selectorText != null || util_1.error("could not find selector for index " + ast.index + " in " + ast);
            if (!selectorText || selectorText === '*') {
                this.projectionMap.set(ast, { index: 0 });
            }
            else {
                var cssSelectors = selector_1.CssSelector.parse(selectorText);
                this.projectionMap.set(ast, { index: this.index++, selector: parseSelectorsToR3Selector(cssSelectors) });
            }
        };
        return ContentProjectionVisitor;
    }(template_ast_1.RecursiveTemplateAstVisitor));
    function getContentProjection(asts, ngContentSelectors) {
        var projectIndexMap = new Map();
        var visitor = new ContentProjectionVisitor(projectIndexMap, ngContentSelectors);
        template_ast_1.templateVisitAll(visitor, asts);
        return projectIndexMap;
    }
    function parserSelectorToSimpleSelector(selector) {
        var classes = selector.classNames && selector.classNames.length ? tslib_1.__spread(['class'], selector.classNames) : [];
        return tslib_1.__spread([selector.element], selector.attrs, classes);
    }
    function parserSelectorToR3Selector(selector) {
        var positive = parserSelectorToSimpleSelector(selector);
        var negative = selector.notSelectors && selector.notSelectors.length &&
            parserSelectorToSimpleSelector(selector.notSelectors[0]);
        return negative ? [positive, negative] : [positive, null];
    }
    function parseSelectorsToR3Selector(selectors) {
        return selectors.map(parserSelectorToR3Selector);
    }
    function asLiteral(value) {
        if (Array.isArray(value)) {
            return o.literalArr(value.map(asLiteral));
        }
        return o.literal(value, o.INFERRED_TYPE);
    }
    function mapToExpression(map, quoted) {
        if (quoted === void 0) { quoted = false; }
        return o.literalMap(Object.getOwnPropertyNames(map).map(function (key) { return ({ key: key, quoted: quoted, value: asLiteral(map[key]) }); }));
    }
    // Parse i18n metas like:
    // - "@@id",
    // - "description[@@id]",
    // - "meaning|description[@@id]"
    function parseI18nMeta(i18n) {
        var meaning;
        var description;
        var id;
        if (i18n) {
            // TODO(vicb): figure out how to force a message ID with closure ?
            var idIndex = i18n.indexOf(ID_SEPARATOR);
            var descIndex = i18n.indexOf(MEANING_SEPARATOR);
            var meaningAndDesc = void 0;
            _a = tslib_1.__read((idIndex > -1) ? [i18n.slice(0, idIndex), i18n.slice(idIndex + 2)] : [i18n, ''], 2), meaningAndDesc = _a[0], id = _a[1];
            _b = tslib_1.__read((descIndex > -1) ?
                [meaningAndDesc.slice(0, descIndex), meaningAndDesc.slice(descIndex + 1)] :
                ['', meaningAndDesc], 2), meaning = _b[0], description = _b[1];
        }
        return { description: description, id: id, meaning: meaning };
        var _a, _b;
    }
    var _a;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfdmlld19jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX3ZpZXdfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBRUgsMkVBQXlRO0lBRXpRLGlHQUFzUDtJQUV0UCxtRUFBME47SUFDMU4saUVBQTJDO0lBQzNDLGlGQUFzRDtJQUN0RCwyREFBMEM7SUFDMUMsK0RBQThEO0lBQzlELDJEQUF3QztJQUV4QyxtRkFBd1c7SUFDeFcsbURBQTZDO0lBQzdDLCtFQUFtRDtJQUNuRCxtRUFBZ0U7SUFHaEUsb0VBQW9FO0lBQ3BFLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQztJQUUzQixxRUFBcUU7SUFDckUsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFFaEMsdURBQXVEO0lBQ3ZELElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQztJQUU1QixxQ0FBcUM7SUFDckMsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFFOUIsaURBQWlEO0lBQ2pELElBQU0sa0JBQWtCLEdBQUcsV0FBVyxDQUFDO0lBRXZDLG1DQUFtQztJQUNuQyxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFDekIsSUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7SUFFakMsb0NBQW9DO0lBQ3BDLElBQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDO0lBQzlCLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQztJQUUxQiwwQkFDSSxTQUF3QixFQUFFLFNBQW1DLEVBQUUsU0FBMkIsRUFDMUYsYUFBNEIsRUFBRSxJQUFnQjtRQUNoRCxJQUFNLG1CQUFtQixHQUEwRCxFQUFFLENBQUM7UUFFdEYsSUFBTSxLQUFLLEdBQUcsVUFBQyxHQUFXLEVBQUUsS0FBMEI7WUFDcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENB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QUVELHlCQUF5QixHQUF5QixFQUFFLE1BQWM7UUFBZCx1QkFBQSxFQUFBLGNBQWM7UUFDaEUsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQ2YsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsRUFBQyxHQUFHLEtBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVELHlCQUF5QjtJQUN6QixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLGdDQUFnQztJQUNoQyx1QkFBdUIsSUFBYTtRQUNsQyxJQUFJLE9BQXlCLENBQUM7UUFDOUIsSUFBSSxXQUE2QixDQUFDO1FBQ2xDLElBQUksRUFBb0IsQ0FBQztRQUV6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1Qsa0VBQWtFO1lBQ2xFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFM0MsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2xELElBQUksY0FBYyxTQUFRLENBQUM7WUFDM0IsdUdBQ21GLEVBRGxGLHNCQUFjLEVBQUUsVUFBRSxDQUNpRTtZQUNwRjs7d0NBRXdCLEVBRnZCLGVBQU8sRUFBRSxtQkFBVyxDQUVJO1FBQzNCLENBQUM7UUFFRCxNQUFNLENBQUMsRUFBQyxXQUFXLGFBQUEsRUFBRSxFQUFFLElBQUEsRUFBRSxPQUFPLFNBQUEsRUFBQyxDQUFDOztJQUNwQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgQ29tcGlsZURpcmVjdGl2ZVN1bW1hcnksIENvbXBpbGVQaXBlU3VtbWFyeSwgQ29tcGlsZVF1ZXJ5TWV0YWRhdGEsIENvbXBpbGVUb2tlbk1ldGFkYXRhLCBDb21waWxlVHlwZU1ldGFkYXRhLCBmbGF0dGVuLCBpZGVudGlmaWVyTmFtZSwgcmVuZGVyZXJUeXBlTmFtZSwgc2FuaXRpemVJZGVudGlmaWVyLCB0b2tlblJlZmVyZW5jZSwgdmlld0NsYXNzTmFtZX0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3J9IGZyb20gJy4uL2NvbXBpbGVfcmVmbGVjdG9yJztcbmltcG9ydCB7QmluZGluZ0Zvcm0sIEJ1aWx0aW5Db252ZXJ0ZXIsIEJ1aWx0aW5GdW5jdGlvbkNhbGwsIENvbnZlcnRQcm9wZXJ0eUJpbmRpbmdSZXN1bHQsIEV2ZW50SGFuZGxlclZhcnMsIExvY2FsUmVzb2x2ZXIsIGNvbnZlcnRBY3Rpb25CaW5kaW5nLCBjb252ZXJ0UHJvcGVydHlCaW5kaW5nLCBjb252ZXJ0UHJvcGVydHlCaW5kaW5nQnVpbHRpbnN9IGZyb20gJy4uL2NvbXBpbGVyX3V0aWwvZXhwcmVzc2lvbl9jb252ZXJ0ZXInO1xuaW1wb3J0IHtDb25zdGFudFBvb2wsIERlZmluaXRpb25LaW5kfSBmcm9tICcuLi9jb25zdGFudF9wb29sJztcbmltcG9ydCB7QVNULCBBc3RNZW1vcnlFZmZpY2llbnRUcmFuc2Zvcm1lciwgQXN0VHJhbnNmb3JtZXIsIEJpbmRpbmdQaXBlLCBGdW5jdGlvbkNhbGwsIEltcGxpY2l0UmVjZWl2ZXIsIExpdGVyYWxBcnJheSwgTGl0ZXJhbE1hcCwgTGl0ZXJhbFByaW1pdGl2ZSwgTWV0aG9kQ2FsbCwgUGFyc2VTcGFuLCBQcm9wZXJ0eVJlYWR9IGZyb20gJy4uL2V4cHJlc3Npb25fcGFyc2VyL2FzdCc7XG5pbXBvcnQge0lkZW50aWZpZXJzfSBmcm9tICcuLi9pZGVudGlmaWVycyc7XG5pbXBvcnQge0xpZmVjeWNsZUhvb2tzfSBmcm9tICcuLi9saWZlY3ljbGVfcmVmbGVjdG9yJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtQYXJzZVNvdXJjZVNwYW4sIHR5cGVTb3VyY2VTcGFufSBmcm9tICcuLi9wYXJzZV91dGlsJztcbmltcG9ydCB7Q3NzU2VsZWN0b3J9IGZyb20gJy4uL3NlbGVjdG9yJztcbmltcG9ydCB7QmluZGluZ1BhcnNlcn0gZnJvbSAnLi4vdGVtcGxhdGVfcGFyc2VyL2JpbmRpbmdfcGFyc2VyJztcbmltcG9ydCB7QXR0ckFzdCwgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCwgQm91bmRFbGVtZW50UHJvcGVydHlBc3QsIEJvdW5kRXZlbnRBc3QsIEJvdW5kVGV4dEFzdCwgRGlyZWN0aXZlQXN0LCBFbGVtZW50QXN0LCBFbWJlZGRlZFRlbXBsYXRlQXN0LCBOZ0NvbnRlbnRBc3QsIFByb3BlcnR5QmluZGluZ1R5cGUsIFByb3ZpZGVyQXN0LCBRdWVyeU1hdGNoLCBSZWN1cnNpdmVUZW1wbGF0ZUFzdFZpc2l0b3IsIFJlZmVyZW5jZUFzdCwgVGVtcGxhdGVBc3QsIFRlbXBsYXRlQXN0VmlzaXRvciwgVGV4dEFzdCwgVmFyaWFibGVBc3QsIHRlbXBsYXRlVmlzaXRBbGx9IGZyb20gJy4uL3RlbXBsYXRlX3BhcnNlci90ZW1wbGF0ZV9hc3QnO1xuaW1wb3J0IHtPdXRwdXRDb250ZXh0LCBlcnJvcn0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQge0lkZW50aWZpZXJzIGFzIFIzfSBmcm9tICcuL3IzX2lkZW50aWZpZXJzJztcbmltcG9ydCB7QlVJTERfT1BUSU1JWkVSX0NPTE9DQVRFLCBPdXRwdXRNb2RlfSBmcm9tICcuL3IzX3R5cGVzJztcblxuXG4vKiogTmFtZSBvZiB0aGUgY29udGV4dCBwYXJhbWV0ZXIgcGFzc2VkIGludG8gYSB0ZW1wbGF0ZSBmdW5jdGlvbiAqL1xuY29uc3QgQ09OVEVYVF9OQU1FID0gJ2N0eCc7XG5cbi8qKiBOYW1lIG9mIHRoZSBjcmVhdGlvbiBtb2RlIGZsYWcgcGFzc2VkIGludG8gYSB0ZW1wbGF0ZSBmdW5jdGlvbiAqL1xuY29uc3QgQ1JFQVRJT05fTU9ERV9GTEFHID0gJ2NtJztcblxuLyoqIE5hbWUgb2YgdGhlIHRlbXBvcmFyeSB0byB1c2UgZHVyaW5nIGRhdGEgYmluZGluZyAqL1xuY29uc3QgVEVNUE9SQVJZX05BTUUgPSAnX3QnO1xuXG4vKiogVGhlIHByZWZpeCByZWZlcmVuY2UgdmFyaWFibGVzICovXG5jb25zdCBSRUZFUkVOQ0VfUFJFRklYID0gJ19yJztcblxuLyoqIFRoZSBuYW1lIG9mIHRoZSBpbXBsaWNpdCBjb250ZXh0IHJlZmVyZW5jZSAqL1xuY29uc3QgSU1QTElDSVRfUkVGRVJFTkNFID0gJyRpbXBsaWNpdCc7XG5cbi8qKiBOYW1lIG9mIHRoZSBpMThuIGF0dHJpYnV0ZXMgKiovXG5jb25zdCBJMThOX0FUVFIgPSAnaTE4bic7XG5jb25zdCBJMThOX0FUVFJfUFJFRklYID0gJ2kxOG4tJztcblxuLyoqIEkxOG4gc2VwYXJhdG9ycyBmb3IgbWV0YWRhdGEgKiovXG5jb25zdCBNRUFOSU5HX1NFUEFSQVRPUiA9ICd8JztcbmNvbnN0IElEX1NFUEFSQVRPUiA9ICdAQCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlRGlyZWN0aXZlKFxuICAgIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgZGlyZWN0aXZlOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIHJlZmxlY3RvcjogQ29tcGlsZVJlZmxlY3RvcixcbiAgICBiaW5kaW5nUGFyc2VyOiBCaW5kaW5nUGFyc2VyLCBtb2RlOiBPdXRwdXRNb2RlKSB7XG4gIGNvbnN0IGRlZmluaXRpb25NYXBWYWx1ZXM6IHtrZXk6IHN0cmluZywgcXVvdGVkOiBib29sZWFuLCB2YWx1ZTogby5FeHByZXNzaW9ufVtdID0gW107XG5cbiAgY29uc3QgZmllbGQgPSAoa2V5OiBzdHJpbmcsIHZhbHVlOiBvLkV4cHJlc3Npb24gfCBudWxsKSA9PiB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleSwgdmFsdWUsIHF1b3RlZDogZmFsc2V9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gZS5nLiAndHlwZTogTXlEaXJlY3RpdmVgXG4gIGZpZWxkKCd0eXBlJywgb3V0cHV0Q3R4LmltcG9ydEV4cHIoZGlyZWN0aXZlLnR5cGUucmVmZXJlbmNlKSk7XG5cbiAgLy8gZS5nLiBgc2VsZWN0b3I6IFtbW251bGwsICdzb21lRGlyJywgJyddLCBudWxsXV1gXG4gIGZpZWxkKCdzZWxlY3RvcicsIGNyZWF0ZURpcmVjdGl2ZVNlbGVjdG9yKGRpcmVjdGl2ZS5zZWxlY3RvciAhKSk7XG5cbiAgLy8gZS5nLiBgZmFjdG9yeTogKCkgPT4gbmV3IE15QXBwKGluamVjdEVsZW1lbnRSZWYoKSlgXG4gIGZpZWxkKCdmYWN0b3J5JywgY3JlYXRlRmFjdG9yeShkaXJlY3RpdmUudHlwZSwgb3V0cHV0Q3R4LCByZWZsZWN0b3IsIGRpcmVjdGl2ZS5xdWVyaWVzKSk7XG5cbiAgLy8gZS5nLiBgaG9zdEJpbmRpbmdzOiAoZGlySW5kZXgsIGVsSW5kZXgpID0+IHsgLi4uIH1cbiAgZmllbGQoJ2hvc3RCaW5kaW5ncycsIGNyZWF0ZUhvc3RCaW5kaW5nc0Z1bmN0aW9uKGRpcmVjdGl2ZSwgb3V0cHV0Q3R4LCBiaW5kaW5nUGFyc2VyKSk7XG5cbiAgLy8gZS5nLiBgYXR0cmlidXRlczogWydyb2xlJywgJ2xpc3Rib3gnXWBcbiAgZmllbGQoJ2F0dHJpYnV0ZXMnLCBjcmVhdGVIb3N0QXR0cmlidXRlc0FycmF5KGRpcmVjdGl2ZSwgb3V0cHV0Q3R4KSk7XG5cbiAgLy8gZS5nICdpbnB1dHM6IHthOiAnYSd9YFxuICBmaWVsZCgnaW5wdXRzJywgY3JlYXRlSW5wdXRzT2JqZWN0KGRpcmVjdGl2ZSwgb3V0cHV0Q3R4KSk7XG5cbiAgY29uc3QgY2xhc3NOYW1lID0gaWRlbnRpZmllck5hbWUoZGlyZWN0aXZlLnR5cGUpICE7XG4gIGNsYXNzTmFtZSB8fCBlcnJvcihgQ2Fubm90IHJlc29sdmVyIHRoZSBuYW1lIG9mICR7ZGlyZWN0aXZlLnR5cGV9YCk7XG5cbiAgY29uc3QgZGVmaW5pdGlvbkZpZWxkID0gb3V0cHV0Q3R4LmNvbnN0YW50UG9vbC5wcm9wZXJ0eU5hbWVPZihEZWZpbml0aW9uS2luZC5EaXJlY3RpdmUpO1xuICBjb25zdCBkZWZpbml0aW9uRnVuY3Rpb24gPVxuICAgICAgby5pbXBvcnRFeHByKFIzLmRlZmluZURpcmVjdGl2ZSkuY2FsbEZuKFtvLmxpdGVyYWxNYXAoZGVmaW5pdGlvbk1hcFZhbHVlcyldKTtcblxuICBpZiAobW9kZSA9PT0gT3V0cHV0TW9kZS5QYXJ0aWFsQ2xhc3MpIHtcbiAgICAvLyBDcmVhdGUgdGhlIHBhcnRpYWwgY2xhc3MgdG8gYmUgbWVyZ2VkIHdpdGggdGhlIGFjdHVhbCBjbGFzcy5cbiAgICBvdXRwdXRDdHguc3RhdGVtZW50cy5wdXNoKG5ldyBvLkNsYXNzU3RtdChcbiAgICAgICAgLyogbmFtZSAqLyBjbGFzc05hbWUsXG4gICAgICAgIC8qIHBhcmVudCAqLyBudWxsLFxuICAgICAgICAvKiBmaWVsZHMgKi9bbmV3IG8uQ2xhc3NGaWVsZChcbiAgICAgICAgICAgIC8qIG5hbWUgKi8gZGVmaW5pdGlvbkZpZWxkLFxuICAgICAgICAgICAgLyogdHlwZSAqLyBvLklORkVSUkVEX1RZUEUsXG4gICAgICAgICAgICAvKiBtb2RpZmllcnMgKi9bby5TdG10TW9kaWZpZXIuU3RhdGljXSxcbiAgICAgICAgICAgIC8qIGluaXRpYWxpemVyICovIGRlZmluaXRpb25GdW5jdGlvbildLFxuICAgICAgICAvKiBnZXR0ZXJzICovW10sXG4gICAgICAgIC8qIGNvbnN0cnVjdG9yTWV0aG9kICovIG5ldyBvLkNsYXNzTWV0aG9kKG51bGwsIFtdLCBbXSksXG4gICAgICAgIC8qIG1ldGhvZHMgKi9bXSkpO1xuICB9IGVsc2Uge1xuICAgIC8vIENyZWF0ZSBiYWNrLXBhdGNoIGRlZmluaXRpb24uXG4gICAgY29uc3QgY2xhc3NSZWZlcmVuY2UgPSBvdXRwdXRDdHguaW1wb3J0RXhwcihkaXJlY3RpdmUudHlwZS5yZWZlcmVuY2UpO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBiYWNrLXBhdGNoIHN0YXRlbWVudFxuICAgIG91dHB1dEN0eC5zdGF0ZW1lbnRzLnB1c2gobmV3IG8uQ29tbWVudFN0bXQoQlVJTERfT1BUSU1JWkVSX0NPTE9DQVRFKSk7XG4gICAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChcbiAgICAgICAgY2xhc3NSZWZlcmVuY2UucHJvcChkZWZpbml0aW9uRmllbGQpLnNldChkZWZpbml0aW9uRnVuY3Rpb24pLnRvU3RtdCgpKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZUNvbXBvbmVudChcbiAgICBvdXRwdXRDdHg6IE91dHB1dENvbnRleHQsIGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBwaXBlczogQ29tcGlsZVBpcGVTdW1tYXJ5W10sXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlQXN0W10sIHJlZmxlY3RvcjogQ29tcGlsZVJlZmxlY3RvciwgYmluZGluZ1BhcnNlcjogQmluZGluZ1BhcnNlcixcbiAgICBtb2RlOiBPdXRwdXRNb2RlKSB7XG4gIGNvbnN0IGRlZmluaXRpb25NYXBWYWx1ZXM6IHtrZXk6IHN0cmluZywgcXVvdGVkOiBib29sZWFuLCB2YWx1ZTogby5FeHByZXNzaW9ufVtdID0gW107XG5cbiAgY29uc3QgZmllbGQgPSAoa2V5OiBzdHJpbmcsIHZhbHVlOiBvLkV4cHJlc3Npb24gfCBudWxsKSA9PiB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBkZWZpbml0aW9uTWFwVmFsdWVzLnB1c2goe2tleSwgdmFsdWUsIHF1b3RlZDogZmFsc2V9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gZS5nLiBgdHlwZTogTXlBcHBgXG4gIGZpZWxkKCd0eXBlJywgb3V0cHV0Q3R4LmltcG9ydEV4cHIoY29tcG9uZW50LnR5cGUucmVmZXJlbmNlKSk7XG5cbiAgLy8gZS5nLiBgc2VsZWN0b3I6IFtbWydteS1hcHAnXSwgbnVsbF1dYFxuICBmaWVsZCgnc2VsZWN0b3InLCBjcmVhdGVEaXJlY3RpdmVTZWxlY3Rvcihjb21wb25lbnQuc2VsZWN0b3IgISkpO1xuXG4gIGNvbnN0IHNlbGVjdG9yID0gY29tcG9uZW50LnNlbGVjdG9yICYmIENzc1NlbGVjdG9yLnBhcnNlKGNvbXBvbmVudC5zZWxlY3Rvcik7XG4gIGNvbnN0IGZpcnN0U2VsZWN0b3IgPSBzZWxlY3RvciAmJiBzZWxlY3RvclswXTtcblxuICAvLyBlLmcuIGBhdHRyOiBbXCJjbGFzc1wiLCBcIi5teS5hcHBcIl1cbiAgLy8gVGhpcyBpcyBvcHRpb25hbCBhbiBvbmx5IGluY2x1ZGVkIGlmIHRoZSBmaXJzdCBzZWxlY3RvciBvZiBhIGNvbXBvbmVudCBzcGVjaWZpZXMgYXR0cmlidXRlcy5cbiAgaWYgKGZpcnN0U2VsZWN0b3IpIHtcbiAgICBjb25zdCBzZWxlY3RvckF0dHJpYnV0ZXMgPSBmaXJzdFNlbGVjdG9yLmdldEF0dHJzKCk7XG4gICAgaWYgKHNlbGVjdG9yQXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgIGZpZWxkKFxuICAgICAgICAgICdhdHRycycsIG91dHB1dEN0eC5jb25zdGFudFBvb2wuZ2V0Q29uc3RMaXRlcmFsKFxuICAgICAgICAgICAgICAgICAgICAgICBvLmxpdGVyYWxBcnIoc2VsZWN0b3JBdHRyaWJ1dGVzLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0+IHZhbHVlICE9IG51bGwgPyBvLmxpdGVyYWwodmFsdWUpIDogby5saXRlcmFsKHVuZGVmaW5lZCkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgLyogZm9yY2VTaGFyZWQgKi8gdHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGUuZy4gYGZhY3Rvcnk6IGZ1bmN0aW9uIE15QXBwX0ZhY3RvcnkoKSB7IHJldHVybiBuZXcgTXlBcHAoaW5qZWN0RWxlbWVudFJlZigpKTsgfWBcbiAgZmllbGQoJ2ZhY3RvcnknLCBjcmVhdGVGYWN0b3J5KGNvbXBvbmVudC50eXBlLCBvdXRwdXRDdHgsIHJlZmxlY3RvciwgY29tcG9uZW50LnF1ZXJpZXMpKTtcblxuICAvLyBlLmcgYGhvc3RCaW5kaW5nczogZnVuY3Rpb24gTXlBcHBfSG9zdEJpbmRpbmdzIHsgLi4uIH1cbiAgZmllbGQoJ2hvc3RCaW5kaW5ncycsIGNyZWF0ZUhvc3RCaW5kaW5nc0Z1bmN0aW9uKGNvbXBvbmVudCwgb3V0cHV0Q3R4LCBiaW5kaW5nUGFyc2VyKSk7XG5cbiAgLy8gZS5nLiBgdGVtcGxhdGU6IGZ1bmN0aW9uIE15Q29tcG9uZW50X1RlbXBsYXRlKF9jdHgsIF9jbSkgey4uLn1gXG4gIGNvbnN0IHRlbXBsYXRlVHlwZU5hbWUgPSBjb21wb25lbnQudHlwZS5yZWZlcmVuY2UubmFtZTtcbiAgY29uc3QgdGVtcGxhdGVOYW1lID0gdGVtcGxhdGVUeXBlTmFtZSA/IGAke3RlbXBsYXRlVHlwZU5hbWV9X1RlbXBsYXRlYCA6IG51bGw7XG4gIGNvbnN0IHBpcGVNYXAgPSBuZXcgTWFwKHBpcGVzLm1hcDxbc3RyaW5nLCBDb21waWxlUGlwZVN1bW1hcnldPihwaXBlID0+IFtwaXBlLm5hbWUsIHBpcGVdKSk7XG4gIGNvbnN0IHRlbXBsYXRlRnVuY3Rpb25FeHByZXNzaW9uID1cbiAgICAgIG5ldyBUZW1wbGF0ZURlZmluaXRpb25CdWlsZGVyKFxuICAgICAgICAgIG91dHB1dEN0eCwgb3V0cHV0Q3R4LmNvbnN0YW50UG9vbCwgcmVmbGVjdG9yLCBDT05URVhUX05BTUUsIFJPT1RfU0NPUEUubmVzdGVkU2NvcGUoKSwgMCxcbiAgICAgICAgICBjb21wb25lbnQudGVtcGxhdGUgIS5uZ0NvbnRlbnRTZWxlY3RvcnMsIHRlbXBsYXRlVHlwZU5hbWUsIHRlbXBsYXRlTmFtZSwgcGlwZU1hcCxcbiAgICAgICAgICBjb21wb25lbnQudmlld1F1ZXJpZXMpXG4gICAgICAgICAgLmJ1aWxkVGVtcGxhdGVGdW5jdGlvbih0ZW1wbGF0ZSwgW10pO1xuXG4gIGZpZWxkKCd0ZW1wbGF0ZScsIHRlbXBsYXRlRnVuY3Rpb25FeHByZXNzaW9uKTtcblxuICAvLyBlLmcgYGlucHV0czoge2E6ICdhJ31gXG4gIGZpZWxkKCdpbnB1dHMnLCBjcmVhdGVJbnB1dHNPYmplY3QoY29tcG9uZW50LCBvdXRwdXRDdHgpKTtcblxuICAvLyBlLmcuIGBmZWF0dXJlczogW05nT25DaGFuZ2VzRmVhdHVyZShNeUNvbXBvbmVudCldYFxuICBjb25zdCBmZWF0dXJlczogby5FeHByZXNzaW9uW10gPSBbXTtcbiAgaWYgKGNvbXBvbmVudC50eXBlLmxpZmVjeWNsZUhvb2tzLnNvbWUobGlmZWN5Y2xlID0+IGxpZmVjeWNsZSA9PSBMaWZlY3ljbGVIb29rcy5PbkNoYW5nZXMpKSB7XG4gICAgZmVhdHVyZXMucHVzaChvLmltcG9ydEV4cHIoUjMuTmdPbkNoYW5nZXNGZWF0dXJlLCBudWxsLCBudWxsKS5jYWxsRm4oW291dHB1dEN0eC5pbXBvcnRFeHByKFxuICAgICAgICBjb21wb25lbnQudHlwZS5yZWZlcmVuY2UpXSkpO1xuICB9XG4gIGlmIChmZWF0dXJlcy5sZW5ndGgpIHtcbiAgICBmaWVsZCgnZmVhdHVyZXMnLCBvLmxpdGVyYWxBcnIoZmVhdHVyZXMpKTtcbiAgfVxuXG4gIGNvbnN0IGRlZmluaXRpb25GaWVsZCA9IG91dHB1dEN0eC5jb25zdGFudFBvb2wucHJvcGVydHlOYW1lT2YoRGVmaW5pdGlvbktpbmQuQ29tcG9uZW50KTtcbiAgY29uc3QgZGVmaW5pdGlvbkZ1bmN0aW9uID1cbiAgICAgIG8uaW1wb3J0RXhwcihSMy5kZWZpbmVDb21wb25lbnQpLmNhbGxGbihbby5saXRlcmFsTWFwKGRlZmluaXRpb25NYXBWYWx1ZXMpXSk7XG4gIGlmIChtb2RlID09PSBPdXRwdXRNb2RlLlBhcnRpYWxDbGFzcykge1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGlkZW50aWZpZXJOYW1lKGNvbXBvbmVudC50eXBlKSAhO1xuICAgIGNsYXNzTmFtZSB8fCBlcnJvcihgQ2Fubm90IHJlc29sdmVyIHRoZSBuYW1lIG9mICR7Y29tcG9uZW50LnR5cGV9YCk7XG5cbiAgICAvLyBDcmVhdGUgdGhlIHBhcnRpYWwgY2xhc3MgdG8gYmUgbWVyZ2VkIHdpdGggdGhlIGFjdHVhbCBjbGFzcy5cbiAgICBvdXRwdXRDdHguc3RhdGVtZW50cy5wdXNoKG5ldyBvLkNsYXNzU3RtdChcbiAgICAgICAgLyogbmFtZSAqLyBjbGFzc05hbWUsXG4gICAgICAgIC8qIHBhcmVudCAqLyBudWxsLFxuICAgICAgICAvKiBmaWVsZHMgKi9bbmV3IG8uQ2xhc3NGaWVsZChcbiAgICAgICAgICAgIC8qIG5hbWUgKi8gZGVmaW5pdGlvbkZpZWxkLFxuICAgICAgICAgICAgLyogdHlwZSAqLyBvLklORkVSUkVEX1RZUEUsXG4gICAgICAgICAgICAvKiBtb2RpZmllcnMgKi9bby5TdG10TW9kaWZpZXIuU3RhdGljXSxcbiAgICAgICAgICAgIC8qIGluaXRpYWxpemVyICovIGRlZmluaXRpb25GdW5jdGlvbildLFxuICAgICAgICAvKiBnZXR0ZXJzICovW10sXG4gICAgICAgIC8qIGNvbnN0cnVjdG9yTWV0aG9kICovIG5ldyBvLkNsYXNzTWV0aG9kKG51bGwsIFtdLCBbXSksXG4gICAgICAgIC8qIG1ldGhvZHMgKi9bXSkpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGNsYXNzUmVmZXJlbmNlID0gb3V0cHV0Q3R4LmltcG9ydEV4cHIoY29tcG9uZW50LnR5cGUucmVmZXJlbmNlKTtcblxuICAgIC8vIENyZWF0ZSB0aGUgYmFjay1wYXRjaCBzdGF0ZW1lbnRcbiAgICBvdXRwdXRDdHguc3RhdGVtZW50cy5wdXNoKFxuICAgICAgICBuZXcgby5Db21tZW50U3RtdChCVUlMRF9PUFRJTUlaRVJfQ09MT0NBVEUpLFxuICAgICAgICBjbGFzc1JlZmVyZW5jZS5wcm9wKGRlZmluaXRpb25GaWVsZCkuc2V0KGRlZmluaXRpb25GdW5jdGlvbikudG9TdG10KCkpO1xuICB9XG59XG5cbi8vIFRPRE86IFJlbW92ZSB0aGVzZSB3aGVuIHRoZSB0aGluZ3MgYXJlIGZ1bGx5IHN1cHBvcnRlZFxuZnVuY3Rpb24gdW5rbm93bjxUPihhcmc6IG8uRXhwcmVzc2lvbiB8IG8uU3RhdGVtZW50IHwgVGVtcGxhdGVBc3QpOiBuZXZlciB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBCdWlsZGVyICR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBpcyB1bmFibGUgdG8gaGFuZGxlICR7YXJnLmNvbnN0cnVjdG9yLm5hbWV9IHlldGApO1xufVxuXG5mdW5jdGlvbiB1bnN1cHBvcnRlZChmZWF0dXJlOiBzdHJpbmcpOiBuZXZlciB7XG4gIGlmICh0aGlzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBCdWlsZGVyICR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBkb2Vzbid0IHN1cHBvcnQgJHtmZWF0dXJlfSB5ZXRgKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYEZlYXR1cmUgJHtmZWF0dXJlfSBpcyBub3Qgc3VwcG9ydGVkIHlldGApO1xufVxuXG5jb25zdCBCSU5ESU5HX0lOU1RSVUNUSU9OX01BUDoge1tpbmRleDogbnVtYmVyXTogby5FeHRlcm5hbFJlZmVyZW5jZSB8IHVuZGVmaW5lZH0gPSB7XG4gIFtQcm9wZXJ0eUJpbmRpbmdUeXBlLlByb3BlcnR5XTogUjMuZWxlbWVudFByb3BlcnR5LFxuICBbUHJvcGVydHlCaW5kaW5nVHlwZS5BdHRyaWJ1dGVdOiBSMy5lbGVtZW50QXR0cmlidXRlLFxuICBbUHJvcGVydHlCaW5kaW5nVHlwZS5DbGFzc106IFIzLmVsZW1lbnRDbGFzc05hbWVkLFxuICBbUHJvcGVydHlCaW5kaW5nVHlwZS5TdHlsZV06IFIzLmVsZW1lbnRTdHlsZU5hbWVkXG59O1xuXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZShhcmdzOiBvLkV4cHJlc3Npb25bXSk6IG8uRXhwcmVzc2lvbiB7XG4gIGFyZ3MgPSBhcmdzLnNsaWNlKDEpOyAgLy8gSWdub3JlIHRoZSBsZW5ndGggcHJlZml4IGFkZGVkIGZvciByZW5kZXIyXG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmludGVycG9sYXRpb24xKS5jYWxsRm4oYXJncyk7XG4gICAgY2FzZSA1OlxuICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbnRlcnBvbGF0aW9uMikuY2FsbEZuKGFyZ3MpO1xuICAgIGNhc2UgNzpcbiAgICAgIHJldHVybiBvLmltcG9ydEV4cHIoUjMuaW50ZXJwb2xhdGlvbjMpLmNhbGxGbihhcmdzKTtcbiAgICBjYXNlIDk6XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmludGVycG9sYXRpb240KS5jYWxsRm4oYXJncyk7XG4gICAgY2FzZSAxMTpcbiAgICAgIHJldHVybiBvLmltcG9ydEV4cHIoUjMuaW50ZXJwb2xhdGlvbjUpLmNhbGxGbihhcmdzKTtcbiAgICBjYXNlIDEzOlxuICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbnRlcnBvbGF0aW9uNikuY2FsbEZuKGFyZ3MpO1xuICAgIGNhc2UgMTU6XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmludGVycG9sYXRpb243KS5jYWxsRm4oYXJncyk7XG4gICAgY2FzZSAxNzpcbiAgICAgIHJldHVybiBvLmltcG9ydEV4cHIoUjMuaW50ZXJwb2xhdGlvbjgpLmNhbGxGbihhcmdzKTtcbiAgfVxuICAoYXJncy5sZW5ndGggPj0gMTkgJiYgYXJncy5sZW5ndGggJSAyID09IDEpIHx8XG4gICAgICBlcnJvcihgSW52YWxpZCBpbnRlcnBvbGF0aW9uIGFyZ3VtZW50IGxlbmd0aCAke2FyZ3MubGVuZ3RofWApO1xuICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmludGVycG9sYXRpb25WKS5jYWxsRm4oW28ubGl0ZXJhbEFycihhcmdzKV0pO1xufVxuXG5mdW5jdGlvbiBwaXBlQmluZGluZyhhcmdzOiBvLkV4cHJlc3Npb25bXSk6IG8uRXh0ZXJuYWxSZWZlcmVuY2Uge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgLy8gVGhlIGZpcnN0IHBhcmFtZXRlciB0byBwaXBlQmluZCBpcyBhbHdheXMgdGhlIHZhbHVlIHRvIGJlIHRyYW5zZm9ybWVkIGZvbGxvd2VkXG4gICAgICAvLyBieSBhcmcubGVuZ3RoIGFyZ3VtZW50cyBzbyB0aGUgdG90YWwgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwaXBlQmluZCBhcmVcbiAgICAgIC8vIGFyZy5sZW5ndGggKyAxLlxuICAgICAgcmV0dXJuIFIzLnBpcGVCaW5kMTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gUjMucGlwZUJpbmQyO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBSMy5waXBlQmluZDM7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBSMy5waXBlQmluZFY7XG4gIH1cbn1cblxuY29uc3QgcHVyZUZ1bmN0aW9uSWRlbnRpZmllcnMgPSBbXG4gIFIzLnB1cmVGdW5jdGlvbjAsIFIzLnB1cmVGdW5jdGlvbjEsIFIzLnB1cmVGdW5jdGlvbjIsIFIzLnB1cmVGdW5jdGlvbjMsIFIzLnB1cmVGdW5jdGlvbjQsXG4gIFIzLnB1cmVGdW5jdGlvbjUsIFIzLnB1cmVGdW5jdGlvbjYsIFIzLnB1cmVGdW5jdGlvbjcsIFIzLnB1cmVGdW5jdGlvbjhcbl07XG5mdW5jdGlvbiBnZXRMaXRlcmFsRmFjdG9yeShcbiAgICBvdXRwdXRDb250ZXh0OiBPdXRwdXRDb250ZXh0LCBsaXRlcmFsOiBvLkxpdGVyYWxBcnJheUV4cHIgfCBvLkxpdGVyYWxNYXBFeHByKTogby5FeHByZXNzaW9uIHtcbiAgY29uc3Qge2xpdGVyYWxGYWN0b3J5LCBsaXRlcmFsRmFjdG9yeUFyZ3VtZW50c30gPVxuICAgICAgb3V0cHV0Q29udGV4dC5jb25zdGFudFBvb2wuZ2V0TGl0ZXJhbEZhY3RvcnkobGl0ZXJhbCk7XG4gIGxpdGVyYWxGYWN0b3J5QXJndW1lbnRzLmxlbmd0aCA+IDAgfHwgZXJyb3IoYEV4cGVjdGVkIGFyZ3VtZW50cyB0byBhIGxpdGVyYWwgZmFjdG9yeSBmdW5jdGlvbmApO1xuICBsZXQgcHVyZUZ1bmN0aW9uSWRlbnQgPVxuICAgICAgcHVyZUZ1bmN0aW9uSWRlbnRpZmllcnNbbGl0ZXJhbEZhY3RvcnlBcmd1bWVudHMubGVuZ3RoXSB8fCBSMy5wdXJlRnVuY3Rpb25WO1xuXG4gIC8vIExpdGVyYWwgZmFjdG9yaWVzIGFyZSBwdXJlIGZ1bmN0aW9ucyB0aGF0IG9ubHkgbmVlZCB0byBiZSByZS1pbnZva2VkIHdoZW4gdGhlIHBhcmFtZXRlcnNcbiAgLy8gY2hhbmdlLlxuICByZXR1cm4gby5pbXBvcnRFeHByKHB1cmVGdW5jdGlvbklkZW50KS5jYWxsRm4oW2xpdGVyYWxGYWN0b3J5LCAuLi5saXRlcmFsRmFjdG9yeUFyZ3VtZW50c10pO1xufVxuXG5jbGFzcyBCaW5kaW5nU2NvcGUge1xuICBwcml2YXRlIG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBvLkV4cHJlc3Npb24+KCk7XG4gIHByaXZhdGUgcmVmZXJlbmNlTmFtZUluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmVudDogQmluZGluZ1Njb3BlfG51bGwpIHt9XG5cbiAgZ2V0KG5hbWU6IHN0cmluZyk6IG8uRXhwcmVzc2lvbnxudWxsIHtcbiAgICBsZXQgY3VycmVudDogQmluZGluZ1Njb3BlfG51bGwgPSB0aGlzO1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnQubWFwLmdldChuYW1lKTtcbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIC8vIENhY2hlIHRoZSB2YWx1ZSBsb2NhbGx5LlxuICAgICAgICB0aGlzLm1hcC5zZXQobmFtZSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IG8uRXhwcmVzc2lvbik6IEJpbmRpbmdTY29wZSB7XG4gICAgIXRoaXMubWFwLmhhcyhuYW1lKSB8fFxuICAgICAgICBlcnJvcihgVGhlIG5hbWUgJHtuYW1lfSBpcyBhbHJlYWR5IGRlZmluZWQgaW4gc2NvcGUgdG8gYmUgJHt0aGlzLm1hcC5nZXQobmFtZSl9YCk7XG4gICAgdGhpcy5tYXAuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5lc3RlZFNjb3BlKCk6IEJpbmRpbmdTY29wZSB7IHJldHVybiBuZXcgQmluZGluZ1Njb3BlKHRoaXMpOyB9XG5cbiAgZnJlc2hSZWZlcmVuY2VOYW1lKCk6IHN0cmluZyB7XG4gICAgbGV0IGN1cnJlbnQ6IEJpbmRpbmdTY29wZSA9IHRoaXM7XG4gICAgLy8gRmluZCB0aGUgdG9wIHNjb3BlIGFzIGl0IG1haW50YWlucyB0aGUgZ2xvYmFsIHJlZmVyZW5jZSBjb3VudFxuICAgIHdoaWxlIChjdXJyZW50LnBhcmVudCkgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgIGNvbnN0IHJlZiA9IGAke1JFRkVSRU5DRV9QUkVGSVh9JHtjdXJyZW50LnJlZmVyZW5jZU5hbWVJbmRleCsrfWA7XG4gICAgcmV0dXJuIHJlZjtcbiAgfVxufVxuXG5jb25zdCBST09UX1NDT1BFID0gbmV3IEJpbmRpbmdTY29wZShudWxsKS5zZXQoJyRldmVudCcsIG8udmFyaWFibGUoJyRldmVudCcpKTtcblxuY2xhc3MgVGVtcGxhdGVEZWZpbml0aW9uQnVpbGRlciBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0VmlzaXRvciwgTG9jYWxSZXNvbHZlciB7XG4gIHByaXZhdGUgX2RhdGFJbmRleCA9IDA7XG4gIHByaXZhdGUgX2JpbmRpbmdDb250ZXh0ID0gMDtcbiAgcHJpdmF0ZSBfcmVmZXJlbmNlSW5kZXggPSAwO1xuICBwcml2YXRlIF90ZW1wb3JhcnlBbGxvY2F0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcHJlZml4OiBvLlN0YXRlbWVudFtdID0gW107XG4gIHByaXZhdGUgX2NyZWF0aW9uTW9kZTogby5TdGF0ZW1lbnRbXSA9IFtdO1xuICBwcml2YXRlIF9iaW5kaW5nTW9kZTogby5TdGF0ZW1lbnRbXSA9IFtdO1xuICBwcml2YXRlIF9ob3N0TW9kZTogby5TdGF0ZW1lbnRbXSA9IFtdO1xuICBwcml2YXRlIF9yZWZyZXNoTW9kZTogby5TdGF0ZW1lbnRbXSA9IFtdO1xuICBwcml2YXRlIF9wb3N0Zml4OiBvLlN0YXRlbWVudFtdID0gW107XG4gIHByaXZhdGUgX2NvbnRlbnRQcm9qZWN0aW9uczogTWFwPE5nQ29udGVudEFzdCwgTmdDb250ZW50SW5mbz47XG4gIHByaXZhdGUgX3Byb2plY3Rpb25EZWZpbml0aW9uSW5kZXggPSAwO1xuICBwcml2YXRlIF92YWx1ZUNvbnZlcnRlcjogVmFsdWVDb252ZXJ0ZXI7XG4gIHByaXZhdGUgdW5zdXBwb3J0ZWQgPSB1bnN1cHBvcnRlZDtcbiAgcHJpdmF0ZSBpbnZhbGlkID0gaW52YWxpZDtcblxuICAvLyBXaGV0aGVyIHdlIGFyZSBpbnNpZGUgYSB0cmFuc2xhdGFibGUgZWxlbWVudCAoYDxwIGkxOG4+Li4uIHNvbWV3aGVyZSBoZXJlIC4uLiA8L3A+KVxuICBwcml2YXRlIF9pbkkxOG5TZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2kxOG5TZWN0aW9uSW5kZXggPSAtMTtcbiAgLy8gTWFwcyBvZiBwbGFjZWhvbGRlciB0byBub2RlIGluZGV4ZXMgZm9yIGVhY2ggb2YgdGhlIGkxOG4gc2VjdGlvblxuICBwcml2YXRlIF9waFRvTm9kZUlkeGVzOiB7W3BoTmFtZTogc3RyaW5nXTogbnVtYmVyW119W10gPSBbe31dO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBvdXRwdXRDdHg6IE91dHB1dENvbnRleHQsIHByaXZhdGUgY29uc3RhbnRQb29sOiBDb25zdGFudFBvb2wsXG4gICAgICBwcml2YXRlIHJlZmxlY3RvcjogQ29tcGlsZVJlZmxlY3RvciwgcHJpdmF0ZSBjb250ZXh0UGFyYW1ldGVyOiBzdHJpbmcsXG4gICAgICBwcml2YXRlIGJpbmRpbmdTY29wZTogQmluZGluZ1Njb3BlLCBwcml2YXRlIGxldmVsID0gMCwgcHJpdmF0ZSBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdLFxuICAgICAgcHJpdmF0ZSBjb250ZXh0TmFtZTogc3RyaW5nfG51bGwsIHByaXZhdGUgdGVtcGxhdGVOYW1lOiBzdHJpbmd8bnVsbCxcbiAgICAgIHByaXZhdGUgcGlwZXM6IE1hcDxzdHJpbmcsIENvbXBpbGVQaXBlU3VtbWFyeT4sIHByaXZhdGUgdmlld1F1ZXJpZXM6IENvbXBpbGVRdWVyeU1ldGFkYXRhW10pIHtcbiAgICB0aGlzLl92YWx1ZUNvbnZlcnRlciA9IG5ldyBWYWx1ZUNvbnZlcnRlcihcbiAgICAgICAgb3V0cHV0Q3R4LCAoKSA9PiB0aGlzLmFsbG9jYXRlRGF0YVNsb3QoKSwgKG5hbWUsIGxvY2FsTmFtZSwgc2xvdCwgdmFsdWUpID0+IHtcbiAgICAgICAgICBiaW5kaW5nU2NvcGUuc2V0KGxvY2FsTmFtZSwgdmFsdWUpO1xuICAgICAgICAgIGNvbnN0IHBpcGUgPSBwaXBlcy5nZXQobmFtZSkgITtcbiAgICAgICAgICBwaXBlIHx8IGVycm9yKGBDb3VsZCBub3QgZmluZCBwaXBlICR7bmFtZX1gKTtcbiAgICAgICAgICBjb25zdCBwaXBlRGVmaW5pdGlvbiA9IGNvbnN0YW50UG9vbC5nZXREZWZpbml0aW9uKFxuICAgICAgICAgICAgICBwaXBlLnR5cGUucmVmZXJlbmNlLCBEZWZpbml0aW9uS2luZC5QaXBlLCBvdXRwdXRDdHgsIC8qIGZvcmNlU2hhcmVkICovIHRydWUpO1xuICAgICAgICAgIHRoaXMuX2NyZWF0aW9uTW9kZS5wdXNoKFxuICAgICAgICAgICAgICBvLmltcG9ydEV4cHIoUjMucGlwZSlcbiAgICAgICAgICAgICAgICAgIC5jYWxsRm4oW1xuICAgICAgICAgICAgICAgICAgICBvLmxpdGVyYWwoc2xvdCksIHBpcGVEZWZpbml0aW9uLCBwaXBlRGVmaW5pdGlvbi5jYWxsTWV0aG9kKFIzLk5FV19NRVRIT0QsIFtdKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIC50b1N0bXQoKSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgYnVpbGRUZW1wbGF0ZUZ1bmN0aW9uKGFzdHM6IFRlbXBsYXRlQXN0W10sIHZhcmlhYmxlczogVmFyaWFibGVBc3RbXSk6IG8uRnVuY3Rpb25FeHByIHtcbiAgICAvLyBDcmVhdGUgdmFyaWFibGUgYmluZGluZ3NcbiAgICBmb3IgKGNvbnN0IHZhcmlhYmxlIG9mIHZhcmlhYmxlcykge1xuICAgICAgY29uc3QgdmFyaWFibGVOYW1lID0gdmFyaWFibGUubmFtZTtcbiAgICAgIGNvbnN0IGV4cHJlc3Npb24gPVxuICAgICAgICAgIG8udmFyaWFibGUodGhpcy5jb250ZXh0UGFyYW1ldGVyKS5wcm9wKHZhcmlhYmxlLnZhbHVlIHx8IElNUExJQ0lUX1JFRkVSRU5DRSk7XG4gICAgICBjb25zdCBzY29wZWROYW1lID0gdGhpcy5iaW5kaW5nU2NvcGUuZnJlc2hSZWZlcmVuY2VOYW1lKCk7XG4gICAgICBjb25zdCBkZWNsYXJhdGlvbiA9IG8udmFyaWFibGUoc2NvcGVkTmFtZSkuc2V0KGV4cHJlc3Npb24pLnRvRGVjbFN0bXQoby5JTkZFUlJFRF9UWVBFLCBbXG4gICAgICAgIG8uU3RtdE1vZGlmaWVyLkZpbmFsXG4gICAgICBdKTtcblxuICAgICAgLy8gQWRkIHRoZSByZWZlcmVuY2UgdG8gdGhlIGxvY2FsIHNjb3BlLlxuICAgICAgdGhpcy5iaW5kaW5nU2NvcGUuc2V0KHZhcmlhYmxlTmFtZSwgby52YXJpYWJsZShzY29wZWROYW1lKSk7XG5cbiAgICAgIC8vIERlY2xhcmUgdGhlIGxvY2FsIHZhcmlhYmxlIGluIGJpbmRpbmcgbW9kZVxuICAgICAgdGhpcy5fYmluZGluZ01vZGUucHVzaChkZWNsYXJhdGlvbik7XG4gICAgfVxuXG4gICAgLy8gQ29sbGVjdCBjb250ZW50IHByb2plY3Rpb25zXG4gICAgaWYgKHRoaXMubmdDb250ZW50U2VsZWN0b3JzICYmIHRoaXMubmdDb250ZW50U2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNvbnRlbnRQcm9qZWN0aW9ucyA9IGdldENvbnRlbnRQcm9qZWN0aW9uKGFzdHMsIHRoaXMubmdDb250ZW50U2VsZWN0b3JzKTtcbiAgICAgIHRoaXMuX2NvbnRlbnRQcm9qZWN0aW9ucyA9IGNvbnRlbnRQcm9qZWN0aW9ucztcbiAgICAgIGlmIChjb250ZW50UHJvamVjdGlvbnMuc2l6ZSA+IDApIHtcbiAgICAgICAgY29uc3QgaW5mb3M6IFIzQ3NzU2VsZWN0b3JbXSA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKGNvbnRlbnRQcm9qZWN0aW9ucy52YWx1ZXMoKSkuZm9yRWFjaChpbmZvID0+IHtcbiAgICAgICAgICBpZiAoaW5mby5zZWxlY3Rvcikge1xuICAgICAgICAgICAgaW5mb3NbaW5mby5pbmRleCAtIDFdID0gaW5mby5zZWxlY3RvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwcm9qZWN0aW9uSW5kZXggPSB0aGlzLl9wcm9qZWN0aW9uRGVmaW5pdGlvbkluZGV4ID0gdGhpcy5hbGxvY2F0ZURhdGFTbG90KCk7XG4gICAgICAgIGNvbnN0IHBhcmFtZXRlcnM6IG8uRXhwcmVzc2lvbltdID0gW28ubGl0ZXJhbChwcm9qZWN0aW9uSW5kZXgpXTtcbiAgICAgICAgIWluZm9zLnNvbWUodmFsdWUgPT4gIXZhbHVlKSB8fCBlcnJvcihgY29udGVudCBwcm9qZWN0IGluZm9ybWF0aW9uIHNraXBwZWQgYW4gaW5kZXhgKTtcbiAgICAgICAgaWYgKGluZm9zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBwYXJhbWV0ZXJzLnB1c2godGhpcy5vdXRwdXRDdHguY29uc3RhbnRQb29sLmdldENvbnN0TGl0ZXJhbChcbiAgICAgICAgICAgICAgYXNMaXRlcmFsKGluZm9zKSwgLyogZm9yY2VTaGFyZWQgKi8gdHJ1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb24odGhpcy5fY3JlYXRpb25Nb2RlLCBudWxsLCBSMy5wcm9qZWN0aW9uRGVmLCAuLi5wYXJhbWV0ZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgYW5kIHVwZGF0ZSBhbnkgdmlldyBxdWVyaWVzXG4gICAgZm9yIChsZXQgcXVlcnkgb2YgdGhpcy52aWV3UXVlcmllcykge1xuICAgICAgLy8gZS5nLiByMy5RKDAsIFNvbWVEaXJlY3RpdmUsIHRydWUpO1xuICAgICAgY29uc3QgcXVlcnlTbG90ID0gdGhpcy5hbGxvY2F0ZURhdGFTbG90KCk7XG4gICAgICBjb25zdCBwcmVkaWNhdGUgPSBnZXRRdWVyeVByZWRpY2F0ZShxdWVyeSwgdGhpcy5vdXRwdXRDdHgpO1xuICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgLyogbWVtb3J5SW5kZXggKi8gby5saXRlcmFsKHF1ZXJ5U2xvdCwgby5JTkZFUlJFRF9UWVBFKSxcbiAgICAgICAgLyogcHJlZGljYXRlICovIHByZWRpY2F0ZSxcbiAgICAgICAgLyogZGVzY2VuZCAqLyBvLmxpdGVyYWwocXVlcnkuZGVzY2VuZGFudHMsIG8uSU5GRVJSRURfVFlQRSlcbiAgICAgIF07XG5cbiAgICAgIGlmIChxdWVyeS5yZWFkKSB7XG4gICAgICAgIGFyZ3MucHVzaCh0aGlzLm91dHB1dEN0eC5pbXBvcnRFeHByKHF1ZXJ5LnJlYWQuaWRlbnRpZmllciAhLnJlZmVyZW5jZSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5pbnN0cnVjdGlvbih0aGlzLl9jcmVhdGlvbk1vZGUsIG51bGwsIFIzLnF1ZXJ5LCAuLi5hcmdzKTtcblxuICAgICAgLy8gKHIzLnFSKHRtcCA9IHIzLsm1bGQoMCkpICYmIChjdHguc29tZURpciA9IHRtcCkpO1xuICAgICAgY29uc3QgdGVtcG9yYXJ5ID0gdGhpcy50ZW1wKCk7XG4gICAgICBjb25zdCBnZXRRdWVyeUxpc3QgPSBvLmltcG9ydEV4cHIoUjMubG9hZCkuY2FsbEZuKFtvLmxpdGVyYWwocXVlcnlTbG90KV0pO1xuICAgICAgY29uc3QgcmVmcmVzaCA9IG8uaW1wb3J0RXhwcihSMy5xdWVyeVJlZnJlc2gpLmNhbGxGbihbdGVtcG9yYXJ5LnNldChnZXRRdWVyeUxpc3QpXSk7XG4gICAgICBjb25zdCB1cGRhdGVEaXJlY3RpdmUgPSBvLnZhcmlhYmxlKENPTlRFWFRfTkFNRSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcChxdWVyeS5wcm9wZXJ0eU5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldChxdWVyeS5maXJzdCA/IHRlbXBvcmFyeS5wcm9wKCdmaXJzdCcpIDogdGVtcG9yYXJ5KTtcbiAgICAgIHRoaXMuX2JpbmRpbmdNb2RlLnB1c2gocmVmcmVzaC5hbmQodXBkYXRlRGlyZWN0aXZlKS50b1N0bXQoKSk7XG4gICAgfVxuXG4gICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBhc3RzKTtcblxuICAgIGNvbnN0IGNyZWF0aW9uTW9kZSA9IHRoaXMuX2NyZWF0aW9uTW9kZS5sZW5ndGggPiAwID9cbiAgICAgICAgW28uaWZTdG10KG8udmFyaWFibGUoQ1JFQVRJT05fTU9ERV9GTEFHKSwgdGhpcy5fY3JlYXRpb25Nb2RlKV0gOlxuICAgICAgICBbXTtcblxuICAgIC8vIEdlbmVyYXRlIG1hcHMgb2YgcGxhY2Vob2xkZXIgbmFtZSB0byBub2RlIGluZGV4ZXNcbiAgICAvLyBUT0RPKHZpY2IpOiBUaGlzIGlzIGEgV0lQLCBub3QgZnVsbHkgc3VwcG9ydGVkIHlldFxuICAgIGZvciAoY29uc3QgcGhUb05vZGVJZHggb2YgdGhpcy5fcGhUb05vZGVJZHhlcykge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHBoVG9Ob2RlSWR4KS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHNjb3BlZE5hbWUgPSB0aGlzLmJpbmRpbmdTY29wZS5mcmVzaFJlZmVyZW5jZU5hbWUoKTtcbiAgICAgICAgY29uc3QgcGhNYXAgPSBvLnZhcmlhYmxlKHNjb3BlZE5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQobWFwVG9FeHByZXNzaW9uKHBoVG9Ob2RlSWR4LCB0cnVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvRGVjbFN0bXQoby5JTkZFUlJFRF9UWVBFLCBbby5TdG10TW9kaWZpZXIuRmluYWxdKTtcblxuICAgICAgICB0aGlzLl9wcmVmaXgucHVzaChwaE1hcCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG8uZm4oXG4gICAgICAgIFtcbiAgICAgICAgICBuZXcgby5GblBhcmFtKHRoaXMuY29udGV4dFBhcmFtZXRlciwgbnVsbCksIG5ldyBvLkZuUGFyYW0oQ1JFQVRJT05fTU9ERV9GTEFHLCBvLkJPT0xfVFlQRSlcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIC8vIFRlbXBvcmFyeSB2YXJpYWJsZSBkZWNsYXJhdGlvbnMgKGkuZS4gbGV0IF90OiBhbnk7KVxuICAgICAgICAgIC4uLnRoaXMuX3ByZWZpeCxcbiAgICAgICAgICAvLyBDcmVhdGluZyBtb2RlIChpLmUuIGlmIChjbSkgeyAuLi4gfSlcbiAgICAgICAgICAuLi5jcmVhdGlvbk1vZGUsXG4gICAgICAgICAgLy8gQmluZGluZyBtb2RlIChpLmUuIMm1cCguLi4pKVxuICAgICAgICAgIC4uLnRoaXMuX2JpbmRpbmdNb2RlLFxuICAgICAgICAgIC8vIEhvc3QgbW9kZSAoaS5lLiBDb21wLmgoLi4uKSlcbiAgICAgICAgICAuLi50aGlzLl9ob3N0TW9kZSxcbiAgICAgICAgICAvLyBSZWZyZXNoIG1vZGUgKGkuZS4gQ29tcC5yKC4uLikpXG4gICAgICAgICAgLi4udGhpcy5fcmVmcmVzaE1vZGUsXG4gICAgICAgICAgLy8gTmVzdGVkIHRlbXBsYXRlcyAoaS5lLiBmdW5jdGlvbiBDb21wVGVtcGxhdGUoKSB7fSlcbiAgICAgICAgICAuLi50aGlzLl9wb3N0Zml4XG4gICAgICAgIF0sXG4gICAgICAgIG8uSU5GRVJSRURfVFlQRSwgbnVsbCwgdGhpcy50ZW1wbGF0ZU5hbWUpO1xuICB9XG5cbiAgLy8gTG9jYWxSZXNvbHZlclxuICBnZXRMb2NhbChuYW1lOiBzdHJpbmcpOiBvLkV4cHJlc3Npb258bnVsbCB7IHJldHVybiB0aGlzLmJpbmRpbmdTY29wZS5nZXQobmFtZSk7IH1cblxuICAvLyBUZW1wbGF0ZUFzdFZpc2l0b3JcbiAgdmlzaXROZ0NvbnRlbnQoYXN0OiBOZ0NvbnRlbnRBc3QpIHtcbiAgICBjb25zdCBpbmZvID0gdGhpcy5fY29udGVudFByb2plY3Rpb25zLmdldChhc3QpICE7XG4gICAgaW5mbyB8fCBlcnJvcihgRXhwZWN0ZWQgJHthc3Quc291cmNlU3Bhbn0gdG8gYmUgaW5jbHVkZWQgaW4gY29udGVudCBwcm9qZWN0aW9uIGNvbGxlY3Rpb25gKTtcbiAgICBjb25zdCBzbG90ID0gdGhpcy5hbGxvY2F0ZURhdGFTbG90KCk7XG4gICAgY29uc3QgcGFyYW1ldGVycyA9IFtvLmxpdGVyYWwoc2xvdCksIG8ubGl0ZXJhbCh0aGlzLl9wcm9qZWN0aW9uRGVmaW5pdGlvbkluZGV4KV07XG4gICAgaWYgKGluZm8uaW5kZXggIT09IDApIHtcbiAgICAgIHBhcmFtZXRlcnMucHVzaChvLmxpdGVyYWwoaW5mby5pbmRleCkpO1xuICAgIH1cbiAgICB0aGlzLmluc3RydWN0aW9uKHRoaXMuX2NyZWF0aW9uTW9kZSwgYXN0LnNvdXJjZVNwYW4sIFIzLnByb2plY3Rpb24sIC4uLnBhcmFtZXRlcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcHV0ZURpcmVjdGl2ZXNBcnJheShkaXJlY3RpdmVzOiBEaXJlY3RpdmVBc3RbXSkge1xuICAgIGNvbnN0IGRpcmVjdGl2ZUluZGV4TWFwID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcbiAgICBjb25zdCBkaXJlY3RpdmVFeHByZXNzaW9uczogby5FeHByZXNzaW9uW10gPVxuICAgICAgICBkaXJlY3RpdmVzLmZpbHRlcihkaXJlY3RpdmUgPT4gIWRpcmVjdGl2ZS5kaXJlY3RpdmUuaXNDb21wb25lbnQpLm1hcChkaXJlY3RpdmUgPT4ge1xuICAgICAgICAgIGRpcmVjdGl2ZUluZGV4TWFwLnNldChkaXJlY3RpdmUuZGlyZWN0aXZlLnR5cGUucmVmZXJlbmNlLCB0aGlzLmFsbG9jYXRlRGF0YVNsb3QoKSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudHlwZVJlZmVyZW5jZShkaXJlY3RpdmUuZGlyZWN0aXZlLnR5cGUucmVmZXJlbmNlKTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRpcmVjdGl2ZXNBcnJheTogZGlyZWN0aXZlRXhwcmVzc2lvbnMubGVuZ3RoID9cbiAgICAgICAgICB0aGlzLmNvbnN0YW50UG9vbC5nZXRDb25zdExpdGVyYWwoXG4gICAgICAgICAgICAgIG8ubGl0ZXJhbEFycihkaXJlY3RpdmVFeHByZXNzaW9ucyksIC8qIGZvcmNlU2hhcmVkICovIHRydWUpIDpcbiAgICAgICAgICBvLmxpdGVyYWwobnVsbCksXG4gICAgICBkaXJlY3RpdmVJbmRleE1hcFxuICAgIH07XG4gIH1cblxuICAvLyBUZW1wbGF0ZUFzdFZpc2l0b3JcbiAgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnRBc3QpIHtcbiAgICBjb25zdCBlbGVtZW50SW5kZXggPSB0aGlzLmFsbG9jYXRlRGF0YVNsb3QoKTtcbiAgICBsZXQgY29tcG9uZW50SW5kZXg6IG51bWJlcnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgY29uc3QgcmVmZXJlbmNlRGF0YVNsb3RzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgICBjb25zdCB3YXNJbkkxOG5TZWN0aW9uID0gdGhpcy5faW5JMThuU2VjdGlvbjtcblxuICAgIGNvbnN0IG91dHB1dEF0dHJzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBjb25zdCBhdHRySTE4bk1ldGFzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBsZXQgaTE4bk1ldGE6IHN0cmluZyA9ICcnO1xuXG4gICAgLy8gRWxlbWVudHMgaW5zaWRlIGkxOG4gc2VjdGlvbnMgYXJlIHJlcGxhY2VkIHdpdGggcGxhY2Vob2xkZXJzXG4gICAgLy8gVE9ETyh2aWNiKTogbmVzdGVkIGVsZW1lbnRzIGFyZSBhIFdJUCBpbiB0aGlzIHBoYXNlXG4gICAgaWYgKHRoaXMuX2luSTE4blNlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHBoTmFtZSA9IGVsZW1lbnQubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKCF0aGlzLl9waFRvTm9kZUlkeGVzW3RoaXMuX2kxOG5TZWN0aW9uSW5kZXhdW3BoTmFtZV0pIHtcbiAgICAgICAgdGhpcy5fcGhUb05vZGVJZHhlc1t0aGlzLl9pMThuU2VjdGlvbkluZGV4XVtwaE5hbWVdID0gW107XG4gICAgICB9XG4gICAgICB0aGlzLl9waFRvTm9kZUlkeGVzW3RoaXMuX2kxOG5TZWN0aW9uSW5kZXhdW3BoTmFtZV0ucHVzaChlbGVtZW50SW5kZXgpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBpMThuIGF0dHJpYnV0ZXNcbiAgICBmb3IgKGNvbnN0IGF0dHIgb2YgZWxlbWVudC5hdHRycykge1xuICAgICAgY29uc3QgbmFtZSA9IGF0dHIubmFtZTtcbiAgICAgIGNvbnN0IHZhbHVlID0gYXR0ci52YWx1ZTtcbiAgICAgIGlmIChuYW1lID09PSBJMThOX0FUVFIpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luSTE4blNlY3Rpb24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBDb3VsZCBub3QgbWFyayBhbiBlbGVtZW50IGFzIHRyYW5zbGF0YWJsZSBpbnNpZGUgb2YgYSB0cmFuc2xhdGFibGUgc2VjdGlvbmApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2luSTE4blNlY3Rpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLl9pMThuU2VjdGlvbkluZGV4Kys7XG4gICAgICAgIHRoaXMuX3BoVG9Ob2RlSWR4ZXNbdGhpcy5faTE4blNlY3Rpb25JbmRleF0gPSB7fTtcbiAgICAgICAgaTE4bk1ldGEgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKEkxOE5fQVRUUl9QUkVGSVgpKSB7XG4gICAgICAgIGF0dHJJMThuTWV0YXNbbmFtZS5zbGljZShJMThOX0FUVFJfUFJFRklYLmxlbmd0aCldID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRwdXRBdHRyc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVsZW1lbnQgY3JlYXRpb24gbW9kZVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGZpbmRDb21wb25lbnQoZWxlbWVudC5kaXJlY3RpdmVzKTtcbiAgICBjb25zdCBudWxsTm9kZSA9IG8ubGl0ZXJhbChudWxsLCBvLklORkVSUkVEX1RZUEUpO1xuICAgIGNvbnN0IHBhcmFtZXRlcnM6IG8uRXhwcmVzc2lvbltdID0gW28ubGl0ZXJhbChlbGVtZW50SW5kZXgpXTtcblxuICAgIC8vIEFkZCBjb21wb25lbnQgdHlwZSBvciBlbGVtZW50IHRhZ1xuICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgIHBhcmFtZXRlcnMucHVzaCh0aGlzLnR5cGVSZWZlcmVuY2UoY29tcG9uZW50LmRpcmVjdGl2ZS50eXBlLnJlZmVyZW5jZSkpO1xuICAgICAgY29tcG9uZW50SW5kZXggPSB0aGlzLmFsbG9jYXRlRGF0YVNsb3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1ldGVycy5wdXNoKG8ubGl0ZXJhbChlbGVtZW50Lm5hbWUpKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGF0dHJpYnV0ZXNcbiAgICBjb25zdCBpMThuTWVzc2FnZXM6IG8uU3RhdGVtZW50W10gPSBbXTtcbiAgICBjb25zdCBhdHRyaWJ1dGVzOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuICAgIGxldCBoYXNJMThuQXR0ciA9IGZhbHNlO1xuXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob3V0cHV0QXR0cnMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG91dHB1dEF0dHJzW25hbWVdO1xuICAgICAgYXR0cmlidXRlcy5wdXNoKG8ubGl0ZXJhbChuYW1lKSk7XG4gICAgICBpZiAoYXR0ckkxOG5NZXRhcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBoYXNJMThuQXR0ciA9IHRydWU7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBwYXJzZUkxOG5NZXRhKGF0dHJJMThuTWV0YXNbbmFtZV0pO1xuICAgICAgICBjb25zdCB2YXJpYWJsZSA9IHRoaXMuY29uc3RhbnRQb29sLmdldFRyYW5zbGF0aW9uKHZhbHVlLCBtZXRhKTtcbiAgICAgICAgYXR0cmlidXRlcy5wdXNoKHZhcmlhYmxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF0dHJpYnV0ZXMucHVzaChvLmxpdGVyYWwodmFsdWUpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBhdHRyQXJnOiBvLkV4cHJlc3Npb24gPSBudWxsTm9kZTtcblxuICAgIGlmIChhdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGF0dHJBcmcgPSBoYXNJMThuQXR0ciA/IGdldExpdGVyYWxGYWN0b3J5KHRoaXMub3V0cHV0Q3R4LCBvLmxpdGVyYWxBcnIoYXR0cmlidXRlcykpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3RhbnRQb29sLmdldENvbnN0TGl0ZXJhbChvLmxpdGVyYWxBcnIoYXR0cmlidXRlcyksIHRydWUpO1xuICAgIH1cblxuICAgIHBhcmFtZXRlcnMucHVzaChhdHRyQXJnKTtcblxuICAgIC8vIEFkZCBkaXJlY3RpdmVzIGFycmF5XG4gICAgY29uc3Qge2RpcmVjdGl2ZXNBcnJheSwgZGlyZWN0aXZlSW5kZXhNYXB9ID0gdGhpcy5fY29tcHV0ZURpcmVjdGl2ZXNBcnJheShlbGVtZW50LmRpcmVjdGl2ZXMpO1xuICAgIHBhcmFtZXRlcnMucHVzaChkaXJlY3RpdmVJbmRleE1hcC5zaXplID4gMCA/IGRpcmVjdGl2ZXNBcnJheSA6IG51bGxOb2RlKTtcblxuICAgIGlmIChjb21wb25lbnQgJiYgY29tcG9uZW50SW5kZXggIT0gbnVsbCkge1xuICAgICAgLy8gUmVjb3JkIHRoZSBkYXRhIHNsb3QgZm9yIHRoZSBjb21wb25lbnRcbiAgICAgIGRpcmVjdGl2ZUluZGV4TWFwLnNldChjb21wb25lbnQuZGlyZWN0aXZlLnR5cGUucmVmZXJlbmNlLCBjb21wb25lbnRJbmRleCk7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQucmVmZXJlbmNlcyAmJiBlbGVtZW50LnJlZmVyZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcmVmZXJlbmNlcyA9XG4gICAgICAgICAgZmxhdHRlbihlbGVtZW50LnJlZmVyZW5jZXMubWFwKHJlZmVyZW5jZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbG90ID0gdGhpcy5hbGxvY2F0ZURhdGFTbG90KCk7XG4gICAgICAgICAgICByZWZlcmVuY2VEYXRhU2xvdHMuc2V0KHJlZmVyZW5jZS5uYW1lLCBzbG90KTtcbiAgICAgICAgICAgIC8vIEdlbmVyYXRlIHRoZSB1cGRhdGUgdGVtcG9yYXJ5LlxuICAgICAgICAgICAgY29uc3QgdmFyaWFibGVOYW1lID0gdGhpcy5iaW5kaW5nU2NvcGUuZnJlc2hSZWZlcmVuY2VOYW1lKCk7XG4gICAgICAgICAgICB0aGlzLl9iaW5kaW5nTW9kZS5wdXNoKG8udmFyaWFibGUodmFyaWFibGVOYW1lLCBvLklORkVSUkVEX1RZUEUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0KG8uaW1wb3J0RXhwcihSMy5sb2FkKS5jYWxsRm4oW28ubGl0ZXJhbChzbG90KV0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvRGVjbFN0bXQoby5JTkZFUlJFRF9UWVBFLCBbby5TdG10TW9kaWZpZXIuRmluYWxdKSk7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdTY29wZS5zZXQocmVmZXJlbmNlLm5hbWUsIG8udmFyaWFibGUodmFyaWFibGVOYW1lKSk7XG4gICAgICAgICAgICByZXR1cm4gW3JlZmVyZW5jZS5uYW1lLCByZWZlcmVuY2Uub3JpZ2luYWxWYWx1ZV07XG4gICAgICAgICAgfSkpLm1hcCh2YWx1ZSA9PiBvLmxpdGVyYWwodmFsdWUpKTtcbiAgICAgIHBhcmFtZXRlcnMucHVzaChcbiAgICAgICAgICB0aGlzLmNvbnN0YW50UG9vbC5nZXRDb25zdExpdGVyYWwoby5saXRlcmFsQXJyKHJlZmVyZW5jZXMpLCAvKiBmb3JjZVNoYXJlZCAqLyB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtZXRlcnMucHVzaChudWxsTm9kZSk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIG51bGwgbm9kZXMgYXMgdGhleSBhcmUgaW1wbGllZC5cbiAgICB3aGlsZSAocGFyYW1ldGVyc1twYXJhbWV0ZXJzLmxlbmd0aCAtIDFdID09PSBudWxsTm9kZSkge1xuICAgICAgcGFyYW1ldGVycy5wb3AoKTtcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSB0aGUgaW5zdHJ1Y3Rpb24gY3JlYXRlIGVsZW1lbnQgaW5zdHJ1Y3Rpb25cbiAgICBpZiAoaTE4bk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2NyZWF0aW9uTW9kZS5wdXNoKC4uLmkxOG5NZXNzYWdlcyk7XG4gICAgfVxuICAgIHRoaXMuaW5zdHJ1Y3Rpb24odGhpcy5fY3JlYXRpb25Nb2RlLCBlbGVtZW50LnNvdXJjZVNwYW4sIFIzLmNyZWF0ZUVsZW1lbnQsIC4uLnBhcmFtZXRlcnMpO1xuXG4gICAgY29uc3QgaW1wbGljaXQgPSBvLnZhcmlhYmxlKHRoaXMuY29udGV4dFBhcmFtZXRlcik7XG5cbiAgICAvLyBHZW5lcmF0ZSBlbGVtZW50IGlucHV0IGJpbmRpbmdzXG4gICAgZm9yIChsZXQgaW5wdXQgb2YgZWxlbWVudC5pbnB1dHMpIHtcbiAgICAgIGlmIChpbnB1dC5pc0FuaW1hdGlvbikge1xuICAgICAgICB0aGlzLnVuc3VwcG9ydGVkKCdhbmltYXRpb25zJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb252ZXJ0ZWRCaW5kaW5nID0gdGhpcy5jb252ZXJ0UHJvcGVydHlCaW5kaW5nKGltcGxpY2l0LCBpbnB1dC52YWx1ZSk7XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbiA9IEJJTkRJTkdfSU5TVFJVQ1RJT05fTUFQW2lucHV0LnR5cGVdO1xuICAgICAgaWYgKGluc3RydWN0aW9uKSB7XG4gICAgICAgIC8vIFRPRE8oY2h1Y2tqKTogcnVudGltZTogc2VjdXJpdHkgY29udGV4dD9cbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbihcbiAgICAgICAgICAgIHRoaXMuX2JpbmRpbmdNb2RlLCBpbnB1dC5zb3VyY2VTcGFuLCBpbnN0cnVjdGlvbiwgby5saXRlcmFsKGVsZW1lbnRJbmRleCksXG4gICAgICAgICAgICBvLmxpdGVyYWwoaW5wdXQubmFtZSksIGNvbnZlcnRlZEJpbmRpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51bnN1cHBvcnRlZChgYmluZGluZyAke1Byb3BlcnR5QmluZGluZ1R5cGVbaW5wdXQudHlwZV19YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgZGlyZWN0aXZlcyBpbnB1dCBiaW5kaW5nc1xuICAgIHRoaXMuX3Zpc2l0RGlyZWN0aXZlcyhlbGVtZW50LmRpcmVjdGl2ZXMsIGltcGxpY2l0LCBlbGVtZW50SW5kZXgsIGRpcmVjdGl2ZUluZGV4TWFwKTtcblxuICAgIC8vIFRyYXZlcnNlIGVsZW1lbnQgY2hpbGQgbm9kZXNcbiAgICBpZiAodGhpcy5faW5JMThuU2VjdGlvbiAmJiBlbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA9PSAxICYmXG4gICAgICAgIGVsZW1lbnQuY2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBUZXh0QXN0KSB7XG4gICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC5jaGlsZHJlblswXSBhcyBUZXh0QXN0O1xuICAgICAgdGhpcy52aXNpdFNpbmdsZUkxOG5UZXh0Q2hpbGQodGV4dCwgaTE4bk1ldGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZVZpc2l0QWxsKHRoaXMsIGVsZW1lbnQuY2hpbGRyZW4pO1xuICAgIH1cblxuICAgIC8vIEZpbmlzaCBlbGVtZW50IGNvbnN0cnVjdGlvbiBtb2RlLlxuICAgIHRoaXMuaW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRoaXMuX2NyZWF0aW9uTW9kZSwgZWxlbWVudC5lbmRTb3VyY2VTcGFuIHx8IGVsZW1lbnQuc291cmNlU3BhbiwgUjMuZWxlbWVudEVuZCk7XG5cbiAgICAvLyBSZXN0b3JlIHRoZSBzdGF0ZSBiZWZvcmUgZXhpdGluZyB0aGlzIG5vZGVcbiAgICB0aGlzLl9pbkkxOG5TZWN0aW9uID0gd2FzSW5JMThuU2VjdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2l0RGlyZWN0aXZlcyhcbiAgICAgIGRpcmVjdGl2ZXM6IERpcmVjdGl2ZUFzdFtdLCBpbXBsaWNpdDogby5FeHByZXNzaW9uLCBub2RlSW5kZXg6IG51bWJlcixcbiAgICAgIGRpcmVjdGl2ZUluZGV4TWFwOiBNYXA8YW55LCBudW1iZXI+KSB7XG4gICAgZm9yIChsZXQgZGlyZWN0aXZlIG9mIGRpcmVjdGl2ZXMpIHtcbiAgICAgIGNvbnN0IGRpcmVjdGl2ZUluZGV4ID0gZGlyZWN0aXZlSW5kZXhNYXAuZ2V0KGRpcmVjdGl2ZS5kaXJlY3RpdmUudHlwZS5yZWZlcmVuY2UpO1xuXG4gICAgICAvLyBDcmVhdGlvbiBtb2RlXG4gICAgICAvLyBlLmcuIEQoMCwgVG9kb0NvbXBvbmVudERlZi5uKCksIFRvZG9Db21wb25lbnREZWYpO1xuICAgICAgY29uc3QgZGlyZWN0aXZlVHlwZSA9IGRpcmVjdGl2ZS5kaXJlY3RpdmUudHlwZS5yZWZlcmVuY2U7XG4gICAgICBjb25zdCBraW5kID1cbiAgICAgICAgICBkaXJlY3RpdmUuZGlyZWN0aXZlLmlzQ29tcG9uZW50ID8gRGVmaW5pdGlvbktpbmQuQ29tcG9uZW50IDogRGVmaW5pdGlvbktpbmQuRGlyZWN0aXZlO1xuXG4gICAgICAvLyBOb3RlOiAqZG8gbm90IGNhY2hlKiBjYWxscyB0byB0aGlzLmRpcmVjdGl2ZU9mKCkgYXMgdGhlIGNvbnN0YW50IHBvb2wgbmVlZHMgdG8ga25vdyBpZiB0aGVcbiAgICAgIC8vIG5vZGUgaXMgcmVmZXJlbmNlZCBtdWx0aXBsZSB0aW1lcyB0byBrbm93IHRoYXQgaXQgbXVzdCBnZW5lcmF0ZSB0aGUgcmVmZXJlbmNlIGludG8gYVxuICAgICAgLy8gdGVtcG9yYXJ5LlxuXG4gICAgICAvLyBCaW5kaW5nc1xuICAgICAgZm9yIChjb25zdCBpbnB1dCBvZiBkaXJlY3RpdmUuaW5wdXRzKSB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZEJpbmRpbmcgPSB0aGlzLmNvbnZlcnRQcm9wZXJ0eUJpbmRpbmcoaW1wbGljaXQsIGlucHV0LnZhbHVlKTtcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbihcbiAgICAgICAgICAgIHRoaXMuX2JpbmRpbmdNb2RlLCBkaXJlY3RpdmUuc291cmNlU3BhbiwgUjMuZWxlbWVudFByb3BlcnR5LCBvLmxpdGVyYWwobm9kZUluZGV4KSxcbiAgICAgICAgICAgIG8ubGl0ZXJhbChpbnB1dC50ZW1wbGF0ZU5hbWUpLCBvLmltcG9ydEV4cHIoUjMuYmluZCkuY2FsbEZuKFtjb252ZXJ0ZWRCaW5kaW5nXSkpO1xuICAgICAgfVxuXG4gICAgICAvLyBlLmcuIE15RGlyZWN0aXZlLm5nRGlyZWN0aXZlRGVmLmgoMCwgMCk7XG4gICAgICB0aGlzLl9ob3N0TW9kZS5wdXNoKFxuICAgICAgICAgIHRoaXMuZGVmaW5pdGlvbk9mKGRpcmVjdGl2ZVR5cGUsIGtpbmQpXG4gICAgICAgICAgICAgIC5jYWxsTWV0aG9kKFIzLkhPU1RfQklORElOR19NRVRIT0QsIFtvLmxpdGVyYWwoZGlyZWN0aXZlSW5kZXgpLCBvLmxpdGVyYWwobm9kZUluZGV4KV0pXG4gICAgICAgICAgICAgIC50b1N0bXQoKSk7XG5cbiAgICAgIC8vIGUuZy4gcigwLCAwKTtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgdGhpcy5fcmVmcmVzaE1vZGUsIGRpcmVjdGl2ZS5zb3VyY2VTcGFuLCBSMy5yZWZyZXNoQ29tcG9uZW50LCBvLmxpdGVyYWwoZGlyZWN0aXZlSW5kZXgpLFxuICAgICAgICAgIG8ubGl0ZXJhbChub2RlSW5kZXgpKTtcbiAgICB9XG4gIH1cblxuICAvLyBUZW1wbGF0ZUFzdFZpc2l0b3JcbiAgdmlzaXRFbWJlZGRlZFRlbXBsYXRlKGFzdDogRW1iZWRkZWRUZW1wbGF0ZUFzdCkge1xuICAgIGNvbnN0IHRlbXBsYXRlSW5kZXggPSB0aGlzLmFsbG9jYXRlRGF0YVNsb3QoKTtcblxuICAgIGNvbnN0IHRlbXBsYXRlUmVmID0gdGhpcy5yZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLlRlbXBsYXRlUmVmKTtcbiAgICBjb25zdCB0ZW1wbGF0ZURpcmVjdGl2ZSA9IGFzdC5kaXJlY3RpdmVzLmZpbmQoXG4gICAgICAgIGRpcmVjdGl2ZSA9PiBkaXJlY3RpdmUuZGlyZWN0aXZlLnR5cGUuZGlEZXBzLnNvbWUoXG4gICAgICAgICAgICBkZXBlbmRlbmN5ID0+XG4gICAgICAgICAgICAgICAgZGVwZW5kZW5jeS50b2tlbiAhPSBudWxsICYmICh0b2tlblJlZmVyZW5jZShkZXBlbmRlbmN5LnRva2VuKSA9PSB0ZW1wbGF0ZVJlZikpKTtcbiAgICBjb25zdCBjb250ZXh0TmFtZSA9XG4gICAgICAgIHRoaXMuY29udGV4dE5hbWUgJiYgdGVtcGxhdGVEaXJlY3RpdmUgJiYgdGVtcGxhdGVEaXJlY3RpdmUuZGlyZWN0aXZlLnR5cGUucmVmZXJlbmNlLm5hbWUgP1xuICAgICAgICBgJHt0aGlzLmNvbnRleHROYW1lfV8ke3RlbXBsYXRlRGlyZWN0aXZlLmRpcmVjdGl2ZS50eXBlLnJlZmVyZW5jZS5uYW1lfWAgOlxuICAgICAgICBudWxsO1xuICAgIGNvbnN0IHRlbXBsYXRlTmFtZSA9XG4gICAgICAgIGNvbnRleHROYW1lID8gYCR7Y29udGV4dE5hbWV9X1RlbXBsYXRlXyR7dGVtcGxhdGVJbmRleH1gIDogYFRlbXBsYXRlXyR7dGVtcGxhdGVJbmRleH1gO1xuICAgIGNvbnN0IHRlbXBsYXRlQ29udGV4dCA9IGBjdHgke3RoaXMubGV2ZWx9YDtcblxuICAgIGNvbnN0IHtkaXJlY3RpdmVzQXJyYXksIGRpcmVjdGl2ZUluZGV4TWFwfSA9IHRoaXMuX2NvbXB1dGVEaXJlY3RpdmVzQXJyYXkoYXN0LmRpcmVjdGl2ZXMpO1xuXG4gICAgLy8gZS5nLiBDKDEsIEMxVGVtcGxhdGUpXG4gICAgdGhpcy5pbnN0cnVjdGlvbihcbiAgICAgICAgdGhpcy5fY3JlYXRpb25Nb2RlLCBhc3Quc291cmNlU3BhbiwgUjMuY29udGFpbmVyQ3JlYXRlLCBvLmxpdGVyYWwodGVtcGxhdGVJbmRleCksXG4gICAgICAgIGRpcmVjdGl2ZXNBcnJheSwgby52YXJpYWJsZSh0ZW1wbGF0ZU5hbWUpKTtcblxuICAgIC8vIGUuZy4gQ3IoMSlcbiAgICB0aGlzLmluc3RydWN0aW9uKFxuICAgICAgICB0aGlzLl9yZWZyZXNoTW9kZSwgYXN0LnNvdXJjZVNwYW4sIFIzLmNvbnRhaW5lclJlZnJlc2hTdGFydCwgby5saXRlcmFsKHRlbXBsYXRlSW5kZXgpKTtcblxuICAgIC8vIEdlbmVyYXRlIGRpcmVjdGl2ZXNcbiAgICB0aGlzLl92aXNpdERpcmVjdGl2ZXMoXG4gICAgICAgIGFzdC5kaXJlY3RpdmVzLCBvLnZhcmlhYmxlKHRoaXMuY29udGV4dFBhcmFtZXRlciksIHRlbXBsYXRlSW5kZXgsIGRpcmVjdGl2ZUluZGV4TWFwKTtcblxuICAgIC8vIGUuZy4gY3IoKTtcbiAgICB0aGlzLmluc3RydWN0aW9uKHRoaXMuX3JlZnJlc2hNb2RlLCBhc3Quc291cmNlU3BhbiwgUjMuY29udGFpbmVyUmVmcmVzaEVuZCk7XG5cbiAgICAvLyBDcmVhdGUgdGhlIHRlbXBsYXRlIGZ1bmN0aW9uXG4gICAgY29uc3QgdGVtcGxhdGVWaXNpdG9yID0gbmV3IFRlbXBsYXRlRGVmaW5pdGlvbkJ1aWxkZXIoXG4gICAgICAgIHRoaXMub3V0cHV0Q3R4LCB0aGlzLmNvbnN0YW50UG9vbCwgdGhpcy5yZWZsZWN0b3IsIHRlbXBsYXRlQ29udGV4dCxcbiAgICAgICAgdGhpcy5iaW5kaW5nU2NvcGUubmVzdGVkU2NvcGUoKSwgdGhpcy5sZXZlbCArIDEsIHRoaXMubmdDb250ZW50U2VsZWN0b3JzLCBjb250ZXh0TmFtZSxcbiAgICAgICAgdGVtcGxhdGVOYW1lLCB0aGlzLnBpcGVzLCBbXSk7XG4gICAgY29uc3QgdGVtcGxhdGVGdW5jdGlvbkV4cHIgPSB0ZW1wbGF0ZVZpc2l0b3IuYnVpbGRUZW1wbGF0ZUZ1bmN0aW9uKGFzdC5jaGlsZHJlbiwgYXN0LnZhcmlhYmxlcyk7XG4gICAgdGhpcy5fcG9zdGZpeC5wdXNoKHRlbXBsYXRlRnVuY3Rpb25FeHByLnRvRGVjbFN0bXQodGVtcGxhdGVOYW1lLCBudWxsKSk7XG4gIH1cblxuICAvLyBUaGVzZSBzaG91bGQgYmUgaGFuZGxlZCBpbiB0aGUgdGVtcGxhdGUgb3IgZWxlbWVudCBkaXJlY3RseS5cbiAgcmVhZG9ubHkgdmlzaXRSZWZlcmVuY2UgPSBpbnZhbGlkO1xuICByZWFkb25seSB2aXNpdFZhcmlhYmxlID0gaW52YWxpZDtcbiAgcmVhZG9ubHkgdmlzaXRFdmVudCA9IGludmFsaWQ7XG4gIHJlYWRvbmx5IHZpc2l0RWxlbWVudFByb3BlcnR5ID0gaW52YWxpZDtcbiAgcmVhZG9ubHkgdmlzaXRBdHRyID0gaW52YWxpZDtcblxuICAvLyBUZW1wbGF0ZUFzdFZpc2l0b3JcbiAgdmlzaXRCb3VuZFRleHQoYXN0OiBCb3VuZFRleHRBc3QpIHtcbiAgICBjb25zdCBub2RlSW5kZXggPSB0aGlzLmFsbG9jYXRlRGF0YVNsb3QoKTtcblxuICAgIC8vIENyZWF0aW9uIG1vZGVcbiAgICB0aGlzLmluc3RydWN0aW9uKHRoaXMuX2NyZWF0aW9uTW9kZSwgYXN0LnNvdXJjZVNwYW4sIFIzLnRleHQsIG8ubGl0ZXJhbChub2RlSW5kZXgpKTtcblxuICAgIC8vIFJlZnJlc2ggbW9kZVxuICAgIHRoaXMuaW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRoaXMuX3JlZnJlc2hNb2RlLCBhc3Quc291cmNlU3BhbiwgUjMudGV4dENyZWF0ZUJvdW5kLCBvLmxpdGVyYWwobm9kZUluZGV4KSxcbiAgICAgICAgdGhpcy5iaW5kKG8udmFyaWFibGUoQ09OVEVYVF9OQU1FKSwgYXN0LnZhbHVlLCBhc3Quc291cmNlU3BhbikpO1xuICB9XG5cbiAgLy8gVGVtcGxhdGVBc3RWaXNpdG9yXG4gIHZpc2l0VGV4dChhc3Q6IFRleHRBc3QpIHtcbiAgICAvLyBUZXh0IGlzIGRlZmluZWQgaW4gY3JlYXRpb24gbW9kZSBvbmx5LlxuICAgIHRoaXMuaW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRoaXMuX2NyZWF0aW9uTW9kZSwgYXN0LnNvdXJjZVNwYW4sIFIzLnRleHQsIG8ubGl0ZXJhbCh0aGlzLmFsbG9jYXRlRGF0YVNsb3QoKSksXG4gICAgICAgIG8ubGl0ZXJhbChhc3QudmFsdWUpKTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIGNvbnRlbnQgb2YgdGhlIGVsZW1lbnQgaXMgYSBzaW5nbGUgdGV4dCBub2RlIHRoZSB0cmFuc2xhdGlvbiBjYW4gYmUgaW5saW5lZDpcbiAgLy9cbiAgLy8gYDxwIGkxOG49XCJkZXNjfG1lYW5cIj5zb21lIGNvbnRlbnQ8L3A+YFxuICAvLyBjb21waWxlcyB0b1xuICAvLyBgYGBcbiAgLy8gLyoqXG4gIC8vICogQGRlc2MgZGVzY1xuICAvLyAqIEBtZWFuaW5nIG1lYW5cbiAgLy8gKi9cbiAgLy8gY29uc3QgTVNHX1hZWiA9IGdvb2cuZ2V0TXNnKCdzb21lIGNvbnRlbnQnKTtcbiAgLy8gaTAuybVUKDEsIE1TR19YWVopO1xuICAvLyBgYGBcbiAgdmlzaXRTaW5nbGVJMThuVGV4dENoaWxkKHRleHQ6IFRleHRBc3QsIGkxOG5NZXRhOiBzdHJpbmcpIHtcbiAgICBjb25zdCBtZXRhID0gcGFyc2VJMThuTWV0YShpMThuTWV0YSk7XG4gICAgY29uc3QgdmFyaWFibGUgPSB0aGlzLmNvbnN0YW50UG9vbC5nZXRUcmFuc2xhdGlvbih0ZXh0LnZhbHVlLCBtZXRhKTtcbiAgICB0aGlzLmluc3RydWN0aW9uKFxuICAgICAgICB0aGlzLl9jcmVhdGlvbk1vZGUsIHRleHQuc291cmNlU3BhbiwgUjMudGV4dCwgby5saXRlcmFsKHRoaXMuYWxsb2NhdGVEYXRhU2xvdCgpKSwgdmFyaWFibGUpO1xuICB9XG5cbiAgLy8gVGhlc2Ugc2hvdWxkIGJlIGhhbmRsZWQgaW4gdGhlIHRlbXBsYXRlIG9yIGVsZW1lbnQgZGlyZWN0bHlcbiAgcmVhZG9ubHkgdmlzaXREaXJlY3RpdmUgPSBpbnZhbGlkO1xuICByZWFkb25seSB2aXNpdERpcmVjdGl2ZVByb3BlcnR5ID0gaW52YWxpZDtcblxuICBwcml2YXRlIGFsbG9jYXRlRGF0YVNsb3QoKSB7IHJldHVybiB0aGlzLl9kYXRhSW5kZXgrKzsgfVxuICBwcml2YXRlIGJpbmRpbmdDb250ZXh0KCkgeyByZXR1cm4gYCR7dGhpcy5fYmluZGluZ0NvbnRleHQrK31gOyB9XG5cbiAgcHJpdmF0ZSBpbnN0cnVjdGlvbihcbiAgICAgIHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10sIHNwYW46IFBhcnNlU291cmNlU3BhbnxudWxsLCByZWZlcmVuY2U6IG8uRXh0ZXJuYWxSZWZlcmVuY2UsXG4gICAgICAuLi5wYXJhbXM6IG8uRXhwcmVzc2lvbltdKSB7XG4gICAgc3RhdGVtZW50cy5wdXNoKG8uaW1wb3J0RXhwcihyZWZlcmVuY2UsIG51bGwsIHNwYW4pLmNhbGxGbihwYXJhbXMsIHNwYW4pLnRvU3RtdCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgdHlwZVJlZmVyZW5jZSh0eXBlOiBhbnkpOiBvLkV4cHJlc3Npb24geyByZXR1cm4gdGhpcy5vdXRwdXRDdHguaW1wb3J0RXhwcih0eXBlKTsgfVxuXG4gIHByaXZhdGUgZGVmaW5pdGlvbk9mKHR5cGU6IGFueSwga2luZDogRGVmaW5pdGlvbktpbmQpOiBvLkV4cHJlc3Npb24ge1xuICAgIHJldHVybiB0aGlzLmNvbnN0YW50UG9vbC5nZXREZWZpbml0aW9uKHR5cGUsIGtpbmQsIHRoaXMub3V0cHV0Q3R4KTtcbiAgfVxuXG4gIHByaXZhdGUgdGVtcCgpOiBvLlJlYWRWYXJFeHByIHtcbiAgICBpZiAoIXRoaXMuX3RlbXBvcmFyeUFsbG9jYXRlZCkge1xuICAgICAgdGhpcy5fcHJlZml4LnB1c2gobmV3IG8uRGVjbGFyZVZhclN0bXQoVEVNUE9SQVJZX05BTUUsIHVuZGVmaW5lZCwgby5EWU5BTUlDX1RZUEUpKTtcbiAgICAgIHRoaXMuX3RlbXBvcmFyeUFsbG9jYXRlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBvLnZhcmlhYmxlKFRFTVBPUkFSWV9OQU1FKTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFByb3BlcnR5QmluZGluZyhpbXBsaWNpdDogby5FeHByZXNzaW9uLCB2YWx1ZTogQVNUKTogby5FeHByZXNzaW9uIHtcbiAgICBjb25zdCBwaXBlc0NvbnZlcnRlZFZhbHVlID0gdmFsdWUudmlzaXQodGhpcy5fdmFsdWVDb252ZXJ0ZXIpO1xuICAgIGNvbnN0IGNvbnZlcnRlZFByb3BlcnR5QmluZGluZyA9IGNvbnZlcnRQcm9wZXJ0eUJpbmRpbmcoXG4gICAgICAgIHRoaXMsIGltcGxpY2l0LCBwaXBlc0NvbnZlcnRlZFZhbHVlLCB0aGlzLmJpbmRpbmdDb250ZXh0KCksIEJpbmRpbmdGb3JtLlRyeVNpbXBsZSxcbiAgICAgICAgaW50ZXJwb2xhdGUpO1xuICAgIHRoaXMuX3JlZnJlc2hNb2RlLnB1c2goLi4uY29udmVydGVkUHJvcGVydHlCaW5kaW5nLnN0bXRzKTtcbiAgICByZXR1cm4gY29udmVydGVkUHJvcGVydHlCaW5kaW5nLmN1cnJWYWxFeHByO1xuICB9XG5cbiAgcHJpdmF0ZSBiaW5kKGltcGxpY2l0OiBvLkV4cHJlc3Npb24sIHZhbHVlOiBBU1QsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbik6IG8uRXhwcmVzc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMuY29udmVydFByb3BlcnR5QmluZGluZyhpbXBsaWNpdCwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFF1ZXJ5UHJlZGljYXRlKHF1ZXJ5OiBDb21waWxlUXVlcnlNZXRhZGF0YSwgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0KTogby5FeHByZXNzaW9uIHtcbiAgbGV0IHByZWRpY2F0ZTogby5FeHByZXNzaW9uO1xuICBpZiAocXVlcnkuc2VsZWN0b3JzLmxlbmd0aCA+IDEgfHwgKHF1ZXJ5LnNlbGVjdG9ycy5sZW5ndGggPT0gMSAmJiBxdWVyeS5zZWxlY3RvcnNbMF0udmFsdWUpKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gcXVlcnkuc2VsZWN0b3JzLm1hcCh2YWx1ZSA9PiB2YWx1ZS52YWx1ZSBhcyBzdHJpbmcpO1xuICAgIHNlbGVjdG9ycy5zb21lKHZhbHVlID0+ICF2YWx1ZSkgJiYgZXJyb3IoJ0ZvdW5kIGEgdHlwZSBhbW9uZyB0aGUgc3RyaW5nIHNlbGVjdG9ycyBleHBlY3RlZCcpO1xuICAgIHByZWRpY2F0ZSA9IG91dHB1dEN0eC5jb25zdGFudFBvb2wuZ2V0Q29uc3RMaXRlcmFsKFxuICAgICAgICBvLmxpdGVyYWxBcnIoc2VsZWN0b3JzLm1hcCh2YWx1ZSA9PiBvLmxpdGVyYWwodmFsdWUpKSkpO1xuICB9IGVsc2UgaWYgKHF1ZXJ5LnNlbGVjdG9ycy5sZW5ndGggPT0gMSkge1xuICAgIGNvbnN0IGZpcnN0ID0gcXVlcnkuc2VsZWN0b3JzWzBdO1xuICAgIGlmIChmaXJzdC5pZGVudGlmaWVyKSB7XG4gICAgICBwcmVkaWNhdGUgPSBvdXRwdXRDdHguaW1wb3J0RXhwcihmaXJzdC5pZGVudGlmaWVyLnJlZmVyZW5jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yKCdVbmV4cGVjdGVkIHF1ZXJ5IGZvcm0nKTtcbiAgICAgIHByZWRpY2F0ZSA9IG8ubGl0ZXJhbChudWxsKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZXJyb3IoJ1VuZXhwZWN0ZWQgcXVlcnkgZm9ybScpO1xuICAgIHByZWRpY2F0ZSA9IG8ubGl0ZXJhbChudWxsKTtcbiAgfVxuICByZXR1cm4gcHJlZGljYXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmFjdG9yeShcbiAgICB0eXBlOiBDb21waWxlVHlwZU1ldGFkYXRhLCBvdXRwdXRDdHg6IE91dHB1dENvbnRleHQsIHJlZmxlY3RvcjogQ29tcGlsZVJlZmxlY3RvcixcbiAgICBxdWVyaWVzOiBDb21waWxlUXVlcnlNZXRhZGF0YVtdKTogby5FeHByZXNzaW9uIHtcbiAgbGV0IGFyZ3M6IG8uRXhwcmVzc2lvbltdID0gW107XG5cbiAgY29uc3QgZWxlbWVudFJlZiA9IHJlZmxlY3Rvci5yZXNvbHZlRXh0ZXJuYWxSZWZlcmVuY2UoSWRlbnRpZmllcnMuRWxlbWVudFJlZik7XG4gIGNvbnN0IHRlbXBsYXRlUmVmID0gcmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5UZW1wbGF0ZVJlZik7XG4gIGNvbnN0IHZpZXdDb250YWluZXJSZWYgPSByZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLlZpZXdDb250YWluZXJSZWYpO1xuXG4gIGZvciAobGV0IGRlcGVuZGVuY3kgb2YgdHlwZS5kaURlcHMpIHtcbiAgICBpZiAoZGVwZW5kZW5jeS5pc1ZhbHVlKSB7XG4gICAgICB1bnN1cHBvcnRlZCgndmFsdWUgZGVwZW5kZW5jaWVzJyk7XG4gICAgfVxuICAgIGlmIChkZXBlbmRlbmN5LmlzSG9zdCkge1xuICAgICAgdW5zdXBwb3J0ZWQoJ2hvc3QgZGVwZW5kZW5jaWVzJyk7XG4gICAgfVxuICAgIGNvbnN0IHRva2VuID0gZGVwZW5kZW5jeS50b2tlbjtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGNvbnN0IHRva2VuUmVmID0gdG9rZW5SZWZlcmVuY2UodG9rZW4pO1xuICAgICAgaWYgKHRva2VuUmVmID09PSBlbGVtZW50UmVmKSB7XG4gICAgICAgIGFyZ3MucHVzaChvLmltcG9ydEV4cHIoUjMuaW5qZWN0RWxlbWVudFJlZikuY2FsbEZuKFtdKSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuUmVmID09PSB0ZW1wbGF0ZVJlZikge1xuICAgICAgICBhcmdzLnB1c2goby5pbXBvcnRFeHByKFIzLmluamVjdFRlbXBsYXRlUmVmKS5jYWxsRm4oW10pKTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW5SZWYgPT09IHZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgYXJncy5wdXNoKG8uaW1wb3J0RXhwcihSMy5pbmplY3RWaWV3Q29udGFpbmVyUmVmKS5jYWxsRm4oW10pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID1cbiAgICAgICAgICAgIHRva2VuLmlkZW50aWZpZXIgIT0gbnVsbCA/IG91dHB1dEN0eC5pbXBvcnRFeHByKHRva2VuUmVmKSA6IG8ubGl0ZXJhbCh0b2tlblJlZik7XG4gICAgICAgIGFyZ3MucHVzaChvLmltcG9ydEV4cHIoUjMuaW5qZWN0KS5jYWxsRm4oW3ZhbHVlXSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1bnN1cHBvcnRlZCgnZGVwZW5kZW5jeSB3aXRob3V0IGEgdG9rZW4nKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBxdWVyeURlZmluaXRpb25zOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuICBmb3IgKGxldCBxdWVyeSBvZiBxdWVyaWVzKSB7XG4gICAgY29uc3QgcHJlZGljYXRlID0gZ2V0UXVlcnlQcmVkaWNhdGUocXVlcnksIG91dHB1dEN0eCk7XG5cbiAgICAvLyBlLmcuIHIzLlEobnVsbCwgU29tZURpcmVjdGl2ZSwgZmFsc2UpIG9yIHIzLlEobnVsbCwgWydkaXYnXSwgZmFsc2UpXG4gICAgY29uc3QgcGFyYW1ldGVycyA9IFtcbiAgICAgIC8qIG1lbW9yeUluZGV4ICovIG8ubGl0ZXJhbChudWxsLCBvLklORkVSUkVEX1RZUEUpLFxuICAgICAgLyogcHJlZGljYXRlICovIHByZWRpY2F0ZSxcbiAgICAgIC8qIGRlc2NlbmQgKi8gby5saXRlcmFsKHF1ZXJ5LmRlc2NlbmRhbnRzKVxuICAgIF07XG5cbiAgICBpZiAocXVlcnkucmVhZCkge1xuICAgICAgcGFyYW1ldGVycy5wdXNoKG91dHB1dEN0eC5pbXBvcnRFeHByKHF1ZXJ5LnJlYWQuaWRlbnRpZmllciAhLnJlZmVyZW5jZSkpO1xuICAgIH1cblxuICAgIHF1ZXJ5RGVmaW5pdGlvbnMucHVzaChvLmltcG9ydEV4cHIoUjMucXVlcnkpLmNhbGxGbihwYXJhbWV0ZXJzKSk7XG4gIH1cblxuICBjb25zdCBjcmVhdGVJbnN0YW5jZSA9IG5ldyBvLkluc3RhbnRpYXRlRXhwcihvdXRwdXRDdHguaW1wb3J0RXhwcih0eXBlLnJlZmVyZW5jZSksIGFyZ3MpO1xuICBjb25zdCByZXN1bHQgPSBxdWVyeURlZmluaXRpb25zLmxlbmd0aCA+IDAgPyBvLmxpdGVyYWxBcnIoW2NyZWF0ZUluc3RhbmNlLCAuLi5xdWVyeURlZmluaXRpb25zXSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVJbnN0YW5jZTtcblxuICByZXR1cm4gby5mbihcbiAgICAgIFtdLCBbbmV3IG8uUmV0dXJuU3RhdGVtZW50KHJlc3VsdCldLCBvLklORkVSUkVEX1RZUEUsIG51bGwsXG4gICAgICB0eXBlLnJlZmVyZW5jZS5uYW1lID8gYCR7dHlwZS5yZWZlcmVuY2UubmFtZX1fRmFjdG9yeWAgOiBudWxsKTtcbn1cblxudHlwZSBIb3N0QmluZGluZ3MgPSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZ1xufTtcblxuLy8gVHVybiBhIGRpcmVjdGl2ZSBzZWxlY3RvciBpbnRvIGFuIFIzLWNvbXBhdGlibGUgc2VsZWN0b3IgZm9yIGRpcmVjdGl2ZSBkZWZcbmZ1bmN0aW9uIGNyZWF0ZURpcmVjdGl2ZVNlbGVjdG9yKHNlbGVjdG9yOiBzdHJpbmcpOiBvLkV4cHJlc3Npb24ge1xuICByZXR1cm4gYXNMaXRlcmFsKHBhcnNlU2VsZWN0b3JzVG9SM1NlbGVjdG9yKENzc1NlbGVjdG9yLnBhcnNlKHNlbGVjdG9yKSkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIb3N0QXR0cmlidXRlc0FycmF5KFxuICAgIGRpcmVjdGl2ZU1ldGFkYXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCk6IG8uRXhwcmVzc2lvbnxudWxsIHtcbiAgY29uc3QgdmFsdWVzOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuICBjb25zdCBhdHRyaWJ1dGVzID0gZGlyZWN0aXZlTWV0YWRhdGEuaG9zdEF0dHJpYnV0ZXM7XG4gIGZvciAobGV0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhdHRyaWJ1dGVzKSkge1xuICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1trZXldO1xuICAgIHZhbHVlcy5wdXNoKG8ubGl0ZXJhbChrZXkpLCBvLmxpdGVyYWwodmFsdWUpKTtcbiAgfVxuICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gb3V0cHV0Q3R4LmNvbnN0YW50UG9vbC5nZXRDb25zdExpdGVyYWwoby5saXRlcmFsQXJyKHZhbHVlcykpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBSZXR1cm4gYSBob3N0IGJpbmRpbmcgZnVuY3Rpb24gb3IgbnVsbCBpZiBvbmUgaXMgbm90IG5lY2Vzc2FyeS5cbmZ1bmN0aW9uIGNyZWF0ZUhvc3RCaW5kaW5nc0Z1bmN0aW9uKFxuICAgIGRpcmVjdGl2ZU1ldGFkYXRhOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCxcbiAgICBiaW5kaW5nUGFyc2VyOiBCaW5kaW5nUGFyc2VyKTogby5FeHByZXNzaW9ufG51bGwge1xuICBjb25zdCBzdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdID0gW107XG5cbiAgY29uc3QgdGVtcG9yYXJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGRlY2xhcmVkID0gZmFsc2U7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmICghZGVjbGFyZWQpIHtcbiAgICAgICAgc3RhdGVtZW50cy5wdXNoKG5ldyBvLkRlY2xhcmVWYXJTdG10KFRFTVBPUkFSWV9OQU1FLCB1bmRlZmluZWQsIG8uRFlOQU1JQ19UWVBFKSk7XG4gICAgICAgIGRlY2xhcmVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvLnZhcmlhYmxlKFRFTVBPUkFSWV9OQU1FKTtcbiAgICB9O1xuICB9KCk7XG5cbiAgY29uc3QgaG9zdEJpbmRpbmdTb3VyY2VTcGFuID0gdHlwZVNvdXJjZVNwYW4oXG4gICAgICBkaXJlY3RpdmVNZXRhZGF0YS5pc0NvbXBvbmVudCA/ICdDb21wb25lbnQnIDogJ0RpcmVjdGl2ZScsIGRpcmVjdGl2ZU1ldGFkYXRhLnR5cGUpO1xuXG4gIC8vIENhbGN1bGF0ZSB0aGUgcXVlcmllc1xuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGlyZWN0aXZlTWV0YWRhdGEucXVlcmllcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBxdWVyeSA9IGRpcmVjdGl2ZU1ldGFkYXRhLnF1ZXJpZXNbaW5kZXhdO1xuXG4gICAgLy8gZS5nLiByMy5xUih0bXAgPSByMy5sZChkaXJJbmRleClbMV0pICYmIChyMy5sZChkaXJJbmRleClbMF0uc29tZURpciA9IHRtcCk7XG4gICAgY29uc3QgZ2V0RGlyZWN0aXZlTWVtb3J5ID0gby5pbXBvcnRFeHByKFIzLmxvYWQpLmNhbGxGbihbby52YXJpYWJsZSgnZGlySW5kZXgnKV0pO1xuICAgIC8vIFRoZSBxdWVyeSBsaXN0IGlzIGF0IHRoZSBxdWVyeSBpbmRleCArIDEgYmVjYXVzZSB0aGUgZGlyZWN0aXZlIGl0c2VsZiBpcyBpbiBzbG90IDAuXG4gICAgY29uc3QgZ2V0UXVlcnlMaXN0ID0gZ2V0RGlyZWN0aXZlTWVtb3J5LmtleShvLmxpdGVyYWwoaW5kZXggKyAxKSk7XG4gICAgY29uc3QgYXNzaWduVG9UZW1wb3JhcnkgPSB0ZW1wb3JhcnkoKS5zZXQoZ2V0UXVlcnlMaXN0KTtcbiAgICBjb25zdCBjYWxsUXVlcnlSZWZyZXNoID0gby5pbXBvcnRFeHByKFIzLnF1ZXJ5UmVmcmVzaCkuY2FsbEZuKFthc3NpZ25Ub1RlbXBvcmFyeV0pO1xuICAgIGNvbnN0IHVwZGF0ZURpcmVjdGl2ZSA9IGdldERpcmVjdGl2ZU1lbW9yeS5rZXkoby5saXRlcmFsKDAsIG8uSU5GRVJSRURfVFlQRSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKHF1ZXJ5LnByb3BlcnR5TmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldChxdWVyeS5maXJzdCA/IHRlbXBvcmFyeSgpLnByb3AoJ2ZpcnN0JykgOiB0ZW1wb3JhcnkoKSk7XG4gICAgY29uc3QgYW5kRXhwcmVzc2lvbiA9IGNhbGxRdWVyeVJlZnJlc2guYW5kKHVwZGF0ZURpcmVjdGl2ZSk7XG4gICAgc3RhdGVtZW50cy5wdXNoKGFuZEV4cHJlc3Npb24udG9TdG10KCkpO1xuICB9XG5cbiAgY29uc3QgZGlyZWN0aXZlU3VtbWFyeSA9IGRpcmVjdGl2ZU1ldGFkYXRhLnRvU3VtbWFyeSgpO1xuXG4gIC8vIENhbGN1bGF0ZSB0aGUgaG9zdCBwcm9wZXJ0eSBiaW5kaW5nc1xuICBjb25zdCBiaW5kaW5ncyA9IGJpbmRpbmdQYXJzZXIuY3JlYXRlQm91bmRIb3N0UHJvcGVydGllcyhkaXJlY3RpdmVTdW1tYXJ5LCBob3N0QmluZGluZ1NvdXJjZVNwYW4pO1xuICBjb25zdCBiaW5kaW5nQ29udGV4dCA9IG8uaW1wb3J0RXhwcihSMy5sb2FkKS5jYWxsRm4oW28udmFyaWFibGUoJ2RpckluZGV4JyldKTtcbiAgaWYgKGJpbmRpbmdzKSB7XG4gICAgZm9yIChjb25zdCBiaW5kaW5nIG9mIGJpbmRpbmdzKSB7XG4gICAgICBjb25zdCBiaW5kaW5nRXhwciA9IGNvbnZlcnRQcm9wZXJ0eUJpbmRpbmcoXG4gICAgICAgICAgbnVsbCwgYmluZGluZ0NvbnRleHQsIGJpbmRpbmcuZXhwcmVzc2lvbiwgJ2InLCBCaW5kaW5nRm9ybS5UcnlTaW1wbGUsXG4gICAgICAgICAgKCkgPT4gZXJyb3IoJ1VuZXhwZWN0ZWQgaW50ZXJwb2xhdGlvbicpKTtcbiAgICAgIHN0YXRlbWVudHMucHVzaCguLi5iaW5kaW5nRXhwci5zdG10cyk7XG4gICAgICBzdGF0ZW1lbnRzLnB1c2goby5pbXBvcnRFeHByKFIzLmVsZW1lbnRQcm9wZXJ0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGxGbihbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgby52YXJpYWJsZSgnZWxJbmRleCcpLCBvLmxpdGVyYWwoYmluZGluZy5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmltcG9ydEV4cHIoUjMuYmluZCkuY2FsbEZuKFtiaW5kaW5nRXhwci5jdXJyVmFsRXhwcl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0bXQoKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIGhvc3QgZXZlbnQgYmluZGluZ3NcbiAgY29uc3QgZXZlbnRCaW5kaW5ncyA9XG4gICAgICBiaW5kaW5nUGFyc2VyLmNyZWF0ZURpcmVjdGl2ZUhvc3RFdmVudEFzdHMoZGlyZWN0aXZlU3VtbWFyeSwgaG9zdEJpbmRpbmdTb3VyY2VTcGFuKTtcbiAgaWYgKGV2ZW50QmluZGluZ3MpIHtcbiAgICBmb3IgKGNvbnN0IGJpbmRpbmcgb2YgZXZlbnRCaW5kaW5ncykge1xuICAgICAgY29uc3QgYmluZGluZ0V4cHIgPSBjb252ZXJ0QWN0aW9uQmluZGluZyhcbiAgICAgICAgICBudWxsLCBiaW5kaW5nQ29udGV4dCwgYmluZGluZy5oYW5kbGVyLCAnYicsICgpID0+IGVycm9yKCdVbmV4cGVjdGVkIGludGVycG9sYXRpb24nKSk7XG4gICAgICBjb25zdCBiaW5kaW5nTmFtZSA9IGJpbmRpbmcubmFtZSAmJiBzYW5pdGl6ZUlkZW50aWZpZXIoYmluZGluZy5uYW1lKTtcbiAgICAgIGNvbnN0IHR5cGVOYW1lID0gaWRlbnRpZmllck5hbWUoZGlyZWN0aXZlTWV0YWRhdGEudHlwZSk7XG4gICAgICBjb25zdCBmdW5jdGlvbk5hbWUgPVxuICAgICAgICAgIHR5cGVOYW1lICYmIGJpbmRpbmdOYW1lID8gYCR7dHlwZU5hbWV9XyR7YmluZGluZ05hbWV9X0hvc3RCaW5kaW5nSGFuZGxlcmAgOiBudWxsO1xuICAgICAgY29uc3QgaGFuZGxlciA9IG8uZm4oXG4gICAgICAgICAgW25ldyBvLkZuUGFyYW0oJ2V2ZW50Jywgby5EWU5BTUlDX1RZUEUpXSxcbiAgICAgICAgICBbLi4uYmluZGluZ0V4cHIuc3RtdHMsIG5ldyBvLlJldHVyblN0YXRlbWVudChiaW5kaW5nRXhwci5hbGxvd0RlZmF1bHQpXSwgby5JTkZFUlJFRF9UWVBFLFxuICAgICAgICAgIG51bGwsIGZ1bmN0aW9uTmFtZSk7XG4gICAgICBzdGF0ZW1lbnRzLnB1c2goXG4gICAgICAgICAgby5pbXBvcnRFeHByKFIzLmxpc3RlbmVyKS5jYWxsRm4oW28ubGl0ZXJhbChiaW5kaW5nLm5hbWUpLCBoYW5kbGVyXSkudG9TdG10KCkpO1xuICAgIH1cbiAgfVxuXG5cbiAgaWYgKHN0YXRlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHR5cGVOYW1lID0gZGlyZWN0aXZlTWV0YWRhdGEudHlwZS5yZWZlcmVuY2UubmFtZTtcbiAgICByZXR1cm4gby5mbihcbiAgICAgICAgW25ldyBvLkZuUGFyYW0oJ2RpckluZGV4Jywgby5OVU1CRVJfVFlQRSksIG5ldyBvLkZuUGFyYW0oJ2VsSW5kZXgnLCBvLk5VTUJFUl9UWVBFKV0sXG4gICAgICAgIHN0YXRlbWVudHMsIG8uSU5GRVJSRURfVFlQRSwgbnVsbCwgdHlwZU5hbWUgPyBgJHt0eXBlTmFtZX1fSG9zdEJpbmRpbmdzYCA6IG51bGwpO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0c09iamVjdChcbiAgICBkaXJlY3RpdmU6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0KTogby5FeHByZXNzaW9ufG51bGwge1xuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGlyZWN0aXZlLmlucHV0cykubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBvdXRwdXRDdHguY29uc3RhbnRQb29sLmdldENvbnN0TGl0ZXJhbChtYXBUb0V4cHJlc3Npb24oZGlyZWN0aXZlLmlucHV0cykpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jbGFzcyBWYWx1ZUNvbnZlcnRlciBleHRlbmRzIEFzdE1lbW9yeUVmZmljaWVudFRyYW5zZm9ybWVyIHtcbiAgcHJpdmF0ZSBwaXBlU2xvdHMgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0LCBwcml2YXRlIGFsbG9jYXRlU2xvdDogKCkgPT4gbnVtYmVyLFxuICAgICAgcHJpdmF0ZSBkZWZpbmVQaXBlOlxuICAgICAgICAgIChuYW1lOiBzdHJpbmcsIGxvY2FsTmFtZTogc3RyaW5nLCBzbG90OiBudW1iZXIsIHZhbHVlOiBvLkV4cHJlc3Npb24pID0+IHZvaWQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLy8gQXN0TWVtb3J5RWZmaWNpZW50VHJhbnNmb3JtZXJcbiAgdmlzaXRQaXBlKGFzdDogQmluZGluZ1BpcGUsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgLy8gQWxsb2NhdGUgYSBzbG90IHRvIGNyZWF0ZSB0aGUgcGlwZVxuICAgIGxldCBzbG90ID0gdGhpcy5waXBlU2xvdHMuZ2V0KGFzdC5uYW1lKTtcbiAgICBpZiAoc2xvdCA9PSBudWxsKSB7XG4gICAgICBzbG90ID0gdGhpcy5hbGxvY2F0ZVNsb3QoKTtcbiAgICAgIHRoaXMucGlwZVNsb3RzLnNldChhc3QubmFtZSwgc2xvdCk7XG4gICAgfVxuICAgIGNvbnN0IHNsb3RQc2V1ZG9Mb2NhbCA9IGBQSVBFOiR7c2xvdH1gO1xuICAgIGNvbnN0IHRhcmdldCA9IG5ldyBQcm9wZXJ0eVJlYWQoYXN0LnNwYW4sIG5ldyBJbXBsaWNpdFJlY2VpdmVyKGFzdC5zcGFuKSwgc2xvdFBzZXVkb0xvY2FsKTtcbiAgICBjb25zdCBiaW5kaW5nSWQgPSBwaXBlQmluZGluZyhhc3QuYXJncyk7XG4gICAgdGhpcy5kZWZpbmVQaXBlKGFzdC5uYW1lLCBzbG90UHNldWRvTG9jYWwsIHNsb3QsIG8uaW1wb3J0RXhwcihiaW5kaW5nSWQpKTtcbiAgICBjb25zdCB2YWx1ZSA9IGFzdC5leHAudmlzaXQodGhpcyk7XG4gICAgY29uc3QgYXJncyA9IHRoaXMudmlzaXRBbGwoYXN0LmFyZ3MpO1xuXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbkNhbGwoXG4gICAgICAgIGFzdC5zcGFuLCB0YXJnZXQsIFtuZXcgTGl0ZXJhbFByaW1pdGl2ZShhc3Quc3Bhbiwgc2xvdCksIHZhbHVlLCAuLi5hcmdzXSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxBcnJheShhc3Q6IExpdGVyYWxBcnJheSwgY29udGV4dDogYW55KTogQVNUIHtcbiAgICByZXR1cm4gbmV3IEJ1aWx0aW5GdW5jdGlvbkNhbGwoYXN0LnNwYW4sIHRoaXMudmlzaXRBbGwoYXN0LmV4cHJlc3Npb25zKSwgdmFsdWVzID0+IHtcbiAgICAgIC8vIElmIHRoZSBsaXRlcmFsIGhhcyBjYWxjdWxhdGVkIChub24tbGl0ZXJhbCkgZWxlbWVudHMgdHJhbnNmb3JtIGl0IGludG9cbiAgICAgIC8vIGNhbGxzIHRvIGxpdGVyYWwgZmFjdG9yaWVzIHRoYXQgY29tcG9zZSB0aGUgbGl0ZXJhbCBhbmQgd2lsbCBjYWNoZSBpbnRlcm1lZGlhdGVcbiAgICAgIC8vIHZhbHVlcy4gT3RoZXJ3aXNlLCBqdXN0IHJldHVybiBhbiBsaXRlcmFsIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHZhbHVlcy5cbiAgICAgIGNvbnN0IGxpdGVyYWwgPSBvLmxpdGVyYWxBcnIodmFsdWVzKTtcbiAgICAgIHJldHVybiB2YWx1ZXMuZXZlcnkoYSA9PiBhLmlzQ29uc3RhbnQoKSkgP1xuICAgICAgICAgIHRoaXMub3V0cHV0Q3R4LmNvbnN0YW50UG9vbC5nZXRDb25zdExpdGVyYWwobGl0ZXJhbCwgdHJ1ZSkgOlxuICAgICAgICAgIGdldExpdGVyYWxGYWN0b3J5KHRoaXMub3V0cHV0Q3R4LCBsaXRlcmFsKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpc2l0TGl0ZXJhbE1hcChhc3Q6IExpdGVyYWxNYXAsIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBCdWlsdGluRnVuY3Rpb25DYWxsKGFzdC5zcGFuLCB0aGlzLnZpc2l0QWxsKGFzdC52YWx1ZXMpLCB2YWx1ZXMgPT4ge1xuICAgICAgLy8gSWYgdGhlIGxpdGVyYWwgaGFzIGNhbGN1bGF0ZWQgKG5vbi1saXRlcmFsKSBlbGVtZW50cyAgdHJhbnNmb3JtIGl0IGludG9cbiAgICAgIC8vIGNhbGxzIHRvIGxpdGVyYWwgZmFjdG9yaWVzIHRoYXQgY29tcG9zZSB0aGUgbGl0ZXJhbCBhbmQgd2lsbCBjYWNoZSBpbnRlcm1lZGlhdGVcbiAgICAgIC8vIHZhbHVlcy4gT3RoZXJ3aXNlLCBqdXN0IHJldHVybiBhbiBsaXRlcmFsIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHZhbHVlcy5cbiAgICAgIGNvbnN0IGxpdGVyYWwgPSBvLmxpdGVyYWxNYXAodmFsdWVzLm1hcChcbiAgICAgICAgICAodmFsdWUsIGluZGV4KSA9PiAoe2tleTogYXN0LmtleXNbaW5kZXhdLmtleSwgdmFsdWUsIHF1b3RlZDogYXN0LmtleXNbaW5kZXhdLnF1b3RlZH0pKSk7XG4gICAgICByZXR1cm4gdmFsdWVzLmV2ZXJ5KGEgPT4gYS5pc0NvbnN0YW50KCkpID9cbiAgICAgICAgICB0aGlzLm91dHB1dEN0eC5jb25zdGFudFBvb2wuZ2V0Q29uc3RMaXRlcmFsKGxpdGVyYWwsIHRydWUpIDpcbiAgICAgICAgICBnZXRMaXRlcmFsRmFjdG9yeSh0aGlzLm91dHB1dEN0eCwgbGl0ZXJhbCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW52YWxpZDxUPihhcmc6IG8uRXhwcmVzc2lvbiB8IG8uU3RhdGVtZW50IHwgVGVtcGxhdGVBc3QpOiBuZXZlciB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBJbnZhbGlkIHN0YXRlOiBWaXNpdG9yICR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBkb2Vzbid0IGhhbmRsZSAke28uY29uc3RydWN0b3IubmFtZX1gKTtcbn1cblxuZnVuY3Rpb24gZmluZENvbXBvbmVudChkaXJlY3RpdmVzOiBEaXJlY3RpdmVBc3RbXSk6IERpcmVjdGl2ZUFzdHx1bmRlZmluZWQge1xuICByZXR1cm4gZGlyZWN0aXZlcy5maWx0ZXIoZGlyZWN0aXZlID0+IGRpcmVjdGl2ZS5kaXJlY3RpdmUuaXNDb21wb25lbnQpWzBdO1xufVxuXG5pbnRlcmZhY2UgTmdDb250ZW50SW5mbyB7XG4gIGluZGV4OiBudW1iZXI7XG4gIHNlbGVjdG9yPzogUjNDc3NTZWxlY3Rvcjtcbn1cblxuY2xhc3MgQ29udGVudFByb2plY3Rpb25WaXNpdG9yIGV4dGVuZHMgUmVjdXJzaXZlVGVtcGxhdGVBc3RWaXNpdG9yIHtcbiAgcHJpdmF0ZSBpbmRleCA9IDE7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBwcm9qZWN0aW9uTWFwOiBNYXA8TmdDb250ZW50QXN0LCBOZ0NvbnRlbnRJbmZvPixcbiAgICAgIHByaXZhdGUgbmdDb250ZW50U2VsZWN0b3JzOiBzdHJpbmdbXSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICB2aXNpdE5nQ29udGVudChhc3Q6IE5nQ29udGVudEFzdCkge1xuICAgIGNvbnN0IHNlbGVjdG9yVGV4dCA9IHRoaXMubmdDb250ZW50U2VsZWN0b3JzW2FzdC5pbmRleF07XG4gICAgc2VsZWN0b3JUZXh0ICE9IG51bGwgfHwgZXJyb3IoYGNvdWxkIG5vdCBmaW5kIHNlbGVjdG9yIGZvciBpbmRleCAke2FzdC5pbmRleH0gaW4gJHthc3R9YCk7XG4gICAgaWYgKCFzZWxlY3RvclRleHQgfHwgc2VsZWN0b3JUZXh0ID09PSAnKicpIHtcbiAgICAgIHRoaXMucHJvamVjdGlvbk1hcC5zZXQoYXN0LCB7aW5kZXg6IDB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY3NzU2VsZWN0b3JzID0gQ3NzU2VsZWN0b3IucGFyc2Uoc2VsZWN0b3JUZXh0KTtcbiAgICAgIHRoaXMucHJvamVjdGlvbk1hcC5zZXQoXG4gICAgICAgICAgYXN0LCB7aW5kZXg6IHRoaXMuaW5kZXgrKywgc2VsZWN0b3I6IHBhcnNlU2VsZWN0b3JzVG9SM1NlbGVjdG9yKGNzc1NlbGVjdG9ycyl9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q29udGVudFByb2plY3Rpb24oYXN0czogVGVtcGxhdGVBc3RbXSwgbmdDb250ZW50U2VsZWN0b3JzOiBzdHJpbmdbXSkge1xuICBjb25zdCBwcm9qZWN0SW5kZXhNYXAgPSBuZXcgTWFwPE5nQ29udGVudEFzdCwgTmdDb250ZW50SW5mbz4oKTtcbiAgY29uc3QgdmlzaXRvciA9IG5ldyBDb250ZW50UHJvamVjdGlvblZpc2l0b3IocHJvamVjdEluZGV4TWFwLCBuZ0NvbnRlbnRTZWxlY3RvcnMpO1xuICB0ZW1wbGF0ZVZpc2l0QWxsKHZpc2l0b3IsIGFzdHMpO1xuICByZXR1cm4gcHJvamVjdEluZGV4TWFwO1xufVxuXG4vLyBUaGVzZSBhcmUgYSBjb3B5IHRoZSBDU1MgdHlwZXMgZnJvbSBjb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvcHJvamVjdGlvbi50c1xuLy8gVGhleSBhcmUgZHVwbGljYXRlZCBoZXJlIGFzIHRoZXkgY2Fubm90IGJlIGRpcmVjdGx5IHJlZmVyZW5jZWQgZnJvbSBjb3JlLlxudHlwZSBSM1NpbXBsZUNzc1NlbGVjdG9yID0gKHN0cmluZyB8IG51bGwpW107XG50eXBlIFIzQ3NzU2VsZWN0b3JXaXRoTmVnYXRpb25zID1cbiAgICBbUjNTaW1wbGVDc3NTZWxlY3RvciwgbnVsbF0gfCBbUjNTaW1wbGVDc3NTZWxlY3RvciwgUjNTaW1wbGVDc3NTZWxlY3Rvcl07XG50eXBlIFIzQ3NzU2VsZWN0b3IgPSBSM0Nzc1NlbGVjdG9yV2l0aE5lZ2F0aW9uc1tdO1xuXG5mdW5jdGlvbiBwYXJzZXJTZWxlY3RvclRvU2ltcGxlU2VsZWN0b3Ioc2VsZWN0b3I6IENzc1NlbGVjdG9yKTogUjNTaW1wbGVDc3NTZWxlY3RvciB7XG4gIGNvbnN0IGNsYXNzZXMgPVxuICAgICAgc2VsZWN0b3IuY2xhc3NOYW1lcyAmJiBzZWxlY3Rvci5jbGFzc05hbWVzLmxlbmd0aCA/IFsnY2xhc3MnLCAuLi5zZWxlY3Rvci5jbGFzc05hbWVzXSA6IFtdO1xuICByZXR1cm4gW3NlbGVjdG9yLmVsZW1lbnQsIC4uLnNlbGVjdG9yLmF0dHJzLCAuLi5jbGFzc2VzXTtcbn1cblxuZnVuY3Rpb24gcGFyc2VyU2VsZWN0b3JUb1IzU2VsZWN0b3Ioc2VsZWN0b3I6IENzc1NlbGVjdG9yKTogUjNDc3NTZWxlY3RvcldpdGhOZWdhdGlvbnMge1xuICBjb25zdCBwb3NpdGl2ZSA9IHBhcnNlclNlbGVjdG9yVG9TaW1wbGVTZWxlY3RvcihzZWxlY3Rvcik7XG4gIGNvbnN0IG5lZ2F0aXZlID0gc2VsZWN0b3Iubm90U2VsZWN0b3JzICYmIHNlbGVjdG9yLm5vdFNlbGVjdG9ycy5sZW5ndGggJiZcbiAgICAgIHBhcnNlclNlbGVjdG9yVG9TaW1wbGVTZWxlY3RvcihzZWxlY3Rvci5ub3RTZWxlY3RvcnNbMF0pO1xuXG4gIHJldHVybiBuZWdhdGl2ZSA/IFtwb3NpdGl2ZSwgbmVnYXRpdmVdIDogW3Bvc2l0aXZlLCBudWxsXTtcbn1cblxuZnVuY3Rpb24gcGFyc2VTZWxlY3RvcnNUb1IzU2VsZWN0b3Ioc2VsZWN0b3JzOiBDc3NTZWxlY3RvcltdKTogUjNDc3NTZWxlY3RvciB7XG4gIHJldHVybiBzZWxlY3RvcnMubWFwKHBhcnNlclNlbGVjdG9yVG9SM1NlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gYXNMaXRlcmFsKHZhbHVlOiBhbnkpOiBvLkV4cHJlc3Npb24ge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gby5saXRlcmFsQXJyKHZhbHVlLm1hcChhc0xpdGVyYWwpKTtcbiAgfVxuICByZXR1cm4gby5saXRlcmFsKHZhbHVlLCBvLklORkVSUkVEX1RZUEUpO1xufVxuXG5mdW5jdGlvbiBtYXBUb0V4cHJlc3Npb24obWFwOiB7W2tleTogc3RyaW5nXTogYW55fSwgcXVvdGVkID0gZmFsc2UpOiBvLkV4cHJlc3Npb24ge1xuICByZXR1cm4gby5saXRlcmFsTWFwKFxuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobWFwKS5tYXAoa2V5ID0+ICh7a2V5LCBxdW90ZWQsIHZhbHVlOiBhc0xpdGVyYWwobWFwW2tleV0pfSkpKTtcbn1cblxuLy8gUGFyc2UgaTE4biBtZXRhcyBsaWtlOlxuLy8gLSBcIkBAaWRcIixcbi8vIC0gXCJkZXNjcmlwdGlvbltAQGlkXVwiLFxuLy8gLSBcIm1lYW5pbmd8ZGVzY3JpcHRpb25bQEBpZF1cIlxuZnVuY3Rpb24gcGFyc2VJMThuTWV0YShpMThuPzogc3RyaW5nKToge2Rlc2NyaXB0aW9uPzogc3RyaW5nLCBpZD86IHN0cmluZywgbWVhbmluZz86IHN0cmluZ30ge1xuICBsZXQgbWVhbmluZzogc3RyaW5nfHVuZGVmaW5lZDtcbiAgbGV0IGRlc2NyaXB0aW9uOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBsZXQgaWQ6IHN0cmluZ3x1bmRlZmluZWQ7XG5cbiAgaWYgKGkxOG4pIHtcbiAgICAvLyBUT0RPKHZpY2IpOiBmaWd1cmUgb3V0IGhvdyB0byBmb3JjZSBhIG1lc3NhZ2UgSUQgd2l0aCBjbG9zdXJlID9cbiAgICBjb25zdCBpZEluZGV4ID0gaTE4bi5pbmRleE9mKElEX1NFUEFSQVRPUik7XG5cbiAgICBjb25zdCBkZXNjSW5kZXggPSBpMThuLmluZGV4T2YoTUVBTklOR19TRVBBUkFUT1IpO1xuICAgIGxldCBtZWFuaW5nQW5kRGVzYzogc3RyaW5nO1xuICAgIFttZWFuaW5nQW5kRGVzYywgaWRdID1cbiAgICAgICAgKGlkSW5kZXggPiAtMSkgPyBbaTE4bi5zbGljZSgwLCBpZEluZGV4KSwgaTE4bi5zbGljZShpZEluZGV4ICsgMildIDogW2kxOG4sICcnXTtcbiAgICBbbWVhbmluZywgZGVzY3JpcHRpb25dID0gKGRlc2NJbmRleCA+IC0xKSA/XG4gICAgICAgIFttZWFuaW5nQW5kRGVzYy5zbGljZSgwLCBkZXNjSW5kZXgpLCBtZWFuaW5nQW5kRGVzYy5zbGljZShkZXNjSW5kZXggKyAxKV0gOlxuICAgICAgICBbJycsIG1lYW5pbmdBbmREZXNjXTtcbiAgfVxuXG4gIHJldHVybiB7ZGVzY3JpcHRpb24sIGlkLCBtZWFuaW5nfTtcbn1cbiJdfQ==