(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/metadata/bundler", ["require", "exports", "tslib", "path", "typescript", "@angular/compiler-cli/src/metadata/collector", "@angular/compiler-cli/src/metadata/schema"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var path = require("path");
    var ts = require("typescript");
    var collector_1 = require("@angular/compiler-cli/src/metadata/collector");
    var schema_1 = require("@angular/compiler-cli/src/metadata/schema");
    // The character set used to produce private names.
    var PRIVATE_NAME_CHARS = 'abcdefghijklmnopqrstuvwxyz';
    var MetadataBundler = /** @class */ (function () {
        function MetadataBundler(root, importAs, host, privateSymbolPrefix) {
            this.root = root;
            this.importAs = importAs;
            this.host = host;
            this.symbolMap = new Map();
            this.metadataCache = new Map();
            this.exports = new Map();
            this.rootModule = "./" + path.basename(root);
            this.privateSymbolPrefix = (privateSymbolPrefix || '').replace(/\W/g, '_');
        }
        MetadataBundler.prototype.getMetadataBundle = function () {
            // Export the root module. This also collects the transitive closure of all values referenced by
            // the exports.
            var exportedSymbols = this.exportAll(this.rootModule);
            this.canonicalizeSymbols(exportedSymbols);
            // TODO: exports? e.g. a module re-exports a symbol from another bundle
            var metadata = this.getEntries(exportedSymbols);
            var privates = Array.from(this.symbolMap.values())
                .filter(function (s) { return s.referenced && s.isPrivate; })
                .map(function (s) { return ({
                privateName: s.privateName,
                name: s.declaration.name,
                module: s.declaration.module
            }); });
            var origins = Array.from(this.symbolMap.values())
                .filter(function (s) { return s.referenced && !s.reexport; })
                .reduce(function (p, s) {
                p[s.isPrivate ? s.privateName : s.name] = s.declaration.module;
                return p;
            }, {});
            var exports = this.getReExports(exportedSymbols);
            return {
                metadata: {
                    __symbolic: 'module',
                    version: schema_1.METADATA_VERSION,
                    exports: exports.length ? exports : undefined, metadata: metadata, origins: origins,
                    importAs: this.importAs
                },
                privates: privates
            };
        };
        MetadataBundler.resolveModule = function (importName, from) {
            return resolveModule(importName, from);
        };
        MetadataBundler.prototype.getMetadata = function (moduleName) {
            var result = this.metadataCache.get(moduleName);
            if (!result) {
                if (moduleName.startsWith('.')) {
                    var fullModuleName = resolveModule(moduleName, this.root);
                    result = this.host.getMetadataFor(fullModuleName);
                }
                this.metadataCache.set(moduleName, result);
            }
            return result;
        };
        MetadataBundler.prototype.exportAll = function (moduleName) {
            var _this = this;
            var module = this.getMetadata(moduleName);
            var result = this.exports.get(moduleName);
            if (result) {
                return result;
            }
            result = [];
            var exportSymbol = function (exportedSymbol, exportAs) {
                var symbol = _this.symbolOf(moduleName, exportAs);
                result.push(symbol);
                exportedSymbol.reexportedAs = symbol;
                symbol.exports = exportedSymbol;
            };
            // Export all the symbols defined in this module.
            if (module && module.metadata) {
                for (var key in module.metadata) {
                    var data = module.metadata[key];
                    if (schema_1.isMetadataImportedSymbolReferenceExpression(data)) {
                        // This is a re-export of an imported symbol. Record this as a re-export.
                        var exportFrom = resolveModule(data.module, moduleName);
                        this.exportAll(exportFrom);
                        var symbol = this.symbolOf(exportFrom, data.name);
                        exportSymbol(symbol, key);
                    }
                    else {
                        // Record that this symbol is exported by this module.
                        result.push(this.symbolOf(moduleName, key));
                    }
                }
            }
            // Export all the re-exports from this module
            if (module && module.exports) {
                try {
                    for (var _a = tslib_1.__values(module.exports), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var exportDeclaration = _b.value;
                        var exportFrom = resolveModule(exportDeclaration.from, moduleName);
                        // Record all the exports from the module even if we don't use it directly.
                        var exportedSymbols = this.exportAll(exportFrom);
                        if (exportDeclaration.export) {
                            try {
                                // Re-export all the named exports from a module.
                                for (var _c = tslib_1.__values(exportDeclaration.export), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var exportItem = _d.value;
                                    var name = typeof exportItem == 'string' ? exportItem : exportItem.name;
                                    var exportAs = typeof exportItem == 'string' ? exportItem : exportItem.as;
                                    var symbol = this.symbolOf(exportFrom, name);
                                    if (exportedSymbols && exportedSymbols.length == 1 && exportedSymbols[0].reexport &&
                                        exportedSymbols[0].name == '*') {
                                        // This is a named export from a module we have no metadata about. Record the named
                                        // export as a re-export.
                                        symbol.reexport = true;
                                    }
                                    exportSymbol(this.symbolOf(exportFrom, name), exportAs);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_e = _c.return)) _e.call(_c);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        else {
                            // Re-export all the symbols from the module
                            var exportedSymbols_1 = this.exportAll(exportFrom);
                            try {
                                for (var exportedSymbols_2 = tslib_1.__values(exportedSymbols_1), exportedSymbols_2_1 = exportedSymbols_2.next(); !exportedSymbols_2_1.done; exportedSymbols_2_1 = exportedSymbols_2.next()) {
                                    var exportedSymbol = exportedSymbols_2_1.value;
                                    var name = exportedSymbol.name;
                                    exportSymbol(exportedSymbol, name);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (exportedSymbols_2_1 && !exportedSymbols_2_1.done && (_f = exportedSymbols_2.return)) _f.call(exportedSymbols_2);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            if (!module) {
                // If no metadata is found for this import then it is considered external to the
                // library and should be recorded as a re-export in the final metadata if it is
                // eventually re-exported.
                var symbol = this.symbolOf(moduleName, '*');
                symbol.reexport = true;
                result.push(symbol);
            }
            this.exports.set(moduleName, result);
            return result;
            var e_3, _g, e_1, _e, e_2, _f;
        };
        /**
         * Fill in the canonicalSymbol which is the symbol that should be imported by factories.
         * The canonical symbol is the one exported by the index file for the bundle or definition
         * symbol for private symbols that are not exported by bundle index.
         */
        MetadataBundler.prototype.canonicalizeSymbols = function (exportedSymbols) {
            var symbols = Array.from(this.symbolMap.values());
            this.exported = new Set(exportedSymbols);
            symbols.forEach(this.canonicalizeSymbol, this);
        };
        MetadataBundler.prototype.canonicalizeSymbol = function (symbol) {
            var rootExport = getRootExport(symbol);
            var declaration = getSymbolDeclaration(symbol);
            var isPrivate = !this.exported.has(rootExport);
            var canonicalSymbol = isPrivate ? declaration : rootExport;
            symbol.isPrivate = isPrivate;
            symbol.declaration = declaration;
            symbol.canonicalSymbol = canonicalSymbol;
            symbol.reexport = declaration.reexport;
        };
        MetadataBundler.prototype.getEntries = function (exportedSymbols) {
            var _this = this;
            var result = {};
            var exportedNames = new Set(exportedSymbols.map(function (s) { return s.name; }));
            var privateName = 0;
            function newPrivateName(prefix) {
                while (true) {
                    var digits = [];
                    var index = privateName++;
                    var base = PRIVATE_NAME_CHARS;
                    while (!digits.length || index > 0) {
                        digits.unshift(base[index % base.length]);
                        index = Math.floor(index / base.length);
                    }
                    var result_1 = "\u0275" + prefix + digits.join('');
                    if (!exportedNames.has(result_1))
                        return result_1;
                }
            }
            exportedSymbols.forEach(function (symbol) { return _this.convertSymbol(symbol); });
            var symbolsMap = new Map();
            Array.from(this.symbolMap.values()).forEach(function (symbol) {
                if (symbol.referenced && !symbol.reexport) {
                    var name = symbol.name;
                    var identifier = symbol.declaration.module + ":" + symbol.declaration.name;
                    if (symbol.isPrivate && !symbol.privateName) {
                        name = newPrivateName(_this.privateSymbolPrefix);
                        symbol.privateName = name;
                    }
                    if (symbolsMap.has(identifier)) {
                        var names = symbolsMap.get(identifier);
                        names.push(name);
                    }
                    else {
                        symbolsMap.set(identifier, [name]);
                    }
                    result[name] = symbol.value;
                }
            });
            // check for duplicated entries
            symbolsMap.forEach(function (names, identifier) {
                if (names.length > 1) {
                    var _a = tslib_1.__read(identifier.split(':'), 2), module_1 = _a[0], declaredName = _a[1];
                    // prefer the export that uses the declared name (if any)
                    var reference_1 = names.indexOf(declaredName);
                    if (reference_1 === -1) {
                        reference_1 = 0;
                    }
                    // keep one entry and replace the others by references
                    names.forEach(function (name, i) {
                        if (i !== reference_1) {
                            result[name] = { __symbolic: 'reference', name: names[reference_1] };
                        }
                    });
                }
            });
            return result;
        };
        MetadataBundler.prototype.getReExports = function (exportedSymbols) {
            var modules = new Map();
            var exportAlls = new Set();
            try {
                for (var exportedSymbols_3 = tslib_1.__values(exportedSymbols), exportedSymbols_3_1 = exportedSymbols_3.next(); !exportedSymbols_3_1.done; exportedSymbols_3_1 = exportedSymbols_3.next()) {
                    var symbol = exportedSymbols_3_1.value;
                    if (symbol.reexport) {
                        // symbol.declaration is guaranteed to be defined during the phase this method is called.
                        var declaration = symbol.declaration;
                        var module_2 = declaration.module;
                        if (declaration.name == '*') {
                            // Reexport all the symbols.
                            exportAlls.add(declaration.module);
                        }
                        else {
                            // Re-export the symbol as the exported name.
                            var entry = modules.get(module_2);
                            if (!entry) {
                                entry = [];
                                modules.set(module_2, entry);
                            }
                            var as = symbol.name;
                            var name = declaration.name;
                            entry.push({ name: name, as: as });
                        }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (exportedSymbols_3_1 && !exportedSymbols_3_1.done && (_a = exportedSymbols_3.return)) _a.call(exportedSymbols_3);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return tslib_1.__spread(Array.from(exportAlls.values()).map(function (from) { return ({ from: from }); }), Array.from(modules.entries()).map(function (_a) {
                var _b = tslib_1.__read(_a, 2), from = _b[0], exports = _b[1];
                return ({ export: exports, from: from });
            }));
            var e_4, _a;
        };
        MetadataBundler.prototype.convertSymbol = function (symbol) {
            // canonicalSymbol is ensured to be defined before this is called.
            var canonicalSymbol = symbol.canonicalSymbol;
            if (!canonicalSymbol.referenced) {
                canonicalSymbol.referenced = true;
                // declaration is ensured to be definded before this method is called.
                var declaration = canonicalSymbol.declaration;
                var module_3 = this.getMetadata(declaration.module);
                if (module_3) {
                    var value = module_3.metadata[declaration.name];
                    if (value && !declaration.name.startsWith('___')) {
                        canonicalSymbol.value = this.convertEntry(declaration.module, value);
                    }
                }
            }
        };
        MetadataBundler.prototype.convertEntry = function (moduleName, value) {
            if (schema_1.isClassMetadata(value)) {
                return this.convertClass(moduleName, value);
            }
            if (schema_1.isFunctionMetadata(value)) {
                return this.convertFunction(moduleName, value);
            }
            if (schema_1.isInterfaceMetadata(value)) {
                return value;
            }
            return this.convertValue(moduleName, value);
        };
        MetadataBundler.prototype.convertClass = function (moduleName, value) {
            var _this = this;
            return {
                __symbolic: 'class',
                arity: value.arity,
                extends: this.convertExpression(moduleName, value.extends),
                decorators: value.decorators && value.decorators.map(function (d) { return _this.convertExpression(moduleName, d); }),
                members: this.convertMembers(moduleName, value.members),
                statics: value.statics && this.convertStatics(moduleName, value.statics)
            };
        };
        MetadataBundler.prototype.convertMembers = function (moduleName, members) {
            var _this = this;
            var result = {};
            for (var name in members) {
                var value = members[name];
                result[name] = value.map(function (v) { return _this.convertMember(moduleName, v); });
            }
            return result;
        };
        MetadataBundler.prototype.convertMember = function (moduleName, member) {
            var _this = this;
            var result = { __symbolic: member.__symbolic };
            result.decorators =
                member.decorators && member.decorators.map(function (d) { return _this.convertExpression(moduleName, d); });
            if (schema_1.isMethodMetadata(member)) {
                result.parameterDecorators = member.parameterDecorators &&
                    member.parameterDecorators.map(function (d) { return d && d.map(function (p) { return _this.convertExpression(moduleName, p); }); });
                if (schema_1.isConstructorMetadata(member)) {
                    if (member.parameters) {
                        result.parameters =
                            member.parameters.map(function (p) { return _this.convertExpression(moduleName, p); });
                    }
                }
            }
            return result;
        };
        MetadataBundler.prototype.convertStatics = function (moduleName, statics) {
            var result = {};
            for (var key in statics) {
                var value = statics[key];
                result[key] = schema_1.isFunctionMetadata(value) ? this.convertFunction(moduleName, value) : value;
            }
            return result;
        };
        MetadataBundler.prototype.convertFunction = function (moduleName, value) {
            var _this = this;
            return {
                __symbolic: 'function',
                parameters: value.parameters,
                defaults: value.defaults && value.defaults.map(function (v) { return _this.convertValue(moduleName, v); }),
                value: this.convertValue(moduleName, value.value)
            };
        };
        MetadataBundler.prototype.convertValue = function (moduleName, value) {
            var _this = this;
            if (isPrimitive(value)) {
                return value;
            }
            if (schema_1.isMetadataError(value)) {
                return this.convertError(moduleName, value);
            }
            if (schema_1.isMetadataSymbolicExpression(value)) {
                return this.convertExpression(moduleName, value);
            }
            if (Array.isArray(value)) {
                return value.map(function (v) { return _this.convertValue(moduleName, v); });
            }
            // Otherwise it is a metadata object.
            var object = value;
            var result = {};
            for (var key in object) {
                result[key] = this.convertValue(moduleName, object[key]);
            }
            return result;
        };
        MetadataBundler.prototype.convertExpression = function (moduleName, value) {
            if (value) {
                switch (value.__symbolic) {
                    case 'error':
                        return this.convertError(moduleName, value);
                    case 'reference':
                        return this.convertReference(moduleName, value);
                    default:
                        return this.convertExpressionNode(moduleName, value);
                }
            }
            return value;
        };
        MetadataBundler.prototype.convertError = function (module, value) {
            return {
                __symbolic: 'error',
                message: value.message,
                line: value.line,
                character: value.character,
                context: value.context, module: module
            };
        };
        MetadataBundler.prototype.convertReference = function (moduleName, value) {
            var _this = this;
            var createReference = function (symbol) {
                var declaration = symbol.declaration;
                if (declaration.module.startsWith('.')) {
                    // Reference to a symbol defined in the module. Ensure it is converted then return a
                    // references to the final symbol.
                    _this.convertSymbol(symbol);
                    return {
                        __symbolic: 'reference',
                        get name() {
                            // Resolved lazily because private names are assigned late.
                            var canonicalSymbol = symbol.canonicalSymbol;
                            if (canonicalSymbol.isPrivate == null) {
                                throw Error('Invalid state: isPrivate was not initialized');
                            }
                            return canonicalSymbol.isPrivate ? canonicalSymbol.privateName : canonicalSymbol.name;
                        }
                    };
                }
                else {
                    // The symbol was a re-exported symbol from another module. Return a reference to the
                    // original imported symbol.
                    return { __symbolic: 'reference', name: declaration.name, module: declaration.module };
                }
            };
            if (schema_1.isMetadataGlobalReferenceExpression(value)) {
                var metadata = this.getMetadata(moduleName);
                if (metadata && metadata.metadata && metadata.metadata[value.name]) {
                    // Reference to a symbol defined in the module
                    return createReference(this.canonicalSymbolOf(moduleName, value.name));
                }
                // If a reference has arguments, the arguments need to be converted.
                if (value.arguments) {
                    return {
                        __symbolic: 'reference',
                        name: value.name,
                        arguments: value.arguments.map(function (a) { return _this.convertValue(moduleName, a); })
                    };
                }
                // Global references without arguments (such as to Math or JSON) are unmodified.
                return value;
            }
            if (schema_1.isMetadataImportedSymbolReferenceExpression(value)) {
                // References to imported symbols are separated into two, references to bundled modules and
                // references to modules external to the bundle. If the module reference is relative it is
                // assumed to be in the bundle. If it is Global it is assumed to be outside the bundle.
                // References to symbols outside the bundle are left unmodified. References to symbol inside
                // the bundle need to be converted to a bundle import reference reachable from the bundle
                // index.
                if (value.module.startsWith('.')) {
                    // Reference is to a symbol defined inside the module. Convert the reference to a reference
                    // to the canonical symbol.
                    var referencedModule = resolveModule(value.module, moduleName);
                    var referencedName = value.name;
                    return createReference(this.canonicalSymbolOf(referencedModule, referencedName));
                }
                // Value is a reference to a symbol defined outside the module.
                if (value.arguments) {
                    // If a reference has arguments the arguments need to be converted.
                    return {
                        __symbolic: 'reference',
                        name: value.name,
                        module: value.module,
                        arguments: value.arguments.map(function (a) { return _this.convertValue(moduleName, a); })
                    };
                }
                return value;
            }
            if (schema_1.isMetadataModuleReferenceExpression(value)) {
                // Cannot support references to bundled modules as the internal modules of a bundle are erased
                // by the bundler.
                if (value.module.startsWith('.')) {
                    return {
                        __symbolic: 'error',
                        message: 'Unsupported bundled module reference',
                        context: { module: value.module }
                    };
                }
                // References to unbundled modules are unmodified.
                return value;
            }
        };
        MetadataBundler.prototype.convertExpressionNode = function (moduleName, value) {
            var result = { __symbolic: value.__symbolic };
            for (var key in value) {
                result[key] = this.convertValue(moduleName, value[key]);
            }
            return result;
        };
        MetadataBundler.prototype.symbolOf = function (module, name) {
            var symbolKey = module + ":" + name;
            var symbol = this.symbolMap.get(symbolKey);
            if (!symbol) {
                symbol = { module: module, name: name };
                this.symbolMap.set(symbolKey, symbol);
            }
            return symbol;
        };
        MetadataBundler.prototype.canonicalSymbolOf = function (module, name) {
            // Ensure the module has been seen.
            this.exportAll(module);
            var symbol = this.symbolOf(module, name);
            if (!symbol.canonicalSymbol) {
                this.canonicalizeSymbol(symbol);
            }
            return symbol;
        };
        return MetadataBundler;
    }());
    exports.MetadataBundler = MetadataBundler;
    var CompilerHostAdapter = /** @class */ (function () {
        function CompilerHostAdapter(host) {
            this.host = host;
            this.collector = new collector_1.MetadataCollector();
        }
        CompilerHostAdapter.prototype.getMetadataFor = function (fileName) {
            if (!this.host.fileExists(fileName + '.ts'))
                return undefined;
            var sourceFile = this.host.getSourceFile(fileName + '.ts', ts.ScriptTarget.Latest);
            return sourceFile && this.collector.getMetadata(sourceFile);
        };
        return CompilerHostAdapter;
    }());
    exports.CompilerHostAdapter = CompilerHostAdapter;
    function resolveModule(importName, from) {
        if (importName.startsWith('.') && from) {
            var normalPath = path.normalize(path.join(path.dirname(from), importName));
            if (!normalPath.startsWith('.') && from.startsWith('.')) {
                // path.normalize() preserves leading '../' but not './'. This adds it back.
                normalPath = "." + path.sep + normalPath;
            }
            // Replace windows path delimiters with forward-slashes. Otherwise the paths are not
            // TypeScript compatible when building the bundle.
            return normalPath.replace(/\\/g, '/');
        }
        return importName;
    }
    function isPrimitive(o) {
        return o === null || (typeof o !== 'function' && typeof o !== 'object');
    }
    function getRootExport(symbol) {
        return symbol.reexportedAs ? getRootExport(symbol.reexportedAs) : symbol;
    }
    function getSymbolDeclaration(symbol) {
        return symbol.exports ? getSymbolDeclaration(symbol.exports) : symbol;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbWV0YWRhdGEvYnVuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCwyQkFBNkI7SUFDN0IsK0JBQWlDO0lBRWpDLDBFQUF3RDtJQUN4RCxvRUFBK21CO0lBSS9tQixtREFBbUQ7SUFDbkQsSUFBTSxrQkFBa0IsR0FBRyw0QkFBNEIsQ0FBQztJQWdFeEQ7UUFRRSx5QkFDWSxJQUFZLEVBQVUsUUFBMEIsRUFBVSxJQUF5QixFQUMzRixtQkFBNEI7WUFEcEIsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUFVLGFBQVEsR0FBUixRQUFRLENBQWtCO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBcUI7WUFSdkYsY0FBUyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1lBQ3RDLGtCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQW9DLENBQUM7WUFDNUQsWUFBTyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1lBUTVDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBRyxDQUFDO1lBQzdDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVELDJDQUFpQixHQUFqQjtZQUNFLGdHQUFnRztZQUNoRyxlQUFlO1lBQ2YsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzFDLHVFQUF1RTtZQUN2RSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxD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QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7TWV0YWRhdGFDb2xsZWN0b3J9IGZyb20gJy4uL21ldGFkYXRhL2NvbGxlY3Rvcic7XG5pbXBvcnQge0NsYXNzTWV0YWRhdGEsIENvbnN0cnVjdG9yTWV0YWRhdGEsIEZ1bmN0aW9uTWV0YWRhdGEsIE1FVEFEQVRBX1ZFUlNJT04sIE1lbWJlck1ldGFkYXRhLCBNZXRhZGF0YUVudHJ5LCBNZXRhZGF0YUVycm9yLCBNZXRhZGF0YUltcG9ydGVkU3ltYm9sUmVmZXJlbmNlRXhwcmVzc2lvbiwgTWV0YWRhdGFNYXAsIE1ldGFkYXRhT2JqZWN0LCBNZXRhZGF0YVN5bWJvbGljRXhwcmVzc2lvbiwgTWV0YWRhdGFTeW1ib2xpY1JlZmVyZW5jZUV4cHJlc3Npb24sIE1ldGFkYXRhVmFsdWUsIE1ldGhvZE1ldGFkYXRhLCBNb2R1bGVFeHBvcnRNZXRhZGF0YSwgTW9kdWxlTWV0YWRhdGEsIGlzQ2xhc3NNZXRhZGF0YSwgaXNDb25zdHJ1Y3Rvck1ldGFkYXRhLCBpc0Z1bmN0aW9uTWV0YWRhdGEsIGlzSW50ZXJmYWNlTWV0YWRhdGEsIGlzTWV0YWRhdGFFcnJvciwgaXNNZXRhZGF0YUdsb2JhbFJlZmVyZW5jZUV4cHJlc3Npb24sIGlzTWV0YWRhdGFJbXBvcnRlZFN5bWJvbFJlZmVyZW5jZUV4cHJlc3Npb24sIGlzTWV0YWRhdGFNb2R1bGVSZWZlcmVuY2VFeHByZXNzaW9uLCBpc01ldGFkYXRhU3ltYm9saWNFeHByZXNzaW9uLCBpc01ldGhvZE1ldGFkYXRhfSBmcm9tICcuLi9tZXRhZGF0YS9zY2hlbWEnO1xuXG5cblxuLy8gVGhlIGNoYXJhY3RlciBzZXQgdXNlZCB0byBwcm9kdWNlIHByaXZhdGUgbmFtZXMuXG5jb25zdCBQUklWQVRFX05BTUVfQ0hBUlMgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xuXG5pbnRlcmZhY2UgU3ltYm9sIHtcbiAgbW9kdWxlOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcblxuICAvLyBQcm9kdWNlZCBieSBpbmRpcmVjdGx5IGJ5IGV4cG9ydEFsbCgpIGZvciBzeW1ib2xzIHJlLWV4cG9ydCBhbm90aGVyIHN5bWJvbC5cbiAgZXhwb3J0cz86IFN5bWJvbDtcblxuICAvLyBQcm9kdWNlZCBieSBpbmRpcmVjdGx5IGJ5IGV4cG9ydEFsbCgpIGZvciBzeW1ib2xzIGFyZSByZS1leHBvcnRlZCBieSBhbm90aGVyIHN5bWJvbC5cbiAgcmVleHBvcnRlZEFzPzogU3ltYm9sO1xuXG4gIC8vIFByb2R1Y2VkIGJ5IGNhbm9uaWNhbGl6ZVN5bWJvbHMoKSBmb3IgYWxsIHN5bWJvbHMuIEEgc3ltYm9sIGlzIHByaXZhdGUgaWYgaXQgaXMgbm90XG4gIC8vIGV4cG9ydGVkIGJ5IHRoZSBpbmRleC5cbiAgaXNQcml2YXRlPzogYm9vbGVhbjtcblxuICAvLyBQcm9kdWNlZCBieSBjYW5vbmljYWxpemVTeW1ib2xzKCkgZm9yIGFsbCBzeW1ib2xzLiBUaGlzIGlzIHRoZSBvbmUgc3ltYm9sIHRoYXRcbiAgLy8gcmVzcHJlc2VudHMgYWxsIG90aGVyIHN5bWJvbHMgYW5kIGlzIHRoZSBvbmx5IHN5bWJvbCB0aGF0LCBhbW9uZyBhbGwgdGhlIHJlLWV4cG9ydGVkXG4gIC8vIGFsaWFzZXMsIHdob3NlIGZpZWxkcyBjYW4gYmUgdHJ1c3RlZCB0byBjb250YWluIHRoZSBjb3JyZWN0IGluZm9ybWF0aW9uLlxuICAvLyBGb3IgcHJpdmF0ZSBzeW1ib2xzIHRoaXMgaXMgdGhlIGRlY2xhcmF0aW9uIHN5bWJvbC4gRm9yIHB1YmxpYyBzeW1ib2xzIHRoaXMgaXMgdGhlXG4gIC8vIHN5bWJvbCB0aGF0IGlzIGV4cG9ydGVkLlxuICBjYW5vbmljYWxTeW1ib2w/OiBTeW1ib2w7XG5cbiAgLy8gUHJvZHVjZWQgYnkgY2Fub25pY2FsaXplU3ltYm9scygpIGZvciBhbGwgc3ltYm9scy4gVGhpcyB0aGUgc3ltYm9sIHRoYXQgb3JpZ2luYWxseVxuICAvLyBkZWNsYXJlZCB0aGUgdmFsdWUgYW5kIHNob3VsZCBiZSB1c2VkIHRvIGZldGNoIHRoZSB2YWx1ZS5cbiAgZGVjbGFyYXRpb24/OiBTeW1ib2w7XG5cbiAgLy8gQSBzeW1ib2wgaXMgcmVmZXJlbmNlZCBpZiBpdCBpcyBleHBvcnRlZCBmcm9tIGluZGV4IG9yIHJlZmVyZW5jZWQgYnkgdGhlIHZhbHVlIG9mXG4gIC8vIGEgcmVmZXJlbmNlZCBzeW1ib2wncyB2YWx1ZS5cbiAgcmVmZXJlbmNlZD86IGJvb2xlYW47XG5cbiAgLy8gQSBzeW1ib2wgaXMgbWFya2VkIGFzIGEgcmUtZXhwb3J0IHRoZSBzeW1ib2wgd2FzIHJleHBvcnRlZCBmcm9tIGEgbW9kdWxlIHRoYXQgaXNcbiAgLy8gbm90IHBhcnQgb2YgdGhlIGZsYXQgbW9kdWxlIGJ1bmRsZS5cbiAgcmVleHBvcnQ/OiBib29sZWFuO1xuXG4gIC8vIE9ubHkgdmFsaWQgZm9yIHJlZmVyZW5jZWQgY2Fub25pY2FsIHN5bWJvbHMuIFByb2R1Y2VzIGJ5IGNvbnZlcnRTeW1ib2xzKCkuXG4gIHZhbHVlPzogTWV0YWRhdGFFbnRyeTtcblxuICAvLyBPbmx5IHZhbGlkIGZvciByZWZlcmVuY2VkIHByaXZhdGUgc3ltYm9scy4gSXQgaXMgdGhlIG5hbWUgdG8gdXNlIHRvIGltcG9ydCB0aGUgc3ltYm9sIGZyb21cbiAgLy8gdGhlIGJ1bmRsZSBpbmRleC4gUHJvZHVjZSBieSBhc3NpZ25Qcml2YXRlTmFtZXMoKTtcbiAgcHJpdmF0ZU5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnVuZGxlRW50cmllcyB7IFtuYW1lOiBzdHJpbmddOiBNZXRhZGF0YUVudHJ5OyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnVuZGxlUHJpdmF0ZUVudHJ5IHtcbiAgcHJpdmF0ZU5hbWU6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBtb2R1bGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCdW5kbGVkTW9kdWxlIHtcbiAgbWV0YWRhdGE6IE1vZHVsZU1ldGFkYXRhO1xuICBwcml2YXRlczogQnVuZGxlUHJpdmF0ZUVudHJ5W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YWRhdGFCdW5kbGVySG9zdCB7XG4gIGdldE1ldGFkYXRhRm9yKG1vZHVsZU5hbWU6IHN0cmluZyk6IE1vZHVsZU1ldGFkYXRhfHVuZGVmaW5lZDtcbn1cblxudHlwZSBTdGF0aWNzTWV0YWRhdGEgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBNZXRhZGF0YVZhbHVlIHwgRnVuY3Rpb25NZXRhZGF0YTtcbn07XG5cbmV4cG9ydCBjbGFzcyBNZXRhZGF0YUJ1bmRsZXIge1xuICBwcml2YXRlIHN5bWJvbE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBTeW1ib2w+KCk7XG4gIHByaXZhdGUgbWV0YWRhdGFDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBNb2R1bGVNZXRhZGF0YXx1bmRlZmluZWQ+KCk7XG4gIHByaXZhdGUgZXhwb3J0cyA9IG5ldyBNYXA8c3RyaW5nLCBTeW1ib2xbXT4oKTtcbiAgcHJpdmF0ZSByb290TW9kdWxlOiBzdHJpbmc7XG4gIHByaXZhdGUgcHJpdmF0ZVN5bWJvbFByZWZpeDogc3RyaW5nO1xuICBwcml2YXRlIGV4cG9ydGVkOiBTZXQ8U3ltYm9sPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm9vdDogc3RyaW5nLCBwcml2YXRlIGltcG9ydEFzOiBzdHJpbmd8dW5kZWZpbmVkLCBwcml2YXRlIGhvc3Q6IE1ldGFkYXRhQnVuZGxlckhvc3QsXG4gICAgICBwcml2YXRlU3ltYm9sUHJlZml4Pzogc3RyaW5nKSB7XG4gICAgdGhpcy5yb290TW9kdWxlID0gYC4vJHtwYXRoLmJhc2VuYW1lKHJvb3QpfWA7XG4gICAgdGhpcy5wcml2YXRlU3ltYm9sUHJlZml4ID0gKHByaXZhdGVTeW1ib2xQcmVmaXggfHwgJycpLnJlcGxhY2UoL1xcVy9nLCAnXycpO1xuICB9XG5cbiAgZ2V0TWV0YWRhdGFCdW5kbGUoKTogQnVuZGxlZE1vZHVsZSB7XG4gICAgLy8gRXhwb3J0IHRoZSByb290IG1vZHVsZS4gVGhpcyBhbHNvIGNvbGxlY3RzIHRoZSB0cmFuc2l0aXZlIGNsb3N1cmUgb2YgYWxsIHZhbHVlcyByZWZlcmVuY2VkIGJ5XG4gICAgLy8gdGhlIGV4cG9ydHMuXG4gICAgY29uc3QgZXhwb3J0ZWRTeW1ib2xzID0gdGhpcy5leHBvcnRBbGwodGhpcy5yb290TW9kdWxlKTtcbiAgICB0aGlzLmNhbm9uaWNhbGl6ZVN5bWJvbHMoZXhwb3J0ZWRTeW1ib2xzKTtcbiAgICAvLyBUT0RPOiBleHBvcnRzPyBlLmcuIGEgbW9kdWxlIHJlLWV4cG9ydHMgYSBzeW1ib2wgZnJvbSBhbm90aGVyIGJ1bmRsZVxuICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5nZXRFbnRyaWVzKGV4cG9ydGVkU3ltYm9scyk7XG4gICAgY29uc3QgcHJpdmF0ZXMgPSBBcnJheS5mcm9tKHRoaXMuc3ltYm9sTWFwLnZhbHVlcygpKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIocyA9PiBzLnJlZmVyZW5jZWQgJiYgcy5pc1ByaXZhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChzID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGVOYW1lOiBzLnByaXZhdGVOYW1lICEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHMuZGVjbGFyYXRpb24gIS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGU6IHMuZGVjbGFyYXRpb24gIS5tb2R1bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICBjb25zdCBvcmlnaW5zID0gQXJyYXkuZnJvbSh0aGlzLnN5bWJvbE1hcC52YWx1ZXMoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIocyA9PiBzLnJlZmVyZW5jZWQgJiYgIXMucmVleHBvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVkdWNlPHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfT4oKHAsIHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcFtzLmlzUHJpdmF0ZSA/IHMucHJpdmF0ZU5hbWUgISA6IHMubmFtZV0gPSBzLmRlY2xhcmF0aW9uICEubW9kdWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICBjb25zdCBleHBvcnRzID0gdGhpcy5nZXRSZUV4cG9ydHMoZXhwb3J0ZWRTeW1ib2xzKTtcbiAgICByZXR1cm4ge1xuICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgX19zeW1ib2xpYzogJ21vZHVsZScsXG4gICAgICAgIHZlcnNpb246IE1FVEFEQVRBX1ZFUlNJT04sXG4gICAgICAgIGV4cG9ydHM6IGV4cG9ydHMubGVuZ3RoID8gZXhwb3J0cyA6IHVuZGVmaW5lZCwgbWV0YWRhdGEsIG9yaWdpbnMsXG4gICAgICAgIGltcG9ydEFzOiB0aGlzLmltcG9ydEFzICFcbiAgICAgIH0sXG4gICAgICBwcml2YXRlc1xuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcmVzb2x2ZU1vZHVsZShpbXBvcnROYW1lOiBzdHJpbmcsIGZyb206IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHJlc29sdmVNb2R1bGUoaW1wb3J0TmFtZSwgZnJvbSk7XG4gIH1cblxuICBwcml2YXRlIGdldE1ldGFkYXRhKG1vZHVsZU5hbWU6IHN0cmluZyk6IE1vZHVsZU1ldGFkYXRhfHVuZGVmaW5lZCB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMubWV0YWRhdGFDYWNoZS5nZXQobW9kdWxlTmFtZSk7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIGlmIChtb2R1bGVOYW1lLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgICAgICBjb25zdCBmdWxsTW9kdWxlTmFtZSA9IHJlc29sdmVNb2R1bGUobW9kdWxlTmFtZSwgdGhpcy5yb290KTtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5ob3N0LmdldE1ldGFkYXRhRm9yKGZ1bGxNb2R1bGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0YWRhdGFDYWNoZS5zZXQobW9kdWxlTmFtZSwgcmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgZXhwb3J0QWxsKG1vZHVsZU5hbWU6IHN0cmluZyk6IFN5bWJvbFtdIHtcbiAgICBjb25zdCBtb2R1bGUgPSB0aGlzLmdldE1ldGFkYXRhKG1vZHVsZU5hbWUpO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLmV4cG9ydHMuZ2V0KG1vZHVsZU5hbWUpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQgPSBbXTtcblxuICAgIGNvbnN0IGV4cG9ydFN5bWJvbCA9IChleHBvcnRlZFN5bWJvbDogU3ltYm9sLCBleHBvcnRBczogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLnN5bWJvbE9mKG1vZHVsZU5hbWUsIGV4cG9ydEFzKTtcbiAgICAgIHJlc3VsdCAhLnB1c2goc3ltYm9sKTtcbiAgICAgIGV4cG9ydGVkU3ltYm9sLnJlZXhwb3J0ZWRBcyA9IHN5bWJvbDtcbiAgICAgIHN5bWJvbC5leHBvcnRzID0gZXhwb3J0ZWRTeW1ib2w7XG4gICAgfTtcblxuICAgIC8vIEV4cG9ydCBhbGwgdGhlIHN5bWJvbHMgZGVmaW5lZCBpbiB0aGlzIG1vZHVsZS5cbiAgICBpZiAobW9kdWxlICYmIG1vZHVsZS5tZXRhZGF0YSkge1xuICAgICAgZm9yIChsZXQga2V5IGluIG1vZHVsZS5tZXRhZGF0YSkge1xuICAgICAgICBjb25zdCBkYXRhID0gbW9kdWxlLm1ldGFkYXRhW2tleV07XG4gICAgICAgIGlmIChpc01ldGFkYXRhSW1wb3J0ZWRTeW1ib2xSZWZlcmVuY2VFeHByZXNzaW9uKGRhdGEpKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBhIHJlLWV4cG9ydCBvZiBhbiBpbXBvcnRlZCBzeW1ib2wuIFJlY29yZCB0aGlzIGFzIGEgcmUtZXhwb3J0LlxuICAgICAgICAgIGNvbnN0IGV4cG9ydEZyb20gPSByZXNvbHZlTW9kdWxlKGRhdGEubW9kdWxlLCBtb2R1bGVOYW1lKTtcbiAgICAgICAgICB0aGlzLmV4cG9ydEFsbChleHBvcnRGcm9tKTtcbiAgICAgICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLnN5bWJvbE9mKGV4cG9ydEZyb20sIGRhdGEubmFtZSk7XG4gICAgICAgICAgZXhwb3J0U3ltYm9sKHN5bWJvbCwga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBSZWNvcmQgdGhhdCB0aGlzIHN5bWJvbCBpcyBleHBvcnRlZCBieSB0aGlzIG1vZHVsZS5cbiAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnN5bWJvbE9mKG1vZHVsZU5hbWUsIGtleSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXhwb3J0IGFsbCB0aGUgcmUtZXhwb3J0cyBmcm9tIHRoaXMgbW9kdWxlXG4gICAgaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgZm9yIChjb25zdCBleHBvcnREZWNsYXJhdGlvbiBvZiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBjb25zdCBleHBvcnRGcm9tID0gcmVzb2x2ZU1vZHVsZShleHBvcnREZWNsYXJhdGlvbi5mcm9tLCBtb2R1bGVOYW1lKTtcbiAgICAgICAgLy8gUmVjb3JkIGFsbCB0aGUgZXhwb3J0cyBmcm9tIHRoZSBtb2R1bGUgZXZlbiBpZiB3ZSBkb24ndCB1c2UgaXQgZGlyZWN0bHkuXG4gICAgICAgIGNvbnN0IGV4cG9ydGVkU3ltYm9scyA9IHRoaXMuZXhwb3J0QWxsKGV4cG9ydEZyb20pO1xuICAgICAgICBpZiAoZXhwb3J0RGVjbGFyYXRpb24uZXhwb3J0KSB7XG4gICAgICAgICAgLy8gUmUtZXhwb3J0IGFsbCB0aGUgbmFtZWQgZXhwb3J0cyBmcm9tIGEgbW9kdWxlLlxuICAgICAgICAgIGZvciAoY29uc3QgZXhwb3J0SXRlbSBvZiBleHBvcnREZWNsYXJhdGlvbi5leHBvcnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0eXBlb2YgZXhwb3J0SXRlbSA9PSAnc3RyaW5nJyA/IGV4cG9ydEl0ZW0gOiBleHBvcnRJdGVtLm5hbWU7XG4gICAgICAgICAgICBjb25zdCBleHBvcnRBcyA9IHR5cGVvZiBleHBvcnRJdGVtID09ICdzdHJpbmcnID8gZXhwb3J0SXRlbSA6IGV4cG9ydEl0ZW0uYXM7XG4gICAgICAgICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLnN5bWJvbE9mKGV4cG9ydEZyb20sIG5hbWUpO1xuICAgICAgICAgICAgaWYgKGV4cG9ydGVkU3ltYm9scyAmJiBleHBvcnRlZFN5bWJvbHMubGVuZ3RoID09IDEgJiYgZXhwb3J0ZWRTeW1ib2xzWzBdLnJlZXhwb3J0ICYmXG4gICAgICAgICAgICAgICAgZXhwb3J0ZWRTeW1ib2xzWzBdLm5hbWUgPT0gJyonKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBuYW1lZCBleHBvcnQgZnJvbSBhIG1vZHVsZSB3ZSBoYXZlIG5vIG1ldGFkYXRhIGFib3V0LiBSZWNvcmQgdGhlIG5hbWVkXG4gICAgICAgICAgICAgIC8vIGV4cG9ydCBhcyBhIHJlLWV4cG9ydC5cbiAgICAgICAgICAgICAgc3ltYm9sLnJlZXhwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cG9ydFN5bWJvbCh0aGlzLnN5bWJvbE9mKGV4cG9ydEZyb20sIG5hbWUpLCBleHBvcnRBcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlLWV4cG9ydCBhbGwgdGhlIHN5bWJvbHMgZnJvbSB0aGUgbW9kdWxlXG4gICAgICAgICAgY29uc3QgZXhwb3J0ZWRTeW1ib2xzID0gdGhpcy5leHBvcnRBbGwoZXhwb3J0RnJvbSk7XG4gICAgICAgICAgZm9yIChjb25zdCBleHBvcnRlZFN5bWJvbCBvZiBleHBvcnRlZFN5bWJvbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBleHBvcnRlZFN5bWJvbC5uYW1lO1xuICAgICAgICAgICAgZXhwb3J0U3ltYm9sKGV4cG9ydGVkU3ltYm9sLCBuYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIW1vZHVsZSkge1xuICAgICAgLy8gSWYgbm8gbWV0YWRhdGEgaXMgZm91bmQgZm9yIHRoaXMgaW1wb3J0IHRoZW4gaXQgaXMgY29uc2lkZXJlZCBleHRlcm5hbCB0byB0aGVcbiAgICAgIC8vIGxpYnJhcnkgYW5kIHNob3VsZCBiZSByZWNvcmRlZCBhcyBhIHJlLWV4cG9ydCBpbiB0aGUgZmluYWwgbWV0YWRhdGEgaWYgaXQgaXNcbiAgICAgIC8vIGV2ZW50dWFsbHkgcmUtZXhwb3J0ZWQuXG4gICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLnN5bWJvbE9mKG1vZHVsZU5hbWUsICcqJyk7XG4gICAgICBzeW1ib2wucmVleHBvcnQgPSB0cnVlO1xuICAgICAgcmVzdWx0LnB1c2goc3ltYm9sKTtcbiAgICB9XG4gICAgdGhpcy5leHBvcnRzLnNldChtb2R1bGVOYW1lLCByZXN1bHQpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWxsIGluIHRoZSBjYW5vbmljYWxTeW1ib2wgd2hpY2ggaXMgdGhlIHN5bWJvbCB0aGF0IHNob3VsZCBiZSBpbXBvcnRlZCBieSBmYWN0b3JpZXMuXG4gICAqIFRoZSBjYW5vbmljYWwgc3ltYm9sIGlzIHRoZSBvbmUgZXhwb3J0ZWQgYnkgdGhlIGluZGV4IGZpbGUgZm9yIHRoZSBidW5kbGUgb3IgZGVmaW5pdGlvblxuICAgKiBzeW1ib2wgZm9yIHByaXZhdGUgc3ltYm9scyB0aGF0IGFyZSBub3QgZXhwb3J0ZWQgYnkgYnVuZGxlIGluZGV4LlxuICAgKi9cbiAgcHJpdmF0ZSBjYW5vbmljYWxpemVTeW1ib2xzKGV4cG9ydGVkU3ltYm9sczogU3ltYm9sW10pIHtcbiAgICBjb25zdCBzeW1ib2xzID0gQXJyYXkuZnJvbSh0aGlzLnN5bWJvbE1hcC52YWx1ZXMoKSk7XG4gICAgdGhpcy5leHBvcnRlZCA9IG5ldyBTZXQoZXhwb3J0ZWRTeW1ib2xzKTtcbiAgICBzeW1ib2xzLmZvckVhY2godGhpcy5jYW5vbmljYWxpemVTeW1ib2wsIHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5vbmljYWxpemVTeW1ib2woc3ltYm9sOiBTeW1ib2wpIHtcbiAgICBjb25zdCByb290RXhwb3J0ID0gZ2V0Um9vdEV4cG9ydChzeW1ib2wpO1xuICAgIGNvbnN0IGRlY2xhcmF0aW9uID0gZ2V0U3ltYm9sRGVjbGFyYXRpb24oc3ltYm9sKTtcbiAgICBjb25zdCBpc1ByaXZhdGUgPSAhdGhpcy5leHBvcnRlZC5oYXMocm9vdEV4cG9ydCk7XG4gICAgY29uc3QgY2Fub25pY2FsU3ltYm9sID0gaXNQcml2YXRlID8gZGVjbGFyYXRpb24gOiByb290RXhwb3J0O1xuICAgIHN5bWJvbC5pc1ByaXZhdGUgPSBpc1ByaXZhdGU7XG4gICAgc3ltYm9sLmRlY2xhcmF0aW9uID0gZGVjbGFyYXRpb247XG4gICAgc3ltYm9sLmNhbm9uaWNhbFN5bWJvbCA9IGNhbm9uaWNhbFN5bWJvbDtcbiAgICBzeW1ib2wucmVleHBvcnQgPSBkZWNsYXJhdGlvbi5yZWV4cG9ydDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RW50cmllcyhleHBvcnRlZFN5bWJvbHM6IFN5bWJvbFtdKTogQnVuZGxlRW50cmllcyB7XG4gICAgY29uc3QgcmVzdWx0OiBCdW5kbGVFbnRyaWVzID0ge307XG5cbiAgICBjb25zdCBleHBvcnRlZE5hbWVzID0gbmV3IFNldChleHBvcnRlZFN5bWJvbHMubWFwKHMgPT4gcy5uYW1lKSk7XG4gICAgbGV0IHByaXZhdGVOYW1lID0gMDtcblxuICAgIGZ1bmN0aW9uIG5ld1ByaXZhdGVOYW1lKHByZWZpeDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBkaWdpdHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGxldCBpbmRleCA9IHByaXZhdGVOYW1lKys7XG4gICAgICAgIGxldCBiYXNlID0gUFJJVkFURV9OQU1FX0NIQVJTO1xuICAgICAgICB3aGlsZSAoIWRpZ2l0cy5sZW5ndGggfHwgaW5kZXggPiAwKSB7XG4gICAgICAgICAgZGlnaXRzLnVuc2hpZnQoYmFzZVtpbmRleCAlIGJhc2UubGVuZ3RoXSk7XG4gICAgICAgICAgaW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gYmFzZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGBcXHUwMjc1JHtwcmVmaXh9JHtkaWdpdHMuam9pbignJyl9YDtcbiAgICAgICAgaWYgKCFleHBvcnRlZE5hbWVzLmhhcyhyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydGVkU3ltYm9scy5mb3JFYWNoKHN5bWJvbCA9PiB0aGlzLmNvbnZlcnRTeW1ib2woc3ltYm9sKSk7XG5cbiAgICBjb25zdCBzeW1ib2xzTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICAgIEFycmF5LmZyb20odGhpcy5zeW1ib2xNYXAudmFsdWVzKCkpLmZvckVhY2goc3ltYm9sID0+IHtcbiAgICAgIGlmIChzeW1ib2wucmVmZXJlbmNlZCAmJiAhc3ltYm9sLnJlZXhwb3J0KSB7XG4gICAgICAgIGxldCBuYW1lID0gc3ltYm9sLm5hbWU7XG4gICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBgJHtzeW1ib2wuZGVjbGFyYXRpb24hLm1vZHVsZX06JHtzeW1ib2wuZGVjbGFyYXRpb24gIS5uYW1lfWA7XG4gICAgICAgIGlmIChzeW1ib2wuaXNQcml2YXRlICYmICFzeW1ib2wucHJpdmF0ZU5hbWUpIHtcbiAgICAgICAgICBuYW1lID0gbmV3UHJpdmF0ZU5hbWUodGhpcy5wcml2YXRlU3ltYm9sUHJlZml4KTtcbiAgICAgICAgICBzeW1ib2wucHJpdmF0ZU5hbWUgPSBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzeW1ib2xzTWFwLmhhcyhpZGVudGlmaWVyKSkge1xuICAgICAgICAgIGNvbnN0IG5hbWVzID0gc3ltYm9sc01hcC5nZXQoaWRlbnRpZmllcik7XG4gICAgICAgICAgbmFtZXMgIS5wdXNoKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN5bWJvbHNNYXAuc2V0KGlkZW50aWZpZXIsIFtuYW1lXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0W25hbWVdID0gc3ltYm9sLnZhbHVlICE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBmb3IgZHVwbGljYXRlZCBlbnRyaWVzXG4gICAgc3ltYm9sc01hcC5mb3JFYWNoKChuYW1lczogc3RyaW5nW10sIGlkZW50aWZpZXI6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKG5hbWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3QgW21vZHVsZSwgZGVjbGFyZWROYW1lXSA9IGlkZW50aWZpZXIuc3BsaXQoJzonKTtcbiAgICAgICAgLy8gcHJlZmVyIHRoZSBleHBvcnQgdGhhdCB1c2VzIHRoZSBkZWNsYXJlZCBuYW1lIChpZiBhbnkpXG4gICAgICAgIGxldCByZWZlcmVuY2UgPSBuYW1lcy5pbmRleE9mKGRlY2xhcmVkTmFtZSk7XG4gICAgICAgIGlmIChyZWZlcmVuY2UgPT09IC0xKSB7XG4gICAgICAgICAgcmVmZXJlbmNlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGtlZXAgb25lIGVudHJ5IGFuZCByZXBsYWNlIHRoZSBvdGhlcnMgYnkgcmVmZXJlbmNlc1xuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lOiBzdHJpbmcsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGlmIChpICE9PSByZWZlcmVuY2UpIHtcbiAgICAgICAgICAgIHJlc3VsdFtuYW1lXSA9IHtfX3N5bWJvbGljOiAncmVmZXJlbmNlJywgbmFtZTogbmFtZXNbcmVmZXJlbmNlXX07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGdldFJlRXhwb3J0cyhleHBvcnRlZFN5bWJvbHM6IFN5bWJvbFtdKTogTW9kdWxlRXhwb3J0TWV0YWRhdGFbXSB7XG4gICAgdHlwZSBFeHBvcnRDbGF1c2UgPSB7bmFtZTogc3RyaW5nLCBhczogc3RyaW5nfVtdO1xuICAgIGNvbnN0IG1vZHVsZXMgPSBuZXcgTWFwPHN0cmluZywgRXhwb3J0Q2xhdXNlPigpO1xuICAgIGNvbnN0IGV4cG9ydEFsbHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBmb3IgKGNvbnN0IHN5bWJvbCBvZiBleHBvcnRlZFN5bWJvbHMpIHtcbiAgICAgIGlmIChzeW1ib2wucmVleHBvcnQpIHtcbiAgICAgICAgLy8gc3ltYm9sLmRlY2xhcmF0aW9uIGlzIGd1YXJhbnRlZWQgdG8gYmUgZGVmaW5lZCBkdXJpbmcgdGhlIHBoYXNlIHRoaXMgbWV0aG9kIGlzIGNhbGxlZC5cbiAgICAgICAgY29uc3QgZGVjbGFyYXRpb24gPSBzeW1ib2wuZGVjbGFyYXRpb24gITtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gZGVjbGFyYXRpb24ubW9kdWxlO1xuICAgICAgICBpZiAoZGVjbGFyYXRpb24gIS5uYW1lID09ICcqJykge1xuICAgICAgICAgIC8vIFJlZXhwb3J0IGFsbCB0aGUgc3ltYm9scy5cbiAgICAgICAgICBleHBvcnRBbGxzLmFkZChkZWNsYXJhdGlvbi5tb2R1bGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlLWV4cG9ydCB0aGUgc3ltYm9sIGFzIHRoZSBleHBvcnRlZCBuYW1lLlxuICAgICAgICAgIGxldCBlbnRyeSA9IG1vZHVsZXMuZ2V0KG1vZHVsZSk7XG4gICAgICAgICAgaWYgKCFlbnRyeSkge1xuICAgICAgICAgICAgZW50cnkgPSBbXTtcbiAgICAgICAgICAgIG1vZHVsZXMuc2V0KG1vZHVsZSwgZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBhcyA9IHN5bWJvbC5uYW1lO1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBkZWNsYXJhdGlvbi5uYW1lO1xuICAgICAgICAgIGVudHJ5LnB1c2goe25hbWUsIGFzfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLkFycmF5LmZyb20oZXhwb3J0QWxscy52YWx1ZXMoKSkubWFwKGZyb20gPT4gKHtmcm9tfSkpLFxuICAgICAgLi4uQXJyYXkuZnJvbShtb2R1bGVzLmVudHJpZXMoKSkubWFwKChbZnJvbSwgZXhwb3J0c10pID0+ICh7ZXhwb3J0OiBleHBvcnRzLCBmcm9tfSkpXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFN5bWJvbChzeW1ib2w6IFN5bWJvbCkge1xuICAgIC8vIGNhbm9uaWNhbFN5bWJvbCBpcyBlbnN1cmVkIHRvIGJlIGRlZmluZWQgYmVmb3JlIHRoaXMgaXMgY2FsbGVkLlxuICAgIGNvbnN0IGNhbm9uaWNhbFN5bWJvbCA9IHN5bWJvbC5jYW5vbmljYWxTeW1ib2wgITtcblxuICAgIGlmICghY2Fub25pY2FsU3ltYm9sLnJlZmVyZW5jZWQpIHtcbiAgICAgIGNhbm9uaWNhbFN5bWJvbC5yZWZlcmVuY2VkID0gdHJ1ZTtcbiAgICAgIC8vIGRlY2xhcmF0aW9uIGlzIGVuc3VyZWQgdG8gYmUgZGVmaW5kZWQgYmVmb3JlIHRoaXMgbWV0aG9kIGlzIGNhbGxlZC5cbiAgICAgIGNvbnN0IGRlY2xhcmF0aW9uID0gY2Fub25pY2FsU3ltYm9sLmRlY2xhcmF0aW9uICE7XG4gICAgICBjb25zdCBtb2R1bGUgPSB0aGlzLmdldE1ldGFkYXRhKGRlY2xhcmF0aW9uLm1vZHVsZSk7XG4gICAgICBpZiAobW9kdWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gbW9kdWxlLm1ldGFkYXRhW2RlY2xhcmF0aW9uLm5hbWVdO1xuICAgICAgICBpZiAodmFsdWUgJiYgIWRlY2xhcmF0aW9uLm5hbWUuc3RhcnRzV2l0aCgnX19fJykpIHtcbiAgICAgICAgICBjYW5vbmljYWxTeW1ib2wudmFsdWUgPSB0aGlzLmNvbnZlcnRFbnRyeShkZWNsYXJhdGlvbi5tb2R1bGUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29udmVydEVudHJ5KG1vZHVsZU5hbWU6IHN0cmluZywgdmFsdWU6IE1ldGFkYXRhRW50cnkpOiBNZXRhZGF0YUVudHJ5IHtcbiAgICBpZiAoaXNDbGFzc01ldGFkYXRhKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udmVydENsYXNzKG1vZHVsZU5hbWUsIHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGlzRnVuY3Rpb25NZXRhZGF0YSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRGdW5jdGlvbihtb2R1bGVOYW1lLCB2YWx1ZSk7XG4gICAgfVxuICAgIGlmIChpc0ludGVyZmFjZU1ldGFkYXRhKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0VmFsdWUobW9kdWxlTmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0Q2xhc3MobW9kdWxlTmFtZTogc3RyaW5nLCB2YWx1ZTogQ2xhc3NNZXRhZGF0YSk6IENsYXNzTWV0YWRhdGEge1xuICAgIHJldHVybiB7XG4gICAgICBfX3N5bWJvbGljOiAnY2xhc3MnLFxuICAgICAgYXJpdHk6IHZhbHVlLmFyaXR5LFxuICAgICAgZXh0ZW5kczogdGhpcy5jb252ZXJ0RXhwcmVzc2lvbihtb2R1bGVOYW1lLCB2YWx1ZS5leHRlbmRzKSAhLFxuICAgICAgZGVjb3JhdG9yczpcbiAgICAgICAgICB2YWx1ZS5kZWNvcmF0b3JzICYmIHZhbHVlLmRlY29yYXRvcnMubWFwKGQgPT4gdGhpcy5jb252ZXJ0RXhwcmVzc2lvbihtb2R1bGVOYW1lLCBkKSAhKSxcbiAgICAgIG1lbWJlcnM6IHRoaXMuY29udmVydE1lbWJlcnMobW9kdWxlTmFtZSwgdmFsdWUubWVtYmVycyAhKSxcbiAgICAgIHN0YXRpY3M6IHZhbHVlLnN0YXRpY3MgJiYgdGhpcy5jb252ZXJ0U3RhdGljcyhtb2R1bGVOYW1lLCB2YWx1ZS5zdGF0aWNzKVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRNZW1iZXJzKG1vZHVsZU5hbWU6IHN0cmluZywgbWVtYmVyczogTWV0YWRhdGFNYXApOiBNZXRhZGF0YU1hcCB7XG4gICAgY29uc3QgcmVzdWx0OiBNZXRhZGF0YU1hcCA9IHt9O1xuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtZW1iZXJzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG1lbWJlcnNbbmFtZV07XG4gICAgICByZXN1bHRbbmFtZV0gPSB2YWx1ZS5tYXAodiA9PiB0aGlzLmNvbnZlcnRNZW1iZXIobW9kdWxlTmFtZSwgdikpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0TWVtYmVyKG1vZHVsZU5hbWU6IHN0cmluZywgbWVtYmVyOiBNZW1iZXJNZXRhZGF0YSkge1xuICAgIGNvbnN0IHJlc3VsdDogTWVtYmVyTWV0YWRhdGEgPSB7X19zeW1ib2xpYzogbWVtYmVyLl9fc3ltYm9saWN9O1xuICAgIHJlc3VsdC5kZWNvcmF0b3JzID1cbiAgICAgICAgbWVtYmVyLmRlY29yYXRvcnMgJiYgbWVtYmVyLmRlY29yYXRvcnMubWFwKGQgPT4gdGhpcy5jb252ZXJ0RXhwcmVzc2lvbihtb2R1bGVOYW1lLCBkKSAhKTtcbiAgICBpZiAoaXNNZXRob2RNZXRhZGF0YShtZW1iZXIpKSB7XG4gICAgICAocmVzdWx0IGFzIE1ldGhvZE1ldGFkYXRhKS5wYXJhbWV0ZXJEZWNvcmF0b3JzID0gbWVtYmVyLnBhcmFtZXRlckRlY29yYXRvcnMgJiZcbiAgICAgICAgICBtZW1iZXIucGFyYW1ldGVyRGVjb3JhdG9ycy5tYXAoXG4gICAgICAgICAgICAgIGQgPT4gZCAmJiBkLm1hcChwID0+IHRoaXMuY29udmVydEV4cHJlc3Npb24obW9kdWxlTmFtZSwgcCkgISkpO1xuICAgICAgaWYgKGlzQ29uc3RydWN0b3JNZXRhZGF0YShtZW1iZXIpKSB7XG4gICAgICAgIGlmIChtZW1iZXIucGFyYW1ldGVycykge1xuICAgICAgICAgIChyZXN1bHQgYXMgQ29uc3RydWN0b3JNZXRhZGF0YSkucGFyYW1ldGVycyA9XG4gICAgICAgICAgICAgIG1lbWJlci5wYXJhbWV0ZXJzLm1hcChwID0+IHRoaXMuY29udmVydEV4cHJlc3Npb24obW9kdWxlTmFtZSwgcCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRTdGF0aWNzKG1vZHVsZU5hbWU6IHN0cmluZywgc3RhdGljczogU3RhdGljc01ldGFkYXRhKTogU3RhdGljc01ldGFkYXRhIHtcbiAgICBsZXQgcmVzdWx0OiBTdGF0aWNzTWV0YWRhdGEgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzdGF0aWNzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHN0YXRpY3Nba2V5XTtcbiAgICAgIHJlc3VsdFtrZXldID0gaXNGdW5jdGlvbk1ldGFkYXRhKHZhbHVlKSA/IHRoaXMuY29udmVydEZ1bmN0aW9uKG1vZHVsZU5hbWUsIHZhbHVlKSA6IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RnVuY3Rpb24obW9kdWxlTmFtZTogc3RyaW5nLCB2YWx1ZTogRnVuY3Rpb25NZXRhZGF0YSk6IEZ1bmN0aW9uTWV0YWRhdGEge1xuICAgIHJldHVybiB7XG4gICAgICBfX3N5bWJvbGljOiAnZnVuY3Rpb24nLFxuICAgICAgcGFyYW1ldGVyczogdmFsdWUucGFyYW1ldGVycyxcbiAgICAgIGRlZmF1bHRzOiB2YWx1ZS5kZWZhdWx0cyAmJiB2YWx1ZS5kZWZhdWx0cy5tYXAodiA9PiB0aGlzLmNvbnZlcnRWYWx1ZShtb2R1bGVOYW1lLCB2KSksXG4gICAgICB2YWx1ZTogdGhpcy5jb252ZXJ0VmFsdWUobW9kdWxlTmFtZSwgdmFsdWUudmFsdWUpXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFZhbHVlKG1vZHVsZU5hbWU6IHN0cmluZywgdmFsdWU6IE1ldGFkYXRhVmFsdWUpOiBNZXRhZGF0YVZhbHVlIHtcbiAgICBpZiAoaXNQcmltaXRpdmUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChpc01ldGFkYXRhRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb252ZXJ0RXJyb3IobW9kdWxlTmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgICBpZiAoaXNNZXRhZGF0YVN5bWJvbGljRXhwcmVzc2lvbih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRFeHByZXNzaW9uKG1vZHVsZU5hbWUsIHZhbHVlKSAhO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5tYXAodiA9PiB0aGlzLmNvbnZlcnRWYWx1ZShtb2R1bGVOYW1lLCB2KSk7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlIGl0IGlzIGEgbWV0YWRhdGEgb2JqZWN0LlxuICAgIGNvbnN0IG9iamVjdCA9IHZhbHVlIGFzIE1ldGFkYXRhT2JqZWN0O1xuICAgIGNvbnN0IHJlc3VsdDogTWV0YWRhdGFPYmplY3QgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5jb252ZXJ0VmFsdWUobW9kdWxlTmFtZSwgb2JqZWN0W2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RXhwcmVzc2lvbihcbiAgICAgIG1vZHVsZU5hbWU6IHN0cmluZywgdmFsdWU6IE1ldGFkYXRhU3ltYm9saWNFeHByZXNzaW9ufE1ldGFkYXRhRXJyb3J8bnVsbHxcbiAgICAgIHVuZGVmaW5lZCk6IE1ldGFkYXRhU3ltYm9saWNFeHByZXNzaW9ufE1ldGFkYXRhRXJyb3J8dW5kZWZpbmVkfG51bGwge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgc3dpdGNoICh2YWx1ZS5fX3N5bWJvbGljKSB7XG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0RXJyb3IobW9kdWxlTmFtZSwgdmFsdWUgYXMgTWV0YWRhdGFFcnJvcik7XG4gICAgICAgIGNhc2UgJ3JlZmVyZW5jZSc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFJlZmVyZW5jZShtb2R1bGVOYW1lLCB2YWx1ZSBhcyBNZXRhZGF0YVN5bWJvbGljUmVmZXJlbmNlRXhwcmVzc2lvbik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydEV4cHJlc3Npb25Ob2RlKG1vZHVsZU5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RXJyb3IobW9kdWxlOiBzdHJpbmcsIHZhbHVlOiBNZXRhZGF0YUVycm9yKTogTWV0YWRhdGFFcnJvciB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9fc3ltYm9saWM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiB2YWx1ZS5tZXNzYWdlLFxuICAgICAgbGluZTogdmFsdWUubGluZSxcbiAgICAgIGNoYXJhY3RlcjogdmFsdWUuY2hhcmFjdGVyLFxuICAgICAgY29udGV4dDogdmFsdWUuY29udGV4dCwgbW9kdWxlXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFJlZmVyZW5jZShtb2R1bGVOYW1lOiBzdHJpbmcsIHZhbHVlOiBNZXRhZGF0YVN5bWJvbGljUmVmZXJlbmNlRXhwcmVzc2lvbik6XG4gICAgICBNZXRhZGF0YVN5bWJvbGljUmVmZXJlbmNlRXhwcmVzc2lvbnxNZXRhZGF0YUVycm9yfHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY3JlYXRlUmVmZXJlbmNlID0gKHN5bWJvbDogU3ltYm9sKTogTWV0YWRhdGFTeW1ib2xpY1JlZmVyZW5jZUV4cHJlc3Npb24gPT4ge1xuICAgICAgY29uc3QgZGVjbGFyYXRpb24gPSBzeW1ib2wuZGVjbGFyYXRpb24gITtcbiAgICAgIGlmIChkZWNsYXJhdGlvbi5tb2R1bGUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZSB0byBhIHN5bWJvbCBkZWZpbmVkIGluIHRoZSBtb2R1bGUuIEVuc3VyZSBpdCBpcyBjb252ZXJ0ZWQgdGhlbiByZXR1cm4gYVxuICAgICAgICAvLyByZWZlcmVuY2VzIHRvIHRoZSBmaW5hbCBzeW1ib2wuXG4gICAgICAgIHRoaXMuY29udmVydFN5bWJvbChzeW1ib2wpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIF9fc3ltYm9saWM6ICdyZWZlcmVuY2UnLFxuICAgICAgICAgIGdldCBuYW1lKCkge1xuICAgICAgICAgICAgLy8gUmVzb2x2ZWQgbGF6aWx5IGJlY2F1c2UgcHJpdmF0ZSBuYW1lcyBhcmUgYXNzaWduZWQgbGF0ZS5cbiAgICAgICAgICAgIGNvbnN0IGNhbm9uaWNhbFN5bWJvbCA9IHN5bWJvbC5jYW5vbmljYWxTeW1ib2wgITtcbiAgICAgICAgICAgIGlmIChjYW5vbmljYWxTeW1ib2wuaXNQcml2YXRlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgc3RhdGU6IGlzUHJpdmF0ZSB3YXMgbm90IGluaXRpYWxpemVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2Fub25pY2FsU3ltYm9sLmlzUHJpdmF0ZSA/IGNhbm9uaWNhbFN5bWJvbC5wcml2YXRlTmFtZSAhIDogY2Fub25pY2FsU3ltYm9sLm5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlIHN5bWJvbCB3YXMgYSByZS1leHBvcnRlZCBzeW1ib2wgZnJvbSBhbm90aGVyIG1vZHVsZS4gUmV0dXJuIGEgcmVmZXJlbmNlIHRvIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCBpbXBvcnRlZCBzeW1ib2wuXG4gICAgICAgIHJldHVybiB7X19zeW1ib2xpYzogJ3JlZmVyZW5jZScsIG5hbWU6IGRlY2xhcmF0aW9uLm5hbWUsIG1vZHVsZTogZGVjbGFyYXRpb24ubW9kdWxlfTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGlzTWV0YWRhdGFHbG9iYWxSZWZlcmVuY2VFeHByZXNzaW9uKHZhbHVlKSkge1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLmdldE1ldGFkYXRhKG1vZHVsZU5hbWUpO1xuICAgICAgaWYgKG1ldGFkYXRhICYmIG1ldGFkYXRhLm1ldGFkYXRhICYmIG1ldGFkYXRhLm1ldGFkYXRhW3ZhbHVlLm5hbWVdKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZSB0byBhIHN5bWJvbCBkZWZpbmVkIGluIHRoZSBtb2R1bGVcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVJlZmVyZW5jZSh0aGlzLmNhbm9uaWNhbFN5bWJvbE9mKG1vZHVsZU5hbWUsIHZhbHVlLm5hbWUpKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYSByZWZlcmVuY2UgaGFzIGFyZ3VtZW50cywgdGhlIGFyZ3VtZW50cyBuZWVkIHRvIGJlIGNvbnZlcnRlZC5cbiAgICAgIGlmICh2YWx1ZS5hcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBfX3N5bWJvbGljOiAncmVmZXJlbmNlJyxcbiAgICAgICAgICBuYW1lOiB2YWx1ZS5uYW1lLFxuICAgICAgICAgIGFyZ3VtZW50czogdmFsdWUuYXJndW1lbnRzLm1hcChhID0+IHRoaXMuY29udmVydFZhbHVlKG1vZHVsZU5hbWUsIGEpKVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBHbG9iYWwgcmVmZXJlbmNlcyB3aXRob3V0IGFyZ3VtZW50cyAoc3VjaCBhcyB0byBNYXRoIG9yIEpTT04pIGFyZSB1bm1vZGlmaWVkLlxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChpc01ldGFkYXRhSW1wb3J0ZWRTeW1ib2xSZWZlcmVuY2VFeHByZXNzaW9uKHZhbHVlKSkge1xuICAgICAgLy8gUmVmZXJlbmNlcyB0byBpbXBvcnRlZCBzeW1ib2xzIGFyZSBzZXBhcmF0ZWQgaW50byB0d28sIHJlZmVyZW5jZXMgdG8gYnVuZGxlZCBtb2R1bGVzIGFuZFxuICAgICAgLy8gcmVmZXJlbmNlcyB0byBtb2R1bGVzIGV4dGVybmFsIHRvIHRoZSBidW5kbGUuIElmIHRoZSBtb2R1bGUgcmVmZXJlbmNlIGlzIHJlbGF0aXZlIGl0IGlzXG4gICAgICAvLyBhc3N1bWVkIHRvIGJlIGluIHRoZSBidW5kbGUuIElmIGl0IGlzIEdsb2JhbCBpdCBpcyBhc3N1bWVkIHRvIGJlIG91dHNpZGUgdGhlIGJ1bmRsZS5cbiAgICAgIC8vIFJlZmVyZW5jZXMgdG8gc3ltYm9scyBvdXRzaWRlIHRoZSBidW5kbGUgYXJlIGxlZnQgdW5tb2RpZmllZC4gUmVmZXJlbmNlcyB0byBzeW1ib2wgaW5zaWRlXG4gICAgICAvLyB0aGUgYnVuZGxlIG5lZWQgdG8gYmUgY29udmVydGVkIHRvIGEgYnVuZGxlIGltcG9ydCByZWZlcmVuY2UgcmVhY2hhYmxlIGZyb20gdGhlIGJ1bmRsZVxuICAgICAgLy8gaW5kZXguXG5cbiAgICAgIGlmICh2YWx1ZS5tb2R1bGUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZSBpcyB0byBhIHN5bWJvbCBkZWZpbmVkIGluc2lkZSB0aGUgbW9kdWxlLiBDb252ZXJ0IHRoZSByZWZlcmVuY2UgdG8gYSByZWZlcmVuY2VcbiAgICAgICAgLy8gdG8gdGhlIGNhbm9uaWNhbCBzeW1ib2wuXG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZWRNb2R1bGUgPSByZXNvbHZlTW9kdWxlKHZhbHVlLm1vZHVsZSwgbW9kdWxlTmFtZSk7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZWROYW1lID0gdmFsdWUubmFtZTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVJlZmVyZW5jZSh0aGlzLmNhbm9uaWNhbFN5bWJvbE9mKHJlZmVyZW5jZWRNb2R1bGUsIHJlZmVyZW5jZWROYW1lKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFZhbHVlIGlzIGEgcmVmZXJlbmNlIHRvIGEgc3ltYm9sIGRlZmluZWQgb3V0c2lkZSB0aGUgbW9kdWxlLlxuICAgICAgaWYgKHZhbHVlLmFyZ3VtZW50cykge1xuICAgICAgICAvLyBJZiBhIHJlZmVyZW5jZSBoYXMgYXJndW1lbnRzIHRoZSBhcmd1bWVudHMgbmVlZCB0byBiZSBjb252ZXJ0ZWQuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgX19zeW1ib2xpYzogJ3JlZmVyZW5jZScsXG4gICAgICAgICAgbmFtZTogdmFsdWUubmFtZSxcbiAgICAgICAgICBtb2R1bGU6IHZhbHVlLm1vZHVsZSxcbiAgICAgICAgICBhcmd1bWVudHM6IHZhbHVlLmFyZ3VtZW50cy5tYXAoYSA9PiB0aGlzLmNvbnZlcnRWYWx1ZShtb2R1bGVOYW1lLCBhKSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNNZXRhZGF0YU1vZHVsZVJlZmVyZW5jZUV4cHJlc3Npb24odmFsdWUpKSB7XG4gICAgICAvLyBDYW5ub3Qgc3VwcG9ydCByZWZlcmVuY2VzIHRvIGJ1bmRsZWQgbW9kdWxlcyBhcyB0aGUgaW50ZXJuYWwgbW9kdWxlcyBvZiBhIGJ1bmRsZSBhcmUgZXJhc2VkXG4gICAgICAvLyBieSB0aGUgYnVuZGxlci5cbiAgICAgIGlmICh2YWx1ZS5tb2R1bGUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgX19zeW1ib2xpYzogJ2Vycm9yJyxcbiAgICAgICAgICBtZXNzYWdlOiAnVW5zdXBwb3J0ZWQgYnVuZGxlZCBtb2R1bGUgcmVmZXJlbmNlJyxcbiAgICAgICAgICBjb250ZXh0OiB7bW9kdWxlOiB2YWx1ZS5tb2R1bGV9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIFJlZmVyZW5jZXMgdG8gdW5idW5kbGVkIG1vZHVsZXMgYXJlIHVubW9kaWZpZWQuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RXhwcmVzc2lvbk5vZGUobW9kdWxlTmFtZTogc3RyaW5nLCB2YWx1ZTogTWV0YWRhdGFTeW1ib2xpY0V4cHJlc3Npb24pOlxuICAgICAgTWV0YWRhdGFTeW1ib2xpY0V4cHJlc3Npb24ge1xuICAgIGNvbnN0IHJlc3VsdDogTWV0YWRhdGFTeW1ib2xpY0V4cHJlc3Npb24gPSB7IF9fc3ltYm9saWM6IHZhbHVlLl9fc3ltYm9saWMgfSBhcyBhbnk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdmFsdWUpIHtcbiAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0gdGhpcy5jb252ZXJ0VmFsdWUobW9kdWxlTmFtZSwgKHZhbHVlIGFzIGFueSlba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHN5bWJvbE9mKG1vZHVsZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBTeW1ib2wge1xuICAgIGNvbnN0IHN5bWJvbEtleSA9IGAke21vZHVsZX06JHtuYW1lfWA7XG4gICAgbGV0IHN5bWJvbCA9IHRoaXMuc3ltYm9sTWFwLmdldChzeW1ib2xLZXkpO1xuICAgIGlmICghc3ltYm9sKSB7XG4gICAgICBzeW1ib2wgPSB7bW9kdWxlLCBuYW1lfTtcbiAgICAgIHRoaXMuc3ltYm9sTWFwLnNldChzeW1ib2xLZXksIHN5bWJvbCk7XG4gICAgfVxuICAgIHJldHVybiBzeW1ib2w7XG4gIH1cblxuICBwcml2YXRlIGNhbm9uaWNhbFN5bWJvbE9mKG1vZHVsZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBTeW1ib2wge1xuICAgIC8vIEVuc3VyZSB0aGUgbW9kdWxlIGhhcyBiZWVuIHNlZW4uXG4gICAgdGhpcy5leHBvcnRBbGwobW9kdWxlKTtcbiAgICBjb25zdCBzeW1ib2wgPSB0aGlzLnN5bWJvbE9mKG1vZHVsZSwgbmFtZSk7XG4gICAgaWYgKCFzeW1ib2wuY2Fub25pY2FsU3ltYm9sKSB7XG4gICAgICB0aGlzLmNhbm9uaWNhbGl6ZVN5bWJvbChzeW1ib2wpO1xuICAgIH1cbiAgICByZXR1cm4gc3ltYm9sO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlckhvc3RBZGFwdGVyIGltcGxlbWVudHMgTWV0YWRhdGFCdW5kbGVySG9zdCB7XG4gIHByaXZhdGUgY29sbGVjdG9yID0gbmV3IE1ldGFkYXRhQ29sbGVjdG9yKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBob3N0OiB0cy5Db21waWxlckhvc3QpIHt9XG5cbiAgZ2V0TWV0YWRhdGFGb3IoZmlsZU5hbWU6IHN0cmluZyk6IE1vZHVsZU1ldGFkYXRhfHVuZGVmaW5lZCB7XG4gICAgaWYgKCF0aGlzLmhvc3QuZmlsZUV4aXN0cyhmaWxlTmFtZSArICcudHMnKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBzb3VyY2VGaWxlID0gdGhpcy5ob3N0LmdldFNvdXJjZUZpbGUoZmlsZU5hbWUgKyAnLnRzJywgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCk7XG4gICAgcmV0dXJuIHNvdXJjZUZpbGUgJiYgdGhpcy5jb2xsZWN0b3IuZ2V0TWV0YWRhdGEoc291cmNlRmlsZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZU1vZHVsZShpbXBvcnROYW1lOiBzdHJpbmcsIGZyb206IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChpbXBvcnROYW1lLnN0YXJ0c1dpdGgoJy4nKSAmJiBmcm9tKSB7XG4gICAgbGV0IG5vcm1hbFBhdGggPSBwYXRoLm5vcm1hbGl6ZShwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKGZyb20pLCBpbXBvcnROYW1lKSk7XG4gICAgaWYgKCFub3JtYWxQYXRoLnN0YXJ0c1dpdGgoJy4nKSAmJiBmcm9tLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgICAgLy8gcGF0aC5ub3JtYWxpemUoKSBwcmVzZXJ2ZXMgbGVhZGluZyAnLi4vJyBidXQgbm90ICcuLycuIFRoaXMgYWRkcyBpdCBiYWNrLlxuICAgICAgbm9ybWFsUGF0aCA9IGAuJHtwYXRoLnNlcH0ke25vcm1hbFBhdGh9YDtcbiAgICB9XG4gICAgLy8gUmVwbGFjZSB3aW5kb3dzIHBhdGggZGVsaW1pdGVycyB3aXRoIGZvcndhcmQtc2xhc2hlcy4gT3RoZXJ3aXNlIHRoZSBwYXRocyBhcmUgbm90XG4gICAgLy8gVHlwZVNjcmlwdCBjb21wYXRpYmxlIHdoZW4gYnVpbGRpbmcgdGhlIGJ1bmRsZS5cbiAgICByZXR1cm4gbm9ybWFsUGF0aC5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gIH1cbiAgcmV0dXJuIGltcG9ydE5hbWU7XG59XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKG86IGFueSk6IG8gaXMgYm9vbGVhbnxzdHJpbmd8bnVtYmVyIHtcbiAgcmV0dXJuIG8gPT09IG51bGwgfHwgKHR5cGVvZiBvICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvICE9PSAnb2JqZWN0Jyk7XG59XG5cbmZ1bmN0aW9uIGdldFJvb3RFeHBvcnQoc3ltYm9sOiBTeW1ib2wpOiBTeW1ib2wge1xuICByZXR1cm4gc3ltYm9sLnJlZXhwb3J0ZWRBcyA/IGdldFJvb3RFeHBvcnQoc3ltYm9sLnJlZXhwb3J0ZWRBcykgOiBzeW1ib2w7XG59XG5cbmZ1bmN0aW9uIGdldFN5bWJvbERlY2xhcmF0aW9uKHN5bWJvbDogU3ltYm9sKTogU3ltYm9sIHtcbiAgcmV0dXJuIHN5bWJvbC5leHBvcnRzID8gZ2V0U3ltYm9sRGVjbGFyYXRpb24oc3ltYm9sLmV4cG9ydHMpIDogc3ltYm9sO1xufVxuIl19