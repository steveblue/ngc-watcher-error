/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents an Embedded Template that can be used to instantiate Embedded Views.
 *
 * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<ng-template>` element
 * (or directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into
 * the constructor of the directive using the `TemplateRef` Token. Alternatively you can query for
 * the `TemplateRef` from a Component or a Directive via {@link Query}.
 *
 * To instantiate Embedded Views based on a Template, use {@link ViewContainerRef#
 * createEmbeddedView}, which will create the View and attach it to the View Container.
 * @stable
 */
var /**
 * Represents an Embedded Template that can be used to instantiate Embedded Views.
 *
 * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<ng-template>` element
 * (or directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into
 * the constructor of the directive using the `TemplateRef` Token. Alternatively you can query for
 * the `TemplateRef` from a Component or a Directive via {@link Query}.
 *
 * To instantiate Embedded Views based on a Template, use {@link ViewContainerRef#
 * createEmbeddedView}, which will create the View and attach it to the View Container.
 * @stable
 */
TemplateRef = /** @class */ (function () {
    function TemplateRef() {
    }
    return TemplateRef;
}());
/**
 * Represents an Embedded Template that can be used to instantiate Embedded Views.
 *
 * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<ng-template>` element
 * (or directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into
 * the constructor of the directive using the `TemplateRef` Token. Alternatively you can query for
 * the `TemplateRef` from a Component or a Directive via {@link Query}.
 *
 * To instantiate Embedded Views based on a Template, use {@link ViewContainerRef#
 * createEmbeddedView}, which will create the View and attach it to the View Container.
 * @stable
 */
export { TemplateRef };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGlua2VyL3RlbXBsYXRlX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBOzs7Ozs7Ozs7Ozs7QUFBQTs7O3NCQXhCQTtJQXdDQyxDQUFBOzs7Ozs7Ozs7Ozs7O0FBaEJELHVCQWdCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFbGVtZW50UmVmfSBmcm9tICcuL2VsZW1lbnRfcmVmJztcbmltcG9ydCB7RW1iZWRkZWRWaWV3UmVmfSBmcm9tICcuL3ZpZXdfcmVmJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gRW1iZWRkZWQgVGVtcGxhdGUgdGhhdCBjYW4gYmUgdXNlZCB0byBpbnN0YW50aWF0ZSBFbWJlZGRlZCBWaWV3cy5cbiAqXG4gKiBZb3UgY2FuIGFjY2VzcyBhIGBUZW1wbGF0ZVJlZmAsIGluIHR3byB3YXlzLiBWaWEgYSBkaXJlY3RpdmUgcGxhY2VkIG9uIGEgYDxuZy10ZW1wbGF0ZT5gIGVsZW1lbnRcbiAqIChvciBkaXJlY3RpdmUgcHJlZml4ZWQgd2l0aCBgKmApIGFuZCBoYXZlIHRoZSBgVGVtcGxhdGVSZWZgIGZvciB0aGlzIEVtYmVkZGVkIFZpZXcgaW5qZWN0ZWQgaW50b1xuICogdGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBkaXJlY3RpdmUgdXNpbmcgdGhlIGBUZW1wbGF0ZVJlZmAgVG9rZW4uIEFsdGVybmF0aXZlbHkgeW91IGNhbiBxdWVyeSBmb3JcbiAqIHRoZSBgVGVtcGxhdGVSZWZgIGZyb20gYSBDb21wb25lbnQgb3IgYSBEaXJlY3RpdmUgdmlhIHtAbGluayBRdWVyeX0uXG4gKlxuICogVG8gaW5zdGFudGlhdGUgRW1iZWRkZWQgVmlld3MgYmFzZWQgb24gYSBUZW1wbGF0ZSwgdXNlIHtAbGluayBWaWV3Q29udGFpbmVyUmVmI1xuICogY3JlYXRlRW1iZWRkZWRWaWV3fSwgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIFZpZXcgYW5kIGF0dGFjaCBpdCB0byB0aGUgVmlldyBDb250YWluZXIuXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUZW1wbGF0ZVJlZjxDPiB7XG4gIC8qKlxuICAgKiBUaGUgbG9jYXRpb24gaW4gdGhlIFZpZXcgd2hlcmUgdGhlIEVtYmVkZGVkIFZpZXcgbG9naWNhbGx5IGJlbG9uZ3MgdG8uXG4gICAqXG4gICAqIFRoZSBkYXRhLWJpbmRpbmcgYW5kIGluamVjdGlvbiBjb250ZXh0cyBvZiBFbWJlZGRlZCBWaWV3cyBjcmVhdGVkIGZyb20gdGhpcyBgVGVtcGxhdGVSZWZgXG4gICAqIGluaGVyaXQgZnJvbSB0aGUgY29udGV4dHMgb2YgdGhpcyBsb2NhdGlvbi5cbiAgICpcbiAgICogVHlwaWNhbGx5IG5ldyBFbWJlZGRlZCBWaWV3cyBhcmUgYXR0YWNoZWQgdG8gdGhlIFZpZXcgQ29udGFpbmVyIG9mIHRoaXMgbG9jYXRpb24sIGJ1dCBpblxuICAgKiBhZHZhbmNlZCB1c2UtY2FzZXMsIHRoZSBWaWV3IGNhbiBiZSBhdHRhY2hlZCB0byBhIGRpZmZlcmVudCBjb250YWluZXIgd2hpbGUga2VlcGluZyB0aGVcbiAgICogZGF0YS1iaW5kaW5nIGFuZCBpbmplY3Rpb24gY29udGV4dCBmcm9tIHRoZSBvcmlnaW5hbCBsb2NhdGlvbi5cbiAgICpcbiAgICovXG4gIC8vIFRPRE8oaSk6IHJlbmFtZSB0byBhbmNob3Igb3IgbG9jYXRpb25cbiAgYWJzdHJhY3QgZ2V0IGVsZW1lbnRSZWYoKTogRWxlbWVudFJlZjtcblxuICBhYnN0cmFjdCBjcmVhdGVFbWJlZGRlZFZpZXcoY29udGV4dDogQyk6IEVtYmVkZGVkVmlld1JlZjxDPjtcbn1cbiJdfQ==