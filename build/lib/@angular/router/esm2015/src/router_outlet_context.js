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
/**
 * Store contextual information about a {\@link RouterOutlet}
 *
 * \@stable
 */
export class OutletContext {
    constructor() {
        this.outlet = null;
        this.route = null;
        this.resolver = null;
        this.children = new ChildrenOutletContexts();
        this.attachRef = null;
    }
}
function OutletContext_tsickle_Closure_declarations() {
    /** @type {?} */
    OutletContext.prototype.outlet;
    /** @type {?} */
    OutletContext.prototype.route;
    /** @type {?} */
    OutletContext.prototype.resolver;
    /** @type {?} */
    OutletContext.prototype.children;
    /** @type {?} */
    OutletContext.prototype.attachRef;
}
/**
 * Store contextual information about the children (= nested) {\@link RouterOutlet}
 *
 * \@stable
 */
export class ChildrenOutletContexts {
    constructor() {
        this.contexts = new Map();
    }
    /**
     * Called when a `RouterOutlet` directive is instantiated
     * @param {?} childName
     * @param {?} outlet
     * @return {?}
     */
    onChildOutletCreated(childName, outlet) {
        const /** @type {?} */ context = this.getOrCreateContext(childName);
        context.outlet = outlet;
        this.contexts.set(childName, context);
    }
    /**
     * Called when a `RouterOutlet` directive is destroyed.
     * We need to keep the context as the outlet could be destroyed inside a NgIf and might be
     * re-created later.
     * @param {?} childName
     * @return {?}
     */
    onChildOutletDestroyed(childName) {
        const /** @type {?} */ context = this.getContext(childName);
        if (context) {
            context.outlet = null;
        }
    }
    /**
     * Called when the corresponding route is deactivated during navigation.
     * Because the component get destroyed, all children outlet are destroyed.
     * @return {?}
     */
    onOutletDeactivated() {
        const /** @type {?} */ contexts = this.contexts;
        this.contexts = new Map();
        return contexts;
    }
    /**
     * @param {?} contexts
     * @return {?}
     */
    onOutletReAttached(contexts) { this.contexts = contexts; }
    /**
     * @param {?} childName
     * @return {?}
     */
    getOrCreateContext(childName) {
        let /** @type {?} */ context = this.getContext(childName);
        if (!context) {
            context = new OutletContext();
            this.contexts.set(childName, context);
        }
        return context;
    }
    /**
     * @param {?} childName
     * @return {?}
     */
    getContext(childName) { return this.contexts.get(childName) || null; }
}
function ChildrenOutletContexts_tsickle_Closure_declarations() {
    /** @type {?} */
    ChildrenOutletContexts.prototype.contexts;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX291dGxldF9jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9yb3V0ZXJfb3V0bGV0X2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNOztzQkFDd0IsSUFBSTtxQkFDSCxJQUFJO3dCQUNTLElBQUk7d0JBQ25DLElBQUksc0JBQXNCLEVBQUU7eUJBQ0gsSUFBSTs7Q0FDekM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9ELE1BQU07O3dCQUVlLElBQUksR0FBRyxFQUF5Qjs7Ozs7Ozs7SUFHbkQsb0JBQW9CLENBQUMsU0FBaUIsRUFBRSxNQUFvQjtRQUMxRCx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2Qzs7Ozs7Ozs7SUFPRCxzQkFBc0IsQ0FBQyxTQUFpQjtRQUN0Qyx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdkI7S0FDRjs7Ozs7O0lBTUQsbUJBQW1CO1FBQ2pCLHVCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2pCOzs7OztJQUVELGtCQUFrQixDQUFDLFFBQW9DLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsRUFBRTs7Ozs7SUFFdEYsa0JBQWtCLENBQUMsU0FBaUI7UUFDbEMscUJBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztLQUNoQjs7Ozs7SUFFRCxVQUFVLENBQUMsU0FBaUIsSUFBd0IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO0NBQ25HIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gJy4vcm91dGVyX3N0YXRlJztcblxuXG4vKipcbiAqIFN0b3JlIGNvbnRleHR1YWwgaW5mb3JtYXRpb24gYWJvdXQgYSB7QGxpbmsgUm91dGVyT3V0bGV0fVxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGNsYXNzIE91dGxldENvbnRleHQge1xuICBvdXRsZXQ6IFJvdXRlck91dGxldHxudWxsID0gbnVsbDtcbiAgcm91dGU6IEFjdGl2YXRlZFJvdXRlfG51bGwgPSBudWxsO1xuICByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyfG51bGwgPSBudWxsO1xuICBjaGlsZHJlbiA9IG5ldyBDaGlsZHJlbk91dGxldENvbnRleHRzKCk7XG4gIGF0dGFjaFJlZjogQ29tcG9uZW50UmVmPGFueT58bnVsbCA9IG51bGw7XG59XG5cbi8qKlxuICogU3RvcmUgY29udGV4dHVhbCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2hpbGRyZW4gKD0gbmVzdGVkKSB7QGxpbmsgUm91dGVyT3V0bGV0fVxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGNsYXNzIENoaWxkcmVuT3V0bGV0Q29udGV4dHMge1xuICAvLyBjb250ZXh0cyBmb3IgY2hpbGQgb3V0bGV0cywgYnkgbmFtZS5cbiAgcHJpdmF0ZSBjb250ZXh0cyA9IG5ldyBNYXA8c3RyaW5nLCBPdXRsZXRDb250ZXh0PigpO1xuXG4gIC8qKiBDYWxsZWQgd2hlbiBhIGBSb3V0ZXJPdXRsZXRgIGRpcmVjdGl2ZSBpcyBpbnN0YW50aWF0ZWQgKi9cbiAgb25DaGlsZE91dGxldENyZWF0ZWQoY2hpbGROYW1lOiBzdHJpbmcsIG91dGxldDogUm91dGVyT3V0bGV0KTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2V0T3JDcmVhdGVDb250ZXh0KGNoaWxkTmFtZSk7XG4gICAgY29udGV4dC5vdXRsZXQgPSBvdXRsZXQ7XG4gICAgdGhpcy5jb250ZXh0cy5zZXQoY2hpbGROYW1lLCBjb250ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGBSb3V0ZXJPdXRsZXRgIGRpcmVjdGl2ZSBpcyBkZXN0cm95ZWQuXG4gICAqIFdlIG5lZWQgdG8ga2VlcCB0aGUgY29udGV4dCBhcyB0aGUgb3V0bGV0IGNvdWxkIGJlIGRlc3Ryb3llZCBpbnNpZGUgYSBOZ0lmIGFuZCBtaWdodCBiZVxuICAgKiByZS1jcmVhdGVkIGxhdGVyLlxuICAgKi9cbiAgb25DaGlsZE91dGxldERlc3Ryb3llZChjaGlsZE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldENvbnRleHQoY2hpbGROYW1lKTtcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgY29udGV4dC5vdXRsZXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgY29ycmVzcG9uZGluZyByb3V0ZSBpcyBkZWFjdGl2YXRlZCBkdXJpbmcgbmF2aWdhdGlvbi5cbiAgICogQmVjYXVzZSB0aGUgY29tcG9uZW50IGdldCBkZXN0cm95ZWQsIGFsbCBjaGlsZHJlbiBvdXRsZXQgYXJlIGRlc3Ryb3llZC5cbiAgICovXG4gIG9uT3V0bGV0RGVhY3RpdmF0ZWQoKTogTWFwPHN0cmluZywgT3V0bGV0Q29udGV4dD4ge1xuICAgIGNvbnN0IGNvbnRleHRzID0gdGhpcy5jb250ZXh0cztcbiAgICB0aGlzLmNvbnRleHRzID0gbmV3IE1hcCgpO1xuICAgIHJldHVybiBjb250ZXh0cztcbiAgfVxuXG4gIG9uT3V0bGV0UmVBdHRhY2hlZChjb250ZXh0czogTWFwPHN0cmluZywgT3V0bGV0Q29udGV4dD4pIHsgdGhpcy5jb250ZXh0cyA9IGNvbnRleHRzOyB9XG5cbiAgZ2V0T3JDcmVhdGVDb250ZXh0KGNoaWxkTmFtZTogc3RyaW5nKTogT3V0bGV0Q29udGV4dCB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLmdldENvbnRleHQoY2hpbGROYW1lKTtcblxuICAgIGlmICghY29udGV4dCkge1xuICAgICAgY29udGV4dCA9IG5ldyBPdXRsZXRDb250ZXh0KCk7XG4gICAgICB0aGlzLmNvbnRleHRzLnNldChjaGlsZE5hbWUsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0O1xuICB9XG5cbiAgZ2V0Q29udGV4dChjaGlsZE5hbWU6IHN0cmluZyk6IE91dGxldENvbnRleHR8bnVsbCB7IHJldHVybiB0aGlzLmNvbnRleHRzLmdldChjaGlsZE5hbWUpIHx8IG51bGw7IH1cbn1cbiJdfQ==