/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @whatItDoes Provides a way to migrate AngularJS applications to Angular.
 *
 * @experimental
 */
var /**
 * @whatItDoes Provides a way to migrate AngularJS applications to Angular.
 *
 * @experimental
 */
UrlHandlingStrategy = /** @class */ (function () {
    function UrlHandlingStrategy() {
    }
    return UrlHandlingStrategy;
}());
/**
 * @whatItDoes Provides a way to migrate AngularJS applications to Angular.
 *
 * @experimental
 */
export { UrlHandlingStrategy };
/**
 * @experimental
 */
var /**
 * @experimental
 */
DefaultUrlHandlingStrategy = /** @class */ (function () {
    function DefaultUrlHandlingStrategy() {
    }
    DefaultUrlHandlingStrategy.prototype.shouldProcessUrl = function (url) { return true; };
    DefaultUrlHandlingStrategy.prototype.extract = function (url) { return url; };
    DefaultUrlHandlingStrategy.prototype.merge = function (newUrlPart, wholeUrl) { return newUrlPart; };
    return DefaultUrlHandlingStrategy;
}());
/**
 * @experimental
 */
export { DefaultUrlHandlingStrategy };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX2hhbmRsaW5nX3N0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy91cmxfaGFuZGxpbmdfc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBZUE7Ozs7O0FBQUE7Ozs4QkFmQTtJQW9DQyxDQUFBOzs7Ozs7QUFyQkQsK0JBcUJDOzs7O0FBS0Q7OztBQUFBOzs7SUFDRSxxREFBZ0IsR0FBaEIsVUFBaUIsR0FBWSxJQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUN4RCw0Q0FBTyxHQUFQLFVBQVEsR0FBWSxJQUFhLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtJQUM5QywwQ0FBSyxHQUFMLFVBQU0sVUFBbUIsRUFBRSxRQUFpQixJQUFhLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtxQ0E1Qy9FO0lBNkNDLENBQUE7Ozs7QUFKRCxzQ0FJQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtVcmxUcmVlfSBmcm9tICcuL3VybF90cmVlJztcblxuLyoqXG4gKiBAd2hhdEl0RG9lcyBQcm92aWRlcyBhIHdheSB0byBtaWdyYXRlIEFuZ3VsYXJKUyBhcHBsaWNhdGlvbnMgdG8gQW5ndWxhci5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVcmxIYW5kbGluZ1N0cmF0ZWd5IHtcbiAgLyoqXG4gICAqIFRlbGxzIHRoZSByb3V0ZXIgaWYgdGhpcyBVUkwgc2hvdWxkIGJlIHByb2Nlc3NlZC5cbiAgICpcbiAgICogV2hlbiBpdCByZXR1cm5zIHRydWUsIHRoZSByb3V0ZXIgd2lsbCBleGVjdXRlIHRoZSByZWd1bGFyIG5hdmlnYXRpb24uXG4gICAqIFdoZW4gaXQgcmV0dXJucyBmYWxzZSwgdGhlIHJvdXRlciB3aWxsIHNldCB0aGUgcm91dGVyIHN0YXRlIHRvIGFuIGVtcHR5IHN0YXRlLlxuICAgKiBBcyBhIHJlc3VsdCwgYWxsIHRoZSBhY3RpdmUgY29tcG9uZW50cyB3aWxsIGJlIGRlc3Ryb3llZC5cbiAgICpcbiAgICovXG4gIGFic3RyYWN0IHNob3VsZFByb2Nlc3NVcmwodXJsOiBVcmxUcmVlKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXh0cmFjdHMgdGhlIHBhcnQgb2YgdGhlIFVSTCB0aGF0IHNob3VsZCBiZSBoYW5kbGVkIGJ5IHRoZSByb3V0ZXIuXG4gICAqIFRoZSByZXN0IG9mIHRoZSBVUkwgd2lsbCByZW1haW4gdW50b3VjaGVkLlxuICAgKi9cbiAgYWJzdHJhY3QgZXh0cmFjdCh1cmw6IFVybFRyZWUpOiBVcmxUcmVlO1xuXG4gIC8qKlxuICAgKiBNZXJnZXMgdGhlIFVSTCBmcmFnbWVudCB3aXRoIHRoZSByZXN0IG9mIHRoZSBVUkwuXG4gICAqL1xuICBhYnN0cmFjdCBtZXJnZShuZXdVcmxQYXJ0OiBVcmxUcmVlLCByYXdVcmw6IFVybFRyZWUpOiBVcmxUcmVlO1xufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRVcmxIYW5kbGluZ1N0cmF0ZWd5IGltcGxlbWVudHMgVXJsSGFuZGxpbmdTdHJhdGVneSB7XG4gIHNob3VsZFByb2Nlc3NVcmwodXJsOiBVcmxUcmVlKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XG4gIGV4dHJhY3QodXJsOiBVcmxUcmVlKTogVXJsVHJlZSB7IHJldHVybiB1cmw7IH1cbiAgbWVyZ2UobmV3VXJsUGFydDogVXJsVHJlZSwgd2hvbGVVcmw6IFVybFRyZWUpOiBVcmxUcmVlIHsgcmV0dXJuIG5ld1VybFBhcnQ7IH1cbn0iXX0=