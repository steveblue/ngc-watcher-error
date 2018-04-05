"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.stealthMode = 'active';
    }
    HomeComponent.prototype.ngOnDestroy = function () {
        this.stealthMode = 'inactive';
    };
    HomeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'cmp-prefix1-app-home',
                    templateUrl: 'home.component.html',
                    styleUrls: ['home.component.css'],
                    animations: [
                        animations_1.trigger('intro', [
                            animations_1.state('void', animations_1.style({
                                opacity: '0.0',
                                transform: 'translateZ(-1000px)'
                            })),
                            animations_1.state('active', animations_1.style({
                                opacity: '1.0',
                                transform: 'translateZ(0px)',
                                perspective: '1000px'
                            })),
                            animations_1.state('inactive', animations_1.style({
                                opacity: '0.0',
                                transform: 'translateZ(-1000px)',
                                perspective: '1000px'
                            })),
                            animations_1.transition('active => void', animations_1.animate('5000ms cubic-bezier(0.19, 1, 0.22, 1)')),
                            animations_1.transition('void => active', animations_1.animate('5000ms cubic-bezier(0.19, 1, 0.22, 1)')),
                            animations_1.transition('inactive => active', animations_1.animate('5000ms cubic-bezier(0.19, 1, 0.22, 1)')),
                            animations_1.transition('active => inactive', animations_1.animate('5000ms cubic-bezier(0.19, 1, 0.22, 1)'))
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    HomeComponent.ctorParameters = function () { return []; };
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map