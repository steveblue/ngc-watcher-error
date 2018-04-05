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
/** @enum {number} */
const LNodeType = {
    Container: 0,
    Projection: 1,
    View: 2,
    Element: 3,
    ViewOrElement: 2,
};
export { LNodeType };
/** @enum {number} */
const TNodeFlags = {
    /** Whether or not this node is a component */
    Component: 1,
    /** How far to shift the flags to get the first directive index on this node */
    INDX_SHIFT: 13,
    /** How far to shift the flags to get the number of directives on this node */
    SIZE_SHIFT: 1,
    /** Mask to get the number of directives on this node */
    SIZE_MASK: 8190,
};
export { TNodeFlags };
/**
 * LNode is an internal data structure which is used for the incremental DOM algorithm.
 * The "L" stands for "Logical" to differentiate between `RNodes` (actual rendered DOM
 * node) and our logical representation of DOM nodes, `LNodes`.
 *
 * The data structure is optimized for speed and size.
 *
 * In order to be fast, all subtypes of `LNode` should have the same shape.
 * Because size of the `LNode` matters, many fields have multiple roles depending
 * on the `LNode` subtype.
 *
 * See: https://en.wikipedia.org/wiki/Inline_caching#Monomorphic_inline_caching
 *
 * NOTE: This is a private data structure and should not be exported by any of the
 * instructions.
 * @record
 */
export function LNode() { }
function LNode_tsickle_Closure_declarations() {
    /**
     * The type of the node (see LNodeFlags)
     * @type {?}
     */
    LNode.prototype.type;
    /**
     * The associated DOM node. Storing this allows us to:
     *  - append children to their element parents in the DOM (e.g. `parent.native.appendChild(...)`)
     *  - retrieve the sibling elements of text nodes whose creation / insertion has been delayed
     * @type {?}
     */
    LNode.prototype.native;
    /**
     * We need a reference to a node's parent so we can append the node to its parent's native
     * element at the appropriate time.
     * @type {?}
     */
    LNode.prototype.parent;
    /**
     * First child of the current node.
     * @type {?}
     */
    LNode.prototype.child;
    /**
     * The next sibling node. Necessary so we can propagate through the root nodes of a view
     * to insert them or remove them from the DOM.
     * @type {?}
     */
    LNode.prototype.next;
    /**
     * If regular LElementNode, then `data` will be null.
     * If LElementNode with component, then `data` contains LView.
     * If LViewNode, then `data` contains the LView.
     * If LContainerNode, then `data` contains LContainer.
     * If LProjectionNode, then `data` contains LProjection.
     * @type {?}
     */
    LNode.prototype.data;
    /**
     * Each node belongs to a view.
     *
     * When the injector is walking up a tree, it needs access to the `directives` (part of view).
     * @type {?}
     */
    LNode.prototype.view;
    /**
     * The injector associated with this node. Necessary for DI.
     * @type {?}
     */
    LNode.prototype.nodeInjector;
    /**
     * Optional set of queries that track query-related events for this node.
     *
     * If present the node creation/updates are reported to the `LQueries`.
     * @type {?}
     */
    LNode.prototype.queries;
    /**
     * If this node is projected, pointer to the next node in the same projection parent
     * (which is a container, an element, or a text node), or to the parent projection node
     * if this is the last node in the projection.
     * If this node is not projected, this field is null.
     * @type {?}
     */
    LNode.prototype.pNextOrParent;
    /**
     * Pointer to the corresponding TNode object, which stores static
     * data about this node.
     * @type {?}
     */
    LNode.prototype.tNode;
}
/**
 * LNode representing an element.
 * @record
 */
export function LElementNode() { }
function LElementNode_tsickle_Closure_declarations() {
    /**
     * The DOM element associated with this node.
     * @type {?}
     */
    LElementNode.prototype.native;
    /** @type {?} */
    LElementNode.prototype.child;
    /** @type {?} */
    LElementNode.prototype.next;
    /**
     * If Component then data has LView (light DOM)
     * @type {?}
     */
    LElementNode.prototype.data;
    /**
     * LElementNodes can be inside other LElementNodes or inside LViewNodes.
     * @type {?}
     */
    LElementNode.prototype.parent;
}
/**
 * LNode representing a #text node.
 * @record
 */
export function LTextNode() { }
function LTextNode_tsickle_Closure_declarations() {
    /**
     * The text node associated with this node.
     * @type {?}
     */
    LTextNode.prototype.native;
    /** @type {?} */
    LTextNode.prototype.child;
    /** @type {?} */
    LTextNode.prototype.next;
    /**
     * LTextNodes can be inside LElementNodes or inside LViewNodes.
     * @type {?}
     */
    LTextNode.prototype.parent;
    /** @type {?} */
    LTextNode.prototype.data;
}
/**
 * Abstract node which contains root nodes of a view.
 * @record
 */
export function LViewNode() { }
function LViewNode_tsickle_Closure_declarations() {
    /** @type {?} */
    LViewNode.prototype.native;
    /** @type {?} */
    LViewNode.prototype.child;
    /** @type {?} */
    LViewNode.prototype.next;
    /**
     * LViewNodes can only be added to LContainerNodes.
     * @type {?}
     */
    LViewNode.prototype.parent;
    /** @type {?} */
    LViewNode.prototype.data;
}
/**
 * Abstract node container which contains other views.
 * @record
 */
export function LContainerNode() { }
function LContainerNode_tsickle_Closure_declarations() {
    /** @type {?} */
    LContainerNode.prototype.native;
    /** @type {?} */
    LContainerNode.prototype.data;
    /** @type {?} */
    LContainerNode.prototype.child;
    /** @type {?} */
    LContainerNode.prototype.next;
    /**
     * Containers can be added to elements or views.
     * @type {?}
     */
    LContainerNode.prototype.parent;
}
/**
 * @record
 */
export function LProjectionNode() { }
function LProjectionNode_tsickle_Closure_declarations() {
    /** @type {?} */
    LProjectionNode.prototype.native;
    /** @type {?} */
    LProjectionNode.prototype.child;
    /** @type {?} */
    LProjectionNode.prototype.next;
    /** @type {?} */
    LProjectionNode.prototype.data;
    /**
     * Projections can be added to elements or views.
     * @type {?}
     */
    LProjectionNode.prototype.parent;
}
/**
 * LNode binding data (flyweight) for a particular node that is shared between all templates
 * of a specific type.
 *
 * If a property is:
 *    - PropertyAliases: that property's data was generated and this is it
 *    - Null: that property's data was already generated and nothing was found.
 *    - Undefined: that property's data has not yet been generated
 *
 * see: https://en.wikipedia.org/wiki/Flyweight_pattern for more on the Flyweight pattern
 * @record
 */
export function TNode() { }
function TNode_tsickle_Closure_declarations() {
    /**
     * This number stores two values using its bits:
     *
     * - the number of directives on that node (first 12 bits)
     * - the starting index of the node's directives in the directives array (last 20 bits).
     *
     * These two values are necessary so DI can effectively search the directives associated
     * with a node without searching the whole directives array.
     * @type {?}
     */
    TNode.prototype.flags;
    /**
     * The tag name associated with this node.
     * @type {?}
     */
    TNode.prototype.tagName;
    /**
     * Static attributes associated with an element. We need to store
     * static attributes to support content projection with selectors.
     * Attributes are stored statically because reading them from the DOM
     * would be way too slow for content projection and queries.
     *
     * Since attrs will always be calculated first, they will never need
     * to be marked undefined by other instructions.
     *
     * The name of the attribute and its value alternate in the array.
     * e.g. ['role', 'checkbox']
     * @type {?}
     */
    TNode.prototype.attrs;
    /**
     * A set of local names under which a given element is exported in a template and
     * visible to queries. An entry in this array can be created for different reasons:
     * - an element itself is referenced, ex.: `<div #foo>`
     * - a component is referenced, ex.: `<my-cmpt #foo>`
     * - a directive is referenced, ex.: `<my-cmpt #foo="directiveExportAs">`.
     *
     * A given element might have different local names and those names can be associated
     * with a directive. We store local names at even indexes while odd indexes are reserved
     * for directive index in a view (or `-1` if there is no associated directive).
     *
     * Some examples:
     * - `<div #foo>` => `["foo", -1]`
     * - `<my-cmpt #foo>` => `["foo", myCmptIdx]`
     * - `<my-cmpt #foo #bar="directiveExportAs">` => `["foo", myCmptIdx, "bar", directiveIdx]`
     * - `<div #foo #bar="directiveExportAs">` => `["foo", -1, "bar", directiveIdx]`
     * @type {?}
     */
    TNode.prototype.localNames;
    /**
     * Information about input properties that need to be set once from attribute data.
     * @type {?}
     */
    TNode.prototype.initialInputs;
    /**
     * Input data for all directives on this node.
     *
     * - `undefined` means that the prop has not been initialized yet,
     * - `null` means that the prop has been initialized but no inputs have been found.
     * @type {?}
     */
    TNode.prototype.inputs;
    /**
     * Output data for all directives on this node.
     *
     * - `undefined` means that the prop has not been initialized yet,
     * - `null` means that the prop has been initialized but no outputs have been found.
     * @type {?}
     */
    TNode.prototype.outputs;
    /**
     * The static data equivalent of LNode.data.
     *
     * If this TNode corresponds to an LContainerNode, the container will
     * need to store separate static data for each of its views (TContainer).
     *
     * If this TNode corresponds to an LElementNode, data will be null.
     * @type {?}
     */
    TNode.prototype.data;
}
/**
 * Static data for an LElementNode
 * @record
 */
export function TElementNode() { }
function TElementNode_tsickle_Closure_declarations() {
    /** @type {?} */
    TElementNode.prototype.data;
}
/**
 * Static data for an LContainerNode
 * @record
 */
export function TContainerNode() { }
function TContainerNode_tsickle_Closure_declarations() {
    /** @type {?} */
    TContainerNode.prototype.data;
}
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export const /** @type {?} */ unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvV0EsTUFBTSxDQUFDLHVCQUFNLDZCQUE2QixHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMQ29udGFpbmVyLCBUQ29udGFpbmVyfSBmcm9tICcuL2NvbnRhaW5lcic7XG5pbXBvcnQge0xJbmplY3Rvcn0gZnJvbSAnLi9pbmplY3Rvcic7XG5pbXBvcnQge0xQcm9qZWN0aW9ufSBmcm9tICcuL3Byb2plY3Rpb24nO1xuaW1wb3J0IHtMUXVlcmllc30gZnJvbSAnLi9xdWVyeSc7XG5pbXBvcnQge1JFbGVtZW50LCBSTm9kZSwgUlRleHR9IGZyb20gJy4vcmVuZGVyZXInO1xuaW1wb3J0IHtMVmlldywgVERhdGEsIFRWaWV3fSBmcm9tICcuL3ZpZXcnO1xuXG5cblxuLyoqXG4gKiBMTm9kZVR5cGUgY29ycmVzcG9uZHMgdG8gdGhlIExOb2RlLnR5cGUgcHJvcGVydHkuIEl0IGNvbnRhaW5zIGluZm9ybWF0aW9uXG4gKiBvbiBob3cgdG8gbWFwIGEgcGFydGljdWxhciBzZXQgb2YgYml0cyBpbiBMTm9kZS5mbGFncyB0byB0aGUgbm9kZSB0eXBlLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBMTm9kZVR5cGUge1xuICBDb250YWluZXIgPSAwYjAwLFxuICBQcm9qZWN0aW9uID0gMGIwMSxcbiAgVmlldyA9IDBiMTAsXG4gIEVsZW1lbnQgPSAwYjExLFxuICBWaWV3T3JFbGVtZW50ID0gMGIxMCxcbn1cblxuLyoqXG4gKiBUTm9kZUZsYWdzIGNvcnJlc3BvbmRzIHRvIHRoZSBUTm9kZS5mbGFncyBwcm9wZXJ0eS4gSXQgY29udGFpbnMgaW5mb3JtYXRpb25cbiAqIG9uIGhvdyB0byBtYXAgYSBwYXJ0aWN1bGFyIHNldCBvZiBiaXRzIHRvIHRoZSBub2RlJ3MgZmlyc3QgZGlyZWN0aXZlIGluZGV4XG4gKiAod2l0aCBJTkRYX1NISUZUKSBvciB0aGUgbm9kZSdzIGRpcmVjdGl2ZSBjb3VudCAod2l0aCBTSVpFX01BU0spXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFROb2RlRmxhZ3Mge1xuICAvKiogV2hldGhlciBvciBub3QgdGhpcyBub2RlIGlzIGEgY29tcG9uZW50ICovXG4gIENvbXBvbmVudCA9IDBiMDAxLFxuXG4gIC8qKiBIb3cgZmFyIHRvIHNoaWZ0IHRoZSBmbGFncyB0byBnZXQgdGhlIGZpcnN0IGRpcmVjdGl2ZSBpbmRleCBvbiB0aGlzIG5vZGUgKi9cbiAgSU5EWF9TSElGVCA9IDEzLFxuXG4gIC8qKiBIb3cgZmFyIHRvIHNoaWZ0IHRoZSBmbGFncyB0byBnZXQgdGhlIG51bWJlciBvZiBkaXJlY3RpdmVzIG9uIHRoaXMgbm9kZSAqL1xuICBTSVpFX1NISUZUID0gMSxcblxuICAvKiogTWFzayB0byBnZXQgdGhlIG51bWJlciBvZiBkaXJlY3RpdmVzIG9uIHRoaXMgbm9kZSAqL1xuICBTSVpFX01BU0sgPSAwYjAwMDAwMDAwMDAwMDAwMDAwMDAxMTExMTExMTExMTEwXG59XG5cbi8qKlxuICogTE5vZGUgaXMgYW4gaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgd2hpY2ggaXMgdXNlZCBmb3IgdGhlIGluY3JlbWVudGFsIERPTSBhbGdvcml0aG0uXG4gKiBUaGUgXCJMXCIgc3RhbmRzIGZvciBcIkxvZ2ljYWxcIiB0byBkaWZmZXJlbnRpYXRlIGJldHdlZW4gYFJOb2Rlc2AgKGFjdHVhbCByZW5kZXJlZCBET01cbiAqIG5vZGUpIGFuZCBvdXIgbG9naWNhbCByZXByZXNlbnRhdGlvbiBvZiBET00gbm9kZXMsIGBMTm9kZXNgLlxuICpcbiAqIFRoZSBkYXRhIHN0cnVjdHVyZSBpcyBvcHRpbWl6ZWQgZm9yIHNwZWVkIGFuZCBzaXplLlxuICpcbiAqIEluIG9yZGVyIHRvIGJlIGZhc3QsIGFsbCBzdWJ0eXBlcyBvZiBgTE5vZGVgIHNob3VsZCBoYXZlIHRoZSBzYW1lIHNoYXBlLlxuICogQmVjYXVzZSBzaXplIG9mIHRoZSBgTE5vZGVgIG1hdHRlcnMsIG1hbnkgZmllbGRzIGhhdmUgbXVsdGlwbGUgcm9sZXMgZGVwZW5kaW5nXG4gKiBvbiB0aGUgYExOb2RlYCBzdWJ0eXBlLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSW5saW5lX2NhY2hpbmcjTW9ub21vcnBoaWNfaW5saW5lX2NhY2hpbmdcbiAqXG4gKiBOT1RFOiBUaGlzIGlzIGEgcHJpdmF0ZSBkYXRhIHN0cnVjdHVyZSBhbmQgc2hvdWxkIG5vdCBiZSBleHBvcnRlZCBieSBhbnkgb2YgdGhlXG4gKiBpbnN0cnVjdGlvbnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTE5vZGUge1xuICAvKiogVGhlIHR5cGUgb2YgdGhlIG5vZGUgKHNlZSBMTm9kZUZsYWdzKSAqL1xuICB0eXBlOiBMTm9kZVR5cGU7XG5cbiAgLyoqXG4gICAqIFRoZSBhc3NvY2lhdGVkIERPTSBub2RlLiBTdG9yaW5nIHRoaXMgYWxsb3dzIHVzIHRvOlxuICAgKiAgLSBhcHBlbmQgY2hpbGRyZW4gdG8gdGhlaXIgZWxlbWVudCBwYXJlbnRzIGluIHRoZSBET00gKGUuZy4gYHBhcmVudC5uYXRpdmUuYXBwZW5kQ2hpbGQoLi4uKWApXG4gICAqICAtIHJldHJpZXZlIHRoZSBzaWJsaW5nIGVsZW1lbnRzIG9mIHRleHQgbm9kZXMgd2hvc2UgY3JlYXRpb24gLyBpbnNlcnRpb24gaGFzIGJlZW4gZGVsYXllZFxuICAgKi9cbiAgcmVhZG9ubHkgbmF0aXZlOiBSRWxlbWVudHxSVGV4dHxudWxsfHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogV2UgbmVlZCBhIHJlZmVyZW5jZSB0byBhIG5vZGUncyBwYXJlbnQgc28gd2UgY2FuIGFwcGVuZCB0aGUgbm9kZSB0byBpdHMgcGFyZW50J3MgbmF0aXZlXG4gICAqIGVsZW1lbnQgYXQgdGhlIGFwcHJvcHJpYXRlIHRpbWUuXG4gICAqL1xuICByZWFkb25seSBwYXJlbnQ6IExOb2RlfG51bGw7XG5cbiAgLyoqXG4gICAqIEZpcnN0IGNoaWxkIG9mIHRoZSBjdXJyZW50IG5vZGUuXG4gICAqL1xuICBjaGlsZDogTE5vZGV8bnVsbDtcblxuICAvKipcbiAgICogVGhlIG5leHQgc2libGluZyBub2RlLiBOZWNlc3Nhcnkgc28gd2UgY2FuIHByb3BhZ2F0ZSB0aHJvdWdoIHRoZSByb290IG5vZGVzIG9mIGEgdmlld1xuICAgKiB0byBpbnNlcnQgdGhlbSBvciByZW1vdmUgdGhlbSBmcm9tIHRoZSBET00uXG4gICAqL1xuICBuZXh0OiBMTm9kZXxudWxsO1xuXG4gIC8qKlxuICAgKiBJZiByZWd1bGFyIExFbGVtZW50Tm9kZSwgdGhlbiBgZGF0YWAgd2lsbCBiZSBudWxsLlxuICAgKiBJZiBMRWxlbWVudE5vZGUgd2l0aCBjb21wb25lbnQsIHRoZW4gYGRhdGFgIGNvbnRhaW5zIExWaWV3LlxuICAgKiBJZiBMVmlld05vZGUsIHRoZW4gYGRhdGFgIGNvbnRhaW5zIHRoZSBMVmlldy5cbiAgICogSWYgTENvbnRhaW5lck5vZGUsIHRoZW4gYGRhdGFgIGNvbnRhaW5zIExDb250YWluZXIuXG4gICAqIElmIExQcm9qZWN0aW9uTm9kZSwgdGhlbiBgZGF0YWAgY29udGFpbnMgTFByb2plY3Rpb24uXG4gICAqL1xuICByZWFkb25seSBkYXRhOiBMVmlld3xMQ29udGFpbmVyfExQcm9qZWN0aW9ufG51bGw7XG5cblxuICAvKipcbiAgICogRWFjaCBub2RlIGJlbG9uZ3MgdG8gYSB2aWV3LlxuICAgKlxuICAgKiBXaGVuIHRoZSBpbmplY3RvciBpcyB3YWxraW5nIHVwIGEgdHJlZSwgaXQgbmVlZHMgYWNjZXNzIHRvIHRoZSBgZGlyZWN0aXZlc2AgKHBhcnQgb2YgdmlldykuXG4gICAqL1xuICByZWFkb25seSB2aWV3OiBMVmlldztcblxuICAvKiogVGhlIGluamVjdG9yIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5vZGUuIE5lY2Vzc2FyeSBmb3IgREkuICovXG4gIG5vZGVJbmplY3RvcjogTEluamVjdG9yfG51bGw7XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIHNldCBvZiBxdWVyaWVzIHRoYXQgdHJhY2sgcXVlcnktcmVsYXRlZCBldmVudHMgZm9yIHRoaXMgbm9kZS5cbiAgICpcbiAgICogSWYgcHJlc2VudCB0aGUgbm9kZSBjcmVhdGlvbi91cGRhdGVzIGFyZSByZXBvcnRlZCB0byB0aGUgYExRdWVyaWVzYC5cbiAgICovXG4gIHF1ZXJpZXM6IExRdWVyaWVzfG51bGw7XG5cbiAgLyoqXG4gICAqIElmIHRoaXMgbm9kZSBpcyBwcm9qZWN0ZWQsIHBvaW50ZXIgdG8gdGhlIG5leHQgbm9kZSBpbiB0aGUgc2FtZSBwcm9qZWN0aW9uIHBhcmVudFxuICAgKiAod2hpY2ggaXMgYSBjb250YWluZXIsIGFuIGVsZW1lbnQsIG9yIGEgdGV4dCBub2RlKSwgb3IgdG8gdGhlIHBhcmVudCBwcm9qZWN0aW9uIG5vZGVcbiAgICogaWYgdGhpcyBpcyB0aGUgbGFzdCBub2RlIGluIHRoZSBwcm9qZWN0aW9uLlxuICAgKiBJZiB0aGlzIG5vZGUgaXMgbm90IHByb2plY3RlZCwgdGhpcyBmaWVsZCBpcyBudWxsLlxuICAgKi9cbiAgcE5leHRPclBhcmVudDogTE5vZGV8bnVsbDtcblxuICAvKipcbiAgICogUG9pbnRlciB0byB0aGUgY29ycmVzcG9uZGluZyBUTm9kZSBvYmplY3QsIHdoaWNoIHN0b3JlcyBzdGF0aWNcbiAgICogZGF0YSBhYm91dCB0aGlzIG5vZGUuXG4gICAqL1xuICB0Tm9kZTogVE5vZGV8bnVsbDtcbn1cblxuXG4vKiogTE5vZGUgcmVwcmVzZW50aW5nIGFuIGVsZW1lbnQuICovXG5leHBvcnQgaW50ZXJmYWNlIExFbGVtZW50Tm9kZSBleHRlbmRzIExOb2RlIHtcbiAgLyoqIFRoZSBET00gZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlLiAqL1xuICByZWFkb25seSBuYXRpdmU6IFJFbGVtZW50O1xuXG4gIGNoaWxkOiBMQ29udGFpbmVyTm9kZXxMRWxlbWVudE5vZGV8TFRleHROb2RlfExQcm9qZWN0aW9uTm9kZXxudWxsO1xuICBuZXh0OiBMQ29udGFpbmVyTm9kZXxMRWxlbWVudE5vZGV8TFRleHROb2RlfExQcm9qZWN0aW9uTm9kZXxudWxsO1xuXG4gIC8qKiBJZiBDb21wb25lbnQgdGhlbiBkYXRhIGhhcyBMVmlldyAobGlnaHQgRE9NKSAqL1xuICByZWFkb25seSBkYXRhOiBMVmlld3xudWxsO1xuXG4gIC8qKiBMRWxlbWVudE5vZGVzIGNhbiBiZSBpbnNpZGUgb3RoZXIgTEVsZW1lbnROb2RlcyBvciBpbnNpZGUgTFZpZXdOb2Rlcy4gKi9cbiAgcmVhZG9ubHkgcGFyZW50OiBMRWxlbWVudE5vZGV8TFZpZXdOb2RlO1xufVxuXG4vKiogTE5vZGUgcmVwcmVzZW50aW5nIGEgI3RleHQgbm9kZS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTFRleHROb2RlIGV4dGVuZHMgTE5vZGUge1xuICAvKiogVGhlIHRleHQgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlLiAqL1xuICBuYXRpdmU6IFJUZXh0O1xuICBjaGlsZDogbnVsbDtcbiAgbmV4dDogTENvbnRhaW5lck5vZGV8TEVsZW1lbnROb2RlfExUZXh0Tm9kZXxMUHJvamVjdGlvbk5vZGV8bnVsbDtcblxuICAvKiogTFRleHROb2RlcyBjYW4gYmUgaW5zaWRlIExFbGVtZW50Tm9kZXMgb3IgaW5zaWRlIExWaWV3Tm9kZXMuICovXG4gIHJlYWRvbmx5IHBhcmVudDogTEVsZW1lbnROb2RlfExWaWV3Tm9kZTtcbiAgcmVhZG9ubHkgZGF0YTogbnVsbDtcbn1cblxuLyoqIEFic3RyYWN0IG5vZGUgd2hpY2ggY29udGFpbnMgcm9vdCBub2RlcyBvZiBhIHZpZXcuICovXG5leHBvcnQgaW50ZXJmYWNlIExWaWV3Tm9kZSBleHRlbmRzIExOb2RlIHtcbiAgcmVhZG9ubHkgbmF0aXZlOiBudWxsO1xuICBjaGlsZDogTENvbnRhaW5lck5vZGV8TEVsZW1lbnROb2RlfExUZXh0Tm9kZXxMUHJvamVjdGlvbk5vZGV8bnVsbDtcbiAgbmV4dDogTFZpZXdOb2RlfG51bGw7XG5cbiAgLyoqICBMVmlld05vZGVzIGNhbiBvbmx5IGJlIGFkZGVkIHRvIExDb250YWluZXJOb2Rlcy4gKi9cbiAgcmVhZG9ubHkgcGFyZW50OiBMQ29udGFpbmVyTm9kZXxudWxsO1xuICByZWFkb25seSBkYXRhOiBMVmlldztcbn1cblxuLyoqIEFic3RyYWN0IG5vZGUgY29udGFpbmVyIHdoaWNoIGNvbnRhaW5zIG90aGVyIHZpZXdzLiAqL1xuZXhwb3J0IGludGVyZmFjZSBMQ29udGFpbmVyTm9kZSBleHRlbmRzIExOb2RlIHtcbiAgLypcbiAgICogQ2FjaGVzIHRoZSByZWZlcmVuY2Ugb2YgdGhlIGZpcnN0IG5hdGl2ZSBub2RlIGZvbGxvd2luZyB0aGlzIGNvbnRhaW5lciBpbiB0aGUgc2FtZSBuYXRpdmVcbiAgICogcGFyZW50LlxuICAgKiBUaGlzIGlzIHJlc2V0IHRvIHVuZGVmaW5lZCBpbiBjb250YWluZXJSZWZyZXNoRW5kLlxuICAgKiBXaGVuIGl0IGlzIHVuZGVmaW5lZCwgaXQgbWVhbnMgdGhlIHZhbHVlIGhhcyBub3QgYmVlbiBjb21wdXRlZCB5ZXQuXG4gICAqIE90aGVyd2lzZSwgaXQgY29udGFpbnMgdGhlIHJlc3VsdCBvZiBmaW5kQmVmb3JlTm9kZShjb250YWluZXIsIG51bGwpLlxuICAgKi9cbiAgbmF0aXZlOiBSRWxlbWVudHxSVGV4dHxudWxsfHVuZGVmaW5lZDtcbiAgcmVhZG9ubHkgZGF0YTogTENvbnRhaW5lcjtcbiAgY2hpbGQ6IG51bGw7XG4gIG5leHQ6IExDb250YWluZXJOb2RlfExFbGVtZW50Tm9kZXxMVGV4dE5vZGV8TFByb2plY3Rpb25Ob2RlfG51bGw7XG5cbiAgLyoqIENvbnRhaW5lcnMgY2FuIGJlIGFkZGVkIHRvIGVsZW1lbnRzIG9yIHZpZXdzLiAqL1xuICByZWFkb25seSBwYXJlbnQ6IExFbGVtZW50Tm9kZXxMVmlld05vZGV8bnVsbDtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIExQcm9qZWN0aW9uTm9kZSBleHRlbmRzIExOb2RlIHtcbiAgcmVhZG9ubHkgbmF0aXZlOiBudWxsO1xuICBjaGlsZDogbnVsbDtcbiAgbmV4dDogTENvbnRhaW5lck5vZGV8TEVsZW1lbnROb2RlfExUZXh0Tm9kZXxMUHJvamVjdGlvbk5vZGV8bnVsbDtcblxuICByZWFkb25seSBkYXRhOiBMUHJvamVjdGlvbjtcblxuICAvKiogUHJvamVjdGlvbnMgY2FuIGJlIGFkZGVkIHRvIGVsZW1lbnRzIG9yIHZpZXdzLiAqL1xuICByZWFkb25seSBwYXJlbnQ6IExFbGVtZW50Tm9kZXxMVmlld05vZGU7XG59XG5cbi8qKlxuICogTE5vZGUgYmluZGluZyBkYXRhIChmbHl3ZWlnaHQpIGZvciBhIHBhcnRpY3VsYXIgbm9kZSB0aGF0IGlzIHNoYXJlZCBiZXR3ZWVuIGFsbCB0ZW1wbGF0ZXNcbiAqIG9mIGEgc3BlY2lmaWMgdHlwZS5cbiAqXG4gKiBJZiBhIHByb3BlcnR5IGlzOlxuICogICAgLSBQcm9wZXJ0eUFsaWFzZXM6IHRoYXQgcHJvcGVydHkncyBkYXRhIHdhcyBnZW5lcmF0ZWQgYW5kIHRoaXMgaXMgaXRcbiAqICAgIC0gTnVsbDogdGhhdCBwcm9wZXJ0eSdzIGRhdGEgd2FzIGFscmVhZHkgZ2VuZXJhdGVkIGFuZCBub3RoaW5nIHdhcyBmb3VuZC5cbiAqICAgIC0gVW5kZWZpbmVkOiB0aGF0IHByb3BlcnR5J3MgZGF0YSBoYXMgbm90IHlldCBiZWVuIGdlbmVyYXRlZFxuICpcbiAqIHNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmx5d2VpZ2h0X3BhdHRlcm4gZm9yIG1vcmUgb24gdGhlIEZseXdlaWdodCBwYXR0ZXJuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVE5vZGUge1xuICAvKipcbiAgICogVGhpcyBudW1iZXIgc3RvcmVzIHR3byB2YWx1ZXMgdXNpbmcgaXRzIGJpdHM6XG4gICAqXG4gICAqIC0gdGhlIG51bWJlciBvZiBkaXJlY3RpdmVzIG9uIHRoYXQgbm9kZSAoZmlyc3QgMTIgYml0cylcbiAgICogLSB0aGUgc3RhcnRpbmcgaW5kZXggb2YgdGhlIG5vZGUncyBkaXJlY3RpdmVzIGluIHRoZSBkaXJlY3RpdmVzIGFycmF5IChsYXN0IDIwIGJpdHMpLlxuICAgKlxuICAgKiBUaGVzZSB0d28gdmFsdWVzIGFyZSBuZWNlc3Nhcnkgc28gREkgY2FuIGVmZmVjdGl2ZWx5IHNlYXJjaCB0aGUgZGlyZWN0aXZlcyBhc3NvY2lhdGVkXG4gICAqIHdpdGggYSBub2RlIHdpdGhvdXQgc2VhcmNoaW5nIHRoZSB3aG9sZSBkaXJlY3RpdmVzIGFycmF5LlxuICAgKi9cbiAgZmxhZ3M6IFROb2RlRmxhZ3M7XG5cbiAgLyoqIFRoZSB0YWcgbmFtZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlLiAqL1xuICB0YWdOYW1lOiBzdHJpbmd8bnVsbDtcblxuICAvKipcbiAgICogU3RhdGljIGF0dHJpYnV0ZXMgYXNzb2NpYXRlZCB3aXRoIGFuIGVsZW1lbnQuIFdlIG5lZWQgdG8gc3RvcmVcbiAgICogc3RhdGljIGF0dHJpYnV0ZXMgdG8gc3VwcG9ydCBjb250ZW50IHByb2plY3Rpb24gd2l0aCBzZWxlY3RvcnMuXG4gICAqIEF0dHJpYnV0ZXMgYXJlIHN0b3JlZCBzdGF0aWNhbGx5IGJlY2F1c2UgcmVhZGluZyB0aGVtIGZyb20gdGhlIERPTVxuICAgKiB3b3VsZCBiZSB3YXkgdG9vIHNsb3cgZm9yIGNvbnRlbnQgcHJvamVjdGlvbiBhbmQgcXVlcmllcy5cbiAgICpcbiAgICogU2luY2UgYXR0cnMgd2lsbCBhbHdheXMgYmUgY2FsY3VsYXRlZCBmaXJzdCwgdGhleSB3aWxsIG5ldmVyIG5lZWRcbiAgICogdG8gYmUgbWFya2VkIHVuZGVmaW5lZCBieSBvdGhlciBpbnN0cnVjdGlvbnMuXG4gICAqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgYW5kIGl0cyB2YWx1ZSBhbHRlcm5hdGUgaW4gdGhlIGFycmF5LlxuICAgKiBlLmcuIFsncm9sZScsICdjaGVja2JveCddXG4gICAqL1xuICBhdHRyczogc3RyaW5nW118bnVsbDtcblxuICAvKipcbiAgICogQSBzZXQgb2YgbG9jYWwgbmFtZXMgdW5kZXIgd2hpY2ggYSBnaXZlbiBlbGVtZW50IGlzIGV4cG9ydGVkIGluIGEgdGVtcGxhdGUgYW5kXG4gICAqIHZpc2libGUgdG8gcXVlcmllcy4gQW4gZW50cnkgaW4gdGhpcyBhcnJheSBjYW4gYmUgY3JlYXRlZCBmb3IgZGlmZmVyZW50IHJlYXNvbnM6XG4gICAqIC0gYW4gZWxlbWVudCBpdHNlbGYgaXMgcmVmZXJlbmNlZCwgZXguOiBgPGRpdiAjZm9vPmBcbiAgICogLSBhIGNvbXBvbmVudCBpcyByZWZlcmVuY2VkLCBleC46IGA8bXktY21wdCAjZm9vPmBcbiAgICogLSBhIGRpcmVjdGl2ZSBpcyByZWZlcmVuY2VkLCBleC46IGA8bXktY21wdCAjZm9vPVwiZGlyZWN0aXZlRXhwb3J0QXNcIj5gLlxuICAgKlxuICAgKiBBIGdpdmVuIGVsZW1lbnQgbWlnaHQgaGF2ZSBkaWZmZXJlbnQgbG9jYWwgbmFtZXMgYW5kIHRob3NlIG5hbWVzIGNhbiBiZSBhc3NvY2lhdGVkXG4gICAqIHdpdGggYSBkaXJlY3RpdmUuIFdlIHN0b3JlIGxvY2FsIG5hbWVzIGF0IGV2ZW4gaW5kZXhlcyB3aGlsZSBvZGQgaW5kZXhlcyBhcmUgcmVzZXJ2ZWRcbiAgICogZm9yIGRpcmVjdGl2ZSBpbmRleCBpbiBhIHZpZXcgKG9yIGAtMWAgaWYgdGhlcmUgaXMgbm8gYXNzb2NpYXRlZCBkaXJlY3RpdmUpLlxuICAgKlxuICAgKiBTb21lIGV4YW1wbGVzOlxuICAgKiAtIGA8ZGl2ICNmb28+YCA9PiBgW1wiZm9vXCIsIC0xXWBcbiAgICogLSBgPG15LWNtcHQgI2Zvbz5gID0+IGBbXCJmb29cIiwgbXlDbXB0SWR4XWBcbiAgICogLSBgPG15LWNtcHQgI2ZvbyAjYmFyPVwiZGlyZWN0aXZlRXhwb3J0QXNcIj5gID0+IGBbXCJmb29cIiwgbXlDbXB0SWR4LCBcImJhclwiLCBkaXJlY3RpdmVJZHhdYFxuICAgKiAtIGA8ZGl2ICNmb28gI2Jhcj1cImRpcmVjdGl2ZUV4cG9ydEFzXCI+YCA9PiBgW1wiZm9vXCIsIC0xLCBcImJhclwiLCBkaXJlY3RpdmVJZHhdYFxuICAgKi9cbiAgbG9jYWxOYW1lczogKHN0cmluZ3xudW1iZXIpW118bnVsbDtcblxuICAvKiogSW5mb3JtYXRpb24gYWJvdXQgaW5wdXQgcHJvcGVydGllcyB0aGF0IG5lZWQgdG8gYmUgc2V0IG9uY2UgZnJvbSBhdHRyaWJ1dGUgZGF0YS4gKi9cbiAgaW5pdGlhbElucHV0czogSW5pdGlhbElucHV0RGF0YXxudWxsfHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogSW5wdXQgZGF0YSBmb3IgYWxsIGRpcmVjdGl2ZXMgb24gdGhpcyBub2RlLlxuICAgKlxuICAgKiAtIGB1bmRlZmluZWRgIG1lYW5zIHRoYXQgdGhlIHByb3AgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldCxcbiAgICogLSBgbnVsbGAgbWVhbnMgdGhhdCB0aGUgcHJvcCBoYXMgYmVlbiBpbml0aWFsaXplZCBidXQgbm8gaW5wdXRzIGhhdmUgYmVlbiBmb3VuZC5cbiAgICovXG4gIGlucHV0czogUHJvcGVydHlBbGlhc2VzfG51bGx8dW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBPdXRwdXQgZGF0YSBmb3IgYWxsIGRpcmVjdGl2ZXMgb24gdGhpcyBub2RlLlxuICAgKlxuICAgKiAtIGB1bmRlZmluZWRgIG1lYW5zIHRoYXQgdGhlIHByb3AgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldCxcbiAgICogLSBgbnVsbGAgbWVhbnMgdGhhdCB0aGUgcHJvcCBoYXMgYmVlbiBpbml0aWFsaXplZCBidXQgbm8gb3V0cHV0cyBoYXZlIGJlZW4gZm91bmQuXG4gICAqL1xuICBvdXRwdXRzOiBQcm9wZXJ0eUFsaWFzZXN8bnVsbHx1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBzdGF0aWMgZGF0YSBlcXVpdmFsZW50IG9mIExOb2RlLmRhdGEuXG4gICAqXG4gICAqIElmIHRoaXMgVE5vZGUgY29ycmVzcG9uZHMgdG8gYW4gTENvbnRhaW5lck5vZGUsIHRoZSBjb250YWluZXIgd2lsbFxuICAgKiBuZWVkIHRvIHN0b3JlIHNlcGFyYXRlIHN0YXRpYyBkYXRhIGZvciBlYWNoIG9mIGl0cyB2aWV3cyAoVENvbnRhaW5lcikuXG4gICAqXG4gICAqIElmIHRoaXMgVE5vZGUgY29ycmVzcG9uZHMgdG8gYW4gTEVsZW1lbnROb2RlLCBkYXRhIHdpbGwgYmUgbnVsbC5cbiAgICovXG4gIGRhdGE6IFRDb250YWluZXJ8bnVsbDtcbn1cblxuLyoqIFN0YXRpYyBkYXRhIGZvciBhbiBMRWxlbWVudE5vZGUgICovXG5leHBvcnQgaW50ZXJmYWNlIFRFbGVtZW50Tm9kZSBleHRlbmRzIFROb2RlIHsgZGF0YTogbnVsbDsgfVxuXG4vKiogU3RhdGljIGRhdGEgZm9yIGFuIExDb250YWluZXJOb2RlICovXG5leHBvcnQgaW50ZXJmYWNlIFRDb250YWluZXJOb2RlIGV4dGVuZHMgVE5vZGUgeyBkYXRhOiBUQ29udGFpbmVyOyB9XG5cbi8qKlxuICogVGhpcyBtYXBwaW5nIGlzIG5lY2Vzc2FyeSBzbyB3ZSBjYW4gc2V0IGlucHV0IHByb3BlcnRpZXMgYW5kIG91dHB1dCBsaXN0ZW5lcnNcbiAqIHByb3Blcmx5IGF0IHJ1bnRpbWUgd2hlbiBwcm9wZXJ0eSBuYW1lcyBhcmUgbWluaWZpZWQgb3IgYWxpYXNlZC5cbiAqXG4gKiBLZXk6IHVubWluaWZpZWQgLyBwdWJsaWMgaW5wdXQgb3Igb3V0cHV0IG5hbWVcbiAqIFZhbHVlOiBhcnJheSBjb250YWluaW5nIG1pbmlmaWVkIC8gaW50ZXJuYWwgbmFtZSBhbmQgcmVsYXRlZCBkaXJlY3RpdmUgaW5kZXhcbiAqXG4gKiBUaGUgdmFsdWUgbXVzdCBiZSBhbiBhcnJheSB0byBzdXBwb3J0IGlucHV0cyBhbmQgb3V0cHV0cyB3aXRoIHRoZSBzYW1lIG5hbWVcbiAqIG9uIHRoZSBzYW1lIG5vZGUuXG4gKi9cbmV4cG9ydCB0eXBlIFByb3BlcnR5QWxpYXNlcyA9IHtcbiAgLy8gVGhpcyB1c2VzIGFuIG9iamVjdCBtYXAgYmVjYXVzZSB1c2luZyB0aGUgTWFwIHR5cGUgd291bGQgYmUgdG9vIHNsb3dcbiAgW2tleTogc3RyaW5nXTogUHJvcGVydHlBbGlhc1ZhbHVlXG59O1xuXG4vKipcbiAqIFN0b3JlIHRoZSBydW50aW1lIGlucHV0IG9yIG91dHB1dCBuYW1lcyBmb3IgYWxsIHRoZSBkaXJlY3RpdmVzLlxuICpcbiAqIC0gRXZlbiBpbmRpY2VzOiBkaXJlY3RpdmUgaW5kZXhcbiAqIC0gT2RkIGluZGljZXM6IG1pbmlmaWVkIC8gaW50ZXJuYWwgbmFtZVxuICpcbiAqIGUuZy4gWzAsICdjaGFuZ2UtbWluaWZpZWQnXVxuICovXG5leHBvcnQgdHlwZSBQcm9wZXJ0eUFsaWFzVmFsdWUgPSAobnVtYmVyIHwgc3RyaW5nKVtdO1xuXG5cbi8qKlxuICogVGhpcyBhcnJheSBjb250YWlucyBpbmZvcm1hdGlvbiBhYm91dCBpbnB1dCBwcm9wZXJ0aWVzIHRoYXRcbiAqIG5lZWQgdG8gYmUgc2V0IG9uY2UgZnJvbSBhdHRyaWJ1dGUgZGF0YS4gSXQncyBvcmRlcmVkIGJ5XG4gKiBkaXJlY3RpdmUgaW5kZXggKHJlbGF0aXZlIHRvIGVsZW1lbnQpIHNvIGl0J3Mgc2ltcGxlIHRvXG4gKiBsb29rIHVwIGEgc3BlY2lmaWMgZGlyZWN0aXZlJ3MgaW5pdGlhbCBpbnB1dCBkYXRhLlxuICpcbiAqIFdpdGhpbiBlYWNoIHN1Yi1hcnJheTpcbiAqXG4gKiBFdmVuIGluZGljZXM6IG1pbmlmaWVkL2ludGVybmFsIGlucHV0IG5hbWVcbiAqIE9kZCBpbmRpY2VzOiBpbml0aWFsIHZhbHVlXG4gKlxuICogSWYgYSBkaXJlY3RpdmUgb24gYSBub2RlIGRvZXMgbm90IGhhdmUgYW55IGlucHV0IHByb3BlcnRpZXNcbiAqIHRoYXQgc2hvdWxkIGJlIHNldCBmcm9tIGF0dHJpYnV0ZXMsIGl0cyBpbmRleCBpcyBzZXQgdG8gbnVsbFxuICogdG8gYXZvaWQgYSBzcGFyc2UgYXJyYXkuXG4gKlxuICogZS5nLiBbbnVsbCwgWydyb2xlLW1pbicsICdidXR0b24nXV1cbiAqL1xuZXhwb3J0IHR5cGUgSW5pdGlhbElucHV0RGF0YSA9IChJbml0aWFsSW5wdXRzIHwgbnVsbClbXTtcblxuLyoqXG4gKiBVc2VkIGJ5IEluaXRpYWxJbnB1dERhdGEgdG8gc3RvcmUgaW5wdXQgcHJvcGVydGllc1xuICogdGhhdCBzaG91bGQgYmUgc2V0IG9uY2UgZnJvbSBhdHRyaWJ1dGVzLlxuICpcbiAqIEV2ZW4gaW5kaWNlczogbWluaWZpZWQvaW50ZXJuYWwgaW5wdXQgbmFtZVxuICogT2RkIGluZGljZXM6IGluaXRpYWwgdmFsdWVcbiAqXG4gKiBlLmcuIFsncm9sZS1taW4nLCAnYnV0dG9uJ11cbiAqL1xuZXhwb3J0IHR5cGUgSW5pdGlhbElucHV0cyA9IHN0cmluZ1tdO1xuXG4vLyBOb3RlOiBUaGlzIGhhY2sgaXMgbmVjZXNzYXJ5IHNvIHdlIGRvbid0IGVycm9uZW91c2x5IGdldCBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbi8vIGZhaWx1cmUgYmFzZWQgb24gdHlwZXMuXG5leHBvcnQgY29uc3QgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgPSAxO1xuIl19