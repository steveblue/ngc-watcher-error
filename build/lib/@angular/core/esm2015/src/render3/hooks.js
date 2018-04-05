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
import { assertEqual } from './assert';
/**
 * If this is the first template pass, any ngOnInit or ngDoCheck hooks will be queued into
 * TView.initHooks during directiveCreate.
 *
 * The directive index and hook type are encoded into one number (1st bit: type, remaining bits:
 * directive index), then saved in the even indices of the initHooks array. The odd indices
 * hold the hook functions themselves.
 *
 * @param {?} index The index of the directive in LView.data
 * @param {?} onInit
 * @param {?} doCheck
 * @param {?} tView The current TView
 * @return {?}
 */
export function queueInitHooks(index, onInit, doCheck, tView) {
    ngDevMode &&
        assertEqual(tView.firstTemplatePass, true, 'Should only be called on first template pass');
    if (onInit) {
        (tView.initHooks || (tView.initHooks = [])).push(index, onInit);
    }
    if (doCheck) {
        (tView.initHooks || (tView.initHooks = [])).push(index, doCheck);
        (tView.checkHooks || (tView.checkHooks = [])).push(index, doCheck);
    }
}
/**
 * Loops through the directives on a node and queues all their hooks except ngOnInit
 * and ngDoCheck, which are queued separately in directiveCreate.
 * @param {?} flags
 * @param {?} currentView
 * @return {?}
 */
export function queueLifecycleHooks(flags, currentView) {
    const /** @type {?} */ tView = currentView.tView;
    if (tView.firstTemplatePass === true) {
        const /** @type {?} */ start = flags >> 13 /* INDX_SHIFT */;
        const /** @type {?} */ size = (flags & 8190 /* SIZE_MASK */) >> 1 /* SIZE_SHIFT */;
        const /** @type {?} */ end = start + size;
        // It's necessary to loop through the directives at elementEnd() (rather than processing in
        // directiveCreate) so we can preserve the current hook order. Content, view, and destroy
        // hooks for projected components and directives must be called *before* their hosts.
        for (let /** @type {?} */ i = start; i < end; i++) {
            const /** @type {?} */ def = (/** @type {?} */ (((tView.directives))[i]));
            queueContentHooks(def, tView, i);
            queueViewHooks(def, tView, i);
            queueDestroyHooks(def, tView, i);
        }
    }
}
/**
 * Queues afterContentInit and afterContentChecked hooks on TView
 * @param {?} def
 * @param {?} tView
 * @param {?} i
 * @return {?}
 */
function queueContentHooks(def, tView, i) {
    if (def.afterContentInit) {
        (tView.contentHooks || (tView.contentHooks = [])).push(i, def.afterContentInit);
    }
    if (def.afterContentChecked) {
        (tView.contentHooks || (tView.contentHooks = [])).push(i, def.afterContentChecked);
        (tView.contentCheckHooks || (tView.contentCheckHooks = [])).push(i, def.afterContentChecked);
    }
}
/**
 * Queues afterViewInit and afterViewChecked hooks on TView
 * @param {?} def
 * @param {?} tView
 * @param {?} i
 * @return {?}
 */
function queueViewHooks(def, tView, i) {
    if (def.afterViewInit) {
        (tView.viewHooks || (tView.viewHooks = [])).push(i, def.afterViewInit);
    }
    if (def.afterViewChecked) {
        (tView.viewHooks || (tView.viewHooks = [])).push(i, def.afterViewChecked);
        (tView.viewCheckHooks || (tView.viewCheckHooks = [])).push(i, def.afterViewChecked);
    }
}
/**
 * Queues onDestroy hooks on TView
 * @param {?} def
 * @param {?} tView
 * @param {?} i
 * @return {?}
 */
function queueDestroyHooks(def, tView, i) {
    if (def.onDestroy != null) {
        (tView.destroyHooks || (tView.destroyHooks = [])).push(i, def.onDestroy);
    }
}
/**
 * Calls onInit and doCheck calls if they haven't already been called.
 *
 * @param {?} currentView The current view
 * @param {?} tView
 * @param {?} creationMode
 * @return {?}
 */
export function executeInitHooks(currentView, tView, creationMode) {
    if (currentView.lifecycleStage === 1 /* INIT */) {
        executeHooks(/** @type {?} */ ((currentView.directives)), tView.initHooks, tView.checkHooks, creationMode);
        currentView.lifecycleStage = 2 /* AFTER_INIT */;
    }
}
/**
 * Iterates over afterViewInit and afterViewChecked functions and calls them.
 *
 * @param {?} data
 * @param {?} allHooks
 * @param {?} checkHooks
 * @param {?} creationMode
 * @return {?}
 */
export function executeHooks(data, allHooks, checkHooks, creationMode) {
    const /** @type {?} */ hooksToCall = creationMode ? allHooks : checkHooks;
    if (hooksToCall) {
        callHooks(data, hooksToCall);
    }
}
/**
 * Calls lifecycle hooks with their contexts, skipping init hooks if it's not
 * creation mode.
 *
 * @param {?} data
 * @param {?} arr The array in which the hooks are found
 * @return {?}
 */
export function callHooks(data, arr) {
    for (let /** @type {?} */ i = 0; i < arr.length; i += 2) {
        (/** @type {?} */ (arr[i | 1])).call(data[/** @type {?} */ (arr[i])]);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2hvb2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBaUJyQyxNQUFNLHlCQUNGLEtBQWEsRUFBRSxNQUEyQixFQUFFLE9BQTRCLEVBQUUsS0FBWTtJQUN4RixTQUFTO1FBQ0wsV0FBVyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsOENBQThDLENBQUMsQ0FBQztJQUMvRixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDakU7SUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakUsQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDcEU7Q0FDRjs7Ozs7Ozs7QUFNRCxNQUFNLDhCQUE4QixLQUFhLEVBQUUsV0FBa0I7SUFDbkUsdUJBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDaEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxD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LDJCQUEyQixXQUFrQixFQUFFLEtBQVksRUFBRSxZQUFxQjtJQUN0RixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxpQkFBd0IsQ0FBQyxDQUFDLENBQUM7UUFDdkQsWUFBWSxvQkFBQyxXQUFXLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN4RixXQUFXLENBQUMsY0FBYyxxQkFBNEIsQ0FBQztLQUN4RDtDQUNGOzs7Ozs7Ozs7O0FBT0QsTUFBTSx1QkFDRixJQUFXLEVBQUUsUUFBeUIsRUFBRSxVQUEyQixFQUNuRSxZQUFxQjtJQUN2Qix1QkFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN6RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDOUI7Q0FDRjs7Ozs7Ozs7O0FBU0QsTUFBTSxvQkFBb0IsSUFBVyxFQUFFLEdBQWE7SUFDbEQsR0FBRyxDQUFDLENBQUMscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdkMsbUJBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQWMsRUFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVcsRUFBQyxDQUFDLENBQUM7S0FDeEQ7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHthc3NlcnRFcXVhbH0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHtEaXJlY3RpdmVEZWZ9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7VE5vZGVGbGFnc30gZnJvbSAnLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtIb29rRGF0YSwgTFZpZXcsIExpZmVjeWNsZVN0YWdlLCBUVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuXG4vKipcbiAqIElmIHRoaXMgaXMgdGhlIGZpcnN0IHRlbXBsYXRlIHBhc3MsIGFueSBuZ09uSW5pdCBvciBuZ0RvQ2hlY2sgaG9va3Mgd2lsbCBiZSBxdWV1ZWQgaW50b1xuICogVFZpZXcuaW5pdEhvb2tzIGR1cmluZyBkaXJlY3RpdmVDcmVhdGUuXG4gKlxuICogVGhlIGRpcmVjdGl2ZSBpbmRleCBhbmQgaG9vayB0eXBlIGFyZSBlbmNvZGVkIGludG8gb25lIG51bWJlciAoMXN0IGJpdDogdHlwZSwgcmVtYWluaW5nIGJpdHM6XG4gKiBkaXJlY3RpdmUgaW5kZXgpLCB0aGVuIHNhdmVkIGluIHRoZSBldmVuIGluZGljZXMgb2YgdGhlIGluaXRIb29rcyBhcnJheS4gVGhlIG9kZCBpbmRpY2VzXG4gKiBob2xkIHRoZSBob29rIGZ1bmN0aW9ucyB0aGVtc2VsdmVzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGRpcmVjdGl2ZSBpbiBMVmlldy5kYXRhXG4gKiBAcGFyYW0gaG9va3MgVGhlIHN0YXRpYyBob29rcyBtYXAgb24gdGhlIGRpcmVjdGl2ZSBkZWZcbiAqIEBwYXJhbSB0VmlldyBUaGUgY3VycmVudCBUVmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gcXVldWVJbml0SG9va3MoXG4gICAgaW5kZXg6IG51bWJlciwgb25Jbml0OiAoKCkgPT4gdm9pZCkgfCBudWxsLCBkb0NoZWNrOiAoKCkgPT4gdm9pZCkgfCBudWxsLCB0VmlldzogVFZpZXcpOiB2b2lkIHtcbiAgbmdEZXZNb2RlICYmXG4gICAgICBhc3NlcnRFcXVhbCh0Vmlldy5maXJzdFRlbXBsYXRlUGFzcywgdHJ1ZSwgJ1Nob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBmaXJzdCB0ZW1wbGF0ZSBwYXNzJyk7XG4gIGlmIChvbkluaXQpIHtcbiAgICAodFZpZXcuaW5pdEhvb2tzIHx8ICh0Vmlldy5pbml0SG9va3MgPSBbXSkpLnB1c2goaW5kZXgsIG9uSW5pdCk7XG4gIH1cblxuICBpZiAoZG9DaGVjaykge1xuICAgICh0Vmlldy5pbml0SG9va3MgfHwgKHRWaWV3LmluaXRIb29rcyA9IFtdKSkucHVzaChpbmRleCwgZG9DaGVjayk7XG4gICAgKHRWaWV3LmNoZWNrSG9va3MgfHwgKHRWaWV3LmNoZWNrSG9va3MgPSBbXSkpLnB1c2goaW5kZXgsIGRvQ2hlY2spO1xuICB9XG59XG5cbi8qKlxuICogTG9vcHMgdGhyb3VnaCB0aGUgZGlyZWN0aXZlcyBvbiBhIG5vZGUgYW5kIHF1ZXVlcyBhbGwgdGhlaXIgaG9va3MgZXhjZXB0IG5nT25Jbml0XG4gKiBhbmQgbmdEb0NoZWNrLCB3aGljaCBhcmUgcXVldWVkIHNlcGFyYXRlbHkgaW4gZGlyZWN0aXZlQ3JlYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVldWVMaWZlY3ljbGVIb29rcyhmbGFnczogbnVtYmVyLCBjdXJyZW50VmlldzogTFZpZXcpOiB2b2lkIHtcbiAgY29uc3QgdFZpZXcgPSBjdXJyZW50Vmlldy50VmlldztcbiAgaWYgKHRWaWV3LmZpcnN0VGVtcGxhdGVQYXNzID09PSB0cnVlKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBmbGFncyA+PiBUTm9kZUZsYWdzLklORFhfU0hJRlQ7XG4gICAgY29uc3Qgc2l6ZSA9IChmbGFncyAmIFROb2RlRmxhZ3MuU0laRV9NQVNLKSA+PiBUTm9kZUZsYWdzLlNJWkVfU0hJRlQ7XG4gICAgY29uc3QgZW5kID0gc3RhcnQgKyBzaXplO1xuXG4gICAgLy8gSXQncyBuZWNlc3NhcnkgdG8gbG9vcCB0aHJvdWdoIHRoZSBkaXJlY3RpdmVzIGF0IGVsZW1lbnRFbmQoKSAocmF0aGVyIHRoYW4gcHJvY2Vzc2luZyBpblxuICAgIC8vIGRpcmVjdGl2ZUNyZWF0ZSkgc28gd2UgY2FuIHByZXNlcnZlIHRoZSBjdXJyZW50IGhvb2sgb3JkZXIuIENvbnRlbnQsIHZpZXcsIGFuZCBkZXN0cm95XG4gICAgLy8gaG9va3MgZm9yIHByb2plY3RlZCBjb21wb25lbnRzIGFuZCBkaXJlY3RpdmVzIG11c3QgYmUgY2FsbGVkICpiZWZvcmUqIHRoZWlyIGhvc3RzLlxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICBjb25zdCBkZWYgPSAodFZpZXcuZGlyZWN0aXZlcyAhW2ldIGFzIERpcmVjdGl2ZURlZjxhbnk+KTtcbiAgICAgIHF1ZXVlQ29udGVudEhvb2tzKGRlZiwgdFZpZXcsIGkpO1xuICAgICAgcXVldWVWaWV3SG9va3MoZGVmLCB0VmlldywgaSk7XG4gICAgICBxdWV1ZURlc3Ryb3lIb29rcyhkZWYsIHRWaWV3LCBpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqIFF1ZXVlcyBhZnRlckNvbnRlbnRJbml0IGFuZCBhZnRlckNvbnRlbnRDaGVja2VkIGhvb2tzIG9uIFRWaWV3ICovXG5mdW5jdGlvbiBxdWV1ZUNvbnRlbnRIb29rcyhkZWY6IERpcmVjdGl2ZURlZjxhbnk+LCB0VmlldzogVFZpZXcsIGk6IG51bWJlcik6IHZvaWQge1xuICBpZiAoZGVmLmFmdGVyQ29udGVudEluaXQpIHtcbiAgICAodFZpZXcuY29udGVudEhvb2tzIHx8ICh0Vmlldy5jb250ZW50SG9va3MgPSBbXSkpLnB1c2goaSwgZGVmLmFmdGVyQ29udGVudEluaXQpO1xuICB9XG5cbiAgaWYgKGRlZi5hZnRlckNvbnRlbnRDaGVja2VkKSB7XG4gICAgKHRWaWV3LmNvbnRlbnRIb29rcyB8fCAodFZpZXcuY29udGVudEhvb2tzID0gW10pKS5wdXNoKGksIGRlZi5hZnRlckNvbnRlbnRDaGVja2VkKTtcbiAgICAodFZpZXcuY29udGVudENoZWNrSG9va3MgfHwgKHRWaWV3LmNvbnRlbnRDaGVja0hvb2tzID0gW10pKS5wdXNoKGksIGRlZi5hZnRlckNvbnRlbnRDaGVja2VkKTtcbiAgfVxufVxuXG4vKiogUXVldWVzIGFmdGVyVmlld0luaXQgYW5kIGFmdGVyVmlld0NoZWNrZWQgaG9va3Mgb24gVFZpZXcgKi9cbmZ1bmN0aW9uIHF1ZXVlVmlld0hvb2tzKGRlZjogRGlyZWN0aXZlRGVmPGFueT4sIHRWaWV3OiBUVmlldywgaTogbnVtYmVyKTogdm9pZCB7XG4gIGlmIChkZWYuYWZ0ZXJWaWV3SW5pdCkge1xuICAgICh0Vmlldy52aWV3SG9va3MgfHwgKHRWaWV3LnZpZXdIb29rcyA9IFtdKSkucHVzaChpLCBkZWYuYWZ0ZXJWaWV3SW5pdCk7XG4gIH1cblxuICBpZiAoZGVmLmFmdGVyVmlld0NoZWNrZWQpIHtcbiAgICAodFZpZXcudmlld0hvb2tzIHx8ICh0Vmlldy52aWV3SG9va3MgPSBbXSkpLnB1c2goaSwgZGVmLmFmdGVyVmlld0NoZWNrZWQpO1xuICAgICh0Vmlldy52aWV3Q2hlY2tIb29rcyB8fCAodFZpZXcudmlld0NoZWNrSG9va3MgPSBbXSkpLnB1c2goaSwgZGVmLmFmdGVyVmlld0NoZWNrZWQpO1xuICB9XG59XG5cbi8qKiBRdWV1ZXMgb25EZXN0cm95IGhvb2tzIG9uIFRWaWV3ICovXG5mdW5jdGlvbiBxdWV1ZURlc3Ryb3lIb29rcyhkZWY6IERpcmVjdGl2ZURlZjxhbnk+LCB0VmlldzogVFZpZXcsIGk6IG51bWJlcik6IHZvaWQge1xuICBpZiAoZGVmLm9uRGVzdHJveSAhPSBudWxsKSB7XG4gICAgKHRWaWV3LmRlc3Ryb3lIb29rcyB8fCAodFZpZXcuZGVzdHJveUhvb2tzID0gW10pKS5wdXNoKGksIGRlZi5vbkRlc3Ryb3kpO1xuICB9XG59XG5cbi8qKlxuICogQ2FsbHMgb25Jbml0IGFuZCBkb0NoZWNrIGNhbGxzIGlmIHRoZXkgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gY2FsbGVkLlxuICpcbiAqIEBwYXJhbSBjdXJyZW50VmlldyBUaGUgY3VycmVudCB2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlSW5pdEhvb2tzKGN1cnJlbnRWaWV3OiBMVmlldywgdFZpZXc6IFRWaWV3LCBjcmVhdGlvbk1vZGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWaWV3LmxpZmVjeWNsZVN0YWdlID09PSBMaWZlY3ljbGVTdGFnZS5JTklUKSB7XG4gICAgZXhlY3V0ZUhvb2tzKGN1cnJlbnRWaWV3LmRpcmVjdGl2ZXMgISwgdFZpZXcuaW5pdEhvb2tzLCB0Vmlldy5jaGVja0hvb2tzLCBjcmVhdGlvbk1vZGUpO1xuICAgIGN1cnJlbnRWaWV3LmxpZmVjeWNsZVN0YWdlID0gTGlmZWN5Y2xlU3RhZ2UuQUZURVJfSU5JVDtcbiAgfVxufVxuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgYWZ0ZXJWaWV3SW5pdCBhbmQgYWZ0ZXJWaWV3Q2hlY2tlZCBmdW5jdGlvbnMgYW5kIGNhbGxzIHRoZW0uXG4gKlxuICogQHBhcmFtIGN1cnJlbnRWaWV3IFRoZSBjdXJyZW50IHZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVIb29rcyhcbiAgICBkYXRhOiBhbnlbXSwgYWxsSG9va3M6IEhvb2tEYXRhIHwgbnVsbCwgY2hlY2tIb29rczogSG9va0RhdGEgfCBudWxsLFxuICAgIGNyZWF0aW9uTW9kZTogYm9vbGVhbik6IHZvaWQge1xuICBjb25zdCBob29rc1RvQ2FsbCA9IGNyZWF0aW9uTW9kZSA/IGFsbEhvb2tzIDogY2hlY2tIb29rcztcbiAgaWYgKGhvb2tzVG9DYWxsKSB7XG4gICAgY2FsbEhvb2tzKGRhdGEsIGhvb2tzVG9DYWxsKTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGxzIGxpZmVjeWNsZSBob29rcyB3aXRoIHRoZWlyIGNvbnRleHRzLCBza2lwcGluZyBpbml0IGhvb2tzIGlmIGl0J3Mgbm90XG4gKiBjcmVhdGlvbiBtb2RlLlxuICpcbiAqIEBwYXJhbSBjdXJyZW50VmlldyBUaGUgY3VycmVudCB2aWV3XG4gKiBAcGFyYW0gYXJyIFRoZSBhcnJheSBpbiB3aGljaCB0aGUgaG9va3MgYXJlIGZvdW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxsSG9va3MoZGF0YTogYW55W10sIGFycjogSG9va0RhdGEpOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAoYXJyW2kgfCAxXSBhcygpID0+IHZvaWQpLmNhbGwoZGF0YVthcnJbaV0gYXMgbnVtYmVyXSk7XG4gIH1cbn1cbiJdfQ==