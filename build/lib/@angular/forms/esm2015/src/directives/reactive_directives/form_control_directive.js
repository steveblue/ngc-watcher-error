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
import { Directive, EventEmitter, Inject, InjectionToken, Input, Optional, Output, Self, forwardRef } from '@angular/core';
import { FormControl } from '../../model';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../../validators';
import { NG_VALUE_ACCESSOR } from '../control_value_accessor';
import { NgControl } from '../ng_control';
import { ReactiveErrors } from '../reactive_errors';
import { _ngModelWarning, composeAsyncValidators, composeValidators, isPropertyUpdated, selectValueAccessor, setUpControl } from '../shared';
/**
 * Token to provide to turn off the ngModel warning on formControl and formControlName.
 */
export const /** @type {?} */ NG_MODEL_WITH_FORM_CONTROL_WARNING = new InjectionToken('NgModelWithFormControlWarning');
export const /** @type {?} */ formControlBinding = {
    provide: NgControl,
    useExisting: forwardRef(() => FormControlDirective)
};
/**
 * \@whatItDoes Syncs a standalone {\@link FormControl} instance to a form control element.
 *
 * In other words, this directive ensures that any values written to the {\@link FormControl}
 * instance programmatically will be written to the DOM element (model -> view). Conversely,
 * any values written to the DOM element through user input will be reflected in the
 * {\@link FormControl} instance (view -> model).
 *
 * \@howToUse
 *
 * Use this directive if you'd like to create and manage a {\@link FormControl} instance directly.
 * Simply create a {\@link FormControl}, save it to your component class, and pass it into the
 * {\@link FormControlDirective}.
 *
 * This directive is designed to be used as a standalone control.  Unlike {\@link FormControlName},
 * it does not require that your {\@link FormControl} instance be part of any parent
 * {\@link FormGroup}, and it won't be registered to any {\@link FormGroupDirective} that
 * exists above it.
 *
 * **Get the value**: the `value` property is always synced and available on the
 * {\@link FormControl} instance. See a full list of available properties in
 * {\@link AbstractControl}.
 *
 * **Set the value**: You can pass in an initial value when instantiating the {\@link FormControl},
 * or you can set it programmatically later using {\@link AbstractControl#setValue setValue} or
 * {\@link AbstractControl#patchValue patchValue}.
 *
 * **Listen to value**: If you want to listen to changes in the value of the control, you can
 * subscribe to the {\@link AbstractControl#valueChanges valueChanges} event.  You can also listen to
 * {\@link AbstractControl#statusChanges statusChanges} to be notified when the validation status is
 * re-calculated.
 *
 * ### Example
 *
 * {\@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}
 *
 * * **npm package**: `\@angular/forms`
 *
 * * **NgModule**: `ReactiveFormsModule`
 *
 * ### Use with ngModel
 *
 * Support for using the `ngModel` input property and `ngModelChange` event with reactive
 * form directives has been deprecated in Angular v6 and will be removed in Angular v7.
 *
 * Now deprecated:
 * ```html
 * <input [formControl]="control" [(ngModel)]="value">
 * ```
 *
 * ```ts
 * this.value = 'some value';
 * ```
 *
 * This has been deprecated for a few reasons. First, developers have found this pattern
 * confusing. It seems like the actual `ngModel` directive is being used, but in fact it's
 * an input/output property named `ngModel` on the reactive form directive that simply
 * approximates (some of) its behavior. Specifically, it allows getting/setting the value
 * and intercepting value events. However, some of `ngModel`'s other features - like
 * delaying updates with`ngModelOptions` or exporting the directive - simply don't work,
 * which has understandably caused some confusion.
 *
 * In addition, this pattern mixes template-driven and reactive forms strategies, which
 * we generally don't recommend because it doesn't take advantage of the full benefits of
 * either strategy. Setting the value in the template violates the template-agnostic
 * principles behind reactive forms, whereas adding a `FormControl`/`FormGroup` layer in
 * the class removes the convenience of defining forms in the template.
 *
 * To update your code before v7, you'll want to decide whether to stick with reactive form
 * directives (and get/set values using reactive forms patterns) or switch over to
 * template-driven directives.
 *
 * After (choice 1 - use reactive forms):
 *
 * ```html
 * <input [formControl]="control">
 * ```
 *
 * ```ts
 * this.control.setValue('some value');
 * ```
 *
 * After (choice 2 - use template-driven forms):
 *
 * ```html
 * <input [(ngModel)]="value">
 * ```
 *
 * ```ts
 * this.value = 'some value';
 * ```
 *
 * By default, when you use this pattern, you will see a deprecation warning once in dev
 * mode. You can choose to silence this warning by providing a config for
 * `ReactiveFormsModule` at import time:
 *
 * ```ts
 * imports: [
 *   ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
 * ]
 * ```
 *
 * Alternatively, you can choose to surface a separate warning for each instance of this
 * pattern with a config value of `"always"`. This may help to track down where in the code
 * the pattern is being used as the code is being updated.
 *
 *  \@stable
 */
export class FormControlDirective extends NgControl {
    /**
     * @param {?} validators
     * @param {?} asyncValidators
     * @param {?} valueAccessors
     * @param {?} _ngModelWarningConfig
     */
    constructor(validators, asyncValidators, valueAccessors, _ngModelWarningConfig) {
        super();
        this._ngModelWarningConfig = _ngModelWarningConfig;
        /**
         * @deprecated as of v6
         */
        this.update = new EventEmitter();
        /**
         * Instance property used to track whether an ngModel warning has been sent out for this
         * particular FormControlDirective instance. Used to support warning config of "always".
         *
         * \@internal
         */
        this._ngModelWarningSent = false;
        this._rawValidators = validators || [];
        this._rawAsyncValidators = asyncValidators || [];
        this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    set isDisabled(isDisabled) { ReactiveErrors.disabledAttrWarning(); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this._isControlChanged(changes)) {
            setUpControl(this.form, this);
            if (this.control.disabled && /** @type {?} */ ((this.valueAccessor)).setDisabledState) {
                /** @type {?} */ ((/** @type {?} */ ((this.valueAccessor)).setDisabledState))(true);
            }
            this.form.updateValueAndValidity({ emitEvent: false });
        }
        if (isPropertyUpdated(changes, this.viewModel)) {
            _ngModelWarning('formControl', FormControlDirective, this, this._ngModelWarningConfig);
            this.form.setValue(this.model);
            this.viewModel = this.model;
        }
    }
    /**
     * @return {?}
     */
    get path() { return []; }
    /**
     * @return {?}
     */
    get validator() { return composeValidators(this._rawValidators); }
    /**
     * @return {?}
     */
    get asyncValidator() {
        return composeAsyncValidators(this._rawAsyncValidators);
    }
    /**
     * @return {?}
     */
    get control() { return this.form; }
    /**
     * @param {?} newValue
     * @return {?}
     */
    viewToModelUpdate(newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _isControlChanged(changes) {
        return changes.hasOwnProperty('form');
    }
}
/**
 * Static property used to track whether any ngModel warnings have been sent across
 * all instances of FormControlDirective. Used to support warning config of "once".
 *
 * \@internal
 */
FormControlDirective._ngModelWarningSentOnce = false;
FormControlDirective.decorators = [
    { type: Directive, args: [{ selector: '[formControl]', providers: [formControlBinding], exportAs: 'ngForm' },] }
];
/** @nocollapse */
FormControlDirective.ctorParameters = () => [
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] },] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALUE_ACCESSOR,] },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NG_MODEL_WITH_FORM_CONTROL_WARNING,] },] },
];
FormControlDirective.propDecorators = {
    "form": [{ type: Input, args: ['formControl',] },],
    "isDisabled": [{ type: Input, args: ['disabled',] },],
    "model": [{ type: Input, args: ['ngModel',] },],
    "update": [{ type: Output, args: ['ngModelChange',] },],
};
function FormControlDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FormControlDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FormControlDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FormControlDirective.propDecorators;
    /**
     * Static property used to track whether any ngModel warnings have been sent across
     * all instances of FormControlDirective. Used to support warning config of "once".
     *
     * \@internal
     * @type {?}
     */
    FormControlDirective._ngModelWarningSentOnce;
    /** @type {?} */
    FormControlDirective.prototype.viewModel;
    /** @type {?} */
    FormControlDirective.prototype.form;
    /**
     * @deprecated as of v6
     * @type {?}
     */
    FormControlDirective.prototype.model;
    /**
     * @deprecated as of v6
     * @type {?}
     */
    FormControlDirective.prototype.update;
    /**
     * Instance property used to track whether an ngModel warning has been sent out for this
     * particular FormControlDirective instance. Used to support warning config of "always".
     *
     * \@internal
     * @type {?}
     */
    FormControlDirective.prototype._ngModelWarningSent;
    /** @type {?} */
    FormControlDirective.prototype._ngModelWarningConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9jb250cm9sX2RpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL3JlYWN0aXZlX2RpcmVjdGl2ZXMvZm9ybV9jb250cm9sX2RpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFhLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFpQixVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFbkosT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEUsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxlQUFlLEVBQUUsc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFDLE1BQU0sV0FBVyxDQUFDOzs7O0FBTzNJLE1BQU0sQ0FBQyx1QkFBTSxrQ0FBa0MsR0FDM0MsSUFBSSxjQUFjLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUV4RCxNQUFNLENBQUMsdUJBQU0sa0JBQWtCLEdBQVE7SUFDckMsT0FBTyxFQUFFLFNBQVM7SUFDbEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztDQUNwRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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TUFBTSxTQUFDLGtDQUFrQzs7O3FCQWpDakUsS0FBSyxTQUFDLGFBQWE7MkJBRW5CLEtBQUssU0FBQyxVQUFVO3NCQU1oQixLQUFLLFNBQUMsU0FBUzt1QkFHZixNQUFNLFNBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5wdXQsIE9uQ2hhbmdlcywgT3B0aW9uYWwsIE91dHB1dCwgU2VsZiwgU2ltcGxlQ2hhbmdlcywgZm9yd2FyZFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJy4uLy4uL21vZGVsJztcbmltcG9ydCB7TkdfQVNZTkNfVkFMSURBVE9SUywgTkdfVkFMSURBVE9SU30gZnJvbSAnLi4vLi4vdmFsaWRhdG9ycyc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnLi4vY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi4vbmdfY29udHJvbCc7XG5pbXBvcnQge1JlYWN0aXZlRXJyb3JzfSBmcm9tICcuLi9yZWFjdGl2ZV9lcnJvcnMnO1xuaW1wb3J0IHtfbmdNb2RlbFdhcm5pbmcsIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnMsIGNvbXBvc2VWYWxpZGF0b3JzLCBpc1Byb3BlcnR5VXBkYXRlZCwgc2VsZWN0VmFsdWVBY2Nlc3Nvciwgc2V0VXBDb250cm9sfSBmcm9tICcuLi9zaGFyZWQnO1xuaW1wb3J0IHtBc3luY1ZhbGlkYXRvciwgQXN5bmNWYWxpZGF0b3JGbiwgVmFsaWRhdG9yLCBWYWxpZGF0b3JGbn0gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5cblxuLyoqXG4gKiBUb2tlbiB0byBwcm92aWRlIHRvIHR1cm4gb2ZmIHRoZSBuZ01vZGVsIHdhcm5pbmcgb24gZm9ybUNvbnRyb2wgYW5kIGZvcm1Db250cm9sTmFtZS5cbiAqL1xuZXhwb3J0IGNvbnN0IE5HX01PREVMX1dJVEhfRk9STV9DT05UUk9MX1dBUk5JTkcgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbignTmdNb2RlbFdpdGhGb3JtQ29udHJvbFdhcm5pbmcnKTtcblxuZXhwb3J0IGNvbnN0IGZvcm1Db250cm9sQmluZGluZzogYW55ID0ge1xuICBwcm92aWRlOiBOZ0NvbnRyb2wsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEZvcm1Db250cm9sRGlyZWN0aXZlKVxufTtcblxuLyoqXG4gKiBAd2hhdEl0RG9lcyBTeW5jcyBhIHN0YW5kYWxvbmUge0BsaW5rIEZvcm1Db250cm9sfSBpbnN0YW5jZSB0byBhIGZvcm0gY29udHJvbCBlbGVtZW50LlxuICpcbiAqIEluIG90aGVyIHdvcmRzLCB0aGlzIGRpcmVjdGl2ZSBlbnN1cmVzIHRoYXQgYW55IHZhbHVlcyB3cml0dGVuIHRvIHRoZSB7QGxpbmsgRm9ybUNvbnRyb2x9XG4gKiBpbnN0YW5jZSBwcm9ncmFtbWF0aWNhbGx5IHdpbGwgYmUgd3JpdHRlbiB0byB0aGUgRE9NIGVsZW1lbnQgKG1vZGVsIC0+IHZpZXcpLiBDb252ZXJzZWx5LFxuICogYW55IHZhbHVlcyB3cml0dGVuIHRvIHRoZSBET00gZWxlbWVudCB0aHJvdWdoIHVzZXIgaW5wdXQgd2lsbCBiZSByZWZsZWN0ZWQgaW4gdGhlXG4gKiB7QGxpbmsgRm9ybUNvbnRyb2x9IGluc3RhbmNlICh2aWV3IC0+IG1vZGVsKS5cbiAqXG4gKiBAaG93VG9Vc2VcbiAqXG4gKiBVc2UgdGhpcyBkaXJlY3RpdmUgaWYgeW91J2QgbGlrZSB0byBjcmVhdGUgYW5kIG1hbmFnZSBhIHtAbGluayBGb3JtQ29udHJvbH0gaW5zdGFuY2UgZGlyZWN0bHkuXG4gKiBTaW1wbHkgY3JlYXRlIGEge0BsaW5rIEZvcm1Db250cm9sfSwgc2F2ZSBpdCB0byB5b3VyIGNvbXBvbmVudCBjbGFzcywgYW5kIHBhc3MgaXQgaW50byB0aGVcbiAqIHtAbGluayBGb3JtQ29udHJvbERpcmVjdGl2ZX0uXG4gKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgZGVzaWduZWQgdG8gYmUgdXNlZCBhcyBhIHN0YW5kYWxvbmUgY29udHJvbC4gIFVubGlrZSB7QGxpbmsgRm9ybUNvbnRyb2xOYW1lfSxcbiAqIGl0IGRvZXMgbm90IHJlcXVpcmUgdGhhdCB5b3VyIHtAbGluayBGb3JtQ29udHJvbH0gaW5zdGFuY2UgYmUgcGFydCBvZiBhbnkgcGFyZW50XG4gKiB7QGxpbmsgRm9ybUdyb3VwfSwgYW5kIGl0IHdvbid0IGJlIHJlZ2lzdGVyZWQgdG8gYW55IHtAbGluayBGb3JtR3JvdXBEaXJlY3RpdmV9IHRoYXRcbiAqIGV4aXN0cyBhYm92ZSBpdC5cbiAqXG4gKiAqKkdldCB0aGUgdmFsdWUqKjogdGhlIGB2YWx1ZWAgcHJvcGVydHkgaXMgYWx3YXlzIHN5bmNlZCBhbmQgYXZhaWxhYmxlIG9uIHRoZVxuICoge0BsaW5rIEZvcm1Db250cm9sfSBpbnN0YW5jZS4gU2VlIGEgZnVsbCBsaXN0IG9mIGF2YWlsYWJsZSBwcm9wZXJ0aWVzIGluXG4gKiB7QGxpbmsgQWJzdHJhY3RDb250cm9sfS5cbiAqXG4gKiAqKlNldCB0aGUgdmFsdWUqKjogWW91IGNhbiBwYXNzIGluIGFuIGluaXRpYWwgdmFsdWUgd2hlbiBpbnN0YW50aWF0aW5nIHRoZSB7QGxpbmsgRm9ybUNvbnRyb2x9LFxuICogb3IgeW91IGNhbiBzZXQgaXQgcHJvZ3JhbW1hdGljYWxseSBsYXRlciB1c2luZyB7QGxpbmsgQWJzdHJhY3RDb250cm9sI3NldFZhbHVlIHNldFZhbHVlfSBvclxuICoge0BsaW5rIEFic3RyYWN0Q29udHJvbCNwYXRjaFZhbHVlIHBhdGNoVmFsdWV9LlxuICpcbiAqICoqTGlzdGVuIHRvIHZhbHVlKio6IElmIHlvdSB3YW50IHRvIGxpc3RlbiB0byBjaGFuZ2VzIGluIHRoZSB2YWx1ZSBvZiB0aGUgY29udHJvbCwgeW91IGNhblxuICogc3Vic2NyaWJlIHRvIHRoZSB7QGxpbmsgQWJzdHJhY3RDb250cm9sI3ZhbHVlQ2hhbmdlcyB2YWx1ZUNoYW5nZXN9IGV2ZW50LiAgWW91IGNhbiBhbHNvIGxpc3RlbiB0b1xuICoge0BsaW5rIEFic3RyYWN0Q29udHJvbCNzdGF0dXNDaGFuZ2VzIHN0YXR1c0NoYW5nZXN9IHRvIGJlIG5vdGlmaWVkIHdoZW4gdGhlIHZhbGlkYXRpb24gc3RhdHVzIGlzXG4gKiByZS1jYWxjdWxhdGVkLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGZvcm1zL3RzL3NpbXBsZUZvcm1Db250cm9sL3NpbXBsZV9mb3JtX2NvbnRyb2xfZXhhbXBsZS50cyByZWdpb249J0NvbXBvbmVudCd9XG4gKlxuICogKiAqKm5wbSBwYWNrYWdlKio6IGBAYW5ndWxhci9mb3Jtc2BcbiAqXG4gKiAqICoqTmdNb2R1bGUqKjogYFJlYWN0aXZlRm9ybXNNb2R1bGVgXG4gKlxuICogIyMjIFVzZSB3aXRoIG5nTW9kZWxcbiAqXG4gKiBTdXBwb3J0IGZvciB1c2luZyB0aGUgYG5nTW9kZWxgIGlucHV0IHByb3BlcnR5IGFuZCBgbmdNb2RlbENoYW5nZWAgZXZlbnQgd2l0aCByZWFjdGl2ZVxuICogZm9ybSBkaXJlY3RpdmVzIGhhcyBiZWVuIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciB2NiBhbmQgd2lsbCBiZSByZW1vdmVkIGluIEFuZ3VsYXIgdjcuXG4gKlxuICogTm93IGRlcHJlY2F0ZWQ6XG4gKiBgYGBodG1sXG4gKiA8aW5wdXQgW2Zvcm1Db250cm9sXT1cImNvbnRyb2xcIiBbKG5nTW9kZWwpXT1cInZhbHVlXCI+XG4gKiBgYGBcbiAqXG4gKiBgYGB0c1xuICogdGhpcy52YWx1ZSA9ICdzb21lIHZhbHVlJztcbiAqIGBgYFxuICpcbiAqIFRoaXMgaGFzIGJlZW4gZGVwcmVjYXRlZCBmb3IgYSBmZXcgcmVhc29ucy4gRmlyc3QsIGRldmVsb3BlcnMgaGF2ZSBmb3VuZCB0aGlzIHBhdHRlcm5cbiAqIGNvbmZ1c2luZy4gSXQgc2VlbXMgbGlrZSB0aGUgYWN0dWFsIGBuZ01vZGVsYCBkaXJlY3RpdmUgaXMgYmVpbmcgdXNlZCwgYnV0IGluIGZhY3QgaXQnc1xuICogYW4gaW5wdXQvb3V0cHV0IHByb3BlcnR5IG5hbWVkIGBuZ01vZGVsYCBvbiB0aGUgcmVhY3RpdmUgZm9ybSBkaXJlY3RpdmUgdGhhdCBzaW1wbHlcbiAqIGFwcHJveGltYXRlcyAoc29tZSBvZikgaXRzIGJlaGF2aW9yLiBTcGVjaWZpY2FsbHksIGl0IGFsbG93cyBnZXR0aW5nL3NldHRpbmcgdGhlIHZhbHVlXG4gKiBhbmQgaW50ZXJjZXB0aW5nIHZhbHVlIGV2ZW50cy4gSG93ZXZlciwgc29tZSBvZiBgbmdNb2RlbGAncyBvdGhlciBmZWF0dXJlcyAtIGxpa2VcbiAqIGRlbGF5aW5nIHVwZGF0ZXMgd2l0aGBuZ01vZGVsT3B0aW9uc2Agb3IgZXhwb3J0aW5nIHRoZSBkaXJlY3RpdmUgLSBzaW1wbHkgZG9uJ3Qgd29yayxcbiAqIHdoaWNoIGhhcyB1bmRlcnN0YW5kYWJseSBjYXVzZWQgc29tZSBjb25mdXNpb24uXG4gKlxuICogSW4gYWRkaXRpb24sIHRoaXMgcGF0dGVybiBtaXhlcyB0ZW1wbGF0ZS1kcml2ZW4gYW5kIHJlYWN0aXZlIGZvcm1zIHN0cmF0ZWdpZXMsIHdoaWNoXG4gKiB3ZSBnZW5lcmFsbHkgZG9uJ3QgcmVjb21tZW5kIGJlY2F1c2UgaXQgZG9lc24ndCB0YWtlIGFkdmFudGFnZSBvZiB0aGUgZnVsbCBiZW5lZml0cyBvZlxuICogZWl0aGVyIHN0cmF0ZWd5LiBTZXR0aW5nIHRoZSB2YWx1ZSBpbiB0aGUgdGVtcGxhdGUgdmlvbGF0ZXMgdGhlIHRlbXBsYXRlLWFnbm9zdGljXG4gKiBwcmluY2lwbGVzIGJlaGluZCByZWFjdGl2ZSBmb3Jtcywgd2hlcmVhcyBhZGRpbmcgYSBgRm9ybUNvbnRyb2xgL2BGb3JtR3JvdXBgIGxheWVyIGluXG4gKiB0aGUgY2xhc3MgcmVtb3ZlcyB0aGUgY29udmVuaWVuY2Ugb2YgZGVmaW5pbmcgZm9ybXMgaW4gdGhlIHRlbXBsYXRlLlxuICpcbiAqIFRvIHVwZGF0ZSB5b3VyIGNvZGUgYmVmb3JlIHY3LCB5b3UnbGwgd2FudCB0byBkZWNpZGUgd2hldGhlciB0byBzdGljayB3aXRoIHJlYWN0aXZlIGZvcm1cbiAqIGRpcmVjdGl2ZXMgKGFuZCBnZXQvc2V0IHZhbHVlcyB1c2luZyByZWFjdGl2ZSBmb3JtcyBwYXR0ZXJucykgb3Igc3dpdGNoIG92ZXIgdG9cbiAqIHRlbXBsYXRlLWRyaXZlbiBkaXJlY3RpdmVzLlxuICpcbiAqIEFmdGVyIChjaG9pY2UgMSAtIHVzZSByZWFjdGl2ZSBmb3Jtcyk6XG4gKlxuICogYGBgaHRtbFxuICogPGlucHV0IFtmb3JtQ29udHJvbF09XCJjb250cm9sXCI+XG4gKiBgYGBcbiAqXG4gKiBgYGB0c1xuICogdGhpcy5jb250cm9sLnNldFZhbHVlKCdzb21lIHZhbHVlJyk7XG4gKiBgYGBcbiAqXG4gKiBBZnRlciAoY2hvaWNlIDIgLSB1c2UgdGVtcGxhdGUtZHJpdmVuIGZvcm1zKTpcbiAqXG4gKiBgYGBodG1sXG4gKiA8aW5wdXQgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiPlxuICogYGBgXG4gKlxuICogYGBgdHNcbiAqIHRoaXMudmFsdWUgPSAnc29tZSB2YWx1ZSc7XG4gKiBgYGBcbiAqXG4gKiBCeSBkZWZhdWx0LCB3aGVuIHlvdSB1c2UgdGhpcyBwYXR0ZXJuLCB5b3Ugd2lsbCBzZWUgYSBkZXByZWNhdGlvbiB3YXJuaW5nIG9uY2UgaW4gZGV2XG4gKiBtb2RlLiBZb3UgY2FuIGNob29zZSB0byBzaWxlbmNlIHRoaXMgd2FybmluZyBieSBwcm92aWRpbmcgYSBjb25maWcgZm9yXG4gKiBgUmVhY3RpdmVGb3Jtc01vZHVsZWAgYXQgaW1wb3J0IHRpbWU6XG4gKlxuICogYGBgdHNcbiAqIGltcG9ydHM6IFtcbiAqICAgUmVhY3RpdmVGb3Jtc01vZHVsZS53aXRoQ29uZmlnKHt3YXJuT25OZ01vZGVsV2l0aEZvcm1Db250cm9sOiAnbmV2ZXInfSk7XG4gKiBdXG4gKiBgYGBcbiAqXG4gKiBBbHRlcm5hdGl2ZWx5LCB5b3UgY2FuIGNob29zZSB0byBzdXJmYWNlIGEgc2VwYXJhdGUgd2FybmluZyBmb3IgZWFjaCBpbnN0YW5jZSBvZiB0aGlzXG4gKiBwYXR0ZXJuIHdpdGggYSBjb25maWcgdmFsdWUgb2YgYFwiYWx3YXlzXCJgLiBUaGlzIG1heSBoZWxwIHRvIHRyYWNrIGRvd24gd2hlcmUgaW4gdGhlIGNvZGVcbiAqIHRoZSBwYXR0ZXJuIGlzIGJlaW5nIHVzZWQgYXMgdGhlIGNvZGUgaXMgYmVpbmcgdXBkYXRlZC5cbiAqXG4gKiAgQHN0YWJsZVxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tmb3JtQ29udHJvbF0nLCBwcm92aWRlcnM6IFtmb3JtQ29udHJvbEJpbmRpbmddLCBleHBvcnRBczogJ25nRm9ybSd9KVxuXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xEaXJlY3RpdmUgZXh0ZW5kcyBOZ0NvbnRyb2wgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICB2aWV3TW9kZWw6IGFueTtcblxuICBASW5wdXQoJ2Zvcm1Db250cm9sJykgZm9ybTogRm9ybUNvbnRyb2w7XG5cbiAgQElucHV0KCdkaXNhYmxlZCcpXG4gIHNldCBpc0Rpc2FibGVkKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHsgUmVhY3RpdmVFcnJvcnMuZGlzYWJsZWRBdHRyV2FybmluZygpOyB9XG5cbiAgLy8gVE9ETyhrYXJhKTogcmVtb3ZlIG5leHQgNCBwcm9wZXJ0aWVzIG9uY2UgZGVwcmVjYXRpb24gcGVyaW9kIGlzIG92ZXJcblxuICAvKiogQGRlcHJlY2F0ZWQgYXMgb2YgdjYgKi9cbiAgQElucHV0KCduZ01vZGVsJykgbW9kZWw6IGFueTtcblxuICAvKiogQGRlcHJlY2F0ZWQgYXMgb2YgdjYgKi9cbiAgQE91dHB1dCgnbmdNb2RlbENoYW5nZScpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogU3RhdGljIHByb3BlcnR5IHVzZWQgdG8gdHJhY2sgd2hldGhlciBhbnkgbmdNb2RlbCB3YXJuaW5ncyBoYXZlIGJlZW4gc2VudCBhY3Jvc3NcbiAgICogYWxsIGluc3RhbmNlcyBvZiBGb3JtQ29udHJvbERpcmVjdGl2ZS4gVXNlZCB0byBzdXBwb3J0IHdhcm5pbmcgY29uZmlnIG9mIFwib25jZVwiLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHN0YXRpYyBfbmdNb2RlbFdhcm5pbmdTZW50T25jZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJbnN0YW5jZSBwcm9wZXJ0eSB1c2VkIHRvIHRyYWNrIHdoZXRoZXIgYW4gbmdNb2RlbCB3YXJuaW5nIGhhcyBiZWVuIHNlbnQgb3V0IGZvciB0aGlzXG4gICAqIHBhcnRpY3VsYXIgRm9ybUNvbnRyb2xEaXJlY3RpdmUgaW5zdGFuY2UuIFVzZWQgdG8gc3VwcG9ydCB3YXJuaW5nIGNvbmZpZyBvZiBcImFsd2F5c1wiLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9uZ01vZGVsV2FybmluZ1NlbnQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfVkFMSURBVE9SUykgdmFsaWRhdG9yczogQXJyYXk8VmFsaWRhdG9yfFZhbGlkYXRvckZuPixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX0FTWU5DX1ZBTElEQVRPUlMpIGFzeW5jVmFsaWRhdG9yczogQXJyYXk8QXN5bmNWYWxpZGF0b3J8QXN5bmNWYWxpZGF0b3JGbj4sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxVRV9BQ0NFU1NPUilcbiAgICAgICAgICAgICAgdmFsdWVBY2Nlc3NvcnM6IENvbnRyb2xWYWx1ZUFjY2Vzc29yW10sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkdfTU9ERUxfV0lUSF9GT1JNX0NPTlRST0xfV0FSTklORykgcHJpdmF0ZSBfbmdNb2RlbFdhcm5pbmdDb25maWc6IHN0cmluZ3xudWxsKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yYXdWYWxpZGF0b3JzID0gdmFsaWRhdG9ycyB8fCBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yYXdBc3luY1ZhbGlkYXRvcnMgPSBhc3luY1ZhbGlkYXRvcnMgfHwgW107XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZUFjY2Vzc29yID0gc2VsZWN0VmFsdWVBY2Nlc3Nvcih0aGlzLCB2YWx1ZUFjY2Vzc29ycyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ29udHJvbENoYW5nZWQoY2hhbmdlcykpIHtcbiAgICAgICAgICAgICAgICAgIHNldFVwQ29udHJvbCh0aGlzLmZvcm0sIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbC5kaXNhYmxlZCAmJiB0aGlzLnZhbHVlQWNjZXNzb3IgIS5zZXREaXNhYmxlZFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVBY2Nlc3NvciAhLnNldERpc2FibGVkU3RhdGUgISh0cnVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtlbWl0RXZlbnQ6IGZhbHNlfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1Byb3BlcnR5VXBkYXRlZChjaGFuZ2VzLCB0aGlzLnZpZXdNb2RlbCkpIHtcbiAgICAgICAgICAgICAgICAgIF9uZ01vZGVsV2FybmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAnZm9ybUNvbnRyb2wnLCBGb3JtQ29udHJvbERpcmVjdGl2ZSwgdGhpcywgdGhpcy5fbmdNb2RlbFdhcm5pbmdDb25maWcpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLnNldFZhbHVlKHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwgPSB0aGlzLm1vZGVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGdldCBwYXRoKCk6IHN0cmluZ1tdIHsgcmV0dXJuIFtdOyB9XG5cbiAgICAgICAgICAgICAgZ2V0IHZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbnxudWxsIHsgcmV0dXJuIGNvbXBvc2VWYWxpZGF0b3JzKHRoaXMuX3Jhd1ZhbGlkYXRvcnMpOyB9XG5cbiAgICAgICAgICAgICAgZ2V0IGFzeW5jVmFsaWRhdG9yKCk6IEFzeW5jVmFsaWRhdG9yRm58bnVsbCB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnModGhpcy5fcmF3QXN5bmNWYWxpZGF0b3JzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGdldCBjb250cm9sKCk6IEZvcm1Db250cm9sIHsgcmV0dXJuIHRoaXMuZm9ybTsgfVxuXG4gICAgICAgICAgICAgIHZpZXdUb01vZGVsVXBkYXRlKG5ld1ZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlLmVtaXQobmV3VmFsdWUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcHJpdmF0ZSBfaXNDb250cm9sQ2hhbmdlZChjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogYW55fSk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdmb3JtJyk7XG4gICAgICAgICAgICAgIH1cbn1cbiJdfQ==