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
 * The state associated with an LContainer
 * @record
 */
export function LContainer() { }
function LContainer_tsickle_Closure_declarations() {
    /**
     * The next active index in the views array to read or write to. This helps us
     * keep track of where we are in the views array.
     * @type {?}
     */
    LContainer.prototype.nextIndex;
    /**
     * This allows us to jump from a container to a sibling container or
     * component view with the same parent, so we can remove listeners efficiently.
     * @type {?}
     */
    LContainer.prototype.next;
    /**
     * Access to the parent view is necessary so we can propagate back
     * up from inside a container to parent.next.
     * @type {?}
     */
    LContainer.prototype.parent;
    /**
     * A list of the container's currently active child views. Views will be inserted
     * here as they are added and spliced from here when they are removed. We need
     * to keep a record of current views so we know which views are already in the DOM
     * (and don't need to be re-added) and so we can remove views from the DOM when they
     * are no longer required.
     * @type {?}
     */
    LContainer.prototype.views;
    /**
     * Parent Element which will contain the location where all of the Views will be
     * inserted into to.
     *
     * If `renderParent` is `null` it is headless. This means that it is contained
     * in another `LViewNode` which in turn is contained in another `LContainerNode` and
     * therefore it does not yet have its own parent.
     *
     * If `renderParent` is not `null` then it may be:
     * - same as `LContainerNode.parent` in which case it is just a normal container.
     * - different from `LContainerNode.parent` in which case it has been re-projected.
     *   In other words `LContainerNode.parent` is logical parent where as
     *   `LContainer.projectedParent` is render parent.
     *
     * When views are inserted into `LContainerNode` then `renderParent` is:
     * - `null`, we are in `LViewNode` keep going up a hierarchy until actual
     *   `renderParent` is found.
     * - not `null`, then use the `projectedParent.native` as the `RElement` to insert
     *   `LViewNode`s into.
     * @type {?}
     */
    LContainer.prototype.renderParent;
    /**
     * The template extracted from the location of the Container.
     * @type {?}
     */
    LContainer.prototype.template;
    /**
     * A count of dynamic views rendered into this container. If this is non-zero, the `views` array
     * will be traversed when refreshing dynamic views on this container.
     * @type {?}
     */
    LContainer.prototype.dynamicViewCount;
    /**
     * Queries active for this container - all the views inserted to / removed from
     * this container are reported to queries referenced here.
     * @type {?}
     */
    LContainer.prototype.queries;
}
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export const /** @type {?} */ unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9pbnRlcmZhY2VzL2NvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdHQSxNQUFNLENBQUMsdUJBQU0sNkJBQTZCLEdBQUcsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBvbmVudFRlbXBsYXRlfSBmcm9tICcuL2RlZmluaXRpb24nO1xuaW1wb3J0IHtMRWxlbWVudE5vZGUsIExWaWV3Tm9kZX0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7TFF1ZXJpZXN9IGZyb20gJy4vcXVlcnknO1xuaW1wb3J0IHtMVmlldywgVFZpZXd9IGZyb20gJy4vdmlldyc7XG5cblxuXG4vKiogVGhlIHN0YXRlIGFzc29jaWF0ZWQgd2l0aCBhbiBMQ29udGFpbmVyICovXG5leHBvcnQgaW50ZXJmYWNlIExDb250YWluZXIge1xuICAvKipcbiAgICogVGhlIG5leHQgYWN0aXZlIGluZGV4IGluIHRoZSB2aWV3cyBhcnJheSB0byByZWFkIG9yIHdyaXRlIHRvLiBUaGlzIGhlbHBzIHVzXG4gICAqIGtlZXAgdHJhY2sgb2Ygd2hlcmUgd2UgYXJlIGluIHRoZSB2aWV3cyBhcnJheS5cbiAgICovXG4gIG5leHRJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGlzIGFsbG93cyB1cyB0byBqdW1wIGZyb20gYSBjb250YWluZXIgdG8gYSBzaWJsaW5nIGNvbnRhaW5lciBvclxuICAgKiBjb21wb25lbnQgdmlldyB3aXRoIHRoZSBzYW1lIHBhcmVudCwgc28gd2UgY2FuIHJlbW92ZSBsaXN0ZW5lcnMgZWZmaWNpZW50bHkuXG4gICAqL1xuICBuZXh0OiBMVmlld3xMQ29udGFpbmVyfG51bGw7XG5cbiAgLyoqXG4gICAqIEFjY2VzcyB0byB0aGUgcGFyZW50IHZpZXcgaXMgbmVjZXNzYXJ5IHNvIHdlIGNhbiBwcm9wYWdhdGUgYmFja1xuICAgKiB1cCBmcm9tIGluc2lkZSBhIGNvbnRhaW5lciB0byBwYXJlbnQubmV4dC5cbiAgICovXG4gIHBhcmVudDogTFZpZXd8bnVsbDtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIHRoZSBjb250YWluZXIncyBjdXJyZW50bHkgYWN0aXZlIGNoaWxkIHZpZXdzLiBWaWV3cyB3aWxsIGJlIGluc2VydGVkXG4gICAqIGhlcmUgYXMgdGhleSBhcmUgYWRkZWQgYW5kIHNwbGljZWQgZnJvbSBoZXJlIHdoZW4gdGhleSBhcmUgcmVtb3ZlZC4gV2UgbmVlZFxuICAgKiB0byBrZWVwIGEgcmVjb3JkIG9mIGN1cnJlbnQgdmlld3Mgc28gd2Uga25vdyB3aGljaCB2aWV3cyBhcmUgYWxyZWFkeSBpbiB0aGUgRE9NXG4gICAqIChhbmQgZG9uJ3QgbmVlZCB0byBiZSByZS1hZGRlZCkgYW5kIHNvIHdlIGNhbiByZW1vdmUgdmlld3MgZnJvbSB0aGUgRE9NIHdoZW4gdGhleVxuICAgKiBhcmUgbm8gbG9uZ2VyIHJlcXVpcmVkLlxuICAgKi9cbiAgcmVhZG9ubHkgdmlld3M6IExWaWV3Tm9kZVtdO1xuXG4gIC8qKlxuICAgKiBQYXJlbnQgRWxlbWVudCB3aGljaCB3aWxsIGNvbnRhaW4gdGhlIGxvY2F0aW9uIHdoZXJlIGFsbCBvZiB0aGUgVmlld3Mgd2lsbCBiZVxuICAgKiBpbnNlcnRlZCBpbnRvIHRvLlxuICAgKlxuICAgKiBJZiBgcmVuZGVyUGFyZW50YCBpcyBgbnVsbGAgaXQgaXMgaGVhZGxlc3MuIFRoaXMgbWVhbnMgdGhhdCBpdCBpcyBjb250YWluZWRcbiAgICogaW4gYW5vdGhlciBgTFZpZXdOb2RlYCB3aGljaCBpbiB0dXJuIGlzIGNvbnRhaW5lZCBpbiBhbm90aGVyIGBMQ29udGFpbmVyTm9kZWAgYW5kXG4gICAqIHRoZXJlZm9yZSBpdCBkb2VzIG5vdCB5ZXQgaGF2ZSBpdHMgb3duIHBhcmVudC5cbiAgICpcbiAgICogSWYgYHJlbmRlclBhcmVudGAgaXMgbm90IGBudWxsYCB0aGVuIGl0IG1heSBiZTpcbiAgICogLSBzYW1lIGFzIGBMQ29udGFpbmVyTm9kZS5wYXJlbnRgIGluIHdoaWNoIGNhc2UgaXQgaXMganVzdCBhIG5vcm1hbCBjb250YWluZXIuXG4gICAqIC0gZGlmZmVyZW50IGZyb20gYExDb250YWluZXJOb2RlLnBhcmVudGAgaW4gd2hpY2ggY2FzZSBpdCBoYXMgYmVlbiByZS1wcm9qZWN0ZWQuXG4gICAqICAgSW4gb3RoZXIgd29yZHMgYExDb250YWluZXJOb2RlLnBhcmVudGAgaXMgbG9naWNhbCBwYXJlbnQgd2hlcmUgYXNcbiAgICogICBgTENvbnRhaW5lci5wcm9qZWN0ZWRQYXJlbnRgIGlzIHJlbmRlciBwYXJlbnQuXG4gICAqXG4gICAqIFdoZW4gdmlld3MgYXJlIGluc2VydGVkIGludG8gYExDb250YWluZXJOb2RlYCB0aGVuIGByZW5kZXJQYXJlbnRgIGlzOlxuICAgKiAtIGBudWxsYCwgd2UgYXJlIGluIGBMVmlld05vZGVgIGtlZXAgZ29pbmcgdXAgYSBoaWVyYXJjaHkgdW50aWwgYWN0dWFsXG4gICAqICAgYHJlbmRlclBhcmVudGAgaXMgZm91bmQuXG4gICAqIC0gbm90IGBudWxsYCwgdGhlbiB1c2UgdGhlIGBwcm9qZWN0ZWRQYXJlbnQubmF0aXZlYCBhcyB0aGUgYFJFbGVtZW50YCB0byBpbnNlcnRcbiAgICogICBgTFZpZXdOb2RlYHMgaW50by5cbiAgICovXG4gIHJlbmRlclBhcmVudDogTEVsZW1lbnROb2RlfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSB0ZW1wbGF0ZSBleHRyYWN0ZWQgZnJvbSB0aGUgbG9jYXRpb24gb2YgdGhlIENvbnRhaW5lci5cbiAgICovXG4gIHJlYWRvbmx5IHRlbXBsYXRlOiBDb21wb25lbnRUZW1wbGF0ZTxhbnk+fG51bGw7XG5cbiAgLyoqXG4gICAqIEEgY291bnQgb2YgZHluYW1pYyB2aWV3cyByZW5kZXJlZCBpbnRvIHRoaXMgY29udGFpbmVyLiBJZiB0aGlzIGlzIG5vbi16ZXJvLCB0aGUgYHZpZXdzYCBhcnJheVxuICAgKiB3aWxsIGJlIHRyYXZlcnNlZCB3aGVuIHJlZnJlc2hpbmcgZHluYW1pYyB2aWV3cyBvbiB0aGlzIGNvbnRhaW5lci5cbiAgICovXG4gIGR5bmFtaWNWaWV3Q291bnQ6IG51bWJlcjtcblxuICAvKipcbiAgICogUXVlcmllcyBhY3RpdmUgZm9yIHRoaXMgY29udGFpbmVyIC0gYWxsIHRoZSB2aWV3cyBpbnNlcnRlZCB0byAvIHJlbW92ZWQgZnJvbVxuICAgKiB0aGlzIGNvbnRhaW5lciBhcmUgcmVwb3J0ZWQgdG8gcXVlcmllcyByZWZlcmVuY2VkIGhlcmUuXG4gICAqL1xuICBxdWVyaWVzOiBMUXVlcmllc3xudWxsO1xufVxuXG4vKipcbiAqIFRoZSBzdGF0aWMgZXF1aXZhbGVudCBvZiBMQ29udGFpbmVyLCB1c2VkIGluIFRDb250YWluZXJOb2RlLlxuICpcbiAqIFRoZSBjb250YWluZXIgbmVlZHMgdG8gc3RvcmUgc3RhdGljIGRhdGEgZm9yIGVhY2ggb2YgaXRzIGVtYmVkZGVkIHZpZXdzXG4gKiAoVFZpZXdzKS4gT3RoZXJ3aXNlLCBub2RlcyBpbiBlbWJlZGRlZCB2aWV3cyB3aXRoIHRoZSBzYW1lIGluZGV4IGFzIG5vZGVzXG4gKiBpbiB0aGVpciBwYXJlbnQgdmlld3Mgd2lsbCBvdmVyd3JpdGUgZWFjaCBvdGhlciwgYXMgdGhleSBhcmUgaW5cbiAqIHRoZSBzYW1lIHRlbXBsYXRlLlxuICpcbiAqIEVhY2ggaW5kZXggaW4gdGhpcyBhcnJheSBjb3JyZXNwb25kcyB0byB0aGUgc3RhdGljIGRhdGEgZm9yIGEgY2VydGFpblxuICogdmlldy4gU28gaWYgeW91IGhhZCBWKDApIGFuZCBWKDEpIGluIGEgY29udGFpbmVyLCB5b3UgbWlnaHQgaGF2ZTpcbiAqXG4gKiBbXG4gKiAgIFt7dGFnTmFtZTogJ2RpdicsIGF0dHJzOiAuLi59LCBudWxsXSwgICAgIC8vIFYoMCkgVFZpZXdcbiAqICAgW3t0YWdOYW1lOiAnYnV0dG9uJywgYXR0cnMgLi4ufSwgbnVsbF0gICAgLy8gVigxKSBUVmlld1xuICogXVxuICovXG5leHBvcnQgdHlwZSBUQ29udGFpbmVyID0gVFZpZXdbXTtcblxuLy8gTm90ZTogVGhpcyBoYWNrIGlzIG5lY2Vzc2FyeSBzbyB3ZSBkb24ndCBlcnJvbmVvdXNseSBnZXQgYSBjaXJjdWxhciBkZXBlbmRlbmN5XG4vLyBmYWlsdXJlIGJhc2VkIG9uIHR5cGVzLlxuZXhwb3J0IGNvbnN0IHVudXNlZFZhbHVlRXhwb3J0VG9QbGFjYXRlQWpkID0gMTtcbiJdfQ==