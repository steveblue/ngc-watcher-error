/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
export { createPlatformFactory_15 as createPlatformFactory_1, platformCore_16 as platformCore_2, PLATFORM_ID_1 as PLATFORM_ID_3, PlatformRef_17 as PlatformRef_5, Injector_18 as Injector_6, NullInjector_19 as NullInjector_7, defineInjectable_20 as defineInjectable_8, TestabilityRegistry_21 as TestabilityRegistry_9, NgLocalization_32 as NgLocalization_14, NgLocaleLocalization_33 as NgLocaleLocalization_15, LOCALE_ID_34 as LOCALE_ID_16, DEPRECATED_PLURAL_FN_35 as DEPRECATED_PLURAL_FN_17, CommonModule_36 as CommonModule_18, ApplicationRef_37 as ApplicationRef_19, ErrorHandler_24 as ErrorHandler_21, ComponentFactoryResolver_39 as ComponentFactoryResolver_22, ApplicationInitStatus_40 as ApplicationInitStatus_23, ApplicationModule_41 as ApplicationModule_24, Compiler_43 as Compiler_26, APP_ID_29 as APP_ID_27, _appIdRandomProviderFactory_44 as _appIdRandomProviderFactory_28, IterableDiffers_45 as IterableDiffers_29, _iterableDiffersFactory_46 as _iterableDiffersFactory_30, KeyValueDiffers_47 as KeyValueDiffers_31, _keyValueDiffersFactory_48 as _keyValueDiffersFactory_32, _localeFactory_49 as _localeFactory_33, Sanitizer_11 as Sanitizer_34, APP_ROOT_51 as APP_ROOT_39, RendererFactory2_61 as RendererFactory2_50, Testability_63 as Testability_52, NgClass_68 as NgClass_57, NgComponentOutlet_69 as NgComponentOutlet_58, NgForOf_70 as NgForOf_59, NgIf_71 as NgIf_60, NgTemplateOutlet_72 as NgTemplateOutlet_61, NgStyle_73 as NgStyle_62, NgSwitch_74 as NgSwitch_63, NgSwitchCase_75 as NgSwitchCase_64, NgSwitchDefault_76 as NgSwitchDefault_65, NgPlural_77 as NgPlural_66, NgPluralCase_78 as NgPluralCase_67, AsyncPipe_79 as AsyncPipe_68, UpperCasePipe_80 as UpperCasePipe_69, LowerCasePipe_81 as LowerCasePipe_70, JsonPipe_82 as JsonPipe_71, SlicePipe_83 as SlicePipe_72, DecimalPipe_84 as DecimalPipe_73, PercentPipe_85 as PercentPipe_74, TitleCasePipe_86 as TitleCasePipe_75, CurrencyPipe_87 as CurrencyPipe_76, DatePipe_88 as DatePipe_77, I18nPluralPipe_89 as I18nPluralPipe_78, I18nSelectPipe_90 as I18nSelectPipe_79, ElementRef_91 as ElementRef_80, Renderer2_92 as Renderer2_81, Input_93 as Input_82, makePropDecorator_94 as makePropDecorator_83, ViewContainerRef_95 as ViewContainerRef_84, TemplateRef_96 as TemplateRef_85, Host_97 as Host_86, Attribute_98 as Attribute_88, ChangeDetectorRef_99 as ChangeDetectorRef_89 } from "angular/packages/platform-browser/src/browser.ngfactory";
export { InjectionToken_1 as InjectionToken_4, Console_9 as Console_10 } from "angular/packages/platform-browser/src/dom/events/hammer_gestures.ngfactory";
export { NgZone_8 as NgZone_20 } from "angular/packages/platform-browser/src/dom/events/dom_events.ngfactory";
export { APP_INITIALIZER_4 as APP_INITIALIZER_25, NgProbeToken_6 as NgProbeToken_54 } from "angular/packages/platform-browser/src/dom/debug/ng_probe.ngfactory";
export { DomSanitizer as DomSanitizer_35, DomSanitizerImpl as DomSanitizerImpl_37 } from "@angular/platform-browser/src/security/dom_sanitization_service";
export { BrowserModule as BrowserModule_36, errorHandler as errorHandler_40 } from "@angular/platform-browser/src/browser";
export { DOCUMENT_4 as DOCUMENT_38, makeParamDecorator_2 as makeParamDecorator_87, Inject_1 as Inject_90 } from "angular/packages/platform-browser/src/browser/title.ngfactory";
export { EVENT_MANAGER_PLUGINS as EVENT_MANAGER_PLUGINS_41, EventManager as EventManager_48 } from "@angular/platform-browser/src/dom/events/event_manager";
export { DomEventsPlugin as DomEventsPlugin_42 } from "@angular/platform-browser/src/dom/events/dom_events";
export { KeyEventsPlugin as KeyEventsPlugin_43 } from "@angular/platform-browser/src/dom/events/key_events";
export { HammerGesturesPlugin as HammerGesturesPlugin_44, HAMMER_GESTURE_CONFIG as HAMMER_GESTURE_CONFIG_45, HammerGestureConfig as HammerGestureConfig_46 } from "@angular/platform-browser/src/dom/events/hammer_gestures";
export { DomRendererFactory2 as DomRendererFactory2_47 } from "@angular/platform-browser/src/dom/dom_renderer";
export { DomSharedStylesHost as DomSharedStylesHost_49, SharedStylesHost as SharedStylesHost_51 } from "@angular/platform-browser/src/dom/shared_styles_host";
export { _createNgProbe as _createNgProbe_53 } from "@angular/platform-browser/src/dom/debug/ng_probe";
export { Meta as Meta_55 } from "@angular/platform-browser/src/browser/meta";
export { Title as Title_56 } from "@angular/platform-browser/src/browser/title";
import * as i0 from "@angular/core";
import * as i1 from "angular/packages/platform-browser/testing/src/browser";
import * as i2 from "angular/packages/platform-browser/src/browser.ngfactory";
import * as i3 from "@angular/platform-browser/src/security/dom_sanitization_service";
import * as i4 from "angular/packages/platform-browser/src/browser/title.ngfactory";
import * as i5 from "@angular/platform-browser/src/dom/events/hammer_gestures";
import * as i6 from "@angular/platform-browser/src/dom/events/event_manager";
import * as i7 from "@angular/platform-browser/src/dom/events/dom_events";
import * as i8 from "@angular/platform-browser/src/dom/events/key_events";
import * as i9 from "angular/packages/platform-browser/src/dom/events/dom_events.ngfactory";
import * as i10 from "angular/packages/platform-browser/src/dom/events/hammer_gestures.ngfactory";
import * as i11 from "@angular/platform-browser/src/dom/shared_styles_host";
import * as i12 from "@angular/platform-browser/src/dom/dom_renderer";
import * as i13 from "@angular/platform-browser/src/browser/meta";
import * as i14 from "@angular/platform-browser/src/browser/title";
import * as i15 from "@angular/platform-browser/src/browser";
import * as i16 from "angular/packages/platform-browser/src/dom/debug/ng_probe.ngfactory";
import * as i17 from "@angular/platform-browser/src/dom/debug/ng_probe";
var BrowserTestingModuleNgFactory = i0.ɵcmf(i1.BrowserTestingModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i2.ComponentFactoryResolver_39, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i2.ComponentFactoryResolver_39], i0.NgModuleRef]), i0.ɵmpd(5120, i2.LOCALE_ID_34, i2._localeFactory_49, [[3, i2.LOCALE_ID_34]]), i0.ɵmpd(4608, i2.NgLocalization_32, i2.NgLocaleLocalization_33, [i2.LOCALE_ID_34, [2, i2.DEPRECATED_PLURAL_FN_35]]), i0.ɵmpd(4608, i2.Compiler_43, i2.Compiler_43, []), i0.ɵmpd(4352, i2.APP_ID_29, "a", []), i0.ɵmpd(5120, i2.IterableDiffers_45, i2._iterableDiffersFactory_46, []), i0.ɵmpd(5120, i2.KeyValueDiffers_47, i2._keyValueDiffersFactory_48, []), i0.ɵmpd(4608, i3.DomSanitizer, i3.DomSanitizerImpl, [i4.DOCUMENT_4]), i0.ɵmpd(6144, i2.Sanitizer_11, null, [i3.DomSanitizer]), i0.ɵmpd(4608, i5.HAMMER_GESTURE_CONFIG, i5.HammerGestureConfig, []), i0.ɵmpd(5120, i6.EVENT_MANAGER_PLUGINS, function (p0_0, p0_1, p1_0, p2_0, p2_1, p2_2) { return [new i7.DomEventsPlugin(p0_0, p0_1), new i8.KeyEventsPlugin(p1_0), new i5.HammerGesturesPlugin(p2_0, p2_1, p2_2)]; }, [i4.DOCUMENT_4, i9.NgZone_8, i4.DOCUMENT_4, i4.DOCUMENT_4, i5.HAMMER_GESTURE_CONFIG, i10.Console_9]), i0.ɵmpd(4608, i6.EventManager, i6.EventManager, [i6.EVENT_MANAGER_PLUGINS, i9.NgZone_8]), i0.ɵmpd(135680, i11.DomSharedStylesHost, i11.DomSharedStylesHost, [i4.DOCUMENT_4]), i0.ɵmpd(4608, i12.DomRendererFactory2, i12.DomRendererFactory2, [i6.EventManager, i11.DomSharedStylesHost]), i0.ɵmpd(6144, i2.RendererFactory2_61, null, [i12.DomRendererFactory2]), i0.ɵmpd(6144, i11.SharedStylesHost, null, [i11.DomSharedStylesHost]), i0.ɵmpd(4608, i2.Testability_63, i2.Testability_63, [i9.NgZone_8]), i0.ɵmpd(4608, i13.Meta, i13.Meta, [i4.DOCUMENT_4]), i0.ɵmpd(4608, i14.Title, i14.Title, [i4.DOCUMENT_4]), i0.ɵmpd(1073742336, i2.CommonModule_36, i2.CommonModule_36, []), i0.ɵmpd(1024, i9.NgZone_8, i1.ɵ0, []), i0.ɵmpd(1024, i2.ErrorHandler_24, i15.errorHandler, []), i0.ɵmpd(1024, i16.APP_INITIALIZER_4, function (p0_0, p1_0) { return [i17._createNgProbe(p0_0), i17._createNgProbe(p1_0)]; }, [[2, i16.NgProbeToken_6], [2, i16.NgProbeToken_6]]), i0.ɵmpd(512, i2.ApplicationInitStatus_40, i2.ApplicationInitStatus_40, [[2, i16.APP_INITIALIZER_4]]), i0.ɵmpd(131584, i2.ApplicationRef_37, i2.ApplicationRef_37, [i9.NgZone_8, i10.Console_9, i2.Injector_18, i2.ErrorHandler_24, i2.ComponentFactoryResolver_39, i2.ApplicationInitStatus_40]), i0.ɵmpd(1073742336, i2.ApplicationModule_41, i2.ApplicationModule_41, [i2.ApplicationRef_37]), i0.ɵmpd(1073742336, i15.BrowserModule, i15.BrowserModule, [[3, i15.BrowserModule]]), i0.ɵmpd(1073742336, i1.BrowserTestingModule, i1.BrowserTestingModule, []), i0.ɵmpd(256, i2.APP_ROOT_51, true, [])]); });
export { BrowserTestingModuleNgFactory as BrowserTestingModuleNgFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5uZ2ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL2Jyb3dzZXIubmdmYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBpMCBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGkxIGZyb20gJ2FuZ3VsYXIvcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyJztcbmltcG9ydCAqIGFzIGkyIGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXInO1xuZXhwb3J0IGNvbnN0IEJyb3dzZXJUZXN0aW5nTW9kdWxlTmdGYWN0b3J5OmkwLk5nTW9kdWxlRmFjdG9yeTxpMS5Ccm93c2VyVGVzdGluZ01vZHVsZT4gPSAobnVsbCBhcyBhbnkpO1xudmFyIF9kZWNsMF8wOmkyLkJyb3dzZXJNb2R1bGUgPSAoPGFueT4obnVsbCBhcyBhbnkpKTtcbnZhciBfZGVjbDBfMTppMC5UZW1wbGF0ZVJlZjxhbnk+ID0gKDxhbnk+KG51bGwgYXMgYW55KSk7XG52YXIgX2RlY2wwXzI6aTAuRWxlbWVudFJlZjxhbnk+ID0gKDxhbnk+KG51bGwgYXMgYW55KSk7XG4iXX0=