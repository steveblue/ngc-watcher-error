"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var lazy_component_1 = require("./lazy.component");
var LazyModule = /** @class */ (function () {
    function LazyModule() {
    }
    LazyModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [router_1.RouterModule,
                        common_1.CommonModule],
                    declarations: [lazy_component_1.LazyComponent],
                    exports: [lazy_component_1.LazyComponent]
                },] },
    ];
    return LazyModule;
}());
exports.LazyModule = LazyModule;
//# sourceMappingURL=lazy.module.js.map