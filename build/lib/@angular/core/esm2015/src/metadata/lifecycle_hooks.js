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
 * A `changes` object whose keys are property names and
 * values are instances of {\@link SimpleChange}. See {\@link OnChanges}
 * \@stable
 * @record
 */
export function SimpleChanges() { }
function SimpleChanges_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [propName: string]: SimpleChange;
    */
}
/**
 * \@whatItDoes Lifecycle hook that is called when any data-bound property of a directive changes.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
 *
 * \@description
 * `ngOnChanges` is called right after the data-bound properties have been checked and before view
 * and content children are checked if at least one of them has changed.
 * The `changes` parameter contains the changed properties.
 *
 * See {\@linkDocs guide/lifecycle-hooks#onchanges "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @record
 */
export function OnChanges() { }
function OnChanges_tsickle_Closure_declarations() {
    /** @type {?} */
    OnChanges.prototype.ngOnChanges;
}
/**
 * \@whatItDoes Lifecycle hook that is called after data-bound properties of a directive are
 * initialized.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
 *
 * \@description
 * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
 * first time, and before any of its children have been checked. It is invoked only once when the
 * directive is instantiated.
 *
 * See {\@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @record
 */
export function OnInit() { }
function OnInit_tsickle_Closure_declarations() {
    /** @type {?} */
    OnInit.prototype.ngOnInit;
}
/**
 * \@whatItDoes Lifecycle hook that is called when Angular dirty checks a directive.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
 *
 * \@description
 * `ngDoCheck` gets called to check the changes in the directives in addition to the default
 * algorithm. The default change detection algorithm looks for differences by comparing
 * bound-property values by reference across change detection runs.
 *
 * Note that a directive typically should not use both `DoCheck` and {\@link OnChanges} to respond to
 * changes on the same input, as `ngOnChanges` will continue to be called when the default change
 * detector detects changes.
 *
 * See {\@link KeyValueDiffers} and {\@link IterableDiffers} for implementing custom dirty checking
 * for collections.
 *
 * See {\@linkDocs guide/lifecycle-hooks#docheck "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @record
 */
export function DoCheck() { }
function DoCheck_tsickle_Closure_declarations() {
    /** @type {?} */
    DoCheck.prototype.ngDoCheck;
}
/**
 * \@whatItDoes Lifecycle hook that is called when a directive, pipe or service is destroyed.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
 *
 * \@description
 * `ngOnDestroy` callback is typically used for any custom cleanup that needs to occur when the
 * instance is destroyed.
 *
 * See {\@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @record
 */
export function OnDestroy() { }
function OnDestroy_tsickle_Closure_declarations() {
    /** @type {?} */
    OnDestroy.prototype.ngOnDestroy;
}
/**
 *
 * \@whatItDoes Lifecycle hook that is called after a directive's content has been fully
 * initialized.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @record
 */
export function AfterContentInit() { }
function AfterContentInit_tsickle_Closure_declarations() {
    /** @type {?} */
    AfterContentInit.prototype.ngAfterContentInit;
}
/**
 * \@whatItDoes Lifecycle hook that is called after every check of a directive's content.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @record
 */
export function AfterContentChecked() { }
function AfterContentChecked_tsickle_Closure_declarations() {
    /** @type {?} */
    AfterContentChecked.prototype.ngAfterContentChecked;
}
/**
 * \@whatItDoes Lifecycle hook that is called after a component's view has been fully
 * initialized.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @record
 */
export function AfterViewInit() { }
function AfterViewInit_tsickle_Closure_declarations() {
    /** @type {?} */
    AfterViewInit.prototype.ngAfterViewInit;
}
/**
 * \@whatItDoes Lifecycle hook that is called after every check of a component's view.
 * \@howToUse
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
 *
 * \@description
 * See {\@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
 *
 * \@stable
 * @record
 */
export function AfterViewChecked() { }
function AfterViewChecked_tsickle_Closure_declarations() {
    /** @type {?} */
    AfterViewChecked.prototype.ngAfterViewChecked;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlmZWN5Y2xlX2hvb2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbWV0YWRhdGEvbGlmZWN5Y2xlX2hvb2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U2ltcGxlQ2hhbmdlfSBmcm9tICcuLi9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb25fdXRpbCc7XG5cblxuLyoqXG4gKiBBIGBjaGFuZ2VzYCBvYmplY3Qgd2hvc2Uga2V5cyBhcmUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiB2YWx1ZXMgYXJlIGluc3RhbmNlcyBvZiB7QGxpbmsgU2ltcGxlQ2hhbmdlfS4gU2VlIHtAbGluayBPbkNoYW5nZXN9XG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2ltcGxlQ2hhbmdlcyB7IFtwcm9wTmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlOyB9XG5cbi8qKlxuICogQHdoYXRJdERvZXMgTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzLlxuICogQGhvd1RvVXNlXG4gKiB7QGV4YW1wbGUgY29yZS90cy9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3Nfc3BlYy50cyByZWdpb249J09uQ2hhbmdlcyd9XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBgbmdPbkNoYW5nZXNgIGlzIGNhbGxlZCByaWdodCBhZnRlciB0aGUgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIGhhdmUgYmVlbiBjaGVja2VkIGFuZCBiZWZvcmUgdmlld1xuICogYW5kIGNvbnRlbnQgY2hpbGRyZW4gYXJlIGNoZWNrZWQgaWYgYXQgbGVhc3Qgb25lIG9mIHRoZW0gaGFzIGNoYW5nZWQuXG4gKiBUaGUgYGNoYW5nZXNgIHBhcmFtZXRlciBjb250YWlucyB0aGUgY2hhbmdlZCBwcm9wZXJ0aWVzLlxuICpcbiAqIFNlZSB7QGxpbmtEb2NzIGd1aWRlL2xpZmVjeWNsZS1ob29rcyNvbmNoYW5nZXMgXCJMaWZlY3ljbGUgSG9va3MgR3VpZGVcIn0uXG4gKlxuICogQHN0YWJsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE9uQ2hhbmdlcyB7IG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkOyB9XG5cbi8qKlxuICogQHdoYXRJdERvZXMgTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIG9mIGEgZGlyZWN0aXZlIGFyZVxuICogaW5pdGlhbGl6ZWQuXG4gKiBAaG93VG9Vc2VcbiAqIHtAZXhhbXBsZSBjb3JlL3RzL21ldGFkYXRhL2xpZmVjeWNsZV9ob29rc19zcGVjLnRzIHJlZ2lvbj0nT25Jbml0J31cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIGBuZ09uSW5pdGAgaXMgY2FsbGVkIHJpZ2h0IGFmdGVyIHRoZSBkaXJlY3RpdmUncyBkYXRhLWJvdW5kIHByb3BlcnRpZXMgaGF2ZSBiZWVuIGNoZWNrZWQgZm9yIHRoZVxuICogZmlyc3QgdGltZSwgYW5kIGJlZm9yZSBhbnkgb2YgaXRzIGNoaWxkcmVuIGhhdmUgYmVlbiBjaGVja2VkLiBJdCBpcyBpbnZva2VkIG9ubHkgb25jZSB3aGVuIHRoZVxuICogZGlyZWN0aXZlIGlzIGluc3RhbnRpYXRlZC5cbiAqXG4gKiBTZWUge0BsaW5rRG9jcyBndWlkZS9saWZlY3ljbGUtaG9va3MgXCJMaWZlY3ljbGUgSG9va3MgR3VpZGVcIn0uXG4gKlxuICogQHN0YWJsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE9uSW5pdCB7IG5nT25Jbml0KCk6IHZvaWQ7IH1cblxuLyoqXG4gKiBAd2hhdEl0RG9lcyBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIEFuZ3VsYXIgZGlydHkgY2hlY2tzIGEgZGlyZWN0aXZlLlxuICogQGhvd1RvVXNlXG4gKiB7QGV4YW1wbGUgY29yZS90cy9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3Nfc3BlYy50cyByZWdpb249J0RvQ2hlY2snfVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogYG5nRG9DaGVja2AgZ2V0cyBjYWxsZWQgdG8gY2hlY2sgdGhlIGNoYW5nZXMgaW4gdGhlIGRpcmVjdGl2ZXMgaW4gYWRkaXRpb24gdG8gdGhlIGRlZmF1bHRcbiAqIGFsZ29yaXRobS4gVGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdGlvbiBhbGdvcml0aG0gbG9va3MgZm9yIGRpZmZlcmVuY2VzIGJ5IGNvbXBhcmluZ1xuICogYm91bmQtcHJvcGVydHkgdmFsdWVzIGJ5IHJlZmVyZW5jZSBhY3Jvc3MgY2hhbmdlIGRldGVjdGlvbiBydW5zLlxuICpcbiAqIE5vdGUgdGhhdCBhIGRpcmVjdGl2ZSB0eXBpY2FsbHkgc2hvdWxkIG5vdCB1c2UgYm90aCBgRG9DaGVja2AgYW5kIHtAbGluayBPbkNoYW5nZXN9IHRvIHJlc3BvbmQgdG9cbiAqIGNoYW5nZXMgb24gdGhlIHNhbWUgaW5wdXQsIGFzIGBuZ09uQ2hhbmdlc2Agd2lsbCBjb250aW51ZSB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZGVmYXVsdCBjaGFuZ2VcbiAqIGRldGVjdG9yIGRldGVjdHMgY2hhbmdlcy5cbiAqXG4gKiBTZWUge0BsaW5rIEtleVZhbHVlRGlmZmVyc30gYW5kIHtAbGluayBJdGVyYWJsZURpZmZlcnN9IGZvciBpbXBsZW1lbnRpbmcgY3VzdG9tIGRpcnR5IGNoZWNraW5nXG4gKiBmb3IgY29sbGVjdGlvbnMuXG4gKlxuICogU2VlIHtAbGlua0RvY3MgZ3VpZGUvbGlmZWN5Y2xlLWhvb2tzI2RvY2hlY2sgXCJMaWZlY3ljbGUgSG9va3MgR3VpZGVcIn0uXG4gKlxuICogQHN0YWJsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIERvQ2hlY2sgeyBuZ0RvQ2hlY2soKTogdm9pZDsgfVxuXG4vKipcbiAqIEB3aGF0SXREb2VzIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gYSBkaXJlY3RpdmUsIHBpcGUgb3Igc2VydmljZSBpcyBkZXN0cm95ZWQuXG4gKiBAaG93VG9Vc2VcbiAqIHtAZXhhbXBsZSBjb3JlL3RzL21ldGFkYXRhL2xpZmVjeWNsZV9ob29rc19zcGVjLnRzIHJlZ2lvbj0nT25EZXN0cm95J31cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIGBuZ09uRGVzdHJveWAgY2FsbGJhY2sgaXMgdHlwaWNhbGx5IHVzZWQgZm9yIGFueSBjdXN0b20gY2xlYW51cCB0aGF0IG5lZWRzIHRvIG9jY3VyIHdoZW4gdGhlXG4gKiBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXG4gKlxuICogU2VlIHtAbGlua0RvY3MgZ3VpZGUvbGlmZWN5Y2xlLWhvb2tzIFwiTGlmZWN5Y2xlIEhvb2tzIEd1aWRlXCJ9LlxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPbkRlc3Ryb3kgeyBuZ09uRGVzdHJveSgpOiB2b2lkOyB9XG5cbi8qKlxuICpcbiAqIEB3aGF0SXREb2VzIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGEgZGlyZWN0aXZlJ3MgY29udGVudCBoYXMgYmVlbiBmdWxseVxuICogaW5pdGlhbGl6ZWQuXG4gKiBAaG93VG9Vc2VcbiAqIHtAZXhhbXBsZSBjb3JlL3RzL21ldGFkYXRhL2xpZmVjeWNsZV9ob29rc19zcGVjLnRzIHJlZ2lvbj0nQWZ0ZXJDb250ZW50SW5pdCd9XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZWUge0BsaW5rRG9jcyBndWlkZS9saWZlY3ljbGUtaG9va3MjYWZ0ZXJjb250ZW50IFwiTGlmZWN5Y2xlIEhvb2tzIEd1aWRlXCJ9LlxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBZnRlckNvbnRlbnRJbml0IHsgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQ7IH1cblxuLyoqXG4gKiBAd2hhdEl0RG9lcyBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBldmVyeSBjaGVjayBvZiBhIGRpcmVjdGl2ZSdzIGNvbnRlbnQuXG4gKiBAaG93VG9Vc2VcbiAqIHtAZXhhbXBsZSBjb3JlL3RzL21ldGFkYXRhL2xpZmVjeWNsZV9ob29rc19zcGVjLnRzIHJlZ2lvbj0nQWZ0ZXJDb250ZW50Q2hlY2tlZCd9XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZWUge0BsaW5rRG9jcyBndWlkZS9saWZlY3ljbGUtaG9va3MjYWZ0ZXJjb250ZW50IFwiTGlmZWN5Y2xlIEhvb2tzIEd1aWRlXCJ9LlxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBZnRlckNvbnRlbnRDaGVja2VkIHsgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQ7IH1cblxuLyoqXG4gKiBAd2hhdEl0RG9lcyBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBhIGNvbXBvbmVudCdzIHZpZXcgaGFzIGJlZW4gZnVsbHlcbiAqIGluaXRpYWxpemVkLlxuICogQGhvd1RvVXNlXG4gKiB7QGV4YW1wbGUgY29yZS90cy9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3Nfc3BlYy50cyByZWdpb249J0FmdGVyVmlld0luaXQnfVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2VlIHtAbGlua0RvY3MgZ3VpZGUvbGlmZWN5Y2xlLWhvb2tzI2FmdGVydmlldyBcIkxpZmVjeWNsZSBIb29rcyBHdWlkZVwifS5cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWZ0ZXJWaWV3SW5pdCB7IG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkOyB9XG5cbi8qKlxuICogQHdoYXRJdERvZXMgTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZXZlcnkgY2hlY2sgb2YgYSBjb21wb25lbnQncyB2aWV3LlxuICogQGhvd1RvVXNlXG4gKiB7QGV4YW1wbGUgY29yZS90cy9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3Nfc3BlYy50cyByZWdpb249J0FmdGVyVmlld0NoZWNrZWQnfVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogU2VlIHtAbGlua0RvY3MgZ3VpZGUvbGlmZWN5Y2xlLWhvb2tzI2FmdGVydmlldyBcIkxpZmVjeWNsZSBIb29rcyBHdWlkZVwifS5cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWZ0ZXJWaWV3Q2hlY2tlZCB7IG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkOyB9XG4iXX0=