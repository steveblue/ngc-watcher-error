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
        define("@angular/compiler/src/core", ["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    exports.createInject = makeMetadataFactory('Inject', function (token) { return ({ token: token }); });
    exports.createInjectionToken = makeMetadataFactory('InjectionToken', function (desc) { return ({ _desc: desc, ngInjectableDef: undefined }); });
    exports.createAttribute = makeMetadataFactory('Attribute', function (attributeName) { return ({ attributeName: attributeName }); });
    exports.createContentChildren = makeMetadataFactory('ContentChildren', function (selector, data) {
        if (data === void 0) { data = {}; }
        return (tslib_1.__assign({ selector: selector, first: false, isViewQuery: false, descendants: false }, data));
    });
    exports.createContentChild = makeMetadataFactory('ContentChild', function (selector, data) {
        if (data === void 0) { data = {}; }
        return (tslib_1.__assign({ selector: selector, first: true, isViewQuery: false, descendants: true }, data));
    });
    exports.createViewChildren = makeMetadataFactory('ViewChildren', function (selector, data) {
        if (data === void 0) { data = {}; }
        return (tslib_1.__assign({ selector: selector, first: false, isViewQuery: true, descendants: true }, data));
    });
    exports.createViewChild = makeMetadataFactory('ViewChild', function (selector, data) {
        return (tslib_1.__assign({ selector: selector, first: true, isViewQuery: true, descendants: true }, data));
    });
    exports.createDirective = makeMetadataFactory('Directive', function (dir) {
        if (dir === void 0) { dir = {}; }
        return dir;
    });
    var ViewEncapsulation;
    (function (ViewEncapsulation) {
        ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
        ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
        ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    })(ViewEncapsulation = exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
    var ChangeDetectionStrategy;
    (function (ChangeDetectionStrategy) {
        ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
        ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
    })(ChangeDetectionStrategy = exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
    exports.createComponent = makeMetadataFactory('Component', function (c) {
        if (c === void 0) { c = {}; }
        return (tslib_1.__assign({ changeDetection: ChangeDetectionStrategy.Default }, c));
    });
    exports.createPipe = makeMetadataFactory('Pipe', function (p) { return (tslib_1.__assign({ pure: true }, p)); });
    exports.createInput = makeMetadataFactory('Input', function (bindingPropertyName) { return ({ bindingPropertyName: bindingPropertyName }); });
    exports.createOutput = makeMetadataFactory('Output', function (bindingPropertyName) { return ({ bindingPropertyName: bindingPropertyName }); });
    exports.createHostBinding = makeMetadataFactory('HostBinding', function (hostPropertyName) { return ({ hostPropertyName: hostPropertyName }); });
    exports.createHostListener = makeMetadataFactory('HostListener', function (eventName, args) { return ({ eventName: eventName, args: args }); });
    exports.createNgModule = makeMetadataFactory('NgModule', function (ngModule) { return ngModule; });
    exports.createInjectable = makeMetadataFactory('Injectable', function (injectable) {
        if (injectable === void 0) { injectable = {}; }
        return injectable;
    });
    exports.CUSTOM_ELEMENTS_SCHEMA = {
        name: 'custom-elements'
    };
    exports.NO_ERRORS_SCHEMA = {
        name: 'no-errors-schema'
    };
    exports.createOptional = makeMetadataFactory('Optional');
    exports.createSelf = makeMetadataFactory('Self');
    exports.createSkipSelf = makeMetadataFactory('SkipSelf');
    exports.createHost = makeMetadataFactory('Host');
    exports.Type = Function;
    var SecurityContext;
    (function (SecurityContext) {
        SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
        SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
        SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
        SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
        SecurityContext[SecurityContext["URL"] = 4] = "URL";
        SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
    })(SecurityContext = exports.SecurityContext || (exports.SecurityContext = {}));
    var MissingTranslationStrategy;
    (function (MissingTranslationStrategy) {
        MissingTranslationStrategy[MissingTranslationStrategy["Error"] = 0] = "Error";
        MissingTranslationStrategy[MissingTranslationStrategy["Warning"] = 1] = "Warning";
        MissingTranslationStrategy[MissingTranslationStrategy["Ignore"] = 2] = "Ignore";
    })(MissingTranslationStrategy = exports.MissingTranslationStrategy || (exports.MissingTranslationStrategy = {}));
    function makeMetadataFactory(name, props) {
        var factory = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var values = props ? props.apply(void 0, tslib_1.__spread(args)) : {};
            return tslib_1.__assign({ ngMetadataName: name }, values);
        };
        factory.isTypeOf = function (obj) { return obj && obj.ngMetadataName === name; };
        factory.ngMetadataName = name;
        return factory;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQVNVLFFBQUEsWUFBWSxHQUFHLG1CQUFtQixDQUFTLFFBQVEsRUFBRSxVQUFDLEtBQVUsSUFBSyxPQUFBLENBQUMsRUFBQyxLQUFLLE9BQUEsRUFBQyxDQUFDLEVBQVQsQ0FBUyxDQUFDLENBQUM7SUFDaEYsUUFBQSxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FDbkQsZ0JBQWdCLEVBQUUsVUFBQyxJQUFZLElBQUssT0FBQSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQyxDQUFDO0lBR3hFLFFBQUEsZUFBZSxHQUN4QixtQkFBbUIsQ0FBWSxXQUFXLEVBQUUsVUFBQyxhQUFzQixJQUFLLE9BQUEsQ0FBQyxFQUFDLGFBQWEsZUFBQSxFQUFDLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBVWxGLFFBQUEscUJBQXFCLEdBQUcsbUJBQW1CLENBQ3BELGlCQUFpQixFQUNqQixVQUFDLFFBQWMsRUFBRSxJQUFjO1FBQWQscUJBQUEsRUFBQSxTQUFjO1FBQzNCLE9BQUEsb0JBQUUsUUFBUSxVQUFBLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLElBQUssSUFBSSxFQUFFO0lBQTNFLENBQTJFLENBQUMsQ0FBQztJQUN4RSxRQUFBLGtCQUFrQixHQUFHLG1CQUFtQixDQUNqRCxjQUFjLEVBQUUsVUFBQyxRQUFjLEVBQUUsSUFBYztRQUFkLHFCQUFBLEVBQUEsU0FBYztRQUMzQixPQUFBLG9CQUFFLFFBQVEsVUFBQSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUss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RUFDVDtRQUNKLENBQUMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxRQUFRLEdBQUcsVUFBQyxHQUFRLElBQUssT0FBQSxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQWxDLENBQWtDLENBQUM7UUFDcEUsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBBdHRlbnRpb246XG4vLyBUaGlzIGZpbGUgZHVwbGljYXRlcyB0eXBlcyBhbmQgdmFsdWVzIGZyb20gQGFuZ3VsYXIvY29yZVxuLy8gc28gdGhhdCB3ZSBhcmUgYWJsZSB0byBtYWtlIEBhbmd1bGFyL2NvbXBpbGVyIGluZGVwZW5kZW50IG9mIEBhbmd1bGFyL2NvcmUuXG4vLyBUaGlzIGlzIGltcG9ydGFudCB0byBwcmV2ZW50IGEgYnVpbGQgY3ljbGUsIGFzIEBhbmd1bGFyL2NvcmUgbmVlZHMgdG9cbi8vIGJlIGNvbXBpbGVkIHdpdGggdGhlIGNvbXBpbGVyLlxuXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdCB7IHRva2VuOiBhbnk7IH1cbmV4cG9ydCBjb25zdCBjcmVhdGVJbmplY3QgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PEluamVjdD4oJ0luamVjdCcsICh0b2tlbjogYW55KSA9PiAoe3Rva2VufSkpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUluamVjdGlvblRva2VuID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxvYmplY3Q+KFxuICAgICdJbmplY3Rpb25Ub2tlbicsIChkZXNjOiBzdHJpbmcpID0+ICh7X2Rlc2M6IGRlc2MsIG5nSW5qZWN0YWJsZURlZjogdW5kZWZpbmVkfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF0dHJpYnV0ZSB7IGF0dHJpYnV0ZU5hbWU/OiBzdHJpbmc7IH1cbmV4cG9ydCBjb25zdCBjcmVhdGVBdHRyaWJ1dGUgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8QXR0cmlidXRlPignQXR0cmlidXRlJywgKGF0dHJpYnV0ZU5hbWU/OiBzdHJpbmcpID0+ICh7YXR0cmlidXRlTmFtZX0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeSB7XG4gIGRlc2NlbmRhbnRzOiBib29sZWFuO1xuICBmaXJzdDogYm9vbGVhbjtcbiAgcmVhZDogYW55O1xuICBpc1ZpZXdRdWVyeTogYm9vbGVhbjtcbiAgc2VsZWN0b3I6IGFueTtcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnRlbnRDaGlsZHJlbiA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8UXVlcnk+KFxuICAgICdDb250ZW50Q2hpbGRyZW4nLFxuICAgIChzZWxlY3Rvcj86IGFueSwgZGF0YTogYW55ID0ge30pID0+XG4gICAgICAgICh7c2VsZWN0b3IsIGZpcnN0OiBmYWxzZSwgaXNWaWV3UXVlcnk6IGZhbHNlLCBkZXNjZW5kYW50czogZmFsc2UsIC4uLmRhdGF9KSk7XG5leHBvcnQgY29uc3QgY3JlYXRlQ29udGVudENoaWxkID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxRdWVyeT4oXG4gICAgJ0NvbnRlbnRDaGlsZCcsIChzZWxlY3Rvcj86IGFueSwgZGF0YTogYW55ID0ge30pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogdHJ1ZSwgaXNWaWV3UXVlcnk6IGZhbHNlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVWaWV3Q2hpbGRyZW4gPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFF1ZXJ5PihcbiAgICAnVmlld0NoaWxkcmVuJywgKHNlbGVjdG9yPzogYW55LCBkYXRhOiBhbnkgPSB7fSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICh7c2VsZWN0b3IsIGZpcnN0OiBmYWxzZSwgaXNWaWV3UXVlcnk6IHRydWUsIGRlc2NlbmRhbnRzOiB0cnVlLCAuLi5kYXRhfSkpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVZpZXdDaGlsZCA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8UXVlcnk+KFxuICAgICdWaWV3Q2hpbGQnLCAoc2VsZWN0b3I6IGFueSwgZGF0YTogYW55KSA9PlxuICAgICAgICAgICAgICAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IHRydWUsIGlzVmlld1F1ZXJ5OiB0cnVlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmUge1xuICBzZWxlY3Rvcj86IHN0cmluZztcbiAgaW5wdXRzPzogc3RyaW5nW107XG4gIG91dHB1dHM/OiBzdHJpbmdbXTtcbiAgaG9zdD86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBwcm92aWRlcnM/OiBQcm92aWRlcltdO1xuICBleHBvcnRBcz86IHN0cmluZztcbiAgcXVlcmllcz86IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICBndWFyZHM/OiB7W2tleTogc3RyaW5nXTogYW55fTtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVEaXJlY3RpdmUgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8RGlyZWN0aXZlPignRGlyZWN0aXZlJywgKGRpcjogRGlyZWN0aXZlID0ge30pID0+IGRpcik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50IGV4dGVuZHMgRGlyZWN0aXZlIHtcbiAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG4gIHZpZXdQcm92aWRlcnM/OiBQcm92aWRlcltdO1xuICBtb2R1bGVJZD86IHN0cmluZztcbiAgdGVtcGxhdGVVcmw/OiBzdHJpbmc7XG4gIHRlbXBsYXRlPzogc3RyaW5nO1xuICBzdHlsZVVybHM/OiBzdHJpbmdbXTtcbiAgc3R5bGVzPzogc3RyaW5nW107XG4gIGFuaW1hdGlvbnM/OiBhbnlbXTtcbiAgZW5jYXBzdWxhdGlvbj86IFZpZXdFbmNhcHN1bGF0aW9uO1xuICBpbnRlcnBvbGF0aW9uPzogW3N0cmluZywgc3RyaW5nXTtcbiAgZW50cnlDb21wb25lbnRzPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIHByZXNlcnZlV2hpdGVzcGFjZXM/OiBib29sZWFuO1xufVxuZXhwb3J0IGVudW0gVmlld0VuY2Fwc3VsYXRpb24ge1xuICBFbXVsYXRlZCA9IDAsXG4gIE5hdGl2ZSA9IDEsXG4gIE5vbmUgPSAyXG59XG5cbmV4cG9ydCBlbnVtIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHtcbiAgT25QdXNoID0gMCxcbiAgRGVmYXVsdCA9IDFcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbXBvbmVudCA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8Q29tcG9uZW50PihcbiAgICAnQ29tcG9uZW50JywgKGM6IENvbXBvbmVudCA9IHt9KSA9PiAoe2NoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCwgLi4uY30pKTtcblxuZXhwb3J0IGludGVyZmFjZSBQaXBlIHtcbiAgbmFtZTogc3RyaW5nO1xuICBwdXJlPzogYm9vbGVhbjtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVQaXBlID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxQaXBlPignUGlwZScsIChwOiBQaXBlKSA9PiAoe3B1cmU6IHRydWUsIC4uLnB9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5wdXQgeyBiaW5kaW5nUHJvcGVydHlOYW1lPzogc3RyaW5nOyB9XG5leHBvcnQgY29uc3QgY3JlYXRlSW5wdXQgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8SW5wdXQ+KCdJbnB1dCcsIChiaW5kaW5nUHJvcGVydHlOYW1lPzogc3RyaW5nKSA9PiAoe2JpbmRpbmdQcm9wZXJ0eU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3V0cHV0IHsgYmluZGluZ1Byb3BlcnR5TmFtZT86IHN0cmluZzsgfVxuZXhwb3J0IGNvbnN0IGNyZWF0ZU91dHB1dCA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8T3V0cHV0PihcbiAgICAnT3V0cHV0JywgKGJpbmRpbmdQcm9wZXJ0eU5hbWU/OiBzdHJpbmcpID0+ICh7YmluZGluZ1Byb3BlcnR5TmFtZX0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBIb3N0QmluZGluZyB7IGhvc3RQcm9wZXJ0eU5hbWU/OiBzdHJpbmc7IH1cbmV4cG9ydCBjb25zdCBjcmVhdGVIb3N0QmluZGluZyA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8SG9zdEJpbmRpbmc+KFxuICAgICdIb3N0QmluZGluZycsIChob3N0UHJvcGVydHlOYW1lPzogc3RyaW5nKSA9PiAoe2hvc3RQcm9wZXJ0eU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdExpc3RlbmVyIHtcbiAgZXZlbnROYW1lPzogc3RyaW5nO1xuICBhcmdzPzogc3RyaW5nW107XG59XG5leHBvcnQgY29uc3QgY3JlYXRlSG9zdExpc3RlbmVyID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxIb3N0TGlzdGVuZXI+KFxuICAgICdIb3N0TGlzdGVuZXInLCAoZXZlbnROYW1lPzogc3RyaW5nLCBhcmdzPzogc3RyaW5nW10pID0+ICh7ZXZlbnROYW1lLCBhcmdzfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5nTW9kdWxlIHtcbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbiAgZGVjbGFyYXRpb25zPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIGltcG9ydHM/OiBBcnJheTxUeXBlfE1vZHVsZVdpdGhQcm92aWRlcnN8YW55W10+O1xuICBleHBvcnRzPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIGVudHJ5Q29tcG9uZW50cz86IEFycmF5PFR5cGV8YW55W10+O1xuICBib290c3RyYXA/OiBBcnJheTxUeXBlfGFueVtdPjtcbiAgc2NoZW1hcz86IEFycmF5PFNjaGVtYU1ldGFkYXRhfGFueVtdPjtcbiAgaWQ/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgY3JlYXRlTmdNb2R1bGUgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8TmdNb2R1bGU+KCdOZ01vZHVsZScsIChuZ01vZHVsZTogTmdNb2R1bGUpID0+IG5nTW9kdWxlKTtcblxuZXhwb3J0IGludGVyZmFjZSBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgbmdNb2R1bGU6IFR5cGU7XG4gIHByb3ZpZGVycz86IFByb3ZpZGVyW107XG59XG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGUge1xuICBwcm92aWRlZEluPzogVHlwZXwncm9vdCd8YW55O1xuICB1c2VDbGFzcz86IFR5cGV8YW55O1xuICB1c2VFeGlzdGluZz86IFR5cGV8YW55O1xuICB1c2VWYWx1ZT86IGFueTtcbiAgdXNlRmFjdG9yeT86IFR5cGV8YW55O1xuICBkZXBzPzogQXJyYXk8VHlwZXxhbnlbXT47XG59XG5leHBvcnQgY29uc3QgY3JlYXRlSW5qZWN0YWJsZSA9XG4gICAgbWFrZU1ldGFkYXRhRmFjdG9yeSgnSW5qZWN0YWJsZScsIChpbmplY3RhYmxlOiBJbmplY3RhYmxlID0ge30pID0+IGluamVjdGFibGUpO1xuZXhwb3J0IGludGVyZmFjZSBTY2hlbWFNZXRhZGF0YSB7IG5hbWU6IHN0cmluZzsgfVxuXG5leHBvcnQgY29uc3QgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQTogU2NoZW1hTWV0YWRhdGEgPSB7XG4gIG5hbWU6ICdjdXN0b20tZWxlbWVudHMnXG59O1xuXG5leHBvcnQgY29uc3QgTk9fRVJST1JTX1NDSEVNQTogU2NoZW1hTWV0YWRhdGEgPSB7XG4gIG5hbWU6ICduby1lcnJvcnMtc2NoZW1hJ1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU9wdGlvbmFsID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnT3B0aW9uYWwnKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVTZWxmID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnU2VsZicpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNraXBTZWxmID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnU2tpcFNlbGYnKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVIb3N0ID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnSG9zdCcpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR5cGUgZXh0ZW5kcyBGdW5jdGlvbiB7IG5ldyAoLi4uYXJnczogYW55W10pOiBhbnk7IH1cbmV4cG9ydCBjb25zdCBUeXBlID0gRnVuY3Rpb247XG5cbmV4cG9ydCBlbnVtIFNlY3VyaXR5Q29udGV4dCB7XG4gIE5PTkUgPSAwLFxuICBIVE1MID0gMSxcbiAgU1RZTEUgPSAyLFxuICBTQ1JJUFQgPSAzLFxuICBVUkwgPSA0LFxuICBSRVNPVVJDRV9VUkwgPSA1LFxufVxuXG5leHBvcnQgdHlwZSBQcm92aWRlciA9IGFueTtcblxuZXhwb3J0IGNvbnN0IGVudW0gTm9kZUZsYWdzIHtcbiAgTm9uZSA9IDAsXG4gIFR5cGVFbGVtZW50ID0gMSA8PCAwLFxuICBUeXBlVGV4dCA9IDEgPDwgMSxcbiAgUHJvamVjdGVkVGVtcGxhdGUgPSAxIDw8IDIsXG4gIENhdFJlbmRlck5vZGUgPSBUeXBlRWxlbWVudCB8IFR5cGVUZXh0LFxuICBUeXBlTmdDb250ZW50ID0gMSA8PCAzLFxuICBUeXBlUGlwZSA9IDEgPDwgNCxcbiAgVHlwZVB1cmVBcnJheSA9IDEgPDwgNSxcbiAgVHlwZVB1cmVPYmplY3QgPSAxIDw8IDYsXG4gIFR5cGVQdXJlUGlwZSA9IDEgPDwgNyxcbiAgQ2F0UHVyZUV4cHJlc3Npb24gPSBUeXBlUHVyZUFycmF5IHwgVHlwZVB1cmVPYmplY3QgfCBUeXBlUHVyZVBpcGUsXG4gIFR5cGVWYWx1ZVByb3ZpZGVyID0gMSA8PCA4LFxuICBUeXBlQ2xhc3NQcm92aWRlciA9IDEgPDwgOSxcbiAgVHlwZUZhY3RvcnlQcm92aWRlciA9IDEgPDwgMTAsXG4gIFR5cGVVc2VFeGlzdGluZ1Byb3ZpZGVyID0gMSA8PCAxMSxcbiAgTGF6eVByb3ZpZGVyID0gMSA8PCAxMixcbiAgUHJpdmF0ZVByb3ZpZGVyID0gMSA8PCAxMyxcbiAgVHlwZURpcmVjdGl2ZSA9IDEgPDwgMTQsXG4gIENvbXBvbmVudCA9IDEgPDwgMTUsXG4gIENhdFByb3ZpZGVyTm9EaXJlY3RpdmUgPVxuICAgICAgVHlwZVZhbHVlUHJvdmlkZXIgfCBUeXBlQ2xhc3NQcm92aWRlciB8IFR5cGVGYWN0b3J5UHJvdmlkZXIgfCBUeXBlVXNlRXhpc3RpbmdQcm92aWRlcixcbiAgQ2F0UHJvdmlkZXIgPSBDYXRQcm92aWRlck5vRGlyZWN0aXZlIHwgVHlwZURpcmVjdGl2ZSxcbiAgT25Jbml0ID0gMSA8PCAxNixcbiAgT25EZXN0cm95ID0gMSA8PCAxNyxcbiAgRG9DaGVjayA9IDEgPDwgMTgsXG4gIE9uQ2hhbmdlcyA9IDEgPDwgMTksXG4gIEFmdGVyQ29udGVudEluaXQgPSAxIDw8IDIwLFxuICBBZnRlckNvbnRlbnRDaGVja2VkID0gMSA8PCAyMSxcbiAgQWZ0ZXJWaWV3SW5pdCA9IDEgPDwgMjIsXG4gIEFmdGVyVmlld0NoZWNrZWQgPSAxIDw8IDIzLFxuICBFbWJlZGRlZFZpZXdzID0gMSA8PCAyNCxcbiAgQ29tcG9uZW50VmlldyA9IDEgPDwgMjUsXG4gIFR5cGVDb250ZW50UXVlcnkgPSAxIDw8IDI2LFxuICBUeXBlVmlld1F1ZXJ5ID0gMSA8PCAyNyxcbiAgU3RhdGljUXVlcnkgPSAxIDw8IDI4LFxuICBEeW5hbWljUXVlcnkgPSAxIDw8IDI5LFxuICBUeXBlTW9kdWxlUHJvdmlkZXIgPSAxIDw8IDMwLFxuICBDYXRRdWVyeSA9IFR5cGVDb250ZW50UXVlcnkgfCBUeXBlVmlld1F1ZXJ5LFxuXG4gIC8vIG11dHVhbGx5IGV4Y2x1c2l2ZSB2YWx1ZXMuLi5cbiAgVHlwZXMgPSBDYXRSZW5kZXJOb2RlIHwgVHlwZU5nQ29udGVudCB8IFR5cGVQaXBlIHwgQ2F0UHVyZUV4cHJlc3Npb24gfCBDYXRQcm92aWRlciB8IENhdFF1ZXJ5XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIERlcEZsYWdzIHtcbiAgTm9uZSA9IDAsXG4gIFNraXBTZWxmID0gMSA8PCAwLFxuICBPcHRpb25hbCA9IDEgPDwgMSxcbiAgU2VsZiA9IDEgPDwgMixcbiAgVmFsdWUgPSAxIDw8IDMsXG59XG5cbi8qKiBJbmplY3Rpb24gZmxhZ3MgZm9yIERJLiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gSW5qZWN0RmxhZ3Mge1xuICBEZWZhdWx0ID0gMCxcblxuICAvKiogU2tpcCB0aGUgbm9kZSB0aGF0IGlzIHJlcXVlc3RpbmcgaW5qZWN0aW9uLiAqL1xuICBTa2lwU2VsZiA9IDEgPDwgMCxcbiAgLyoqIERvbid0IGRlc2NlbmQgaW50byBhbmNlc3RvcnMgb2YgdGhlIG5vZGUgcmVxdWVzdGluZyBpbmplY3Rpb24uICovXG4gIFNlbGYgPSAxIDw8IDEsXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIEFyZ3VtZW50VHlwZSB7SW5saW5lID0gMCwgRHluYW1pYyA9IDF9XG5cbmV4cG9ydCBjb25zdCBlbnVtIEJpbmRpbmdGbGFncyB7XG4gIFR5cGVFbGVtZW50QXR0cmlidXRlID0gMSA8PCAwLFxuICBUeXBlRWxlbWVudENsYXNzID0gMSA8PCAxLFxuICBUeXBlRWxlbWVudFN0eWxlID0gMSA8PCAyLFxuICBUeXBlUHJvcGVydHkgPSAxIDw8IDMsXG4gIFN5bnRoZXRpY1Byb3BlcnR5ID0gMSA8PCA0LFxuICBTeW50aGV0aWNIb3N0UHJvcGVydHkgPSAxIDw8IDUsXG4gIENhdFN5bnRoZXRpY1Byb3BlcnR5ID0gU3ludGhldGljUHJvcGVydHkgfCBTeW50aGV0aWNIb3N0UHJvcGVydHksXG5cbiAgLy8gbXV0dWFsbHkgZXhjbHVzaXZlIHZhbHVlcy4uLlxuICBUeXBlcyA9IFR5cGVFbGVtZW50QXR0cmlidXRlIHwgVHlwZUVsZW1lbnRDbGFzcyB8IFR5cGVFbGVtZW50U3R5bGUgfCBUeXBlUHJvcGVydHlcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gUXVlcnlCaW5kaW5nVHlwZSB7Rmlyc3QgPSAwLCBBbGwgPSAxfVxuXG5leHBvcnQgY29uc3QgZW51bSBRdWVyeVZhbHVlVHlwZSB7XG4gIEVsZW1lbnRSZWYgPSAwLFxuICBSZW5kZXJFbGVtZW50ID0gMSxcbiAgVGVtcGxhdGVSZWYgPSAyLFxuICBWaWV3Q29udGFpbmVyUmVmID0gMyxcbiAgUHJvdmlkZXIgPSA0XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFZpZXdGbGFncyB7XG4gIE5vbmUgPSAwLFxuICBPblB1c2ggPSAxIDw8IDEsXG59XG5cbmV4cG9ydCBlbnVtIE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5IHtcbiAgRXJyb3IgPSAwLFxuICBXYXJuaW5nID0gMSxcbiAgSWdub3JlID0gMixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXRhZGF0YUZhY3Rvcnk8VD4ge1xuICAoLi4uYXJnczogYW55W10pOiBUO1xuICBpc1R5cGVPZihvYmo6IGFueSk6IG9iaiBpcyBUO1xuICBuZ01ldGFkYXRhTmFtZTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBtYWtlTWV0YWRhdGFGYWN0b3J5PFQ+KG5hbWU6IHN0cmluZywgcHJvcHM/OiAoLi4uYXJnczogYW55W10pID0+IFQpOiBNZXRhZGF0YUZhY3Rvcnk8VD4ge1xuICBjb25zdCBmYWN0b3J5OiBhbnkgPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICBjb25zdCB2YWx1ZXMgPSBwcm9wcyA/IHByb3BzKC4uLmFyZ3MpIDoge307XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTWV0YWRhdGFOYW1lOiBuYW1lLFxuICAgICAgLi4udmFsdWVzLFxuICAgIH07XG4gIH07XG4gIGZhY3RvcnkuaXNUeXBlT2YgPSAob2JqOiBhbnkpID0+IG9iaiAmJiBvYmoubmdNZXRhZGF0YU5hbWUgPT09IG5hbWU7XG4gIGZhY3RvcnkubmdNZXRhZGF0YU5hbWUgPSBuYW1lO1xuICByZXR1cm4gZmFjdG9yeTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZSB7XG4gIGNoaWxkcmVuPzogUm91dGVbXTtcbiAgbG9hZENoaWxkcmVuPzogc3RyaW5nfFR5cGV8YW55O1xufVxuIl19