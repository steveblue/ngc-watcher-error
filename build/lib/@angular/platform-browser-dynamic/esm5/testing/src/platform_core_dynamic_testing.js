/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { COMPILER_OPTIONS, CompilerFactory, Injector, createPlatformFactory } from '@angular/core';
import { ɵTestingCompilerFactory as TestingCompilerFactory } from '@angular/core/testing';
import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';
import { COMPILER_PROVIDERS, TestingCompilerFactoryImpl } from './compiler_factory';
/**
 * Platform for dynamic tests
 *
 * @experimental
 */
export var platformCoreDynamicTesting = createPlatformFactory(platformCoreDynamic, 'coreDynamicTesting', [
    { provide: COMPILER_OPTIONS, useValue: { providers: COMPILER_PROVIDERS }, multi: true }, {
        provide: TestingCompilerFactory,
        useClass: TestingCompilerFactoryImpl,
        deps: [Injector, CompilerFactory]
    }
]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fY29yZV9keW5hbWljX3Rlc3RpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvdGVzdGluZy9zcmMvcGxhdGZvcm1fY29yZV9keW5hbWljX3Rlc3RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUErQixxQkFBcUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5SCxPQUFPLEVBQXdCLHVCQUF1QixJQUFJLHNCQUFzQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0csT0FBTyxFQUFDLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFOUYsT0FBTyxFQUFDLGtCQUFrQixFQUFFLDBCQUEwQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztBQU9sRixNQUFNLENBQUMsSUFBTSwwQkFBMEIsR0FDbkMscUJBQXFCLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUU7SUFDL0QsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxFQUFFO1FBQ25GLE9BQU8sRUFBRSxzQkFBc0I7UUFDL0IsUUFBUSxFQUFFLDBCQUEwQjtRQUNwQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDO0tBQ2xDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NPTVBJTEVSX09QVElPTlMsIENvbXBpbGVyRmFjdG9yeSwgSW5qZWN0b3IsIFBsYXRmb3JtUmVmLCBTdGF0aWNQcm92aWRlciwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VGVzdENvbXBvbmVudFJlbmRlcmVyLCDJtVRlc3RpbmdDb21waWxlckZhY3RvcnkgYXMgVGVzdGluZ0NvbXBpbGVyRmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7ybVwbGF0Zm9ybUNvcmVEeW5hbWljIGFzIHBsYXRmb3JtQ29yZUR5bmFtaWN9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYyc7XG5cbmltcG9ydCB7Q09NUElMRVJfUFJPVklERVJTLCBUZXN0aW5nQ29tcGlsZXJGYWN0b3J5SW1wbH0gZnJvbSAnLi9jb21waWxlcl9mYWN0b3J5JztcblxuLyoqXG4gKiBQbGF0Zm9ybSBmb3IgZHluYW1pYyB0ZXN0c1xuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQ29yZUR5bmFtaWNUZXN0aW5nOiAoZXh0cmFQcm92aWRlcnM/OiBhbnlbXSkgPT4gUGxhdGZvcm1SZWYgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmVEeW5hbWljLCAnY29yZUR5bmFtaWNUZXN0aW5nJywgW1xuICAgICAge3Byb3ZpZGU6IENPTVBJTEVSX09QVElPTlMsIHVzZVZhbHVlOiB7cHJvdmlkZXJzOiBDT01QSUxFUl9QUk9WSURFUlN9LCBtdWx0aTogdHJ1ZX0sIHtcbiAgICAgICAgcHJvdmlkZTogVGVzdGluZ0NvbXBpbGVyRmFjdG9yeSxcbiAgICAgICAgdXNlQ2xhc3M6IFRlc3RpbmdDb21waWxlckZhY3RvcnlJbXBsLFxuICAgICAgICBkZXBzOiBbSW5qZWN0b3IsIENvbXBpbGVyRmFjdG9yeV1cbiAgICAgIH1cbiAgICBdKTtcbiJdfQ==