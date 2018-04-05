/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "angular/packages/http/src/http_module";
import * as i1 from "angular/packages/http/src/http";
import * as i2 from "angular/packages/http/src/backends/xhr_backend";
import * as i3 from "angular/packages/http/src/base_request_options";
import * as i4 from "angular/packages/http/src/backends/browser_xhr";
import * as i5 from "angular/packages/http/src/base_response_options";
import * as i6 from "angular/packages/http/src/interfaces";
import * as i7 from "angular/packages/http/src/backends/jsonp_backend";
import * as i8 from "angular/packages/http/src/backends/browser_jsonp";
export function HttpModuleNgSummary() { return [{ summaryKind: 2, type: { reference: i0.HttpModule, diDeps: [], lifecycleHooks: [] }, entryComponents: [], providers: [{ provider: { token: { identifier: { reference: i1.Http } }, useClass: null, useValue: undefined, useFactory: { reference: i0.httpFactory, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i2.XHRBackend } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i3.RequestOptions } } }] }, useExisting: undefined, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i2.XHRBackend } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i3.RequestOptions } } }], multi: false }, module: { reference: i0.HttpModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i4.BrowserXhr, diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i4.BrowserXhr, diDeps: [], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.HttpModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i3.RequestOptions } }, useClass: { reference: i3.BaseRequestOptions, diDeps: [], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.HttpModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i5.ResponseOptions } }, useClass: { reference: i5.BaseResponseOptions, diDeps: [], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.HttpModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i2.XHRBackend, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i4.BrowserXhr } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i5.ResponseOptions } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.XSRFStrategy } } }], lifecycleHooks: [] } }, useClass: { reference: i2.XHRBackend, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i4.BrowserXhr } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i5.ResponseOptions } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.XSRFStrategy } } }], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i4.BrowserXhr } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i5.ResponseOptions } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.XSRFStrategy } } }], multi: false }, module: { reference: i0.HttpModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i6.XSRFStrategy } }, useClass: null, useValue: undefined, useFactory: { reference: i0._createDefaultCookieXSRFStrategy, diDeps: [] }, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.HttpModule, diDeps: [], lifecycleHooks: [] } }], modules: [{ reference: i0.HttpModule, diDeps: [], lifecycleHooks: [] }], exportedDirectives: [], exportedPipes: [] }, { summaryKind: 3, type: { reference: i4.BrowserXhr, diDeps: [], lifecycleHooks: [] } }, { summaryKind: 3, type: { reference: i3.BaseRequestOptions, diDeps: [], lifecycleHooks: [] } }, { summaryKind: 3, type: { reference: i5.BaseResponseOptions, diDeps: [], lifecycleHooks: [] } }, { summaryKind: 3, type: { reference: i2.XHRBackend, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i4.BrowserXhr } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i5.ResponseOptions } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.XSRFStrategy } } }], lifecycleHooks: [] } }]; }
export function JsonpModuleNgSummary() { return [{ summaryKind: 2, type: { reference: i0.JsonpModule, diDeps: [], lifecycleHooks: [] }, entryComponents: [], providers: [{ provider: { token: { identifier: { reference: i1.Jsonp } }, useClass: null, useValue: undefined, useFactory: { reference: i0.jsonpFactory, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i7.JSONPBackend } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i3.RequestOptions } } }] }, useExisting: undefined, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i7.JSONPBackend } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i3.RequestOptions } } }], multi: false }, module: { reference: i0.JsonpModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i8.BrowserJsonp, diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i8.BrowserJsonp, diDeps: [], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.JsonpModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i3.RequestOptions } }, useClass: { reference: i3.BaseRequestOptions, diDeps: [], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.JsonpModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i5.ResponseOptions } }, useClass: { reference: i5.BaseResponseOptions, diDeps: [], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.JsonpModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i7.JSONPBackend, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.BrowserJsonp } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i5.ResponseOptions } } }], lifecycleHooks: [] } }, useClass: { reference: i7.JSONPBackend, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.BrowserJsonp } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i5.ResponseOptions } } }], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.BrowserJsonp } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i5.ResponseOptions } } }], multi: false }, module: { reference: i0.JsonpModule, diDeps: [], lifecycleHooks: [] } }], modules: [{ reference: i0.JsonpModule, diDeps: [], lifecycleHooks: [] }], exportedDirectives: [], exportedPipes: [] }, { summaryKind: 3, type: { reference: i8.BrowserJsonp, diDeps: [], lifecycleHooks: [] } }, { summaryKind: 3, type: { reference: i3.BaseRequestOptions, diDeps: [], lifecycleHooks: [] } }, { summaryKind: 3, type: { reference: i5.BaseResponseOptions, diDeps: [], lifecycleHooks: [] } }, { summaryKind: 3, type: { reference: i7.JSONPBackend, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.BrowserJsonp } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i5.ResponseOptions } } }], lifecycleHooks: [] } }]; }

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9tb2R1bGUubmdzdW1tYXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvaHR0cC9zcmMvaHR0cF9tb2R1bGUubmdzdW1tYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBpMCBmcm9tICdAYW5ndWxhci9jb3JlJztcbmkwLkNvbXBvbmVudEZhY3Rvcnk7XG5leHBvcnQgZnVuY3Rpb24gSHR0cE1vZHVsZU5nU3VtbWFyeSgpOmFueVtdIHtcbiAgcmV0dXJuIChudWxsIGFzIGFueSk7XG59XG5leHBvcnQgZnVuY3Rpb24gSnNvbnBNb2R1bGVOZ1N1bW1hcnkoKTphbnlbXSB7XG4gIHJldHVybiAobnVsbCBhcyBhbnkpO1xufVxuIl19