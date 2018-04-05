/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
 * `HttpResponse`.
 *
 * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
 * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
 * `HttpBackend`.
 *
 * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
 *
 * @stable
 */
var /**
 * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
 * `HttpResponse`.
 *
 * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
 * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
 * `HttpBackend`.
 *
 * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
 *
 * @stable
 */
HttpHandler = /** @class */ (function () {
    function HttpHandler() {
    }
    return HttpHandler;
}());
/**
 * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
 * `HttpResponse`.
 *
 * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
 * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
 * `HttpBackend`.
 *
 * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
 *
 * @stable
 */
export { HttpHandler };
/**
 * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
 *
 * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
 *
 * When injected, `HttpBackend` dispatches requests directly to the backend, without going
 * through the interceptor chain.
 *
 * @stable
 */
var /**
 * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
 *
 * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
 *
 * When injected, `HttpBackend` dispatches requests directly to the backend, without going
 * through the interceptor chain.
 *
 * @stable
 */
HttpBackend = /** @class */ (function () {
    function HttpBackend() {
    }
    return HttpBackend;
}());
/**
 * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
 *
 * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
 *
 * When injected, `HttpBackend` dispatches requests directly to the backend, without going
 * through the interceptor chain.
 *
 * @stable
 */
export { HttpBackend };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3NyYy9iYWNrZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7Ozs7Ozs7Ozs7OztBQUFBOzs7c0JBeEJBO0lBMEJDLENBQUE7Ozs7Ozs7Ozs7Ozs7QUFGRCx1QkFFQzs7Ozs7Ozs7Ozs7QUFZRDs7Ozs7Ozs7OztBQUFBOzs7c0JBdENBO0lBd0NDLENBQUE7Ozs7Ozs7Ozs7O0FBRkQsdUJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0h0dHBSZXF1ZXN0fSBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtIdHRwRXZlbnR9IGZyb20gJy4vcmVzcG9uc2UnO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYW4gYEh0dHBSZXF1ZXN0YCBpbnRvIGEgc3RyZWFtIG9mIGBIdHRwRXZlbnRgcywgb25lIG9mIHdoaWNoIHdpbGwgbGlrZWx5IGJlIGFcbiAqIGBIdHRwUmVzcG9uc2VgLlxuICpcbiAqIGBIdHRwSGFuZGxlcmAgaXMgaW5qZWN0YWJsZS4gV2hlbiBpbmplY3RlZCwgdGhlIGhhbmRsZXIgaW5zdGFuY2UgZGlzcGF0Y2hlcyByZXF1ZXN0cyB0byB0aGVcbiAqIGZpcnN0IGludGVyY2VwdG9yIGluIHRoZSBjaGFpbiwgd2hpY2ggZGlzcGF0Y2hlcyB0byB0aGUgc2Vjb25kLCBldGMsIGV2ZW50dWFsbHkgcmVhY2hpbmcgdGhlXG4gKiBgSHR0cEJhY2tlbmRgLlxuICpcbiAqIEluIGFuIGBIdHRwSW50ZXJjZXB0b3JgLCB0aGUgYEh0dHBIYW5kbGVyYCBwYXJhbWV0ZXIgaXMgdGhlIG5leHQgaW50ZXJjZXB0b3IgaW4gdGhlIGNoYWluLlxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0dHBIYW5kbGVyIHtcbiAgYWJzdHJhY3QgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+O1xufVxuXG4vKipcbiAqIEEgZmluYWwgYEh0dHBIYW5kbGVyYCB3aGljaCB3aWxsIGRpc3BhdGNoIHRoZSByZXF1ZXN0IHZpYSBicm93c2VyIEhUVFAgQVBJcyB0byBhIGJhY2tlbmQuXG4gKlxuICogSW50ZXJjZXB0b3JzIHNpdCBiZXR3ZWVuIHRoZSBgSHR0cENsaWVudGAgaW50ZXJmYWNlIGFuZCB0aGUgYEh0dHBCYWNrZW5kYC5cbiAqXG4gKiBXaGVuIGluamVjdGVkLCBgSHR0cEJhY2tlbmRgIGRpc3BhdGNoZXMgcmVxdWVzdHMgZGlyZWN0bHkgdG8gdGhlIGJhY2tlbmQsIHdpdGhvdXQgZ29pbmdcbiAqIHRocm91Z2ggdGhlIGludGVyY2VwdG9yIGNoYWluLlxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0dHBCYWNrZW5kIGltcGxlbWVudHMgSHR0cEhhbmRsZXIge1xuICBhYnN0cmFjdCBoYW5kbGUocmVxOiBIdHRwUmVxdWVzdDxhbnk+KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj47XG59XG4iXX0=