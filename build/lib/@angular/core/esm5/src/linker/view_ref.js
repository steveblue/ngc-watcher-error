/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef } from '../change_detection/change_detector_ref';
/**
 * @stable
 */
var /**
 * @stable
 */
ViewRef = /** @class */ (function (_super) {
    tslib_1.__extends(ViewRef, _super);
    function ViewRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ViewRef;
}(ChangeDetectorRef));
/**
 * @stable
 */
export { ViewRef };
/**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a {@link ViewContainerRef}. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * We have two {@link TemplateRef}s:
 *
 * Outer {@link TemplateRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * Inner {@link TemplateRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate {@link TemplateRef}s.
 *
 * The outer/inner {@link TemplateRef}s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * @experimental
 */
var /**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a {@link ViewContainerRef}. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * We have two {@link TemplateRef}s:
 *
 * Outer {@link TemplateRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * Inner {@link TemplateRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate {@link TemplateRef}s.
 *
 * The outer/inner {@link TemplateRef}s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * @experimental
 */
EmbeddedViewRef = /** @class */ (function (_super) {
    tslib_1.__extends(EmbeddedViewRef, _super);
    function EmbeddedViewRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EmbeddedViewRef;
}(ViewRef));
/**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a {@link ViewContainerRef}. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * We have two {@link TemplateRef}s:
 *
 * Outer {@link TemplateRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <ng-template ngFor let-item [ngForOf]="items"></ng-template>
 * </ul>
 * ```
 *
 * Inner {@link TemplateRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate {@link TemplateRef}s.
 *
 * The outer/inner {@link TemplateRef}s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <ng-template view-container-ref></ng-template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * @experimental
 */
export { EmbeddedViewRef };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvdmlld19yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFTQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQzs7OztBQU0xRTs7O0FBQUE7SUFBc0MsbUNBQWlCOzs7O2tCQWZ2RDtFQWVzQyxpQkFBaUIsRUFTdEQsQ0FBQTs7OztBQVRELG1CQVNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0REOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFpRCwyQ0FBTzs7OzswQkFoRnhEO0VBZ0ZpRCxPQUFPLEVBSXZELENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFKRCwyQkFJQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZn0gZnJvbSAnLi4vYXBwbGljYXRpb25fcmVmJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdG9yX3JlZic7XG5cblxuLyoqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWaWV3UmVmIGV4dGVuZHMgQ2hhbmdlRGV0ZWN0b3JSZWYge1xuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHZpZXcgYW5kIGFsbCBvZiB0aGUgZGF0YSBzdHJ1Y3R1cmVzIGFzc29jaWF0ZWQgd2l0aCBpdC5cbiAgICovXG4gIGFic3RyYWN0IGRlc3Ryb3koKTogdm9pZDtcblxuICBhYnN0cmFjdCBnZXQgZGVzdHJveWVkKCk6IGJvb2xlYW47XG5cbiAgYWJzdHJhY3Qgb25EZXN0cm95KGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueSAvKiogVE9ETyAjOTEwMCAqLztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEFuZ3VsYXIgVmlldy5cbiAqXG4gKiA8IS0tIFRPRE86IG1vdmUgdGhlIG5leHQgdHdvIHBhcmFncmFwaHMgdG8gdGhlIGRldiBndWlkZSAtLT5cbiAqIEEgVmlldyBpcyBhIGZ1bmRhbWVudGFsIGJ1aWxkaW5nIGJsb2NrIG9mIHRoZSBhcHBsaWNhdGlvbiBVSS4gSXQgaXMgdGhlIHNtYWxsZXN0IGdyb3VwaW5nIG9mXG4gKiBFbGVtZW50cyB3aGljaCBhcmUgY3JlYXRlZCBhbmQgZGVzdHJveWVkIHRvZ2V0aGVyLlxuICpcbiAqIFByb3BlcnRpZXMgb2YgZWxlbWVudHMgaW4gYSBWaWV3IGNhbiBjaGFuZ2UsIGJ1dCB0aGUgc3RydWN0dXJlIChudW1iZXIgYW5kIG9yZGVyKSBvZiBlbGVtZW50cyBpblxuICogYSBWaWV3IGNhbm5vdC4gQ2hhbmdpbmcgdGhlIHN0cnVjdHVyZSBvZiBFbGVtZW50cyBjYW4gb25seSBiZSBkb25lIGJ5IGluc2VydGluZywgbW92aW5nIG9yXG4gKiByZW1vdmluZyBuZXN0ZWQgVmlld3MgdmlhIGEge0BsaW5rIFZpZXdDb250YWluZXJSZWZ9LiBFYWNoIFZpZXcgY2FuIGNvbnRhaW4gbWFueSBWaWV3IENvbnRhaW5lcnMuXG4gKiA8IS0tIC9UT0RPIC0tPlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogR2l2ZW4gdGhpcyB0ZW1wbGF0ZS4uLlxuICpcbiAqIGBgYFxuICogQ291bnQ6IHt7aXRlbXMubGVuZ3RofX1cbiAqIDx1bD5cbiAqICAgPGxpICpuZ0Zvcj1cImxldCAgaXRlbSBvZiBpdGVtc1wiPnt7aXRlbX19PC9saT5cbiAqIDwvdWw+XG4gKiBgYGBcbiAqXG4gKiBXZSBoYXZlIHR3byB7QGxpbmsgVGVtcGxhdGVSZWZ9czpcbiAqXG4gKiBPdXRlciB7QGxpbmsgVGVtcGxhdGVSZWZ9OlxuICogYGBgXG4gKiBDb3VudDoge3tpdGVtcy5sZW5ndGh9fVxuICogPHVsPlxuICogICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwiaXRlbXNcIj48L25nLXRlbXBsYXRlPlxuICogPC91bD5cbiAqIGBgYFxuICpcbiAqIElubmVyIHtAbGluayBUZW1wbGF0ZVJlZn06XG4gKiBgYGBcbiAqICAgPGxpPnt7aXRlbX19PC9saT5cbiAqIGBgYFxuICpcbiAqIE5vdGljZSB0aGF0IHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBpcyBicm9rZW4gZG93biBpbnRvIHR3byBzZXBhcmF0ZSB7QGxpbmsgVGVtcGxhdGVSZWZ9cy5cbiAqXG4gKiBUaGUgb3V0ZXIvaW5uZXIge0BsaW5rIFRlbXBsYXRlUmVmfXMgYXJlIHRoZW4gYXNzZW1ibGVkIGludG8gdmlld3MgbGlrZSBzbzpcbiAqXG4gKiBgYGBcbiAqIDwhLS0gVmlld1JlZjogb3V0ZXItMCAtLT5cbiAqIENvdW50OiAyXG4gKiA8dWw+XG4gKiAgIDxuZy10ZW1wbGF0ZSB2aWV3LWNvbnRhaW5lci1yZWY+PC9uZy10ZW1wbGF0ZT5cbiAqICAgPCEtLSBWaWV3UmVmOiBpbm5lci0xIC0tPjxsaT5maXJzdDwvbGk+PCEtLSAvVmlld1JlZjogaW5uZXItMSAtLT5cbiAqICAgPCEtLSBWaWV3UmVmOiBpbm5lci0yIC0tPjxsaT5zZWNvbmQ8L2xpPjwhLS0gL1ZpZXdSZWY6IGlubmVyLTIgLS0+XG4gKiA8L3VsPlxuICogPCEtLSAvVmlld1JlZjogb3V0ZXItMCAtLT5cbiAqIGBgYFxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRW1iZWRkZWRWaWV3UmVmPEM+IGV4dGVuZHMgVmlld1JlZiB7XG4gIGFic3RyYWN0IGdldCBjb250ZXh0KCk6IEM7XG5cbiAgYWJzdHJhY3QgZ2V0IHJvb3ROb2RlcygpOiBhbnlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbFZpZXdSZWYgZXh0ZW5kcyBWaWV3UmVmIHtcbiAgZGV0YWNoRnJvbUFwcFJlZigpOiB2b2lkO1xuICBhdHRhY2hUb0FwcFJlZihhcHBSZWY6IEFwcGxpY2F0aW9uUmVmKTogdm9pZDtcbn1cbiJdfQ==