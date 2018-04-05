/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import './ng_dev_mode';
import { assertNotNull } from './assert';
import { unusedValueExportToPlacateAjd as unused1 } from './interfaces/node';
import { NG_PROJECT_AS_ATTR_NAME, unusedValueExportToPlacateAjd as unused2 } from './interfaces/projection';
var unusedValueToPlacateAjd = unused1 + unused2;
function isCssClassMatching(nodeClassAttrVal, cssClassToMatch) {
    var nodeClassesLen = nodeClassAttrVal.length;
    var matchIndex = nodeClassAttrVal.indexOf(cssClassToMatch);
    var matchEndIdx = matchIndex + cssClassToMatch.length;
    if (matchIndex === -1 // no match
        || (matchIndex > 0 && nodeClassAttrVal[matchIndex - 1] !== ' ') // no space before
        ||
            (matchEndIdx < nodeClassesLen && nodeClassAttrVal[matchEndIdx] !== ' ')) {
        return false;
    }
    return true;
}
/**
 * A utility function to match an Ivy node static data against a simple CSS selector
 *
 * @param node static data to match
 * @param selector
 * @returns true if node matches the selector.
 */
export function isNodeMatchingSimpleSelector(tNode, selector) {
    var noOfSelectorParts = selector.length;
    ngDevMode && assertNotNull(selector[0], 'the selector should have a tag name');
    var tagNameInSelector = selector[0];
    // check tag tame
    if (tagNameInSelector !== '' && tagNameInSelector !== tNode.tagName) {
        return false;
    }
    // short-circuit case where we are only matching on element's tag name
    if (noOfSelectorParts === 1) {
        return true;
    }
    // short-circuit case where an element has no attrs but a selector tries to match some
    if (noOfSelectorParts > 1 && !tNode.attrs) {
        return false;
    }
    var attrsInNode = (tNode.attrs);
    for (var i = 1; i < noOfSelectorParts; i += 2) {
        var attrNameInSelector = selector[i];
        var attrIdxInNode = attrsInNode.indexOf(attrNameInSelector);
        if (attrIdxInNode % 2 !== 0) {
            // attribute names are stored at even indexes
            return false;
        }
        else {
            var attrValInSelector = selector[i + 1];
            if (attrValInSelector !== '') {
                // selector should also match on an attribute value
                var attrValInNode = attrsInNode[attrIdxInNode + 1];
                if (attrNameInSelector === 'class') {
                    // iterate over all the remaining items in the selector selector array = class names
                    for (i++; i < noOfSelectorParts; i++) {
                        if (!isCssClassMatching(attrValInNode, selector[i])) {
                            return false;
                        }
                    }
                }
                else if (attrValInSelector !== attrValInNode) {
                    return false;
                }
            }
        }
    }
    return true;
}
export function isNodeMatchingSelectorWithNegations(tNode, selector) {
    var positiveSelector = selector[0];
    if (positiveSelector != null && !isNodeMatchingSimpleSelector(tNode, positiveSelector)) {
        return false;
    }
    // do we have any negation parts in this selector?
    var negativeSelectors = selector[1];
    if (negativeSelectors) {
        for (var i = 0; i < negativeSelectors.length; i++) {
            // if one of negative selectors matched than the whole selector doesn't match
            if (isNodeMatchingSimpleSelector(tNode, negativeSelectors[i])) {
                return false;
            }
        }
    }
    return true;
}
export function isNodeMatchingSelector(tNode, selector) {
    for (var i = 0; i < selector.length; i++) {
        if (isNodeMatchingSelectorWithNegations(tNode, selector[i])) {
            return true;
        }
    }
    return false;
}
export function getProjectAsAttrValue(tNode) {
    var nodeAttrs = tNode.attrs;
    if (nodeAttrs != null) {
        var ngProjectAsAttrIdx = nodeAttrs.indexOf(NG_PROJECT_AS_ATTR_NAME);
        // only check for ngProjectAs in attribute names, don't accidentally match attribute's value
        // (attribute names are stored at even indexes)
        if ((ngProjectAsAttrIdx & 1) === 0) {
            return nodeAttrs[ngProjectAsAttrIdx + 1];
        }
    }
    return null;
}
/**
 * Checks a given node against matching selectors and returns
 * selector index (or 0 if none matched).
 *
 * This function takes into account the ngProjectAs attribute: if present its value will be compared
 * to the raw (un-parsed) CSS selector instead of using standard selector matching logic.
 */
export function matchingSelectorIndex(tNode, selectors, textSelectors) {
    var ngProjectAsAttrVal = getProjectAsAttrValue(tNode);
    for (var i = 0; i < selectors.length; i++) {
        // if a node has the ngProjectAs attribute match it against unparsed selector
        // match a node against a parsed selector only if ngProjectAs attribute is not present
        if (ngProjectAsAttrVal === textSelectors[i] ||
            ngProjectAsAttrVal === null && isNodeMatchingSelector(tNode, selectors[i])) {
            return i + 1; // first matching selector "captures" a given node
        }
    }
    return 0;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9zZWxlY3Rvcl9tYXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9ub2RlX3NlbGVjdG9yX21hdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxFQUFRLDZCQUE2QixJQUFJLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2xGLE9BQU8sRUFBd0MsdUJBQXVCLEVBQXFCLDZCQUE2QixJQUFJLE9BQU8sRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRXBLLElBQU0sdUJBQXVCLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUVsRCw0QkFBNEIsZ0JBQXdCLEVBQUUsZUFBdUI7SUFDM0UsSUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO0lBQy9DLElBQU0sVUFBVSxHQUFHLGdCQUFrQixDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvRCxJQUFNLFdBQVcsR0FBRyxVQUFVLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztJQUN4RCxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDO1dBQ2QsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLGdCQUFrQixDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7O1lBRWpFLENBQUMsV0FBVyxHQUFHLGNBQWMsSUFBSSxnQkFBa0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUM5RSxDQUFDO1FBQ0MsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNkO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztDQUNiOzs7Ozs7OztBQVNELE1BQU0sdUNBQXVDLEtBQVksRUFBRSxRQUEy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QyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzs7UUFHMUMsRUFBRSxDQUFDLENBQUMsa0JBQWtCLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN2QyxrQkFBa0IsS0FBSyxJQUFJLElBQUksc0JBQXNCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNkO0tBQ0Y7SUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0NBQ1YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAnLi9uZ19kZXZfbW9kZSc7XG5cbmltcG9ydCB7YXNzZXJ0Tm90TnVsbH0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHtUTm9kZSwgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgYXMgdW51c2VkMX0gZnJvbSAnLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtDc3NTZWxlY3RvciwgQ3NzU2VsZWN0b3JXaXRoTmVnYXRpb25zLCBOR19QUk9KRUNUX0FTX0FUVFJfTkFNRSwgU2ltcGxlQ3NzU2VsZWN0b3IsIHVudXNlZFZhbHVlRXhwb3J0VG9QbGFjYXRlQWpkIGFzIHVudXNlZDJ9IGZyb20gJy4vaW50ZXJmYWNlcy9wcm9qZWN0aW9uJztcblxuY29uc3QgdW51c2VkVmFsdWVUb1BsYWNhdGVBamQgPSB1bnVzZWQxICsgdW51c2VkMjtcblxuZnVuY3Rpb24gaXNDc3NDbGFzc01hdGNoaW5nKG5vZGVDbGFzc0F0dHJWYWw6IHN0cmluZywgY3NzQ2xhc3NUb01hdGNoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3Qgbm9kZUNsYXNzZXNMZW4gPSBub2RlQ2xhc3NBdHRyVmFsLmxlbmd0aDtcbiAgY29uc3QgbWF0Y2hJbmRleCA9IG5vZGVDbGFzc0F0dHJWYWwgIS5pbmRleE9mKGNzc0NsYXNzVG9NYXRjaCk7XG4gIGNvbnN0IG1hdGNoRW5kSWR4ID0gbWF0Y2hJbmRleCArIGNzc0NsYXNzVG9NYXRjaC5sZW5ndGg7XG4gIGlmIChtYXRjaEluZGV4ID09PSAtMSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm8gbWF0Y2hcbiAgICAgIHx8IChtYXRjaEluZGV4ID4gMCAmJiBub2RlQ2xhc3NBdHRyVmFsICFbbWF0Y2hJbmRleCAtIDFdICE9PSAnICcpICAvLyBubyBzcGFjZSBiZWZvcmVcbiAgICAgIHx8XG4gICAgICAobWF0Y2hFbmRJZHggPCBub2RlQ2xhc3Nlc0xlbiAmJiBub2RlQ2xhc3NBdHRyVmFsICFbbWF0Y2hFbmRJZHhdICE9PSAnICcpKSAgLy8gbm8gc3BhY2UgYWZ0ZXJcbiAge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBBIHV0aWxpdHkgZnVuY3Rpb24gdG8gbWF0Y2ggYW4gSXZ5IG5vZGUgc3RhdGljIGRhdGEgYWdhaW5zdCBhIHNpbXBsZSBDU1Mgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0gbm9kZSBzdGF0aWMgZGF0YSB0byBtYXRjaFxuICogQHBhcmFtIHNlbGVjdG9yXG4gKiBAcmV0dXJucyB0cnVlIGlmIG5vZGUgbWF0Y2hlcyB0aGUgc2VsZWN0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc05vZGVNYXRjaGluZ1NpbXBsZVNlbGVjdG9yKHROb2RlOiBUTm9kZSwgc2VsZWN0b3I6IFNpbXBsZUNzc1NlbGVjdG9yKTogYm9vbGVhbiB7XG4gIGNvbnN0IG5vT2ZTZWxlY3RvclBhcnRzID0gc2VsZWN0b3IubGVuZ3RoO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0Tm90TnVsbChzZWxlY3RvclswXSwgJ3RoZSBzZWxlY3RvciBzaG91bGQgaGF2ZSBhIHRhZyBuYW1lJyk7XG4gIGNvbnN0IHRhZ05hbWVJblNlbGVjdG9yID0gc2VsZWN0b3JbMF07XG5cbiAgLy8gY2hlY2sgdGFnIHRhbWVcbiAgaWYgKHRhZ05hbWVJblNlbGVjdG9yICE9PSAnJyAmJiB0YWdOYW1lSW5TZWxlY3RvciAhPT0gdE5vZGUudGFnTmFtZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIHNob3J0LWNpcmN1aXQgY2FzZSB3aGVyZSB3ZSBhcmUgb25seSBtYXRjaGluZyBvbiBlbGVtZW50J3MgdGFnIG5hbWVcbiAgaWYgKG5vT2ZTZWxlY3RvclBhcnRzID09PSAxKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBzaG9ydC1jaXJjdWl0IGNhc2Ugd2hlcmUgYW4gZWxlbWVudCBoYXMgbm8gYXR0cnMgYnV0IGEgc2VsZWN0b3IgdHJpZXMgdG8gbWF0Y2ggc29tZVxuICBpZiAobm9PZlNlbGVjdG9yUGFydHMgPiAxICYmICF0Tm9kZS5hdHRycykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGF0dHJzSW5Ob2RlID0gdE5vZGUuYXR0cnMgITtcblxuICBmb3IgKGxldCBpID0gMTsgaSA8IG5vT2ZTZWxlY3RvclBhcnRzOyBpICs9IDIpIHtcbiAgICBjb25zdCBhdHRyTmFtZUluU2VsZWN0b3IgPSBzZWxlY3RvcltpXTtcbiAgICBjb25zdCBhdHRySWR4SW5Ob2RlID0gYXR0cnNJbk5vZGUuaW5kZXhPZihhdHRyTmFtZUluU2VsZWN0b3IpO1xuICAgIGlmIChhdHRySWR4SW5Ob2RlICUgMiAhPT0gMCkgeyAgLy8gYXR0cmlidXRlIG5hbWVzIGFyZSBzdG9yZWQgYXQgZXZlbiBpbmRleGVzXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGF0dHJWYWxJblNlbGVjdG9yID0gc2VsZWN0b3JbaSArIDFdO1xuICAgICAgaWYgKGF0dHJWYWxJblNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAvLyBzZWxlY3RvciBzaG91bGQgYWxzbyBtYXRjaCBvbiBhbiBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgICAgY29uc3QgYXR0clZhbEluTm9kZSA9IGF0dHJzSW5Ob2RlW2F0dHJJZHhJbk5vZGUgKyAxXTtcbiAgICAgICAgaWYgKGF0dHJOYW1lSW5TZWxlY3RvciA9PT0gJ2NsYXNzJykge1xuICAgICAgICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlbWFpbmluZyBpdGVtcyBpbiB0aGUgc2VsZWN0b3Igc2VsZWN0b3IgYXJyYXkgPSBjbGFzcyBuYW1lc1xuICAgICAgICAgIGZvciAoaSsrOyBpIDwgbm9PZlNlbGVjdG9yUGFydHM7IGkrKykge1xuICAgICAgICAgICAgaWYgKCFpc0Nzc0NsYXNzTWF0Y2hpbmcoYXR0clZhbEluTm9kZSwgc2VsZWN0b3JbaV0pKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0clZhbEluU2VsZWN0b3IgIT09IGF0dHJWYWxJbk5vZGUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTm9kZU1hdGNoaW5nU2VsZWN0b3JXaXRoTmVnYXRpb25zKFxuICAgIHROb2RlOiBUTm9kZSwgc2VsZWN0b3I6IENzc1NlbGVjdG9yV2l0aE5lZ2F0aW9ucyk6IGJvb2xlYW4ge1xuICBjb25zdCBwb3NpdGl2ZVNlbGVjdG9yID0gc2VsZWN0b3JbMF07XG4gIGlmIChwb3NpdGl2ZVNlbGVjdG9yICE9IG51bGwgJiYgIWlzTm9kZU1hdGNoaW5nU2ltcGxlU2VsZWN0b3IodE5vZGUsIHBvc2l0aXZlU2VsZWN0b3IpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gZG8gd2UgaGF2ZSBhbnkgbmVnYXRpb24gcGFydHMgaW4gdGhpcyBzZWxlY3Rvcj9cbiAgY29uc3QgbmVnYXRpdmVTZWxlY3RvcnMgPSBzZWxlY3RvclsxXTtcbiAgaWYgKG5lZ2F0aXZlU2VsZWN0b3JzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWdhdGl2ZVNlbGVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gaWYgb25lIG9mIG5lZ2F0aXZlIHNlbGVjdG9ycyBtYXRjaGVkIHRoYW4gdGhlIHdob2xlIHNlbGVjdG9yIGRvZXNuJ3QgbWF0Y2hcbiAgICAgIGlmIChpc05vZGVNYXRjaGluZ1NpbXBsZVNlbGVjdG9yKHROb2RlLCBuZWdhdGl2ZVNlbGVjdG9yc1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOb2RlTWF0Y2hpbmdTZWxlY3Rvcih0Tm9kZTogVE5vZGUsIHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IGJvb2xlYW4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGlzTm9kZU1hdGNoaW5nU2VsZWN0b3JXaXRoTmVnYXRpb25zKHROb2RlLCBzZWxlY3RvcltpXSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3RBc0F0dHJWYWx1ZSh0Tm9kZTogVE5vZGUpOiBzdHJpbmd8bnVsbCB7XG4gIGNvbnN0IG5vZGVBdHRycyA9IHROb2RlLmF0dHJzO1xuICBpZiAobm9kZUF0dHJzICE9IG51bGwpIHtcbiAgICBjb25zdCBuZ1Byb2plY3RBc0F0dHJJZHggPSBub2RlQXR0cnMuaW5kZXhPZihOR19QUk9KRUNUX0FTX0FUVFJfTkFNRSk7XG4gICAgLy8gb25seSBjaGVjayBmb3IgbmdQcm9qZWN0QXMgaW4gYXR0cmlidXRlIG5hbWVzLCBkb24ndCBhY2NpZGVudGFsbHkgbWF0Y2ggYXR0cmlidXRlJ3MgdmFsdWVcbiAgICAvLyAoYXR0cmlidXRlIG5hbWVzIGFyZSBzdG9yZWQgYXQgZXZlbiBpbmRleGVzKVxuICAgIGlmICgobmdQcm9qZWN0QXNBdHRySWR4ICYgMSkgPT09IDApIHtcbiAgICAgIHJldHVybiBub2RlQXR0cnNbbmdQcm9qZWN0QXNBdHRySWR4ICsgMV07XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENoZWNrcyBhIGdpdmVuIG5vZGUgYWdhaW5zdCBtYXRjaGluZyBzZWxlY3RvcnMgYW5kIHJldHVybnNcbiAqIHNlbGVjdG9yIGluZGV4IChvciAwIGlmIG5vbmUgbWF0Y2hlZCkuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB0YWtlcyBpbnRvIGFjY291bnQgdGhlIG5nUHJvamVjdEFzIGF0dHJpYnV0ZTogaWYgcHJlc2VudCBpdHMgdmFsdWUgd2lsbCBiZSBjb21wYXJlZFxuICogdG8gdGhlIHJhdyAodW4tcGFyc2VkKSBDU1Mgc2VsZWN0b3IgaW5zdGVhZCBvZiB1c2luZyBzdGFuZGFyZCBzZWxlY3RvciBtYXRjaGluZyBsb2dpYy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoaW5nU2VsZWN0b3JJbmRleChcbiAgICB0Tm9kZTogVE5vZGUsIHNlbGVjdG9yczogQ3NzU2VsZWN0b3JbXSwgdGV4dFNlbGVjdG9yczogc3RyaW5nW10pOiBudW1iZXIge1xuICBjb25zdCBuZ1Byb2plY3RBc0F0dHJWYWwgPSBnZXRQcm9qZWN0QXNBdHRyVmFsdWUodE5vZGUpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgIC8vIGlmIGEgbm9kZSBoYXMgdGhlIG5nUHJvamVjdEFzIGF0dHJpYnV0ZSBtYXRjaCBpdCBhZ2FpbnN0IHVucGFyc2VkIHNlbGVjdG9yXG4gICAgLy8gbWF0Y2ggYSBub2RlIGFnYWluc3QgYSBwYXJzZWQgc2VsZWN0b3Igb25seSBpZiBuZ1Byb2plY3RBcyBhdHRyaWJ1dGUgaXMgbm90IHByZXNlbnRcbiAgICBpZiAobmdQcm9qZWN0QXNBdHRyVmFsID09PSB0ZXh0U2VsZWN0b3JzW2ldIHx8XG4gICAgICAgIG5nUHJvamVjdEFzQXR0clZhbCA9PT0gbnVsbCAmJiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yKHROb2RlLCBzZWxlY3RvcnNbaV0pKSB7XG4gICAgICByZXR1cm4gaSArIDE7ICAvLyBmaXJzdCBtYXRjaGluZyBzZWxlY3RvciBcImNhcHR1cmVzXCIgYSBnaXZlbiBub2RlXG4gICAgfVxuICB9XG4gIHJldHVybiAwO1xufVxuIl19