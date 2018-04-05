/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, InjectionToken } from '../di';
/**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * @experimental
 */
var /**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * @experimental
 */
ModuleWithComponentFactories = /** @class */ (function () {
    function ModuleWithComponentFactories(ngModuleFactory, componentFactories) {
        this.ngModuleFactory = ngModuleFactory;
        this.componentFactories = componentFactories;
    }
    return ModuleWithComponentFactories;
}());
/**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * @experimental
 */
export { ModuleWithComponentFactories };
function _throwError() {
    throw new Error("Runtime compiler is not loaded");
}
/**
 * Low-level service for running the angular compiler during runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 * @stable
 */
var Compiler = /** @class */ (function () {
    function Compiler() {
    }
    /**
     * Compiles the given NgModule and all of its components. All templates of the components listed
     * in `entryComponents` have to be inlined.
     */
    /**
       * Compiles the given NgModule and all of its components. All templates of the components listed
       * in `entryComponents` have to be inlined.
       */
    Compiler.prototype.compileModuleSync = /**
       * Compiles the given NgModule and all of its components. All templates of the components listed
       * in `entryComponents` have to be inlined.
       */
    function (moduleType) { throw _throwError(); };
    /**
     * Compiles the given NgModule and all of its components
     */
    /**
       * Compiles the given NgModule and all of its components
       */
    Compiler.prototype.compileModuleAsync = /**
       * Compiles the given NgModule and all of its components
       */
    function (moduleType) { throw _throwError(); };
    /**
     * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
     */
    /**
       * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
       */
    Compiler.prototype.compileModuleAndAllComponentsSync = /**
       * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
       */
    function (moduleType) {
        throw _throwError();
    };
    /**
     * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
     */
    /**
       * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
       */
    Compiler.prototype.compileModuleAndAllComponentsAsync = /**
       * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
       */
    function (moduleType) {
        throw _throwError();
    };
    /**
     * Clears all caches.
     */
    /**
       * Clears all caches.
       */
    Compiler.prototype.clearCache = /**
       * Clears all caches.
       */
    function () { };
    /**
     * Clears the cache for the given component/ngModule.
     */
    /**
       * Clears the cache for the given component/ngModule.
       */
    Compiler.prototype.clearCacheFor = /**
       * Clears the cache for the given component/ngModule.
       */
    function (type) { };
    Compiler.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Compiler.ctorParameters = function () { return []; };
    return Compiler;
}());
export { Compiler };
/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @experimental
 */
export var COMPILER_OPTIONS = new InjectionToken('compilerOptions');
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
var /**
 * A factory for creating a Compiler
 *
 * @experimental
 */
CompilerFactory = /** @class */ (function () {
    function CompilerFactory() {
    }
    return CompilerFactory;
}());
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
export { CompilerFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsY0FBYyxFQUFpQixNQUFNLE9BQU8sQ0FBQzs7Ozs7O0FBY2pFOzs7OztBQUFBO0lBQ0Usc0NBQ1csZUFBbUMsRUFDbkMsa0JBQTJDO1FBRDNDLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUNuQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXlCO0tBQUk7dUNBekI1RDtJQTBCQyxDQUFBOzs7Ozs7QUFKRCx3Q0FJQztBQUdEO0lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0NBQ25EOzs7Ozs7Ozs7Ozs7OztJQWNDOzs7T0FHRzs7Ozs7SUFDSCxvQ0FBaUI7Ozs7SUFBakIsVUFBcUIsVUFBbUIsSUFBd0IsTUFBTSxXQUFXLEVBQUUsQ0FBQyxFQUFFO0lBRXRGOztPQUVHOzs7O0lBQ0gscUNBQWtCOzs7SUFBbEIsVUFBc0IsVUFBbUIsSUFBaUMsTUFBTSxXQUFXLEVBQUUsQ0FBQyxFQUFFO0lBRWhHOztPQUVHOzs7O0lBQ0gsb0RBQWlDOzs7SUFBakMsVUFBcUMsVUFBbUI7UUFDdEQsTUFBTSxXQUFXLEVBQUUsQ0FBQztLQUNyQjtJQUVEOztPQUVHOzs7O0lBQ0gscURBQWtDOzs7SUFBbEMsVUFBc0MsVUFBbUI7UUFFdkQsTUFBTSxXQUFXLEVBQUUsQ0FBQztLQUNyQjtJQUVEOztPQUVHOzs7O0lBQ0gsNkJBQVU7OztJQUFWLGVBQXFCO0lBRXJCOztPQUVHOzs7O0lBQ0gsZ0NBQWE7OztJQUFiLFVBQWMsSUFBZSxLQUFJOztnQkFwQ2xDLFVBQVU7Ozs7bUJBM0NYOztTQTRDYSxRQUFROzs7Ozs7QUF3RHJCLE1BQU0sQ0FBQyxJQUFNLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUFvQixpQkFBaUIsQ0FBQyxDQUFDOzs7Ozs7QUFPekY7Ozs7O0FBQUE7OzswQkEzR0E7SUE2R0MsQ0FBQTs7Ozs7O0FBRkQsMkJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICcuLi9kaSc7XG5pbXBvcnQge01pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5fSBmcm9tICcuLi9pMThuL3Rva2Vucyc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuLi9tZXRhZGF0YSc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuXG5pbXBvcnQge0NvbXBvbmVudEZhY3Rvcnl9IGZyb20gJy4vY29tcG9uZW50X2ZhY3RvcnknO1xuaW1wb3J0IHtOZ01vZHVsZUZhY3Rvcnl9IGZyb20gJy4vbmdfbW9kdWxlX2ZhY3RvcnknO1xuXG5cbi8qKlxuICogQ29tYmluYXRpb24gb2YgTmdNb2R1bGVGYWN0b3J5IGFuZCBDb21wb25lbnRGYWN0b3J5cy5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2R1bGVXaXRoQ29tcG9uZW50RmFjdG9yaWVzPFQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgbmdNb2R1bGVGYWN0b3J5OiBOZ01vZHVsZUZhY3Rvcnk8VD4sXG4gICAgICBwdWJsaWMgY29tcG9uZW50RmFjdG9yaWVzOiBDb21wb25lbnRGYWN0b3J5PGFueT5bXSkge31cbn1cblxuXG5mdW5jdGlvbiBfdGhyb3dFcnJvcigpIHtcbiAgdGhyb3cgbmV3IEVycm9yKGBSdW50aW1lIGNvbXBpbGVyIGlzIG5vdCBsb2FkZWRgKTtcbn1cblxuLyoqXG4gKiBMb3ctbGV2ZWwgc2VydmljZSBmb3IgcnVubmluZyB0aGUgYW5ndWxhciBjb21waWxlciBkdXJpbmcgcnVudGltZVxuICogdG8gY3JlYXRlIHtAbGluayBDb21wb25lbnRGYWN0b3J5fXMsIHdoaWNoXG4gKiBjYW4gbGF0ZXIgYmUgdXNlZCB0byBjcmVhdGUgYW5kIHJlbmRlciBhIENvbXBvbmVudCBpbnN0YW5jZS5cbiAqXG4gKiBFYWNoIGBATmdNb2R1bGVgIHByb3ZpZGVzIGFuIG93biBgQ29tcGlsZXJgIHRvIGl0cyBpbmplY3RvcixcbiAqIHRoYXQgd2lsbCB1c2UgdGhlIGRpcmVjdGl2ZXMvcGlwZXMgb2YgdGhlIG5nIG1vZHVsZSBmb3IgY29tcGlsYXRpb25cbiAqIG9mIGNvbXBvbmVudHMuXG4gKiBAc3RhYmxlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb21waWxlciB7XG4gIC8qKlxuICAgKiBDb21waWxlcyB0aGUgZ2l2ZW4gTmdNb2R1bGUgYW5kIGFsbCBvZiBpdHMgY29tcG9uZW50cy4gQWxsIHRlbXBsYXRlcyBvZiB0aGUgY29tcG9uZW50cyBsaXN0ZWRcbiAgICogaW4gYGVudHJ5Q29tcG9uZW50c2AgaGF2ZSB0byBiZSBpbmxpbmVkLlxuICAgKi9cbiAgY29tcGlsZU1vZHVsZVN5bmM8VD4obW9kdWxlVHlwZTogVHlwZTxUPik6IE5nTW9kdWxlRmFjdG9yeTxUPiB7IHRocm93IF90aHJvd0Vycm9yKCk7IH1cblxuICAvKipcbiAgICogQ29tcGlsZXMgdGhlIGdpdmVuIE5nTW9kdWxlIGFuZCBhbGwgb2YgaXRzIGNvbXBvbmVudHNcbiAgICovXG4gIGNvbXBpbGVNb2R1bGVBc3luYzxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KTogUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8VD4+IHsgdGhyb3cgX3Rocm93RXJyb3IoKTsgfVxuXG4gIC8qKlxuICAgKiBTYW1lIGFzIHtAbGluayAjY29tcGlsZU1vZHVsZVN5bmN9IGJ1dCBhbHNvIGNyZWF0ZXMgQ29tcG9uZW50RmFjdG9yaWVzIGZvciBhbGwgY29tcG9uZW50cy5cbiAgICovXG4gIGNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzU3luYzxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KTogTW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllczxUPiB7XG4gICAgdGhyb3cgX3Rocm93RXJyb3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYW1lIGFzIHtAbGluayAjY29tcGlsZU1vZHVsZUFzeW5jfSBidXQgYWxzbyBjcmVhdGVzIENvbXBvbmVudEZhY3RvcmllcyBmb3IgYWxsIGNvbXBvbmVudHMuXG4gICAqL1xuICBjb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c0FzeW5jPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pOlxuICAgICAgUHJvbWlzZTxNb2R1bGVXaXRoQ29tcG9uZW50RmFjdG9yaWVzPFQ+PiB7XG4gICAgdGhyb3cgX3Rocm93RXJyb3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlcy5cbiAgICovXG4gIGNsZWFyQ2FjaGUoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGNhY2hlIGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50L25nTW9kdWxlLlxuICAgKi9cbiAgY2xlYXJDYWNoZUZvcih0eXBlOiBUeXBlPGFueT4pIHt9XG59XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBjb21waWxlclxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IHR5cGUgQ29tcGlsZXJPcHRpb25zID0ge1xuICB1c2VKaXQ/OiBib29sZWFuLFxuICBkZWZhdWx0RW5jYXBzdWxhdGlvbj86IFZpZXdFbmNhcHN1bGF0aW9uLFxuICBwcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdLFxuICBtaXNzaW5nVHJhbnNsYXRpb24/OiBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlcz86IGJvb2xlYW4sXG59O1xuXG4vKipcbiAqIFRva2VuIHRvIHByb3ZpZGUgQ29tcGlsZXJPcHRpb25zIGluIHRoZSBwbGF0Zm9ybSBpbmplY3Rvci5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjb25zdCBDT01QSUxFUl9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPENvbXBpbGVyT3B0aW9uc1tdPignY29tcGlsZXJPcHRpb25zJyk7XG5cbi8qKlxuICogQSBmYWN0b3J5IGZvciBjcmVhdGluZyBhIENvbXBpbGVyXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcGlsZXJGYWN0b3J5IHtcbiAgYWJzdHJhY3QgY3JlYXRlQ29tcGlsZXIob3B0aW9ucz86IENvbXBpbGVyT3B0aW9uc1tdKTogQ29tcGlsZXI7XG59XG4iXX0=