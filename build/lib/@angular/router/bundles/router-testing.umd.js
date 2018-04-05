/**
 * @license Angular v6.0.0-rc.1
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@angular/common'), require('@angular/common/testing'), require('@angular/core'), require('@angular/router')) :
	typeof define === 'function' && define.amd ? define(['exports', 'tslib', '@angular/common', '@angular/common/testing', '@angular/core', '@angular/router'], factory) :
	(factory((global.npm_package = {}),global.tslib,global.ng.common,global.ng.common.testing,global.ng.core,global.ng.router));
}(this, (function (exports,tslib_1,common,testing,core,router) { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @whatItDoes Allows to simulate the loading of ng modules in tests.
 *
 * @howToUse
 *
 * ```
 * const loader = TestBed.get(NgModuleFactoryLoader);
 *
 * @Component({template: 'lazy-loaded'})
 * class LazyLoadedComponent {}
 * @NgModule({
 *   declarations: [LazyLoadedComponent],
 *   imports: [RouterModule.forChild([{path: 'loaded', component: LazyLoadedComponent}])]
 * })
 *
 * class LoadedModule {}
 *
 * // sets up stubbedModules
 * loader.stubbedModules = {lazyModule: LoadedModule};
 *
 * router.resetConfig([
 *   {path: 'lazy', loadChildren: 'lazyModule'},
 * ]);
 *
 * router.navigateByUrl('/lazy/loaded');
 * ```
 *
 * @stable
 */
var SpyNgModuleFactoryLoader = /** @class */ (function () {
    function SpyNgModuleFactoryLoader(compiler) {
        this.compiler = compiler;
        /**
           * @docsNotRequired
           */
        this._stubbedModules = {};
    }
    Object.defineProperty(SpyNgModuleFactoryLoader.prototype, "stubbedModules", {
        /**
         * @docsNotRequired
         */
        get: /**
           * @docsNotRequired
           */
        function () { return this._stubbedModules; },
        /**
         * @docsNotRequired
         */
        set: /**
           * @docsNotRequired
           */
        function (modules) {
            var res = {};
            try {
                for (var _a = tslib_1.__values(Object.keys(modules)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var t = _b.value;
                    res[t] = this.compiler.compileModuleAsync(modules[t]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._stubbedModules = res;
            var e_1, _c;
        },
        enumerable: true,
        configurable: true
    });
    SpyNgModuleFactoryLoader.prototype.load = function (path) {
        if (this._stubbedModules[path]) {
            return this._stubbedModules[path];
        }
        else {
            return Promise.reject(new Error("Cannot find module " + path));
        }
    };
    SpyNgModuleFactoryLoader.decorators = [
        { type: core.Injectable }
    ];
    /** @nocollapse */
    SpyNgModuleFactoryLoader.ctorParameters = function () { return [
        { type: core.Compiler, },
    ]; };
    return SpyNgModuleFactoryLoader;
}());
function isUrlHandlingStrategy(opts) {
    // This property check is needed because UrlHandlingStrategy is an interface and doesn't exist at
    // runtime.
    return 'shouldProcessUrl' in opts;
}
/**
 * Router setup factory function used for testing.
 *
 * @stable
 */
function setupTestingRouter(urlSerializer, contexts, location, loader, compiler, injector, routes, opts, urlHandlingStrategy) {
    var router$$1 = new router.Router((null), urlSerializer, contexts, location, injector, loader, compiler, router.ɵflatten(routes));
    // Handle deprecated argument ordering.
    if (opts) {
        if (isUrlHandlingStrategy(opts)) {
            router$$1.urlHandlingStrategy = opts;
        }
        else if (opts.paramsInheritanceStrategy) {
            router$$1.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
        }
    }
    if (urlHandlingStrategy) {
        router$$1.urlHandlingStrategy = urlHandlingStrategy;
    }
    return router$$1;
}
/**
 * @whatItDoes Sets up the router to be used for testing.
 *
 * @howToUse
 *
 * ```
 * beforeEach(() => {
 *   TestBed.configureTestModule({
 *     imports: [
 *       RouterTestingModule.withRoutes(
 *         [{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}]
 *       )
 *     ]
 *   });
 * });
 * ```
 *
 * @description
 *
 * The modules sets up the router to be used for testing.
 * It provides spy implementations of {@link Location}, {@link LocationStrategy}, and {@link
 * NgModuleFactoryLoader}.
 *
 * @stable
 */
var RouterTestingModule = /** @class */ (function () {
    function RouterTestingModule() {
    }
    RouterTestingModule.withRoutes = function (routes, config) {
        return {
            ngModule: RouterTestingModule,
            providers: [
                router.provideRoutes(routes),
                { provide: router.ROUTER_CONFIGURATION, useValue: config ? config : {} },
            ]
        };
    };
    RouterTestingModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [router.RouterModule],
                    providers: [
                        router.ɵROUTER_PROVIDERS, { provide: common.Location, useClass: testing.SpyLocation },
                        { provide: common.LocationStrategy, useClass: testing.MockLocationStrategy },
                        { provide: core.NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader }, {
                            provide: router.Router,
                            useFactory: setupTestingRouter,
                            deps: [
                                router.UrlSerializer, router.ChildrenOutletContexts, common.Location, core.NgModuleFactoryLoader, core.Compiler, core.Injector,
                                router.ROUTES, router.ROUTER_CONFIGURATION, [router.UrlHandlingStrategy, new core.Optional()]
                            ]
                        },
                        { provide: router.PreloadingStrategy, useExisting: router.NoPreloading }, router.provideRoutes([])
                    ]
                },] }
    ];
    /** @nocollapse */
    RouterTestingModule.ctorParameters = function () { return []; };
    return RouterTestingModule;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

exports.SpyNgModuleFactoryLoader = SpyNgModuleFactoryLoader;
exports.setupTestingRouter = setupTestingRouter;
exports.RouterTestingModule = RouterTestingModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=router-testing.umd.js.map
