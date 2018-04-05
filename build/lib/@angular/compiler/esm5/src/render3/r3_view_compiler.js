/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { flatten, identifierName, sanitizeIdentifier, tokenReference } from '../compile_metadata';
import { BindingForm, BuiltinFunctionCall, convertActionBinding, convertPropertyBinding } from '../compiler_util/expression_converter';
import { AstMemoryEfficientTransformer, FunctionCall, ImplicitReceiver, LiteralPrimitive, PropertyRead } from '../expression_parser/ast';
import { Identifiers } from '../identifiers';
import { LifecycleHooks } from '../lifecycle_reflector';
import * as o from '../output/output_ast';
import { typeSourceSpan } from '../parse_util';
import { CssSelector } from '../selector';
import { PropertyBindingType, RecursiveTemplateAstVisitor, TextAst, templateVisitAll } from '../template_parser/template_ast';
import { error } from '../util';
import { Identifiers as R3 } from './r3_identifiers';
import { BUILD_OPTIMIZER_COLOCATE } from './r3_types';
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
export function compileDirective(outputCtx, directive, reflector, bindingParser, mode) {
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
    var className = identifierName(directive.type);
    className || error("Cannot resolver the name of " + directive.type);
    var definitionField = outputCtx.constantPool.propertyNameOf(1 /* Directive */);
    var definitionFunction = o.importExpr(R3.defineDirective).callFn([o.literalMap(definitionMapValues)]);
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
        outputCtx.statements.push(new o.CommentStmt(BUILD_OPTIMIZER_COLOCATE));
        outputCtx.statements.push(classReference.prop(definitionField).set(definitionFunction).toStmt());
    }
}
export function compileComponent(outputCtx, component, pipes, template, reflector, bindingParser, mode) {
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
    var selector = component.selector && CssSelector.parse(component.selector);
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
    if (component.type.lifecycleHooks.some(function (lifecycle) { return lifecycle == LifecycleHooks.OnChanges; })) {
        features.push(o.importExpr(R3.NgOnChangesFeature, null, null).callFn([outputCtx.importExpr(component.type.reference)]));
    }
    if (features.length) {
        field('features', o.literalArr(features));
    }
    var definitionField = outputCtx.constantPool.propertyNameOf(2 /* Component */);
    var definitionFunction = o.importExpr(R3.defineComponent).callFn([o.literalMap(definitionMapValues)]);
    if (mode === 0 /* PartialClass */) {
        var className = identifierName(component.type);
        className || error("Cannot resolver the name of " + component.type);
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
        outputCtx.statements.push(new o.CommentStmt(BUILD_OPTIMIZER_COLOCATE), classReference.prop(definitionField).set(definitionFunction).toStmt());
    }
}
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
    _a[PropertyBindingType.Property] = R3.elementProperty,
    _a[PropertyBindingType.Attribute] = R3.elementAttribute,
    _a[PropertyBindingType.Class] = R3.elementClassNamed,
    _a[PropertyBindingType.Style] = R3.elementStyleNamed,
    _a);
function interpolate(args) {
    args = args.slice(1); // Ignore the length prefix added for render2
    switch (args.length) {
        case 3:
            return o.importExpr(R3.interpolation1).callFn(args);
        case 5:
            return o.importExpr(R3.interpolation2).callFn(args);
        case 7:
            return o.importExpr(R3.interpolation3).callFn(args);
        case 9:
            return o.importExpr(R3.interpolation4).callFn(args);
        case 11:
            return o.importExpr(R3.interpolation5).callFn(args);
        case 13:
            return o.importExpr(R3.interpolation6).callFn(args);
        case 15:
            return o.importExpr(R3.interpolation7).callFn(args);
        case 17:
            return o.importExpr(R3.interpolation8).callFn(args);
    }
    (args.length >= 19 && args.length % 2 == 1) ||
        error("Invalid interpolation argument length " + args.length);
    return o.importExpr(R3.interpolationV).callFn([o.literalArr(args)]);
}
function pipeBinding(args) {
    switch (args.length) {
        case 0:
            // The first parameter to pipeBind is always the value to be transformed followed
            // by arg.length arguments so the total number of arguments to pipeBind are
            // arg.length + 1.
            return R3.pipeBind1;
        case 1:
            return R3.pipeBind2;
        case 2:
            return R3.pipeBind3;
        default:
            return R3.pipeBindV;
    }
}
var pureFunctionIdentifiers = [
    R3.pureFunction0, R3.pureFunction1, R3.pureFunction2, R3.pureFunction3, R3.pureFunction4,
    R3.pureFunction5, R3.pureFunction6, R3.pureFunction7, R3.pureFunction8
];
function getLiteralFactory(outputContext, literal) {
    var _a = outputContext.constantPool.getLiteralFactory(literal), literalFactory = _a.literalFactory, literalFactoryArguments = _a.literalFactoryArguments;
    literalFactoryArguments.length > 0 || error("Expected arguments to a literal factory function");
    var pureFunctionIdent = pureFunctionIdentifiers[literalFactoryArguments.length] || R3.pureFunctionV;
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
            error("The name " + name + " is already defined in scope to be " + this.map.get(name));
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
            pipe || error("Could not find pipe " + name);
            var pipeDefinition = constantPool.getDefinition(pipe.type.reference, 3 /* Pipe */, outputCtx, /* forceShared */ true);
            _this._creationMode.push(o.importExpr(R3.pipe)
                .callFn([
                o.literal(slot), pipeDefinition, pipeDefinition.callMethod(R3.NEW_METHOD, [])
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
                !infos_1.some(function (value) { return !value; }) || error("content project information skipped an index");
                if (infos_1.length > 1) {
                    parameters.push(this.outputCtx.constantPool.getConstLiteral(asLiteral(infos_1), /* forceShared */ true));
                }
                this.instruction.apply(this, tslib_1.__spread([this._creationMode, null, R3.projectionDef], parameters));
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
                this.instruction.apply(this, tslib_1.__spread([this._creationMode, null, R3.query], args));
                // (r3.qR(tmp = r3.ɵld(0)) && (ctx.someDir = tmp));
                var temporary = this.temp();
                var getQueryList = o.importExpr(R3.load).callFn([o.literal(querySlot)]);
                var refresh = o.importExpr(R3.queryRefresh).callFn([temporary.set(getQueryList)]);
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
        templateVisitAll(this, asts);
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
        info || error("Expected " + ast.sourceSpan + " to be included in content projection collection");
        var slot = this.allocateDataSlot();
        var parameters = [o.literal(slot), o.literal(this._projectionDefinitionIndex)];
        if (info.index !== 0) {
            parameters.push(o.literal(info.index));
        }
        this.instruction.apply(this, tslib_1.__spread([this._creationMode, ast.sourceSpan, R3.projection], parameters));
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
            var references = flatten(element.references.map(function (reference) {
                var slot = _this.allocateDataSlot();
                referenceDataSlots.set(reference.name, slot);
                // Generate the update temporary.
                var variableName = _this.bindingScope.freshReferenceName();
                _this._bindingMode.push(o.variable(variableName, o.INFERRED_TYPE)
                    .set(o.importExpr(R3.load).callFn([o.literal(slot)]))
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
        this.instruction.apply(this, tslib_1.__spread([this._creationMode, element.sourceSpan, R3.createElement], parameters));
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
                    this.unsupported("binding " + PropertyBindingType[input.type]);
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
            element.children[0] instanceof TextAst) {
            var text = element.children[0];
            this.visitSingleI18nTextChild(text, i18nMeta);
        }
        else {
            templateVisitAll(this, element.children);
        }
        // Finish element construction mode.
        this.instruction(this._creationMode, element.endSourceSpan || element.sourceSpan, R3.elementEnd);
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
                        this.instruction(this._bindingMode, directive.sourceSpan, R3.elementProperty, o.literal(nodeIndex), o.literal(input.templateName), o.importExpr(R3.bind).callFn([convertedBinding]));
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
                    .callMethod(R3.HOST_BINDING_METHOD, [o.literal(directiveIndex), o.literal(nodeIndex)])
                    .toStmt());
                // e.g. r(0, 0);
                this.instruction(this._refreshMode, directive.sourceSpan, R3.refreshComponent, o.literal(directiveIndex), o.literal(nodeIndex));
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
        var templateRef = this.reflector.resolveExternalReference(Identifiers.TemplateRef);
        var templateDirective = ast.directives.find(function (directive) { return directive.directive.type.diDeps.some(function (dependency) {
            return dependency.token != null && (tokenReference(dependency.token) == templateRef);
        }); });
        var contextName = this.contextName && templateDirective && templateDirective.directive.type.reference.name ?
            this.contextName + "_" + templateDirective.directive.type.reference.name :
            null;
        var templateName = contextName ? contextName + "_Template_" + templateIndex : "Template_" + templateIndex;
        var templateContext = "ctx" + this.level;
        var _a = this._computeDirectivesArray(ast.directives), directivesArray = _a.directivesArray, directiveIndexMap = _a.directiveIndexMap;
        // e.g. C(1, C1Template)
        this.instruction(this._creationMode, ast.sourceSpan, R3.containerCreate, o.literal(templateIndex), directivesArray, o.variable(templateName));
        // e.g. Cr(1)
        this.instruction(this._refreshMode, ast.sourceSpan, R3.containerRefreshStart, o.literal(templateIndex));
        // Generate directives
        this._visitDirectives(ast.directives, o.variable(this.contextParameter), templateIndex, directiveIndexMap);
        // e.g. cr();
        this.instruction(this._refreshMode, ast.sourceSpan, R3.containerRefreshEnd);
        // Create the template function
        var templateVisitor = new TemplateDefinitionBuilder(this.outputCtx, this.constantPool, this.reflector, templateContext, this.bindingScope.nestedScope(), this.level + 1, this.ngContentSelectors, contextName, templateName, this.pipes, []);
        var templateFunctionExpr = templateVisitor.buildTemplateFunction(ast.children, ast.variables);
        this._postfix.push(templateFunctionExpr.toDeclStmt(templateName, null));
    };
    // TemplateAstVisitor
    TemplateDefinitionBuilder.prototype.visitBoundText = function (ast) {
        var nodeIndex = this.allocateDataSlot();
        // Creation mode
        this.instruction(this._creationMode, ast.sourceSpan, R3.text, o.literal(nodeIndex));
        // Refresh mode
        this.instruction(this._refreshMode, ast.sourceSpan, R3.textCreateBound, o.literal(nodeIndex), this.bind(o.variable(CONTEXT_NAME), ast.value, ast.sourceSpan));
    };
    // TemplateAstVisitor
    TemplateDefinitionBuilder.prototype.visitText = function (ast) {
        // Text is defined in creation mode only.
        this.instruction(this._creationMode, ast.sourceSpan, R3.text, o.literal(this.allocateDataSlot()), o.literal(ast.value));
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
        this.instruction(this._creationMode, text.sourceSpan, R3.text, o.literal(this.allocateDataSlot()), variable);
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
        var convertedPropertyBinding = convertPropertyBinding(this, implicit, pipesConvertedValue, this.bindingContext(), BindingForm.TrySimple, interpolate);
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
        selectors.some(function (value) { return !value; }) && error('Found a type among the string selectors expected');
        predicate = outputCtx.constantPool.getConstLiteral(o.literalArr(selectors.map(function (value) { return o.literal(value); })));
    }
    else if (query.selectors.length == 1) {
        var first = query.selectors[0];
        if (first.identifier) {
            predicate = outputCtx.importExpr(first.identifier.reference);
        }
        else {
            error('Unexpected query form');
            predicate = o.literal(null);
        }
    }
    else {
        error('Unexpected query form');
        predicate = o.literal(null);
    }
    return predicate;
}
export function createFactory(type, outputCtx, reflector, queries) {
    var args = [];
    var elementRef = reflector.resolveExternalReference(Identifiers.ElementRef);
    var templateRef = reflector.resolveExternalReference(Identifiers.TemplateRef);
    var viewContainerRef = reflector.resolveExternalReference(Identifiers.ViewContainerRef);
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
                var tokenRef = tokenReference(token);
                if (tokenRef === elementRef) {
                    args.push(o.importExpr(R3.injectElementRef).callFn([]));
                }
                else if (tokenRef === templateRef) {
                    args.push(o.importExpr(R3.injectTemplateRef).callFn([]));
                }
                else if (tokenRef === viewContainerRef) {
                    args.push(o.importExpr(R3.injectViewContainerRef).callFn([]));
                }
                else {
                    var value = token.identifier != null ? outputCtx.importExpr(tokenRef) : o.literal(tokenRef);
                    args.push(o.importExpr(R3.inject).callFn([value]));
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
            queryDefinitions.push(o.importExpr(R3.query).callFn(parameters));
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
// Turn a directive selector into an R3-compatible selector for directive def
function createDirectiveSelector(selector) {
    return asLiteral(parseSelectorsToR3Selector(CssSelector.parse(selector)));
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
    var hostBindingSourceSpan = typeSourceSpan(directiveMetadata.isComponent ? 'Component' : 'Directive', directiveMetadata.type);
    // Calculate the queries
    for (var index = 0; index < directiveMetadata.queries.length; index++) {
        var query = directiveMetadata.queries[index];
        // e.g. r3.qR(tmp = r3.ld(dirIndex)[1]) && (r3.ld(dirIndex)[0].someDir = tmp);
        var getDirectiveMemory = o.importExpr(R3.load).callFn([o.variable('dirIndex')]);
        // The query list is at the query index + 1 because the directive itself is in slot 0.
        var getQueryList = getDirectiveMemory.key(o.literal(index + 1));
        var assignToTemporary = temporary().set(getQueryList);
        var callQueryRefresh = o.importExpr(R3.queryRefresh).callFn([assignToTemporary]);
        var updateDirective = getDirectiveMemory.key(o.literal(0, o.INFERRED_TYPE))
            .prop(query.propertyName)
            .set(query.first ? temporary().prop('first') : temporary());
        var andExpression = callQueryRefresh.and(updateDirective);
        statements.push(andExpression.toStmt());
    }
    var directiveSummary = directiveMetadata.toSummary();
    // Calculate the host property bindings
    var bindings = bindingParser.createBoundHostProperties(directiveSummary, hostBindingSourceSpan);
    var bindingContext = o.importExpr(R3.load).callFn([o.variable('dirIndex')]);
    if (bindings) {
        try {
            for (var bindings_1 = tslib_1.__values(bindings), bindings_1_1 = bindings_1.next(); !bindings_1_1.done; bindings_1_1 = bindings_1.next()) {
                var binding = bindings_1_1.value;
                var bindingExpr = convertPropertyBinding(null, bindingContext, binding.expression, 'b', BindingForm.TrySimple, function () { return error('Unexpected interpolation'); });
                statements.push.apply(statements, tslib_1.__spread(bindingExpr.stmts));
                statements.push(o.importExpr(R3.elementProperty)
                    .callFn([
                    o.variable('elIndex'), o.literal(binding.name),
                    o.importExpr(R3.bind).callFn([bindingExpr.currValExpr])
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
                var bindingExpr = convertActionBinding(null, bindingContext, binding.handler, 'b', function () { return error('Unexpected interpolation'); });
                var bindingName = binding.name && sanitizeIdentifier(binding.name);
                var typeName = identifierName(directiveMetadata.type);
                var functionName = typeName && bindingName ? typeName + "_" + bindingName + "_HostBindingHandler" : null;
                var handler = o.fn([new o.FnParam('event', o.DYNAMIC_TYPE)], tslib_1.__spread(bindingExpr.stmts, [new o.ReturnStatement(bindingExpr.allowDefault)]), o.INFERRED_TYPE, null, functionName);
                statements.push(o.importExpr(R3.listener).callFn([o.literal(binding.name), handler]).toStmt());
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
        var target = new PropertyRead(ast.span, new ImplicitReceiver(ast.span), slotPseudoLocal);
        var bindingId = pipeBinding(ast.args);
        this.definePipe(ast.name, slotPseudoLocal, slot, o.importExpr(bindingId));
        var value = ast.exp.visit(this);
        var args = this.visitAll(ast.args);
        return new FunctionCall(ast.span, target, tslib_1.__spread([new LiteralPrimitive(ast.span, slot), value], args));
    };
    ValueConverter.prototype.visitLiteralArray = function (ast, context) {
        var _this = this;
        return new BuiltinFunctionCall(ast.span, this.visitAll(ast.expressions), function (values) {
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
        return new BuiltinFunctionCall(ast.span, this.visitAll(ast.values), function (values) {
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
}(AstMemoryEfficientTransformer));
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
        selectorText != null || error("could not find selector for index " + ast.index + " in " + ast);
        if (!selectorText || selectorText === '*') {
            this.projectionMap.set(ast, { index: 0 });
        }
        else {
            var cssSelectors = CssSelector.parse(selectorText);
            this.projectionMap.set(ast, { index: this.index++, selector: parseSelectorsToR3Selector(cssSelectors) });
        }
    };
    return ContentProjectionVisitor;
}(RecursiveTemplateAstVisitor));
function getContentProjection(asts, ngContentSelectors) {
    var projectIndexMap = new Map();
    var visitor = new ContentProjectionVisitor(projectIndexMap, ngContentSelectors);
    templateVisitAll(visitor, asts);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfdmlld19jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX3ZpZXdfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBeUksT0FBTyxFQUFFLGNBQWMsRUFBb0Isa0JBQWtCLEVBQUUsY0FBYyxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBRXpRLE9BQU8sRUFBQyxXQUFXLEVBQW9CLG1CQUFtQixFQUFpRSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBaUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUV0UCxPQUFPLEVBQU0sNkJBQTZCLEVBQStCLFlBQVksRUFBRSxnQkFBZ0IsRUFBNEIsZ0JBQWdCLEVBQXlCLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzFOLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxLQUFLLENBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxQyxPQUFPLEVBQWtCLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXhDLE9BQU8sRUFBd0osbUJBQW1CLEVBQTJCLDJCQUEyQixFQUFpRCxPQUFPLEVBQWUsZ0JBQWdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4VyxPQUFPLEVBQWdCLEtBQUssRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxJQUFJLEVBQUUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBQyx3QkFBd0IsRUFBYSxNQUFNLFlBQVksQ0FBQztBQUdoRSxvRUFBb0U7QUFDcEUsSUFBTSxZQUFZLEdB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QUFFLFVBQUUsQ0FDaUU7UUFDcEY7O29DQUV3QixFQUZ2QixlQUFPLEVBQUUsbUJBQVcsQ0FFSTtJQUMzQixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUMsV0FBVyxhQUFBLEVBQUUsRUFBRSxJQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUMsQ0FBQzs7QUFDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIENvbXBpbGVEaXJlY3RpdmVTdW1tYXJ5LCBDb21waWxlUGlwZVN1bW1hcnksIENvbXBpbGVRdWVyeU1ldGFkYXRhLCBDb21waWxlVG9rZW5NZXRhZGF0YSwgQ29tcGlsZVR5cGVNZXRhZGF0YSwgZmxhdHRlbiwgaWRlbnRpZmllck5hbWUsIHJlbmRlcmVyVHlwZU5hbWUsIHNhbml0aXplSWRlbnRpZmllciwgdG9rZW5SZWZlcmVuY2UsIHZpZXdDbGFzc05hbWV9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtDb21waWxlUmVmbGVjdG9yfSBmcm9tICcuLi9jb21waWxlX3JlZmxlY3Rvcic7XG5pbXBvcnQge0JpbmRpbmdGb3JtLCBCdWlsdGluQ29udmVydGVyLCBCdWlsdGluRnVuY3Rpb25DYWxsLCBDb252ZXJ0UHJvcGVydHlCaW5kaW5nUmVzdWx0LCBFdmVudEhhbmRsZXJWYXJzLCBMb2NhbFJlc29sdmVyLCBjb252ZXJ0QWN0aW9uQmluZGluZywgY29udmVydFByb3BlcnR5QmluZGluZywgY29udmVydFByb3BlcnR5QmluZGluZ0J1aWx0aW5zfSBmcm9tICcuLi9jb21waWxlcl91dGlsL2V4cHJlc3Npb25fY29udmVydGVyJztcbmltcG9ydCB7Q29uc3RhbnRQb29sLCBEZWZpbml0aW9uS2luZH0gZnJvbSAnLi4vY29uc3RhbnRfcG9vbCc7XG5pbXBvcnQge0FTVCwgQXN0TWVtb3J5RWZmaWNpZW50VHJhbnNmb3JtZXIsIEFzdFRyYW5zZm9ybWVyLCBCaW5kaW5nUGlwZSwgRnVuY3Rpb25DYWxsLCBJbXBsaWNpdFJlY2VpdmVyLCBMaXRlcmFsQXJyYXksIExpdGVyYWxNYXAsIExpdGVyYWxQcmltaXRpdmUsIE1ldGhvZENhbGwsIFBhcnNlU3BhbiwgUHJvcGVydHlSZWFkfSBmcm9tICcuLi9leHByZXNzaW9uX3BhcnNlci9hc3QnO1xuaW1wb3J0IHtJZGVudGlmaWVyc30gZnJvbSAnLi4vaWRlbnRpZmllcnMnO1xuaW1wb3J0IHtMaWZlY3ljbGVIb29rc30gZnJvbSAnLi4vbGlmZWN5Y2xlX3JlZmxlY3Rvcic7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7UGFyc2VTb3VyY2VTcGFuLCB0eXBlU291cmNlU3Bhbn0gZnJvbSAnLi4vcGFyc2VfdXRpbCc7XG5pbXBvcnQge0Nzc1NlbGVjdG9yfSBmcm9tICcuLi9zZWxlY3Rvcic7XG5pbXBvcnQge0JpbmRpbmdQYXJzZXJ9IGZyb20gJy4uL3RlbXBsYXRlX3BhcnNlci9iaW5kaW5nX3BhcnNlcic7XG5pbXBvcnQge0F0dHJBc3QsIEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsIEJvdW5kRWxlbWVudFByb3BlcnR5QXN0LCBCb3VuZEV2ZW50QXN0LCBCb3VuZFRleHRBc3QsIERpcmVjdGl2ZUFzdCwgRWxlbWVudEFzdCwgRW1iZWRkZWRUZW1wbGF0ZUFzdCwgTmdDb250ZW50QXN0LCBQcm9wZXJ0eUJpbmRpbmdUeXBlLCBQcm92aWRlckFzdCwgUXVlcnlNYXRjaCwgUmVjdXJzaXZlVGVtcGxhdGVBc3RWaXNpdG9yLCBSZWZlcmVuY2VBc3QsIFRlbXBsYXRlQXN0LCBUZW1wbGF0ZUFzdFZpc2l0b3IsIFRleHRBc3QsIFZhcmlhYmxlQXN0LCB0ZW1wbGF0ZVZpc2l0QWxsfSBmcm9tICcuLi90ZW1wbGF0ZV9wYXJzZXIvdGVtcGxhdGVfYXN0JztcbmltcG9ydCB7T3V0cHV0Q29udGV4dCwgZXJyb3J9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtJZGVudGlmaWVycyBhcyBSM30gZnJvbSAnLi9yM19pZGVudGlmaWVycyc7XG5pbXBvcnQge0JVSUxEX09QVElNSVpFUl9DT0xPQ0FURSwgT3V0cHV0TW9kZX0gZnJvbSAnLi9yM190eXBlcyc7XG5cblxuLyoqIE5hbWUgb2YgdGhlIGNvbnRleHQgcGFyYW1ldGVyIHBhc3NlZCBpbnRvIGEgdGVtcGxhdGUgZnVuY3Rpb24gKi9cbmNvbnN0IENPTlRFWFRfTkFNRSA9ICdjdHgnO1xuXG4vKiogTmFtZSBvZiB0aGUgY3JlYXRpb24gbW9kZSBmbGFnIHBhc3NlZCBpbnRvIGEgdGVtcGxhdGUgZnVuY3Rpb24gKi9cbmNvbnN0IENSRUFUSU9OX01PREVfRkxBRyA9ICdjbSc7XG5cbi8qKiBOYW1lIG9mIHRoZSB0ZW1wb3JhcnkgdG8gdXNlIGR1cmluZyBkYXRhIGJpbmRpbmcgKi9cbmNvbnN0IFRFTVBPUkFSWV9OQU1FID0gJ190JztcblxuLyoqIFRoZSBwcmVmaXggcmVmZXJlbmNlIHZhcmlhYmxlcyAqL1xuY29uc3QgUkVGRVJFTkNFX1BSRUZJWCA9ICdfcic7XG5cbi8qKiBUaGUgbmFtZSBvZiB0aGUgaW1wbGljaXQgY29udGV4dCByZWZlcmVuY2UgKi9cbmNvbnN0IElNUExJQ0lUX1JFRkVSRU5DRSA9ICckaW1wbGljaXQnO1xuXG4vKiogTmFtZSBvZiB0aGUgaTE4biBhdHRyaWJ1dGVzICoqL1xuY29uc3QgSTE4Tl9BVFRSID0gJ2kxOG4nO1xuY29uc3QgSTE4Tl9BVFRSX1BSRUZJWCA9ICdpMThuLSc7XG5cbi8qKiBJMThuIHNlcGFyYXRvcnMgZm9yIG1ldGFkYXRhICoqL1xuY29uc3QgTUVBTklOR19TRVBBUkFUT1IgPSAnfCc7XG5jb25zdCBJRF9TRVBBUkFUT1IgPSAnQEAnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZURpcmVjdGl2ZShcbiAgICBvdXRwdXRDdHg6IE91dHB1dENvbnRleHQsIGRpcmVjdGl2ZTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCByZWZsZWN0b3I6IENvbXBpbGVSZWZsZWN0b3IsXG4gICAgYmluZGluZ1BhcnNlcjogQmluZGluZ1BhcnNlciwgbW9kZTogT3V0cHV0TW9kZSkge1xuICBjb25zdCBkZWZpbml0aW9uTWFwVmFsdWVzOiB7a2V5OiBzdHJpbmcsIHF1b3RlZDogYm9vbGVhbiwgdmFsdWU6IG8uRXhwcmVzc2lvbn1bXSA9IFtdO1xuXG4gIGNvbnN0IGZpZWxkID0gKGtleTogc3RyaW5nLCB2YWx1ZTogby5FeHByZXNzaW9uIHwgbnVsbCkgPT4ge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgZGVmaW5pdGlvbk1hcFZhbHVlcy5wdXNoKHtrZXksIHZhbHVlLCBxdW90ZWQ6IGZhbHNlfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGUuZy4gJ3R5cGU6IE15RGlyZWN0aXZlYFxuICBmaWVsZCgndHlwZScsIG91dHB1dEN0eC5pbXBvcnRFeHByKGRpcmVjdGl2ZS50eXBlLnJlZmVyZW5jZSkpO1xuXG4gIC8vIGUuZy4gYHNlbGVjdG9yOiBbW1tudWxsLCAnc29tZURpcicsICcnXSwgbnVsbF1dYFxuICBmaWVsZCgnc2VsZWN0b3InLCBjcmVhdGVEaXJlY3RpdmVTZWxlY3RvcihkaXJlY3RpdmUuc2VsZWN0b3IgISkpO1xuXG4gIC8vIGUuZy4gYGZhY3Rvcnk6ICgpID0+IG5ldyBNeUFwcChpbmplY3RFbGVtZW50UmVmKCkpYFxuICBmaWVsZCgnZmFjdG9yeScsIGNyZWF0ZUZhY3RvcnkoZGlyZWN0aXZlLnR5cGUsIG91dHB1dEN0eCwgcmVmbGVjdG9yLCBkaXJlY3RpdmUucXVlcmllcykpO1xuXG4gIC8vIGUuZy4gYGhvc3RCaW5kaW5nczogKGRpckluZGV4LCBlbEluZGV4KSA9PiB7IC4uLiB9XG4gIGZpZWxkKCdob3N0QmluZGluZ3MnLCBjcmVhdGVIb3N0QmluZGluZ3NGdW5jdGlvbihkaXJlY3RpdmUsIG91dHB1dEN0eCwgYmluZGluZ1BhcnNlcikpO1xuXG4gIC8vIGUuZy4gYGF0dHJpYnV0ZXM6IFsncm9sZScsICdsaXN0Ym94J11gXG4gIGZpZWxkKCdhdHRyaWJ1dGVzJywgY3JlYXRlSG9zdEF0dHJpYnV0ZXNBcnJheShkaXJlY3RpdmUsIG91dHB1dEN0eCkpO1xuXG4gIC8vIGUuZyAnaW5wdXRzOiB7YTogJ2EnfWBcbiAgZmllbGQoJ2lucHV0cycsIGNyZWF0ZUlucHV0c09iamVjdChkaXJlY3RpdmUsIG91dHB1dEN0eCkpO1xuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IGlkZW50aWZpZXJOYW1lKGRpcmVjdGl2ZS50eXBlKSAhO1xuICBjbGFzc05hbWUgfHwgZXJyb3IoYENhbm5vdCByZXNvbHZlciB0aGUgbmFtZSBvZiAke2RpcmVjdGl2ZS50eXBlfWApO1xuXG4gIGNvbnN0IGRlZmluaXRpb25GaWVsZCA9IG91dHB1dEN0eC5jb25zdGFudFBvb2wucHJvcGVydHlOYW1lT2YoRGVmaW5pdGlvbktpbmQuRGlyZWN0aXZlKTtcbiAgY29uc3QgZGVmaW5pdGlvbkZ1bmN0aW9uID1cbiAgICAgIG8uaW1wb3J0RXhwcihSMy5kZWZpbmVEaXJlY3RpdmUpLmNhbGxGbihbby5saXRlcmFsTWFwKGRlZmluaXRpb25NYXBWYWx1ZXMpXSk7XG5cbiAgaWYgKG1vZGUgPT09IE91dHB1dE1vZGUuUGFydGlhbENsYXNzKSB7XG4gICAgLy8gQ3JlYXRlIHRoZSBwYXJ0aWFsIGNsYXNzIHRvIGJlIG1lcmdlZCB3aXRoIHRoZSBhY3R1YWwgY2xhc3MuXG4gICAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChuZXcgby5DbGFzc1N0bXQoXG4gICAgICAgIC8qIG5hbWUgKi8gY2xhc3NOYW1lLFxuICAgICAgICAvKiBwYXJlbnQgKi8gbnVsbCxcbiAgICAgICAgLyogZmllbGRzICovW25ldyBvLkNsYXNzRmllbGQoXG4gICAgICAgICAgICAvKiBuYW1lICovIGRlZmluaXRpb25GaWVsZCxcbiAgICAgICAgICAgIC8qIHR5cGUgKi8gby5JTkZFUlJFRF9UWVBFLFxuICAgICAgICAgICAgLyogbW9kaWZpZXJzICovW28uU3RtdE1vZGlmaWVyLlN0YXRpY10sXG4gICAgICAgICAgICAvKiBpbml0aWFsaXplciAqLyBkZWZpbml0aW9uRnVuY3Rpb24pXSxcbiAgICAgICAgLyogZ2V0dGVycyAqL1tdLFxuICAgICAgICAvKiBjb25zdHJ1Y3Rvck1ldGhvZCAqLyBuZXcgby5DbGFzc01ldGhvZChudWxsLCBbXSwgW10pLFxuICAgICAgICAvKiBtZXRob2RzICovW10pKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBDcmVhdGUgYmFjay1wYXRjaCBkZWZpbml0aW9uLlxuICAgIGNvbnN0IGNsYXNzUmVmZXJlbmNlID0gb3V0cHV0Q3R4LmltcG9ydEV4cHIoZGlyZWN0aXZlLnR5cGUucmVmZXJlbmNlKTtcblxuICAgIC8vIENyZWF0ZSB0aGUgYmFjay1wYXRjaCBzdGF0ZW1lbnRcbiAgICBvdXRwdXRDdHguc3RhdGVtZW50cy5wdXNoKG5ldyBvLkNvbW1lbnRTdG10KEJVSUxEX09QVElNSVpFUl9DT0xPQ0FURSkpO1xuICAgIG91dHB1dEN0eC5zdGF0ZW1lbnRzLnB1c2goXG4gICAgICAgIGNsYXNzUmVmZXJlbmNlLnByb3AoZGVmaW5pdGlvbkZpZWxkKS5zZXQoZGVmaW5pdGlvbkZ1bmN0aW9uKS50b1N0bXQoKSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVDb21wb25lbnQoXG4gICAgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0LCBjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgcGlwZXM6IENvbXBpbGVQaXBlU3VtbWFyeVtdLFxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdLCByZWZsZWN0b3I6IENvbXBpbGVSZWZsZWN0b3IsIGJpbmRpbmdQYXJzZXI6IEJpbmRpbmdQYXJzZXIsXG4gICAgbW9kZTogT3V0cHV0TW9kZSkge1xuICBjb25zdCBkZWZpbml0aW9uTWFwVmFsdWVzOiB7a2V5OiBzdHJpbmcsIHF1b3RlZDogYm9vbGVhbiwgdmFsdWU6IG8uRXhwcmVzc2lvbn1bXSA9IFtdO1xuXG4gIGNvbnN0IGZpZWxkID0gKGtleTogc3RyaW5nLCB2YWx1ZTogby5FeHByZXNzaW9uIHwgbnVsbCkgPT4ge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgZGVmaW5pdGlvbk1hcFZhbHVlcy5wdXNoKHtrZXksIHZhbHVlLCBxdW90ZWQ6IGZhbHNlfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGUuZy4gYHR5cGU6IE15QXBwYFxuICBmaWVsZCgndHlwZScsIG91dHB1dEN0eC5pbXBvcnRFeHByKGNvbXBvbmVudC50eXBlLnJlZmVyZW5jZSkpO1xuXG4gIC8vIGUuZy4gYHNlbGVjdG9yOiBbW1snbXktYXBwJ10sIG51bGxdXWBcbiAgZmllbGQoJ3NlbGVjdG9yJywgY3JlYXRlRGlyZWN0aXZlU2VsZWN0b3IoY29tcG9uZW50LnNlbGVjdG9yICEpKTtcblxuICBjb25zdCBzZWxlY3RvciA9IGNvbXBvbmVudC5zZWxlY3RvciAmJiBDc3NTZWxlY3Rvci5wYXJzZShjb21wb25lbnQuc2VsZWN0b3IpO1xuICBjb25zdCBmaXJzdFNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3JbMF07XG5cbiAgLy8gZS5nLiBgYXR0cjogW1wiY2xhc3NcIiwgXCIubXkuYXBwXCJdXG4gIC8vIFRoaXMgaXMgb3B0aW9uYWwgYW4gb25seSBpbmNsdWRlZCBpZiB0aGUgZmlyc3Qgc2VsZWN0b3Igb2YgYSBjb21wb25lbnQgc3BlY2lmaWVzIGF0dHJpYnV0ZXMuXG4gIGlmIChmaXJzdFNlbGVjdG9yKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JBdHRyaWJ1dGVzID0gZmlyc3RTZWxlY3Rvci5nZXRBdHRycygpO1xuICAgIGlmIChzZWxlY3RvckF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICBmaWVsZChcbiAgICAgICAgICAnYXR0cnMnLCBvdXRwdXRDdHguY29uc3RhbnRQb29sLmdldENvbnN0TGl0ZXJhbChcbiAgICAgICAgICAgICAgICAgICAgICAgby5saXRlcmFsQXJyKHNlbGVjdG9yQXR0cmlidXRlcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PiB2YWx1ZSAhPSBudWxsID8gby5saXRlcmFsKHZhbHVlKSA6IG8ubGl0ZXJhbCh1bmRlZmluZWQpKSksXG4gICAgICAgICAgICAgICAgICAgICAgIC8qIGZvcmNlU2hhcmVkICovIHRydWUpKTtcbiAgICB9XG4gIH1cblxuICAvLyBlLmcuIGBmYWN0b3J5OiBmdW5jdGlvbiBNeUFwcF9GYWN0b3J5KCkgeyByZXR1cm4gbmV3IE15QXBwKGluamVjdEVsZW1lbnRSZWYoKSk7IH1gXG4gIGZpZWxkKCdmYWN0b3J5JywgY3JlYXRlRmFjdG9yeShjb21wb25lbnQudHlwZSwgb3V0cHV0Q3R4LCByZWZsZWN0b3IsIGNvbXBvbmVudC5xdWVyaWVzKSk7XG5cbiAgLy8gZS5nIGBob3N0QmluZGluZ3M6IGZ1bmN0aW9uIE15QXBwX0hvc3RCaW5kaW5ncyB7IC4uLiB9XG4gIGZpZWxkKCdob3N0QmluZGluZ3MnLCBjcmVhdGVIb3N0QmluZGluZ3NGdW5jdGlvbihjb21wb25lbnQsIG91dHB1dEN0eCwgYmluZGluZ1BhcnNlcikpO1xuXG4gIC8vIGUuZy4gYHRlbXBsYXRlOiBmdW5jdGlvbiBNeUNvbXBvbmVudF9UZW1wbGF0ZShfY3R4LCBfY20pIHsuLi59YFxuICBjb25zdCB0ZW1wbGF0ZVR5cGVOYW1lID0gY29tcG9uZW50LnR5cGUucmVmZXJlbmNlLm5hbWU7XG4gIGNvbnN0IHRlbXBsYXRlTmFtZSA9IHRlbXBsYXRlVHlwZU5hbWUgPyBgJHt0ZW1wbGF0ZVR5cGVOYW1lfV9UZW1wbGF0ZWAgOiBudWxsO1xuICBjb25zdCBwaXBlTWFwID0gbmV3IE1hcChwaXBlcy5tYXA8W3N0cmluZywgQ29tcGlsZVBpcGVTdW1tYXJ5XT4ocGlwZSA9PiBbcGlwZS5uYW1lLCBwaXBlXSkpO1xuICBjb25zdCB0ZW1wbGF0ZUZ1bmN0aW9uRXhwcmVzc2lvbiA9XG4gICAgICBuZXcgVGVtcGxhdGVEZWZpbml0aW9uQnVpbGRlcihcbiAgICAgICAgICBvdXRwdXRDdHgsIG91dHB1dEN0eC5jb25zdGFudFBvb2wsIHJlZmxlY3RvciwgQ09OVEVYVF9OQU1FLCBST09UX1NDT1BFLm5lc3RlZFNjb3BlKCksIDAsXG4gICAgICAgICAgY29tcG9uZW50LnRlbXBsYXRlICEubmdDb250ZW50U2VsZWN0b3JzLCB0ZW1wbGF0ZVR5cGVOYW1lLCB0ZW1wbGF0ZU5hbWUsIHBpcGVNYXAsXG4gICAgICAgICAgY29tcG9uZW50LnZpZXdRdWVyaWVzKVxuICAgICAgICAgIC5idWlsZFRlbXBsYXRlRnVuY3Rpb24odGVtcGxhdGUsIFtdKTtcblxuICBmaWVsZCgndGVtcGxhdGUnLCB0ZW1wbGF0ZUZ1bmN0aW9uRXhwcmVzc2lvbik7XG5cbiAgLy8gZS5nIGBpbnB1dHM6IHthOiAnYSd9YFxuICBmaWVsZCgnaW5wdXRzJywgY3JlYXRlSW5wdXRzT2JqZWN0KGNvbXBvbmVudCwgb3V0cHV0Q3R4KSk7XG5cbiAgLy8gZS5nLiBgZmVhdHVyZXM6IFtOZ09uQ2hhbmdlc0ZlYXR1cmUoTXlDb21wb25lbnQpXWBcbiAgY29uc3QgZmVhdHVyZXM6IG8uRXhwcmVzc2lvbltdID0gW107XG4gIGlmIChjb21wb25lbnQudHlwZS5saWZlY3ljbGVIb29rcy5zb21lKGxpZmVjeWNsZSA9PiBsaWZlY3ljbGUgPT0gTGlmZWN5Y2xlSG9va3MuT25DaGFuZ2VzKSkge1xuICAgIGZlYXR1cmVzLnB1c2goby5pbXBvcnRFeHByKFIzLk5nT25DaGFuZ2VzRmVhdHVyZSwgbnVsbCwgbnVsbCkuY2FsbEZuKFtvdXRwdXRDdHguaW1wb3J0RXhwcihcbiAgICAgICAgY29tcG9uZW50LnR5cGUucmVmZXJlbmNlKV0pKTtcbiAgfVxuICBpZiAoZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgZmllbGQoJ2ZlYXR1cmVzJywgby5saXRlcmFsQXJyKGZlYXR1cmVzKSk7XG4gIH1cblxuICBjb25zdCBkZWZpbml0aW9uRmllbGQgPSBvdXRwdXRDdHguY29uc3RhbnRQb29sLnByb3BlcnR5TmFtZU9mKERlZmluaXRpb25LaW5kLkNvbXBvbmVudCk7XG4gIGNvbnN0IGRlZmluaXRpb25GdW5jdGlvbiA9XG4gICAgICBvLmltcG9ydEV4cHIoUjMuZGVmaW5lQ29tcG9uZW50KS5jYWxsRm4oW28ubGl0ZXJhbE1hcChkZWZpbml0aW9uTWFwVmFsdWVzKV0pO1xuICBpZiAobW9kZSA9PT0gT3V0cHV0TW9kZS5QYXJ0aWFsQ2xhc3MpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBpZGVudGlmaWVyTmFtZShjb21wb25lbnQudHlwZSkgITtcbiAgICBjbGFzc05hbWUgfHwgZXJyb3IoYENhbm5vdCByZXNvbHZlciB0aGUgbmFtZSBvZiAke2NvbXBvbmVudC50eXBlfWApO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBwYXJ0aWFsIGNsYXNzIHRvIGJlIG1lcmdlZCB3aXRoIHRoZSBhY3R1YWwgY2xhc3MuXG4gICAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChuZXcgby5DbGFzc1N0bXQoXG4gICAgICAgIC8qIG5hbWUgKi8gY2xhc3NOYW1lLFxuICAgICAgICAvKiBwYXJlbnQgKi8gbnVsbCxcbiAgICAgICAgLyogZmllbGRzICovW25ldyBvLkNsYXNzRmllbGQoXG4gICAgICAgICAgICAvKiBuYW1lICovIGRlZmluaXRpb25GaWVsZCxcbiAgICAgICAgICAgIC8qIHR5cGUgKi8gby5JTkZFUlJFRF9UWVBFLFxuICAgICAgICAgICAgLyogbW9kaWZpZXJzICovW28uU3RtdE1vZGlmaWVyLlN0YXRpY10sXG4gICAgICAgICAgICAvKiBpbml0aWFsaXplciAqLyBkZWZpbml0aW9uRnVuY3Rpb24pXSxcbiAgICAgICAgLyogZ2V0dGVycyAqL1tdLFxuICAgICAgICAvKiBjb25zdHJ1Y3Rvck1ldGhvZCAqLyBuZXcgby5DbGFzc01ldGhvZChudWxsLCBbXSwgW10pLFxuICAgICAgICAvKiBtZXRob2RzICovW10pKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjbGFzc1JlZmVyZW5jZSA9IG91dHB1dEN0eC5pbXBvcnRFeHByKGNvbXBvbmVudC50eXBlLnJlZmVyZW5jZSk7XG5cbiAgICAvLyBDcmVhdGUgdGhlIGJhY2stcGF0Y2ggc3RhdGVtZW50XG4gICAgb3V0cHV0Q3R4LnN0YXRlbWVudHMucHVzaChcbiAgICAgICAgbmV3IG8uQ29tbWVudFN0bXQoQlVJTERfT1BUSU1JWkVSX0NPTE9DQVRFKSxcbiAgICAgICAgY2xhc3NSZWZlcmVuY2UucHJvcChkZWZpbml0aW9uRmllbGQpLnNldChkZWZpbml0aW9uRnVuY3Rpb24pLnRvU3RtdCgpKTtcbiAgfVxufVxuXG4vLyBUT0RPOiBSZW1vdmUgdGhlc2Ugd2hlbiB0aGUgdGhpbmdzIGFyZSBmdWxseSBzdXBwb3J0ZWRcbmZ1bmN0aW9uIHVua25vd248VD4oYXJnOiBvLkV4cHJlc3Npb24gfCBvLlN0YXRlbWVudCB8IFRlbXBsYXRlQXN0KTogbmV2ZXIge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgQnVpbGRlciAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gaXMgdW5hYmxlIHRvIGhhbmRsZSAke2FyZy5jb25zdHJ1Y3Rvci5uYW1lfSB5ZXRgKTtcbn1cblxuZnVuY3Rpb24gdW5zdXBwb3J0ZWQoZmVhdHVyZTogc3RyaW5nKTogbmV2ZXIge1xuICBpZiAodGhpcykge1xuICAgIHRocm93IG5ldyBFcnJvcihgQnVpbGRlciAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gZG9lc24ndCBzdXBwb3J0ICR7ZmVhdHVyZX0geWV0YCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBGZWF0dXJlICR7ZmVhdHVyZX0gaXMgbm90IHN1cHBvcnRlZCB5ZXRgKTtcbn1cblxuY29uc3QgQklORElOR19JTlNUUlVDVElPTl9NQVA6IHtbaW5kZXg6IG51bWJlcl06IG8uRXh0ZXJuYWxSZWZlcmVuY2UgfCB1bmRlZmluZWR9ID0ge1xuICBbUHJvcGVydHlCaW5kaW5nVHlwZS5Qcm9wZXJ0eV06IFIzLmVsZW1lbnRQcm9wZXJ0eSxcbiAgW1Byb3BlcnR5QmluZGluZ1R5cGUuQXR0cmlidXRlXTogUjMuZWxlbWVudEF0dHJpYnV0ZSxcbiAgW1Byb3BlcnR5QmluZGluZ1R5cGUuQ2xhc3NdOiBSMy5lbGVtZW50Q2xhc3NOYW1lZCxcbiAgW1Byb3BlcnR5QmluZGluZ1R5cGUuU3R5bGVdOiBSMy5lbGVtZW50U3R5bGVOYW1lZFxufTtcblxuZnVuY3Rpb24gaW50ZXJwb2xhdGUoYXJnczogby5FeHByZXNzaW9uW10pOiBvLkV4cHJlc3Npb24ge1xuICBhcmdzID0gYXJncy5zbGljZSgxKTsgIC8vIElnbm9yZSB0aGUgbGVuZ3RoIHByZWZpeCBhZGRlZCBmb3IgcmVuZGVyMlxuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbnRlcnBvbGF0aW9uMSkuY2FsbEZuKGFyZ3MpO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBvLmltcG9ydEV4cHIoUjMuaW50ZXJwb2xhdGlvbjIpLmNhbGxGbihhcmdzKTtcbiAgICBjYXNlIDc6XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmludGVycG9sYXRpb24zKS5jYWxsRm4oYXJncyk7XG4gICAgY2FzZSA5OlxuICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbnRlcnBvbGF0aW9uNCkuY2FsbEZuKGFyZ3MpO1xuICAgIGNhc2UgMTE6XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmludGVycG9sYXRpb241KS5jYWxsRm4oYXJncyk7XG4gICAgY2FzZSAxMzpcbiAgICAgIHJldHVybiBvLmltcG9ydEV4cHIoUjMuaW50ZXJwb2xhdGlvbjYpLmNhbGxGbihhcmdzKTtcbiAgICBjYXNlIDE1OlxuICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbnRlcnBvbGF0aW9uNykuY2FsbEZuKGFyZ3MpO1xuICAgIGNhc2UgMTc6XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmludGVycG9sYXRpb244KS5jYWxsRm4oYXJncyk7XG4gIH1cbiAgKGFyZ3MubGVuZ3RoID49IDE5ICYmIGFyZ3MubGVuZ3RoICUgMiA9PSAxKSB8fFxuICAgICAgZXJyb3IoYEludmFsaWQgaW50ZXJwb2xhdGlvbiBhcmd1bWVudCBsZW5ndGggJHthcmdzLmxlbmd0aH1gKTtcbiAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbnRlcnBvbGF0aW9uVikuY2FsbEZuKFtvLmxpdGVyYWxBcnIoYXJncyldKTtcbn1cblxuZnVuY3Rpb24gcGlwZUJpbmRpbmcoYXJnczogby5FeHByZXNzaW9uW10pOiBvLkV4dGVybmFsUmVmZXJlbmNlIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIC8vIFRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gcGlwZUJpbmQgaXMgYWx3YXlzIHRoZSB2YWx1ZSB0byBiZSB0cmFuc2Zvcm1lZCBmb2xsb3dlZFxuICAgICAgLy8gYnkgYXJnLmxlbmd0aCBhcmd1bWVudHMgc28gdGhlIHRvdGFsIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcGlwZUJpbmQgYXJlXG4gICAgICAvLyBhcmcubGVuZ3RoICsgMS5cbiAgICAgIHJldHVybiBSMy5waXBlQmluZDE7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIFIzLnBpcGVCaW5kMjtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gUjMucGlwZUJpbmQzO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gUjMucGlwZUJpbmRWO1xuICB9XG59XG5cbmNvbnN0IHB1cmVGdW5jdGlvbklkZW50aWZpZXJzID0gW1xuICBSMy5wdXJlRnVuY3Rpb24wLCBSMy5wdXJlRnVuY3Rpb24xLCBSMy5wdXJlRnVuY3Rpb24yLCBSMy5wdXJlRnVuY3Rpb24zLCBSMy5wdXJlRnVuY3Rpb240LFxuICBSMy5wdXJlRnVuY3Rpb241LCBSMy5wdXJlRnVuY3Rpb242LCBSMy5wdXJlRnVuY3Rpb243LCBSMy5wdXJlRnVuY3Rpb244XG5dO1xuZnVuY3Rpb24gZ2V0TGl0ZXJhbEZhY3RvcnkoXG4gICAgb3V0cHV0Q29udGV4dDogT3V0cHV0Q29udGV4dCwgbGl0ZXJhbDogby5MaXRlcmFsQXJyYXlFeHByIHwgby5MaXRlcmFsTWFwRXhwcik6IG8uRXhwcmVzc2lvbiB7XG4gIGNvbnN0IHtsaXRlcmFsRmFjdG9yeSwgbGl0ZXJhbEZhY3RvcnlBcmd1bWVudHN9ID1cbiAgICAgIG91dHB1dENvbnRleHQuY29uc3RhbnRQb29sLmdldExpdGVyYWxGYWN0b3J5KGxpdGVyYWwpO1xuICBsaXRlcmFsRmFjdG9yeUFyZ3VtZW50cy5sZW5ndGggPiAwIHx8IGVycm9yKGBFeHBlY3RlZCBhcmd1bWVudHMgdG8gYSBsaXRlcmFsIGZhY3RvcnkgZnVuY3Rpb25gKTtcbiAgbGV0IHB1cmVGdW5jdGlvbklkZW50ID1cbiAgICAgIHB1cmVGdW5jdGlvbklkZW50aWZpZXJzW2xpdGVyYWxGYWN0b3J5QXJndW1lbnRzLmxlbmd0aF0gfHwgUjMucHVyZUZ1bmN0aW9uVjtcblxuICAvLyBMaXRlcmFsIGZhY3RvcmllcyBhcmUgcHVyZSBmdW5jdGlvbnMgdGhhdCBvbmx5IG5lZWQgdG8gYmUgcmUtaW52b2tlZCB3aGVuIHRoZSBwYXJhbWV0ZXJzXG4gIC8vIGNoYW5nZS5cbiAgcmV0dXJuIG8uaW1wb3J0RXhwcihwdXJlRnVuY3Rpb25JZGVudCkuY2FsbEZuKFtsaXRlcmFsRmFjdG9yeSwgLi4ubGl0ZXJhbEZhY3RvcnlBcmd1bWVudHNdKTtcbn1cblxuY2xhc3MgQmluZGluZ1Njb3BlIHtcbiAgcHJpdmF0ZSBtYXAgPSBuZXcgTWFwPHN0cmluZywgby5FeHByZXNzaW9uPigpO1xuICBwcml2YXRlIHJlZmVyZW5jZU5hbWVJbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJlbnQ6IEJpbmRpbmdTY29wZXxudWxsKSB7fVxuXG4gIGdldChuYW1lOiBzdHJpbmcpOiBvLkV4cHJlc3Npb258bnVsbCB7XG4gICAgbGV0IGN1cnJlbnQ6IEJpbmRpbmdTY29wZXxudWxsID0gdGhpcztcbiAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgY29uc3QgdmFsdWUgPSBjdXJyZW50Lm1hcC5nZXQobmFtZSk7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAvLyBDYWNoZSB0aGUgdmFsdWUgbG9jYWxseS5cbiAgICAgICAgdGhpcy5tYXAuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHNldChuYW1lOiBzdHJpbmcsIHZhbHVlOiBvLkV4cHJlc3Npb24pOiBCaW5kaW5nU2NvcGUge1xuICAgICF0aGlzLm1hcC5oYXMobmFtZSkgfHxcbiAgICAgICAgZXJyb3IoYFRoZSBuYW1lICR7bmFtZX0gaXMgYWxyZWFkeSBkZWZpbmVkIGluIHNjb3BlIHRvIGJlICR7dGhpcy5tYXAuZ2V0KG5hbWUpfWApO1xuICAgIHRoaXMubWFwLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBuZXN0ZWRTY29wZSgpOiBCaW5kaW5nU2NvcGUgeyByZXR1cm4gbmV3IEJpbmRpbmdTY29wZSh0aGlzKTsgfVxuXG4gIGZyZXNoUmVmZXJlbmNlTmFtZSgpOiBzdHJpbmcge1xuICAgIGxldCBjdXJyZW50OiBCaW5kaW5nU2NvcGUgPSB0aGlzO1xuICAgIC8vIEZpbmQgdGhlIHRvcCBzY29wZSBhcyBpdCBtYWludGFpbnMgdGhlIGdsb2JhbCByZWZlcmVuY2UgY291bnRcbiAgICB3aGlsZSAoY3VycmVudC5wYXJlbnQpIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcbiAgICBjb25zdCByZWYgPSBgJHtSRUZFUkVOQ0VfUFJFRklYfSR7Y3VycmVudC5yZWZlcmVuY2VOYW1lSW5kZXgrK31gO1xuICAgIHJldHVybiByZWY7XG4gIH1cbn1cblxuY29uc3QgUk9PVF9TQ09QRSA9IG5ldyBCaW5kaW5nU2NvcGUobnVsbCkuc2V0KCckZXZlbnQnLCBvLnZhcmlhYmxlKCckZXZlbnQnKSk7XG5cbmNsYXNzIFRlbXBsYXRlRGVmaW5pdGlvbkJ1aWxkZXIgaW1wbGVtZW50cyBUZW1wbGF0ZUFzdFZpc2l0b3IsIExvY2FsUmVzb2x2ZXIge1xuICBwcml2YXRlIF9kYXRhSW5kZXggPSAwO1xuICBwcml2YXRlIF9iaW5kaW5nQ29udGV4dCA9IDA7XG4gIHByaXZhdGUgX3JlZmVyZW5jZUluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfdGVtcG9yYXJ5QWxsb2NhdGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX3ByZWZpeDogby5TdGF0ZW1lbnRbXSA9IFtdO1xuICBwcml2YXRlIF9jcmVhdGlvbk1vZGU6IG8uU3RhdGVtZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBfYmluZGluZ01vZGU6IG8uU3RhdGVtZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBfaG9zdE1vZGU6IG8uU3RhdGVtZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBfcmVmcmVzaE1vZGU6IG8uU3RhdGVtZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBfcG9zdGZpeDogby5TdGF0ZW1lbnRbXSA9IFtdO1xuICBwcml2YXRlIF9jb250ZW50UHJvamVjdGlvbnM6IE1hcDxOZ0NvbnRlbnRBc3QsIE5nQ29udGVudEluZm8+O1xuICBwcml2YXRlIF9wcm9qZWN0aW9uRGVmaW5pdGlvbkluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfdmFsdWVDb252ZXJ0ZXI6IFZhbHVlQ29udmVydGVyO1xuICBwcml2YXRlIHVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG4gIHByaXZhdGUgaW52YWxpZCA9IGludmFsaWQ7XG5cbiAgLy8gV2hldGhlciB3ZSBhcmUgaW5zaWRlIGEgdHJhbnNsYXRhYmxlIGVsZW1lbnQgKGA8cCBpMThuPi4uLiBzb21ld2hlcmUgaGVyZSAuLi4gPC9wPilcbiAgcHJpdmF0ZSBfaW5JMThuU2VjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9pMThuU2VjdGlvbkluZGV4ID0gLTE7XG4gIC8vIE1hcHMgb2YgcGxhY2Vob2xkZXIgdG8gbm9kZSBpbmRleGVzIGZvciBlYWNoIG9mIHRoZSBpMThuIHNlY3Rpb25cbiAgcHJpdmF0ZSBfcGhUb05vZGVJZHhlczoge1twaE5hbWU6IHN0cmluZ106IG51bWJlcltdfVtdID0gW3t9XTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0LCBwcml2YXRlIGNvbnN0YW50UG9vbDogQ29uc3RhbnRQb29sLFxuICAgICAgcHJpdmF0ZSByZWZsZWN0b3I6IENvbXBpbGVSZWZsZWN0b3IsIHByaXZhdGUgY29udGV4dFBhcmFtZXRlcjogc3RyaW5nLFxuICAgICAgcHJpdmF0ZSBiaW5kaW5nU2NvcGU6IEJpbmRpbmdTY29wZSwgcHJpdmF0ZSBsZXZlbCA9IDAsIHByaXZhdGUgbmdDb250ZW50U2VsZWN0b3JzOiBzdHJpbmdbXSxcbiAgICAgIHByaXZhdGUgY29udGV4dE5hbWU6IHN0cmluZ3xudWxsLCBwcml2YXRlIHRlbXBsYXRlTmFtZTogc3RyaW5nfG51bGwsXG4gICAgICBwcml2YXRlIHBpcGVzOiBNYXA8c3RyaW5nLCBDb21waWxlUGlwZVN1bW1hcnk+LCBwcml2YXRlIHZpZXdRdWVyaWVzOiBDb21waWxlUXVlcnlNZXRhZGF0YVtdKSB7XG4gICAgdGhpcy5fdmFsdWVDb252ZXJ0ZXIgPSBuZXcgVmFsdWVDb252ZXJ0ZXIoXG4gICAgICAgIG91dHB1dEN0eCwgKCkgPT4gdGhpcy5hbGxvY2F0ZURhdGFTbG90KCksIChuYW1lLCBsb2NhbE5hbWUsIHNsb3QsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgYmluZGluZ1Njb3BlLnNldChsb2NhbE5hbWUsIHZhbHVlKTtcbiAgICAgICAgICBjb25zdCBwaXBlID0gcGlwZXMuZ2V0KG5hbWUpICE7XG4gICAgICAgICAgcGlwZSB8fCBlcnJvcihgQ291bGQgbm90IGZpbmQgcGlwZSAke25hbWV9YCk7XG4gICAgICAgICAgY29uc3QgcGlwZURlZmluaXRpb24gPSBjb25zdGFudFBvb2wuZ2V0RGVmaW5pdGlvbihcbiAgICAgICAgICAgICAgcGlwZS50eXBlLnJlZmVyZW5jZSwgRGVmaW5pdGlvbktpbmQuUGlwZSwgb3V0cHV0Q3R4LCAvKiBmb3JjZVNoYXJlZCAqLyB0cnVlKTtcbiAgICAgICAgICB0aGlzLl9jcmVhdGlvbk1vZGUucHVzaChcbiAgICAgICAgICAgICAgby5pbXBvcnRFeHByKFIzLnBpcGUpXG4gICAgICAgICAgICAgICAgICAuY2FsbEZuKFtcbiAgICAgICAgICAgICAgICAgICAgby5saXRlcmFsKHNsb3QpLCBwaXBlRGVmaW5pdGlvbiwgcGlwZURlZmluaXRpb24uY2FsbE1ldGhvZChSMy5ORVdfTUVUSE9ELCBbXSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAudG9TdG10KCkpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIGJ1aWxkVGVtcGxhdGVGdW5jdGlvbihhc3RzOiBUZW1wbGF0ZUFzdFtdLCB2YXJpYWJsZXM6IFZhcmlhYmxlQXN0W10pOiBvLkZ1bmN0aW9uRXhwciB7XG4gICAgLy8gQ3JlYXRlIHZhcmlhYmxlIGJpbmRpbmdzXG4gICAgZm9yIChjb25zdCB2YXJpYWJsZSBvZiB2YXJpYWJsZXMpIHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlTmFtZSA9IHZhcmlhYmxlLm5hbWU7XG4gICAgICBjb25zdCBleHByZXNzaW9uID1cbiAgICAgICAgICBvLnZhcmlhYmxlKHRoaXMuY29udGV4dFBhcmFtZXRlcikucHJvcCh2YXJpYWJsZS52YWx1ZSB8fCBJTVBMSUNJVF9SRUZFUkVOQ0UpO1xuICAgICAgY29uc3Qgc2NvcGVkTmFtZSA9IHRoaXMuYmluZGluZ1Njb3BlLmZyZXNoUmVmZXJlbmNlTmFtZSgpO1xuICAgICAgY29uc3QgZGVjbGFyYXRpb24gPSBvLnZhcmlhYmxlKHNjb3BlZE5hbWUpLnNldChleHByZXNzaW9uKS50b0RlY2xTdG10KG8uSU5GRVJSRURfVFlQRSwgW1xuICAgICAgICBvLlN0bXRNb2RpZmllci5GaW5hbFxuICAgICAgXSk7XG5cbiAgICAgIC8vIEFkZCB0aGUgcmVmZXJlbmNlIHRvIHRoZSBsb2NhbCBzY29wZS5cbiAgICAgIHRoaXMuYmluZGluZ1Njb3BlLnNldCh2YXJpYWJsZU5hbWUsIG8udmFyaWFibGUoc2NvcGVkTmFtZSkpO1xuXG4gICAgICAvLyBEZWNsYXJlIHRoZSBsb2NhbCB2YXJpYWJsZSBpbiBiaW5kaW5nIG1vZGVcbiAgICAgIHRoaXMuX2JpbmRpbmdNb2RlLnB1c2goZGVjbGFyYXRpb24pO1xuICAgIH1cblxuICAgIC8vIENvbGxlY3QgY29udGVudCBwcm9qZWN0aW9uc1xuICAgIGlmICh0aGlzLm5nQ29udGVudFNlbGVjdG9ycyAmJiB0aGlzLm5nQ29udGVudFNlbGVjdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjb250ZW50UHJvamVjdGlvbnMgPSBnZXRDb250ZW50UHJvamVjdGlvbihhc3RzLCB0aGlzLm5nQ29udGVudFNlbGVjdG9ycyk7XG4gICAgICB0aGlzLl9jb250ZW50UHJvamVjdGlvbnMgPSBjb250ZW50UHJvamVjdGlvbnM7XG4gICAgICBpZiAoY29udGVudFByb2plY3Rpb25zLnNpemUgPiAwKSB7XG4gICAgICAgIGNvbnN0IGluZm9zOiBSM0Nzc1NlbGVjdG9yW10gPSBbXTtcbiAgICAgICAgQXJyYXkuZnJvbShjb250ZW50UHJvamVjdGlvbnMudmFsdWVzKCkpLmZvckVhY2goaW5mbyA9PiB7XG4gICAgICAgICAgaWYgKGluZm8uc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGluZm9zW2luZm8uaW5kZXggLSAxXSA9IGluZm8uc2VsZWN0b3I7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcHJvamVjdGlvbkluZGV4ID0gdGhpcy5fcHJvamVjdGlvbkRlZmluaXRpb25JbmRleCA9IHRoaXMuYWxsb2NhdGVEYXRhU2xvdCgpO1xuICAgICAgICBjb25zdCBwYXJhbWV0ZXJzOiBvLkV4cHJlc3Npb25bXSA9IFtvLmxpdGVyYWwocHJvamVjdGlvbkluZGV4KV07XG4gICAgICAgICFpbmZvcy5zb21lKHZhbHVlID0+ICF2YWx1ZSkgfHwgZXJyb3IoYGNvbnRlbnQgcHJvamVjdCBpbmZvcm1hdGlvbiBza2lwcGVkIGFuIGluZGV4YCk7XG4gICAgICAgIGlmIChpbmZvcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcGFyYW1ldGVycy5wdXNoKHRoaXMub3V0cHV0Q3R4LmNvbnN0YW50UG9vbC5nZXRDb25zdExpdGVyYWwoXG4gICAgICAgICAgICAgIGFzTGl0ZXJhbChpbmZvcyksIC8qIGZvcmNlU2hhcmVkICovIHRydWUpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluc3RydWN0aW9uKHRoaXMuX2NyZWF0aW9uTW9kZSwgbnVsbCwgUjMucHJvamVjdGlvbkRlZiwgLi4ucGFyYW1ldGVycyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIGFuZCB1cGRhdGUgYW55IHZpZXcgcXVlcmllc1xuICAgIGZvciAobGV0IHF1ZXJ5IG9mIHRoaXMudmlld1F1ZXJpZXMpIHtcbiAgICAgIC8vIGUuZy4gcjMuUSgwLCBTb21lRGlyZWN0aXZlLCB0cnVlKTtcbiAgICAgIGNvbnN0IHF1ZXJ5U2xvdCA9IHRoaXMuYWxsb2NhdGVEYXRhU2xvdCgpO1xuICAgICAgY29uc3QgcHJlZGljYXRlID0gZ2V0UXVlcnlQcmVkaWNhdGUocXVlcnksIHRoaXMub3V0cHV0Q3R4KTtcbiAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgIC8qIG1lbW9yeUluZGV4ICovIG8ubGl0ZXJhbChxdWVyeVNsb3QsIG8uSU5GRVJSRURfVFlQRSksXG4gICAgICAgIC8qIHByZWRpY2F0ZSAqLyBwcmVkaWNhdGUsXG4gICAgICAgIC8qIGRlc2NlbmQgKi8gby5saXRlcmFsKHF1ZXJ5LmRlc2NlbmRhbnRzLCBvLklORkVSUkVEX1RZUEUpXG4gICAgICBdO1xuXG4gICAgICBpZiAocXVlcnkucmVhZCkge1xuICAgICAgICBhcmdzLnB1c2godGhpcy5vdXRwdXRDdHguaW1wb3J0RXhwcihxdWVyeS5yZWFkLmlkZW50aWZpZXIgIS5yZWZlcmVuY2UpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb24odGhpcy5fY3JlYXRpb25Nb2RlLCBudWxsLCBSMy5xdWVyeSwgLi4uYXJncyk7XG5cbiAgICAgIC8vIChyMy5xUih0bXAgPSByMy7JtWxkKDApKSAmJiAoY3R4LnNvbWVEaXIgPSB0bXApKTtcbiAgICAgIGNvbnN0IHRlbXBvcmFyeSA9IHRoaXMudGVtcCgpO1xuICAgICAgY29uc3QgZ2V0UXVlcnlMaXN0ID0gby5pbXBvcnRFeHByKFIzLmxvYWQpLmNhbGxGbihbby5saXRlcmFsKHF1ZXJ5U2xvdCldKTtcbiAgICAgIGNvbnN0IHJlZnJlc2ggPSBvLmltcG9ydEV4cHIoUjMucXVlcnlSZWZyZXNoKS5jYWxsRm4oW3RlbXBvcmFyeS5zZXQoZ2V0UXVlcnlMaXN0KV0pO1xuICAgICAgY29uc3QgdXBkYXRlRGlyZWN0aXZlID0gby52YXJpYWJsZShDT05URVhUX05BTUUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AocXVlcnkucHJvcGVydHlOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQocXVlcnkuZmlyc3QgPyB0ZW1wb3JhcnkucHJvcCgnZmlyc3QnKSA6IHRlbXBvcmFyeSk7XG4gICAgICB0aGlzLl9iaW5kaW5nTW9kZS5wdXNoKHJlZnJlc2guYW5kKHVwZGF0ZURpcmVjdGl2ZSkudG9TdG10KCkpO1xuICAgIH1cblxuICAgIHRlbXBsYXRlVmlzaXRBbGwodGhpcywgYXN0cyk7XG5cbiAgICBjb25zdCBjcmVhdGlvbk1vZGUgPSB0aGlzLl9jcmVhdGlvbk1vZGUubGVuZ3RoID4gMCA/XG4gICAgICAgIFtvLmlmU3RtdChvLnZhcmlhYmxlKENSRUFUSU9OX01PREVfRkxBRyksIHRoaXMuX2NyZWF0aW9uTW9kZSldIDpcbiAgICAgICAgW107XG5cbiAgICAvLyBHZW5lcmF0ZSBtYXBzIG9mIHBsYWNlaG9sZGVyIG5hbWUgdG8gbm9kZSBpbmRleGVzXG4gICAgLy8gVE9ETyh2aWNiKTogVGhpcyBpcyBhIFdJUCwgbm90IGZ1bGx5IHN1cHBvcnRlZCB5ZXRcbiAgICBmb3IgKGNvbnN0IHBoVG9Ob2RlSWR4IG9mIHRoaXMuX3BoVG9Ob2RlSWR4ZXMpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhwaFRvTm9kZUlkeCkubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBzY29wZWROYW1lID0gdGhpcy5iaW5kaW5nU2NvcGUuZnJlc2hSZWZlcmVuY2VOYW1lKCk7XG4gICAgICAgIGNvbnN0IHBoTWFwID0gby52YXJpYWJsZShzY29wZWROYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0KG1hcFRvRXhwcmVzc2lvbihwaFRvTm9kZUlkeCwgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50b0RlY2xTdG10KG8uSU5GRVJSRURfVFlQRSwgW28uU3RtdE1vZGlmaWVyLkZpbmFsXSk7XG5cbiAgICAgICAgdGhpcy5fcHJlZml4LnB1c2gocGhNYXApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvLmZuKFxuICAgICAgICBbXG4gICAgICAgICAgbmV3IG8uRm5QYXJhbSh0aGlzLmNvbnRleHRQYXJhbWV0ZXIsIG51bGwpLCBuZXcgby5GblBhcmFtKENSRUFUSU9OX01PREVfRkxBRywgby5CT09MX1RZUEUpXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAvLyBUZW1wb3JhcnkgdmFyaWFibGUgZGVjbGFyYXRpb25zIChpLmUuIGxldCBfdDogYW55OylcbiAgICAgICAgICAuLi50aGlzLl9wcmVmaXgsXG4gICAgICAgICAgLy8gQ3JlYXRpbmcgbW9kZSAoaS5lLiBpZiAoY20pIHsgLi4uIH0pXG4gICAgICAgICAgLi4uY3JlYXRpb25Nb2RlLFxuICAgICAgICAgIC8vIEJpbmRpbmcgbW9kZSAoaS5lLiDJtXAoLi4uKSlcbiAgICAgICAgICAuLi50aGlzLl9iaW5kaW5nTW9kZSxcbiAgICAgICAgICAvLyBIb3N0IG1vZGUgKGkuZS4gQ29tcC5oKC4uLikpXG4gICAgICAgICAgLi4udGhpcy5faG9zdE1vZGUsXG4gICAgICAgICAgLy8gUmVmcmVzaCBtb2RlIChpLmUuIENvbXAuciguLi4pKVxuICAgICAgICAgIC4uLnRoaXMuX3JlZnJlc2hNb2RlLFxuICAgICAgICAgIC8vIE5lc3RlZCB0ZW1wbGF0ZXMgKGkuZS4gZnVuY3Rpb24gQ29tcFRlbXBsYXRlKCkge30pXG4gICAgICAgICAgLi4udGhpcy5fcG9zdGZpeFxuICAgICAgICBdLFxuICAgICAgICBvLklORkVSUkVEX1RZUEUsIG51bGwsIHRoaXMudGVtcGxhdGVOYW1lKTtcbiAgfVxuXG4gIC8vIExvY2FsUmVzb2x2ZXJcbiAgZ2V0TG9jYWwobmFtZTogc3RyaW5nKTogby5FeHByZXNzaW9ufG51bGwgeyByZXR1cm4gdGhpcy5iaW5kaW5nU2NvcGUuZ2V0KG5hbWUpOyB9XG5cbiAgLy8gVGVtcGxhdGVBc3RWaXNpdG9yXG4gIHZpc2l0TmdDb250ZW50KGFzdDogTmdDb250ZW50QXN0KSB7XG4gICAgY29uc3QgaW5mbyA9IHRoaXMuX2NvbnRlbnRQcm9qZWN0aW9ucy5nZXQoYXN0KSAhO1xuICAgIGluZm8gfHwgZXJyb3IoYEV4cGVjdGVkICR7YXN0LnNvdXJjZVNwYW59IHRvIGJlIGluY2x1ZGVkIGluIGNvbnRlbnQgcHJvamVjdGlvbiBjb2xsZWN0aW9uYCk7XG4gICAgY29uc3Qgc2xvdCA9IHRoaXMuYWxsb2NhdGVEYXRhU2xvdCgpO1xuICAgIGNvbnN0IHBhcmFtZXRlcnMgPSBbby5saXRlcmFsKHNsb3QpLCBvLmxpdGVyYWwodGhpcy5fcHJvamVjdGlvbkRlZmluaXRpb25JbmRleCldO1xuICAgIGlmIChpbmZvLmluZGV4ICE9PSAwKSB7XG4gICAgICBwYXJhbWV0ZXJzLnB1c2goby5saXRlcmFsKGluZm8uaW5kZXgpKTtcbiAgICB9XG4gICAgdGhpcy5pbnN0cnVjdGlvbih0aGlzLl9jcmVhdGlvbk1vZGUsIGFzdC5zb3VyY2VTcGFuLCBSMy5wcm9qZWN0aW9uLCAuLi5wYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbXB1dGVEaXJlY3RpdmVzQXJyYXkoZGlyZWN0aXZlczogRGlyZWN0aXZlQXN0W10pIHtcbiAgICBjb25zdCBkaXJlY3RpdmVJbmRleE1hcCA9IG5ldyBNYXA8YW55LCBudW1iZXI+KCk7XG4gICAgY29uc3QgZGlyZWN0aXZlRXhwcmVzc2lvbnM6IG8uRXhwcmVzc2lvbltdID1cbiAgICAgICAgZGlyZWN0aXZlcy5maWx0ZXIoZGlyZWN0aXZlID0+ICFkaXJlY3RpdmUuZGlyZWN0aXZlLmlzQ29tcG9uZW50KS5tYXAoZGlyZWN0aXZlID0+IHtcbiAgICAgICAgICBkaXJlY3RpdmVJbmRleE1hcC5zZXQoZGlyZWN0aXZlLmRpcmVjdGl2ZS50eXBlLnJlZmVyZW5jZSwgdGhpcy5hbGxvY2F0ZURhdGFTbG90KCkpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnR5cGVSZWZlcmVuY2UoZGlyZWN0aXZlLmRpcmVjdGl2ZS50eXBlLnJlZmVyZW5jZSk7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICBkaXJlY3RpdmVzQXJyYXk6IGRpcmVjdGl2ZUV4cHJlc3Npb25zLmxlbmd0aCA/XG4gICAgICAgICAgdGhpcy5jb25zdGFudFBvb2wuZ2V0Q29uc3RMaXRlcmFsKFxuICAgICAgICAgICAgICBvLmxpdGVyYWxBcnIoZGlyZWN0aXZlRXhwcmVzc2lvbnMpLCAvKiBmb3JjZVNoYXJlZCAqLyB0cnVlKSA6XG4gICAgICAgICAgby5saXRlcmFsKG51bGwpLFxuICAgICAgZGlyZWN0aXZlSW5kZXhNYXBcbiAgICB9O1xuICB9XG5cbiAgLy8gVGVtcGxhdGVBc3RWaXNpdG9yXG4gIHZpc2l0RWxlbWVudChlbGVtZW50OiBFbGVtZW50QXN0KSB7XG4gICAgY29uc3QgZWxlbWVudEluZGV4ID0gdGhpcy5hbGxvY2F0ZURhdGFTbG90KCk7XG4gICAgbGV0IGNvbXBvbmVudEluZGV4OiBudW1iZXJ8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHJlZmVyZW5jZURhdGFTbG90cyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gICAgY29uc3Qgd2FzSW5JMThuU2VjdGlvbiA9IHRoaXMuX2luSTE4blNlY3Rpb247XG5cbiAgICBjb25zdCBvdXRwdXRBdHRyczoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgY29uc3QgYXR0ckkxOG5NZXRhczoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgbGV0IGkxOG5NZXRhOiBzdHJpbmcgPSAnJztcblxuICAgIC8vIEVsZW1lbnRzIGluc2lkZSBpMThuIHNlY3Rpb25zIGFyZSByZXBsYWNlZCB3aXRoIHBsYWNlaG9sZGVyc1xuICAgIC8vIFRPRE8odmljYik6IG5lc3RlZCBlbGVtZW50cyBhcmUgYSBXSVAgaW4gdGhpcyBwaGFzZVxuICAgIGlmICh0aGlzLl9pbkkxOG5TZWN0aW9uKSB7XG4gICAgICBjb25zdCBwaE5hbWUgPSBlbGVtZW50Lm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmICghdGhpcy5fcGhUb05vZGVJZHhlc1t0aGlzLl9pMThuU2VjdGlvbkluZGV4XVtwaE5hbWVdKSB7XG4gICAgICAgIHRoaXMuX3BoVG9Ob2RlSWR4ZXNbdGhpcy5faTE4blNlY3Rpb25JbmRleF1bcGhOYW1lXSA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy5fcGhUb05vZGVJZHhlc1t0aGlzLl9pMThuU2VjdGlvbkluZGV4XVtwaE5hbWVdLnB1c2goZWxlbWVudEluZGV4KTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgaTE4biBhdHRyaWJ1dGVzXG4gICAgZm9yIChjb25zdCBhdHRyIG9mIGVsZW1lbnQuYXR0cnMpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICBjb25zdCB2YWx1ZSA9IGF0dHIudmFsdWU7XG4gICAgICBpZiAobmFtZSA9PT0gSTE4Tl9BVFRSKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbkkxOG5TZWN0aW9uKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgQ291bGQgbm90IG1hcmsgYW4gZWxlbWVudCBhcyB0cmFuc2xhdGFibGUgaW5zaWRlIG9mIGEgdHJhbnNsYXRhYmxlIHNlY3Rpb25gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbkkxOG5TZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faTE4blNlY3Rpb25JbmRleCsrO1xuICAgICAgICB0aGlzLl9waFRvTm9kZUlkeGVzW3RoaXMuX2kxOG5TZWN0aW9uSW5kZXhdID0ge307XG4gICAgICAgIGkxOG5NZXRhID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aChJMThOX0FUVFJfUFJFRklYKSkge1xuICAgICAgICBhdHRySTE4bk1ldGFzW25hbWUuc2xpY2UoSTE4Tl9BVFRSX1BSRUZJWC5sZW5ndGgpXSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0QXR0cnNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbGVtZW50IGNyZWF0aW9uIG1vZGVcbiAgICBjb25zdCBjb21wb25lbnQgPSBmaW5kQ29tcG9uZW50KGVsZW1lbnQuZGlyZWN0aXZlcyk7XG4gICAgY29uc3QgbnVsbE5vZGUgPSBvLmxpdGVyYWwobnVsbCwgby5JTkZFUlJFRF9UWVBFKTtcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBvLkV4cHJlc3Npb25bXSA9IFtvLmxpdGVyYWwoZWxlbWVudEluZGV4KV07XG5cbiAgICAvLyBBZGQgY29tcG9uZW50IHR5cGUgb3IgZWxlbWVudCB0YWdcbiAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICBwYXJhbWV0ZXJzLnB1c2godGhpcy50eXBlUmVmZXJlbmNlKGNvbXBvbmVudC5kaXJlY3RpdmUudHlwZS5yZWZlcmVuY2UpKTtcbiAgICAgIGNvbXBvbmVudEluZGV4ID0gdGhpcy5hbGxvY2F0ZURhdGFTbG90KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtZXRlcnMucHVzaChvLmxpdGVyYWwoZWxlbWVudC5uYW1lKSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBhdHRyaWJ1dGVzXG4gICAgY29uc3QgaTE4bk1lc3NhZ2VzOiBvLlN0YXRlbWVudFtdID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlczogby5FeHByZXNzaW9uW10gPSBbXTtcbiAgICBsZXQgaGFzSTE4bkF0dHIgPSBmYWxzZTtcblxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG91dHB1dEF0dHJzKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBvdXRwdXRBdHRyc1tuYW1lXTtcbiAgICAgIGF0dHJpYnV0ZXMucHVzaChvLmxpdGVyYWwobmFtZSkpO1xuICAgICAgaWYgKGF0dHJJMThuTWV0YXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgaGFzSTE4bkF0dHIgPSB0cnVlO1xuICAgICAgICBjb25zdCBtZXRhID0gcGFyc2VJMThuTWV0YShhdHRySTE4bk1ldGFzW25hbWVdKTtcbiAgICAgICAgY29uc3QgdmFyaWFibGUgPSB0aGlzLmNvbnN0YW50UG9vbC5nZXRUcmFuc2xhdGlvbih2YWx1ZSwgbWV0YSk7XG4gICAgICAgIGF0dHJpYnV0ZXMucHVzaCh2YXJpYWJsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdHRyaWJ1dGVzLnB1c2goby5saXRlcmFsKHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgYXR0ckFyZzogby5FeHByZXNzaW9uID0gbnVsbE5vZGU7XG5cbiAgICBpZiAoYXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XG4gICAgICBhdHRyQXJnID0gaGFzSTE4bkF0dHIgPyBnZXRMaXRlcmFsRmFjdG9yeSh0aGlzLm91dHB1dEN0eCwgby5saXRlcmFsQXJyKGF0dHJpYnV0ZXMpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN0YW50UG9vbC5nZXRDb25zdExpdGVyYWwoby5saXRlcmFsQXJyKGF0dHJpYnV0ZXMpLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwYXJhbWV0ZXJzLnB1c2goYXR0ckFyZyk7XG5cbiAgICAvLyBBZGQgZGlyZWN0aXZlcyBhcnJheVxuICAgIGNvbnN0IHtkaXJlY3RpdmVzQXJyYXksIGRpcmVjdGl2ZUluZGV4TWFwfSA9IHRoaXMuX2NvbXB1dGVEaXJlY3RpdmVzQXJyYXkoZWxlbWVudC5kaXJlY3RpdmVzKTtcbiAgICBwYXJhbWV0ZXJzLnB1c2goZGlyZWN0aXZlSW5kZXhNYXAuc2l6ZSA+IDAgPyBkaXJlY3RpdmVzQXJyYXkgOiBudWxsTm9kZSk7XG5cbiAgICBpZiAoY29tcG9uZW50ICYmIGNvbXBvbmVudEluZGV4ICE9IG51bGwpIHtcbiAgICAgIC8vIFJlY29yZCB0aGUgZGF0YSBzbG90IGZvciB0aGUgY29tcG9uZW50XG4gICAgICBkaXJlY3RpdmVJbmRleE1hcC5zZXQoY29tcG9uZW50LmRpcmVjdGl2ZS50eXBlLnJlZmVyZW5jZSwgY29tcG9uZW50SW5kZXgpO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50LnJlZmVyZW5jZXMgJiYgZWxlbWVudC5yZWZlcmVuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZXMgPVxuICAgICAgICAgIGZsYXR0ZW4oZWxlbWVudC5yZWZlcmVuY2VzLm1hcChyZWZlcmVuY2UgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2xvdCA9IHRoaXMuYWxsb2NhdGVEYXRhU2xvdCgpO1xuICAgICAgICAgICAgcmVmZXJlbmNlRGF0YVNsb3RzLnNldChyZWZlcmVuY2UubmFtZSwgc2xvdCk7XG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgdXBkYXRlIHRlbXBvcmFyeS5cbiAgICAgICAgICAgIGNvbnN0IHZhcmlhYmxlTmFtZSA9IHRoaXMuYmluZGluZ1Njb3BlLmZyZXNoUmVmZXJlbmNlTmFtZSgpO1xuICAgICAgICAgICAgdGhpcy5fYmluZGluZ01vZGUucHVzaChvLnZhcmlhYmxlKHZhcmlhYmxlTmFtZSwgby5JTkZFUlJFRF9UWVBFKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldChvLmltcG9ydEV4cHIoUjMubG9hZCkuY2FsbEZuKFtvLmxpdGVyYWwoc2xvdCldKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b0RlY2xTdG10KG8uSU5GRVJSRURfVFlQRSwgW28uU3RtdE1vZGlmaWVyLkZpbmFsXSkpO1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nU2NvcGUuc2V0KHJlZmVyZW5jZS5uYW1lLCBvLnZhcmlhYmxlKHZhcmlhYmxlTmFtZSkpO1xuICAgICAgICAgICAgcmV0dXJuIFtyZWZlcmVuY2UubmFtZSwgcmVmZXJlbmNlLm9yaWdpbmFsVmFsdWVdO1xuICAgICAgICAgIH0pKS5tYXAodmFsdWUgPT4gby5saXRlcmFsKHZhbHVlKSk7XG4gICAgICBwYXJhbWV0ZXJzLnB1c2goXG4gICAgICAgICAgdGhpcy5jb25zdGFudFBvb2wuZ2V0Q29uc3RMaXRlcmFsKG8ubGl0ZXJhbEFycihyZWZlcmVuY2VzKSwgLyogZm9yY2VTaGFyZWQgKi8gdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbWV0ZXJzLnB1c2gobnVsbE5vZGUpO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0cmFpbGluZyBudWxsIG5vZGVzIGFzIHRoZXkgYXJlIGltcGxpZWQuXG4gICAgd2hpbGUgKHBhcmFtZXRlcnNbcGFyYW1ldGVycy5sZW5ndGggLSAxXSA9PT0gbnVsbE5vZGUpIHtcbiAgICAgIHBhcmFtZXRlcnMucG9wKCk7XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgdGhlIGluc3RydWN0aW9uIGNyZWF0ZSBlbGVtZW50IGluc3RydWN0aW9uXG4gICAgaWYgKGkxOG5NZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9jcmVhdGlvbk1vZGUucHVzaCguLi5pMThuTWVzc2FnZXMpO1xuICAgIH1cbiAgICB0aGlzLmluc3RydWN0aW9uKHRoaXMuX2NyZWF0aW9uTW9kZSwgZWxlbWVudC5zb3VyY2VTcGFuLCBSMy5jcmVhdGVFbGVtZW50LCAuLi5wYXJhbWV0ZXJzKTtcblxuICAgIGNvbnN0IGltcGxpY2l0ID0gby52YXJpYWJsZSh0aGlzLmNvbnRleHRQYXJhbWV0ZXIpO1xuXG4gICAgLy8gR2VuZXJhdGUgZWxlbWVudCBpbnB1dCBiaW5kaW5nc1xuICAgIGZvciAobGV0IGlucHV0IG9mIGVsZW1lbnQuaW5wdXRzKSB7XG4gICAgICBpZiAoaW5wdXQuaXNBbmltYXRpb24pIHtcbiAgICAgICAgdGhpcy51bnN1cHBvcnRlZCgnYW5pbWF0aW9ucycpO1xuICAgICAgfVxuICAgICAgY29uc3QgY29udmVydGVkQmluZGluZyA9IHRoaXMuY29udmVydFByb3BlcnR5QmluZGluZyhpbXBsaWNpdCwgaW5wdXQudmFsdWUpO1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb24gPSBCSU5ESU5HX0lOU1RSVUNUSU9OX01BUFtpbnB1dC50eXBlXTtcbiAgICAgIGlmIChpbnN0cnVjdGlvbikge1xuICAgICAgICAvLyBUT0RPKGNodWNraik6IHJ1bnRpbWU6IHNlY3VyaXR5IGNvbnRleHQ/XG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICB0aGlzLl9iaW5kaW5nTW9kZSwgaW5wdXQuc291cmNlU3BhbiwgaW5zdHJ1Y3Rpb24sIG8ubGl0ZXJhbChlbGVtZW50SW5kZXgpLFxuICAgICAgICAgICAgby5saXRlcmFsKGlucHV0Lm5hbWUpLCBjb252ZXJ0ZWRCaW5kaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudW5zdXBwb3J0ZWQoYGJpbmRpbmcgJHtQcm9wZXJ0eUJpbmRpbmdUeXBlW2lucHV0LnR5cGVdfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIGRpcmVjdGl2ZXMgaW5wdXQgYmluZGluZ3NcbiAgICB0aGlzLl92aXNpdERpcmVjdGl2ZXMoZWxlbWVudC5kaXJlY3RpdmVzLCBpbXBsaWNpdCwgZWxlbWVudEluZGV4LCBkaXJlY3RpdmVJbmRleE1hcCk7XG5cbiAgICAvLyBUcmF2ZXJzZSBlbGVtZW50IGNoaWxkIG5vZGVzXG4gICAgaWYgKHRoaXMuX2luSTE4blNlY3Rpb24gJiYgZWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPT0gMSAmJlxuICAgICAgICBlbGVtZW50LmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgVGV4dEFzdCkge1xuICAgICAgY29uc3QgdGV4dCA9IGVsZW1lbnQuY2hpbGRyZW5bMF0gYXMgVGV4dEFzdDtcbiAgICAgIHRoaXMudmlzaXRTaW5nbGVJMThuVGV4dENoaWxkKHRleHQsIGkxOG5NZXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcGxhdGVWaXNpdEFsbCh0aGlzLCBlbGVtZW50LmNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICAvLyBGaW5pc2ggZWxlbWVudCBjb25zdHJ1Y3Rpb24gbW9kZS5cbiAgICB0aGlzLmluc3RydWN0aW9uKFxuICAgICAgICB0aGlzLl9jcmVhdGlvbk1vZGUsIGVsZW1lbnQuZW5kU291cmNlU3BhbiB8fCBlbGVtZW50LnNvdXJjZVNwYW4sIFIzLmVsZW1lbnRFbmQpO1xuXG4gICAgLy8gUmVzdG9yZSB0aGUgc3RhdGUgYmVmb3JlIGV4aXRpbmcgdGhpcyBub2RlXG4gICAgdGhpcy5faW5JMThuU2VjdGlvbiA9IHdhc0luSTE4blNlY3Rpb247XG4gIH1cblxuICBwcml2YXRlIF92aXNpdERpcmVjdGl2ZXMoXG4gICAgICBkaXJlY3RpdmVzOiBEaXJlY3RpdmVBc3RbXSwgaW1wbGljaXQ6IG8uRXhwcmVzc2lvbiwgbm9kZUluZGV4OiBudW1iZXIsXG4gICAgICBkaXJlY3RpdmVJbmRleE1hcDogTWFwPGFueSwgbnVtYmVyPikge1xuICAgIGZvciAobGV0IGRpcmVjdGl2ZSBvZiBkaXJlY3RpdmVzKSB7XG4gICAgICBjb25zdCBkaXJlY3RpdmVJbmRleCA9IGRpcmVjdGl2ZUluZGV4TWFwLmdldChkaXJlY3RpdmUuZGlyZWN0aXZlLnR5cGUucmVmZXJlbmNlKTtcblxuICAgICAgLy8gQ3JlYXRpb24gbW9kZVxuICAgICAgLy8gZS5nLiBEKDAsIFRvZG9Db21wb25lbnREZWYubigpLCBUb2RvQ29tcG9uZW50RGVmKTtcbiAgICAgIGNvbnN0IGRpcmVjdGl2ZVR5cGUgPSBkaXJlY3RpdmUuZGlyZWN0aXZlLnR5cGUucmVmZXJlbmNlO1xuICAgICAgY29uc3Qga2luZCA9XG4gICAgICAgICAgZGlyZWN0aXZlLmRpcmVjdGl2ZS5pc0NvbXBvbmVudCA/IERlZmluaXRpb25LaW5kLkNvbXBvbmVudCA6IERlZmluaXRpb25LaW5kLkRpcmVjdGl2ZTtcblxuICAgICAgLy8gTm90ZTogKmRvIG5vdCBjYWNoZSogY2FsbHMgdG8gdGhpcy5kaXJlY3RpdmVPZigpIGFzIHRoZSBjb25zdGFudCBwb29sIG5lZWRzIHRvIGtub3cgaWYgdGhlXG4gICAgICAvLyBub2RlIGlzIHJlZmVyZW5jZWQgbXVsdGlwbGUgdGltZXMgdG8ga25vdyB0aGF0IGl0IG11c3QgZ2VuZXJhdGUgdGhlIHJlZmVyZW5jZSBpbnRvIGFcbiAgICAgIC8vIHRlbXBvcmFyeS5cblxuICAgICAgLy8gQmluZGluZ3NcbiAgICAgIGZvciAoY29uc3QgaW5wdXQgb2YgZGlyZWN0aXZlLmlucHV0cykge1xuICAgICAgICBjb25zdCBjb252ZXJ0ZWRCaW5kaW5nID0gdGhpcy5jb252ZXJ0UHJvcGVydHlCaW5kaW5nKGltcGxpY2l0LCBpbnB1dC52YWx1ZSk7XG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICB0aGlzLl9iaW5kaW5nTW9kZSwgZGlyZWN0aXZlLnNvdXJjZVNwYW4sIFIzLmVsZW1lbnRQcm9wZXJ0eSwgby5saXRlcmFsKG5vZGVJbmRleCksXG4gICAgICAgICAgICBvLmxpdGVyYWwoaW5wdXQudGVtcGxhdGVOYW1lKSwgby5pbXBvcnRFeHByKFIzLmJpbmQpLmNhbGxGbihbY29udmVydGVkQmluZGluZ10pKTtcbiAgICAgIH1cblxuICAgICAgLy8gZS5nLiBNeURpcmVjdGl2ZS5uZ0RpcmVjdGl2ZURlZi5oKDAsIDApO1xuICAgICAgdGhpcy5faG9zdE1vZGUucHVzaChcbiAgICAgICAgICB0aGlzLmRlZmluaXRpb25PZihkaXJlY3RpdmVUeXBlLCBraW5kKVxuICAgICAgICAgICAgICAuY2FsbE1ldGhvZChSMy5IT1NUX0JJTkRJTkdfTUVUSE9ELCBbby5saXRlcmFsKGRpcmVjdGl2ZUluZGV4KSwgby5saXRlcmFsKG5vZGVJbmRleCldKVxuICAgICAgICAgICAgICAudG9TdG10KCkpO1xuXG4gICAgICAvLyBlLmcuIHIoMCwgMCk7XG4gICAgICB0aGlzLmluc3RydWN0aW9uKFxuICAgICAgICAgIHRoaXMuX3JlZnJlc2hNb2RlLCBkaXJlY3RpdmUuc291cmNlU3BhbiwgUjMucmVmcmVzaENvbXBvbmVudCwgby5saXRlcmFsKGRpcmVjdGl2ZUluZGV4KSxcbiAgICAgICAgICBvLmxpdGVyYWwobm9kZUluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVGVtcGxhdGVBc3RWaXNpdG9yXG4gIHZpc2l0RW1iZWRkZWRUZW1wbGF0ZShhc3Q6IEVtYmVkZGVkVGVtcGxhdGVBc3QpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZUluZGV4ID0gdGhpcy5hbGxvY2F0ZURhdGFTbG90KCk7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZVJlZiA9IHRoaXMucmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5UZW1wbGF0ZVJlZik7XG4gICAgY29uc3QgdGVtcGxhdGVEaXJlY3RpdmUgPSBhc3QuZGlyZWN0aXZlcy5maW5kKFxuICAgICAgICBkaXJlY3RpdmUgPT4gZGlyZWN0aXZlLmRpcmVjdGl2ZS50eXBlLmRpRGVwcy5zb21lKFxuICAgICAgICAgICAgZGVwZW5kZW5jeSA9PlxuICAgICAgICAgICAgICAgIGRlcGVuZGVuY3kudG9rZW4gIT0gbnVsbCAmJiAodG9rZW5SZWZlcmVuY2UoZGVwZW5kZW5jeS50b2tlbikgPT0gdGVtcGxhdGVSZWYpKSk7XG4gICAgY29uc3QgY29udGV4dE5hbWUgPVxuICAgICAgICB0aGlzLmNvbnRleHROYW1lICYmIHRlbXBsYXRlRGlyZWN0aXZlICYmIHRlbXBsYXRlRGlyZWN0aXZlLmRpcmVjdGl2ZS50eXBlLnJlZmVyZW5jZS5uYW1lID9cbiAgICAgICAgYCR7dGhpcy5jb250ZXh0TmFtZX1fJHt0ZW1wbGF0ZURpcmVjdGl2ZS5kaXJlY3RpdmUudHlwZS5yZWZlcmVuY2UubmFtZX1gIDpcbiAgICAgICAgbnVsbDtcbiAgICBjb25zdCB0ZW1wbGF0ZU5hbWUgPVxuICAgICAgICBjb250ZXh0TmFtZSA/IGAke2NvbnRleHROYW1lfV9UZW1wbGF0ZV8ke3RlbXBsYXRlSW5kZXh9YCA6IGBUZW1wbGF0ZV8ke3RlbXBsYXRlSW5kZXh9YDtcbiAgICBjb25zdCB0ZW1wbGF0ZUNvbnRleHQgPSBgY3R4JHt0aGlzLmxldmVsfWA7XG5cbiAgICBjb25zdCB7ZGlyZWN0aXZlc0FycmF5LCBkaXJlY3RpdmVJbmRleE1hcH0gPSB0aGlzLl9jb21wdXRlRGlyZWN0aXZlc0FycmF5KGFzdC5kaXJlY3RpdmVzKTtcblxuICAgIC8vIGUuZy4gQygxLCBDMVRlbXBsYXRlKVxuICAgIHRoaXMuaW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRoaXMuX2NyZWF0aW9uTW9kZSwgYXN0LnNvdXJjZVNwYW4sIFIzLmNvbnRhaW5lckNyZWF0ZSwgby5saXRlcmFsKHRlbXBsYXRlSW5kZXgpLFxuICAgICAgICBkaXJlY3RpdmVzQXJyYXksIG8udmFyaWFibGUodGVtcGxhdGVOYW1lKSk7XG5cbiAgICAvLyBlLmcuIENyKDEpXG4gICAgdGhpcy5pbnN0cnVjdGlvbihcbiAgICAgICAgdGhpcy5fcmVmcmVzaE1vZGUsIGFzdC5zb3VyY2VTcGFuLCBSMy5jb250YWluZXJSZWZyZXNoU3RhcnQsIG8ubGl0ZXJhbCh0ZW1wbGF0ZUluZGV4KSk7XG5cbiAgICAvLyBHZW5lcmF0ZSBkaXJlY3RpdmVzXG4gICAgdGhpcy5fdmlzaXREaXJlY3RpdmVzKFxuICAgICAgICBhc3QuZGlyZWN0aXZlcywgby52YXJpYWJsZSh0aGlzLmNvbnRleHRQYXJhbWV0ZXIpLCB0ZW1wbGF0ZUluZGV4LCBkaXJlY3RpdmVJbmRleE1hcCk7XG5cbiAgICAvLyBlLmcuIGNyKCk7XG4gICAgdGhpcy5pbnN0cnVjdGlvbih0aGlzLl9yZWZyZXNoTW9kZSwgYXN0LnNvdXJjZVNwYW4sIFIzLmNvbnRhaW5lclJlZnJlc2hFbmQpO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvblxuICAgIGNvbnN0IHRlbXBsYXRlVmlzaXRvciA9IG5ldyBUZW1wbGF0ZURlZmluaXRpb25CdWlsZGVyKFxuICAgICAgICB0aGlzLm91dHB1dEN0eCwgdGhpcy5jb25zdGFudFBvb2wsIHRoaXMucmVmbGVjdG9yLCB0ZW1wbGF0ZUNvbnRleHQsXG4gICAgICAgIHRoaXMuYmluZGluZ1Njb3BlLm5lc3RlZFNjb3BlKCksIHRoaXMubGV2ZWwgKyAxLCB0aGlzLm5nQ29udGVudFNlbGVjdG9ycywgY29udGV4dE5hbWUsXG4gICAgICAgIHRlbXBsYXRlTmFtZSwgdGhpcy5waXBlcywgW10pO1xuICAgIGNvbnN0IHRlbXBsYXRlRnVuY3Rpb25FeHByID0gdGVtcGxhdGVWaXNpdG9yLmJ1aWxkVGVtcGxhdGVGdW5jdGlvbihhc3QuY2hpbGRyZW4sIGFzdC52YXJpYWJsZXMpO1xuICAgIHRoaXMuX3Bvc3RmaXgucHVzaCh0ZW1wbGF0ZUZ1bmN0aW9uRXhwci50b0RlY2xTdG10KHRlbXBsYXRlTmFtZSwgbnVsbCkpO1xuICB9XG5cbiAgLy8gVGhlc2Ugc2hvdWxkIGJlIGhhbmRsZWQgaW4gdGhlIHRlbXBsYXRlIG9yIGVsZW1lbnQgZGlyZWN0bHkuXG4gIHJlYWRvbmx5IHZpc2l0UmVmZXJlbmNlID0gaW52YWxpZDtcbiAgcmVhZG9ubHkgdmlzaXRWYXJpYWJsZSA9IGludmFsaWQ7XG4gIHJlYWRvbmx5IHZpc2l0RXZlbnQgPSBpbnZhbGlkO1xuICByZWFkb25seSB2aXNpdEVsZW1lbnRQcm9wZXJ0eSA9IGludmFsaWQ7XG4gIHJlYWRvbmx5IHZpc2l0QXR0ciA9IGludmFsaWQ7XG5cbiAgLy8gVGVtcGxhdGVBc3RWaXNpdG9yXG4gIHZpc2l0Qm91bmRUZXh0KGFzdDogQm91bmRUZXh0QXN0KSB7XG4gICAgY29uc3Qgbm9kZUluZGV4ID0gdGhpcy5hbGxvY2F0ZURhdGFTbG90KCk7XG5cbiAgICAvLyBDcmVhdGlvbiBtb2RlXG4gICAgdGhpcy5pbnN0cnVjdGlvbih0aGlzLl9jcmVhdGlvbk1vZGUsIGFzdC5zb3VyY2VTcGFuLCBSMy50ZXh0LCBvLmxpdGVyYWwobm9kZUluZGV4KSk7XG5cbiAgICAvLyBSZWZyZXNoIG1vZGVcbiAgICB0aGlzLmluc3RydWN0aW9uKFxuICAgICAgICB0aGlzLl9yZWZyZXNoTW9kZSwgYXN0LnNvdXJjZVNwYW4sIFIzLnRleHRDcmVhdGVCb3VuZCwgby5saXRlcmFsKG5vZGVJbmRleCksXG4gICAgICAgIHRoaXMuYmluZChvLnZhcmlhYmxlKENPTlRFWFRfTkFNRSksIGFzdC52YWx1ZSwgYXN0LnNvdXJjZVNwYW4pKTtcbiAgfVxuXG4gIC8vIFRlbXBsYXRlQXN0VmlzaXRvclxuICB2aXNpdFRleHQoYXN0OiBUZXh0QXN0KSB7XG4gICAgLy8gVGV4dCBpcyBkZWZpbmVkIGluIGNyZWF0aW9uIG1vZGUgb25seS5cbiAgICB0aGlzLmluc3RydWN0aW9uKFxuICAgICAgICB0aGlzLl9jcmVhdGlvbk1vZGUsIGFzdC5zb3VyY2VTcGFuLCBSMy50ZXh0LCBvLmxpdGVyYWwodGhpcy5hbGxvY2F0ZURhdGFTbG90KCkpLFxuICAgICAgICBvLmxpdGVyYWwoYXN0LnZhbHVlKSk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBjb250ZW50IG9mIHRoZSBlbGVtZW50IGlzIGEgc2luZ2xlIHRleHQgbm9kZSB0aGUgdHJhbnNsYXRpb24gY2FuIGJlIGlubGluZWQ6XG4gIC8vXG4gIC8vIGA8cCBpMThuPVwiZGVzY3xtZWFuXCI+c29tZSBjb250ZW50PC9wPmBcbiAgLy8gY29tcGlsZXMgdG9cbiAgLy8gYGBgXG4gIC8vIC8qKlxuICAvLyAqIEBkZXNjIGRlc2NcbiAgLy8gKiBAbWVhbmluZyBtZWFuXG4gIC8vICovXG4gIC8vIGNvbnN0IE1TR19YWVogPSBnb29nLmdldE1zZygnc29tZSBjb250ZW50Jyk7XG4gIC8vIGkwLsm1VCgxLCBNU0dfWFlaKTtcbiAgLy8gYGBgXG4gIHZpc2l0U2luZ2xlSTE4blRleHRDaGlsZCh0ZXh0OiBUZXh0QXN0LCBpMThuTWV0YTogc3RyaW5nKSB7XG4gICAgY29uc3QgbWV0YSA9IHBhcnNlSTE4bk1ldGEoaTE4bk1ldGEpO1xuICAgIGNvbnN0IHZhcmlhYmxlID0gdGhpcy5jb25zdGFudFBvb2wuZ2V0VHJhbnNsYXRpb24odGV4dC52YWx1ZSwgbWV0YSk7XG4gICAgdGhpcy5pbnN0cnVjdGlvbihcbiAgICAgICAgdGhpcy5fY3JlYXRpb25Nb2RlLCB0ZXh0LnNvdXJjZVNwYW4sIFIzLnRleHQsIG8ubGl0ZXJhbCh0aGlzLmFsbG9jYXRlRGF0YVNsb3QoKSksIHZhcmlhYmxlKTtcbiAgfVxuXG4gIC8vIFRoZXNlIHNob3VsZCBiZSBoYW5kbGVkIGluIHRoZSB0ZW1wbGF0ZSBvciBlbGVtZW50IGRpcmVjdGx5XG4gIHJlYWRvbmx5IHZpc2l0RGlyZWN0aXZlID0gaW52YWxpZDtcbiAgcmVhZG9ubHkgdmlzaXREaXJlY3RpdmVQcm9wZXJ0eSA9IGludmFsaWQ7XG5cbiAgcHJpdmF0ZSBhbGxvY2F0ZURhdGFTbG90KCkgeyByZXR1cm4gdGhpcy5fZGF0YUluZGV4Kys7IH1cbiAgcHJpdmF0ZSBiaW5kaW5nQ29udGV4dCgpIHsgcmV0dXJuIGAke3RoaXMuX2JpbmRpbmdDb250ZXh0Kyt9YDsgfVxuXG4gIHByaXZhdGUgaW5zdHJ1Y3Rpb24oXG4gICAgICBzdGF0ZW1lbnRzOiBvLlN0YXRlbWVudFtdLCBzcGFuOiBQYXJzZVNvdXJjZVNwYW58bnVsbCwgcmVmZXJlbmNlOiBvLkV4dGVybmFsUmVmZXJlbmNlLFxuICAgICAgLi4ucGFyYW1zOiBvLkV4cHJlc3Npb25bXSkge1xuICAgIHN0YXRlbWVudHMucHVzaChvLmltcG9ydEV4cHIocmVmZXJlbmNlLCBudWxsLCBzcGFuKS5jYWxsRm4ocGFyYW1zLCBzcGFuKS50b1N0bXQoKSk7XG4gIH1cblxuICBwcml2YXRlIHR5cGVSZWZlcmVuY2UodHlwZTogYW55KTogby5FeHByZXNzaW9uIHsgcmV0dXJuIHRoaXMub3V0cHV0Q3R4LmltcG9ydEV4cHIodHlwZSk7IH1cblxuICBwcml2YXRlIGRlZmluaXRpb25PZih0eXBlOiBhbnksIGtpbmQ6IERlZmluaXRpb25LaW5kKTogby5FeHByZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdGFudFBvb2wuZ2V0RGVmaW5pdGlvbih0eXBlLCBraW5kLCB0aGlzLm91dHB1dEN0eCk7XG4gIH1cblxuICBwcml2YXRlIHRlbXAoKTogby5SZWFkVmFyRXhwciB7XG4gICAgaWYgKCF0aGlzLl90ZW1wb3JhcnlBbGxvY2F0ZWQpIHtcbiAgICAgIHRoaXMuX3ByZWZpeC5wdXNoKG5ldyBvLkRlY2xhcmVWYXJTdG10KFRFTVBPUkFSWV9OQU1FLCB1bmRlZmluZWQsIG8uRFlOQU1JQ19UWVBFKSk7XG4gICAgICB0aGlzLl90ZW1wb3JhcnlBbGxvY2F0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gby52YXJpYWJsZShURU1QT1JBUllfTkFNRSk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRQcm9wZXJ0eUJpbmRpbmcoaW1wbGljaXQ6IG8uRXhwcmVzc2lvbiwgdmFsdWU6IEFTVCk6IG8uRXhwcmVzc2lvbiB7XG4gICAgY29uc3QgcGlwZXNDb252ZXJ0ZWRWYWx1ZSA9IHZhbHVlLnZpc2l0KHRoaXMuX3ZhbHVlQ29udmVydGVyKTtcbiAgICBjb25zdCBjb252ZXJ0ZWRQcm9wZXJ0eUJpbmRpbmcgPSBjb252ZXJ0UHJvcGVydHlCaW5kaW5nKFxuICAgICAgICB0aGlzLCBpbXBsaWNpdCwgcGlwZXNDb252ZXJ0ZWRWYWx1ZSwgdGhpcy5iaW5kaW5nQ29udGV4dCgpLCBCaW5kaW5nRm9ybS5UcnlTaW1wbGUsXG4gICAgICAgIGludGVycG9sYXRlKTtcbiAgICB0aGlzLl9yZWZyZXNoTW9kZS5wdXNoKC4uLmNvbnZlcnRlZFByb3BlcnR5QmluZGluZy5zdG10cyk7XG4gICAgcmV0dXJuIGNvbnZlcnRlZFByb3BlcnR5QmluZGluZy5jdXJyVmFsRXhwcjtcbiAgfVxuXG4gIHByaXZhdGUgYmluZChpbXBsaWNpdDogby5FeHByZXNzaW9uLCB2YWx1ZTogQVNULCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBvLkV4cHJlc3Npb24ge1xuICAgIHJldHVybiB0aGlzLmNvbnZlcnRQcm9wZXJ0eUJpbmRpbmcoaW1wbGljaXQsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRRdWVyeVByZWRpY2F0ZShxdWVyeTogQ29tcGlsZVF1ZXJ5TWV0YWRhdGEsIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCk6IG8uRXhwcmVzc2lvbiB7XG4gIGxldCBwcmVkaWNhdGU6IG8uRXhwcmVzc2lvbjtcbiAgaWYgKHF1ZXJ5LnNlbGVjdG9ycy5sZW5ndGggPiAxIHx8IChxdWVyeS5zZWxlY3RvcnMubGVuZ3RoID09IDEgJiYgcXVlcnkuc2VsZWN0b3JzWzBdLnZhbHVlKSkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHF1ZXJ5LnNlbGVjdG9ycy5tYXAodmFsdWUgPT4gdmFsdWUudmFsdWUgYXMgc3RyaW5nKTtcbiAgICBzZWxlY3RvcnMuc29tZSh2YWx1ZSA9PiAhdmFsdWUpICYmIGVycm9yKCdGb3VuZCBhIHR5cGUgYW1vbmcgdGhlIHN0cmluZyBzZWxlY3RvcnMgZXhwZWN0ZWQnKTtcbiAgICBwcmVkaWNhdGUgPSBvdXRwdXRDdHguY29uc3RhbnRQb29sLmdldENvbnN0TGl0ZXJhbChcbiAgICAgICAgby5saXRlcmFsQXJyKHNlbGVjdG9ycy5tYXAodmFsdWUgPT4gby5saXRlcmFsKHZhbHVlKSkpKTtcbiAgfSBlbHNlIGlmIChxdWVyeS5zZWxlY3RvcnMubGVuZ3RoID09IDEpIHtcbiAgICBjb25zdCBmaXJzdCA9IHF1ZXJ5LnNlbGVjdG9yc1swXTtcbiAgICBpZiAoZmlyc3QuaWRlbnRpZmllcikge1xuICAgICAgcHJlZGljYXRlID0gb3V0cHV0Q3R4LmltcG9ydEV4cHIoZmlyc3QuaWRlbnRpZmllci5yZWZlcmVuY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvcignVW5leHBlY3RlZCBxdWVyeSBmb3JtJyk7XG4gICAgICBwcmVkaWNhdGUgPSBvLmxpdGVyYWwobnVsbCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGVycm9yKCdVbmV4cGVjdGVkIHF1ZXJ5IGZvcm0nKTtcbiAgICBwcmVkaWNhdGUgPSBvLmxpdGVyYWwobnVsbCk7XG4gIH1cbiAgcmV0dXJuIHByZWRpY2F0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZhY3RvcnkoXG4gICAgdHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YSwgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0LCByZWZsZWN0b3I6IENvbXBpbGVSZWZsZWN0b3IsXG4gICAgcXVlcmllczogQ29tcGlsZVF1ZXJ5TWV0YWRhdGFbXSk6IG8uRXhwcmVzc2lvbiB7XG4gIGxldCBhcmdzOiBvLkV4cHJlc3Npb25bXSA9IFtdO1xuXG4gIGNvbnN0IGVsZW1lbnRSZWYgPSByZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLkVsZW1lbnRSZWYpO1xuICBjb25zdCB0ZW1wbGF0ZVJlZiA9IHJlZmxlY3Rvci5yZXNvbHZlRXh0ZXJuYWxSZWZlcmVuY2UoSWRlbnRpZmllcnMuVGVtcGxhdGVSZWYpO1xuICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gcmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5WaWV3Q29udGFpbmVyUmVmKTtcblxuICBmb3IgKGxldCBkZXBlbmRlbmN5IG9mIHR5cGUuZGlEZXBzKSB7XG4gICAgaWYgKGRlcGVuZGVuY3kuaXNWYWx1ZSkge1xuICAgICAgdW5zdXBwb3J0ZWQoJ3ZhbHVlIGRlcGVuZGVuY2llcycpO1xuICAgIH1cbiAgICBpZiAoZGVwZW5kZW5jeS5pc0hvc3QpIHtcbiAgICAgIHVuc3VwcG9ydGVkKCdob3N0IGRlcGVuZGVuY2llcycpO1xuICAgIH1cbiAgICBjb25zdCB0b2tlbiA9IGRlcGVuZGVuY3kudG9rZW47XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBjb25zdCB0b2tlblJlZiA9IHRva2VuUmVmZXJlbmNlKHRva2VuKTtcbiAgICAgIGlmICh0b2tlblJlZiA9PT0gZWxlbWVudFJlZikge1xuICAgICAgICBhcmdzLnB1c2goby5pbXBvcnRFeHByKFIzLmluamVjdEVsZW1lbnRSZWYpLmNhbGxGbihbXSkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlblJlZiA9PT0gdGVtcGxhdGVSZWYpIHtcbiAgICAgICAgYXJncy5wdXNoKG8uaW1wb3J0RXhwcihSMy5pbmplY3RUZW1wbGF0ZVJlZikuY2FsbEZuKFtdKSk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuUmVmID09PSB2aWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIGFyZ3MucHVzaChvLmltcG9ydEV4cHIoUjMuaW5qZWN0Vmlld0NvbnRhaW5lclJlZikuY2FsbEZuKFtdKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB2YWx1ZSA9XG4gICAgICAgICAgICB0b2tlbi5pZGVudGlmaWVyICE9IG51bGwgPyBvdXRwdXRDdHguaW1wb3J0RXhwcih0b2tlblJlZikgOiBvLmxpdGVyYWwodG9rZW5SZWYpO1xuICAgICAgICBhcmdzLnB1c2goby5pbXBvcnRFeHByKFIzLmluamVjdCkuY2FsbEZuKFt2YWx1ZV0pKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdW5zdXBwb3J0ZWQoJ2RlcGVuZGVuY3kgd2l0aG91dCBhIHRva2VuJyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcXVlcnlEZWZpbml0aW9uczogby5FeHByZXNzaW9uW10gPSBbXTtcbiAgZm9yIChsZXQgcXVlcnkgb2YgcXVlcmllcykge1xuICAgIGNvbnN0IHByZWRpY2F0ZSA9IGdldFF1ZXJ5UHJlZGljYXRlKHF1ZXJ5LCBvdXRwdXRDdHgpO1xuXG4gICAgLy8gZS5nLiByMy5RKG51bGwsIFNvbWVEaXJlY3RpdmUsIGZhbHNlKSBvciByMy5RKG51bGwsIFsnZGl2J10sIGZhbHNlKVxuICAgIGNvbnN0IHBhcmFtZXRlcnMgPSBbXG4gICAgICAvKiBtZW1vcnlJbmRleCAqLyBvLmxpdGVyYWwobnVsbCwgby5JTkZFUlJFRF9UWVBFKSxcbiAgICAgIC8qIHByZWRpY2F0ZSAqLyBwcmVkaWNhdGUsXG4gICAgICAvKiBkZXNjZW5kICovIG8ubGl0ZXJhbChxdWVyeS5kZXNjZW5kYW50cylcbiAgICBdO1xuXG4gICAgaWYgKHF1ZXJ5LnJlYWQpIHtcbiAgICAgIHBhcmFtZXRlcnMucHVzaChvdXRwdXRDdHguaW1wb3J0RXhwcihxdWVyeS5yZWFkLmlkZW50aWZpZXIgIS5yZWZlcmVuY2UpKTtcbiAgICB9XG5cbiAgICBxdWVyeURlZmluaXRpb25zLnB1c2goby5pbXBvcnRFeHByKFIzLnF1ZXJ5KS5jYWxsRm4ocGFyYW1ldGVycykpO1xuICB9XG5cbiAgY29uc3QgY3JlYXRlSW5zdGFuY2UgPSBuZXcgby5JbnN0YW50aWF0ZUV4cHIob3V0cHV0Q3R4LmltcG9ydEV4cHIodHlwZS5yZWZlcmVuY2UpLCBhcmdzKTtcbiAgY29uc3QgcmVzdWx0ID0gcXVlcnlEZWZpbml0aW9ucy5sZW5ndGggPiAwID8gby5saXRlcmFsQXJyKFtjcmVhdGVJbnN0YW5jZSwgLi4ucXVlcnlEZWZpbml0aW9uc10pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlSW5zdGFuY2U7XG5cbiAgcmV0dXJuIG8uZm4oXG4gICAgICBbXSwgW25ldyBvLlJldHVyblN0YXRlbWVudChyZXN1bHQpXSwgby5JTkZFUlJFRF9UWVBFLCBudWxsLFxuICAgICAgdHlwZS5yZWZlcmVuY2UubmFtZSA/IGAke3R5cGUucmVmZXJlbmNlLm5hbWV9X0ZhY3RvcnlgIDogbnVsbCk7XG59XG5cbnR5cGUgSG9zdEJpbmRpbmdzID0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmdcbn07XG5cbi8vIFR1cm4gYSBkaXJlY3RpdmUgc2VsZWN0b3IgaW50byBhbiBSMy1jb21wYXRpYmxlIHNlbGVjdG9yIGZvciBkaXJlY3RpdmUgZGVmXG5mdW5jdGlvbiBjcmVhdGVEaXJlY3RpdmVTZWxlY3RvcihzZWxlY3Rvcjogc3RyaW5nKTogby5FeHByZXNzaW9uIHtcbiAgcmV0dXJuIGFzTGl0ZXJhbChwYXJzZVNlbGVjdG9yc1RvUjNTZWxlY3RvcihDc3NTZWxlY3Rvci5wYXJzZShzZWxlY3RvcikpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSG9zdEF0dHJpYnV0ZXNBcnJheShcbiAgICBkaXJlY3RpdmVNZXRhZGF0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBvdXRwdXRDdHg6IE91dHB1dENvbnRleHQpOiBvLkV4cHJlc3Npb258bnVsbCB7XG4gIGNvbnN0IHZhbHVlczogby5FeHByZXNzaW9uW10gPSBbXTtcbiAgY29uc3QgYXR0cmlidXRlcyA9IGRpcmVjdGl2ZU1ldGFkYXRhLmhvc3RBdHRyaWJ1dGVzO1xuICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXR0cmlidXRlcykpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICB2YWx1ZXMucHVzaChvLmxpdGVyYWwoa2V5KSwgby5saXRlcmFsKHZhbHVlKSk7XG4gIH1cbiAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIG91dHB1dEN0eC5jb25zdGFudFBvb2wuZ2V0Q29uc3RMaXRlcmFsKG8ubGl0ZXJhbEFycih2YWx1ZXMpKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gUmV0dXJuIGEgaG9zdCBiaW5kaW5nIGZ1bmN0aW9uIG9yIG51bGwgaWYgb25lIGlzIG5vdCBuZWNlc3NhcnkuXG5mdW5jdGlvbiBjcmVhdGVIb3N0QmluZGluZ3NGdW5jdGlvbihcbiAgICBkaXJlY3RpdmVNZXRhZGF0YTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBvdXRwdXRDdHg6IE91dHB1dENvbnRleHQsXG4gICAgYmluZGluZ1BhcnNlcjogQmluZGluZ1BhcnNlcik6IG8uRXhwcmVzc2lvbnxudWxsIHtcbiAgY29uc3Qgc3RhdGVtZW50czogby5TdGF0ZW1lbnRbXSA9IFtdO1xuXG4gIGNvbnN0IHRlbXBvcmFyeSA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBkZWNsYXJlZCA9IGZhbHNlO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoIWRlY2xhcmVkKSB7XG4gICAgICAgIHN0YXRlbWVudHMucHVzaChuZXcgby5EZWNsYXJlVmFyU3RtdChURU1QT1JBUllfTkFNRSwgdW5kZWZpbmVkLCBvLkRZTkFNSUNfVFlQRSkpO1xuICAgICAgICBkZWNsYXJlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gby52YXJpYWJsZShURU1QT1JBUllfTkFNRSk7XG4gICAgfTtcbiAgfSgpO1xuXG4gIGNvbnN0IGhvc3RCaW5kaW5nU291cmNlU3BhbiA9IHR5cGVTb3VyY2VTcGFuKFxuICAgICAgZGlyZWN0aXZlTWV0YWRhdGEuaXNDb21wb25lbnQgPyAnQ29tcG9uZW50JyA6ICdEaXJlY3RpdmUnLCBkaXJlY3RpdmVNZXRhZGF0YS50eXBlKTtcblxuICAvLyBDYWxjdWxhdGUgdGhlIHF1ZXJpZXNcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRpcmVjdGl2ZU1ldGFkYXRhLnF1ZXJpZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgcXVlcnkgPSBkaXJlY3RpdmVNZXRhZGF0YS5xdWVyaWVzW2luZGV4XTtcblxuICAgIC8vIGUuZy4gcjMucVIodG1wID0gcjMubGQoZGlySW5kZXgpWzFdKSAmJiAocjMubGQoZGlySW5kZXgpWzBdLnNvbWVEaXIgPSB0bXApO1xuICAgIGNvbnN0IGdldERpcmVjdGl2ZU1lbW9yeSA9IG8uaW1wb3J0RXhwcihSMy5sb2FkKS5jYWxsRm4oW28udmFyaWFibGUoJ2RpckluZGV4JyldKTtcbiAgICAvLyBUaGUgcXVlcnkgbGlzdCBpcyBhdCB0aGUgcXVlcnkgaW5kZXggKyAxIGJlY2F1c2UgdGhlIGRpcmVjdGl2ZSBpdHNlbGYgaXMgaW4gc2xvdCAwLlxuICAgIGNvbnN0IGdldFF1ZXJ5TGlzdCA9IGdldERpcmVjdGl2ZU1lbW9yeS5rZXkoby5saXRlcmFsKGluZGV4ICsgMSkpO1xuICAgIGNvbnN0IGFzc2lnblRvVGVtcG9yYXJ5ID0gdGVtcG9yYXJ5KCkuc2V0KGdldFF1ZXJ5TGlzdCk7XG4gICAgY29uc3QgY2FsbFF1ZXJ5UmVmcmVzaCA9IG8uaW1wb3J0RXhwcihSMy5xdWVyeVJlZnJlc2gpLmNhbGxGbihbYXNzaWduVG9UZW1wb3JhcnldKTtcbiAgICBjb25zdCB1cGRhdGVEaXJlY3RpdmUgPSBnZXREaXJlY3RpdmVNZW1vcnkua2V5KG8ubGl0ZXJhbCgwLCBvLklORkVSUkVEX1RZUEUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcChxdWVyeS5wcm9wZXJ0eU5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQocXVlcnkuZmlyc3QgPyB0ZW1wb3JhcnkoKS5wcm9wKCdmaXJzdCcpIDogdGVtcG9yYXJ5KCkpO1xuICAgIGNvbnN0IGFuZEV4cHJlc3Npb24gPSBjYWxsUXVlcnlSZWZyZXNoLmFuZCh1cGRhdGVEaXJlY3RpdmUpO1xuICAgIHN0YXRlbWVudHMucHVzaChhbmRFeHByZXNzaW9uLnRvU3RtdCgpKTtcbiAgfVxuXG4gIGNvbnN0IGRpcmVjdGl2ZVN1bW1hcnkgPSBkaXJlY3RpdmVNZXRhZGF0YS50b1N1bW1hcnkoKTtcblxuICAvLyBDYWxjdWxhdGUgdGhlIGhvc3QgcHJvcGVydHkgYmluZGluZ3NcbiAgY29uc3QgYmluZGluZ3MgPSBiaW5kaW5nUGFyc2VyLmNyZWF0ZUJvdW5kSG9zdFByb3BlcnRpZXMoZGlyZWN0aXZlU3VtbWFyeSwgaG9zdEJpbmRpbmdTb3VyY2VTcGFuKTtcbiAgY29uc3QgYmluZGluZ0NvbnRleHQgPSBvLmltcG9ydEV4cHIoUjMubG9hZCkuY2FsbEZuKFtvLnZhcmlhYmxlKCdkaXJJbmRleCcpXSk7XG4gIGlmIChiaW5kaW5ncykge1xuICAgIGZvciAoY29uc3QgYmluZGluZyBvZiBiaW5kaW5ncykge1xuICAgICAgY29uc3QgYmluZGluZ0V4cHIgPSBjb252ZXJ0UHJvcGVydHlCaW5kaW5nKFxuICAgICAgICAgIG51bGwsIGJpbmRpbmdDb250ZXh0LCBiaW5kaW5nLmV4cHJlc3Npb24sICdiJywgQmluZGluZ0Zvcm0uVHJ5U2ltcGxlLFxuICAgICAgICAgICgpID0+IGVycm9yKCdVbmV4cGVjdGVkIGludGVycG9sYXRpb24nKSk7XG4gICAgICBzdGF0ZW1lbnRzLnB1c2goLi4uYmluZGluZ0V4cHIuc3RtdHMpO1xuICAgICAgc3RhdGVtZW50cy5wdXNoKG8uaW1wb3J0RXhwcihSMy5lbGVtZW50UHJvcGVydHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsRm4oW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8udmFyaWFibGUoJ2VsSW5kZXgnKSwgby5saXRlcmFsKGJpbmRpbmcubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgby5pbXBvcnRFeHByKFIzLmJpbmQpLmNhbGxGbihbYmluZGluZ0V4cHIuY3VyclZhbEV4cHJdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudG9TdG10KCkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBob3N0IGV2ZW50IGJpbmRpbmdzXG4gIGNvbnN0IGV2ZW50QmluZGluZ3MgPVxuICAgICAgYmluZGluZ1BhcnNlci5jcmVhdGVEaXJlY3RpdmVIb3N0RXZlbnRBc3RzKGRpcmVjdGl2ZVN1bW1hcnksIGhvc3RCaW5kaW5nU291cmNlU3Bhbik7XG4gIGlmIChldmVudEJpbmRpbmdzKSB7XG4gICAgZm9yIChjb25zdCBiaW5kaW5nIG9mIGV2ZW50QmluZGluZ3MpIHtcbiAgICAgIGNvbnN0IGJpbmRpbmdFeHByID0gY29udmVydEFjdGlvbkJpbmRpbmcoXG4gICAgICAgICAgbnVsbCwgYmluZGluZ0NvbnRleHQsIGJpbmRpbmcuaGFuZGxlciwgJ2InLCAoKSA9PiBlcnJvcignVW5leHBlY3RlZCBpbnRlcnBvbGF0aW9uJykpO1xuICAgICAgY29uc3QgYmluZGluZ05hbWUgPSBiaW5kaW5nLm5hbWUgJiYgc2FuaXRpemVJZGVudGlmaWVyKGJpbmRpbmcubmFtZSk7XG4gICAgICBjb25zdCB0eXBlTmFtZSA9IGlkZW50aWZpZXJOYW1lKGRpcmVjdGl2ZU1ldGFkYXRhLnR5cGUpO1xuICAgICAgY29uc3QgZnVuY3Rpb25OYW1lID1cbiAgICAgICAgICB0eXBlTmFtZSAmJiBiaW5kaW5nTmFtZSA/IGAke3R5cGVOYW1lfV8ke2JpbmRpbmdOYW1lfV9Ib3N0QmluZGluZ0hhbmRsZXJgIDogbnVsbDtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBvLmZuKFxuICAgICAgICAgIFtuZXcgby5GblBhcmFtKCdldmVudCcsIG8uRFlOQU1JQ19UWVBFKV0sXG4gICAgICAgICAgWy4uLmJpbmRpbmdFeHByLnN0bXRzLCBuZXcgby5SZXR1cm5TdGF0ZW1lbnQoYmluZGluZ0V4cHIuYWxsb3dEZWZhdWx0KV0sIG8uSU5GRVJSRURfVFlQRSxcbiAgICAgICAgICBudWxsLCBmdW5jdGlvbk5hbWUpO1xuICAgICAgc3RhdGVtZW50cy5wdXNoKFxuICAgICAgICAgIG8uaW1wb3J0RXhwcihSMy5saXN0ZW5lcikuY2FsbEZuKFtvLmxpdGVyYWwoYmluZGluZy5uYW1lKSwgaGFuZGxlcl0pLnRvU3RtdCgpKTtcbiAgICB9XG4gIH1cblxuXG4gIGlmIChzdGF0ZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB0eXBlTmFtZSA9IGRpcmVjdGl2ZU1ldGFkYXRhLnR5cGUucmVmZXJlbmNlLm5hbWU7XG4gICAgcmV0dXJuIG8uZm4oXG4gICAgICAgIFtuZXcgby5GblBhcmFtKCdkaXJJbmRleCcsIG8uTlVNQkVSX1RZUEUpLCBuZXcgby5GblBhcmFtKCdlbEluZGV4Jywgby5OVU1CRVJfVFlQRSldLFxuICAgICAgICBzdGF0ZW1lbnRzLCBvLklORkVSUkVEX1RZUEUsIG51bGwsIHR5cGVOYW1lID8gYCR7dHlwZU5hbWV9X0hvc3RCaW5kaW5nc2AgOiBudWxsKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnB1dHNPYmplY3QoXG4gICAgZGlyZWN0aXZlOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCk6IG8uRXhwcmVzc2lvbnxudWxsIHtcbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRpcmVjdGl2ZS5pbnB1dHMpLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gb3V0cHV0Q3R4LmNvbnN0YW50UG9vbC5nZXRDb25zdExpdGVyYWwobWFwVG9FeHByZXNzaW9uKGRpcmVjdGl2ZS5pbnB1dHMpKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY2xhc3MgVmFsdWVDb252ZXJ0ZXIgZXh0ZW5kcyBBc3RNZW1vcnlFZmZpY2llbnRUcmFuc2Zvcm1lciB7XG4gIHByaXZhdGUgcGlwZVNsb3RzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgcHJpdmF0ZSBhbGxvY2F0ZVNsb3Q6ICgpID0+IG51bWJlcixcbiAgICAgIHByaXZhdGUgZGVmaW5lUGlwZTpcbiAgICAgICAgICAobmFtZTogc3RyaW5nLCBsb2NhbE5hbWU6IHN0cmluZywgc2xvdDogbnVtYmVyLCB2YWx1ZTogby5FeHByZXNzaW9uKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8vIEFzdE1lbW9yeUVmZmljaWVudFRyYW5zZm9ybWVyXG4gIHZpc2l0UGlwZShhc3Q6IEJpbmRpbmdQaXBlLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIC8vIEFsbG9jYXRlIGEgc2xvdCB0byBjcmVhdGUgdGhlIHBpcGVcbiAgICBsZXQgc2xvdCA9IHRoaXMucGlwZVNsb3RzLmdldChhc3QubmFtZSk7XG4gICAgaWYgKHNsb3QgPT0gbnVsbCkge1xuICAgICAgc2xvdCA9IHRoaXMuYWxsb2NhdGVTbG90KCk7XG4gICAgICB0aGlzLnBpcGVTbG90cy5zZXQoYXN0Lm5hbWUsIHNsb3QpO1xuICAgIH1cbiAgICBjb25zdCBzbG90UHNldWRvTG9jYWwgPSBgUElQRToke3Nsb3R9YDtcbiAgICBjb25zdCB0YXJnZXQgPSBuZXcgUHJvcGVydHlSZWFkKGFzdC5zcGFuLCBuZXcgSW1wbGljaXRSZWNlaXZlcihhc3Quc3BhbiksIHNsb3RQc2V1ZG9Mb2NhbCk7XG4gICAgY29uc3QgYmluZGluZ0lkID0gcGlwZUJpbmRpbmcoYXN0LmFyZ3MpO1xuICAgIHRoaXMuZGVmaW5lUGlwZShhc3QubmFtZSwgc2xvdFBzZXVkb0xvY2FsLCBzbG90LCBvLmltcG9ydEV4cHIoYmluZGluZ0lkKSk7XG4gICAgY29uc3QgdmFsdWUgPSBhc3QuZXhwLnZpc2l0KHRoaXMpO1xuICAgIGNvbnN0IGFyZ3MgPSB0aGlzLnZpc2l0QWxsKGFzdC5hcmdzKTtcblxuICAgIHJldHVybiBuZXcgRnVuY3Rpb25DYWxsKFxuICAgICAgICBhc3Quc3BhbiwgdGFyZ2V0LCBbbmV3IExpdGVyYWxQcmltaXRpdmUoYXN0LnNwYW4sIHNsb3QpLCB2YWx1ZSwgLi4uYXJnc10pO1xuICB9XG5cbiAgdmlzaXRMaXRlcmFsQXJyYXkoYXN0OiBMaXRlcmFsQXJyYXksIGNvbnRleHQ6IGFueSk6IEFTVCB7XG4gICAgcmV0dXJuIG5ldyBCdWlsdGluRnVuY3Rpb25DYWxsKGFzdC5zcGFuLCB0aGlzLnZpc2l0QWxsKGFzdC5leHByZXNzaW9ucyksIHZhbHVlcyA9PiB7XG4gICAgICAvLyBJZiB0aGUgbGl0ZXJhbCBoYXMgY2FsY3VsYXRlZCAobm9uLWxpdGVyYWwpIGVsZW1lbnRzIHRyYW5zZm9ybSBpdCBpbnRvXG4gICAgICAvLyBjYWxscyB0byBsaXRlcmFsIGZhY3RvcmllcyB0aGF0IGNvbXBvc2UgdGhlIGxpdGVyYWwgYW5kIHdpbGwgY2FjaGUgaW50ZXJtZWRpYXRlXG4gICAgICAvLyB2YWx1ZXMuIE90aGVyd2lzZSwganVzdCByZXR1cm4gYW4gbGl0ZXJhbCBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSB2YWx1ZXMuXG4gICAgICBjb25zdCBsaXRlcmFsID0gby5saXRlcmFsQXJyKHZhbHVlcyk7XG4gICAgICByZXR1cm4gdmFsdWVzLmV2ZXJ5KGEgPT4gYS5pc0NvbnN0YW50KCkpID9cbiAgICAgICAgICB0aGlzLm91dHB1dEN0eC5jb25zdGFudFBvb2wuZ2V0Q29uc3RMaXRlcmFsKGxpdGVyYWwsIHRydWUpIDpcbiAgICAgICAgICBnZXRMaXRlcmFsRmFjdG9yeSh0aGlzLm91dHB1dEN0eCwgbGl0ZXJhbCk7XG4gICAgfSk7XG4gIH1cblxuICB2aXNpdExpdGVyYWxNYXAoYXN0OiBMaXRlcmFsTWFwLCBjb250ZXh0OiBhbnkpOiBBU1Qge1xuICAgIHJldHVybiBuZXcgQnVpbHRpbkZ1bmN0aW9uQ2FsbChhc3Quc3BhbiwgdGhpcy52aXNpdEFsbChhc3QudmFsdWVzKSwgdmFsdWVzID0+IHtcbiAgICAgIC8vIElmIHRoZSBsaXRlcmFsIGhhcyBjYWxjdWxhdGVkIChub24tbGl0ZXJhbCkgZWxlbWVudHMgIHRyYW5zZm9ybSBpdCBpbnRvXG4gICAgICAvLyBjYWxscyB0byBsaXRlcmFsIGZhY3RvcmllcyB0aGF0IGNvbXBvc2UgdGhlIGxpdGVyYWwgYW5kIHdpbGwgY2FjaGUgaW50ZXJtZWRpYXRlXG4gICAgICAvLyB2YWx1ZXMuIE90aGVyd2lzZSwganVzdCByZXR1cm4gYW4gbGl0ZXJhbCBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSB2YWx1ZXMuXG4gICAgICBjb25zdCBsaXRlcmFsID0gby5saXRlcmFsTWFwKHZhbHVlcy5tYXAoXG4gICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gKHtrZXk6IGFzdC5rZXlzW2luZGV4XS5rZXksIHZhbHVlLCBxdW90ZWQ6IGFzdC5rZXlzW2luZGV4XS5xdW90ZWR9KSkpO1xuICAgICAgcmV0dXJuIHZhbHVlcy5ldmVyeShhID0+IGEuaXNDb25zdGFudCgpKSA/XG4gICAgICAgICAgdGhpcy5vdXRwdXRDdHguY29uc3RhbnRQb29sLmdldENvbnN0TGl0ZXJhbChsaXRlcmFsLCB0cnVlKSA6XG4gICAgICAgICAgZ2V0TGl0ZXJhbEZhY3RvcnkodGhpcy5vdXRwdXRDdHgsIGxpdGVyYWwpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGludmFsaWQ8VD4oYXJnOiBvLkV4cHJlc3Npb24gfCBvLlN0YXRlbWVudCB8IFRlbXBsYXRlQXN0KTogbmV2ZXIge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgSW52YWxpZCBzdGF0ZTogVmlzaXRvciAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gZG9lc24ndCBoYW5kbGUgJHtvLmNvbnN0cnVjdG9yLm5hbWV9YCk7XG59XG5cbmZ1bmN0aW9uIGZpbmRDb21wb25lbnQoZGlyZWN0aXZlczogRGlyZWN0aXZlQXN0W10pOiBEaXJlY3RpdmVBc3R8dW5kZWZpbmVkIHtcbiAgcmV0dXJuIGRpcmVjdGl2ZXMuZmlsdGVyKGRpcmVjdGl2ZSA9PiBkaXJlY3RpdmUuZGlyZWN0aXZlLmlzQ29tcG9uZW50KVswXTtcbn1cblxuaW50ZXJmYWNlIE5nQ29udGVudEluZm8ge1xuICBpbmRleDogbnVtYmVyO1xuICBzZWxlY3Rvcj86IFIzQ3NzU2VsZWN0b3I7XG59XG5cbmNsYXNzIENvbnRlbnRQcm9qZWN0aW9uVmlzaXRvciBleHRlbmRzIFJlY3Vyc2l2ZVRlbXBsYXRlQXN0VmlzaXRvciB7XG4gIHByaXZhdGUgaW5kZXggPSAxO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcHJvamVjdGlvbk1hcDogTWFwPE5nQ29udGVudEFzdCwgTmdDb250ZW50SW5mbz4sXG4gICAgICBwcml2YXRlIG5nQ29udGVudFNlbGVjdG9yczogc3RyaW5nW10pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgdmlzaXROZ0NvbnRlbnQoYXN0OiBOZ0NvbnRlbnRBc3QpIHtcbiAgICBjb25zdCBzZWxlY3RvclRleHQgPSB0aGlzLm5nQ29udGVudFNlbGVjdG9yc1thc3QuaW5kZXhdO1xuICAgIHNlbGVjdG9yVGV4dCAhPSBudWxsIHx8IGVycm9yKGBjb3VsZCBub3QgZmluZCBzZWxlY3RvciBmb3IgaW5kZXggJHthc3QuaW5kZXh9IGluICR7YXN0fWApO1xuICAgIGlmICghc2VsZWN0b3JUZXh0IHx8IHNlbGVjdG9yVGV4dCA9PT0gJyonKSB7XG4gICAgICB0aGlzLnByb2plY3Rpb25NYXAuc2V0KGFzdCwge2luZGV4OiAwfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNzc1NlbGVjdG9ycyA9IENzc1NlbGVjdG9yLnBhcnNlKHNlbGVjdG9yVGV4dCk7XG4gICAgICB0aGlzLnByb2plY3Rpb25NYXAuc2V0KFxuICAgICAgICAgIGFzdCwge2luZGV4OiB0aGlzLmluZGV4KyssIHNlbGVjdG9yOiBwYXJzZVNlbGVjdG9yc1RvUjNTZWxlY3Rvcihjc3NTZWxlY3RvcnMpfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldENvbnRlbnRQcm9qZWN0aW9uKGFzdHM6IFRlbXBsYXRlQXN0W10sIG5nQ29udGVudFNlbGVjdG9yczogc3RyaW5nW10pIHtcbiAgY29uc3QgcHJvamVjdEluZGV4TWFwID0gbmV3IE1hcDxOZ0NvbnRlbnRBc3QsIE5nQ29udGVudEluZm8+KCk7XG4gIGNvbnN0IHZpc2l0b3IgPSBuZXcgQ29udGVudFByb2plY3Rpb25WaXNpdG9yKHByb2plY3RJbmRleE1hcCwgbmdDb250ZW50U2VsZWN0b3JzKTtcbiAgdGVtcGxhdGVWaXNpdEFsbCh2aXNpdG9yLCBhc3RzKTtcbiAgcmV0dXJuIHByb2plY3RJbmRleE1hcDtcbn1cblxuLy8gVGhlc2UgYXJlIGEgY29weSB0aGUgQ1NTIHR5cGVzIGZyb20gY29yZS9zcmMvcmVuZGVyMy9pbnRlcmZhY2VzL3Byb2plY3Rpb24udHNcbi8vIFRoZXkgYXJlIGR1cGxpY2F0ZWQgaGVyZSBhcyB0aGV5IGNhbm5vdCBiZSBkaXJlY3RseSByZWZlcmVuY2VkIGZyb20gY29yZS5cbnR5cGUgUjNTaW1wbGVDc3NTZWxlY3RvciA9IChzdHJpbmcgfCBudWxsKVtdO1xudHlwZSBSM0Nzc1NlbGVjdG9yV2l0aE5lZ2F0aW9ucyA9XG4gICAgW1IzU2ltcGxlQ3NzU2VsZWN0b3IsIG51bGxdIHwgW1IzU2ltcGxlQ3NzU2VsZWN0b3IsIFIzU2ltcGxlQ3NzU2VsZWN0b3JdO1xudHlwZSBSM0Nzc1NlbGVjdG9yID0gUjNDc3NTZWxlY3RvcldpdGhOZWdhdGlvbnNbXTtcblxuZnVuY3Rpb24gcGFyc2VyU2VsZWN0b3JUb1NpbXBsZVNlbGVjdG9yKHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IFIzU2ltcGxlQ3NzU2VsZWN0b3Ige1xuICBjb25zdCBjbGFzc2VzID1cbiAgICAgIHNlbGVjdG9yLmNsYXNzTmFtZXMgJiYgc2VsZWN0b3IuY2xhc3NOYW1lcy5sZW5ndGggPyBbJ2NsYXNzJywgLi4uc2VsZWN0b3IuY2xhc3NOYW1lc10gOiBbXTtcbiAgcmV0dXJuIFtzZWxlY3Rvci5lbGVtZW50LCAuLi5zZWxlY3Rvci5hdHRycywgLi4uY2xhc3Nlc107XG59XG5cbmZ1bmN0aW9uIHBhcnNlclNlbGVjdG9yVG9SM1NlbGVjdG9yKHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IFIzQ3NzU2VsZWN0b3JXaXRoTmVnYXRpb25zIHtcbiAgY29uc3QgcG9zaXRpdmUgPSBwYXJzZXJTZWxlY3RvclRvU2ltcGxlU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICBjb25zdCBuZWdhdGl2ZSA9IHNlbGVjdG9yLm5vdFNlbGVjdG9ycyAmJiBzZWxlY3Rvci5ub3RTZWxlY3RvcnMubGVuZ3RoICYmXG4gICAgICBwYXJzZXJTZWxlY3RvclRvU2ltcGxlU2VsZWN0b3Ioc2VsZWN0b3Iubm90U2VsZWN0b3JzWzBdKTtcblxuICByZXR1cm4gbmVnYXRpdmUgPyBbcG9zaXRpdmUsIG5lZ2F0aXZlXSA6IFtwb3NpdGl2ZSwgbnVsbF07XG59XG5cbmZ1bmN0aW9uIHBhcnNlU2VsZWN0b3JzVG9SM1NlbGVjdG9yKHNlbGVjdG9yczogQ3NzU2VsZWN0b3JbXSk6IFIzQ3NzU2VsZWN0b3Ige1xuICByZXR1cm4gc2VsZWN0b3JzLm1hcChwYXJzZXJTZWxlY3RvclRvUjNTZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIGFzTGl0ZXJhbCh2YWx1ZTogYW55KTogby5FeHByZXNzaW9uIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIG8ubGl0ZXJhbEFycih2YWx1ZS5tYXAoYXNMaXRlcmFsKSk7XG4gIH1cbiAgcmV0dXJuIG8ubGl0ZXJhbCh2YWx1ZSwgby5JTkZFUlJFRF9UWVBFKTtcbn1cblxuZnVuY3Rpb24gbWFwVG9FeHByZXNzaW9uKG1hcDoge1trZXk6IHN0cmluZ106IGFueX0sIHF1b3RlZCA9IGZhbHNlKTogby5FeHByZXNzaW9uIHtcbiAgcmV0dXJuIG8ubGl0ZXJhbE1hcChcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG1hcCkubWFwKGtleSA9PiAoe2tleSwgcXVvdGVkLCB2YWx1ZTogYXNMaXRlcmFsKG1hcFtrZXldKX0pKSk7XG59XG5cbi8vIFBhcnNlIGkxOG4gbWV0YXMgbGlrZTpcbi8vIC0gXCJAQGlkXCIsXG4vLyAtIFwiZGVzY3JpcHRpb25bQEBpZF1cIixcbi8vIC0gXCJtZWFuaW5nfGRlc2NyaXB0aW9uW0BAaWRdXCJcbmZ1bmN0aW9uIHBhcnNlSTE4bk1ldGEoaTE4bj86IHN0cmluZyk6IHtkZXNjcmlwdGlvbj86IHN0cmluZywgaWQ/OiBzdHJpbmcsIG1lYW5pbmc/OiBzdHJpbmd9IHtcbiAgbGV0IG1lYW5pbmc6IHN0cmluZ3x1bmRlZmluZWQ7XG4gIGxldCBkZXNjcmlwdGlvbjogc3RyaW5nfHVuZGVmaW5lZDtcbiAgbGV0IGlkOiBzdHJpbmd8dW5kZWZpbmVkO1xuXG4gIGlmIChpMThuKSB7XG4gICAgLy8gVE9ETyh2aWNiKTogZmlndXJlIG91dCBob3cgdG8gZm9yY2UgYSBtZXNzYWdlIElEIHdpdGggY2xvc3VyZSA/XG4gICAgY29uc3QgaWRJbmRleCA9IGkxOG4uaW5kZXhPZihJRF9TRVBBUkFUT1IpO1xuXG4gICAgY29uc3QgZGVzY0luZGV4ID0gaTE4bi5pbmRleE9mKE1FQU5JTkdfU0VQQVJBVE9SKTtcbiAgICBsZXQgbWVhbmluZ0FuZERlc2M6IHN0cmluZztcbiAgICBbbWVhbmluZ0FuZERlc2MsIGlkXSA9XG4gICAgICAgIChpZEluZGV4ID4gLTEpID8gW2kxOG4uc2xpY2UoMCwgaWRJbmRleCksIGkxOG4uc2xpY2UoaWRJbmRleCArIDIpXSA6IFtpMThuLCAnJ107XG4gICAgW21lYW5pbmcsIGRlc2NyaXB0aW9uXSA9IChkZXNjSW5kZXggPiAtMSkgP1xuICAgICAgICBbbWVhbmluZ0FuZERlc2Muc2xpY2UoMCwgZGVzY0luZGV4KSwgbWVhbmluZ0FuZERlc2Muc2xpY2UoZGVzY0luZGV4ICsgMSldIDpcbiAgICAgICAgWycnLCBtZWFuaW5nQW5kRGVzY107XG4gIH1cblxuICByZXR1cm4ge2Rlc2NyaXB0aW9uLCBpZCwgbWVhbmluZ307XG59XG4iXX0=