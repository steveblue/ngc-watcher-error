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
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */
export { Inject, Optional, Self, SkipSelf, Host } from './di/metadata';
export { defineInjectable, defineInjector } from './di/defs';
export { forwardRef, resolveForwardRef } from './di/forward_ref';
export { Injectable } from './di/injectable';
export { inject, INJECTOR, Injector } from './di/injector';
export { ReflectiveInjector } from './di/reflective_injector';
export { createInjector } from './di/r3_injector';
export { ResolvedReflectiveFactory } from './di/reflective_provider';
export { ReflectiveKey } from './di/reflective_key';
export { InjectionToken } from './di/injection_token';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBY0EsdURBQWMsZUFBZSxDQUFDO0FBQzlCLGlEQUFjLFdBQVcsQ0FBQztBQUMxQixPQUFPLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFlLE1BQU0sa0JBQWtCLENBQUM7QUFDN0UsT0FBTyxFQUFDLFVBQVUsRUFBMEMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRixPQUFPLEVBQUMsTUFBTSxFQUFlLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFNUQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBQyx5QkFBeUIsRUFBNkIsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHNCQUFzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIGBkaWAgbW9kdWxlIHByb3ZpZGVzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGNvbnRhaW5lciBzZXJ2aWNlcy5cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2RpL21ldGFkYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vZGkvZGVmcyc7XG5leHBvcnQge2ZvcndhcmRSZWYsIHJlc29sdmVGb3J3YXJkUmVmLCBGb3J3YXJkUmVmRm59IGZyb20gJy4vZGkvZm9yd2FyZF9yZWYnO1xuZXhwb3J0IHtJbmplY3RhYmxlLCBJbmplY3RhYmxlRGVjb3JhdG9yLCBJbmplY3RhYmxlUHJvdmlkZXJ9IGZyb20gJy4vZGkvaW5qZWN0YWJsZSc7XG5leHBvcnQge2luamVjdCwgSW5qZWN0RmxhZ3MsIElOSkVDVE9SLCBJbmplY3Rvcn0gZnJvbSAnLi9kaS9pbmplY3Rvcic7XG5leHBvcnQge1JlZmxlY3RpdmVJbmplY3Rvcn0gZnJvbSAnLi9kaS9yZWZsZWN0aXZlX2luamVjdG9yJztcbmV4cG9ydCB7U3RhdGljUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXIsIEV4aXN0aW5nUHJvdmlkZXIsIEZhY3RvcnlQcm92aWRlciwgUHJvdmlkZXIsIFR5cGVQcm92aWRlciwgQ2xhc3NQcm92aWRlcn0gZnJvbSAnLi9kaS9wcm92aWRlcic7XG5leHBvcnQge2NyZWF0ZUluamVjdG9yfSBmcm9tICcuL2RpL3IzX2luamVjdG9yJztcbmV4cG9ydCB7UmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeSwgUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJ9IGZyb20gJy4vZGkvcmVmbGVjdGl2ZV9wcm92aWRlcic7XG5leHBvcnQge1JlZmxlY3RpdmVLZXl9IGZyb20gJy4vZGkvcmVmbGVjdGl2ZV9rZXknO1xuZXhwb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnLi9kaS9pbmplY3Rpb25fdG9rZW4nO1xuIl19