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
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, RouterState } from './router_state';
import { TreeNode } from './utils/tree';
/**
 * @param {?} routeReuseStrategy
 * @param {?} curr
 * @param {?} prevState
 * @return {?}
 */
export function createRouterState(routeReuseStrategy, curr, prevState) {
    const /** @type {?} */ root = createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : undefined);
    return new RouterState(root, curr);
}
/**
 * @param {?} routeReuseStrategy
 * @param {?} curr
 * @param {?=} prevState
 * @return {?}
 */
function createNode(routeReuseStrategy, curr, prevState) {
    // reuse an activated route that is currently displayed on the screen
    if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
        const /** @type {?} */ value = prevState.value;
        value._futureSnapshot = curr.value;
        const /** @type {?} */ children = createOrReuseChildren(routeReuseStrategy, curr, prevState);
        return new TreeNode(value, children);
        // retrieve an activated route that is used to be displayed, but is not currently displayed
    }
    else if (routeReuseStrategy.retrieve(curr.value)) {
        const /** @type {?} */ tree = (/** @type {?} */ (routeReuseStrategy.retrieve(curr.value))).route;
        setFutureSnapshotsOfActivatedRoutes(curr, tree);
        return tree;
    }
    else {
        const /** @type {?} */ value = createActivatedRoute(curr.value);
        const /** @type {?} */ children = curr.children.map(c => createNode(routeReuseStrategy, c));
        return new TreeNode(value, children);
    }
}
/**
 * @param {?} curr
 * @param {?} result
 * @return {?}
 */
function setFutureSnapshotsOfActivatedRoutes(curr, result) {
    if (curr.value.routeConfig !== result.value.routeConfig) {
        throw new Error('Cannot reattach ActivatedRouteSnapshot created from a different route');
    }
    if (curr.children.length !== result.children.length) {
        throw new Error('Cannot reattach ActivatedRouteSnapshot with a different number of children');
    }
    result.value._futureSnapshot = curr.value;
    for (let /** @type {?} */ i = 0; i < curr.children.length; ++i) {
        setFutureSnapshotsOfActivatedRoutes(curr.children[i], result.children[i]);
    }
}
/**
 * @param {?} routeReuseStrategy
 * @param {?} curr
 * @param {?} prevState
 * @return {?}
 */
function createOrReuseChildren(routeReuseStrategy, curr, prevState) {
    return curr.children.map(child => {
        for (const /** @type {?} */ p of prevState.children) {
            if (routeReuseStrategy.shouldReuseRoute(p.value.snapshot, child.value)) {
                return createNode(routeReuseStrategy, child, p);
            }
        }
        return createNode(routeReuseStrategy, child);
    });
}
/**
 * @param {?} c
 * @return {?}
 */
function createActivatedRoute(c) {
    return new ActivatedRoute(new BehaviorSubject(c.url), new BehaviorSubject(c.params), new BehaviorSubject(c.queryParams), new BehaviorSubject(c.fragment), new BehaviorSubject(c.data), c.outlet, c.component, c);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX3JvdXRlcl9zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvY3JlYXRlX3JvdXRlcl9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHckMsT0FBTyxFQUFDLGNBQWMsRUFBMEIsV0FBVyxFQUFzQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hHLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7QUFFdEMsTUFBTSw0QkFDRixrQkFBc0MsRUFBRSxJQUF5QixFQUNqRSxTQUFzQjtJQUN4Qix1QkFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3BDOzs7Ozs7O0FBRUQsb0JBQ0ksa0JBQXNDLEVBQUUsSUFBc0MsRUFDOUUsU0FBb0M7O0lBRXRDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNGLHVCQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuQyx1QkFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBaUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztLQUd0RDtJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCx1QkFBTSxJQUFJLEdBQ04sbUJBQThCLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxLQUFLLENBQUM7UUFDakYsbUNBQW1DLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FFYjtJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sdUJBQU0sS0FBSyxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyx1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRSxNQUFNLENBQUMsSUFBSSxRQUFRLENBQWlCLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN0RDtDQUNGOzs7Ozs7QUFFRCw2Q0FDSSxJQUFzQyxFQUFFLE1BQWdDO0lBQzFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN4RCxNQUFNLElBQUksS0FBSyxDQUFDLHVFQUF1RSxDQUFDLENBQUM7S0FDMUY7SUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO0tBQy9GO0lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMxQyxHQUFHLENBQUMsQ0FBQyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzlDLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNFO0NBQ0Y7Ozs7Ozs7QUFFRCwrQkFDSSxrQkFBc0MsRUFBRSxJQUFzQyxFQUM5RSxTQUFtQztJQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0IsR0FBRyxDQUFDLENBQUMsdUJBQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0Y7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzlDLENBQUMsQ0FBQztDQUNKOzs7OztBQUVELDhCQUE4QixDQUF5QjtJQUNyRCxNQUFNLENBQUMsSUFBSSxjQUFjLENBQ3JCLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUM3RixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUM3RiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0RldGFjaGVkUm91dGVIYW5kbGVJbnRlcm5hbCwgUm91dGVSZXVzZVN0cmF0ZWd5fSBmcm9tICcuL3JvdXRlX3JldXNlX3N0cmF0ZWd5JztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90fSBmcm9tICcuL3JvdXRlcl9zdGF0ZSc7XG5pbXBvcnQge1RyZWVOb2RlfSBmcm9tICcuL3V0aWxzL3RyZWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm91dGVyU3RhdGUoXG4gICAgcm91dGVSZXVzZVN0cmF0ZWd5OiBSb3V0ZVJldXNlU3RyYXRlZ3ksIGN1cnI6IFJvdXRlclN0YXRlU25hcHNob3QsXG4gICAgcHJldlN0YXRlOiBSb3V0ZXJTdGF0ZSk6IFJvdXRlclN0YXRlIHtcbiAgY29uc3Qgcm9vdCA9IGNyZWF0ZU5vZGUocm91dGVSZXVzZVN0cmF0ZWd5LCBjdXJyLl9yb290LCBwcmV2U3RhdGUgPyBwcmV2U3RhdGUuX3Jvb3QgOiB1bmRlZmluZWQpO1xuICByZXR1cm4gbmV3IFJvdXRlclN0YXRlKHJvb3QsIGN1cnIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOb2RlKFxuICAgIHJvdXRlUmV1c2VTdHJhdGVneTogUm91dGVSZXVzZVN0cmF0ZWd5LCBjdXJyOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PixcbiAgICBwcmV2U3RhdGU/OiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4pOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4ge1xuICAvLyByZXVzZSBhbiBhY3RpdmF0ZWQgcm91dGUgdGhhdCBpcyBjdXJyZW50bHkgZGlzcGxheWVkIG9uIHRoZSBzY3JlZW5cbiAgaWYgKHByZXZTdGF0ZSAmJiByb3V0ZVJldXNlU3RyYXRlZ3kuc2hvdWxkUmV1c2VSb3V0ZShjdXJyLnZhbHVlLCBwcmV2U3RhdGUudmFsdWUuc25hcHNob3QpKSB7XG4gICAgY29uc3QgdmFsdWUgPSBwcmV2U3RhdGUudmFsdWU7XG4gICAgdmFsdWUuX2Z1dHVyZVNuYXBzaG90ID0gY3Vyci52YWx1ZTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGNyZWF0ZU9yUmV1c2VDaGlsZHJlbihyb3V0ZVJldXNlU3RyYXRlZ3ksIGN1cnIsIHByZXZTdGF0ZSk7XG4gICAgcmV0dXJuIG5ldyBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4odmFsdWUsIGNoaWxkcmVuKTtcblxuICAgIC8vIHJldHJpZXZlIGFuIGFjdGl2YXRlZCByb3V0ZSB0aGF0IGlzIHVzZWQgdG8gYmUgZGlzcGxheWVkLCBidXQgaXMgbm90IGN1cnJlbnRseSBkaXNwbGF5ZWRcbiAgfSBlbHNlIGlmIChyb3V0ZVJldXNlU3RyYXRlZ3kucmV0cmlldmUoY3Vyci52YWx1ZSkpIHtcbiAgICBjb25zdCB0cmVlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4gPVxuICAgICAgICAoPERldGFjaGVkUm91dGVIYW5kbGVJbnRlcm5hbD5yb3V0ZVJldXNlU3RyYXRlZ3kucmV0cmlldmUoY3Vyci52YWx1ZSkpLnJvdXRlO1xuICAgIHNldEZ1dHVyZVNuYXBzaG90c09mQWN0aXZhdGVkUm91dGVzKGN1cnIsIHRyZWUpO1xuICAgIHJldHVybiB0cmVlO1xuXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdmFsdWUgPSBjcmVhdGVBY3RpdmF0ZWRSb3V0ZShjdXJyLnZhbHVlKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGN1cnIuY2hpbGRyZW4ubWFwKGMgPT4gY3JlYXRlTm9kZShyb3V0ZVJldXNlU3RyYXRlZ3ksIGMpKTtcbiAgICByZXR1cm4gbmV3IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPih2YWx1ZSwgY2hpbGRyZW4pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEZ1dHVyZVNuYXBzaG90c09mQWN0aXZhdGVkUm91dGVzKFxuICAgIGN1cnI6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LCByZXN1bHQ6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPik6IHZvaWQge1xuICBpZiAoY3Vyci52YWx1ZS5yb3V0ZUNvbmZpZyAhPT0gcmVzdWx0LnZhbHVlLnJvdXRlQ29uZmlnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVhdHRhY2ggQWN0aXZhdGVkUm91dGVTbmFwc2hvdCBjcmVhdGVkIGZyb20gYSBkaWZmZXJlbnQgcm91dGUnKTtcbiAgfVxuICBpZiAoY3Vyci5jaGlsZHJlbi5sZW5ndGggIT09IHJlc3VsdC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZWF0dGFjaCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IHdpdGggYSBkaWZmZXJlbnQgbnVtYmVyIG9mIGNoaWxkcmVuJyk7XG4gIH1cbiAgcmVzdWx0LnZhbHVlLl9mdXR1cmVTbmFwc2hvdCA9IGN1cnIudmFsdWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3Vyci5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgIHNldEZ1dHVyZVNuYXBzaG90c09mQWN0aXZhdGVkUm91dGVzKGN1cnIuY2hpbGRyZW5baV0sIHJlc3VsdC5jaGlsZHJlbltpXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlT3JSZXVzZUNoaWxkcmVuKFxuICAgIHJvdXRlUmV1c2VTdHJhdGVneTogUm91dGVSZXVzZVN0cmF0ZWd5LCBjdXJyOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PixcbiAgICBwcmV2U3RhdGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPikge1xuICByZXR1cm4gY3Vyci5jaGlsZHJlbi5tYXAoY2hpbGQgPT4ge1xuICAgIGZvciAoY29uc3QgcCBvZiBwcmV2U3RhdGUuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChyb3V0ZVJldXNlU3RyYXRlZ3kuc2hvdWxkUmV1c2VSb3V0ZShwLnZhbHVlLnNuYXBzaG90LCBjaGlsZC52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU5vZGUocm91dGVSZXVzZVN0cmF0ZWd5LCBjaGlsZCwgcCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVOb2RlKHJvdXRlUmV1c2VTdHJhdGVneSwgY2hpbGQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQWN0aXZhdGVkUm91dGUoYzogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge1xuICByZXR1cm4gbmV3IEFjdGl2YXRlZFJvdXRlKFxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdChjLnVybCksIG5ldyBCZWhhdmlvclN1YmplY3QoYy5wYXJhbXMpLCBuZXcgQmVoYXZpb3JTdWJqZWN0KGMucXVlcnlQYXJhbXMpLFxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdChjLmZyYWdtZW50KSwgbmV3IEJlaGF2aW9yU3ViamVjdChjLmRhdGEpLCBjLm91dGxldCwgYy5jb21wb25lbnQsIGMpO1xufVxuIl19