/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
export { CommonModule_36NgSummary as CommonModule_18NgSummary, ApplicationModule_41NgSummary as ApplicationModule_24NgSummary, BrowserModuleNgSummary as BrowserModule_36NgSummary } from "angular/packages/platform-browser/src/browser.ngsummary";
import * as i0 from "angular/packages/platform-browser/testing/src/browser";
import * as i1 from "angular/packages/platform-browser/src/browser.ngfactory";
import * as i2 from "angular/packages/platform-browser/src/dom/debug/ng_probe.ngfactory";
import * as i3 from "@angular/platform-browser/src/security/dom_sanitization_service";
import * as i4 from "@angular/platform-browser/src/browser";
import * as i5 from "angular/packages/platform-browser/src/security/dom_sanitization_service.ngfactory";
import * as i6 from "@angular/platform-browser/src/dom/events/event_manager";
import * as i7 from "@angular/platform-browser/src/dom/events/dom_events";
import * as i8 from "angular/packages/platform-browser/src/dom/events/dom_events.ngfactory";
import * as i9 from "@angular/platform-browser/src/dom/events/key_events";
import * as i10 from "angular/packages/platform-browser/src/dom/events/key_events.ngfactory";
import * as i11 from "@angular/platform-browser/src/dom/events/hammer_gestures";
import * as i12 from "angular/packages/platform-browser/src/dom/events/hammer_gestures.ngfactory";
import * as i13 from "@angular/platform-browser/src/dom/dom_renderer";
import * as i14 from "@angular/platform-browser/src/dom/shared_styles_host";
import * as i15 from "angular/packages/platform-browser/src/dom/shared_styles_host.ngfactory";
import * as i16 from "@angular/platform-browser/src/dom/debug/ng_probe";
import * as i17 from "@angular/platform-browser/src/browser/meta";
import * as i18 from "angular/packages/platform-browser/src/browser/meta.ngfactory";
import * as i19 from "@angular/platform-browser/src/browser/title";
import * as i20 from "angular/packages/platform-browser/src/browser/title.ngfactory";
import * as i21 from "angular/packages/platform-browser/src/browser.ngsummary";
export function BrowserTestingModuleNgSummary() { return [{ summaryKind: 2, type: { reference: i0.BrowserTestingModule, diDeps: [], lifecycleHooks: [] }, entryComponents: [], providers: [{ provider: { token: { identifier: { reference: i1.NgLocalization_32 } }, useClass: { reference: i1.NgLocaleLocalization_33, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.LOCALE_ID_34 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true, token: { identifier: { reference: i1.DEPRECATED_PLURAL_FN_35 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.LOCALE_ID_34 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true, token: { identifier: { reference: i1.DEPRECATED_PLURAL_FN_35 } } }], multi: false }, module: { reference: i1.CommonModule_36, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.ApplicationRef_37, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.NgZone_38 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.Console_22 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.Injector_18 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ErrorHandler_24 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ComponentFactoryResolver_39 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationInitStatus_40 } } }], lifecycleHooks: [1] } }, useClass: { reference: i1.ApplicationRef_37, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.NgZone_38 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.Console_22 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.Injector_18 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ErrorHandler_24 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ComponentFactoryResolver_39 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationInitStatus_40 } } }], lifecycleHooks: [1] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.NgZone_38 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.Console_22 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.Injector_18 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ErrorHandler_24 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ComponentFactoryResolver_39 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationInitStatus_40 } } }], multi: false }, module: { reference: i1.ApplicationModule_41, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationRef_37 } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.ApplicationInitStatus_40, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true, token: { identifier: { reference: i2.APP_INITIALIZER_4 } } }], lifecycleHooks: [] } }, useClass: { reference: i1.ApplicationInitStatus_40, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true, token: { identifier: { reference: i2.APP_INITIALIZER_4 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true, token: { identifier: { reference: i2.APP_INITIALIZER_4 } } }], multi: false }, module: { reference: i1.ApplicationModule_41, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationRef_37 } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.Compiler_43, diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i1.Compiler_43, diDeps: [], lifecycleHooks: [] }, useFactory: null, deps: [], multi: false }, module: { reference: i1.ApplicationModule_41, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationRef_37 } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.APP_ID_29 } }, useClass: null, useFactory: { reference: i1._appIdRandomProviderFactory_44, diDeps: [] }, deps: [], multi: false }, module: { reference: i1.ApplicationModule_41, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationRef_37 } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.IterableDiffers_45 } }, useClass: null, useFactory: { reference: i1._iterableDiffersFactory_46, diDeps: [] }, deps: [], multi: false }, module: { reference: i1.ApplicationModule_41, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationRef_37 } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.KeyValueDiffers_47 } }, useClass: null, useFactory: { reference: i1._keyValueDiffersFactory_48, diDeps: [] }, deps: [], multi: false }, module: { reference: i1.ApplicationModule_41, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationRef_37 } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.LOCALE_ID_34 } }, useClass: null, useFactory: { reference: i1._localeFactory_49, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i1.LOCALE_ID_34 } } }] }, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i1.LOCALE_ID_34 } } }], multi: false }, module: { reference: i1.ApplicationModule_41, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationRef_37 } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.Sanitizer_11 } }, useClass: null, useFactory: null, useExisting: { identifier: { reference: i3.DomSanitizer } }, multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i3.DomSanitizer } }, useClass: { reference: i3.DomSanitizerImpl, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i5.DOCUMENT_13 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i5.DOCUMENT_13 } } }], multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.APP_ROOT_51 } }, useClass: null, useValue: true, useFactory: null, multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.ErrorHandler_24 } }, useClass: null, useFactory: { reference: i4.errorHandler, diDeps: [] }, deps: [], multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i6.EVENT_MANAGER_PLUGINS } }, useClass: { reference: i7.DomEventsPlugin, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.DOCUMENT_9 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.NgZone_8 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.DOCUMENT_9 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.NgZone_8 } } }], multi: true }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i6.EVENT_MANAGER_PLUGINS } }, useClass: { reference: i9.KeyEventsPlugin, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i10.DOCUMENT_9 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i10.DOCUMENT_9 } } }], multi: true }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i6.EVENT_MANAGER_PLUGINS } }, useClass: { reference: i11.HammerGesturesPlugin, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i12.DOCUMENT_10 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i11.HAMMER_GESTURE_CONFIG } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i12.Console_9 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i12.DOCUMENT_10 } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i11.HAMMER_GESTURE_CONFIG } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i12.Console_9 } } }], multi: true }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i11.HAMMER_GESTURE_CONFIG } }, useClass: { reference: i11.HammerGestureConfig, diDeps: [], lifecycleHooks: [] }, useFactory: null, deps: [], multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i13.DomRendererFactory2, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.EventManager } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i14.DomSharedStylesHost } } }], lifecycleHooks: [] } }, useClass: { reference: i13.DomRendererFactory2, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.EventManager } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i14.DomSharedStylesHost } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.EventManager } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i14.DomSharedStylesHost } } }], multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.RendererFactory2_61 } }, useClass: null, useFactory: null, useExisting: { identifier: { reference: i13.DomRendererFactory2 } }, multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i14.SharedStylesHost } }, useClass: null, useFactory: null, useExisting: { identifier: { reference: i14.DomSharedStylesHost } }, multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i14.DomSharedStylesHost, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i15.DOCUMENT_5 } } }], lifecycleHooks: [1] } }, useClass: { reference: i14.DomSharedStylesHost, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i15.DOCUMENT_5 } } }], lifecycleHooks: [1] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i15.DOCUMENT_5 } } }], multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.Testability_63, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.NgZone_8 } } }], lifecycleHooks: [] } }, useClass: { reference: i1.Testability_63, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.NgZone_8 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.NgZone_8 } } }], multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i6.EventManager, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.EVENT_MANAGER_PLUGINS } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.NgZone_8 } } }], lifecycleHooks: [] } }, useClass: { reference: i6.EventManager, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.EVENT_MANAGER_PLUGINS } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.NgZone_8 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i6.EVENT_MANAGER_PLUGINS } } }, { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i8.NgZone_8 } } }], multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i2.APP_INITIALIZER_4 } }, useClass: null, useFactory: { reference: i16._createNgProbe, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true, token: { identifier: { reference: i2.NgProbeToken_6 } } }] }, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true, token: { identifier: { reference: i2.NgProbeToken_6 } } }], multi: true }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i17.Meta, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i18.DOCUMENT_5 } } }], lifecycleHooks: [] } }, useClass: { reference: i17.Meta, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i18.DOCUMENT_5 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i18.DOCUMENT_5 } } }], multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i19.Title, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i20.DOCUMENT_4 } } }], lifecycleHooks: [] } }, useClass: { reference: i19.Title, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i20.DOCUMENT_4 } } }], lifecycleHooks: [] }, useFactory: null, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i20.DOCUMENT_4 } } }], multi: false }, module: { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i1.APP_ID_29 } }, useClass: null, useValue: "a", useFactory: null, useExisting: undefined, deps: undefined, multi: false }, module: { reference: i0.BrowserTestingModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i2.APP_INITIALIZER_4 } }, useClass: null, useValue: undefined, useFactory: { reference: i16._createNgProbe, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true, token: { identifier: { reference: i2.NgProbeToken_6 } } }] }, useExisting: undefined, deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true, token: { identifier: { reference: i2.NgProbeToken_6 } } }], multi: true }, module: { reference: i0.BrowserTestingModule, diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i8.NgZone_8 } }, useClass: null, useValue: undefined, useFactory: { reference: i0.ɵ0, diDeps: [] }, useExisting: undefined, deps: [], multi: false }, module: { reference: i0.BrowserTestingModule, diDeps: [], lifecycleHooks: [] } }], modules: [{ reference: i1.CommonModule_36, diDeps: [], lifecycleHooks: [] }, { reference: i1.ApplicationModule_41, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i1.ApplicationRef_37 } } }], lifecycleHooks: [] }, { reference: i4.BrowserModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: true, isOptional: true, token: { identifier: { reference: i4.BrowserModule } } }], lifecycleHooks: [] }, { reference: i0.BrowserTestingModule, diDeps: [], lifecycleHooks: [] }], exportedDirectives: [{ reference: i1.NgClass_68 }, { reference: i1.NgComponentOutlet_69 }, { reference: i1.NgForOf_70 }, { reference: i1.NgIf_71 }, { reference: i1.NgTemplateOutlet_72 }, { reference: i1.NgStyle_73 }, { reference: i1.NgSwitch_74 }, { reference: i1.NgSwitchCase_75 }, { reference: i1.NgSwitchDefault_76 }, { reference: i1.NgPlural_77 }, { reference: i1.NgPluralCase_78 }], exportedPipes: [{ reference: i1.AsyncPipe_79 }, { reference: i1.UpperCasePipe_80 }, { reference: i1.LowerCasePipe_81 }, { reference: i1.JsonPipe_82 }, { reference: i1.SlicePipe_83 }, { reference: i1.DecimalPipe_84 }, { reference: i1.PercentPipe_85 }, { reference: i1.TitleCasePipe_86 }, { reference: i1.CurrencyPipe_87 }, { reference: i1.DatePipe_88 }, { reference: i1.I18nPluralPipe_89 }, { reference: i1.I18nSelectPipe_90 }] }, i21.CommonModule_36NgSummary, i21.ApplicationModule_41NgSummary, i21.BrowserModuleNgSummary]; }

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5uZ3N1bW1hcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL2Jyb3dzZXIubmdzdW1tYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBpMCBmcm9tICdAYW5ndWxhci9jb3JlJztcbmkwLkNvbXBvbmVudEZhY3Rvcnk7XG5leHBvcnQgZnVuY3Rpb24gQnJvd3NlclRlc3RpbmdNb2R1bGVOZ1N1bW1hcnkoKTphbnlbXSB7XG4gIHJldHVybiAobnVsbCBhcyBhbnkpO1xufVxuIl19