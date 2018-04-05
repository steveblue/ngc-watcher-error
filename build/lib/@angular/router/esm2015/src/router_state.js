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
import { map } from 'rxjs/operators';
import { PRIMARY_OUTLET, convertToParamMap } from './shared';
import { UrlSegment, equalSegments } from './url_tree';
import { shallowEqual, shallowEqualArrays } from './utils/collection';
import { Tree, TreeNode } from './utils/tree';
/**
 * \@whatItDoes Represents the state of the router.
 *
 * \@howToUse
 *
 * ```
 * \@Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state: RouterState = router.routerState;
 *     const root: ActivatedRoute = state.root;
 *     const child = root.firstChild;
 *     const id: Observable<string> = child.params.map(p => p.id);
 *     //...
 *   }
 * }
 * ```
 *
 * \@description
 * RouterState is a tree of activated routes. Every node in this tree knows about the "consumed" URL
 * segments, the extracted parameters, and the resolved data.
 *
 * See {\@link ActivatedRoute} for more information.
 *
 * \@stable
 */
export class RouterState extends Tree {
    /**
     * \@internal
     * @param {?} root
     * @param {?} snapshot
     */
    constructor(root, snapshot) {
        super(root);
        this.snapshot = snapshot;
        setRouterState(/** @type {?} */ (this), root);
    }
    /**
     * @return {?}
     */
    toString() { return this.snapshot.toString(); }
}
function RouterState_tsickle_Closure_declarations() {
    /**
     * The current snapshot of the router state
     * @type {?}
     */
    RouterState.prototype.snapshot;
}
/**
 * @param {?} urlTree
 * @param {?} rootComponent
 * @return {?}
 */
export function createEmptyState(urlTree, rootComponent) {
    const /** @type {?} */ snapshot = createEmptyStateSnapshot(urlTree, rootComponent);
    const /** @type {?} */ emptyUrl = new BehaviorSubject([new UrlSegment('', {})]);
    const /** @type {?} */ emptyParams = new BehaviorSubject({});
    const /** @type {?} */ emptyData = new BehaviorSubject({});
    const /** @type {?} */ emptyQueryParams = new BehaviorSubject({});
    const /** @type {?} */ fragment = new BehaviorSubject('');
    const /** @type {?} */ activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, snapshot.root);
    activated.snapshot = snapshot.root;
    return new RouterState(new TreeNode(activated, []), snapshot);
}
/**
 * @param {?} urlTree
 * @param {?} rootComponent
 * @return {?}
 */
export function createEmptyStateSnapshot(urlTree, rootComponent) {
    const /** @type {?} */ emptyParams = {};
    const /** @type {?} */ emptyData = {};
    const /** @type {?} */ emptyQueryParams = {};
    const /** @type {?} */ fragment = '';
    const /** @type {?} */ activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, null, urlTree.root, -1, {});
    return new RouterStateSnapshot('', new TreeNode(activated, []));
}
/**
 * \@whatItDoes Contains the information about a route associated with a component loaded in an
 * outlet.
 * An `ActivatedRoute` can also be used to traverse the router state tree.
 *
 * \@howToUse
 *
 * ```
 * \@Component({...})
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: Observable<string> = route.params.map(p => p.id);
 *     const url: Observable<string> = route.url.map(segments => segments.join(''));
 *     // route.data includes both `data` and `resolve`
 *     const user = route.data.map(d => d.user);
 *   }
 * }
 * ```
 *
 * \@stable
 */
export class ActivatedRoute {
    /**
     * \@internal
     * @param {?} url
     * @param {?} params
     * @param {?} queryParams
     * @param {?} fragment
     * @param {?} data
     * @param {?} outlet
     * @param {?} component
     * @param {?} futureSnapshot
     */
    constructor(url, params, queryParams, fragment, data, outlet, component, futureSnapshot) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this._futureSnapshot = futureSnapshot;
    }
    /**
     * The configuration used to match this route
     * @return {?}
     */
    get routeConfig() { return this._futureSnapshot.routeConfig; }
    /**
     * The root of the router state
     * @return {?}
     */
    get root() { return this._routerState.root; }
    /**
     * The parent of this route in the router state tree
     * @return {?}
     */
    get parent() { return this._routerState.parent(this); }
    /**
     * The first child of this route in the router state tree
     * @return {?}
     */
    get firstChild() { return this._routerState.firstChild(this); }
    /**
     * The children of this route in the router state tree
     * @return {?}
     */
    get children() { return this._routerState.children(this); }
    /**
     * The path from the root of the router state tree to this route
     * @return {?}
     */
    get pathFromRoot() { return this._routerState.pathFromRoot(this); }
    /**
     * @return {?}
     */
    get paramMap() {
        if (!this._paramMap) {
            this._paramMap = this.params.pipe(map((p) => convertToParamMap(p)));
        }
        return this._paramMap;
    }
    /**
     * @return {?}
     */
    get queryParamMap() {
        if (!this._queryParamMap) {
            this._queryParamMap =
                this.queryParams.pipe(map((p) => convertToParamMap(p)));
        }
        return this._queryParamMap;
    }
    /**
     * @return {?}
     */
    toString() {
        return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
    }
}
function ActivatedRoute_tsickle_Closure_declarations() {
    /**
     * The current snapshot of this route
     * @type {?}
     */
    ActivatedRoute.prototype.snapshot;
    /**
     * \@internal
     * @type {?}
     */
    ActivatedRoute.prototype._futureSnapshot;
    /**
     * \@internal
     * @type {?}
     */
    ActivatedRoute.prototype._routerState;
    /**
     * \@internal
     * @type {?}
     */
    ActivatedRoute.prototype._paramMap;
    /**
     * \@internal
     * @type {?}
     */
    ActivatedRoute.prototype._queryParamMap;
    /**
     * An observable of the URL segments matched by this route
     * @type {?}
     */
    ActivatedRoute.prototype.url;
    /**
     * An observable of the matrix parameters scoped to this route
     * @type {?}
     */
    ActivatedRoute.prototype.params;
    /**
     * An observable of the query parameters shared by all the routes
     * @type {?}
     */
    ActivatedRoute.prototype.queryParams;
    /**
     * An observable of the URL fragment shared by all the routes
     * @type {?}
     */
    ActivatedRoute.prototype.fragment;
    /**
     * An observable of the static and resolved data of this route.
     * @type {?}
     */
    ActivatedRoute.prototype.data;
    /**
     * The outlet name of the route. It's a constant
     * @type {?}
     */
    ActivatedRoute.prototype.outlet;
    /**
     * The component of the route. It's a constant
     * @type {?}
     */
    ActivatedRoute.prototype.component;
}
/**
 * Returns the inherited params, data, and resolve for a given route.
 * By default, this only inherits values up to the nearest path-less or component-less route.
 * \@internal
 * @param {?} route
 * @param {?=} paramsInheritanceStrategy
 * @return {?}
 */
export function inheritedParamsDataResolve(route, paramsInheritanceStrategy = 'emptyOnly') {
    const /** @type {?} */ pathFromRoot = route.pathFromRoot;
    let /** @type {?} */ inheritingStartingFrom = 0;
    if (paramsInheritanceStrategy !== 'always') {
        inheritingStartingFrom = pathFromRoot.length - 1;
        while (inheritingStartingFrom >= 1) {
            const /** @type {?} */ current = pathFromRoot[inheritingStartingFrom];
            const /** @type {?} */ parent = pathFromRoot[inheritingStartingFrom - 1];
            // current route is an empty path => inherits its parent's params and data
            if (current.routeConfig && current.routeConfig.path === '') {
                inheritingStartingFrom--;
                // parent is componentless => current route should inherit its params and data
            }
            else if (!parent.component) {
                inheritingStartingFrom--;
            }
            else {
                break;
            }
        }
    }
    return flattenInherited(pathFromRoot.slice(inheritingStartingFrom));
}
/**
 * \@internal
 * @param {?} pathFromRoot
 * @return {?}
 */
function flattenInherited(pathFromRoot) {
    return pathFromRoot.reduce((res, curr) => {
        const /** @type {?} */ params = Object.assign({}, res.params, curr.params);
        const /** @type {?} */ data = Object.assign({}, res.data, curr.data);
        const /** @type {?} */ resolve = Object.assign({}, res.resolve, curr._resolvedData);
        return { params, data, resolve };
    }, /** @type {?} */ ({ params: {}, data: {}, resolve: {} }));
}
/**
 * \@whatItDoes Contains the information about a route associated with a component loaded in an
 * outlet
 * at a particular moment in time. ActivatedRouteSnapshot can also be used to traverse the router
 * state tree.
 *
 * \@howToUse
 *
 * ```
 * \@Component({templateUrl:'./my-component.html'})
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: string = route.snapshot.params.id;
 *     const url: string = route.snapshot.url.join('');
 *     const user = route.snapshot.data.user;
 *   }
 * }
 * ```
 *
 * \@stable
 */
export class ActivatedRouteSnapshot {
    /**
     * \@internal
     * @param {?} url
     * @param {?} params
     * @param {?} queryParams
     * @param {?} fragment
     * @param {?} data
     * @param {?} outlet
     * @param {?} component
     * @param {?} routeConfig
     * @param {?} urlSegment
     * @param {?} lastPathIndex
     * @param {?} resolve
     */
    constructor(url, params, queryParams, fragment, data, outlet, component, routeConfig, urlSegment, lastPathIndex, resolve) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this.routeConfig = routeConfig;
        this._urlSegment = urlSegment;
        this._lastPathIndex = lastPathIndex;
        this._resolve = resolve;
    }
    /**
     * The root of the router state
     * @return {?}
     */
    get root() { return this._routerState.root; }
    /**
     * The parent of this route in the router state tree
     * @return {?}
     */
    get parent() { return this._routerState.parent(this); }
    /**
     * The first child of this route in the router state tree
     * @return {?}
     */
    get firstChild() { return this._routerState.firstChild(this); }
    /**
     * The children of this route in the router state tree
     * @return {?}
     */
    get children() { return this._routerState.children(this); }
    /**
     * The path from the root of the router state tree to this route
     * @return {?}
     */
    get pathFromRoot() { return this._routerState.pathFromRoot(this); }
    /**
     * @return {?}
     */
    get paramMap() {
        if (!this._paramMap) {
            this._paramMap = convertToParamMap(this.params);
        }
        return this._paramMap;
    }
    /**
     * @return {?}
     */
    get queryParamMap() {
        if (!this._queryParamMap) {
            this._queryParamMap = convertToParamMap(this.queryParams);
        }
        return this._queryParamMap;
    }
    /**
     * @return {?}
     */
    toString() {
        const /** @type {?} */ url = this.url.map(segment => segment.toString()).join('/');
        const /** @type {?} */ matched = this.routeConfig ? this.routeConfig.path : '';
        return `Route(url:'${url}', path:'${matched}')`;
    }
}
function ActivatedRouteSnapshot_tsickle_Closure_declarations() {
    /**
     * The configuration used to match this route *
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype.routeConfig;
    /**
     * \@internal *
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype._urlSegment;
    /**
     * \@internal
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype._lastPathIndex;
    /**
     * \@internal
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype._resolve;
    /**
     * \@internal
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype._resolvedData;
    /**
     * \@internal
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype._routerState;
    /**
     * \@internal
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype._paramMap;
    /**
     * \@internal
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype._queryParamMap;
    /**
     * The URL segments matched by this route
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype.url;
    /**
     * The matrix parameters scoped to this route
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype.params;
    /**
     * The query parameters shared by all the routes
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype.queryParams;
    /**
     * The URL fragment shared by all the routes
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype.fragment;
    /**
     * The static and resolved data of this route
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype.data;
    /**
     * The outlet name of the route
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype.outlet;
    /**
     * The component of the route
     * @type {?}
     */
    ActivatedRouteSnapshot.prototype.component;
}
/**
 * \@whatItDoes Represents the state of the router at a moment in time.
 *
 * \@howToUse
 *
 * ```
 * \@Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state: RouterState = router.routerState;
 *     const snapshot: RouterStateSnapshot = state.snapshot;
 *     const root: ActivatedRouteSnapshot = snapshot.root;
 *     const child = root.firstChild;
 *     const id: Observable<string> = child.params.map(p => p.id);
 *     //...
 *   }
 * }
 * ```
 *
 * \@description
 * RouterStateSnapshot is a tree of activated route snapshots. Every node in this tree knows about
 * the "consumed" URL segments, the extracted parameters, and the resolved data.
 *
 * \@stable
 */
export class RouterStateSnapshot extends Tree {
    /**
     * \@internal
     * @param {?} url
     * @param {?} root
     */
    constructor(url, root) {
        super(root);
        this.url = url;
        setRouterState(/** @type {?} */ (this), root);
    }
    /**
     * @return {?}
     */
    toString() { return serializeNode(this._root); }
}
function RouterStateSnapshot_tsickle_Closure_declarations() {
    /**
     * The url from which this snapshot was created
     * @type {?}
     */
    RouterStateSnapshot.prototype.url;
}
/**
 * @template U, T
 * @param {?} state
 * @param {?} node
 * @return {?}
 */
function setRouterState(state, node) {
    node.value._routerState = state;
    node.children.forEach(c => setRouterState(state, c));
}
/**
 * @param {?} node
 * @return {?}
 */
function serializeNode(node) {
    const /** @type {?} */ c = node.children.length > 0 ? ` { ${node.children.map(serializeNode).join(', ')} } ` : '';
    return `${node.value}${c}`;
}
/**
 * The expectation is that the activate route is created with the right set of parameters.
 * So we push new values into the observables only when they are not the initial values.
 * And we detect that by checking if the snapshot field is set.
 * @param {?} route
 * @return {?}
 */
export function advanceActivatedRoute(route) {
    if (route.snapshot) {
        const /** @type {?} */ currentSnapshot = route.snapshot;
        const /** @type {?} */ nextSnapshot = route._futureSnapshot;
        route.snapshot = nextSnapshot;
        if (!shallowEqual(currentSnapshot.queryParams, nextSnapshot.queryParams)) {
            (/** @type {?} */ (route.queryParams)).next(nextSnapshot.queryParams);
        }
        if (currentSnapshot.fragment !== nextSnapshot.fragment) {
            (/** @type {?} */ (route.fragment)).next(nextSnapshot.fragment);
        }
        if (!shallowEqual(currentSnapshot.params, nextSnapshot.params)) {
            (/** @type {?} */ (route.params)).next(nextSnapshot.params);
        }
        if (!shallowEqualArrays(currentSnapshot.url, nextSnapshot.url)) {
            (/** @type {?} */ (route.url)).next(nextSnapshot.url);
        }
        if (!shallowEqual(currentSnapshot.data, nextSnapshot.data)) {
            (/** @type {?} */ (route.data)).next(nextSnapshot.data);
        }
    }
    else {
        route.snapshot = route._futureSnapshot;
        // this is for resolved data
        (/** @type {?} */ (route.data)).next(route._futureSnapshot.data);
    }
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function equalParamsAndUrlSegments(a, b) {
    const /** @type {?} */ equalUrlParams = shallowEqual(a.params, b.params) && equalSegments(a.url, b.url);
    const /** @type {?} */ parentsMismatch = !a.parent !== !b.parent;
    return equalUrlParams && !parentsMismatch &&
        (!a.parent || equalParamsAndUrlSegments(a.parent, /** @type {?} */ ((b.parent))));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3N0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9yb3V0ZXJfc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFTQSxPQUFPLEVBQUMsZUFBZSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUduQyxPQUFPLEVBQUMsY0FBYyxFQUFvQixpQkFBaUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsVUFBVSxFQUE0QixhQUFhLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDL0UsT0FBTyxFQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QjVDLE1BQU0sa0JBQW1CLFNBQVEsSUFBb0I7Ozs7OztJQUVuRCxZQUNJLElBQThCLEVBRXZCO1FBQ1QsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBREgsYUFBUSxHQUFSLFFBQVE7UUFFakIsY0FBYyxtQkFBYyxJQUFJLEdBQUUsSUFBSSxDQUFDLENBQUM7S0FDekM7Ozs7SUFFRCxRQUFRLEtBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtDQUN4RDs7Ozs7Ozs7Ozs7OztBQUVELE1BQU0sMkJBQTJCLE9BQWdCLEVBQUUsYUFBOEI7SUFDL0UsdUJBQU0sUUFBUSxHQUFHLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNsRSx1QkFBTSxRQUFRLEdBQUcsSUFBSSxlQUFlLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELHVCQUFNLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1Qyx1QkFBTSxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsdUJBQU0sZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakQsdUJBQU0sUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLHVCQUFNLFNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FDaEMsUUFBUSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQzNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQixTQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDbkMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksUUFBUSxDQUFpQixTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDL0U7Ozs7OztBQUVELE1BQU0sbUNBQ0YsT0FBZ0IsRUFBRSxhQUE4QjtJQUNsRCx1QkFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLHVCQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDckIsdUJBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzVCLHVCQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsdUJBQU0sU0FBUyxHQUFHLElBQUksc0JBQXNCLENBQ3hDLEVBQUUsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLElBQUksRUFDM0YsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQixNQUFNLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxRQUFRLENBQXlCLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3pGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJELE1BQU07Ozs7Ozs7Ozs7OztJQWFKLFlBRVcsS0FFQSxRQUVBLGFBRUEsVUFFQSxNQUVBLFFBR0EsV0FBa0MsY0FBc0M7UUFieEUsUUFBRyxHQUFILEdBQUc7UUFFSCxXQUFNLEdBQU4sTUFBTTtRQUVOLGdCQUFXLEdBQVgsV0FBVztRQUVYLGFBQVEsR0FBUixRQUFRO1FBRVIsU0FBSSxHQUFKLElBQUk7UUFFSixXQUFNLEdBQU4sTUFBTTtRQUdOLGNBQVMsR0FBVCxTQUFTO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO0tBQ3ZDOzs7OztJQUdELElBQUksV0FBVyxLQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsRUFBRTs7Ozs7SUFHMUUsSUFBSSxJQUFJLEtBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFOzs7OztJQUc3RCxJQUFJLE1BQU0sS0FBMEIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRzVFLElBQUksVUFBVSxLQUEwQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFHcEYsSUFBSSxRQUFRLEtBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7OztJQUc3RSxJQUFJLFlBQVksS0FBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFckYsSUFBSSxRQUFRO1FBQ1YsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVMsRUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7Ozs7SUFFRCxJQUFJLGFBQWE7UUFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxjQUFjO2dCQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVMsRUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9FO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7S0FDNUI7Ozs7SUFFRCxRQUFRO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDO0tBQ3JGO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JELE1BQU0scUNBQ0YsS0FBNkIsRUFDN0IsNEJBQXVELFdBQVc7SUFDcEUsdUJBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFFeEMscUJBQUksc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0Msc0JBQXNCLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFakQsT0FBTyxzQkFBc0IsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNuQyx1QkFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDckQsdUJBQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQzs7WUFFeEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxzQkFBc0IsRUFBRSxDQUFDOzthQUcxQjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixzQkFBc0IsRUFBRSxDQUFDO2FBRTFCO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSyxDQUFDO2FBQ1A7U0FDRjtLQUNGO0lBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0NBQ3JFOzs7Ozs7QUFHRCwwQkFBMEIsWUFBc0M7SUFDOUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdkMsdUJBQU0sTUFBTSxxQkFBTyxHQUFHLENBQUMsTUFBTSxFQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyx1QkFBTSxJQUFJLHFCQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLHVCQUFNLE9BQU8scUJBQU8sR0FBRyxDQUFDLE9BQU8sRUFBSyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztLQUNoQyxvQkFBTyxFQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFDLEVBQUMsQ0FBQztDQUM5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCRCxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7SUFtQkosWUFFVyxLQUVBLFFBRUEsYUFFQSxVQUVBLE1BRUEsUUFFQSxXQUFrQyxXQUF1QixFQUFFLFVBQTJCLEVBQzdGLGFBQXFCLEVBQUUsT0FBb0I7UUFicEMsUUFBRyxHQUFILEdBQUc7UUFFSCxXQUFNLEdBQU4sTUFBTTtRQUVOLGdCQUFXLEdBQVgsV0FBVztRQUVYLGFBQVEsR0FBUixRQUFRO1FBRVIsU0FBSSxHQUFKLElBQUk7UUFFSixXQUFNLEdBQU4sTUFBTTtRQUVOLGNBQVMsR0FBVCxTQUFTO1FBRWxCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0tBQ3pCOzs7OztJQUdELElBQUksSUFBSSxLQUE2QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTs7Ozs7SUFHckUsSUFBSSxNQUFNLEtBQWtDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7OztJQUdwRixJQUFJLFVBQVUsS0FBa0MsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRzVGLElBQUksUUFBUSxLQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTs7Ozs7SUFHckYsSUFBSSxZQUFZLEtBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7O0lBRTdGLElBQUksUUFBUTtRQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakQ7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN2Qjs7OztJQUVELElBQUksYUFBYTtRQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztLQUM1Qjs7OztJQUVELFFBQVE7UUFDTix1QkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsdUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUQsTUFBTSxDQUFDLGNBQWMsR0FBRyxZQUFZLE9BQU8sSUFBSSxDQUFDO0tBQ2pEO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkQsTUFBTSwwQkFBMkIsU0FBUSxJQUE0Qjs7Ozs7O0lBRW5FLFlBRVcsS0FBYSxJQUFzQztRQUM1RCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFESCxRQUFHLEdBQUgsR0FBRztRQUVaLGNBQWMsbUJBQXNCLElBQUksR0FBRSxJQUFJLENBQUMsQ0FBQztLQUNqRDs7OztJQUVELFFBQVEsS0FBYSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0NBQ3pEOzs7Ozs7Ozs7Ozs7OztBQUVELHdCQUF1RCxLQUFRLEVBQUUsSUFBaUI7SUFDaEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3REOzs7OztBQUVELHVCQUF1QixJQUFzQztJQUMzRCx1QkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztDQUM1Qjs7Ozs7Ozs7QUFPRCxNQUFNLGdDQUFnQyxLQUFxQjtJQUN6RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNuQix1QkFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN2Qyx1QkFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUMzQyxLQUFLLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsbUJBQU0sS0FBSyxDQUFDLFdBQVcsRUFBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDekQ7UUFDRCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELG1CQUFNLEtBQUssQ0FBQyxRQUFRLEVBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELG1CQUFNLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsbUJBQU0sS0FBSyxDQUFDLEdBQUcsRUFBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsbUJBQU0sS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0M7S0FDRjtJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDOztRQUd2QyxtQkFBTSxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEQ7Q0FDRjs7Ozs7O0FBR0QsTUFBTSxvQ0FDRixDQUF5QixFQUFFLENBQXlCO0lBQ3RELHVCQUFNLGNBQWMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZGLHVCQUFNLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRWhELE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxlQUFlO1FBQ3JDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxNQUFNLHFCQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0NBQ3BFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtEYXRhLCBSZXNvbHZlRGF0YSwgUm91dGV9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7UFJJTUFSWV9PVVRMRVQsIFBhcmFtTWFwLCBQYXJhbXMsIGNvbnZlcnRUb1BhcmFtTWFwfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge1VybFNlZ21lbnQsIFVybFNlZ21lbnRHcm91cCwgVXJsVHJlZSwgZXF1YWxTZWdtZW50c30gZnJvbSAnLi91cmxfdHJlZSc7XG5pbXBvcnQge3NoYWxsb3dFcXVhbCwgc2hhbGxvd0VxdWFsQXJyYXlzfSBmcm9tICcuL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUcmVlLCBUcmVlTm9kZX0gZnJvbSAnLi91dGlscy90cmVlJztcblxuXG5cbi8qKlxuICogQHdoYXRJdERvZXMgUmVwcmVzZW50cyB0aGUgc3RhdGUgb2YgdGhlIHJvdXRlci5cbiAqXG4gKiBAaG93VG9Vc2VcbiAqXG4gKiBgYGBcbiAqIEBDb21wb25lbnQoe3RlbXBsYXRlVXJsOid0ZW1wbGF0ZS5odG1sJ30pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKSB7XG4gKiAgICAgY29uc3Qgc3RhdGU6IFJvdXRlclN0YXRlID0gcm91dGVyLnJvdXRlclN0YXRlO1xuICogICAgIGNvbnN0IHJvb3Q6IEFjdGl2YXRlZFJvdXRlID0gc3RhdGUucm9vdDtcbiAqICAgICBjb25zdCBjaGlsZCA9IHJvb3QuZmlyc3RDaGlsZDtcbiAqICAgICBjb25zdCBpZDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gY2hpbGQucGFyYW1zLm1hcChwID0+IHAuaWQpO1xuICogICAgIC8vLi4uXG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUm91dGVyU3RhdGUgaXMgYSB0cmVlIG9mIGFjdGl2YXRlZCByb3V0ZXMuIEV2ZXJ5IG5vZGUgaW4gdGhpcyB0cmVlIGtub3dzIGFib3V0IHRoZSBcImNvbnN1bWVkXCIgVVJMXG4gKiBzZWdtZW50cywgdGhlIGV4dHJhY3RlZCBwYXJhbWV0ZXJzLCBhbmQgdGhlIHJlc29sdmVkIGRhdGEuXG4gKlxuICogU2VlIHtAbGluayBBY3RpdmF0ZWRSb3V0ZX0gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHN0YWJsZVxuICovXG5leHBvcnQgY2xhc3MgUm91dGVyU3RhdGUgZXh0ZW5kcyBUcmVlPEFjdGl2YXRlZFJvdXRlPiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICByb290OiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4sXG4gICAgICAvKiogVGhlIGN1cnJlbnQgc25hcHNob3Qgb2YgdGhlIHJvdXRlciBzdGF0ZSAqL1xuICAgICAgcHVibGljIHNuYXBzaG90OiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgc3VwZXIocm9vdCk7XG4gICAgc2V0Um91dGVyU3RhdGUoPFJvdXRlclN0YXRlPnRoaXMsIHJvb3QpO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuc25hcHNob3QudG9TdHJpbmcoKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRW1wdHlTdGF0ZSh1cmxUcmVlOiBVcmxUcmVlLCByb290Q29tcG9uZW50OiBUeXBlPGFueT58IG51bGwpOiBSb3V0ZXJTdGF0ZSB7XG4gIGNvbnN0IHNuYXBzaG90ID0gY3JlYXRlRW1wdHlTdGF0ZVNuYXBzaG90KHVybFRyZWUsIHJvb3RDb21wb25lbnQpO1xuICBjb25zdCBlbXB0eVVybCA9IG5ldyBCZWhhdmlvclN1YmplY3QoW25ldyBVcmxTZWdtZW50KCcnLCB7fSldKTtcbiAgY29uc3QgZW1wdHlQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgY29uc3QgZW1wdHlEYXRhID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gIGNvbnN0IGVtcHR5UXVlcnlQYXJhbXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgY29uc3QgZnJhZ21lbnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCcnKTtcbiAgY29uc3QgYWN0aXZhdGVkID0gbmV3IEFjdGl2YXRlZFJvdXRlKFxuICAgICAgZW1wdHlVcmwsIGVtcHR5UGFyYW1zLCBlbXB0eVF1ZXJ5UGFyYW1zLCBmcmFnbWVudCwgZW1wdHlEYXRhLCBQUklNQVJZX09VVExFVCwgcm9vdENvbXBvbmVudCxcbiAgICAgIHNuYXBzaG90LnJvb3QpO1xuICBhY3RpdmF0ZWQuc25hcHNob3QgPSBzbmFwc2hvdC5yb290O1xuICByZXR1cm4gbmV3IFJvdXRlclN0YXRlKG5ldyBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4oYWN0aXZhdGVkLCBbXSksIHNuYXBzaG90KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVtcHR5U3RhdGVTbmFwc2hvdChcbiAgICB1cmxUcmVlOiBVcmxUcmVlLCByb290Q29tcG9uZW50OiBUeXBlPGFueT58IG51bGwpOiBSb3V0ZXJTdGF0ZVNuYXBzaG90IHtcbiAgY29uc3QgZW1wdHlQYXJhbXMgPSB7fTtcbiAgY29uc3QgZW1wdHlEYXRhID0ge307XG4gIGNvbnN0IGVtcHR5UXVlcnlQYXJhbXMgPSB7fTtcbiAgY29uc3QgZnJhZ21lbnQgPSAnJztcbiAgY29uc3QgYWN0aXZhdGVkID0gbmV3IEFjdGl2YXRlZFJvdXRlU25hcHNob3QoXG4gICAgICBbXSwgZW1wdHlQYXJhbXMsIGVtcHR5UXVlcnlQYXJhbXMsIGZyYWdtZW50LCBlbXB0eURhdGEsIFBSSU1BUllfT1VUTEVULCByb290Q29tcG9uZW50LCBudWxsLFxuICAgICAgdXJsVHJlZS5yb290LCAtMSwge30pO1xuICByZXR1cm4gbmV3IFJvdXRlclN0YXRlU25hcHNob3QoJycsIG5ldyBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PihhY3RpdmF0ZWQsIFtdKSk7XG59XG5cbi8qKlxuICogQHdoYXRJdERvZXMgQ29udGFpbnMgdGhlIGluZm9ybWF0aW9uIGFib3V0IGEgcm91dGUgYXNzb2NpYXRlZCB3aXRoIGEgY29tcG9uZW50IGxvYWRlZCBpbiBhblxuICogb3V0bGV0LlxuICogQW4gYEFjdGl2YXRlZFJvdXRlYCBjYW4gYWxzbyBiZSB1c2VkIHRvIHRyYXZlcnNlIHRoZSByb3V0ZXIgc3RhdGUgdHJlZS5cbiAqXG4gKiBAaG93VG9Vc2VcbiAqXG4gKiBgYGBcbiAqIEBDb21wb25lbnQoey4uLn0pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICogICAgIGNvbnN0IGlkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSByb3V0ZS5wYXJhbXMubWFwKHAgPT4gcC5pZCk7XG4gKiAgICAgY29uc3QgdXJsOiBPYnNlcnZhYmxlPHN0cmluZz4gPSByb3V0ZS51cmwubWFwKHNlZ21lbnRzID0+IHNlZ21lbnRzLmpvaW4oJycpKTtcbiAqICAgICAvLyByb3V0ZS5kYXRhIGluY2x1ZGVzIGJvdGggYGRhdGFgIGFuZCBgcmVzb2x2ZWBcbiAqICAgICBjb25zdCB1c2VyID0gcm91dGUuZGF0YS5tYXAoZCA9PiBkLnVzZXIpO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBjbGFzcyBBY3RpdmF0ZWRSb3V0ZSB7XG4gIC8qKiBUaGUgY3VycmVudCBzbmFwc2hvdCBvZiB0aGlzIHJvdXRlICovXG4gIHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90O1xuICAvKiogQGludGVybmFsICovXG4gIF9mdXR1cmVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcm91dGVyU3RhdGU6IFJvdXRlclN0YXRlO1xuICAvKiogQGludGVybmFsICovXG4gIF9wYXJhbU1hcDogT2JzZXJ2YWJsZTxQYXJhbU1hcD47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3F1ZXJ5UGFyYW1NYXA6IE9ic2VydmFibGU8UGFyYW1NYXA+O1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICAvKiogQW4gb2JzZXJ2YWJsZSBvZiB0aGUgVVJMIHNlZ21lbnRzIG1hdGNoZWQgYnkgdGhpcyByb3V0ZSAqL1xuICAgICAgcHVibGljIHVybDogT2JzZXJ2YWJsZTxVcmxTZWdtZW50W10+LFxuICAgICAgLyoqIEFuIG9ic2VydmFibGUgb2YgdGhlIG1hdHJpeCBwYXJhbWV0ZXJzIHNjb3BlZCB0byB0aGlzIHJvdXRlICovXG4gICAgICBwdWJsaWMgcGFyYW1zOiBPYnNlcnZhYmxlPFBhcmFtcz4sXG4gICAgICAvKiogQW4gb2JzZXJ2YWJsZSBvZiB0aGUgcXVlcnkgcGFyYW1ldGVycyBzaGFyZWQgYnkgYWxsIHRoZSByb3V0ZXMgKi9cbiAgICAgIHB1YmxpYyBxdWVyeVBhcmFtczogT2JzZXJ2YWJsZTxQYXJhbXM+LFxuICAgICAgLyoqIEFuIG9ic2VydmFibGUgb2YgdGhlIFVSTCBmcmFnbWVudCBzaGFyZWQgYnkgYWxsIHRoZSByb3V0ZXMgKi9cbiAgICAgIHB1YmxpYyBmcmFnbWVudDogT2JzZXJ2YWJsZTxzdHJpbmc+LFxuICAgICAgLyoqIEFuIG9ic2VydmFibGUgb2YgdGhlIHN0YXRpYyBhbmQgcmVzb2x2ZWQgZGF0YSBvZiB0aGlzIHJvdXRlLiAqL1xuICAgICAgcHVibGljIGRhdGE6IE9ic2VydmFibGU8RGF0YT4sXG4gICAgICAvKiogVGhlIG91dGxldCBuYW1lIG9mIHRoZSByb3V0ZS4gSXQncyBhIGNvbnN0YW50ICovXG4gICAgICBwdWJsaWMgb3V0bGV0OiBzdHJpbmcsXG4gICAgICAvKiogVGhlIGNvbXBvbmVudCBvZiB0aGUgcm91dGUuIEl0J3MgYSBjb25zdGFudCAqL1xuICAgICAgLy8gVE9ETyh2c2F2a2luKTogcmVtb3ZlIHxzdHJpbmdcbiAgICAgIHB1YmxpYyBjb21wb25lbnQ6IFR5cGU8YW55PnxzdHJpbmd8bnVsbCwgZnV0dXJlU25hcHNob3Q6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpIHtcbiAgICB0aGlzLl9mdXR1cmVTbmFwc2hvdCA9IGZ1dHVyZVNuYXBzaG90O1xuICB9XG5cbiAgLyoqIFRoZSBjb25maWd1cmF0aW9uIHVzZWQgdG8gbWF0Y2ggdGhpcyByb3V0ZSAqL1xuICBnZXQgcm91dGVDb25maWcoKTogUm91dGV8bnVsbCB7IHJldHVybiB0aGlzLl9mdXR1cmVTbmFwc2hvdC5yb3V0ZUNvbmZpZzsgfVxuXG4gIC8qKiBUaGUgcm9vdCBvZiB0aGUgcm91dGVyIHN0YXRlICovXG4gIGdldCByb290KCk6IEFjdGl2YXRlZFJvdXRlIHsgcmV0dXJuIHRoaXMuX3JvdXRlclN0YXRlLnJvb3Q7IH1cblxuICAvKiogVGhlIHBhcmVudCBvZiB0aGlzIHJvdXRlIGluIHRoZSByb3V0ZXIgc3RhdGUgdHJlZSAqL1xuICBnZXQgcGFyZW50KCk6IEFjdGl2YXRlZFJvdXRlfG51bGwgeyByZXR1cm4gdGhpcy5fcm91dGVyU3RhdGUucGFyZW50KHRoaXMpOyB9XG5cbiAgLyoqIFRoZSBmaXJzdCBjaGlsZCBvZiB0aGlzIHJvdXRlIGluIHRoZSByb3V0ZXIgc3RhdGUgdHJlZSAqL1xuICBnZXQgZmlyc3RDaGlsZCgpOiBBY3RpdmF0ZWRSb3V0ZXxudWxsIHsgcmV0dXJuIHRoaXMuX3JvdXRlclN0YXRlLmZpcnN0Q2hpbGQodGhpcyk7IH1cblxuICAvKiogVGhlIGNoaWxkcmVuIG9mIHRoaXMgcm91dGUgaW4gdGhlIHJvdXRlciBzdGF0ZSB0cmVlICovXG4gIGdldCBjaGlsZHJlbigpOiBBY3RpdmF0ZWRSb3V0ZVtdIHsgcmV0dXJuIHRoaXMuX3JvdXRlclN0YXRlLmNoaWxkcmVuKHRoaXMpOyB9XG5cbiAgLyoqIFRoZSBwYXRoIGZyb20gdGhlIHJvb3Qgb2YgdGhlIHJvdXRlciBzdGF0ZSB0cmVlIHRvIHRoaXMgcm91dGUgKi9cbiAgZ2V0IHBhdGhGcm9tUm9vdCgpOiBBY3RpdmF0ZWRSb3V0ZVtdIHsgcmV0dXJuIHRoaXMuX3JvdXRlclN0YXRlLnBhdGhGcm9tUm9vdCh0aGlzKTsgfVxuXG4gIGdldCBwYXJhbU1hcCgpOiBPYnNlcnZhYmxlPFBhcmFtTWFwPiB7XG4gICAgaWYgKCF0aGlzLl9wYXJhbU1hcCkge1xuICAgICAgdGhpcy5fcGFyYW1NYXAgPSB0aGlzLnBhcmFtcy5waXBlKG1hcCgocDogUGFyYW1zKTogUGFyYW1NYXAgPT4gY29udmVydFRvUGFyYW1NYXAocCkpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BhcmFtTWFwO1xuICB9XG5cbiAgZ2V0IHF1ZXJ5UGFyYW1NYXAoKTogT2JzZXJ2YWJsZTxQYXJhbU1hcD4ge1xuICAgIGlmICghdGhpcy5fcXVlcnlQYXJhbU1hcCkge1xuICAgICAgdGhpcy5fcXVlcnlQYXJhbU1hcCA9XG4gICAgICAgICAgdGhpcy5xdWVyeVBhcmFtcy5waXBlKG1hcCgocDogUGFyYW1zKTogUGFyYW1NYXAgPT4gY29udmVydFRvUGFyYW1NYXAocCkpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXJ5UGFyYW1NYXA7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNuYXBzaG90ID8gdGhpcy5zbmFwc2hvdC50b1N0cmluZygpIDogYEZ1dHVyZSgke3RoaXMuX2Z1dHVyZVNuYXBzaG90fSlgO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3kgPSAnZW1wdHlPbmx5JyB8ICdhbHdheXMnO1xuXG4vKiogQGludGVybmFsICovXG5leHBvcnQgdHlwZSBJbmhlcml0ZWQgPSB7XG4gIHBhcmFtczogUGFyYW1zLFxuICBkYXRhOiBEYXRhLFxuICByZXNvbHZlOiBEYXRhLFxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbmhlcml0ZWQgcGFyYW1zLCBkYXRhLCBhbmQgcmVzb2x2ZSBmb3IgYSBnaXZlbiByb3V0ZS5cbiAqIEJ5IGRlZmF1bHQsIHRoaXMgb25seSBpbmhlcml0cyB2YWx1ZXMgdXAgdG8gdGhlIG5lYXJlc3QgcGF0aC1sZXNzIG9yIGNvbXBvbmVudC1sZXNzIHJvdXRlLlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmhlcml0ZWRQYXJhbXNEYXRhUmVzb2x2ZShcbiAgICByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgICBwYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5OiBQYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5ID0gJ2VtcHR5T25seScpOiBJbmhlcml0ZWQge1xuICBjb25zdCBwYXRoRnJvbVJvb3QgPSByb3V0ZS5wYXRoRnJvbVJvb3Q7XG5cbiAgbGV0IGluaGVyaXRpbmdTdGFydGluZ0Zyb20gPSAwO1xuICBpZiAocGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneSAhPT0gJ2Fsd2F5cycpIHtcbiAgICBpbmhlcml0aW5nU3RhcnRpbmdGcm9tID0gcGF0aEZyb21Sb290Lmxlbmd0aCAtIDE7XG5cbiAgICB3aGlsZSAoaW5oZXJpdGluZ1N0YXJ0aW5nRnJvbSA+PSAxKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gcGF0aEZyb21Sb290W2luaGVyaXRpbmdTdGFydGluZ0Zyb21dO1xuICAgICAgY29uc3QgcGFyZW50ID0gcGF0aEZyb21Sb290W2luaGVyaXRpbmdTdGFydGluZ0Zyb20gLSAxXTtcbiAgICAgIC8vIGN1cnJlbnQgcm91dGUgaXMgYW4gZW1wdHkgcGF0aCA9PiBpbmhlcml0cyBpdHMgcGFyZW50J3MgcGFyYW1zIGFuZCBkYXRhXG4gICAgICBpZiAoY3VycmVudC5yb3V0ZUNvbmZpZyAmJiBjdXJyZW50LnJvdXRlQ29uZmlnLnBhdGggPT09ICcnKSB7XG4gICAgICAgIGluaGVyaXRpbmdTdGFydGluZ0Zyb20tLTtcblxuICAgICAgICAvLyBwYXJlbnQgaXMgY29tcG9uZW50bGVzcyA9PiBjdXJyZW50IHJvdXRlIHNob3VsZCBpbmhlcml0IGl0cyBwYXJhbXMgYW5kIGRhdGFcbiAgICAgIH0gZWxzZSBpZiAoIXBhcmVudC5jb21wb25lbnQpIHtcbiAgICAgICAgaW5oZXJpdGluZ1N0YXJ0aW5nRnJvbS0tO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmxhdHRlbkluaGVyaXRlZChwYXRoRnJvbVJvb3Quc2xpY2UoaW5oZXJpdGluZ1N0YXJ0aW5nRnJvbSkpO1xufVxuXG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBmbGF0dGVuSW5oZXJpdGVkKHBhdGhGcm9tUm9vdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdFtdKTogSW5oZXJpdGVkIHtcbiAgcmV0dXJuIHBhdGhGcm9tUm9vdC5yZWR1Y2UoKHJlcywgY3VycikgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IHsuLi5yZXMucGFyYW1zLCAuLi5jdXJyLnBhcmFtc307XG4gICAgY29uc3QgZGF0YSA9IHsuLi5yZXMuZGF0YSwgLi4uY3Vyci5kYXRhfTtcbiAgICBjb25zdCByZXNvbHZlID0gey4uLnJlcy5yZXNvbHZlLCAuLi5jdXJyLl9yZXNvbHZlZERhdGF9O1xuICAgIHJldHVybiB7cGFyYW1zLCBkYXRhLCByZXNvbHZlfTtcbiAgfSwgPGFueT57cGFyYW1zOiB7fSwgZGF0YToge30sIHJlc29sdmU6IHt9fSk7XG59XG5cbi8qKlxuICogQHdoYXRJdERvZXMgQ29udGFpbnMgdGhlIGluZm9ybWF0aW9uIGFib3V0IGEgcm91dGUgYXNzb2NpYXRlZCB3aXRoIGEgY29tcG9uZW50IGxvYWRlZCBpbiBhblxuICogb3V0bGV0XG4gKiBhdCBhIHBhcnRpY3VsYXIgbW9tZW50IGluIHRpbWUuIEFjdGl2YXRlZFJvdXRlU25hcHNob3QgY2FuIGFsc28gYmUgdXNlZCB0byB0cmF2ZXJzZSB0aGUgcm91dGVyXG4gKiBzdGF0ZSB0cmVlLlxuICpcbiAqIEBob3dUb1VzZVxuICpcbiAqIGBgYFxuICogQENvbXBvbmVudCh7dGVtcGxhdGVVcmw6Jy4vbXktY29tcG9uZW50Lmh0bWwnfSlcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3Iocm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gKiAgICAgY29uc3QgaWQ6IHN0cmluZyA9IHJvdXRlLnNuYXBzaG90LnBhcmFtcy5pZDtcbiAqICAgICBjb25zdCB1cmw6IHN0cmluZyA9IHJvdXRlLnNuYXBzaG90LnVybC5qb2luKCcnKTtcbiAqICAgICBjb25zdCB1c2VyID0gcm91dGUuc25hcHNob3QuZGF0YS51c2VyO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBjbGFzcyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IHtcbiAgLyoqIFRoZSBjb25maWd1cmF0aW9uIHVzZWQgdG8gbWF0Y2ggdGhpcyByb3V0ZSAqKi9cbiAgcHVibGljIHJlYWRvbmx5IHJvdXRlQ29uZmlnOiBSb3V0ZXxudWxsO1xuICAvKiogQGludGVybmFsICoqL1xuICBfdXJsU2VnbWVudDogVXJsU2VnbWVudEdyb3VwO1xuICAvKiogQGludGVybmFsICovXG4gIF9sYXN0UGF0aEluZGV4OiBudW1iZXI7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3Jlc29sdmU6IFJlc29sdmVEYXRhO1xuICAvKiogQGludGVybmFsICovXG4gIF9yZXNvbHZlZERhdGE6IERhdGE7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JvdXRlclN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90O1xuICAvKiogQGludGVybmFsICovXG4gIF9wYXJhbU1hcDogUGFyYW1NYXA7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3F1ZXJ5UGFyYW1NYXA6IFBhcmFtTWFwO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICAvKiogVGhlIFVSTCBzZWdtZW50cyBtYXRjaGVkIGJ5IHRoaXMgcm91dGUgKi9cbiAgICAgIHB1YmxpYyB1cmw6IFVybFNlZ21lbnRbXSxcbiAgICAgIC8qKiBUaGUgbWF0cml4IHBhcmFtZXRlcnMgc2NvcGVkIHRvIHRoaXMgcm91dGUgKi9cbiAgICAgIHB1YmxpYyBwYXJhbXM6IFBhcmFtcyxcbiAgICAgIC8qKiBUaGUgcXVlcnkgcGFyYW1ldGVycyBzaGFyZWQgYnkgYWxsIHRoZSByb3V0ZXMgKi9cbiAgICAgIHB1YmxpYyBxdWVyeVBhcmFtczogUGFyYW1zLFxuICAgICAgLyoqIFRoZSBVUkwgZnJhZ21lbnQgc2hhcmVkIGJ5IGFsbCB0aGUgcm91dGVzICovXG4gICAgICBwdWJsaWMgZnJhZ21lbnQ6IHN0cmluZyxcbiAgICAgIC8qKiBUaGUgc3RhdGljIGFuZCByZXNvbHZlZCBkYXRhIG9mIHRoaXMgcm91dGUgKi9cbiAgICAgIHB1YmxpYyBkYXRhOiBEYXRhLFxuICAgICAgLyoqIFRoZSBvdXRsZXQgbmFtZSBvZiB0aGUgcm91dGUgKi9cbiAgICAgIHB1YmxpYyBvdXRsZXQ6IHN0cmluZyxcbiAgICAgIC8qKiBUaGUgY29tcG9uZW50IG9mIHRoZSByb3V0ZSAqL1xuICAgICAgcHVibGljIGNvbXBvbmVudDogVHlwZTxhbnk+fHN0cmluZ3xudWxsLCByb3V0ZUNvbmZpZzogUm91dGV8bnVsbCwgdXJsU2VnbWVudDogVXJsU2VnbWVudEdyb3VwLFxuICAgICAgbGFzdFBhdGhJbmRleDogbnVtYmVyLCByZXNvbHZlOiBSZXNvbHZlRGF0YSkge1xuICAgIHRoaXMucm91dGVDb25maWcgPSByb3V0ZUNvbmZpZztcbiAgICB0aGlzLl91cmxTZWdtZW50ID0gdXJsU2VnbWVudDtcbiAgICB0aGlzLl9sYXN0UGF0aEluZGV4ID0gbGFzdFBhdGhJbmRleDtcbiAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgfVxuXG4gIC8qKiBUaGUgcm9vdCBvZiB0aGUgcm91dGVyIHN0YXRlICovXG4gIGdldCByb290KCk6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgeyByZXR1cm4gdGhpcy5fcm91dGVyU3RhdGUucm9vdDsgfVxuXG4gIC8qKiBUaGUgcGFyZW50IG9mIHRoaXMgcm91dGUgaW4gdGhlIHJvdXRlciBzdGF0ZSB0cmVlICovXG4gIGdldCBwYXJlbnQoKTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdHxudWxsIHsgcmV0dXJuIHRoaXMuX3JvdXRlclN0YXRlLnBhcmVudCh0aGlzKTsgfVxuXG4gIC8qKiBUaGUgZmlyc3QgY2hpbGQgb2YgdGhpcyByb3V0ZSBpbiB0aGUgcm91dGVyIHN0YXRlIHRyZWUgKi9cbiAgZ2V0IGZpcnN0Q2hpbGQoKTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdHxudWxsIHsgcmV0dXJuIHRoaXMuX3JvdXRlclN0YXRlLmZpcnN0Q2hpbGQodGhpcyk7IH1cblxuICAvKiogVGhlIGNoaWxkcmVuIG9mIHRoaXMgcm91dGUgaW4gdGhlIHJvdXRlciBzdGF0ZSB0cmVlICovXG4gIGdldCBjaGlsZHJlbigpOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90W10geyByZXR1cm4gdGhpcy5fcm91dGVyU3RhdGUuY2hpbGRyZW4odGhpcyk7IH1cblxuICAvKiogVGhlIHBhdGggZnJvbSB0aGUgcm9vdCBvZiB0aGUgcm91dGVyIHN0YXRlIHRyZWUgdG8gdGhpcyByb3V0ZSAqL1xuICBnZXQgcGF0aEZyb21Sb290KCk6IEFjdGl2YXRlZFJvdXRlU25hcHNob3RbXSB7IHJldHVybiB0aGlzLl9yb3V0ZXJTdGF0ZS5wYXRoRnJvbVJvb3QodGhpcyk7IH1cblxuICBnZXQgcGFyYW1NYXAoKTogUGFyYW1NYXAge1xuICAgIGlmICghdGhpcy5fcGFyYW1NYXApIHtcbiAgICAgIHRoaXMuX3BhcmFtTWFwID0gY29udmVydFRvUGFyYW1NYXAodGhpcy5wYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcGFyYW1NYXA7XG4gIH1cblxuICBnZXQgcXVlcnlQYXJhbU1hcCgpOiBQYXJhbU1hcCB7XG4gICAgaWYgKCF0aGlzLl9xdWVyeVBhcmFtTWFwKSB7XG4gICAgICB0aGlzLl9xdWVyeVBhcmFtTWFwID0gY29udmVydFRvUGFyYW1NYXAodGhpcy5xdWVyeVBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9xdWVyeVBhcmFtTWFwO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLnVybC5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnRvU3RyaW5nKCkpLmpvaW4oJy8nKTtcbiAgICBjb25zdCBtYXRjaGVkID0gdGhpcy5yb3V0ZUNvbmZpZyA/IHRoaXMucm91dGVDb25maWcucGF0aCA6ICcnO1xuICAgIHJldHVybiBgUm91dGUodXJsOicke3VybH0nLCBwYXRoOicke21hdGNoZWR9JylgO1xuICB9XG59XG5cbi8qKlxuICogQHdoYXRJdERvZXMgUmVwcmVzZW50cyB0aGUgc3RhdGUgb2YgdGhlIHJvdXRlciBhdCBhIG1vbWVudCBpbiB0aW1lLlxuICpcbiAqIEBob3dUb1VzZVxuICpcbiAqIGBgYFxuICogQENvbXBvbmVudCh7dGVtcGxhdGVVcmw6J3RlbXBsYXRlLmh0bWwnfSlcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIpIHtcbiAqICAgICBjb25zdCBzdGF0ZTogUm91dGVyU3RhdGUgPSByb3V0ZXIucm91dGVyU3RhdGU7XG4gKiAgICAgY29uc3Qgc25hcHNob3Q6IFJvdXRlclN0YXRlU25hcHNob3QgPSBzdGF0ZS5zbmFwc2hvdDtcbiAqICAgICBjb25zdCByb290OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90ID0gc25hcHNob3Qucm9vdDtcbiAqICAgICBjb25zdCBjaGlsZCA9IHJvb3QuZmlyc3RDaGlsZDtcbiAqICAgICBjb25zdCBpZDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gY2hpbGQucGFyYW1zLm1hcChwID0+IHAuaWQpO1xuICogICAgIC8vLi4uXG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUm91dGVyU3RhdGVTbmFwc2hvdCBpcyBhIHRyZWUgb2YgYWN0aXZhdGVkIHJvdXRlIHNuYXBzaG90cy4gRXZlcnkgbm9kZSBpbiB0aGlzIHRyZWUga25vd3MgYWJvdXRcbiAqIHRoZSBcImNvbnN1bWVkXCIgVVJMIHNlZ21lbnRzLCB0aGUgZXh0cmFjdGVkIHBhcmFtZXRlcnMsIGFuZCB0aGUgcmVzb2x2ZWQgZGF0YS5cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZXJTdGF0ZVNuYXBzaG90IGV4dGVuZHMgVHJlZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICAvKiogVGhlIHVybCBmcm9tIHdoaWNoIHRoaXMgc25hcHNob3Qgd2FzIGNyZWF0ZWQgKi9cbiAgICAgIHB1YmxpYyB1cmw6IHN0cmluZywgcm9vdDogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4pIHtcbiAgICBzdXBlcihyb290KTtcbiAgICBzZXRSb3V0ZXJTdGF0ZSg8Um91dGVyU3RhdGVTbmFwc2hvdD50aGlzLCByb290KTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBzZXJpYWxpemVOb2RlKHRoaXMuX3Jvb3QpOyB9XG59XG5cbmZ1bmN0aW9uIHNldFJvdXRlclN0YXRlPFUsIFQgZXh0ZW5kc3tfcm91dGVyU3RhdGU6IFV9PihzdGF0ZTogVSwgbm9kZTogVHJlZU5vZGU8VD4pOiB2b2lkIHtcbiAgbm9kZS52YWx1ZS5fcm91dGVyU3RhdGUgPSBzdGF0ZTtcbiAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGMgPT4gc2V0Um91dGVyU3RhdGUoc3RhdGUsIGMpKTtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplTm9kZShub2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90Pik6IHN0cmluZyB7XG4gIGNvbnN0IGMgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyBgIHsgJHtub2RlLmNoaWxkcmVuLm1hcChzZXJpYWxpemVOb2RlKS5qb2luKCcsICcpfSB9IGAgOiAnJztcbiAgcmV0dXJuIGAke25vZGUudmFsdWV9JHtjfWA7XG59XG5cbi8qKlxuICogVGhlIGV4cGVjdGF0aW9uIGlzIHRoYXQgdGhlIGFjdGl2YXRlIHJvdXRlIGlzIGNyZWF0ZWQgd2l0aCB0aGUgcmlnaHQgc2V0IG9mIHBhcmFtZXRlcnMuXG4gKiBTbyB3ZSBwdXNoIG5ldyB2YWx1ZXMgaW50byB0aGUgb2JzZXJ2YWJsZXMgb25seSB3aGVuIHRoZXkgYXJlIG5vdCB0aGUgaW5pdGlhbCB2YWx1ZXMuXG4gKiBBbmQgd2UgZGV0ZWN0IHRoYXQgYnkgY2hlY2tpbmcgaWYgdGhlIHNuYXBzaG90IGZpZWxkIGlzIHNldC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkdmFuY2VBY3RpdmF0ZWRSb3V0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGUpOiB2b2lkIHtcbiAgaWYgKHJvdXRlLnNuYXBzaG90KSB7XG4gICAgY29uc3QgY3VycmVudFNuYXBzaG90ID0gcm91dGUuc25hcHNob3Q7XG4gICAgY29uc3QgbmV4dFNuYXBzaG90ID0gcm91dGUuX2Z1dHVyZVNuYXBzaG90O1xuICAgIHJvdXRlLnNuYXBzaG90ID0gbmV4dFNuYXBzaG90O1xuICAgIGlmICghc2hhbGxvd0VxdWFsKGN1cnJlbnRTbmFwc2hvdC5xdWVyeVBhcmFtcywgbmV4dFNuYXBzaG90LnF1ZXJ5UGFyYW1zKSkge1xuICAgICAgKDxhbnk+cm91dGUucXVlcnlQYXJhbXMpLm5leHQobmV4dFNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgICB9XG4gICAgaWYgKGN1cnJlbnRTbmFwc2hvdC5mcmFnbWVudCAhPT0gbmV4dFNuYXBzaG90LmZyYWdtZW50KSB7XG4gICAgICAoPGFueT5yb3V0ZS5mcmFnbWVudCkubmV4dChuZXh0U25hcHNob3QuZnJhZ21lbnQpO1xuICAgIH1cbiAgICBpZiAoIXNoYWxsb3dFcXVhbChjdXJyZW50U25hcHNob3QucGFyYW1zLCBuZXh0U25hcHNob3QucGFyYW1zKSkge1xuICAgICAgKDxhbnk+cm91dGUucGFyYW1zKS5uZXh0KG5leHRTbmFwc2hvdC5wYXJhbXMpO1xuICAgIH1cbiAgICBpZiAoIXNoYWxsb3dFcXVhbEFycmF5cyhjdXJyZW50U25hcHNob3QudXJsLCBuZXh0U25hcHNob3QudXJsKSkge1xuICAgICAgKDxhbnk+cm91dGUudXJsKS5uZXh0KG5leHRTbmFwc2hvdC51cmwpO1xuICAgIH1cbiAgICBpZiAoIXNoYWxsb3dFcXVhbChjdXJyZW50U25hcHNob3QuZGF0YSwgbmV4dFNuYXBzaG90LmRhdGEpKSB7XG4gICAgICAoPGFueT5yb3V0ZS5kYXRhKS5uZXh0KG5leHRTbmFwc2hvdC5kYXRhKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcm91dGUuc25hcHNob3QgPSByb3V0ZS5fZnV0dXJlU25hcHNob3Q7XG5cbiAgICAvLyB0aGlzIGlzIGZvciByZXNvbHZlZCBkYXRhXG4gICAgKDxhbnk+cm91dGUuZGF0YSkubmV4dChyb3V0ZS5fZnV0dXJlU25hcHNob3QuZGF0YSk7XG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxQYXJhbXNBbmRVcmxTZWdtZW50cyhcbiAgICBhOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBiOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogYm9vbGVhbiB7XG4gIGNvbnN0IGVxdWFsVXJsUGFyYW1zID0gc2hhbGxvd0VxdWFsKGEucGFyYW1zLCBiLnBhcmFtcykgJiYgZXF1YWxTZWdtZW50cyhhLnVybCwgYi51cmwpO1xuICBjb25zdCBwYXJlbnRzTWlzbWF0Y2ggPSAhYS5wYXJlbnQgIT09ICFiLnBhcmVudDtcblxuICByZXR1cm4gZXF1YWxVcmxQYXJhbXMgJiYgIXBhcmVudHNNaXNtYXRjaCAmJlxuICAgICAgKCFhLnBhcmVudCB8fCBlcXVhbFBhcmFtc0FuZFVybFNlZ21lbnRzKGEucGFyZW50LCBiLnBhcmVudCAhKSk7XG59XG4iXX0=