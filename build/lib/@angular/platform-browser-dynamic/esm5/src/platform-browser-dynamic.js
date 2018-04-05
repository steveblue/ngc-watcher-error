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
export * from './private_export';
export { VERSION } from './version';
export { JitCompilerFactory } from './compiler_factory';
/**
 * @experimental
 */
export var RESOURCE_CACHE_PROVIDER = [{ provide: ResourceLoader, useClass: CachedResourceLoader, deps: [] }];
/**
 * @stable
 */
export var platformBrowserDynamic = createPlatformFactory(platformCoreDynamic, 'browserDynamic', INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tYnJvd3Nlci1keW5hbWljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3NyYy9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQXlELHFCQUFxQixFQUFlLE1BQU0sZUFBZSxDQUFDO0FBRTFILE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQywyQ0FBMkMsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBRTdFLGNBQWMsa0JBQWtCLENBQUM7QUFDakMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUt0RCxNQUFNLENBQUMsSUFBTSx1QkFBdUIsR0FDaEMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDOzs7O0FBSzFFLE1BQU0sQ0FBQyxJQUFNLHNCQUFzQixHQUFHLHFCQUFxQixDQUN2RCxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSwyQ0FBMkMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1Jlc291cmNlTG9hZGVyfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQge0NvbXBpbGVyRmFjdG9yeSwgUGxhdGZvcm1SZWYsIFByb3ZpZGVyLCBTdGF0aWNQcm92aWRlciwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBwbGF0Zm9ybUNvcmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge3BsYXRmb3JtQ29yZUR5bmFtaWN9IGZyb20gJy4vcGxhdGZvcm1fY29yZV9keW5hbWljJztcbmltcG9ydCB7SU5URVJOQUxfQlJPV1NFUl9EWU5BTUlDX1BMQVRGT1JNX1BST1ZJREVSU30gZnJvbSAnLi9wbGF0Zm9ybV9wcm92aWRlcnMnO1xuaW1wb3J0IHtDYWNoZWRSZXNvdXJjZUxvYWRlcn0gZnJvbSAnLi9yZXNvdXJjZV9sb2FkZXIvcmVzb3VyY2VfbG9hZGVyX2NhY2hlJztcblxuZXhwb3J0ICogZnJvbSAnLi9wcml2YXRlX2V4cG9ydCc7XG5leHBvcnQge1ZFUlNJT059IGZyb20gJy4vdmVyc2lvbic7XG5leHBvcnQge0ppdENvbXBpbGVyRmFjdG9yeX0gZnJvbSAnLi9jb21waWxlcl9mYWN0b3J5JztcblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjb25zdCBSRVNPVVJDRV9DQUNIRV9QUk9WSURFUjogUHJvdmlkZXJbXSA9XG4gICAgW3twcm92aWRlOiBSZXNvdXJjZUxvYWRlciwgdXNlQ2xhc3M6IENhY2hlZFJlc291cmNlTG9hZGVyLCBkZXBzOiBbXX1dO1xuXG4vKipcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgPSBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkoXG4gICAgcGxhdGZvcm1Db3JlRHluYW1pYywgJ2Jyb3dzZXJEeW5hbWljJywgSU5URVJOQUxfQlJPV1NFUl9EWU5BTUlDX1BMQVRGT1JNX1BST1ZJREVSUyk7XG4iXX0=