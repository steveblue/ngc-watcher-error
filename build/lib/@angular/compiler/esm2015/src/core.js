/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export const createInject = makeMetadataFactory('Inject', (token) => ({ token }));
export const createInjectionToken = makeMetadataFactory('InjectionToken', (desc) => ({ _desc: desc, ngInjectableDef: undefined }));
export const createAttribute = makeMetadataFactory('Attribute', (attributeName) => ({ attributeName }));
export const createContentChildren = makeMetadataFactory('ContentChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: false, descendants: false }, data)));
export const createContentChild = makeMetadataFactory('ContentChild', (selector, data = {}) => (Object.assign({ selector, first: true, isViewQuery: false, descendants: true }, data)));
export const createViewChildren = makeMetadataFactory('ViewChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: true, descendants: true }, data)));
export const createViewChild = makeMetadataFactory('ViewChild', (selector, data) => (Object.assign({ selector, first: true, isViewQuery: true, descendants: true }, data)));
export const createDirective = makeMetadataFactory('Directive', (dir = {}) => dir);
export var ViewEncapsulation;
(function (ViewEncapsulation) {
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
})(ViewEncapsulation || (ViewEncapsulation = {}));
export var ChangeDetectionStrategy;
(function (ChangeDetectionStrategy) {
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
})(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
export const createComponent = makeMetadataFactory('Component', (c = {}) => (Object.assign({ changeDetection: ChangeDetectionStrategy.Default }, c)));
export const createPipe = makeMetadataFactory('Pipe', (p) => (Object.assign({ pure: true }, p)));
export const createInput = makeMetadataFactory('Input', (bindingPropertyName) => ({ bindingPropertyName }));
export const createOutput = makeMetadataFactory('Output', (bindingPropertyName) => ({ bindingPropertyName }));
export const createHostBinding = makeMetadataFactory('HostBinding', (hostPropertyName) => ({ hostPropertyName }));
export const createHostListener = makeMetadataFactory('HostListener', (eventName, args) => ({ eventName, args }));
export const createNgModule = makeMetadataFactory('NgModule', (ngModule) => ngModule);
export const createInjectable = makeMetadataFactory('Injectable', (injectable = {}) => injectable);
export const CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
export const NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
export const createOptional = makeMetadataFactory('Optional');
export const createSelf = makeMetadataFactory('Self');
export const createSkipSelf = makeMetadataFactory('SkipSelf');
export const createHost = makeMetadataFactory('Host');
export const Type = Function;
export var SecurityContext;
(function (SecurityContext) {
    SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
    SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
    SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
    SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
    SecurityContext[SecurityContext["URL"] = 4] = "URL";
    SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
})(SecurityContext || (SecurityContext = {}));
export var MissingTranslationStrategy;
(function (MissingTranslationStrategy) {
    MissingTranslationStrategy[MissingTranslationStrategy["Error"] = 0] = "Error";
    MissingTranslationStrategy[MissingTranslationStrategy["Warning"] = 1] = "Warning";
    MissingTranslationStrategy[MissingTranslationStrategy["Ignore"] = 2] = "Ignore";
})(MissingTranslationStrategy || (MissingTranslationStrategy = {}));
function makeMetadataFactory(name, props) {
    const factory = (...args) => {
        const values = props ? props(...args) : {};
        return Object.assign({ ngMetadataName: name }, values);
    };
    factory.isTypeOf = (obj) => obj && obj.ngMetadataName === name;
    factory.ngMetadataName = name;
    return factory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQVNILE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxtQkFBbUIsQ0FBUyxRQUFRLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0YsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsbUJBQW1CLENBQ25ELGdCQUFnQixFQUFFLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBR3JGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FDeEIsbUJBQW1CLENBQVksV0FBVyxFQUFFLENBQUMsYUFBc0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztBQVUvRixNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxtQkFBbUIsQ0FDcEQsaUJBQWlCLEVBQ2pCLENBQUMsUUFBYyxFQUFFLE9BQVksRUFBRSxFQUFFLEVBQUUsQ0FDL0IsaUJBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxJQUFLLElBQUksRUFBRSxDQUFDLENBQUM7QUFDckYsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsbUJBQW1CLENBQ2pELGNBQWMsRUFBRSxDQUFDLFFBQWMsRUFBRSxPQUFZLEVBQUUsRUFBRSxFQUFFLENBQy9CLGlCQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksSUFBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ25HLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLG1CQUFtQixDQUNqRCxjQUFjLEVBQUUsQ0FBQyxRQUFjLEVBQUUsT0FBWSxFQUFFLEVBQUUsRUFBRSxDQUMvQixpQkFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLElBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNuRyxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQzlDLFdBQVcsRUFBRSxDQUFDLFFBQWEsRUFBRSxJQUFTLEVBQUUsRUFBRSxDQUN6QixpQkFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLElBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztBQVkvRixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQ3hCLG1CQUFtQixDQUFZLFdBQVcsRUFBRSxDQUFDLE1BQWlCLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFnQjlFLE1BQU0sQ0FBTixJQUFZLGlCQUlYO0FBSkQsV0FBWSxpQkFBaUI7SUFDM0IsaUVBQVksQ0FBQTtJQUNaLDZEQUFVLENBQUE7SUFDVix5REFBUSxDQUFBO0FBQ1YsQ0FBQyxFQUpXLGlCQUFpQixLQUFqQixpQkFBaUIsUUFJNUI7QUFFRCxNQUFNLENBQU4sSUFBWSx1QkFHWDtBQUhELFdBQVksdUJBQXVCO0lBQ2pDLHlFQUFVLENBQUE7SUFDViwyRUFBVyxDQUFBO0FBQ2IsQ0FBQyxFQUhXLHVCQUF1QixLQUF2Qix1QkFBdUIsUUFHbEM7QUFFRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQzlDLFdBQVcsRUFBRSxDQUFDLElBQWUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxpQkFBRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTyxJQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFNcEcsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLG1CQUFtQixDQUFPLE1BQU0sRUFBRSxDQUFDLENBQU8sRUFBRSxFQUFFLENBQUMsaUJBQUUsSUFBSSxFQUFFLElBQUksSUFBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRy9GLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FDcEIsbUJBQW1CLENBQVEsT0FBTyxFQUFFLENBQUMsbUJBQTRCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUduRyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsbUJBQW1CLENBQzNDLFFBQVEsRUFBRSxDQUFDLG1CQUE0QixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFHekUsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsbUJBQW1CLENBQ2hELGFBQWEsRUFBRSxDQUFDLGdCQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFNeEUsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsbUJBQW1CLENBQ2pELGNBQWMsRUFBRSxDQUFDLFNBQWtCLEVBQUUsSUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztBQVlsRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQ3ZCLG1CQUFtQixDQUFXLFVBQVUsRUFBRSxDQUFDLFFBQWtCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBY2hGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUN6QixtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxhQUF5QixFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBR25GLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFtQjtJQUNwRCxJQUFJLEVBQUUsaUJBQWlCO0NBQ3hCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBbUI7SUFDOUMsSUFBSSxFQUFFLGtCQUFrQjtDQUN6QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0RCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBR3RELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUM7QUFFN0IsTUFBTSxDQUFOLElBQVksZUFPWDtBQVBELFdBQVksZUFBZTtJQUN6QixxREFBUSxDQUFBO0lBQ1IscURBQVEsQ0FBQTtJQUNSLHVEQUFTLENBQUE7SUFDVCx5REFBVSxDQUFBO0lBQ1YsbURBQU8sQ0FBQTtJQUNQLHFFQUFnQixDQUFBO0FBQ2xCLENBQUMsRUFQVyxlQUFlLEtBQWYsZUFBZSxRQU8xQjtBQWdHRCxNQUFNLENBQU4sSUFBWSwwQkFJWDtBQUpELFdBQVksMEJBQTBCO0lBQ3BDLDZFQUFTLENBQUE7SUFDVCxpRkFBVyxDQUFBO0lBQ1gsK0VBQVUsQ0FBQTtBQUNaLENBQUMsRUFKVywwQkFBMEIsS0FBMUIsMEJBQTBCLFFBSXJDO0FBUUQsNkJBQWdDLElBQVksRUFBRSxLQUE2QjtJQUN6RSxNQUFNLE9BQU8sR0FBUSxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUU7UUFDdEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNDLE1BQU0saUJBQ0osY0FBYyxFQUFFLElBQUksSUFDakIsTUFBTSxFQUNUO0lBQ0osQ0FBQyxDQUFDO0lBQ0YsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDO0lBQ3BFLE9BQU8sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gQXR0ZW50aW9uOlxuLy8gVGhpcyBmaWxlIGR1cGxpY2F0ZXMgdHlwZXMgYW5kIHZhbHVlcyBmcm9tIEBhbmd1bGFyL2NvcmVcbi8vIHNvIHRoYXQgd2UgYXJlIGFibGUgdG8gbWFrZSBAYW5ndWxhci9jb21waWxlciBpbmRlcGVuZGVudCBvZiBAYW5ndWxhci9jb3JlLlxuLy8gVGhpcyBpcyBpbXBvcnRhbnQgdG8gcHJldmVudCBhIGJ1aWxkIGN5Y2xlLCBhcyBAYW5ndWxhci9jb3JlIG5lZWRzIHRvXG4vLyBiZSBjb21waWxlZCB3aXRoIHRoZSBjb21waWxlci5cblxuZXhwb3J0IGludGVyZmFjZSBJbmplY3QgeyB0b2tlbjogYW55OyB9XG5leHBvcnQgY29uc3QgY3JlYXRlSW5qZWN0ID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxJbmplY3Q+KCdJbmplY3QnLCAodG9rZW46IGFueSkgPT4gKHt0b2tlbn0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVJbmplY3Rpb25Ub2tlbiA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8b2JqZWN0PihcbiAgICAnSW5qZWN0aW9uVG9rZW4nLCAoZGVzYzogc3RyaW5nKSA9PiAoe19kZXNjOiBkZXNjLCBuZ0luamVjdGFibGVEZWY6IHVuZGVmaW5lZH0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGUgeyBhdHRyaWJ1dGVOYW1lPzogc3RyaW5nOyB9XG5leHBvcnQgY29uc3QgY3JlYXRlQXR0cmlidXRlID1cbiAgICBtYWtlTWV0YWRhdGFGYWN0b3J5PEF0dHJpYnV0ZT4oJ0F0dHJpYnV0ZScsIChhdHRyaWJ1dGVOYW1lPzogc3RyaW5nKSA9PiAoe2F0dHJpYnV0ZU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnkge1xuICBkZXNjZW5kYW50czogYm9vbGVhbjtcbiAgZmlyc3Q6IGJvb2xlYW47XG4gIHJlYWQ6IGFueTtcbiAgaXNWaWV3UXVlcnk6IGJvb2xlYW47XG4gIHNlbGVjdG9yOiBhbnk7XG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDb250ZW50Q2hpbGRyZW4gPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFF1ZXJ5PihcbiAgICAnQ29udGVudENoaWxkcmVuJyxcbiAgICAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogZmFsc2UsIGlzVmlld1F1ZXJ5OiBmYWxzZSwgZGVzY2VuZGFudHM6IGZhbHNlLCAuLi5kYXRhfSkpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnRlbnRDaGlsZCA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8UXVlcnk+KFxuICAgICdDb250ZW50Q2hpbGQnLCAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IHRydWUsIGlzVmlld1F1ZXJ5OiBmYWxzZSwgZGVzY2VuZGFudHM6IHRydWUsIC4uLmRhdGF9KSk7XG5leHBvcnQgY29uc3QgY3JlYXRlVmlld0NoaWxkcmVuID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxRdWVyeT4oXG4gICAgJ1ZpZXdDaGlsZHJlbicsIChzZWxlY3Rvcj86IGFueSwgZGF0YTogYW55ID0ge30pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogZmFsc2UsIGlzVmlld1F1ZXJ5OiB0cnVlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVWaWV3Q2hpbGQgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFF1ZXJ5PihcbiAgICAnVmlld0NoaWxkJywgKHNlbGVjdG9yOiBhbnksIGRhdGE6IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICh7c2VsZWN0b3IsIGZpcnN0OiB0cnVlLCBpc1ZpZXdRdWVyeTogdHJ1ZSwgZGVzY2VuZGFudHM6IHRydWUsIC4uLmRhdGF9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlyZWN0aXZlIHtcbiAgc2VsZWN0b3I/OiBzdHJpbmc7XG4gIGlucHV0cz86IHN0cmluZ1tdO1xuICBvdXRwdXRzPzogc3RyaW5nW107XG4gIGhvc3Q/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbiAgZXhwb3J0QXM/OiBzdHJpbmc7XG4gIHF1ZXJpZXM/OiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgZ3VhcmRzPzoge1trZXk6IHN0cmluZ106IGFueX07XG59XG5leHBvcnQgY29uc3QgY3JlYXRlRGlyZWN0aXZlID1cbiAgICBtYWtlTWV0YWRhdGFGYWN0b3J5PERpcmVjdGl2ZT4oJ0RpcmVjdGl2ZScsIChkaXI6IERpcmVjdGl2ZSA9IHt9KSA9PiBkaXIpO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvbmVudCBleHRlbmRzIERpcmVjdGl2ZSB7XG4gIGNoYW5nZURldGVjdGlvbj86IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xuICB2aWV3UHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbiAgbW9kdWxlSWQ/OiBzdHJpbmc7XG4gIHRlbXBsYXRlVXJsPzogc3RyaW5nO1xuICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgc3R5bGVVcmxzPzogc3RyaW5nW107XG4gIHN0eWxlcz86IHN0cmluZ1tdO1xuICBhbmltYXRpb25zPzogYW55W107XG4gIGVuY2Fwc3VsYXRpb24/OiBWaWV3RW5jYXBzdWxhdGlvbjtcbiAgaW50ZXJwb2xhdGlvbj86IFtzdHJpbmcsIHN0cmluZ107XG4gIGVudHJ5Q29tcG9uZW50cz86IEFycmF5PFR5cGV8YW55W10+O1xuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzPzogYm9vbGVhbjtcbn1cbmV4cG9ydCBlbnVtIFZpZXdFbmNhcHN1bGF0aW9uIHtcbiAgRW11bGF0ZWQgPSAwLFxuICBOYXRpdmUgPSAxLFxuICBOb25lID0gMlxufVxuXG5leHBvcnQgZW51bSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB7XG4gIE9uUHVzaCA9IDAsXG4gIERlZmF1bHQgPSAxXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDb21wb25lbnQgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PENvbXBvbmVudD4oXG4gICAgJ0NvbXBvbmVudCcsIChjOiBDb21wb25lbnQgPSB7fSkgPT4gKHtjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsIC4uLmN9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGlwZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcHVyZT86IGJvb2xlYW47XG59XG5leHBvcnQgY29uc3QgY3JlYXRlUGlwZSA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8UGlwZT4oJ1BpcGUnLCAocDogUGlwZSkgPT4gKHtwdXJlOiB0cnVlLCAuLi5wfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIElucHV0IHsgYmluZGluZ1Byb3BlcnR5TmFtZT86IHN0cmluZzsgfVxuZXhwb3J0IGNvbnN0IGNyZWF0ZUlucHV0ID1cbiAgICBtYWtlTWV0YWRhdGFGYWN0b3J5PElucHV0PignSW5wdXQnLCAoYmluZGluZ1Byb3BlcnR5TmFtZT86IHN0cmluZykgPT4gKHtiaW5kaW5nUHJvcGVydHlOYW1lfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE91dHB1dCB7IGJpbmRpbmdQcm9wZXJ0eU5hbWU/OiBzdHJpbmc7IH1cbmV4cG9ydCBjb25zdCBjcmVhdGVPdXRwdXQgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PE91dHB1dD4oXG4gICAgJ091dHB1dCcsIChiaW5kaW5nUHJvcGVydHlOYW1lPzogc3RyaW5nKSA9PiAoe2JpbmRpbmdQcm9wZXJ0eU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdEJpbmRpbmcgeyBob3N0UHJvcGVydHlOYW1lPzogc3RyaW5nOyB9XG5leHBvcnQgY29uc3QgY3JlYXRlSG9zdEJpbmRpbmcgPSBtYWtlTWV0YWRhdGFGYWN0b3J5PEhvc3RCaW5kaW5nPihcbiAgICAnSG9zdEJpbmRpbmcnLCAoaG9zdFByb3BlcnR5TmFtZT86IHN0cmluZykgPT4gKHtob3N0UHJvcGVydHlOYW1lfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhvc3RMaXN0ZW5lciB7XG4gIGV2ZW50TmFtZT86IHN0cmluZztcbiAgYXJncz86IHN0cmluZ1tdO1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZUhvc3RMaXN0ZW5lciA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8SG9zdExpc3RlbmVyPihcbiAgICAnSG9zdExpc3RlbmVyJywgKGV2ZW50TmFtZT86IHN0cmluZywgYXJncz86IHN0cmluZ1tdKSA9PiAoe2V2ZW50TmFtZSwgYXJnc30pKTtcblxuZXhwb3J0IGludGVyZmFjZSBOZ01vZHVsZSB7XG4gIHByb3ZpZGVycz86IFByb3ZpZGVyW107XG4gIGRlY2xhcmF0aW9ucz86IEFycmF5PFR5cGV8YW55W10+O1xuICBpbXBvcnRzPzogQXJyYXk8VHlwZXxNb2R1bGVXaXRoUHJvdmlkZXJzfGFueVtdPjtcbiAgZXhwb3J0cz86IEFycmF5PFR5cGV8YW55W10+O1xuICBlbnRyeUNvbXBvbmVudHM/OiBBcnJheTxUeXBlfGFueVtdPjtcbiAgYm9vdHN0cmFwPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIHNjaGVtYXM/OiBBcnJheTxTY2hlbWFNZXRhZGF0YXxhbnlbXT47XG4gIGlkPzogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5nTW9kdWxlID1cbiAgICBtYWtlTWV0YWRhdGFGYWN0b3J5PE5nTW9kdWxlPignTmdNb2R1bGUnLCAobmdNb2R1bGU6IE5nTW9kdWxlKSA9PiBuZ01vZHVsZSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gIG5nTW9kdWxlOiBUeXBlO1xuICBwcm92aWRlcnM/OiBQcm92aWRlcltdO1xufVxuZXhwb3J0IGludGVyZmFjZSBJbmplY3RhYmxlIHtcbiAgcHJvdmlkZWRJbj86IFR5cGV8J3Jvb3QnfGFueTtcbiAgdXNlQ2xhc3M/OiBUeXBlfGFueTtcbiAgdXNlRXhpc3Rpbmc/OiBUeXBlfGFueTtcbiAgdXNlVmFsdWU/OiBhbnk7XG4gIHVzZUZhY3Rvcnk/OiBUeXBlfGFueTtcbiAgZGVwcz86IEFycmF5PFR5cGV8YW55W10+O1xufVxuZXhwb3J0IGNvbnN0IGNyZWF0ZUluamVjdGFibGUgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3RvcnkoJ0luamVjdGFibGUnLCAoaW5qZWN0YWJsZTogSW5qZWN0YWJsZSA9IHt9KSA9PiBpbmplY3RhYmxlKTtcbmV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hTWV0YWRhdGEgeyBuYW1lOiBzdHJpbmc7IH1cblxuZXhwb3J0IGNvbnN0IENVU1RPTV9FTEVNRU5UU19TQ0hFTUE6IFNjaGVtYU1ldGFkYXRhID0ge1xuICBuYW1lOiAnY3VzdG9tLWVsZW1lbnRzJ1xufTtcblxuZXhwb3J0IGNvbnN0IE5PX0VSUk9SU19TQ0hFTUE6IFNjaGVtYU1ldGFkYXRhID0ge1xuICBuYW1lOiAnbm8tZXJyb3JzLXNjaGVtYSdcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVPcHRpb25hbCA9IG1ha2VNZXRhZGF0YUZhY3RvcnkoJ09wdGlvbmFsJyk7XG5leHBvcnQgY29uc3QgY3JlYXRlU2VsZiA9IG1ha2VNZXRhZGF0YUZhY3RvcnkoJ1NlbGYnKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVTa2lwU2VsZiA9IG1ha2VNZXRhZGF0YUZhY3RvcnkoJ1NraXBTZWxmJyk7XG5leHBvcnQgY29uc3QgY3JlYXRlSG9zdCA9IG1ha2VNZXRhZGF0YUZhY3RvcnkoJ0hvc3QnKTtcblxuZXhwb3J0IGludGVyZmFjZSBUeXBlIGV4dGVuZHMgRnVuY3Rpb24geyBuZXcgKC4uLmFyZ3M6IGFueVtdKTogYW55OyB9XG5leHBvcnQgY29uc3QgVHlwZSA9IEZ1bmN0aW9uO1xuXG5leHBvcnQgZW51bSBTZWN1cml0eUNvbnRleHQge1xuICBOT05FID0gMCxcbiAgSFRNTCA9IDEsXG4gIFNUWUxFID0gMixcbiAgU0NSSVBUID0gMyxcbiAgVVJMID0gNCxcbiAgUkVTT1VSQ0VfVVJMID0gNSxcbn1cblxuZXhwb3J0IHR5cGUgUHJvdmlkZXIgPSBhbnk7XG5cbmV4cG9ydCBjb25zdCBlbnVtIE5vZGVGbGFncyB7XG4gIE5vbmUgPSAwLFxuICBUeXBlRWxlbWVudCA9IDEgPDwgMCxcbiAgVHlwZVRleHQgPSAxIDw8IDEsXG4gIFByb2plY3RlZFRlbXBsYXRlID0gMSA8PCAyLFxuICBDYXRSZW5kZXJOb2RlID0gVHlwZUVsZW1lbnQgfCBUeXBlVGV4dCxcbiAgVHlwZU5nQ29udGVudCA9IDEgPDwgMyxcbiAgVHlwZVBpcGUgPSAxIDw8IDQsXG4gIFR5cGVQdXJlQXJyYXkgPSAxIDw8IDUsXG4gIFR5cGVQdXJlT2JqZWN0ID0gMSA8PCA2LFxuICBUeXBlUHVyZVBpcGUgPSAxIDw8IDcsXG4gIENhdFB1cmVFeHByZXNzaW9uID0gVHlwZVB1cmVBcnJheSB8IFR5cGVQdXJlT2JqZWN0IHwgVHlwZVB1cmVQaXBlLFxuICBUeXBlVmFsdWVQcm92aWRlciA9IDEgPDwgOCxcbiAgVHlwZUNsYXNzUHJvdmlkZXIgPSAxIDw8IDksXG4gIFR5cGVGYWN0b3J5UHJvdmlkZXIgPSAxIDw8IDEwLFxuICBUeXBlVXNlRXhpc3RpbmdQcm92aWRlciA9IDEgPDwgMTEsXG4gIExhenlQcm92aWRlciA9IDEgPDwgMTIsXG4gIFByaXZhdGVQcm92aWRlciA9IDEgPDwgMTMsXG4gIFR5cGVEaXJlY3RpdmUgPSAxIDw8IDE0LFxuICBDb21wb25lbnQgPSAxIDw8IDE1LFxuICBDYXRQcm92aWRlck5vRGlyZWN0aXZlID1cbiAgICAgIFR5cGVWYWx1ZVByb3ZpZGVyIHwgVHlwZUNsYXNzUHJvdmlkZXIgfCBUeXBlRmFjdG9yeVByb3ZpZGVyIHwgVHlwZVVzZUV4aXN0aW5nUHJvdmlkZXIsXG4gIENhdFByb3ZpZGVyID0gQ2F0UHJvdmlkZXJOb0RpcmVjdGl2ZSB8IFR5cGVEaXJlY3RpdmUsXG4gIE9uSW5pdCA9IDEgPDwgMTYsXG4gIE9uRGVzdHJveSA9IDEgPDwgMTcsXG4gIERvQ2hlY2sgPSAxIDw8IDE4LFxuICBPbkNoYW5nZXMgPSAxIDw8IDE5LFxuICBBZnRlckNvbnRlbnRJbml0ID0gMSA8PCAyMCxcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCA9IDEgPDwgMjEsXG4gIEFmdGVyVmlld0luaXQgPSAxIDw8IDIyLFxuICBBZnRlclZpZXdDaGVja2VkID0gMSA8PCAyMyxcbiAgRW1iZWRkZWRWaWV3cyA9IDEgPDwgMjQsXG4gIENvbXBvbmVudFZpZXcgPSAxIDw8IDI1LFxuICBUeXBlQ29udGVudFF1ZXJ5ID0gMSA8PCAyNixcbiAgVHlwZVZpZXdRdWVyeSA9IDEgPDwgMjcsXG4gIFN0YXRpY1F1ZXJ5ID0gMSA8PCAyOCxcbiAgRHluYW1pY1F1ZXJ5ID0gMSA8PCAyOSxcbiAgVHlwZU1vZHVsZVByb3ZpZGVyID0gMSA8PCAzMCxcbiAgQ2F0UXVlcnkgPSBUeXBlQ29udGVudFF1ZXJ5IHwgVHlwZVZpZXdRdWVyeSxcblxuICAvLyBtdXR1YWxseSBleGNsdXNpdmUgdmFsdWVzLi4uXG4gIFR5cGVzID0gQ2F0UmVuZGVyTm9kZSB8IFR5cGVOZ0NvbnRlbnQgfCBUeXBlUGlwZSB8IENhdFB1cmVFeHByZXNzaW9uIHwgQ2F0UHJvdmlkZXIgfCBDYXRRdWVyeVxufVxuXG5leHBvcnQgY29uc3QgZW51bSBEZXBGbGFncyB7XG4gIE5vbmUgPSAwLFxuICBTa2lwU2VsZiA9IDEgPDwgMCxcbiAgT3B0aW9uYWwgPSAxIDw8IDEsXG4gIFNlbGYgPSAxIDw8IDIsXG4gIFZhbHVlID0gMSA8PCAzLFxufVxuXG4vKiogSW5qZWN0aW9uIGZsYWdzIGZvciBESS4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEluamVjdEZsYWdzIHtcbiAgRGVmYXVsdCA9IDAsXG5cbiAgLyoqIFNraXAgdGhlIG5vZGUgdGhhdCBpcyByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2tpcFNlbGYgPSAxIDw8IDAsXG4gIC8qKiBEb24ndCBkZXNjZW5kIGludG8gYW5jZXN0b3JzIG9mIHRoZSBub2RlIHJlcXVlc3RpbmcgaW5qZWN0aW9uLiAqL1xuICBTZWxmID0gMSA8PCAxLFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBBcmd1bWVudFR5cGUge0lubGluZSA9IDAsIER5bmFtaWMgPSAxfVxuXG5leHBvcnQgY29uc3QgZW51bSBCaW5kaW5nRmxhZ3Mge1xuICBUeXBlRWxlbWVudEF0dHJpYnV0ZSA9IDEgPDwgMCxcbiAgVHlwZUVsZW1lbnRDbGFzcyA9IDEgPDwgMSxcbiAgVHlwZUVsZW1lbnRTdHlsZSA9IDEgPDwgMixcbiAgVHlwZVByb3BlcnR5ID0gMSA8PCAzLFxuICBTeW50aGV0aWNQcm9wZXJ0eSA9IDEgPDwgNCxcbiAgU3ludGhldGljSG9zdFByb3BlcnR5ID0gMSA8PCA1LFxuICBDYXRTeW50aGV0aWNQcm9wZXJ0eSA9IFN5bnRoZXRpY1Byb3BlcnR5IHwgU3ludGhldGljSG9zdFByb3BlcnR5LFxuXG4gIC8vIG11dHVhbGx5IGV4Y2x1c2l2ZSB2YWx1ZXMuLi5cbiAgVHlwZXMgPSBUeXBlRWxlbWVudEF0dHJpYnV0ZSB8IFR5cGVFbGVtZW50Q2xhc3MgfCBUeXBlRWxlbWVudFN0eWxlIHwgVHlwZVByb3BlcnR5XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFF1ZXJ5QmluZGluZ1R5cGUge0ZpcnN0ID0gMCwgQWxsID0gMX1cblxuZXhwb3J0IGNvbnN0IGVudW0gUXVlcnlWYWx1ZVR5cGUge1xuICBFbGVtZW50UmVmID0gMCxcbiAgUmVuZGVyRWxlbWVudCA9IDEsXG4gIFRlbXBsYXRlUmVmID0gMixcbiAgVmlld0NvbnRhaW5lclJlZiA9IDMsXG4gIFByb3ZpZGVyID0gNFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBWaWV3RmxhZ3Mge1xuICBOb25lID0gMCxcbiAgT25QdXNoID0gMSA8PCAxLFxufVxuXG5leHBvcnQgZW51bSBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneSB7XG4gIEVycm9yID0gMCxcbiAgV2FybmluZyA9IDEsXG4gIElnbm9yZSA9IDIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YWRhdGFGYWN0b3J5PFQ+IHtcbiAgKC4uLmFyZ3M6IGFueVtdKTogVDtcbiAgaXNUeXBlT2Yob2JqOiBhbnkpOiBvYmogaXMgVDtcbiAgbmdNZXRhZGF0YU5hbWU6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gbWFrZU1ldGFkYXRhRmFjdG9yeTxUPihuYW1lOiBzdHJpbmcsIHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogTWV0YWRhdGFGYWN0b3J5PFQ+IHtcbiAgY29uc3QgZmFjdG9yeTogYW55ID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgY29uc3QgdmFsdWVzID0gcHJvcHMgPyBwcm9wcyguLi5hcmdzKSA6IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBuZ01ldGFkYXRhTmFtZTogbmFtZSxcbiAgICAgIC4uLnZhbHVlcyxcbiAgICB9O1xuICB9O1xuICBmYWN0b3J5LmlzVHlwZU9mID0gKG9iajogYW55KSA9PiBvYmogJiYgb2JqLm5nTWV0YWRhdGFOYW1lID09PSBuYW1lO1xuICBmYWN0b3J5Lm5nTWV0YWRhdGFOYW1lID0gbmFtZTtcbiAgcmV0dXJuIGZhY3Rvcnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGUge1xuICBjaGlsZHJlbj86IFJvdXRlW107XG4gIGxvYWRDaGlsZHJlbj86IHN0cmluZ3xUeXBlfGFueTtcbn1cbiJdfQ==