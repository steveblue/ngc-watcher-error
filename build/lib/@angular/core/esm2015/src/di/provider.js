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
 * \@whatItDoes Configures the {\@link Injector} to return a value for a token.
 * \@howToUse
 * ```
 * \@Injectable(SomeModule, {useValue: 'someValue'})
 * class SomeClass {}
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ValueSansProvider'}
 *
 * \@experimental
 * @record
 */
export function ValueSansProvider() { }
function ValueSansProvider_tsickle_Closure_declarations() {
    /**
     * The value to inject.
     * @type {?}
     */
    ValueSansProvider.prototype.useValue;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return a value for a token.
 * \@howToUse
 * ```
 * const provider: ValueProvider = {provide: 'someToken', useValue: 'someValue'};
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ValueProvider'}
 *
 * \@stable
 * @record
 */
export function ValueProvider() { }
function ValueProvider_tsickle_Closure_declarations() {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     * @type {?}
     */
    ValueProvider.prototype.provide;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     *
     * ### Example
     *
     * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
     * @type {?|undefined}
     */
    ValueProvider.prototype.multi;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return an instance of `useClass` for a token.
 * \@howToUse
 * ```
 * \@Injectable(SomeModule, {useClass: MyService, deps: []})
 * class MyService {}
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='StaticClassSansProvider'}
 *
 * \@experimental
 * @record
 */
export function StaticClassSansProvider() { }
function StaticClassSansProvider_tsickle_Closure_declarations() {
    /**
     * An optional class to instantiate for the `token`. (If not provided `provide` is assumed to be a
     * class to instantiate)
     * @type {?}
     */
    StaticClassSansProvider.prototype.useClass;
    /**
     * A list of `token`s which need to be resolved by the injector. The list of values is then
     * used as arguments to the `useClass` constructor.
     * @type {?}
     */
    StaticClassSansProvider.prototype.deps;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return an instance of `useClass` for a token.
 * \@howToUse
 * ```
 * \@Injectable()
 * class MyService {}
 *
 * const provider: ClassProvider = {provide: 'someToken', useClass: MyService, deps: []};
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='StaticClassProvider'}
 *
 * Note that following two providers are not equal:
 * {\@example core/di/ts/provider_spec.ts region='StaticClassProviderDifference'}
 *
 * \@stable
 * @record
 */
export function StaticClassProvider() { }
function StaticClassProvider_tsickle_Closure_declarations() {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     * @type {?}
     */
    StaticClassProvider.prototype.provide;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     *
     * ### Example
     *
     * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
     * @type {?|undefined}
     */
    StaticClassProvider.prototype.multi;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return an instance of a token.
 * \@howToUse
 * ```
 * \@Injectable(SomeModule, {deps: []})
 * class MyService {}
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ConstructorSansProvider'}
 *
 * \@experimental
 * @record
 */
export function ConstructorSansProvider() { }
function ConstructorSansProvider_tsickle_Closure_declarations() {
    /**
     * A list of `token`s which need to be resolved by the injector. The list of values is then
     * used as arguments to the `useClass` constructor.
     * @type {?|undefined}
     */
    ConstructorSansProvider.prototype.deps;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return an instance of a token.
 * \@howToUse
 * ```
 * \@Injectable()
 * class MyService {}
 *
 * const provider: ClassProvider = {provide: MyClass, deps: []};
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * \@stable
 * @record
 */
export function ConstructorProvider() { }
function ConstructorProvider_tsickle_Closure_declarations() {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     * @type {?}
     */
    ConstructorProvider.prototype.provide;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     *
     * ### Example
     *
     * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
     * @type {?|undefined}
     */
    ConstructorProvider.prototype.multi;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return a value of another `useExisting` token.
 * \@howToUse
 * ```
 * \@Injectable(SomeModule, {useExisting: 'someOtherToken'})
 * class SomeClass {}
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ExistingSansProvider'}
 *
 * \@stable
 * @record
 */
export function ExistingSansProvider() { }
function ExistingSansProvider_tsickle_Closure_declarations() {
    /**
     * Existing `token` to return. (equivalent to `injector.get(useExisting)`)
     * @type {?}
     */
    ExistingSansProvider.prototype.useExisting;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return a value of another `useExisting` token.
 * \@howToUse
 * ```
 * const provider: ExistingProvider = {provide: 'someToken', useExisting: 'someOtherToken'};
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ExistingProvider'}
 *
 * \@stable
 * @record
 */
export function ExistingProvider() { }
function ExistingProvider_tsickle_Closure_declarations() {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     * @type {?}
     */
    ExistingProvider.prototype.provide;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     *
     * ### Example
     *
     * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
     * @type {?|undefined}
     */
    ExistingProvider.prototype.multi;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return a value by invoking a `useFactory`
 * function.
 * \@howToUse
 * ```
 * function serviceFactory() { ... }
 *
 * \@Injectable(SomeModule, {useFactory: serviceFactory, deps: []})
 * class SomeClass {}
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='FactorySansProvider'}
 *
 * \@experimental
 * @record
 */
export function FactorySansProvider() { }
function FactorySansProvider_tsickle_Closure_declarations() {
    /**
     * A function to invoke to create a value for this `token`. The function is invoked with
     * resolved values of `token`s in the `deps` field.
     * @type {?}
     */
    FactorySansProvider.prototype.useFactory;
    /**
     * A list of `token`s which need to be resolved by the injector. The list of values is then
     * used as arguments to the `useFactory` function.
     * @type {?|undefined}
     */
    FactorySansProvider.prototype.deps;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return a value by invoking a `useFactory`
 * function.
 * \@howToUse
 * ```
 * function serviceFactory() { ... }
 *
 * const provider: FactoryProvider = {provide: 'someToken', useFactory: serviceFactory, deps: []};
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='FactoryProvider'}
 *
 * Dependencies can also be marked as optional:
 * {\@example core/di/ts/provider_spec.ts region='FactoryProviderOptionalDeps'}
 *
 * \@stable
 * @record
 */
export function FactoryProvider() { }
function FactoryProvider_tsickle_Closure_declarations() {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     * @type {?}
     */
    FactoryProvider.prototype.provide;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     *
     * ### Example
     *
     * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
     * @type {?|undefined}
     */
    FactoryProvider.prototype.multi;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return an instance of `Type` when `Type' is used
 * as token.
 * \@howToUse
 * ```
 * \@Injectable()
 * class MyService {}
 *
 * const provider: TypeProvider = MyService;
 * ```
 *
 * \@description
 *
 * Create an instance by invoking the `new` operator and supplying additional arguments.
 * This form is a short form of `TypeProvider`;
 *
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='TypeProvider'}
 *
 * \@stable
 * @record
 */
export function TypeProvider() { }
function TypeProvider_tsickle_Closure_declarations() {
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return a value by invoking a `useClass`
 * function.
 * \@howToUse
 * ```
 *
 * class SomeClassImpl {}
 *
 * \@Injectable(SomeModule, {useClass: SomeClassImpl})
 * class SomeClass {}
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ClassSansProvider'}
 *
 * \@experimental
 * @record
 */
export function ClassSansProvider() { }
function ClassSansProvider_tsickle_Closure_declarations() {
    /**
     * Class to instantiate for the `token`.
     * @type {?}
     */
    ClassSansProvider.prototype.useClass;
}
/**
 * \@whatItDoes Configures the {\@link Injector} to return an instance of `useClass` for a token.
 * \@howToUse
 * ```
 * \@Injectable()
 * class MyService {}
 *
 * const provider: ClassProvider = {provide: 'someToken', useClass: MyService};
 * ```
 *
 * \@description
 * For more details, see the {\@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ClassProvider'}
 *
 * Note that following two providers are not equal:
 * {\@example core/di/ts/provider_spec.ts region='ClassProviderDifference'}
 *
 * \@stable
 * @record
 */
export function ClassProvider() { }
function ClassProvider_tsickle_Closure_declarations() {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     * @type {?}
     */
    ClassProvider.prototype.provide;
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     *
     * ### Example
     *
     * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
     * @type {?|undefined}
     */
    ClassProvider.prototype.multi;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuXG4vKipcbiAqIEB3aGF0SXREb2VzIENvbmZpZ3VyZXMgdGhlIHtAbGluayBJbmplY3Rvcn0gdG8gcmV0dXJuIGEgdmFsdWUgZm9yIGEgdG9rZW4uXG4gKiBAaG93VG9Vc2VcbiAqIGBgYFxuICogQEluamVjdGFibGUoU29tZU1vZHVsZSwge3VzZVZhbHVlOiAnc29tZVZhbHVlJ30pXG4gKiBjbGFzcyBTb21lQ2xhc3Mge31cbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSB7QGxpbmtEb2NzIGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uIFwiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIn0uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nVmFsdWVTYW5zUHJvdmlkZXInfVxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWYWx1ZVNhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBUaGUgdmFsdWUgdG8gaW5qZWN0LlxuICAgKi9cbiAgdXNlVmFsdWU6IGFueTtcbn1cblxuLyoqXG4gKiBAd2hhdEl0RG9lcyBDb25maWd1cmVzIHRoZSB7QGxpbmsgSW5qZWN0b3J9IHRvIHJldHVybiBhIHZhbHVlIGZvciBhIHRva2VuLlxuICogQGhvd1RvVXNlXG4gKiBgYGBcbiAqIGNvbnN0IHByb3ZpZGVyOiBWYWx1ZVByb3ZpZGVyID0ge3Byb3ZpZGU6ICdzb21lVG9rZW4nLCB1c2VWYWx1ZTogJ3NvbWVWYWx1ZSd9O1xuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdWYWx1ZVByb3ZpZGVyJ31cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWVQcm92aWRlciBleHRlbmRzIFZhbHVlU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEFuIGluamVjdGlvbiB0b2tlbi4gKFR5cGljYWxseSBhbiBpbnN0YW5jZSBvZiBgVHlwZWAgb3IgYEluamVjdGlvblRva2VuYCwgYnV0IGNhbiBiZSBgYW55YCkuXG4gICAqL1xuICBwcm92aWRlOiBhbnk7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHRoZW4gaW5qZWN0b3IgcmV0dXJucyBhbiBhcnJheSBvZiBpbnN0YW5jZXMuIFRoaXMgaXMgdXNlZnVsIHRvIGFsbG93IG11bHRpcGxlXG4gICAqIHByb3ZpZGVycyBzcHJlYWQgYWNyb3NzIG1hbnkgZmlsZXMgdG8gcHJvdmlkZSBjb25maWd1cmF0aW9uIGluZm9ybWF0aW9uIHRvIGEgY29tbW9uIHRva2VuLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nTXVsdGlQcm92aWRlckFzcGVjdCd9XG4gICAqL1xuICBtdWx0aT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQHdoYXRJdERvZXMgQ29uZmlndXJlcyB0aGUge0BsaW5rIEluamVjdG9yfSB0byByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgYHVzZUNsYXNzYCBmb3IgYSB0b2tlbi5cbiAqIEBob3dUb1VzZVxuICogYGBgXG4gKiBASW5qZWN0YWJsZShTb21lTW9kdWxlLCB7dXNlQ2xhc3M6IE15U2VydmljZSwgZGVwczogW119KVxuICogY2xhc3MgTXlTZXJ2aWNlIHt9XG4gKiBgYGBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J1N0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyJ31cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgY2xhc3MgdG8gaW5zdGFudGlhdGUgZm9yIHRoZSBgdG9rZW5gLiAoSWYgbm90IHByb3ZpZGVkIGBwcm92aWRlYCBpcyBhc3N1bWVkIHRvIGJlIGFcbiAgICogY2xhc3MgdG8gaW5zdGFudGlhdGUpXG4gICAqL1xuICB1c2VDbGFzczogVHlwZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgYHRva2VuYHMgd2hpY2ggbmVlZCB0byBiZSByZXNvbHZlZCBieSB0aGUgaW5qZWN0b3IuIFRoZSBsaXN0IG9mIHZhbHVlcyBpcyB0aGVuXG4gICAqIHVzZWQgYXMgYXJndW1lbnRzIHRvIHRoZSBgdXNlQ2xhc3NgIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgZGVwczogYW55W107XG59XG5cbi8qKlxuICogQHdoYXRJdERvZXMgQ29uZmlndXJlcyB0aGUge0BsaW5rIEluamVjdG9yfSB0byByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgYHVzZUNsYXNzYCBmb3IgYSB0b2tlbi5cbiAqIEBob3dUb1VzZVxuICogYGBgXG4gKiBASW5qZWN0YWJsZSgpXG4gKiBjbGFzcyBNeVNlcnZpY2Uge31cbiAqXG4gKiBjb25zdCBwcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtwcm92aWRlOiAnc29tZVRva2VuJywgdXNlQ2xhc3M6IE15U2VydmljZSwgZGVwczogW119O1xuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdTdGF0aWNDbGFzc1Byb3ZpZGVyJ31cbiAqXG4gKiBOb3RlIHRoYXQgZm9sbG93aW5nIHR3byBwcm92aWRlcnMgYXJlIG5vdCBlcXVhbDpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdTdGF0aWNDbGFzc1Byb3ZpZGVyRGlmZmVyZW5jZSd9XG4gKlxuICogQHN0YWJsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRpY0NsYXNzUHJvdmlkZXIgZXh0ZW5kcyBTdGF0aWNDbGFzc1NhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBBbiBpbmplY3Rpb24gdG9rZW4uIChUeXBpY2FsbHkgYW4gaW5zdGFuY2Ugb2YgYFR5cGVgIG9yIGBJbmplY3Rpb25Ub2tlbmAsIGJ1dCBjYW4gYmUgYGFueWApLlxuICAgKi9cbiAgcHJvdmlkZTogYW55O1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGVuIGluamVjdG9yIHJldHVybnMgYW4gYXJyYXkgb2YgaW5zdGFuY2VzLiBUaGlzIGlzIHVzZWZ1bCB0byBhbGxvdyBtdWx0aXBsZVxuICAgKiBwcm92aWRlcnMgc3ByZWFkIGFjcm9zcyBtYW55IGZpbGVzIHRvIHByb3ZpZGUgY29uZmlndXJhdGlvbiBpbmZvcm1hdGlvbiB0byBhIGNvbW1vbiB0b2tlbi5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J011bHRpUHJvdmlkZXJBc3BlY3QnfVxuICAgKi9cbiAgbXVsdGk/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEB3aGF0SXREb2VzIENvbmZpZ3VyZXMgdGhlIHtAbGluayBJbmplY3Rvcn0gdG8gcmV0dXJuIGFuIGluc3RhbmNlIG9mIGEgdG9rZW4uXG4gKiBAaG93VG9Vc2VcbiAqIGBgYFxuICogQEluamVjdGFibGUoU29tZU1vZHVsZSwge2RlcHM6IFtdfSlcbiAqIGNsYXNzIE15U2VydmljZSB7fVxuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdDb25zdHJ1Y3RvclNhbnNQcm92aWRlcid9XG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnN0cnVjdG9yU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBgdG9rZW5gcyB3aGljaCBuZWVkIHRvIGJlIHJlc29sdmVkIGJ5IHRoZSBpbmplY3Rvci4gVGhlIGxpc3Qgb2YgdmFsdWVzIGlzIHRoZW5cbiAgICogdXNlZCBhcyBhcmd1bWVudHMgdG8gdGhlIGB1c2VDbGFzc2AgY29uc3RydWN0b3IuXG4gICAqL1xuICBkZXBzPzogYW55W107XG59XG5cbi8qKlxuICogQHdoYXRJdERvZXMgQ29uZmlndXJlcyB0aGUge0BsaW5rIEluamVjdG9yfSB0byByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgYSB0b2tlbi5cbiAqIEBob3dUb1VzZVxuICogYGBgXG4gKiBASW5qZWN0YWJsZSgpXG4gKiBjbGFzcyBNeVNlcnZpY2Uge31cbiAqXG4gKiBjb25zdCBwcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtwcm92aWRlOiBNeUNsYXNzLCBkZXBzOiBbXX07XG4gKiBgYGBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J0NvbnN0cnVjdG9yUHJvdmlkZXInfVxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb25zdHJ1Y3RvclByb3ZpZGVyIGV4dGVuZHMgQ29uc3RydWN0b3JTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQW4gaW5qZWN0aW9uIHRva2VuLiAoVHlwaWNhbGx5IGFuIGluc3RhbmNlIG9mIGBUeXBlYCBvciBgSW5qZWN0aW9uVG9rZW5gLCBidXQgY2FuIGJlIGBhbnlgKS5cbiAgICovXG4gIHByb3ZpZGU6IFR5cGU8YW55PjtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlbiBpbmplY3RvciByZXR1cm5zIGFuIGFycmF5IG9mIGluc3RhbmNlcy4gVGhpcyBpcyB1c2VmdWwgdG8gYWxsb3cgbXVsdGlwbGVcbiAgICogcHJvdmlkZXJzIHNwcmVhZCBhY3Jvc3MgbWFueSBmaWxlcyB0byBwcm92aWRlIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb24gdG8gYSBjb21tb24gdG9rZW4uXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdNdWx0aVByb3ZpZGVyQXNwZWN0J31cbiAgICovXG4gIG11bHRpPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBAd2hhdEl0RG9lcyBDb25maWd1cmVzIHRoZSB7QGxpbmsgSW5qZWN0b3J9IHRvIHJldHVybiBhIHZhbHVlIG9mIGFub3RoZXIgYHVzZUV4aXN0aW5nYCB0b2tlbi5cbiAqIEBob3dUb1VzZVxuICogYGBgXG4gKiBASW5qZWN0YWJsZShTb21lTW9kdWxlLCB7dXNlRXhpc3Rpbmc6ICdzb21lT3RoZXJUb2tlbid9KVxuICogY2xhc3MgU29tZUNsYXNzIHt9XG4gKiBgYGBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J0V4aXN0aW5nU2Fuc1Byb3ZpZGVyJ31cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXhpc3RpbmdTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogRXhpc3RpbmcgYHRva2VuYCB0byByZXR1cm4uIChlcXVpdmFsZW50IHRvIGBpbmplY3Rvci5nZXQodXNlRXhpc3RpbmcpYClcbiAgICovXG4gIHVzZUV4aXN0aW5nOiBhbnk7XG59XG5cbi8qKlxuICogQHdoYXRJdERvZXMgQ29uZmlndXJlcyB0aGUge0BsaW5rIEluamVjdG9yfSB0byByZXR1cm4gYSB2YWx1ZSBvZiBhbm90aGVyIGB1c2VFeGlzdGluZ2AgdG9rZW4uXG4gKiBAaG93VG9Vc2VcbiAqIGBgYFxuICogY29uc3QgcHJvdmlkZXI6IEV4aXN0aW5nUHJvdmlkZXIgPSB7cHJvdmlkZTogJ3NvbWVUb2tlbicsIHVzZUV4aXN0aW5nOiAnc29tZU90aGVyVG9rZW4nfTtcbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSB7QGxpbmtEb2NzIGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uIFwiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIn0uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nRXhpc3RpbmdQcm92aWRlcid9XG4gKlxuICogQHN0YWJsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4aXN0aW5nUHJvdmlkZXIgZXh0ZW5kcyBFeGlzdGluZ1NhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBBbiBpbmplY3Rpb24gdG9rZW4uIChUeXBpY2FsbHkgYW4gaW5zdGFuY2Ugb2YgYFR5cGVgIG9yIGBJbmplY3Rpb25Ub2tlbmAsIGJ1dCBjYW4gYmUgYGFueWApLlxuICAgKi9cbiAgcHJvdmlkZTogYW55O1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGVuIGluamVjdG9yIHJldHVybnMgYW4gYXJyYXkgb2YgaW5zdGFuY2VzLiBUaGlzIGlzIHVzZWZ1bCB0byBhbGxvdyBtdWx0aXBsZVxuICAgKiBwcm92aWRlcnMgc3ByZWFkIGFjcm9zcyBtYW55IGZpbGVzIHRvIHByb3ZpZGUgY29uZmlndXJhdGlvbiBpbmZvcm1hdGlvbiB0byBhIGNvbW1vbiB0b2tlbi5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J011bHRpUHJvdmlkZXJBc3BlY3QnfVxuICAgKi9cbiAgbXVsdGk/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEB3aGF0SXREb2VzIENvbmZpZ3VyZXMgdGhlIHtAbGluayBJbmplY3Rvcn0gdG8gcmV0dXJuIGEgdmFsdWUgYnkgaW52b2tpbmcgYSBgdXNlRmFjdG9yeWBcbiAqIGZ1bmN0aW9uLlxuICogQGhvd1RvVXNlXG4gKiBgYGBcbiAqIGZ1bmN0aW9uIHNlcnZpY2VGYWN0b3J5KCkgeyAuLi4gfVxuICpcbiAqIEBJbmplY3RhYmxlKFNvbWVNb2R1bGUsIHt1c2VGYWN0b3J5OiBzZXJ2aWNlRmFjdG9yeSwgZGVwczogW119KVxuICogY2xhc3MgU29tZUNsYXNzIHt9XG4gKiBgYGBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J0ZhY3RvcnlTYW5zUHJvdmlkZXInfVxuICpcbiAqIEBleHBlcmltZW50YWxcbiAgICovXG5leHBvcnQgaW50ZXJmYWNlIEZhY3RvcnlTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byBpbnZva2UgdG8gY3JlYXRlIGEgdmFsdWUgZm9yIHRoaXMgYHRva2VuYC4gVGhlIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aFxuICAgKiByZXNvbHZlZCB2YWx1ZXMgb2YgYHRva2VuYHMgaW4gdGhlIGBkZXBzYCBmaWVsZC5cbiAgICovXG4gIHVzZUZhY3Rvcnk6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgYHRva2VuYHMgd2hpY2ggbmVlZCB0byBiZSByZXNvbHZlZCBieSB0aGUgaW5qZWN0b3IuIFRoZSBsaXN0IG9mIHZhbHVlcyBpcyB0aGVuXG4gICAqIHVzZWQgYXMgYXJndW1lbnRzIHRvIHRoZSBgdXNlRmFjdG9yeWAgZnVuY3Rpb24uXG4gICAqL1xuICBkZXBzPzogYW55W107XG59XG5cbi8qKlxuICogQHdoYXRJdERvZXMgQ29uZmlndXJlcyB0aGUge0BsaW5rIEluamVjdG9yfSB0byByZXR1cm4gYSB2YWx1ZSBieSBpbnZva2luZyBhIGB1c2VGYWN0b3J5YFxuICogZnVuY3Rpb24uXG4gKiBAaG93VG9Vc2VcbiAqIGBgYFxuICogZnVuY3Rpb24gc2VydmljZUZhY3RvcnkoKSB7IC4uLiB9XG4gKlxuICogY29uc3QgcHJvdmlkZXI6IEZhY3RvcnlQcm92aWRlciA9IHtwcm92aWRlOiAnc29tZVRva2VuJywgdXNlRmFjdG9yeTogc2VydmljZUZhY3RvcnksIGRlcHM6IFtdfTtcbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSB7QGxpbmtEb2NzIGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uIFwiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIn0uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nRmFjdG9yeVByb3ZpZGVyJ31cbiAqXG4gKiBEZXBlbmRlbmNpZXMgY2FuIGFsc28gYmUgbWFya2VkIGFzIG9wdGlvbmFsOlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J0ZhY3RvcnlQcm92aWRlck9wdGlvbmFsRGVwcyd9XG4gKlxuICogQHN0YWJsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhY3RvcnlQcm92aWRlciBleHRlbmRzIEZhY3RvcnlTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQW4gaW5qZWN0aW9uIHRva2VuLiAoVHlwaWNhbGx5IGFuIGluc3RhbmNlIG9mIGBUeXBlYCBvciBgSW5qZWN0aW9uVG9rZW5gLCBidXQgY2FuIGJlIGBhbnlgKS5cbiAgICovXG4gIHByb3ZpZGU6IGFueTtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlbiBpbmplY3RvciByZXR1cm5zIGFuIGFycmF5IG9mIGluc3RhbmNlcy4gVGhpcyBpcyB1c2VmdWwgdG8gYWxsb3cgbXVsdGlwbGVcbiAgICogcHJvdmlkZXJzIHNwcmVhZCBhY3Jvc3MgbWFueSBmaWxlcyB0byBwcm92aWRlIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb24gdG8gYSBjb21tb24gdG9rZW4uXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdNdWx0aVByb3ZpZGVyQXNwZWN0J31cbiAgICovXG4gIG11bHRpPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBAd2hhdEl0RG9lcyBEZXNjcmliZXMgaG93IHRoZSB7QGxpbmsgSW5qZWN0b3J9IHNob3VsZCBiZSBjb25maWd1cmVkIGluIGEgc3RhdGljIHdheSAoV2l0aG91dFxuICogcmVmbGVjdGlvbikuXG4gKiBAaG93VG9Vc2VcbiAqIFNlZSB7QGxpbmsgVmFsdWVQcm92aWRlcn0sIHtAbGluayBFeGlzdGluZ1Byb3ZpZGVyfSwge0BsaW5rIEZhY3RvcnlQcm92aWRlcn0uXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCB0eXBlIFN0YXRpY1Byb3ZpZGVyID0gVmFsdWVQcm92aWRlciB8IEV4aXN0aW5nUHJvdmlkZXIgfCBTdGF0aWNDbGFzc1Byb3ZpZGVyIHxcbiAgICBDb25zdHJ1Y3RvclByb3ZpZGVyIHwgRmFjdG9yeVByb3ZpZGVyIHwgYW55W107XG5cblxuLyoqXG4gKiBAd2hhdEl0RG9lcyBDb25maWd1cmVzIHRoZSB7QGxpbmsgSW5qZWN0b3J9IHRvIHJldHVybiBhbiBpbnN0YW5jZSBvZiBgVHlwZWAgd2hlbiBgVHlwZScgaXMgdXNlZFxuICogYXMgdG9rZW4uXG4gKiBAaG93VG9Vc2VcbiAqIGBgYFxuICogQEluamVjdGFibGUoKVxuICogY2xhc3MgTXlTZXJ2aWNlIHt9XG4gKlxuICogY29uc3QgcHJvdmlkZXI6IFR5cGVQcm92aWRlciA9IE15U2VydmljZTtcbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBieSBpbnZva2luZyB0aGUgYG5ld2Agb3BlcmF0b3IgYW5kIHN1cHBseWluZyBhZGRpdGlvbmFsIGFyZ3VtZW50cy5cbiAqIFRoaXMgZm9ybSBpcyBhIHNob3J0IGZvcm0gb2YgYFR5cGVQcm92aWRlcmA7XG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSB7QGxpbmtEb2NzIGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uIFwiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIn0uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nVHlwZVByb3ZpZGVyJ31cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZVByb3ZpZGVyIGV4dGVuZHMgVHlwZTxhbnk+IHt9XG5cbi8qKlxuICogQHdoYXRJdERvZXMgQ29uZmlndXJlcyB0aGUge0BsaW5rIEluamVjdG9yfSB0byByZXR1cm4gYSB2YWx1ZSBieSBpbnZva2luZyBhIGB1c2VDbGFzc2BcbiAqIGZ1bmN0aW9uLlxuICogQGhvd1RvVXNlXG4gKiBgYGBcbiAqXG4gKiBjbGFzcyBTb21lQ2xhc3NJbXBsIHt9XG4gKlxuICogQEluamVjdGFibGUoU29tZU1vZHVsZSwge3VzZUNsYXNzOiBTb21lQ2xhc3NJbXBsfSlcbiAqIGNsYXNzIFNvbWVDbGFzcyB7fVxuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdDbGFzc1NhbnNQcm92aWRlcid9XG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIENsYXNzU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIENsYXNzIHRvIGluc3RhbnRpYXRlIGZvciB0aGUgYHRva2VuYC5cbiAgICovXG4gIHVzZUNsYXNzOiBUeXBlPGFueT47XG59XG5cbi8qKlxuICogQHdoYXRJdERvZXMgQ29uZmlndXJlcyB0aGUge0BsaW5rIEluamVjdG9yfSB0byByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgYHVzZUNsYXNzYCBmb3IgYSB0b2tlbi5cbiAqIEBob3dUb1VzZVxuICogYGBgXG4gKiBASW5qZWN0YWJsZSgpXG4gKiBjbGFzcyBNeVNlcnZpY2Uge31cbiAqXG4gKiBjb25zdCBwcm92aWRlcjogQ2xhc3NQcm92aWRlciA9IHtwcm92aWRlOiAnc29tZVRva2VuJywgdXNlQ2xhc3M6IE15U2VydmljZX07XG4gKiBgYGBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J0NsYXNzUHJvdmlkZXInfVxuICpcbiAqIE5vdGUgdGhhdCBmb2xsb3dpbmcgdHdvIHByb3ZpZGVycyBhcmUgbm90IGVxdWFsOlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J0NsYXNzUHJvdmlkZXJEaWZmZXJlbmNlJ31cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2xhc3NQcm92aWRlciBleHRlbmRzIENsYXNzU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEFuIGluamVjdGlvbiB0b2tlbi4gKFR5cGljYWxseSBhbiBpbnN0YW5jZSBvZiBgVHlwZWAgb3IgYEluamVjdGlvblRva2VuYCwgYnV0IGNhbiBiZSBgYW55YCkuXG4gICAqL1xuICBwcm92aWRlOiBhbnk7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHRoZW4gaW5qZWN0b3IgcmV0dXJucyBhbiBhcnJheSBvZiBpbnN0YW5jZXMuIFRoaXMgaXMgdXNlZnVsIHRvIGFsbG93IG11bHRpcGxlXG4gICAqIHByb3ZpZGVycyBzcHJlYWQgYWNyb3NzIG1hbnkgZmlsZXMgdG8gcHJvdmlkZSBjb25maWd1cmF0aW9uIGluZm9ybWF0aW9uIHRvIGEgY29tbW9uIHRva2VuLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nTXVsdGlQcm92aWRlckFzcGVjdCd9XG4gICAqL1xuICBtdWx0aT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQHdoYXRJdERvZXMgRGVzY3JpYmVzIGhvdyB0aGUge0BsaW5rIEluamVjdG9yfSBzaG91bGQgYmUgY29uZmlndXJlZC5cbiAqIEBob3dUb1VzZVxuICogU2VlIHtAbGluayBUeXBlUHJvdmlkZXJ9LCB7QGxpbmsgQ2xhc3NQcm92aWRlcn0sIHtAbGluayBTdGF0aWNQcm92aWRlcn0uXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCB0eXBlIFByb3ZpZGVyID1cbiAgICBUeXBlUHJvdmlkZXIgfCBWYWx1ZVByb3ZpZGVyIHwgQ2xhc3NQcm92aWRlciB8IEV4aXN0aW5nUHJvdmlkZXIgfCBGYWN0b3J5UHJvdmlkZXIgfCBhbnlbXTtcbiJdfQ==