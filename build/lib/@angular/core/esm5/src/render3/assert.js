/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// The functions in this file verify that the assumptions we are making
// about state in an instruction are correct before implementing any logic.
// They are meant only to be called in dev mode as sanity checks.
export function assertNumber(actual, msg) {
    if (typeof actual != 'number') {
        throwError(msg);
    }
}
export function assertEqual(actual, expected, msg) {
    if (actual != expected) {
        throwError(msg);
    }
}
export function assertNotEqual(actual, expected, msg) {
    if (actual == expected) {
        throwError(msg);
    }
}
export function assertSame(actual, expected, msg) {
    if (actual !== expected) {
        throwError(msg);
    }
}
export function assertLessThan(actual, expected, msg) {
    if (actual >= expected) {
        throwError(msg);
    }
}
export function assertNull(actual, msg) {
    if (actual != null) {
        throwError(msg);
    }
}
export function assertNotNull(actual, msg) {
    if (actual == null) {
        throwError(msg);
    }
}
export function assertComponentType(actual, msg) {
    if (msg === void 0) { msg = 'Type passed in is not ComponentType, it does not have \'ngComponentDef\' property.'; }
    if (!actual.ngComponentDef) {
        throwError(msg);
    }
}
function throwError(msg) {
    throw new Error("ASSERTION ERROR: " + msg);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9hc3NlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVlBLE1BQU0sdUJBQXVCLE1BQVcsRUFBRSxHQUFXO0lBQ25ELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pCO0NBQ0Y7QUFFRCxNQUFNLHNCQUF5QixNQUFTLEVBQUUsUUFBVyxFQUFFLEdBQVc7SUFDaEUsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pCO0NBQ0Y7QUFFRCxNQUFNLHlCQUE0QixNQUFTLEVBQUUsUUFBVyxFQUFFLEdBQVc7SUFDbkUsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pCO0NBQ0Y7QUFFRCxNQUFNLHFCQUF3QixNQUFTLEVBQUUsUUFBVyxFQUFFLEdBQVc7SUFDL0QsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDeEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pCO0NBQ0Y7QUFFRCxNQUFNLHlCQUE0QixNQUFTLEVBQUUsUUFBVyxFQUFFLEdBQVc7SUFDbkUsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pCO0NBQ0Y7QUFFRCxNQUFNLHFCQUF3QixNQUFTLEVBQUUsR0FBVztJQUNsRCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuQixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7Q0FDRjtBQUVELE1BQU0sd0JBQTJCLE1BQVMsRUFBRSxHQUFXO0lBQ3JELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25CLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQjtDQUNGO0FBRUQsTUFBTSw4QkFDRixNQUFXLEVBQ1gsR0FDd0Y7SUFEeEYsb0JBQUEsRUFBQSwwRkFDd0Y7SUFDMUYsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMzQixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7Q0FDRjtBQUVELG9CQUFvQixHQUFXO0lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQW9CLEdBQUssQ0FBQyxDQUFDO0NBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUaGUgZnVuY3Rpb25zIGluIHRoaXMgZmlsZSB2ZXJpZnkgdGhhdCB0aGUgYXNzdW1wdGlvbnMgd2UgYXJlIG1ha2luZ1xuLy8gYWJvdXQgc3RhdGUgaW4gYW4gaW5zdHJ1Y3Rpb24gYXJlIGNvcnJlY3QgYmVmb3JlIGltcGxlbWVudGluZyBhbnkgbG9naWMuXG4vLyBUaGV5IGFyZSBtZWFudCBvbmx5IHRvIGJlIGNhbGxlZCBpbiBkZXYgbW9kZSBhcyBzYW5pdHkgY2hlY2tzLlxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TnVtYmVyKGFjdHVhbDogYW55LCBtc2c6IHN0cmluZykge1xuICBpZiAodHlwZW9mIGFjdHVhbCAhPSAnbnVtYmVyJykge1xuICAgIHRocm93RXJyb3IobXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0RXF1YWw8VD4oYWN0dWFsOiBULCBleHBlY3RlZDogVCwgbXNnOiBzdHJpbmcpIHtcbiAgaWYgKGFjdHVhbCAhPSBleHBlY3RlZCkge1xuICAgIHRocm93RXJyb3IobXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Tm90RXF1YWw8VD4oYWN0dWFsOiBULCBleHBlY3RlZDogVCwgbXNnOiBzdHJpbmcpIHtcbiAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuICAgIHRocm93RXJyb3IobXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0U2FtZTxUPihhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZykge1xuICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgIHRocm93RXJyb3IobXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TGVzc1RoYW48VD4oYWN0dWFsOiBULCBleHBlY3RlZDogVCwgbXNnOiBzdHJpbmcpIHtcbiAgaWYgKGFjdHVhbCA+PSBleHBlY3RlZCkge1xuICAgIHRocm93RXJyb3IobXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TnVsbDxUPihhY3R1YWw6IFQsIG1zZzogc3RyaW5nKSB7XG4gIGlmIChhY3R1YWwgIT0gbnVsbCkge1xuICAgIHRocm93RXJyb3IobXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Tm90TnVsbDxUPihhY3R1YWw6IFQsIG1zZzogc3RyaW5nKSB7XG4gIGlmIChhY3R1YWwgPT0gbnVsbCkge1xuICAgIHRocm93RXJyb3IobXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Q29tcG9uZW50VHlwZShcbiAgICBhY3R1YWw6IGFueSxcbiAgICBtc2c6IHN0cmluZyA9XG4gICAgICAgICdUeXBlIHBhc3NlZCBpbiBpcyBub3QgQ29tcG9uZW50VHlwZSwgaXQgZG9lcyBub3QgaGF2ZSBcXCduZ0NvbXBvbmVudERlZlxcJyBwcm9wZXJ0eS4nKSB7XG4gIGlmICghYWN0dWFsLm5nQ29tcG9uZW50RGVmKSB7XG4gICAgdGhyb3dFcnJvcihtc2cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRocm93RXJyb3IobXNnOiBzdHJpbmcpOiBuZXZlciB7XG4gIHRocm93IG5ldyBFcnJvcihgQVNTRVJUSU9OIEVSUk9SOiAke21zZ31gKTtcbn0iXX0=