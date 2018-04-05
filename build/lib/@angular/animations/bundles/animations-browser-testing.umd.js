/**
 * @license Angular v6.0.0-rc.1
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@angular/animations'), require('@angular/animations/browser')) :
	typeof define === 'function' && define.amd ? define(['exports', 'tslib', '@angular/animations', '@angular/animations/browser'], factory) :
	(factory((global.npm_package = {}),global.tslib,global.ng.animations,global.ng.animations.browser));
}(this, (function (exports,tslib_1,animations,browser) { 'use strict';

/**
 * @experimental Animation support is experimental.
 */
var MockAnimationDriver = /** @class */ (function () {
    function MockAnimationDriver() {
    }
    MockAnimationDriver.prototype.validateStyleProperty = function (prop) { return browser.ɵvalidateStyleProperty(prop); };
    MockAnimationDriver.prototype.matchesElement = function (element, selector) {
        return browser.ɵmatchesElement(element, selector);
    };
    MockAnimationDriver.prototype.containsElement = function (elm1, elm2) { return browser.ɵcontainsElement(elm1, elm2); };
    MockAnimationDriver.prototype.query = function (element, selector, multi) {
        return browser.ɵinvokeQuery(element, selector, multi);
    };
    MockAnimationDriver.prototype.computeStyle = function (element, prop, defaultValue) {
        return defaultValue || '';
    };
    MockAnimationDriver.prototype.animate = function (element, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        var player = new MockAnimationPlayer(element, keyframes, duration, delay, easing, previousPlayers);
        MockAnimationDriver.log.push(player);
        return player;
    };
    MockAnimationDriver.log = [];
    return MockAnimationDriver;
}());
/**
 * @experimental Animation support is experimental.
 */
var MockAnimationPlayer = /** @class */ (function (_super) {
    tslib_1.__extends(MockAnimationPlayer, _super);
    function MockAnimationPlayer(element, keyframes, duration, delay, easing, previousPlayers) {
        var _this = _super.call(this, duration, delay) || this;
        _this.element = element;
        _this.keyframes = keyframes;
        _this.duration = duration;
        _this.delay = delay;
        _this.easing = easing;
        _this.previousPlayers = previousPlayers;
        _this.__finished = false;
        _this.__started = false;
        _this.previousStyles = {};
        _this._onInitFns = [];
        _this.currentSnapshot = {};
        if (browser.ɵallowPreviousPlayerStylesMerge(duration, delay)) {
            previousPlayers.forEach(function (player) {
                if (player instanceof MockAnimationPlayer) {
                    var styles_1 = player.currentSnapshot;
                    Object.keys(styles_1).forEach(function (prop) { return _this.previousStyles[prop] = styles_1[prop]; });
                }
            });
        }
        return _this;
    }
    /* @internal */
    /* @internal */
    MockAnimationPlayer.prototype.onInit = /* @internal */
    function (fn) { this._onInitFns.push(fn); };
    /* @internal */
    /* @internal */
    MockAnimationPlayer.prototype.init = /* @internal */
    function () {
        _super.prototype.init.call(this);
        this._onInitFns.forEach(function (fn) { return fn(); });
        this._onInitFns = [];
    };
    MockAnimationPlayer.prototype.finish = function () {
        _super.prototype.finish.call(this);
        this.__finished = true;
    };
    MockAnimationPlayer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.__finished = true;
    };
    /* @internal */
    /* @internal */
    MockAnimationPlayer.prototype.triggerMicrotask = /* @internal */
    function () { };
    MockAnimationPlayer.prototype.play = function () {
        _super.prototype.play.call(this);
        this.__started = true;
    };
    MockAnimationPlayer.prototype.hasStarted = function () { return this.__started; };
    MockAnimationPlayer.prototype.beforeDestroy = function () {
        var _this = this;
        var captures = {};
        Object.keys(this.previousStyles).forEach(function (prop) {
            captures[prop] = _this.previousStyles[prop];
        });
        if (this.hasStarted()) {
            // when assembling the captured styles, it's important that
            // we build the keyframe styles in the following order:
            // {other styles within keyframes, ... previousStyles }
            this.keyframes.forEach(function (kf) {
                Object.keys(kf).forEach(function (prop) {
                    if (prop != 'offset') {
                        captures[prop] = _this.__finished ? kf[prop] : animations.AUTO_STYLE;
                    }
                });
            });
        }
        this.currentSnapshot = captures;
    };
    return MockAnimationPlayer;
}(animations.NoopAnimationPlayer));

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

/**
 * Generated bundle index. Do not edit.
 */

exports.MockAnimationDriver = MockAnimationDriver;
exports.MockAnimationPlayer = MockAnimationPlayer;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=animations-browser-testing.umd.js.map
