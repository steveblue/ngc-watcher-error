/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Attribute, ChangeDetectorRef, ComponentFactoryResolver, Directive, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { ChildrenOutletContexts } from '../router_outlet_context';
import { ActivatedRoute } from '../router_state';
import { PRIMARY_OUTLET } from '../shared';
/**
 * \@whatItDoes Acts as a placeholder that Angular dynamically fills based on the current router
 * state.
 *
 * \@howToUse
 *
 * ```
 * <router-outlet></router-outlet>
 * <router-outlet name='left'></router-outlet>
 * <router-outlet name='right'></router-outlet>
 * ```
 *
 * A router outlet will emit an activate event any time a new component is being instantiated,
 * and a deactivate event when it is being destroyed.
 *
 * ```
 * <router-outlet
 *   (activate)='onActivate($event)'
 *   (deactivate)='onDeactivate($event)'></router-outlet>
 * ```
 * \@ngModule RouterModule
 *
 * \@stable
 */
export class RouterOutlet {
    /**
     * @param {?} parentContexts
     * @param {?} location
     * @param {?} resolver
     * @param {?} name
     * @param {?} changeDetector
     */
    constructor(parentContexts, location, resolver, name, changeDetector) {
        this.parentContexts = parentContexts;
        this.location = location;
        this.resolver = resolver;
        this.changeDetector = changeDetector;
        this.activated = null;
        this._activatedRoute = null;
        this.activateEvents = new EventEmitter();
        this.deactivateEvents = new EventEmitter();
        this.name = name || PRIMARY_OUTLET;
        parentContexts.onChildOutletCreated(this.name, this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this.parentContexts.onChildOutletDestroyed(this.name); }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.activated) {
            // If the outlet was not instantiated at the time the route got activated we need to populate
            // the outlet when it is initialized (ie inside a NgIf)
            const /** @type {?} */ context = this.parentContexts.getContext(this.name);
            if (context && context.route) {
                if (context.attachRef) {
                    // `attachRef` is populated when there is an existing component to mount
                    this.attach(context.attachRef, context.route);
                }
                else {
                    // otherwise the component defined in the configuration is created
                    this.activateWith(context.route, context.resolver || null);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    get isActivated() { return !!this.activated; }
    /**
     * @return {?}
     */
    get component() {
        if (!this.activated)
            throw new Error('Outlet is not activated');
        return this.activated.instance;
    }
    /**
     * @return {?}
     */
    get activatedRoute() {
        if (!this.activated)
            throw new Error('Outlet is not activated');
        return /** @type {?} */ (this._activatedRoute);
    }
    /**
     * @return {?}
     */
    get activatedRouteData() {
        if (this._activatedRoute) {
            return this._activatedRoute.snapshot.data;
        }
        return {};
    }
    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     * @return {?}
     */
    detach() {
        if (!this.activated)
            throw new Error('Outlet is not activated');
        this.location.detach();
        const /** @type {?} */ cmp = this.activated;
        this.activated = null;
        this._activatedRoute = null;
        return cmp;
    }
    /**
     * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
     * @param {?} ref
     * @param {?} activatedRoute
     * @return {?}
     */
    attach(ref, activatedRoute) {
        this.activated = ref;
        this._activatedRoute = activatedRoute;
        this.location.insert(ref.hostView);
    }
    /**
     * @return {?}
     */
    deactivate() {
        if (this.activated) {
            const /** @type {?} */ c = this.component;
            this.activated.destroy();
            this.activated = null;
            this._activatedRoute = null;
            this.deactivateEvents.emit(c);
        }
    }
    /**
     * @param {?} activatedRoute
     * @param {?} resolver
     * @return {?}
     */
    activateWith(activatedRoute, resolver) {
        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }
        this._activatedRoute = activatedRoute;
        const /** @type {?} */ snapshot = activatedRoute._futureSnapshot;
        const /** @type {?} */ component = /** @type {?} */ (/** @type {?} */ ((snapshot.routeConfig)).component);
        resolver = resolver || this.resolver;
        const /** @type {?} */ factory = resolver.resolveComponentFactory(component);
        const /** @type {?} */ childContexts = this.parentContexts.getOrCreateContext(this.name).children;
        const /** @type {?} */ injector = new OutletInjector(activatedRoute, childContexts, this.location.injector);
        this.activated = this.location.createComponent(factory, this.location.length, injector);
        // Calling `markForCheck` to make sure we will run the change detection when the
        // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
        this.changeDetector.markForCheck();
        this.activateEvents.emit(this.activated.instance);
    }
}
RouterOutlet.decorators = [
    { type: Directive, args: [{ selector: 'router-outlet', exportAs: 'outlet' },] }
];
/** @nocollapse */
RouterOutlet.ctorParameters = () => [
    { type: ChildrenOutletContexts, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
    { type: undefined, decorators: [{ type: Attribute, args: ['name',] },] },
    { type: ChangeDetectorRef, },
];
RouterOutlet.propDecorators = {
    "activateEvents": [{ type: Output, args: ['activate',] },],
    "deactivateEvents": [{ type: Output, args: ['deactivate',] },],
};
function RouterOutlet_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RouterOutlet.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RouterOutlet.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    RouterOutlet.propDecorators;
    /** @type {?} */
    RouterOutlet.prototype.activated;
    /** @type {?} */
    RouterOutlet.prototype._activatedRoute;
    /** @type {?} */
    RouterOutlet.prototype.name;
    /** @type {?} */
    RouterOutlet.prototype.activateEvents;
    /** @type {?} */
    RouterOutlet.prototype.deactivateEvents;
    /** @type {?} */
    RouterOutlet.prototype.parentContexts;
    /** @type {?} */
    RouterOutlet.prototype.location;
    /** @type {?} */
    RouterOutlet.prototype.resolver;
    /** @type {?} */
    RouterOutlet.prototype.changeDetector;
}
class OutletInjector {
    /**
     * @param {?} route
     * @param {?} childContexts
     * @param {?} parent
     */
    constructor(route, childContexts, parent) {
        this.route = route;
        this.childContexts = childContexts;
        this.parent = parent;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) {
        if (token === ActivatedRoute) {
            return this.route;
        }
        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }
        return this.parent.get(token, notFoundValue);
    }
}
function OutletInjector_tsickle_Closure_declarations() {
    /** @type {?} */
    OutletInjector.prototype.route;
    /** @type {?} */
    OutletInjector.prototype.childContexts;
    /** @type {?} */
    OutletInjector.prototype.parent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX291dGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBZ0IsU0FBUyxFQUFFLFlBQVksRUFBK0IsTUFBTSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRW5MLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJ6QyxNQUFNOzs7Ozs7OztJQVFKLFlBQ1ksZ0JBQWdELFFBQTBCLEVBQzFFLFVBQXVELE1BQ3ZEO1FBRkEsbUJBQWMsR0FBZCxjQUFjO1FBQWtDLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFFLGFBQVEsR0FBUixRQUFRO1FBQ1IsbUJBQWMsR0FBZCxjQUFjO3lCQVZrQixJQUFJOytCQUNELElBQUk7OEJBR2QsSUFBSSxZQUFZLEVBQU87Z0NBQ25CLElBQUksWUFBWSxFQUFPO1FBTTlELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLGNBQWMsQ0FBQztRQUNuQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN0RDs7OztJQUVELFdBQVcsS0FBVyxJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7O0lBRTlFLFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENB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Ozs7Ozs7Ozs7QUFrR3RCOzs7Ozs7SUFDRSxZQUNZLE9BQStCLGFBQXFDLEVBQ3BFO1FBREEsVUFBSyxHQUFMLEtBQUs7UUFBMEIsa0JBQWEsR0FBYixhQUFhLENBQXdCO1FBQ3BFLFdBQU0sR0FBTixNQUFNO0tBQWM7Ozs7OztJQUVoQyxHQUFHLENBQUMsS0FBVSxFQUFFLGFBQW1CO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25CO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLHNCQUFzQixDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUMzQjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDOUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBdHRyaWJ1dGUsIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEluamVjdG9yLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDaGlsZHJlbk91dGxldENvbnRleHRzfSBmcm9tICcuLi9yb3V0ZXJfb3V0bGV0X2NvbnRleHQnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnLi4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7UFJJTUFSWV9PVVRMRVR9IGZyb20gJy4uL3NoYXJlZCc7XG5cbi8qKlxuICogQHdoYXRJdERvZXMgQWN0cyBhcyBhIHBsYWNlaG9sZGVyIHRoYXQgQW5ndWxhciBkeW5hbWljYWxseSBmaWxscyBiYXNlZCBvbiB0aGUgY3VycmVudCByb3V0ZXJcbiAqIHN0YXRlLlxuICpcbiAqIEBob3dUb1VzZVxuICpcbiAqIGBgYFxuICogPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICogPHJvdXRlci1vdXRsZXQgbmFtZT0nbGVmdCc+PC9yb3V0ZXItb3V0bGV0PlxuICogPHJvdXRlci1vdXRsZXQgbmFtZT0ncmlnaHQnPjwvcm91dGVyLW91dGxldD5cbiAqIGBgYFxuICpcbiAqIEEgcm91dGVyIG91dGxldCB3aWxsIGVtaXQgYW4gYWN0aXZhdGUgZXZlbnQgYW55IHRpbWUgYSBuZXcgY29tcG9uZW50IGlzIGJlaW5nIGluc3RhbnRpYXRlZCxcbiAqIGFuZCBhIGRlYWN0aXZhdGUgZXZlbnQgd2hlbiBpdCBpcyBiZWluZyBkZXN0cm95ZWQuXG4gKlxuICogYGBgXG4gKiA8cm91dGVyLW91dGxldFxuICogICAoYWN0aXZhdGUpPSdvbkFjdGl2YXRlKCRldmVudCknXG4gKiAgIChkZWFjdGl2YXRlKT0nb25EZWFjdGl2YXRlKCRldmVudCknPjwvcm91dGVyLW91dGxldD5cbiAqIGBgYFxuICogQG5nTW9kdWxlIFJvdXRlck1vZHVsZVxuICpcbiAqIEBzdGFibGVcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdyb3V0ZXItb3V0bGV0JywgZXhwb3J0QXM6ICdvdXRsZXQnfSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJPdXRsZXQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHByaXZhdGUgYWN0aXZhdGVkOiBDb21wb25lbnRSZWY8YW55PnxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlfG51bGwgPSBudWxsO1xuICBwcml2YXRlIG5hbWU6IHN0cmluZztcblxuICBAT3V0cHV0KCdhY3RpdmF0ZScpIGFjdGl2YXRlRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ2RlYWN0aXZhdGUnKSBkZWFjdGl2YXRlRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHBhcmVudENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLCBwcml2YXRlIGxvY2F0aW9uOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBAQXR0cmlidXRlKCduYW1lJykgbmFtZTogc3RyaW5nLFxuICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lIHx8IFBSSU1BUllfT1VUTEVUO1xuICAgIHBhcmVudENvbnRleHRzLm9uQ2hpbGRPdXRsZXRDcmVhdGVkKHRoaXMubmFtZSwgdGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5wYXJlbnRDb250ZXh0cy5vbkNoaWxkT3V0bGV0RGVzdHJveWVkKHRoaXMubmFtZSk7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZhdGVkKSB7XG4gICAgICAvLyBJZiB0aGUgb3V0bGV0IHdhcyBub3QgaW5zdGFudGlhdGVkIGF0IHRoZSB0aW1lIHRoZSByb3V0ZSBnb3QgYWN0aXZhdGVkIHdlIG5lZWQgdG8gcG9wdWxhdGVcbiAgICAgIC8vIHRoZSBvdXRsZXQgd2hlbiBpdCBpcyBpbml0aWFsaXplZCAoaWUgaW5zaWRlIGEgTmdJZilcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLnBhcmVudENvbnRleHRzLmdldENvbnRleHQodGhpcy5uYW1lKTtcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQucm91dGUpIHtcbiAgICAgICAgaWYgKGNvbnRleHQuYXR0YWNoUmVmKSB7XG4gICAgICAgICAgLy8gYGF0dGFjaFJlZmAgaXMgcG9wdWxhdGVkIHdoZW4gdGhlcmUgaXMgYW4gZXhpc3RpbmcgY29tcG9uZW50IHRvIG1vdW50XG4gICAgICAgICAgdGhpcy5hdHRhY2goY29udGV4dC5hdHRhY2hSZWYsIGNvbnRleHQucm91dGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG90aGVyd2lzZSB0aGUgY29tcG9uZW50IGRlZmluZWQgaW4gdGhlIGNvbmZpZ3VyYXRpb24gaXMgY3JlYXRlZFxuICAgICAgICAgIHRoaXMuYWN0aXZhdGVXaXRoKGNvbnRleHQucm91dGUsIGNvbnRleHQucmVzb2x2ZXIgfHwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgaXNBY3RpdmF0ZWQoKTogYm9vbGVhbiB7IHJldHVybiAhIXRoaXMuYWN0aXZhdGVkOyB9XG5cbiAgZ2V0IGNvbXBvbmVudCgpOiBPYmplY3Qge1xuICAgIGlmICghdGhpcy5hY3RpdmF0ZWQpIHRocm93IG5ldyBFcnJvcignT3V0bGV0IGlzIG5vdCBhY3RpdmF0ZWQnKTtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmF0ZWQuaW5zdGFuY2U7XG4gIH1cblxuICBnZXQgYWN0aXZhdGVkUm91dGUoKTogQWN0aXZhdGVkUm91dGUge1xuICAgIGlmICghdGhpcy5hY3RpdmF0ZWQpIHRocm93IG5ldyBFcnJvcignT3V0bGV0IGlzIG5vdCBhY3RpdmF0ZWQnKTtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGVkUm91dGUgYXMgQWN0aXZhdGVkUm91dGU7XG4gIH1cblxuICBnZXQgYWN0aXZhdGVkUm91dGVEYXRhKCkge1xuICAgIGlmICh0aGlzLl9hY3RpdmF0ZWRSb3V0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2YXRlZFJvdXRlLnNuYXBzaG90LmRhdGE7XG4gICAgfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgYFJvdXRlUmV1c2VTdHJhdGVneWAgaW5zdHJ1Y3RzIHRvIGRldGFjaCB0aGUgc3VidHJlZVxuICAgKi9cbiAgZGV0YWNoKCk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICBpZiAoIXRoaXMuYWN0aXZhdGVkKSB0aHJvdyBuZXcgRXJyb3IoJ091dGxldCBpcyBub3QgYWN0aXZhdGVkJyk7XG4gICAgdGhpcy5sb2NhdGlvbi5kZXRhY2goKTtcbiAgICBjb25zdCBjbXAgPSB0aGlzLmFjdGl2YXRlZDtcbiAgICB0aGlzLmFjdGl2YXRlZCA9IG51bGw7XG4gICAgdGhpcy5fYWN0aXZhdGVkUm91dGUgPSBudWxsO1xuICAgIHJldHVybiBjbXA7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGBSb3V0ZVJldXNlU3RyYXRlZ3lgIGluc3RydWN0cyB0byByZS1hdHRhY2ggYSBwcmV2aW91c2x5IGRldGFjaGVkIHN1YnRyZWVcbiAgICovXG4gIGF0dGFjaChyZWY6IENvbXBvbmVudFJlZjxhbnk+LCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICB0aGlzLmFjdGl2YXRlZCA9IHJlZjtcbiAgICB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xuICAgIHRoaXMubG9jYXRpb24uaW5zZXJ0KHJlZi5ob3N0Vmlldyk7XG4gIH1cblxuICBkZWFjdGl2YXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2YXRlZCkge1xuICAgICAgY29uc3QgYyA9IHRoaXMuY29tcG9uZW50O1xuICAgICAgdGhpcy5hY3RpdmF0ZWQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5hY3RpdmF0ZWQgPSBudWxsO1xuICAgICAgdGhpcy5fYWN0aXZhdGVkUm91dGUgPSBudWxsO1xuICAgICAgdGhpcy5kZWFjdGl2YXRlRXZlbnRzLmVtaXQoYyk7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGVXaXRoKGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcnxudWxsKSB7XG4gICAgaWYgKHRoaXMuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGFjdGl2YXRlIGFuIGFscmVhZHkgYWN0aXZhdGVkIG91dGxldCcpO1xuICAgIH1cbiAgICB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xuICAgIGNvbnN0IHNuYXBzaG90ID0gYWN0aXZhdGVkUm91dGUuX2Z1dHVyZVNuYXBzaG90O1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IDxhbnk+c25hcHNob3Qucm91dGVDb25maWcgIS5jb21wb25lbnQ7XG4gICAgcmVzb2x2ZXIgPSByZXNvbHZlciB8fCB0aGlzLnJlc29sdmVyO1xuICAgIGNvbnN0IGZhY3RvcnkgPSByZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgIGNvbnN0IGNoaWxkQ29udGV4dHMgPSB0aGlzLnBhcmVudENvbnRleHRzLmdldE9yQ3JlYXRlQ29udGV4dCh0aGlzLm5hbWUpLmNoaWxkcmVuO1xuICAgIGNvbnN0IGluamVjdG9yID0gbmV3IE91dGxldEluamVjdG9yKGFjdGl2YXRlZFJvdXRlLCBjaGlsZENvbnRleHRzLCB0aGlzLmxvY2F0aW9uLmluamVjdG9yKTtcbiAgICB0aGlzLmFjdGl2YXRlZCA9IHRoaXMubG9jYXRpb24uY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIHRoaXMubG9jYXRpb24ubGVuZ3RoLCBpbmplY3Rvcik7XG4gICAgLy8gQ2FsbGluZyBgbWFya0ZvckNoZWNrYCB0byBtYWtlIHN1cmUgd2Ugd2lsbCBydW4gdGhlIGNoYW5nZSBkZXRlY3Rpb24gd2hlbiB0aGVcbiAgICAvLyBgUm91dGVyT3V0bGV0YCBpcyBpbnNpZGUgYSBgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoYCBjb21wb25lbnQuXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmFjdGl2YXRlRXZlbnRzLmVtaXQodGhpcy5hY3RpdmF0ZWQuaW5zdGFuY2UpO1xuICB9XG59XG5cbmNsYXNzIE91dGxldEluamVjdG9yIGltcGxlbWVudHMgSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGNoaWxkQ29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMsXG4gICAgICBwcml2YXRlIHBhcmVudDogSW5qZWN0b3IpIHt9XG5cbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBhbnkge1xuICAgIGlmICh0b2tlbiA9PT0gQWN0aXZhdGVkUm91dGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnJvdXRlO1xuICAgIH1cblxuICAgIGlmICh0b2tlbiA9PT0gQ2hpbGRyZW5PdXRsZXRDb250ZXh0cykge1xuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRDb250ZXh0cztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0KHRva2VuLCBub3RGb3VuZFZhbHVlKTtcbiAgfVxufVxuIl19