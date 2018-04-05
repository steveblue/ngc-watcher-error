"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var LazyComponent = /** @class */ (function () {
    function LazyComponent() {
        this.angularMode = 'active';
    }
    LazyComponent.prototype.ngOnDestroy = function () {
        this.angularMode = 'inactive';
    };
    LazyComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'cmp-prefix1-app-lazy',
                    templateUrl: 'lazy.component.html',
                    styleUrls: ['lazy.component.css'],
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
    LazyComponent.ctorParameters = function () { return []; };
    return LazyComponent;
}());
exports.LazyComponent = LazyComponent;
//# sourceMappingURL=lazy.component.js.map