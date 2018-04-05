/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
export { HttpClientXsrfModuleNgSummary as HttpClientXsrfModule_4NgSummary, HttpClientModuleNgSummary as HttpClientModule_10NgSummary } from "angular/packages/common/http/src/module.ngsummary";
import * as i0 from "angular/packages/common/http/testing/src/module";
import * as i1 from "@angular/common/http/src/xsrf";
import * as i2 from "@angular/common/http/src/module";
import * as i3 from "@angular/common/http/src/interceptor";
import * as i4 from "angular/packages/common/http/src/xsrf.ngfactory";
import * as i5 from "@angular/common/http/src/client";
import * as i6 from "@angular/common/http/src/backend";
import * as i7 from "angular/packages/common/http/src/module.ngfactory";
import * as i8 from "@angular/common/http/src/xhr";
import * as i9 from "angular/packages/common/http/testing/src/backend";
import * as i10 from "angular/packages/common/http/testing/src/api";
import * as i11 from "angular/packages/common/http/src/module.ngsummary";
export function HttpClientTestingModuleNgSummary() { return [{ summaryKind: 2, type: { reference: i0.HttpClientTestingModule, diDeps: [], lifecycleHooks: [] }, entryComponents: [], providers: [{ provider: { token: { identifier: { reference: i1.HttpXsrfInterceptor, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.HttpXsrfTokenExtractor } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.XSRF_HEADER_NAME } } }], lifecycleHooks: [] } }, useClass: { reference: i1.HttpXsrfInterceptor, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.HttpXsrfTokenExtractor } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.XSRF_HEADER_NAME } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.HttpXsrfTokenExtractor } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.XSRF_HEADER_NAME } } }], multi: false }, module: { reference: i2.HttpClientXsrfModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i3.HTTP_INTERCEPTORS } }, useClass: null, useFactory: null, useExisting: { identifier: { reference: i1.HttpXsrfInterceptor } }, multi: true }, module: { reference: i2.HttpClientXsrfModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.HttpXsrfTokenExtractor } }, useClass: { reference: i1.HttpXsrfCookieExtractor, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i4.DOCUMENT_7 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i4.PLATFORM_ID_8 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.XSRF_COOKIE_NAME } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i4.DOCUMENT_7 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i4.PLATFORM_ID_8 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.XSRF_COOKIE_NAME } } }], multi: false }, module: { reference: i2.HttpClientXsrfModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.XSRF_COOKIE_NAME } }, useClass: null, useValue: "XSRF-TOKEN", useFactory: null, multi: false }, module: { reference: i2.HttpClientXsrfModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.XSRF_HEADER_NAME } }, useClass: null, useValue: "X-XSRF-TOKEN", useFactory: null, multi: false }, module: { reference: i2.HttpClientXsrfModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.XSRF_COOKIE_NAME } }, useClass: null, useValue: "XSRF-TOKEN", useFactory: null, multi: false }, module: { reference: i2.HttpClientModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.XSRF_HEADER_NAME } }, useClass: null, useValue: "X-XSRF-TOKEN", useFactory: null, multi: false }, module: { reference: i2.HttpClientModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i5.HttpClient, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.HttpHandler } } }], lifecycleHooks: [] } }, useClass: { reference: i5.HttpClient, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.HttpHandler } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.HttpHandler } } }], multi: false }, module: { reference: i2.HttpClientModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i6.HttpHandler } }, useClass: { reference: i2.HttpInterceptingHandler, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.HttpBackend } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i7.Injector_2 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.HttpBackend } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i7.Injector_2 } } }], multi: false }, module: { reference: i2.HttpClientModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i8.HttpXhrBackend, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.XhrFactory } } }], lifecycleHooks: [] } }, useClass: { reference: i8.HttpXhrBackend, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.XhrFactory } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.XhrFactory } } }], multi: false }, module: { reference: i2.HttpClientModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i6.HttpBackend } }, useClass: null, useFactory: null, useExisting: { identifier: { reference: i8.HttpXhrBackend } }, multi: false }, module: { reference: i2.HttpClientModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i8.BrowserXhr, diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i8.BrowserXhr, diDeps: [], lifecycleHooks: [] }, useFactory: null, deps: [], multi: false }, module: { reference: i2.HttpClientModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i8.XhrFactory } }, useClass: null, useFactory: null, useExisting: { identifier: { reference: i8.BrowserXhr } }, multi: false }, module: { reference: i2.HttpClientModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i9.HttpClientTestingBackend, diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i9.HttpClientTestingBackend, diDeps: [], lifecycleHooks: [] }, useValue: undefined, useFactory: null, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.HttpClientTestingModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i6.HttpBackend } }, useClass: null, useValue: undefined, useFactory: null, useExisting: { identifier: { reference: i9.HttpClientTestingBackend } }, deps: undefined, multi: false }, module: { reference: i0.HttpClientTestingModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i10.HttpTestingController } }, useClass: null, useValue: undefined, useFactory: null, useExisting: { identifier: { reference: i9.HttpClientTestingBackend } }, deps: undefined, multi: false }, module: { reference: i0.HttpClientTestingModule, diDeps: [], lifecycleHooks: [] } }], modules: [{ reference: i2.HttpClientXsrfModule, diDeps: [], lifecycleHooks: [] }, { reference: i2.HttpClientModule, diDeps: [], lifecycleHooks: [] }, { reference: i0.HttpClientTestingModule, diDeps: [], lifecycleHooks: [] }], exportedDirectives: [], exportedPipes: [] }, i11.HttpClientXsrfModuleNgSummary, i11.HttpClientModuleNgSummary, { summaryKind: 3, type: { reference: i9.HttpClientTestingBackend, diDeps: [], lifecycleHooks: [] } }]; }

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLm5nc3VtbWFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3Rlc3Rpbmcvc3JjL21vZHVsZS5uZ3N1bW1hcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGkwIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaTAuQ29tcG9uZW50RmFjdG9yeTtcbmV4cG9ydCBmdW5jdGlvbiBIdHRwQ2xpZW50VGVzdGluZ01vZHVsZU5nU3VtbWFyeSgpOmFueVtdIHtcbiAgcmV0dXJuIChudWxsIGFzIGFueSk7XG59XG4iXX0=