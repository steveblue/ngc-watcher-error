"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var app_component_1 = require("./app.component");
var app_routes_1 = require("./app.routes");
var home_module_1 = require("./shared/components/home/home.module");
var lazy_module_1 = require("./shared/components/lazy/lazy.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [platform_browser_1.BrowserModule,
                        animations_1.BrowserAnimationsModule,
                        common_1.CommonModule,
                        http_1.HttpClientModule,
                        home_module_1.HomeModule,
                        lazy_module_1.LazyModule,
                        app_routes_1.routing],
                    declarations: [app_component_1.AppComponent],
                    bootstrap: [app_component_1.AppComponent]
                },] },
    ];
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map