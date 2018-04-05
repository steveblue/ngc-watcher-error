"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./shared/components/home/home.component");
var lazy_component_1 = require("./shared/components/lazy/lazy.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'lazy', component: lazy_component_1.LazyComponent }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map