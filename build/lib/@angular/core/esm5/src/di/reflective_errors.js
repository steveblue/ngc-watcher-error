/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { wrappedError } from '../error_handler';
import { ERROR_ORIGINAL_ERROR } from '../errors';
import { stringify } from '../util';
function findFirstClosedCycle(keys) {
    var res = [];
    for (var i = 0; i < keys.length; ++i) {
        if (res.indexOf(keys[i]) > -1) {
            res.push(keys[i]);
            return res;
        }
        res.push(keys[i]);
    }
    return res;
}
function constructResolvingPath(keys) {
    if (keys.length > 1) {
        var reversed = findFirstClosedCycle(keys.slice().reverse());
        var tokenStrs = reversed.map(function (k) { return stringify(k.token); });
        return ' (' + tokenStrs.join(' -> ') + ')';
    }
    return '';
}
function injectionError(injector, key, constructResolvingMessage, originalError) {
    var keys = [key];
    var errMsg = constructResolvingMessage(keys);
    var error = (originalError ? wrappedError(errMsg, originalError) : Error(errMsg));
    error.addKey = addKey;
    error.keys = keys;
    error.injectors = [injector];
    error.constructResolvingMessage = constructResolvingMessage;
    error[ERROR_ORIGINAL_ERROR] = originalError;
    return error;
}
function addKey(injector, key) {
    this.injectors.push(injector);
    this.keys.push(key);
    // Note: This updated message won't be reflected in the `.stack` property
    this.message = this.constructResolvingMessage(this.keys);
}
/**
 * Thrown when trying to retrieve a dependency by key from {@link Injector}, but the
 * {@link Injector} does not have a {@link Provider} for the given key.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b:B) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 */
export function noProviderError(injector, key) {
    return injectionError(injector, key, function (keys) {
        var first = stringify(keys[0].token);
        return "No provider for " + first + "!" + constructResolvingPath(keys);
    });
}
/**
 * Thrown when dependencies form a cycle.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
 *
 * ```typescript
 * var injector = Injector.resolveAndCreate([
 *   {provide: "one", useFactory: (two) => "two", deps: [[new Inject("two")]]},
 *   {provide: "two", useFactory: (one) => "one", deps: [[new Inject("one")]]}
 * ]);
 *
 * expect(() => injector.get("one")).toThrowError();
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 */
export function cyclicDependencyError(injector, key) {
    return injectionError(injector, key, function (keys) {
        return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
    });
}
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor() {
 *     throw new Error('message');
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([A]);

 * try {
 *   injector.get(A);
 * } catch (e) {
 *   expect(e instanceof InstantiationError).toBe(true);
 *   expect(e.originalException.message).toEqual("message");
 *   expect(e.originalStack).toBeDefined();
 * }
 * ```
 */
export function instantiationError(injector, originalException, originalStack, key) {
    return injectionError(injector, key, function (keys) {
        var first = stringify(keys[0].token);
        return originalException.message + ": Error during instantiation of " + first + "!" + constructResolvingPath(keys) + ".";
    }, originalException);
}
/**
 * Thrown when an object other then {@link Provider} (or `Type`) is passed to {@link Injector}
 * creation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
 * ```
 */
export function invalidProviderError(provider) {
    return Error("Invalid provider - only instances of Provider and Type are allowed, got: " + provider);
}
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 *
 * This error is also thrown when the class not marked with {@link Injectable} has parameter types.
 *
 * ```typescript
 * class B {}
 *
 * class A {
 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
 * }
 *
 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
 * ```
 * @stable
 */
export function noAnnotationError(typeOrFunc, params) {
    var signature = [];
    for (var i = 0, ii = params.length; i < ii; i++) {
        var parameter = params[i];
        if (!parameter || parameter.length == 0) {
            signature.push('?');
        }
        else {
            signature.push(parameter.map(stringify).join(' '));
        }
    }
    return Error('Cannot resolve all parameters for \'' + stringify(typeOrFunc) + '\'(' +
        signature.join(', ') + '). ' +
        'Make sure that all the parameters are decorated with Inject or have valid type annotations and that \'' +
        stringify(typeOrFunc) + '\' is decorated with Injectable.');
}
/**
 * Thrown when getting an object by index.
 *
 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
 *
 * ```typescript
 * class A {}
 *
 * var injector = Injector.resolveAndCreate([A]);
 *
 * expect(() => injector.getAt(100)).toThrowError();
 * ```
 * @stable
 */
export function outOfBoundsError(index) {
    return Error("Index " + index + " is out-of-bounds.");
}
// TODO: add a working example after alpha38 is released
/**
 * Thrown when a multi provider and a regular provider are bound to the same token.
 *
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate([
 *   { provide: "Strings", useValue: "string1", multi: true},
 *   { provide: "Strings", useValue: "string2", multi: false}
 * ])).toThrowError();
 * ```
 */
export function mixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
    return Error("Cannot mix multi providers and regular providers, got: " + provider1 + " " + provider2);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdGl2ZV9lcnJvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9yZWZsZWN0aXZlX2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBUUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxvQkFBb0IsRUFBbUIsTUFBTSxXQUFXLENBQUM7QUFFakUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUtsQyw4QkFBOEIsSUFBVztJQUN2QyxJQUFNLEdBQUcsR0FBVSxFQUFFLENBQUM7SUFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDO1NBQ1o7UUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25CO0lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztDQUNaO0FBRUQsZ0NBQWdDLElBQVc7SUFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQU0sUUFBUSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzlELElBQU0sU0FBUyxHQUFHLFFB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IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge3dyYXBwZWRFcnJvcn0gZnJvbSAnLi4vZXJyb3JfaGFuZGxlcic7XG5pbXBvcnQge0VSUk9SX09SSUdJTkFMX0VSUk9SLCBnZXRPcmlnaW5hbEVycm9yfSBmcm9tICcuLi9lcnJvcnMnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7c3RyaW5naWZ5fSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtSZWZsZWN0aXZlSW5qZWN0b3J9IGZyb20gJy4vcmVmbGVjdGl2ZV9pbmplY3Rvcic7XG5pbXBvcnQge1JlZmxlY3RpdmVLZXl9IGZyb20gJy4vcmVmbGVjdGl2ZV9rZXknO1xuXG5mdW5jdGlvbiBmaW5kRmlyc3RDbG9zZWRDeWNsZShrZXlzOiBhbnlbXSk6IGFueVtdIHtcbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAocmVzLmluZGV4T2Yoa2V5c1tpXSkgPiAtMSkge1xuICAgICAgcmVzLnB1c2goa2V5c1tpXSk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICByZXMucHVzaChrZXlzW2ldKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RSZXNvbHZpbmdQYXRoKGtleXM6IGFueVtdKTogc3RyaW5nIHtcbiAgaWYgKGtleXMubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IHJldmVyc2VkID0gZmluZEZpcnN0Q2xvc2VkQ3ljbGUoa2V5cy5zbGljZSgpLnJldmVyc2UoKSk7XG4gICAgY29uc3QgdG9rZW5TdHJzID0gcmV2ZXJzZWQubWFwKGsgPT4gc3RyaW5naWZ5KGsudG9rZW4pKTtcbiAgICByZXR1cm4gJyAoJyArIHRva2VuU3Rycy5qb2luKCcgLT4gJykgKyAnKSc7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGtleXM6IFJlZmxlY3RpdmVLZXlbXTtcbiAgaW5qZWN0b3JzOiBSZWZsZWN0aXZlSW5qZWN0b3JbXTtcbiAgY29uc3RydWN0UmVzb2x2aW5nTWVzc2FnZTogKGtleXM6IFJlZmxlY3RpdmVLZXlbXSkgPT4gc3RyaW5nO1xuICBhZGRLZXkoaW5qZWN0b3I6IFJlZmxlY3RpdmVJbmplY3Rvciwga2V5OiBSZWZsZWN0aXZlS2V5KTogdm9pZDtcbn1cblxuZnVuY3Rpb24gaW5qZWN0aW9uRXJyb3IoXG4gICAgaW5qZWN0b3I6IFJlZmxlY3RpdmVJbmplY3Rvciwga2V5OiBSZWZsZWN0aXZlS2V5LFxuICAgIGNvbnN0cnVjdFJlc29sdmluZ01lc3NhZ2U6IChrZXlzOiBSZWZsZWN0aXZlS2V5W10pID0+IHN0cmluZyxcbiAgICBvcmlnaW5hbEVycm9yPzogRXJyb3IpOiBJbmplY3Rpb25FcnJvciB7XG4gIGNvbnN0IGtleXMgPSBba2V5XTtcbiAgY29uc3QgZXJyTXNnID0gY29uc3RydWN0UmVzb2x2aW5nTWVzc2FnZShrZXlzKTtcbiAgY29uc3QgZXJyb3IgPVxuICAgICAgKG9yaWdpbmFsRXJyb3IgPyB3cmFwcGVkRXJyb3IoZXJyTXNnLCBvcmlnaW5hbEVycm9yKSA6IEVycm9yKGVyck1zZykpIGFzIEluamVjdGlvbkVycm9yO1xuICBlcnJvci5hZGRLZXkgPSBhZGRLZXk7XG4gIGVycm9yLmtleXMgPSBrZXlzO1xuICBlcnJvci5pbmplY3RvcnMgPSBbaW5qZWN0b3JdO1xuICBlcnJvci5jb25zdHJ1Y3RSZXNvbHZpbmdNZXNzYWdlID0gY29uc3RydWN0UmVzb2x2aW5nTWVzc2FnZTtcbiAgKGVycm9yIGFzIGFueSlbRVJST1JfT1JJR0lOQUxfRVJST1JdID0gb3JpZ2luYWxFcnJvcjtcbiAgcmV0dXJuIGVycm9yO1xufVxuXG5mdW5jdGlvbiBhZGRLZXkodGhpczogSW5qZWN0aW9uRXJyb3IsIGluamVjdG9yOiBSZWZsZWN0aXZlSW5qZWN0b3IsIGtleTogUmVmbGVjdGl2ZUtleSk6IHZvaWQge1xuICB0aGlzLmluamVjdG9ycy5wdXNoKGluamVjdG9yKTtcbiAgdGhpcy5rZXlzLnB1c2goa2V5KTtcbiAgLy8gTm90ZTogVGhpcyB1cGRhdGVkIG1lc3NhZ2Ugd29uJ3QgYmUgcmVmbGVjdGVkIGluIHRoZSBgLnN0YWNrYCBwcm9wZXJ0eVxuICB0aGlzLm1lc3NhZ2UgPSB0aGlzLmNvbnN0cnVjdFJlc29sdmluZ01lc3NhZ2UodGhpcy5rZXlzKTtcbn1cblxuLyoqXG4gKiBUaHJvd24gd2hlbiB0cnlpbmcgdG8gcmV0cmlldmUgYSBkZXBlbmRlbmN5IGJ5IGtleSBmcm9tIHtAbGluayBJbmplY3Rvcn0sIGJ1dCB0aGVcbiAqIHtAbGluayBJbmplY3Rvcn0gZG9lcyBub3QgaGF2ZSBhIHtAbGluayBQcm92aWRlcn0gZm9yIHRoZSBnaXZlbiBrZXkuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L3ZxOEQzRlJCOWFHYm5XSnF0RVBFP3A9cHJldmlldykpXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogY2xhc3MgQSB7XG4gKiAgIGNvbnN0cnVjdG9yKGI6Qikge31cbiAqIH1cbiAqXG4gKiBleHBlY3QoKCkgPT4gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbQV0pKS50b1Rocm93RXJyb3IoKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9Qcm92aWRlckVycm9yKGluamVjdG9yOiBSZWZsZWN0aXZlSW5qZWN0b3IsIGtleTogUmVmbGVjdGl2ZUtleSk6IEluamVjdGlvbkVycm9yIHtcbiAgcmV0dXJuIGluamVjdGlvbkVycm9yKGluamVjdG9yLCBrZXksIGZ1bmN0aW9uKGtleXM6IFJlZmxlY3RpdmVLZXlbXSkge1xuICAgIGNvbnN0IGZpcnN0ID0gc3RyaW5naWZ5KGtleXNbMF0udG9rZW4pO1xuICAgIHJldHVybiBgTm8gcHJvdmlkZXIgZm9yICR7Zmlyc3R9ISR7Y29uc3RydWN0UmVzb2x2aW5nUGF0aChrZXlzKX1gO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd24gd2hlbiBkZXBlbmRlbmNpZXMgZm9ybSBhIGN5Y2xlLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC93WVFkTm9zMFR6cWwzZWkxRVY5aj9wPWluZm8pKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHZhciBpbmplY3RvciA9IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW1xuICogICB7cHJvdmlkZTogXCJvbmVcIiwgdXNlRmFjdG9yeTogKHR3bykgPT4gXCJ0d29cIiwgZGVwczogW1tuZXcgSW5qZWN0KFwidHdvXCIpXV19LFxuICogICB7cHJvdmlkZTogXCJ0d29cIiwgdXNlRmFjdG9yeTogKG9uZSkgPT4gXCJvbmVcIiwgZGVwczogW1tuZXcgSW5qZWN0KFwib25lXCIpXV19XG4gKiBdKTtcbiAqXG4gKiBleHBlY3QoKCkgPT4gaW5qZWN0b3IuZ2V0KFwib25lXCIpKS50b1Rocm93RXJyb3IoKTtcbiAqIGBgYFxuICpcbiAqIFJldHJpZXZpbmcgYEFgIG9yIGBCYCB0aHJvd3MgYSBgQ3ljbGljRGVwZW5kZW5jeUVycm9yYCBhcyB0aGUgZ3JhcGggYWJvdmUgY2Fubm90IGJlIGNvbnN0cnVjdGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3ljbGljRGVwZW5kZW5jeUVycm9yKFxuICAgIGluamVjdG9yOiBSZWZsZWN0aXZlSW5qZWN0b3IsIGtleTogUmVmbGVjdGl2ZUtleSk6IEluamVjdGlvbkVycm9yIHtcbiAgcmV0dXJuIGluamVjdGlvbkVycm9yKGluamVjdG9yLCBrZXksIGZ1bmN0aW9uKGtleXM6IFJlZmxlY3RpdmVLZXlbXSkge1xuICAgIHJldHVybiBgQ2Fubm90IGluc3RhbnRpYXRlIGN5Y2xpYyBkZXBlbmRlbmN5ISR7Y29uc3RydWN0UmVzb2x2aW5nUGF0aChrZXlzKX1gO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd24gd2hlbiBhIGNvbnN0cnVjdGluZyB0eXBlIHJldHVybnMgd2l0aCBhbiBFcnJvci5cbiAqXG4gKiBUaGUgYEluc3RhbnRpYXRpb25FcnJvcmAgY2xhc3MgY29udGFpbnMgdGhlIG9yaWdpbmFsIGVycm9yIHBsdXMgdGhlIGRlcGVuZGVuY3kgZ3JhcGggd2hpY2ggY2F1c2VkXG4gKiB0aGlzIG9iamVjdCB0byBiZSBpbnN0YW50aWF0ZWQuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0LzdhV1lkY3FUUXNQMGVOcUVkVUFmP3A9cHJldmlldykpXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogY2xhc3MgQSB7XG4gKiAgIGNvbnN0cnVjdG9yKCkge1xuICogICAgIHRocm93IG5ldyBFcnJvcignbWVzc2FnZScpO1xuICogICB9XG4gKiB9XG4gKlxuICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbQV0pO1xuXG4gKiB0cnkge1xuICogICBpbmplY3Rvci5nZXQoQSk7XG4gKiB9IGNhdGNoIChlKSB7XG4gKiAgIGV4cGVjdChlIGluc3RhbmNlb2YgSW5zdGFudGlhdGlvbkVycm9yKS50b0JlKHRydWUpO1xuICogICBleHBlY3QoZS5vcmlnaW5hbEV4Y2VwdGlvbi5tZXNzYWdlKS50b0VxdWFsKFwibWVzc2FnZVwiKTtcbiAqICAgZXhwZWN0KGUub3JpZ2luYWxTdGFjaykudG9CZURlZmluZWQoKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGlvbkVycm9yKFxuICAgIGluamVjdG9yOiBSZWZsZWN0aXZlSW5qZWN0b3IsIG9yaWdpbmFsRXhjZXB0aW9uOiBhbnksIG9yaWdpbmFsU3RhY2s6IGFueSxcbiAgICBrZXk6IFJlZmxlY3RpdmVLZXkpOiBJbmplY3Rpb25FcnJvciB7XG4gIHJldHVybiBpbmplY3Rpb25FcnJvcihpbmplY3Rvciwga2V5LCBmdW5jdGlvbihrZXlzOiBSZWZsZWN0aXZlS2V5W10pIHtcbiAgICBjb25zdCBmaXJzdCA9IHN0cmluZ2lmeShrZXlzWzBdLnRva2VuKTtcbiAgICByZXR1cm4gYCR7b3JpZ2luYWxFeGNlcHRpb24ubWVzc2FnZX06IEVycm9yIGR1cmluZyBpbnN0YW50aWF0aW9uIG9mICR7Zmlyc3R9ISR7Y29uc3RydWN0UmVzb2x2aW5nUGF0aChrZXlzKX0uYDtcbiAgfSwgb3JpZ2luYWxFeGNlcHRpb24pO1xufVxuXG4vKipcbiAqIFRocm93biB3aGVuIGFuIG9iamVjdCBvdGhlciB0aGVuIHtAbGluayBQcm92aWRlcn0gKG9yIGBUeXBlYCkgaXMgcGFzc2VkIHRvIHtAbGluayBJbmplY3Rvcn1cbiAqIGNyZWF0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9ZYXRDRmJQQU1DTDBKU1NRNG12SD9wPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGV4cGVjdCgoKSA9PiBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtcIm5vdCBhIHR5cGVcIl0pKS50b1Rocm93RXJyb3IoKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW52YWxpZFByb3ZpZGVyRXJyb3IocHJvdmlkZXI6IGFueSkge1xuICByZXR1cm4gRXJyb3IoXG4gICAgICBgSW52YWxpZCBwcm92aWRlciAtIG9ubHkgaW5zdGFuY2VzIG9mIFByb3ZpZGVyIGFuZCBUeXBlIGFyZSBhbGxvd2VkLCBnb3Q6ICR7cHJvdmlkZXJ9YCk7XG59XG5cbi8qKlxuICogVGhyb3duIHdoZW4gdGhlIGNsYXNzIGhhcyBubyBhbm5vdGF0aW9uIGluZm9ybWF0aW9uLlxuICpcbiAqIExhY2sgb2YgYW5ub3RhdGlvbiBpbmZvcm1hdGlvbiBwcmV2ZW50cyB0aGUge0BsaW5rIEluamVjdG9yfSBmcm9tIGRldGVybWluaW5nIHdoaWNoIGRlcGVuZGVuY2llc1xuICogbmVlZCB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvckhuWnRsTlM3dkpPUFE2cGNWa20/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjbGFzcyBBIHtcbiAqICAgY29uc3RydWN0b3IoYikge31cbiAqIH1cbiAqXG4gKiBleHBlY3QoKCkgPT4gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbQV0pKS50b1Rocm93RXJyb3IoKTtcbiAqIGBgYFxuICpcbiAqIFRoaXMgZXJyb3IgaXMgYWxzbyB0aHJvd24gd2hlbiB0aGUgY2xhc3Mgbm90IG1hcmtlZCB3aXRoIHtAbGluayBJbmplY3RhYmxlfSBoYXMgcGFyYW1ldGVyIHR5cGVzLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNsYXNzIEIge31cbiAqXG4gKiBjbGFzcyBBIHtcbiAqICAgY29uc3RydWN0b3IoYjpCKSB7fSAvLyBubyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcGFyYW1ldGVyIHR5cGVzIG9mIEEgaXMgYXZhaWxhYmxlIGF0IHJ1bnRpbWUuXG4gKiB9XG4gKlxuICogZXhwZWN0KCgpID0+IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0EsQl0pKS50b1Rocm93RXJyb3IoKTtcbiAqIGBgYFxuICogQHN0YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9Bbm5vdGF0aW9uRXJyb3IodHlwZU9yRnVuYzogVHlwZTxhbnk+fCBGdW5jdGlvbiwgcGFyYW1zOiBhbnlbXVtdKTogRXJyb3Ige1xuICBjb25zdCBzaWduYXR1cmU6IHN0cmluZ1tdID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBpaSA9IHBhcmFtcy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgY29uc3QgcGFyYW1ldGVyID0gcGFyYW1zW2ldO1xuICAgIGlmICghcGFyYW1ldGVyIHx8IHBhcmFtZXRlci5sZW5ndGggPT0gMCkge1xuICAgICAgc2lnbmF0dXJlLnB1c2goJz8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2lnbmF0dXJlLnB1c2gocGFyYW1ldGVyLm1hcChzdHJpbmdpZnkpLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBFcnJvcihcbiAgICAgICdDYW5ub3QgcmVzb2x2ZSBhbGwgcGFyYW1ldGVycyBmb3IgXFwnJyArIHN0cmluZ2lmeSh0eXBlT3JGdW5jKSArICdcXCcoJyArXG4gICAgICBzaWduYXR1cmUuam9pbignLCAnKSArICcpLiAnICtcbiAgICAgICdNYWtlIHN1cmUgdGhhdCBhbGwgdGhlIHBhcmFtZXRlcnMgYXJlIGRlY29yYXRlZCB3aXRoIEluamVjdCBvciBoYXZlIHZhbGlkIHR5cGUgYW5ub3RhdGlvbnMgYW5kIHRoYXQgXFwnJyArXG4gICAgICBzdHJpbmdpZnkodHlwZU9yRnVuYykgKyAnXFwnIGlzIGRlY29yYXRlZCB3aXRoIEluamVjdGFibGUuJyk7XG59XG5cbi8qKlxuICogVGhyb3duIHdoZW4gZ2V0dGluZyBhbiBvYmplY3QgYnkgaW5kZXguXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2JSczBTWDJPVFFpSnpxdmpnbDhQP3A9cHJldmlldykpXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogY2xhc3MgQSB7fVxuICpcbiAqIHZhciBpbmplY3RvciA9IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0FdKTtcbiAqXG4gKiBleHBlY3QoKCkgPT4gaW5qZWN0b3IuZ2V0QXQoMTAwKSkudG9UaHJvd0Vycm9yKCk7XG4gKiBgYGBcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG91dE9mQm91bmRzRXJyb3IoaW5kZXg6IG51bWJlcikge1xuICByZXR1cm4gRXJyb3IoYEluZGV4ICR7aW5kZXh9IGlzIG91dC1vZi1ib3VuZHMuYCk7XG59XG5cbi8vIFRPRE86IGFkZCBhIHdvcmtpbmcgZXhhbXBsZSBhZnRlciBhbHBoYTM4IGlzIHJlbGVhc2VkXG4vKipcbiAqIFRocm93biB3aGVuIGEgbXVsdGkgcHJvdmlkZXIgYW5kIGEgcmVndWxhciBwcm92aWRlciBhcmUgYm91bmQgdG8gdGhlIHNhbWUgdG9rZW4uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBleHBlY3QoKCkgPT4gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXG4gKiAgIHsgcHJvdmlkZTogXCJTdHJpbmdzXCIsIHVzZVZhbHVlOiBcInN0cmluZzFcIiwgbXVsdGk6IHRydWV9LFxuICogICB7IHByb3ZpZGU6IFwiU3RyaW5nc1wiLCB1c2VWYWx1ZTogXCJzdHJpbmcyXCIsIG11bHRpOiBmYWxzZX1cbiAqIF0pKS50b1Rocm93RXJyb3IoKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5nTXVsdGlQcm92aWRlcnNXaXRoUmVndWxhclByb3ZpZGVyc0Vycm9yKFxuICAgIHByb3ZpZGVyMTogYW55LCBwcm92aWRlcjI6IGFueSk6IEVycm9yIHtcbiAgcmV0dXJuIEVycm9yKGBDYW5ub3QgbWl4IG11bHRpIHByb3ZpZGVycyBhbmQgcmVndWxhciBwcm92aWRlcnMsIGdvdDogJHtwcm92aWRlcjF9ICR7cHJvdmlkZXIyfWApO1xufVxuIl19