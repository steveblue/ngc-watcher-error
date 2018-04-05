/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "angular/packages/forms/src/form_providers";
import * as i1 from "angular/packages/forms/src/directives/radio_control_value_accessor";
import * as i2 from "angular/packages/forms/src/directives";
import * as i3 from "angular/packages/forms/src/directives/ng_no_validate_directive";
import * as i4 from "angular/packages/forms/src/directives/select_control_value_accessor";
import * as i5 from "angular/packages/forms/src/directives/select_multiple_control_value_accessor";
import * as i6 from "angular/packages/forms/src/directives/default_value_accessor";
import * as i7 from "angular/packages/forms/src/directives/number_value_accessor";
import * as i8 from "angular/packages/forms/src/directives/range_value_accessor";
import * as i9 from "angular/packages/forms/src/directives/checkbox_value_accessor";
import * as i10 from "angular/packages/forms/src/directives/ng_control_status";
import * as i11 from "angular/packages/forms/src/directives/validators";
import * as i12 from "angular/packages/forms/src/directives/ng_model";
import * as i13 from "angular/packages/forms/src/directives/ng_model_group";
import * as i14 from "angular/packages/forms/src/directives/ng_form";
import * as i15 from "angular/packages/forms/src/directives/ng_model.ngsummary";
import * as i16 from "angular/packages/forms/src/directives/ng_model_group.ngsummary";
import * as i17 from "angular/packages/forms/src/directives/ng_form.ngsummary";
import * as i18 from "angular/packages/forms/src/directives.ngsummary";
import * as i19 from "angular/packages/forms/src/form_builder";
import * as i20 from "angular/packages/forms/src/directives/reactive_directives/form_control_directive";
import * as i21 from "angular/packages/forms/src/directives/reactive_directives/form_group_directive";
import * as i22 from "angular/packages/forms/src/directives/reactive_directives/form_control_name";
import * as i23 from "angular/packages/forms/src/directives/reactive_directives/form_group_name";
import * as i24 from "angular/packages/forms/src/directives/reactive_directives/form_control_directive.ngsummary";
import * as i25 from "angular/packages/forms/src/directives/reactive_directives/form_group_directive.ngsummary";
import * as i26 from "angular/packages/forms/src/directives/reactive_directives/form_control_name.ngsummary";
import * as i27 from "angular/packages/forms/src/directives/reactive_directives/form_group_name.ngsummary";
export function FormsModuleNgSummary() { return [{ summaryKind: 2, type: { reference: i0.FormsModule, diDeps: [], lifecycleHooks: [] }, entryComponents: [], providers: [{ provider: { token: { identifier: { reference: i1.RadioControlRegistry, diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i1.RadioControlRegistry, diDeps: [], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.FormsModule, diDeps: [], lifecycleHooks: [] } }], modules: [{ reference: i2.InternalFormsSharedModule, diDeps: [], lifecycleHooks: [] }, { reference: i0.FormsModule, diDeps: [], lifecycleHooks: [] }], exportedDirectives: [{ reference: i3.NgNoValidate }, { reference: i4.NgSelectOption }, { reference: i5.NgSelectMultipleOption }, { reference: i6.DefaultValueAccessor }, { reference: i7.NumberValueAccessor }, { reference: i8.RangeValueAccessor }, { reference: i9.CheckboxControlValueAccessor }, { reference: i4.SelectControlValueAccessor }, { reference: i5.SelectMultipleControlValueAccessor }, { reference: i1.RadioControlValueAccessor }, { reference: i10.NgControlStatus }, { reference: i10.NgControlStatusGroup }, { reference: i11.RequiredValidator }, { reference: i11.MinLengthValidator }, { reference: i11.MaxLengthValidator }, { reference: i11.PatternValidator }, { reference: i11.CheckboxRequiredValidator }, { reference: i11.EmailValidator }, { reference: i12.NgModel }, { reference: i13.NgModelGroup }, { reference: i14.NgForm }], exportedPipes: [] }, i15.NgModelNgSummary, i16.NgModelGroupNgSummary, i17.NgFormNgSummary, i18.InternalFormsSharedModuleNgSummary, { summaryKind: 3, type: { reference: i1.RadioControlRegistry, diDeps: [], lifecycleHooks: [] } }]; }
export function ReactiveFormsModuleNgSummary() { return [{ summaryKind: 2, type: { reference: i0.ReactiveFormsModule, diDeps: [], lifecycleHooks: [] }, entryComponents: [], providers: [{ provider: { token: { identifier: { reference: i19.FormBuilder, diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i19.FormBuilder, diDeps: [], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.ReactiveFormsModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.RadioControlRegistry, diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i1.RadioControlRegistry, diDeps: [], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.ReactiveFormsModule, diDeps: [], lifecycleHooks: [] } }], modules: [{ reference: i2.InternalFormsSharedModule, diDeps: [], lifecycleHooks: [] }, { reference: i0.ReactiveFormsModule, diDeps: [], lifecycleHooks: [] }], exportedDirectives: [{ reference: i3.NgNoValidate }, { reference: i4.NgSelectOption }, { reference: i5.NgSelectMultipleOption }, { reference: i6.DefaultValueAccessor }, { reference: i7.NumberValueAccessor }, { reference: i8.RangeValueAccessor }, { reference: i9.CheckboxControlValueAccessor }, { reference: i4.SelectControlValueAccessor }, { reference: i5.SelectMultipleControlValueAccessor }, { reference: i1.RadioControlValueAccessor }, { reference: i10.NgControlStatus }, { reference: i10.NgControlStatusGroup }, { reference: i11.RequiredValidator }, { reference: i11.MinLengthValidator }, { reference: i11.MaxLengthValidator }, { reference: i11.PatternValidator }, { reference: i11.CheckboxRequiredValidator }, { reference: i11.EmailValidator }, { reference: i20.FormControlDirective }, { reference: i21.FormGroupDirective }, { reference: i22.FormControlName }, { reference: i23.FormGroupName }, { reference: i23.FormArrayName }], exportedPipes: [] }, i24.FormControlDirectiveNgSummary, i25.FormGroupDirectiveNgSummary, i26.FormControlNameNgSummary, i27.FormGroupNameNgSummary, i27.FormArrayNameNgSummary, i18.InternalFormsSharedModuleNgSummary, { summaryKind: 3, type: { reference: i19.FormBuilder, diDeps: [], lifecycleHooks: [] } }, { summaryKind: 3, type: { reference: i1.RadioControlRegistry, diDeps: [], lifecycleHooks: [] } }]; }

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9wcm92aWRlcnMubmdzdW1tYXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZm9ybXMvc3JjL2Zvcm1fcHJvdmlkZXJzLm5nc3VtbWFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgaTAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pMC5Db21wb25lbnRGYWN0b3J5O1xuZXhwb3J0IGZ1bmN0aW9uIEZvcm1zTW9kdWxlTmdTdW1tYXJ5KCk6YW55W10ge1xuICByZXR1cm4gKG51bGwgYXMgYW55KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBSZWFjdGl2ZUZvcm1zTW9kdWxlTmdTdW1tYXJ5KCk6YW55W10ge1xuICByZXR1cm4gKG51bGwgYXMgYW55KTtcbn1cbiJdfQ==