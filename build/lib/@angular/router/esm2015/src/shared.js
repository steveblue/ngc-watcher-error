/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Name of the primary outlet.
 *
 * \@stable
 */
export const /** @type {?} */ PRIMARY_OUTLET = 'primary';
/**
 * Matrix and Query parameters.
 *
 * `ParamMap` makes it easier to work with parameters as they could have either a single value or
 * multiple value. Because this should be known by the user, calling `get` or `getAll` returns the
 * correct type (either `string` or `string[]`).
 *
 * The API is inspired by the URLSearchParams interface.
 * see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 *
 * \@stable
 * @record
 */
export function ParamMap() { }
function ParamMap_tsickle_Closure_declarations() {
    /** @type {?} */
    ParamMap.prototype.has;
    /**
     * Return a single value for the given parameter name:
     * - the value when the parameter has a single value,
     * - the first value if the parameter has multiple values,
     * - `null` when there is no such parameter.
     * @type {?}
     */
    ParamMap.prototype.get;
    /**
     * Return an array of values for the given parameter name.
     *
     * If there is no such parameter, an empty array is returned.
     * @type {?}
     */
    ParamMap.prototype.getAll;
    /**
     * Name of the parameters
     * @type {?}
     */
    ParamMap.prototype.keys;
}
class ParamsAsMap {
    /**
     * @param {?} params
     */
    constructor(params) { this.params = params || {}; }
    /**
     * @param {?} name
     * @return {?}
     */
    has(name) { return this.params.hasOwnProperty(name); }
    /**
     * @param {?} name
     * @return {?}
     */
    get(name) {
        if (this.has(name)) {
            const /** @type {?} */ v = this.params[name];
            return Array.isArray(v) ? v[0] : v;
        }
        return null;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getAll(name) {
        if (this.has(name)) {
            const /** @type {?} */ v = this.params[name];
            return Array.isArray(v) ? v : [v];
        }
        return [];
    }
    /**
     * @return {?}
     */
    get keys() { return Object.keys(this.params); }
}
function ParamsAsMap_tsickle_Closure_declarations() {
    /** @type {?} */
    ParamsAsMap.prototype.params;
}
/**
 * Convert a {\@link Params} instance to a {\@link ParamMap}.
 *
 * \@stable
 * @param {?} params
 * @return {?}
 */
export function convertToParamMap(params) {
    return new ParamsAsMap(params);
}
const /** @type {?} */ NAVIGATION_CANCELING_ERROR = 'ngNavigationCancelingError';
/**
 * @param {?} message
 * @return {?}
 */
export function navigationCancelingError(message) {
    const /** @type {?} */ error = Error('NavigationCancelingError: ' + message);
    (/** @type {?} */ (error))[NAVIGATION_CANCELING_ERROR] = true;
    return error;
}
/**
 * @param {?} error
 * @return {?}
 */
export function isNavigationCancelingError(error) {
    return error && (/** @type {?} */ (error))[NAVIGATION_CANCELING_ERROR];
}
/**
 * @param {?} segments
 * @param {?} segmentGroup
 * @param {?} route
 * @return {?}
 */
export function defaultUrlMatcher(segments, segmentGroup, route) {
    const /** @type {?} */ parts = /** @type {?} */ ((route.path)).split('/');
    if (parts.length > segments.length) {
        // The actual URL is shorter than the config, no match
        return null;
    }
    if (route.pathMatch === 'full' &&
        (segmentGroup.hasChildren() || parts.length < segments.length)) {
        // The config is longer than the actual URL but we are looking for a full match, return null
        return null;
    }
    const /** @type {?} */ posParams = {};
    // Check each config part against the actual URL
    for (let /** @type {?} */ index = 0; index < parts.length; index++) {
        const /** @type {?} */ part = parts[index];
        const /** @type {?} */ segment = segments[index];
        const /** @type {?} */ isParameter = part.startsWith(':');
        if (isParameter) {
            posParams[part.substring(1)] = segment;
        }
        else if (part !== segment.path) {
            // The actual URL part does not match the config, no match
            return null;
        }
    }
    return { consumed: segments.slice(0, parts.length), posParams };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9zaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxNQUFNLENBQUMsdUJBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkN4Qzs7OztJQUdFLFlBQVksTUFBYyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzs7OztJQUUzRCxHQUFHLENBQUMsSUFBWSxJQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7OztJQUV2RSxHQUFHLENBQUMsSUFBWTtRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLHVCQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBWTtRQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQix1QkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUNYOzs7O0lBRUQsSUFBSSxJQUFJLEtBQWUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7Q0FDMUQ7Ozs7Ozs7Ozs7OztBQU9ELE1BQU0sNEJBQTRCLE1BQWM7SUFDOUMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ2hDO0FBRUQsdUJBQU0sMEJBQTBCLEdBQUcsNEJBQTRCLENBQUM7Ozs7O0FBRWhFLE1BQU0sbUNBQW1DLE9BQWU7SUFDdEQsdUJBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyw0QkFBNEIsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUM1RCxtQkFBQyxLQUFZLEVBQUMsQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDO0NBQ2Q7Ozs7O0FBRUQsTUFBTSxxQ0FBcUMsS0FBWTtJQUNyRCxNQUFNLENBQUMsS0FBSyxJQUFJLG1CQUFDLEtBQVksRUFBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Q0FDNUQ7Ozs7Ozs7QUFHRCxNQUFNLDRCQUNGLFFBQXNCLEVBQUUsWUFBNkIsRUFBRSxLQUFZO0lBQ3JFLHVCQUFNLEtBQUssc0JBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7UUFFbkMsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiO0lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxNQUFNO1FBQzFCLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFFbkUsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiO0lBRUQsdUJBQU0sU0FBUyxHQUFnQyxFQUFFLENBQUM7O0lBR2xELEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUNsRCx1QkFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLHVCQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsdUJBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztTQUN4QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBRWpDLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtLQUNGO0lBRUQsTUFBTSxDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUMsQ0FBQztDQUMvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSb3V0ZSwgVXJsTWF0Y2hSZXN1bHR9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7VXJsU2VnbWVudCwgVXJsU2VnbWVudEdyb3VwfSBmcm9tICcuL3VybF90cmVlJztcblxuXG4vKipcbiAqIEB3aGF0SXREb2VzIE5hbWUgb2YgdGhlIHByaW1hcnkgb3V0bGV0LlxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGNvbnN0IFBSSU1BUllfT1VUTEVUID0gJ3ByaW1hcnknO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBwYXJhbWV0ZXJzLlxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IHR5cGUgUGFyYW1zID0ge1xuICBba2V5OiBzdHJpbmddOiBhbnlcbn07XG5cbi8qKlxuICogTWF0cml4IGFuZCBRdWVyeSBwYXJhbWV0ZXJzLlxuICpcbiAqIGBQYXJhbU1hcGAgbWFrZXMgaXQgZWFzaWVyIHRvIHdvcmsgd2l0aCBwYXJhbWV0ZXJzIGFzIHRoZXkgY291bGQgaGF2ZSBlaXRoZXIgYSBzaW5nbGUgdmFsdWUgb3JcbiAqIG11bHRpcGxlIHZhbHVlLiBCZWNhdXNlIHRoaXMgc2hvdWxkIGJlIGtub3duIGJ5IHRoZSB1c2VyLCBjYWxsaW5nIGBnZXRgIG9yIGBnZXRBbGxgIHJldHVybnMgdGhlXG4gKiBjb3JyZWN0IHR5cGUgKGVpdGhlciBgc3RyaW5nYCBvciBgc3RyaW5nW11gKS5cbiAqXG4gKiBUaGUgQVBJIGlzIGluc3BpcmVkIGJ5IHRoZSBVUkxTZWFyY2hQYXJhbXMgaW50ZXJmYWNlLlxuICogc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9VUkxTZWFyY2hQYXJhbXNcbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFyYW1NYXAge1xuICBoYXMobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFJldHVybiBhIHNpbmdsZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIHBhcmFtZXRlciBuYW1lOlxuICAgKiAtIHRoZSB2YWx1ZSB3aGVuIHRoZSBwYXJhbWV0ZXIgaGFzIGEgc2luZ2xlIHZhbHVlLFxuICAgKiAtIHRoZSBmaXJzdCB2YWx1ZSBpZiB0aGUgcGFyYW1ldGVyIGhhcyBtdWx0aXBsZSB2YWx1ZXMsXG4gICAqIC0gYG51bGxgIHdoZW4gdGhlcmUgaXMgbm8gc3VjaCBwYXJhbWV0ZXIuXG4gICAqL1xuICBnZXQobmFtZTogc3RyaW5nKTogc3RyaW5nfG51bGw7XG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgb2YgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gcGFyYW1ldGVyIG5hbWUuXG4gICAqXG4gICAqIElmIHRoZXJlIGlzIG5vIHN1Y2ggcGFyYW1ldGVyLCBhbiBlbXB0eSBhcnJheSBpcyByZXR1cm5lZC5cbiAgICovXG4gIGdldEFsbChuYW1lOiBzdHJpbmcpOiBzdHJpbmdbXTtcblxuICAvKiogTmFtZSBvZiB0aGUgcGFyYW1ldGVycyAqL1xuICByZWFkb25seSBrZXlzOiBzdHJpbmdbXTtcbn1cblxuY2xhc3MgUGFyYW1zQXNNYXAgaW1wbGVtZW50cyBQYXJhbU1hcCB7XG4gIHByaXZhdGUgcGFyYW1zOiBQYXJhbXM7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiBQYXJhbXMpIHsgdGhpcy5wYXJhbXMgPSBwYXJhbXMgfHwge307IH1cblxuICBoYXMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShuYW1lKTsgfVxuXG4gIGdldChuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gICAgaWYgKHRoaXMuaGFzKG5hbWUpKSB7XG4gICAgICBjb25zdCB2ID0gdGhpcy5wYXJhbXNbbmFtZV07XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2KSA/IHZbMF0gOiB2O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0QWxsKG5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5oYXMobmFtZSkpIHtcbiAgICAgIGNvbnN0IHYgPSB0aGlzLnBhcmFtc1tuYW1lXTtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHYpID8gdiA6IFt2XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXQga2V5cygpOiBzdHJpbmdbXSB7IHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnBhcmFtcyk7IH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEge0BsaW5rIFBhcmFtc30gaW5zdGFuY2UgdG8gYSB7QGxpbmsgUGFyYW1NYXB9LlxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1BhcmFtTWFwKHBhcmFtczogUGFyYW1zKTogUGFyYW1NYXAge1xuICByZXR1cm4gbmV3IFBhcmFtc0FzTWFwKHBhcmFtcyk7XG59XG5cbmNvbnN0IE5BVklHQVRJT05fQ0FOQ0VMSU5HX0VSUk9SID0gJ25nTmF2aWdhdGlvbkNhbmNlbGluZ0Vycm9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpb25DYW5jZWxpbmdFcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgY29uc3QgZXJyb3IgPSBFcnJvcignTmF2aWdhdGlvbkNhbmNlbGluZ0Vycm9yOiAnICsgbWVzc2FnZSk7XG4gIChlcnJvciBhcyBhbnkpW05BVklHQVRJT05fQ0FOQ0VMSU5HX0VSUk9SXSA9IHRydWU7XG4gIHJldHVybiBlcnJvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTmF2aWdhdGlvbkNhbmNlbGluZ0Vycm9yKGVycm9yOiBFcnJvcikge1xuICByZXR1cm4gZXJyb3IgJiYgKGVycm9yIGFzIGFueSlbTkFWSUdBVElPTl9DQU5DRUxJTkdfRVJST1JdO1xufVxuXG4vLyBNYXRjaGVzIHRoZSByb3V0ZSBjb25maWd1cmF0aW9uIChgcm91dGVgKSBhZ2FpbnN0IHRoZSBhY3R1YWwgVVJMIChgc2VnbWVudHNgKS5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0VXJsTWF0Y2hlcihcbiAgICBzZWdtZW50czogVXJsU2VnbWVudFtdLCBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCwgcm91dGU6IFJvdXRlKTogVXJsTWF0Y2hSZXN1bHR8bnVsbCB7XG4gIGNvbnN0IHBhcnRzID0gcm91dGUucGF0aCAhLnNwbGl0KCcvJyk7XG5cbiAgaWYgKHBhcnRzLmxlbmd0aCA+IHNlZ21lbnRzLmxlbmd0aCkge1xuICAgIC8vIFRoZSBhY3R1YWwgVVJMIGlzIHNob3J0ZXIgdGhhbiB0aGUgY29uZmlnLCBubyBtYXRjaFxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHJvdXRlLnBhdGhNYXRjaCA9PT0gJ2Z1bGwnICYmXG4gICAgICAoc2VnbWVudEdyb3VwLmhhc0NoaWxkcmVuKCkgfHwgcGFydHMubGVuZ3RoIDwgc2VnbWVudHMubGVuZ3RoKSkge1xuICAgIC8vIFRoZSBjb25maWcgaXMgbG9uZ2VyIHRoYW4gdGhlIGFjdHVhbCBVUkwgYnV0IHdlIGFyZSBsb29raW5nIGZvciBhIGZ1bGwgbWF0Y2gsIHJldHVybiBudWxsXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBwb3NQYXJhbXM6IHtba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50fSA9IHt9O1xuXG4gIC8vIENoZWNrIGVhY2ggY29uZmlnIHBhcnQgYWdhaW5zdCB0aGUgYWN0dWFsIFVSTFxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGFydHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgcGFydCA9IHBhcnRzW2luZGV4XTtcbiAgICBjb25zdCBzZWdtZW50ID0gc2VnbWVudHNbaW5kZXhdO1xuICAgIGNvbnN0IGlzUGFyYW1ldGVyID0gcGFydC5zdGFydHNXaXRoKCc6Jyk7XG4gICAgaWYgKGlzUGFyYW1ldGVyKSB7XG4gICAgICBwb3NQYXJhbXNbcGFydC5zdWJzdHJpbmcoMSldID0gc2VnbWVudDtcbiAgICB9IGVsc2UgaWYgKHBhcnQgIT09IHNlZ21lbnQucGF0aCkge1xuICAgICAgLy8gVGhlIGFjdHVhbCBVUkwgcGFydCBkb2VzIG5vdCBtYXRjaCB0aGUgY29uZmlnLCBubyBtYXRjaFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtjb25zdW1lZDogc2VnbWVudHMuc2xpY2UoMCwgcGFydHMubGVuZ3RoKSwgcG9zUGFyYW1zfTtcbn1cbiJdfQ==