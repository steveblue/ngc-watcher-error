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
import { ResourceLoader } from '@angular/compiler';
import { createPlatformFactory } from '@angular/core';
import { platformCoreDynamic } from './platform_core_dynamic';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from './platform_providers';
import { CachedResourceLoader } from './resource_loader/resource_loader_cache';
export { ɵCompilerImpl, ɵplatformCoreDynamic, ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, ɵResourceLoaderImpl } from './private_export';
export { VERSION } from './version';
export { JitCompilerFactory } from './compiler_factory';
/**
 * \@experimental
 */
export const /** @type {?} */ RESOURCE_CACHE_PROVIDER = [{ provide: ResourceLoader, useClass: CachedResourceLoader, deps: [] }];
/**
 * \@stable
 */
export const /** @type {?} */ platformBrowserDynamic = createPlatformFactory(platformCoreDynamic, 'browserDynamic', INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tYnJvd3Nlci1keW5hbWljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3NyYy9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUF5RCxxQkFBcUIsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUUxSCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsMkNBQTJDLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUU3RSx1SEFBYyxrQkFBa0IsQ0FBQztBQUNqQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7O0FBS3RELE1BQU0sQ0FBQyx1QkFBTSx1QkFBdUIsR0FDaEMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDOzs7O0FBSzFFLE1BQU0sQ0FBQyx1QkFBTSxzQkFBc0IsR0FBRyxxQkFBcUIsQ0FDdkQsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsMkNBQTJDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSZXNvdXJjZUxvYWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHtDb21waWxlckZhY3RvcnksIFBsYXRmb3JtUmVmLCBQcm92aWRlciwgU3RhdGljUHJvdmlkZXIsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgcGxhdGZvcm1Db3JlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtwbGF0Zm9ybUNvcmVEeW5hbWljfSBmcm9tICcuL3BsYXRmb3JtX2NvcmVfZHluYW1pYyc7XG5pbXBvcnQge0lOVEVSTkFMX0JST1dTRVJfRFlOQU1JQ19QTEFURk9STV9QUk9WSURFUlN9IGZyb20gJy4vcGxhdGZvcm1fcHJvdmlkZXJzJztcbmltcG9ydCB7Q2FjaGVkUmVzb3VyY2VMb2FkZXJ9IGZyb20gJy4vcmVzb3VyY2VfbG9hZGVyL3Jlc291cmNlX2xvYWRlcl9jYWNoZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vcHJpdmF0ZV9leHBvcnQnO1xuZXhwb3J0IHtWRVJTSU9OfSBmcm9tICcuL3ZlcnNpb24nO1xuZXhwb3J0IHtKaXRDb21waWxlckZhY3Rvcnl9IGZyb20gJy4vY29tcGlsZXJfZmFjdG9yeSc7XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY29uc3QgUkVTT1VSQ0VfQ0FDSEVfUFJPVklERVI6IFByb3ZpZGVyW10gPVxuICAgIFt7cHJvdmlkZTogUmVzb3VyY2VMb2FkZXIsIHVzZUNsYXNzOiBDYWNoZWRSZXNvdXJjZUxvYWRlciwgZGVwczogW119XTtcblxuLyoqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljID0gY3JlYXRlUGxhdGZvcm1GYWN0b3J5KFxuICAgIHBsYXRmb3JtQ29yZUR5bmFtaWMsICdicm93c2VyRHluYW1pYycsIElOVEVSTkFMX0JST1dTRVJfRFlOQU1JQ19QTEFURk9STV9QUk9WSURFUlMpO1xuIl19