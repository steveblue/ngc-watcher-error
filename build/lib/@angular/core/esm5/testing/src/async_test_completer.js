/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
var /**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
AsyncTestCompleter = /** @class */ (function () {
    function AsyncTestCompleter() {
        var _this = this;
        this._promise = new Promise(function (res, rej) {
            _this._resolve = res;
            _this._reject = rej;
        });
    }
    AsyncTestCompleter.prototype.done = function (value) { this._resolve(value); };
    AsyncTestCompleter.prototype.fail = function (error, stackTrace) { this._reject(error); };
    Object.defineProperty(AsyncTestCompleter.prototype, "promise", {
        get: function () { return this._promise; },
        enumerable: true,
        configurable: true
    });
    return AsyncTestCompleter;
}());
/**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
export { AsyncTestCompleter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfdGVzdF9jb21wbGV0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL2FzeW5jX3Rlc3RfY29tcGxldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFXQTs7O0FBQUE7Ozt3QkFHbUMsSUFBSSxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUNwRCxLQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNwQixLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztTQUNwQixDQUFDOztJQUNGLGlDQUFJLEdBQUosVUFBSyxLQUFXLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0lBRTNDLGlDQUFJLEdBQUosVUFBSyxLQUFXLEVBQUUsVUFBbUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7SUFFL0Qsc0JBQUksdUNBQU87YUFBWCxjQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFOzs7T0FBQTs2QkF0QnZEO0lBdUJDLENBQUE7Ozs7QUFaRCw4QkFZQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBJbmplY3RhYmxlIGNvbXBsZXRlciB0aGF0IGFsbG93cyBzaWduYWxpbmcgY29tcGxldGlvbiBvZiBhbiBhc3luY2hyb25vdXMgdGVzdC4gVXNlZCBpbnRlcm5hbGx5LlxuICovXG5leHBvcnQgY2xhc3MgQXN5bmNUZXN0Q29tcGxldGVyIHtcbiAgcHJpdmF0ZSBfcmVzb2x2ZTogKHJlc3VsdDogYW55KSA9PiB2b2lkO1xuICBwcml2YXRlIF9yZWplY3Q6IChlcnI6IGFueSkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfcHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgdGhpcy5fcmVzb2x2ZSA9IHJlcztcbiAgICB0aGlzLl9yZWplY3QgPSByZWo7XG4gIH0pO1xuICBkb25lKHZhbHVlPzogYW55KSB7IHRoaXMuX3Jlc29sdmUodmFsdWUpOyB9XG5cbiAgZmFpbChlcnJvcj86IGFueSwgc3RhY2tUcmFjZT86IHN0cmluZykgeyB0aGlzLl9yZWplY3QoZXJyb3IpOyB9XG5cbiAgZ2V0IHByb21pc2UoKTogUHJvbWlzZTxhbnk+IHsgcmV0dXJuIHRoaXMuX3Byb21pc2U7IH1cbn1cbiJdfQ==