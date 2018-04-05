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
 * @record
 */
export function LInjector() { }
function LInjector_tsickle_Closure_declarations() {
    /**
     * We need to store a reference to the injector's parent so DI can keep looking up
     * the injector tree until it finds the dependency it's looking for.
     * @type {?}
     */
    LInjector.prototype.parent;
    /**
     * Allows access to the directives array in that node's static data and to
     * the node's flags (for starting directive index and directive size). Necessary
     * for DI to retrieve a directive from the data array if injector indicates
     * it is there.
     * @type {?}
     */
    LInjector.prototype.node;
    /**
     * The following bloom filter determines whether a directive is available
     * on the associated node or not. This prevents us from searching the directives
     * array at this level unless it's probable the directive is in it.
     *
     * - bf0: Check directive IDs 0-31  (IDs are % 128)
     * - bf1: Check directive IDs 32-63
     * - bf2: Check directive IDs 64-95
     * - bf3: Check directive IDs 96-127
     * - bf4: Check directive IDs 128-159
     * - bf5: Check directive IDs 160 - 191
     * - bf6: Check directive IDs 192 - 223
     * - bf7: Check directive IDs 224 - 255
     *
     * See: https://en.wikipedia.org/wiki/Bloom_filter for more about bloom filters.
     * @type {?}
     */
    LInjector.prototype.bf0;
    /** @type {?} */
    LInjector.prototype.bf1;
    /** @type {?} */
    LInjector.prototype.bf2;
    /** @type {?} */
    LInjector.prototype.bf3;
    /** @type {?} */
    LInjector.prototype.bf4;
    /** @type {?} */
    LInjector.prototype.bf5;
    /** @type {?} */
    LInjector.prototype.bf6;
    /** @type {?} */
    LInjector.prototype.bf7;
    /**
     * cbf0 - cbf7 properties determine whether a directive is available through a
     * parent injector. They refer to the merged values of parent bloom filters. This
     * allows us to skip looking up the chain unless it's probable that directive exists
     * up the chain.
     * @type {?}
     */
    LInjector.prototype.cbf0;
    /** @type {?} */
    LInjector.prototype.cbf1;
    /** @type {?} */
    LInjector.prototype.cbf2;
    /** @type {?} */
    LInjector.prototype.cbf3;
    /** @type {?} */
    LInjector.prototype.cbf4;
    /** @type {?} */
    LInjector.prototype.cbf5;
    /** @type {?} */
    LInjector.prototype.cbf6;
    /** @type {?} */
    LInjector.prototype.cbf7;
    /** @type {?} */
    LInjector.prototype.injector;
    /**
     * Stores the TemplateRef so subsequent injections of the TemplateRef get the same instance.
     * @type {?}
     */
    LInjector.prototype.templateRef;
    /**
     * Stores the ViewContainerRef so subsequent injections of the ViewContainerRef get the same
     * instance.
     * @type {?}
     */
    LInjector.prototype.viewContainerRef;
    /**
     * Stores the ElementRef so subsequent injections of the ElementRef get the same instance.
     * @type {?}
     */
    LInjector.prototype.elementRef;
    /**
     * Stores the ChangeDetectorRef so subsequent injections of the ChangeDetectorRef get the
     * same instance.
     * @type {?}
     */
    LInjector.prototype.changeDetectorRef;
}
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export const /** @type {?} */ unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEZBLE1BQU0sQ0FBQyx1QkFBTSw2QkFBNkIsR0FBRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJy4uLy4uL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdG9yX3JlZic7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuLi8uLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJy4uLy4uL2xpbmtlci9lbGVtZW50X3JlZic7XG5pbXBvcnQge1RlbXBsYXRlUmVmfSBmcm9tICcuLi8uLi9saW5rZXIvdGVtcGxhdGVfcmVmJztcbmltcG9ydCB7Vmlld0NvbnRhaW5lclJlZn0gZnJvbSAnLi4vLi4vbGlua2VyL3ZpZXdfY29udGFpbmVyX3JlZic7XG5cbmltcG9ydCB7TENvbnRhaW5lck5vZGUsIExFbGVtZW50Tm9kZX0gZnJvbSAnLi9ub2RlJztcblxuZXhwb3J0IGludGVyZmFjZSBMSW5qZWN0b3Ige1xuICAvKipcbiAgICogV2UgbmVlZCB0byBzdG9yZSBhIHJlZmVyZW5jZSB0byB0aGUgaW5qZWN0b3IncyBwYXJlbnQgc28gREkgY2FuIGtlZXAgbG9va2luZyB1cFxuICAgKiB0aGUgaW5qZWN0b3IgdHJlZSB1bnRpbCBpdCBmaW5kcyB0aGUgZGVwZW5kZW5jeSBpdCdzIGxvb2tpbmcgZm9yLlxuICAgKi9cbiAgcmVhZG9ubHkgcGFyZW50OiBMSW5qZWN0b3J8bnVsbDtcblxuICAvKipcbiAgICogQWxsb3dzIGFjY2VzcyB0byB0aGUgZGlyZWN0aXZlcyBhcnJheSBpbiB0aGF0IG5vZGUncyBzdGF0aWMgZGF0YSBhbmQgdG9cbiAgICogdGhlIG5vZGUncyBmbGFncyAoZm9yIHN0YXJ0aW5nIGRpcmVjdGl2ZSBpbmRleCBhbmQgZGlyZWN0aXZlIHNpemUpLiBOZWNlc3NhcnlcbiAgICogZm9yIERJIHRvIHJldHJpZXZlIGEgZGlyZWN0aXZlIGZyb20gdGhlIGRhdGEgYXJyYXkgaWYgaW5qZWN0b3IgaW5kaWNhdGVzXG4gICAqIGl0IGlzIHRoZXJlLlxuICAgKi9cbiAgcmVhZG9ubHkgbm9kZTogTEVsZW1lbnROb2RlfExDb250YWluZXJOb2RlO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9sbG93aW5nIGJsb29tIGZpbHRlciBkZXRlcm1pbmVzIHdoZXRoZXIgYSBkaXJlY3RpdmUgaXMgYXZhaWxhYmxlXG4gICAqIG9uIHRoZSBhc3NvY2lhdGVkIG5vZGUgb3Igbm90LiBUaGlzIHByZXZlbnRzIHVzIGZyb20gc2VhcmNoaW5nIHRoZSBkaXJlY3RpdmVzXG4gICAqIGFycmF5IGF0IHRoaXMgbGV2ZWwgdW5sZXNzIGl0J3MgcHJvYmFibGUgdGhlIGRpcmVjdGl2ZSBpcyBpbiBpdC5cbiAgICpcbiAgICogLSBiZjA6IENoZWNrIGRpcmVjdGl2ZSBJRHMgMC0zMSAgKElEcyBhcmUgJSAxMjgpXG4gICAqIC0gYmYxOiBDaGVjayBkaXJlY3RpdmUgSURzIDMyLTYzXG4gICAqIC0gYmYyOiBDaGVjayBkaXJlY3RpdmUgSURzIDY0LTk1XG4gICAqIC0gYmYzOiBDaGVjayBkaXJlY3RpdmUgSURzIDk2LTEyN1xuICAgKiAtIGJmNDogQ2hlY2sgZGlyZWN0aXZlIElEcyAxMjgtMTU5XG4gICAqIC0gYmY1OiBDaGVjayBkaXJlY3RpdmUgSURzIDE2MCAtIDE5MVxuICAgKiAtIGJmNjogQ2hlY2sgZGlyZWN0aXZlIElEcyAxOTIgLSAyMjNcbiAgICogLSBiZjc6IENoZWNrIGRpcmVjdGl2ZSBJRHMgMjI0IC0gMjU1XG4gICAqXG4gICAqIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmxvb21fZmlsdGVyIGZvciBtb3JlIGFib3V0IGJsb29tIGZpbHRlcnMuXG4gICAqL1xuICBiZjA6IG51bWJlcjtcbiAgYmYxOiBudW1iZXI7XG4gIGJmMjogbnVtYmVyO1xuICBiZjM6IG51bWJlcjtcbiAgYmY0OiBudW1iZXI7XG4gIGJmNTogbnVtYmVyO1xuICBiZjY6IG51bWJlcjtcbiAgYmY3OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIGNiZjAgLSBjYmY3IHByb3BlcnRpZXMgZGV0ZXJtaW5lIHdoZXRoZXIgYSBkaXJlY3RpdmUgaXMgYXZhaWxhYmxlIHRocm91Z2ggYVxuICAgKiBwYXJlbnQgaW5qZWN0b3IuIFRoZXkgcmVmZXIgdG8gdGhlIG1lcmdlZCB2YWx1ZXMgb2YgcGFyZW50IGJsb29tIGZpbHRlcnMuIFRoaXNcbiAgICogYWxsb3dzIHVzIHRvIHNraXAgbG9va2luZyB1cCB0aGUgY2hhaW4gdW5sZXNzIGl0J3MgcHJvYmFibGUgdGhhdCBkaXJlY3RpdmUgZXhpc3RzXG4gICAqIHVwIHRoZSBjaGFpbi5cbiAgICovXG4gIGNiZjA6IG51bWJlcjtcbiAgY2JmMTogbnVtYmVyO1xuICBjYmYyOiBudW1iZXI7XG4gIGNiZjM6IG51bWJlcjtcbiAgY2JmNDogbnVtYmVyO1xuICBjYmY1OiBudW1iZXI7XG4gIGNiZjY6IG51bWJlcjtcbiAgY2JmNzogbnVtYmVyO1xuXG4gIGluamVjdG9yOiBJbmplY3RvcnxudWxsO1xuXG4gIC8qKiBTdG9yZXMgdGhlIFRlbXBsYXRlUmVmIHNvIHN1YnNlcXVlbnQgaW5qZWN0aW9ucyBvZiB0aGUgVGVtcGxhdGVSZWYgZ2V0IHRoZSBzYW1lIGluc3RhbmNlLiAqL1xuICB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PnxudWxsO1xuXG4gIC8qKiBTdG9yZXMgdGhlIFZpZXdDb250YWluZXJSZWYgc28gc3Vic2VxdWVudCBpbmplY3Rpb25zIG9mIHRoZSBWaWV3Q29udGFpbmVyUmVmIGdldCB0aGUgc2FtZVxuICAgKiBpbnN0YW5jZS4gKi9cbiAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZnxudWxsO1xuXG4gIC8qKiBTdG9yZXMgdGhlIEVsZW1lbnRSZWYgc28gc3Vic2VxdWVudCBpbmplY3Rpb25zIG9mIHRoZSBFbGVtZW50UmVmIGdldCB0aGUgc2FtZSBpbnN0YW5jZS4gKi9cbiAgZWxlbWVudFJlZjogRWxlbWVudFJlZnxudWxsO1xuXG4gIC8qKlxuICAgKiBTdG9yZXMgdGhlIENoYW5nZURldGVjdG9yUmVmIHNvIHN1YnNlcXVlbnQgaW5qZWN0aW9ucyBvZiB0aGUgQ2hhbmdlRGV0ZWN0b3JSZWYgZ2V0IHRoZVxuICAgKiBzYW1lIGluc3RhbmNlLlxuICAgKi9cbiAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmfG51bGw7XG59XG5cbi8vIE5vdGU6IFRoaXMgaGFjayBpcyBuZWNlc3Nhcnkgc28gd2UgZG9uJ3QgZXJyb25lb3VzbHkgZ2V0IGEgY2lyY3VsYXIgZGVwZW5kZW5jeVxuLy8gZmFpbHVyZSBiYXNlZCBvbiB0eXBlcy5cbmV4cG9ydCBjb25zdCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCA9IDE7XG4iXX0=