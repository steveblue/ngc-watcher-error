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
        define("@angular/compiler/src/util", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
    function dashCaseToCamelCase(input) {
        return input.replace(DASH_CASE_REGEXP, function () {
            var m = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                m[_i] = arguments[_i];
            }
            return m[1].toUpperCase();
        });
    }
    exports.dashCaseToCamelCase = dashCaseToCamelCase;
    function splitAtColon(input, defaultValues) {
        return _splitAt(input, ':', defaultValues);
    }
    exports.splitAtColon = splitAtColon;
    function splitAtPeriod(input, defaultValues) {
        return _splitAt(input, '.', defaultValues);
    }
    exports.splitAtPeriod = splitAtPeriod;
    function _splitAt(input, character, defaultValues) {
        var characterIndex = input.indexOf(character);
        if (characterIndex == -1)
            return defaultValues;
        return [input.slice(0, characterIndex).trim(), input.slice(characterIndex + 1).trim()];
    }
    function visitValue(value, visitor, context) {
        if (Array.isArray(value)) {
            return visitor.visitArray(value, context);
        }
        if (isStrictStringMap(value)) {
            return visitor.visitStringMap(value, context);
        }
        if (value == null || typeof value == 'string' || typeof value == 'number' ||
            typeof value == 'boolean') {
            return visitor.visitPrimitive(value, context);
        }
        return visitor.visitOther(value, context);
    }
    exports.visitValue = visitValue;
    function isDefined(val) {
        return val !== null && val !== undefined;
    }
    exports.isDefined = isDefined;
    function noUndefined(val) {
        return val === undefined ? null : val;
    }
    exports.noUndefined = noUndefined;
    var ValueTransformer = /** @class */ (function () {
        function ValueTransformer() {
        }
        ValueTransformer.prototype.visitArray = function (arr, context) {
            var _this = this;
            return arr.map(function (value) { return visitValue(value, _this, context); });
        };
        ValueTransformer.prototype.visitStringMap = function (map, context) {
            var _this = this;
            var result = {};
            Object.keys(map).forEach(function (key) { result[key] = visitValue(map[key], _this, context); });
            return result;
        };
        ValueTransformer.prototype.visitPrimitive = function (value, context) { return value; };
        ValueTransformer.prototype.visitOther = function (value, context) { return value; };
        return ValueTransformer;
    }());
    exports.ValueTransformer = ValueTransformer;
    exports.SyncAsync = {
        assertSync: function (value) {
            if (isPromise(value)) {
                throw new Error("Illegal state: value cannot be a promise");
            }
            return value;
        },
        then: function (value, cb) { return isPromise(value) ? value.then(cb) : cb(value); },
        all: function (syncAsyncValues) {
            return syncAsyncValues.some(isPromise) ? Promise.all(syncAsyncValues) : syncAsyncValues;
        }
    };
    function error(msg) {
        throw new Error("Internal Error: " + msg);
    }
    exports.error = error;
    function syntaxError(msg, parseErrors) {
        var error = Error(msg);
        error[ERROR_SYNTAX_ERROR] = true;
        if (parseErrors)
            error[ERROR_PARSE_ERRORS] = parseErrors;
        return error;
    }
    exports.syntaxError = syntaxError;
    var ERROR_SYNTAX_ERROR = 'ngSyntaxError';
    var ERROR_PARSE_ERRORS = 'ngParseErrors';
    function isSyntaxError(error) {
        return error[ERROR_SYNTAX_ERROR];
    }
    exports.isSyntaxError = isSyntaxError;
    function getParseErrors(error) {
        return error[ERROR_PARSE_ERRORS] || [];
    }
    exports.getParseErrors = getParseErrors;
    // Escape characters that have a special meaning in Regular Expressions
    function escapeRegExp(s) {
        return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }
    exports.escapeRegExp = escapeRegExp;
    var STRING_MAP_PROTO = Object.getPrototypeOf({});
    function isStrictStringMap(obj) {
        return typeof obj === 'object' && obj !== null && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
    }
    function utf8Encode(str) {
        var encoded = '';
        for (var index = 0; index < str.length; index++) {
            var codePoint = str.charCodeAt(index);
            // decode surrogate
            // see https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            if (codePoint >= 0xd800 && codePoint <= 0xdbff && str.length > (index + 1)) {
                var low = str.charCodeAt(index + 1);
                if (low >= 0xdc00 && low <= 0xdfff) {
                    index++;
                    codePoint = ((codePoint - 0xd800) << 10) + low - 0xdc00 + 0x10000;
                }
            }
            if (codePoint <= 0x7f) {
                encoded += String.fromCharCode(codePoint);
            }
            else if (codePoint <= 0x7ff) {
                encoded += String.fromCharCode(((codePoint >> 6) & 0x1F) | 0xc0, (codePoint & 0x3f) | 0x80);
            }
            else if (codePoint <= 0xffff) {
                encoded += String.fromCharCode((codePoint >> 12) | 0xe0, ((codePoint >> 6) & 0x3f) | 0x80, (codePoint & 0x3f) | 0x80);
            }
            else if (codePoint <= 0x1fffff) {
                encoded += String.fromCharCode(((codePoint >> 18) & 0x07) | 0xf0, ((codePoint >> 12) & 0x3f) | 0x80, ((codePoint >> 6) & 0x3f) | 0x80, (codePoint & 0x3f) | 0x80);
            }
        }
        return encoded;
    }
    exports.utf8Encode = utf8Encode;
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (token instanceof Array) {
            return '[' + token.map(stringify).join(', ') + ']';
        }
        if (token == null) {
            return '' + token;
        }
        if (token.overriddenName) {
            return "" + token.overriddenName;
        }
        if (token.name) {
            return "" + token.name;
        }
        var res = token.toString();
        if (res == null) {
            return '' + res;
        }
        var newLineIndex = res.indexOf('\n');
        return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
    }
    exports.stringify = stringify;
    /**
     * Lazily retrieves the reference value from a forwardRef.
     */
    function resolveForwardRef(type) {
        if (typeof type === 'function' && type.hasOwnProperty('__forward_ref__')) {
            return type();
        }
        else {
            return type;
        }
    }
    exports.resolveForwardRef = resolveForwardRef;
    /**
     * Determine if the argument is shaped like a Promise
     */
    function isPromise(obj) {
        // allow any Promise/A+ compliant thenable.
        // It's up to the caller to ensure that obj.then conforms to the spec
        return !!obj && typeof obj.then === 'function';
    }
    exports.isPromise = isPromise;
    var Version = /** @class */ (function () {
        function Version(full) {
            this.full = full;
            var splits = full.split('.');
            this.major = splits[0];
            this.minor = splits[1];
            this.patch = splits.slice(2).join('.');
        }
        return Version;
    }());
    exports.Version = Version;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBT0gsSUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFFekMsNkJBQW9DLEtBQWE7UUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7WUFBQyxXQUFXO2lCQUFYLFVBQVcsRUFBWCxxQkFBVyxFQUFYLElBQVc7Z0JBQVgsc0JBQVc7O1lBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO1FBQWxCLENBQWtCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRkQsa0RBRUM7SUFFRCxzQkFBNkIsS0FBYSxFQUFFLGFBQXVCO1FBQ2pFLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRkQsb0NBRUM7SUFFRCx1QkFBOEIsS0FBYSxFQUFFLGFBQXVCO1FBQ2xFLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRkQsc0NBRUM7SUFFRCxrQkFBa0IsS0FBYSxFQUFFLFNBQWlCLEVBQUUsYUFBdUI7UUFDekUsSUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxFQUFFLENBQUMsQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLENB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QUM7SUE3QkQsOEJBNkJDO0lBRUQ7O09BRUc7SUFDSCwyQkFBa0MsSUFBUztRQUN6QyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxVQUFVLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBTkQsOENBTUM7SUFFRDs7T0FFRztJQUNILG1CQUEwQixHQUFRO1FBQ2hDLDJDQUEyQztRQUMzQyxxRUFBcUU7UUFDckUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztJQUNqRCxDQUFDO0lBSkQsOEJBSUM7SUFFRDtRQUtFLGlCQUFtQixJQUFZO1lBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtZQUM3QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNILGNBQUM7SUFBRCxDQUFDLEFBWEQsSUFXQztJQVhZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbnN0YW50UG9vbH0gZnJvbSAnLi9jb25zdGFudF9wb29sJztcblxuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7UGFyc2VFcnJvcn0gZnJvbSAnLi9wYXJzZV91dGlsJztcblxuY29uc3QgREFTSF9DQVNFX1JFR0VYUCA9IC8tKyhbYS16MC05XSkvZztcblxuZXhwb3J0IGZ1bmN0aW9uIGRhc2hDYXNlVG9DYW1lbENhc2UoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBpbnB1dC5yZXBsYWNlKERBU0hfQ0FTRV9SRUdFWFAsICguLi5tOiBhbnlbXSkgPT4gbVsxXS50b1VwcGVyQ2FzZSgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0QXRDb2xvbihpbnB1dDogc3RyaW5nLCBkZWZhdWx0VmFsdWVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIF9zcGxpdEF0KGlucHV0LCAnOicsIGRlZmF1bHRWYWx1ZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRBdFBlcmlvZChpbnB1dDogc3RyaW5nLCBkZWZhdWx0VmFsdWVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIF9zcGxpdEF0KGlucHV0LCAnLicsIGRlZmF1bHRWYWx1ZXMpO1xufVxuXG5mdW5jdGlvbiBfc3BsaXRBdChpbnB1dDogc3RyaW5nLCBjaGFyYWN0ZXI6IHN0cmluZywgZGVmYXVsdFZhbHVlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGNoYXJhY3RlckluZGV4ID0gaW5wdXQuaW5kZXhPZihjaGFyYWN0ZXIpO1xuICBpZiAoY2hhcmFjdGVySW5kZXggPT0gLTEpIHJldHVybiBkZWZhdWx0VmFsdWVzO1xuICByZXR1cm4gW2lucHV0LnNsaWNlKDAsIGNoYXJhY3RlckluZGV4KS50cmltKCksIGlucHV0LnNsaWNlKGNoYXJhY3RlckluZGV4ICsgMSkudHJpbSgpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0VmFsdWUodmFsdWU6IGFueSwgdmlzaXRvcjogVmFsdWVWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEFycmF5KDxhbnlbXT52YWx1ZSwgY29udGV4dCk7XG4gIH1cblxuICBpZiAoaXNTdHJpY3RTdHJpbmdNYXAodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRTdHJpbmdNYXAoPHtba2V5OiBzdHJpbmddOiBhbnl9PnZhbHVlLCBjb250ZXh0KTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHxcbiAgICAgIHR5cGVvZiB2YWx1ZSA9PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFByaW1pdGl2ZSh2YWx1ZSwgY29udGV4dCk7XG4gIH1cblxuICByZXR1cm4gdmlzaXRvci52aXNpdE90aGVyKHZhbHVlLCBjb250ZXh0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGVmaW5lZCh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHZhbCAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9VbmRlZmluZWQ8VD4odmFsOiBUIHwgdW5kZWZpbmVkKTogVCB7XG4gIHJldHVybiB2YWwgPT09IHVuZGVmaW5lZCA/IG51bGwgISA6IHZhbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWYWx1ZVZpc2l0b3Ige1xuICB2aXNpdEFycmF5KGFycjogYW55W10sIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRTdHJpbmdNYXAobWFwOiB7W2tleTogc3RyaW5nXTogYW55fSwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFByaW1pdGl2ZSh2YWx1ZTogYW55LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0T3RoZXIodmFsdWU6IGFueSwgY29udGV4dDogYW55KTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgVmFsdWVUcmFuc2Zvcm1lciBpbXBsZW1lbnRzIFZhbHVlVmlzaXRvciB7XG4gIHZpc2l0QXJyYXkoYXJyOiBhbnlbXSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gYXJyLm1hcCh2YWx1ZSA9PiB2aXNpdFZhbHVlKHZhbHVlLCB0aGlzLCBjb250ZXh0KSk7XG4gIH1cbiAgdmlzaXRTdHJpbmdNYXAobWFwOiB7W2tleTogc3RyaW5nXTogYW55fSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBjb25zdCByZXN1bHQ6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKGtleSA9PiB7IHJlc3VsdFtrZXldID0gdmlzaXRWYWx1ZShtYXBba2V5XSwgdGhpcywgY29udGV4dCk7IH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmlzaXRQcmltaXRpdmUodmFsdWU6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZhbHVlOyB9XG4gIHZpc2l0T3RoZXIodmFsdWU6IGFueSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZhbHVlOyB9XG59XG5cbmV4cG9ydCB0eXBlIFN5bmNBc3luYzxUPiA9IFQgfCBQcm9taXNlPFQ+O1xuXG5leHBvcnQgY29uc3QgU3luY0FzeW5jID0ge1xuICBhc3NlcnRTeW5jOiA8VD4odmFsdWU6IFN5bmNBc3luYzxUPik6IFQgPT4ge1xuICAgIGlmIChpc1Byb21pc2UodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYElsbGVnYWwgc3RhdGU6IHZhbHVlIGNhbm5vdCBiZSBhIHByb21pc2VgKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICB0aGVuOiA8VCwgUj4odmFsdWU6IFN5bmNBc3luYzxUPiwgY2I6ICh2YWx1ZTogVCkgPT4gUiB8IFByb21pc2U8Uj58IFN5bmNBc3luYzxSPik6XG4gICAgICAgICAgICBTeW5jQXN5bmM8Uj4gPT4geyByZXR1cm4gaXNQcm9taXNlKHZhbHVlKSA/IHZhbHVlLnRoZW4oY2IpIDogY2IodmFsdWUpO30sXG4gIGFsbDogPFQ+KHN5bmNBc3luY1ZhbHVlczogU3luY0FzeW5jPFQ+W10pOiBTeW5jQXN5bmM8VFtdPiA9PiB7XG4gICAgcmV0dXJuIHN5bmNBc3luY1ZhbHVlcy5zb21lKGlzUHJvbWlzZSkgPyBQcm9taXNlLmFsbChzeW5jQXN5bmNWYWx1ZXMpIDogc3luY0FzeW5jVmFsdWVzIGFzIFRbXTtcbiAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yKG1zZzogc3RyaW5nKTogbmV2ZXIge1xuICB0aHJvdyBuZXcgRXJyb3IoYEludGVybmFsIEVycm9yOiAke21zZ31gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN5bnRheEVycm9yKG1zZzogc3RyaW5nLCBwYXJzZUVycm9ycz86IFBhcnNlRXJyb3JbXSk6IEVycm9yIHtcbiAgY29uc3QgZXJyb3IgPSBFcnJvcihtc2cpO1xuICAoZXJyb3IgYXMgYW55KVtFUlJPUl9TWU5UQVhfRVJST1JdID0gdHJ1ZTtcbiAgaWYgKHBhcnNlRXJyb3JzKSAoZXJyb3IgYXMgYW55KVtFUlJPUl9QQVJTRV9FUlJPUlNdID0gcGFyc2VFcnJvcnM7XG4gIHJldHVybiBlcnJvcjtcbn1cblxuY29uc3QgRVJST1JfU1lOVEFYX0VSUk9SID0gJ25nU3ludGF4RXJyb3InO1xuY29uc3QgRVJST1JfUEFSU0VfRVJST1JTID0gJ25nUGFyc2VFcnJvcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTeW50YXhFcnJvcihlcnJvcjogRXJyb3IpOiBib29sZWFuIHtcbiAgcmV0dXJuIChlcnJvciBhcyBhbnkpW0VSUk9SX1NZTlRBWF9FUlJPUl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJzZUVycm9ycyhlcnJvcjogRXJyb3IpOiBQYXJzZUVycm9yW10ge1xuICByZXR1cm4gKGVycm9yIGFzIGFueSlbRVJST1JfUEFSU0VfRVJST1JTXSB8fCBbXTtcbn1cblxuLy8gRXNjYXBlIGNoYXJhY3RlcnMgdGhhdCBoYXZlIGEgc3BlY2lhbCBtZWFuaW5nIGluIFJlZ3VsYXIgRXhwcmVzc2lvbnNcbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvKFsuKis/Xj0hOiR7fSgpfFtcXF1cXC9cXFxcXSkvZywgJ1xcXFwkMScpO1xufVxuXG5jb25zdCBTVFJJTkdfTUFQX1BST1RPID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHt9KTtcbmZ1bmN0aW9uIGlzU3RyaWN0U3RyaW5nTWFwKG9iajogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGwgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgPT09IFNUUklOR19NQVBfUFJPVE87XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1dGY4RW5jb2RlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IGVuY29kZWQgPSAnJztcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHN0ci5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBsZXQgY29kZVBvaW50ID0gc3RyLmNoYXJDb2RlQXQoaW5kZXgpO1xuXG4gICAgLy8gZGVjb2RlIHN1cnJvZ2F0ZVxuICAgIC8vIHNlZSBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcbiAgICBpZiAoY29kZVBvaW50ID49IDB4ZDgwMCAmJiBjb2RlUG9pbnQgPD0gMHhkYmZmICYmIHN0ci5sZW5ndGggPiAoaW5kZXggKyAxKSkge1xuICAgICAgY29uc3QgbG93ID0gc3RyLmNoYXJDb2RlQXQoaW5kZXggKyAxKTtcbiAgICAgIGlmIChsb3cgPj0gMHhkYzAwICYmIGxvdyA8PSAweGRmZmYpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgY29kZVBvaW50ID0gKChjb2RlUG9pbnQgLSAweGQ4MDApIDw8IDEwKSArIGxvdyAtIDB4ZGMwMCArIDB4MTAwMDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA8PSAweDdmKSB7XG4gICAgICBlbmNvZGVkICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8PSAweDdmZikge1xuICAgICAgZW5jb2RlZCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IDYpICYgMHgxRikgfCAweGMwLCAoY29kZVBvaW50ICYgMHgzZikgfCAweDgwKTtcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8PSAweGZmZmYpIHtcbiAgICAgIGVuY29kZWQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgICAoY29kZVBvaW50ID4+IDEyKSB8IDB4ZTAsICgoY29kZVBvaW50ID4+IDYpICYgMHgzZikgfCAweDgwLCAoY29kZVBvaW50ICYgMHgzZikgfCAweDgwKTtcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8PSAweDFmZmZmZikge1xuICAgICAgZW5jb2RlZCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICAgICAgICgoY29kZVBvaW50ID4+IDE4KSAmIDB4MDcpIHwgMHhmMCwgKChjb2RlUG9pbnQgPj4gMTIpICYgMHgzZikgfCAweDgwLFxuICAgICAgICAgICgoY29kZVBvaW50ID4+IDYpICYgMHgzZikgfCAweDgwLCAoY29kZVBvaW50ICYgMHgzZikgfCAweDgwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZW5jb2RlZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPdXRwdXRDb250ZXh0IHtcbiAgZ2VuRmlsZVBhdGg6IHN0cmluZztcbiAgc3RhdGVtZW50czogby5TdGF0ZW1lbnRbXTtcbiAgY29uc3RhbnRQb29sOiBDb25zdGFudFBvb2w7XG4gIGltcG9ydEV4cHIocmVmZXJlbmNlOiBhbnksIHR5cGVQYXJhbXM/OiBvLlR5cGVbXXxudWxsLCB1c2VTdW1tYXJpZXM/OiBib29sZWFuKTogby5FeHByZXNzaW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KHRva2VuOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGlmICh0b2tlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuICdbJyArIHRva2VuLm1hcChzdHJpbmdpZnkpLmpvaW4oJywgJykgKyAnXSc7XG4gIH1cblxuICBpZiAodG9rZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiAnJyArIHRva2VuO1xuICB9XG5cbiAgaWYgKHRva2VuLm92ZXJyaWRkZW5OYW1lKSB7XG4gICAgcmV0dXJuIGAke3Rva2VuLm92ZXJyaWRkZW5OYW1lfWA7XG4gIH1cblxuICBpZiAodG9rZW4ubmFtZSkge1xuICAgIHJldHVybiBgJHt0b2tlbi5uYW1lfWA7XG4gIH1cblxuICBjb25zdCByZXMgPSB0b2tlbi50b1N0cmluZygpO1xuXG4gIGlmIChyZXMgPT0gbnVsbCkge1xuICAgIHJldHVybiAnJyArIHJlcztcbiAgfVxuXG4gIGNvbnN0IG5ld0xpbmVJbmRleCA9IHJlcy5pbmRleE9mKCdcXG4nKTtcbiAgcmV0dXJuIG5ld0xpbmVJbmRleCA9PT0gLTEgPyByZXMgOiByZXMuc3Vic3RyaW5nKDAsIG5ld0xpbmVJbmRleCk7XG59XG5cbi8qKlxuICogTGF6aWx5IHJldHJpZXZlcyB0aGUgcmVmZXJlbmNlIHZhbHVlIGZyb20gYSBmb3J3YXJkUmVmLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUZvcndhcmRSZWYodHlwZTogYW55KTogYW55IHtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nICYmIHR5cGUuaGFzT3duUHJvcGVydHkoJ19fZm9yd2FyZF9yZWZfXycpKSB7XG4gICAgcmV0dXJuIHR5cGUoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB0aGUgYXJndW1lbnQgaXMgc2hhcGVkIGxpa2UgYSBQcm9taXNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2Uob2JqOiBhbnkpOiBvYmogaXMgUHJvbWlzZTxhbnk+IHtcbiAgLy8gYWxsb3cgYW55IFByb21pc2UvQSsgY29tcGxpYW50IHRoZW5hYmxlLlxuICAvLyBJdCdzIHVwIHRvIHRoZSBjYWxsZXIgdG8gZW5zdXJlIHRoYXQgb2JqLnRoZW4gY29uZm9ybXMgdG8gdGhlIHNwZWNcbiAgcmV0dXJuICEhb2JqICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGNsYXNzIFZlcnNpb24ge1xuICBwdWJsaWMgcmVhZG9ubHkgbWFqb3I6IHN0cmluZztcbiAgcHVibGljIHJlYWRvbmx5IG1pbm9yOiBzdHJpbmc7XG4gIHB1YmxpYyByZWFkb25seSBwYXRjaDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmdWxsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzcGxpdHMgPSBmdWxsLnNwbGl0KCcuJyk7XG4gICAgdGhpcy5tYWpvciA9IHNwbGl0c1swXTtcbiAgICB0aGlzLm1pbm9yID0gc3BsaXRzWzFdO1xuICAgIHRoaXMucGF0Y2ggPSBzcGxpdHMuc2xpY2UoMikuam9pbignLicpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uc29sZSB7XG4gIGxvZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xuICB3YXJuKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XG59XG4iXX0=