/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Construct an `InjectableDef` which defines how a token will be constructed by the DI system, and
 * in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ngInjectableDef` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
 *
 * @experimental
 */
export function defineInjectable(opts) {
    return {
        providedIn: opts.providedIn || null,
        factory: opts.factory,
    };
}
/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static `ngInjectorDef` field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `factory`: an `InjectorType` is an instantiable type, so a zero argument `factory` function to
 *   create the type must be provided. If that factory function needs to inject arguments, it can
 *   use the `inject` function.
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has an `ngInjectableDef` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @experimental
 */
export function defineInjector(options) {
    return {
        factory: options.factory,
        providers: options.providers || [],
        imports: options.imports || [],
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzR0EsTUFBTSwyQkFBOEIsSUFHbkM7SUFDQyxNQUFNLENBQUM7UUFDTCxVQUFVLEVBQUcsSUFBSSxDQUFDLFVBQTJELElBQUksSUFBSTtRQUNyRixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87S0FDdEIsQ0FBQztDQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkQsTUFBTSx5QkFBeUIsT0FBaUU7SUFFOUYsTUFBTSxDQUFDO1FBQ0wsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUU7UUFDbEMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRTtLQUMvQixDQUFDO0NBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5cbmltcG9ydCB7Q2xhc3NQcm92aWRlciwgQ2xhc3NTYW5zUHJvdmlkZXIsIENvbnN0cnVjdG9yUHJvdmlkZXIsIENvbnN0cnVjdG9yU2Fuc1Byb3ZpZGVyLCBFeGlzdGluZ1Byb3ZpZGVyLCBFeGlzdGluZ1NhbnNQcm92aWRlciwgRmFjdG9yeVByb3ZpZGVyLCBGYWN0b3J5U2Fuc1Byb3ZpZGVyLCBTdGF0aWNDbGFzc1Byb3ZpZGVyLCBTdGF0aWNDbGFzc1NhbnNQcm92aWRlciwgVmFsdWVQcm92aWRlciwgVmFsdWVTYW5zUHJvdmlkZXJ9IGZyb20gJy4vcHJvdmlkZXInO1xuXG4vKipcbiAqIEluZm9ybWF0aW9uIGFib3V0IGhvdyBhIHR5cGUgb3IgYEluamVjdGlvblRva2VuYCBpbnRlcmZhY2VzIHdpdGggdGhlIERJIHN5c3RlbS5cbiAqXG4gKiBBdCBhIG1pbmltdW0sIHRoaXMgaW5jbHVkZXMgYSBgZmFjdG9yeWAgd2hpY2ggZGVmaW5lcyBob3cgdG8gY3JlYXRlIHRoZSBnaXZlbiB0eXBlIGBUYCwgcG9zc2libHlcbiAqIHJlcXVlc3RpbmcgaW5qZWN0aW9uIG9mIG90aGVyIHR5cGVzIGlmIG5lY2Vzc2FyeS5cbiAqXG4gKiBPcHRpb25hbGx5LCBhIGBwcm92aWRlZEluYCBwYXJhbWV0ZXIgc3BlY2lmaWVzIHRoYXQgdGhlIGdpdmVuIHR5cGUgYmVsb25ncyB0byBhIHBhcnRpY3VsYXJcbiAqIGBJbmplY3RvckRlZmAsIGBOZ01vZHVsZWAsIG9yIGEgc3BlY2lhbCBzY29wZSAoZS5nLiBgJ3Jvb3QnYCkuIEEgdmFsdWUgb2YgYG51bGxgIGluZGljYXRlc1xuICogdGhhdCB0aGUgaW5qZWN0YWJsZSBkb2VzIG5vdCBiZWxvbmcgdG8gYW55IHNjb3BlLlxuICpcbiAqIFRoaXMgdHlwZSBpcyB0eXBpY2FsbHkgZ2VuZXJhdGVkIGJ5IHRoZSBBbmd1bGFyIGNvbXBpbGVyLCBidXQgY2FuIGJlIGhhbmQtd3JpdHRlbiBpZiBuZWVkZWQuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVEZWY8VD4ge1xuICBwcm92aWRlZEluOiBJbmplY3RvclR5cGU8YW55Pnwncm9vdCd8J2FueSd8bnVsbDtcbiAgZmFjdG9yeTogKCkgPT4gVDtcbn1cblxuLyoqXG4gKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgcHJvdmlkZXJzIHRvIGJlIGluY2x1ZGVkIGluIGFuIGBJbmplY3RvcmAgYXMgd2VsbCBhcyBob3cgdGhlIGdpdmVuIHR5cGVcbiAqIHdoaWNoIGNhcnJpZXMgdGhlIGluZm9ybWF0aW9uIHNob3VsZCBiZSBjcmVhdGVkIGJ5IHRoZSBESSBzeXN0ZW0uXG4gKlxuICogQW4gYEluamVjdG9yRGVmYCBjYW4gaW1wb3J0IG90aGVyIHR5cGVzIHdoaWNoIGhhdmUgYEluamVjdG9yRGVmc2AsIGZvcm1pbmcgYSBkZWVwIG5lc3RlZFxuICogc3RydWN0dXJlIG9mIHByb3ZpZGVycyB3aXRoIGEgZGVmaW5lZCBwcmlvcml0eSAoaWRlbnRpY2FsbHkgdG8gaG93IGBOZ01vZHVsZWBzIGFsc28gaGF2ZVxuICogYW4gaW1wb3J0L2RlcGVuZGVuY3kgc3RydWN0dXJlKS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0b3JEZWY8VD4ge1xuICBmYWN0b3J5OiAoKSA9PiBUO1xuXG4gIC8vIFRPRE8oYWx4aHViKTogTmFycm93IGRvd24gdGhlIHR5cGUgaGVyZSBvbmNlIGRlY29yYXRvcnMgcHJvcGVybHkgY2hhbmdlIHRoZSByZXR1cm4gdHlwZSBvZiB0aGVcbiAgLy8gY2xhc3MgdGhleSBhcmUgZGVjb3JhdGluZyAodG8gYWRkIHRoZSBuZ0luamVjdGFibGVEZWYgcHJvcGVydHkgZm9yIGV4YW1wbGUpLlxuICBwcm92aWRlcnM6IChUeXBlPGFueT58VmFsdWVQcm92aWRlcnxFeGlzdGluZ1Byb3ZpZGVyfEZhY3RvcnlQcm92aWRlcnxDb25zdHJ1Y3RvclByb3ZpZGVyfFxuICAgICAgICAgICAgICBTdGF0aWNDbGFzc1Byb3ZpZGVyfENsYXNzUHJvdmlkZXJ8YW55W10pW107XG5cbiAgaW1wb3J0czogKEluamVjdG9yVHlwZTxhbnk+fEluamVjdG9yVHlwZVdpdGhQcm92aWRlcnM8YW55PilbXTtcbn1cblxuLyoqXG4gKiBBIGBUeXBlYCB3aGljaCBoYXMgYW4gYEluamVjdGFibGVEZWZgIHN0YXRpYyBmaWVsZC5cbiAqXG4gKiBgSW5qZWN0YWJsZURlZlR5cGVgcyBjb250YWluIHRoZWlyIG93biBEZXBlbmRlbmN5IEluamVjdGlvbiBtZXRhZGF0YSBhbmQgYXJlIHVzYWJsZSBpbiBhblxuICogYEluamVjdG9yRGVmYC1iYXNlZCBgU3RhdGljSW5qZWN0b3IuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7IG5nSW5qZWN0YWJsZURlZjogSW5qZWN0YWJsZURlZjxUPjsgfVxuXG4vKipcbiAqIEEgdHlwZSB3aGljaCBoYXMgYW4gYEluamVjdG9yRGVmYCBzdGF0aWMgZmllbGQuXG4gKlxuICogYEluamVjdG9yRGVmVHlwZXNgIGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSBhIGBTdGF0aWNJbmplY3RvcmAuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdG9yVHlwZTxUPiBleHRlbmRzIFR5cGU8VD4geyBuZ0luamVjdG9yRGVmOiBJbmplY3RvckRlZjxUPjsgfVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgYEluamVjdG9yRGVmYCBlcXVpdmFsZW50IG9mIGEgYE1vZHVsZVdpdGhQcm92aWRlcnNgLCBhbiBgSW5qZWN0b3JEZWZUeXBlYCB3aXRoIGFuXG4gKiBhc3NvY2lhdGVkIGFycmF5IG9mIHByb3ZpZGVycy5cbiAqXG4gKiBPYmplY3RzIG9mIHRoaXMgdHlwZSBjYW4gYmUgbGlzdGVkIGluIHRoZSBpbXBvcnRzIHNlY3Rpb24gb2YgYW4gYEluamVjdG9yRGVmYC5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczxUPiB7XG4gIG5nTW9kdWxlOiBJbmplY3RvclR5cGU8VD47XG4gIHByb3ZpZGVycz86IChUeXBlPGFueT58VmFsdWVQcm92aWRlcnxFeGlzdGluZ1Byb3ZpZGVyfEZhY3RvcnlQcm92aWRlcnxDb25zdHJ1Y3RvclByb3ZpZGVyfFxuICAgICAgICAgICAgICAgU3RhdGljQ2xhc3NQcm92aWRlcnxDbGFzc1Byb3ZpZGVyfGFueVtdKVtdO1xufVxuXG5cbi8qKlxuICogQ29uc3RydWN0IGFuIGBJbmplY3RhYmxlRGVmYCB3aGljaCBkZWZpbmVzIGhvdyBhIHRva2VuIHdpbGwgYmUgY29uc3RydWN0ZWQgYnkgdGhlIERJIHN5c3RlbSwgYW5kXG4gKiBpbiB3aGljaCBpbmplY3RvcnMgKGlmIGFueSkgaXQgd2lsbCBiZSBhdmFpbGFibGUuXG4gKlxuICogVGhpcyBzaG91bGQgYmUgYXNzaWduZWQgdG8gYSBzdGF0aWMgYG5nSW5qZWN0YWJsZURlZmAgZmllbGQgb24gYSB0eXBlLCB3aGljaCB3aWxsIHRoZW4gYmUgYW5cbiAqIGBJbmplY3RhYmxlVHlwZWAuXG4gKlxuICogT3B0aW9uczpcbiAqICogYHByb3ZpZGVkSW5gIGRldGVybWluZXMgd2hpY2ggaW5qZWN0b3JzIHdpbGwgaW5jbHVkZSB0aGUgaW5qZWN0YWJsZSwgYnkgZWl0aGVyIGFzc29jaWF0aW5nIGl0XG4gKiAgIHdpdGggYW4gYEBOZ01vZHVsZWAgb3Igb3RoZXIgYEluamVjdG9yVHlwZWAsIG9yIGJ5IHNwZWNpZnlpbmcgdGhhdCB0aGlzIGluamVjdGFibGUgc2hvdWxkIGJlXG4gKiAgIHByb3ZpZGVkIGluIHRoZSBgJ3Jvb3QnYCBpbmplY3Rvciwgd2hpY2ggd2lsbCBiZSB0aGUgYXBwbGljYXRpb24tbGV2ZWwgaW5qZWN0b3IgaW4gbW9zdCBhcHBzLlxuICogKiBgZmFjdG9yeWAgZ2l2ZXMgdGhlIHplcm8gYXJndW1lbnQgZnVuY3Rpb24gd2hpY2ggd2lsbCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGluamVjdGFibGUuXG4gKiAgIFRoZSBmYWN0b3J5IGNhbiBjYWxsIGBpbmplY3RgIHRvIGFjY2VzcyB0aGUgYEluamVjdG9yYCBhbmQgcmVxdWVzdCBpbmplY3Rpb24gb2YgZGVwZW5kZW5jaWVzLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZUluamVjdGFibGU8VD4ob3B0czoge1xuICBwcm92aWRlZEluPzogVHlwZTxhbnk+fCAncm9vdCcgfCBudWxsLFxuICBmYWN0b3J5OiAoKSA9PiBULFxufSk6IEluamVjdGFibGVEZWY8VD4ge1xuICByZXR1cm4ge1xuICAgIHByb3ZpZGVkSW46IChvcHRzLnByb3ZpZGVkSW4gYXMgSW5qZWN0b3JUeXBlPGFueT58ICdyb290JyB8IG51bGwgfCB1bmRlZmluZWQpIHx8IG51bGwsXG4gICAgZmFjdG9yeTogb3B0cy5mYWN0b3J5LFxuICB9O1xufVxuXG4vKipcbiAqIENvbnN0cnVjdCBhbiBgSW5qZWN0b3JEZWZgIHdoaWNoIGNvbmZpZ3VyZXMgYW4gaW5qZWN0b3IuXG4gKlxuICogVGhpcyBzaG91bGQgYmUgYXNzaWduZWQgdG8gYSBzdGF0aWMgYG5nSW5qZWN0b3JEZWZgIGZpZWxkIG9uIGEgdHlwZSwgd2hpY2ggd2lsbCB0aGVuIGJlIGFuXG4gKiBgSW5qZWN0b3JUeXBlYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICogYGZhY3RvcnlgOiBhbiBgSW5qZWN0b3JUeXBlYCBpcyBhbiBpbnN0YW50aWFibGUgdHlwZSwgc28gYSB6ZXJvIGFyZ3VtZW50IGBmYWN0b3J5YCBmdW5jdGlvbiB0b1xuICogICBjcmVhdGUgdGhlIHR5cGUgbXVzdCBiZSBwcm92aWRlZC4gSWYgdGhhdCBmYWN0b3J5IGZ1bmN0aW9uIG5lZWRzIHRvIGluamVjdCBhcmd1bWVudHMsIGl0IGNhblxuICogICB1c2UgdGhlIGBpbmplY3RgIGZ1bmN0aW9uLlxuICogKiBgcHJvdmlkZXJzYDogYW4gb3B0aW9uYWwgYXJyYXkgb2YgcHJvdmlkZXJzIHRvIGFkZCB0byB0aGUgaW5qZWN0b3IuIEVhY2ggcHJvdmlkZXIgbXVzdFxuICogICBlaXRoZXIgaGF2ZSBhIGZhY3Rvcnkgb3IgcG9pbnQgdG8gYSB0eXBlIHdoaWNoIGhhcyBhbiBgbmdJbmplY3RhYmxlRGVmYCBzdGF0aWMgcHJvcGVydHkgKHRoZVxuICogICB0eXBlIG11c3QgYmUgYW4gYEluamVjdGFibGVUeXBlYCkuXG4gKiAqIGBpbXBvcnRzYDogYW4gb3B0aW9uYWwgYXJyYXkgb2YgaW1wb3J0cyBvZiBvdGhlciBgSW5qZWN0b3JUeXBlYHMgb3IgYEluamVjdG9yVHlwZVdpdGhNb2R1bGVgc1xuICogICB3aG9zZSBwcm92aWRlcnMgd2lsbCBhbHNvIGJlIGFkZGVkIHRvIHRoZSBpbmplY3Rvci4gTG9jYWxseSBwcm92aWRlZCB0eXBlcyB3aWxsIG92ZXJyaWRlXG4gKiAgIHByb3ZpZGVycyBmcm9tIGltcG9ydHMuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lSW5qZWN0b3Iob3B0aW9uczoge2ZhY3Rvcnk6ICgpID0+IGFueSwgcHJvdmlkZXJzPzogYW55W10sIGltcG9ydHM/OiBhbnlbXX0pOlxuICAgIEluamVjdG9yRGVmPGFueT4ge1xuICByZXR1cm4ge1xuICAgIGZhY3Rvcnk6IG9wdGlvbnMuZmFjdG9yeSxcbiAgICBwcm92aWRlcnM6IG9wdGlvbnMucHJvdmlkZXJzIHx8IFtdLFxuICAgIGltcG9ydHM6IG9wdGlvbnMuaW1wb3J0cyB8fCBbXSxcbiAgfTtcbn1cbiJdfQ==