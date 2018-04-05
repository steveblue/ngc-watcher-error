"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var home_component_1 = require("./home.component");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [router_1.RouterModule,
                        common_1.CommonModule],
                    declarations: [home_component_1.HomeComponent]
                },] },
    ];
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map