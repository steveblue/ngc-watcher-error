/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Controller to be injected into tests, that allows for mocking and flushing
 * of requests.
 *
 * @stable
 */
var /**
 * Controller to be injected into tests, that allows for mocking and flushing
 * of requests.
 *
 * @stable
 */
HttpTestingController = /** @class */ (function () {
    function HttpTestingController() {
    }
    return HttpTestingController;
}());
/**
 * Controller to be injected into tests, that allows for mocking and flushing
 * of requests.
 *
 * @stable
 */
export { HttpTestingController };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL2h0dHAvdGVzdGluZy9zcmMvYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUE0QkE7Ozs7OztBQUFBOzs7Z0NBNUJBO0lBb0hDLENBQUE7Ozs7Ozs7QUF4RkQsaUNBd0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0h0dHBSZXF1ZXN0fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7VGVzdFJlcXVlc3R9IGZyb20gJy4vcmVxdWVzdCc7XG5cbi8qKlxuICogRGVmaW5lcyBhIG1hdGNoZXIgZm9yIHJlcXVlc3RzIGJhc2VkIG9uIFVSTCwgbWV0aG9kLCBvciBib3RoLlxuICpcbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0TWF0Y2gge1xuICBtZXRob2Q/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBDb250cm9sbGVyIHRvIGJlIGluamVjdGVkIGludG8gdGVzdHMsIHRoYXQgYWxsb3dzIGZvciBtb2NraW5nIGFuZCBmbHVzaGluZ1xuICogb2YgcmVxdWVzdHMuXG4gKlxuICogQHN0YWJsZVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHR0cFRlc3RpbmdDb250cm9sbGVyIHtcbiAgLyoqXG4gICAqIFNlYXJjaCBmb3IgcmVxdWVzdHMgdGhhdCBtYXRjaCB0aGUgZ2l2ZW4gcGFyYW1ldGVyLCB3aXRob3V0IGFueSBleHBlY3RhdGlvbnMuXG4gICAqL1xuICBhYnN0cmFjdCBtYXRjaChtYXRjaDogc3RyaW5nfFJlcXVlc3RNYXRjaHwoKHJlcTogSHR0cFJlcXVlc3Q8YW55PikgPT4gYm9vbGVhbikpOiBUZXN0UmVxdWVzdFtdO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhhdCBhIHNpbmdsZSByZXF1ZXN0IGhhcyBiZWVuIG1hZGUgd2hpY2ggbWF0Y2hlcyB0aGUgZ2l2ZW4gVVJMLCBhbmQgcmV0dXJuIGl0c1xuICAgKiBtb2NrLlxuICAgKlxuICAgKiBJZiBubyBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgb3IgbW9yZSB0aGFuIG9uZSBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgZmFpbCB3aXRoIGFuXG4gICAqIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBnaXZlbiByZXF1ZXN0IGRlc2NyaXB0aW9uLCBpZiBhbnkuXG4gICAqL1xuICBhYnN0cmFjdCBleHBlY3RPbmUodXJsOiBzdHJpbmcsIGRlc2NyaXB0aW9uPzogc3RyaW5nKTogVGVzdFJlcXVlc3Q7XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGF0IGEgc2luZ2xlIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSB3aGljaCBtYXRjaGVzIHRoZSBnaXZlbiBwYXJhbWV0ZXJzLCBhbmQgcmV0dXJuXG4gICAqIGl0cyBtb2NrLlxuICAgKlxuICAgKiBJZiBubyBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgb3IgbW9yZSB0aGFuIG9uZSBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgZmFpbCB3aXRoIGFuXG4gICAqIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBnaXZlbiByZXF1ZXN0IGRlc2NyaXB0aW9uLCBpZiBhbnkuXG4gICAqL1xuICBhYnN0cmFjdCBleHBlY3RPbmUocGFyYW1zOiBSZXF1ZXN0TWF0Y2gsIGRlc2NyaXB0aW9uPzogc3RyaW5nKTogVGVzdFJlcXVlc3Q7XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGF0IGEgc2luZ2xlIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSB3aGljaCBtYXRjaGVzIHRoZSBnaXZlbiBwcmVkaWNhdGUgZnVuY3Rpb24sIGFuZFxuICAgKiByZXR1cm4gaXRzIG1vY2suXG4gICAqXG4gICAqIElmIG5vIHN1Y2ggcmVxdWVzdCBoYXMgYmVlbiBtYWRlLCBvciBtb3JlIHRoYW4gb25lIHN1Y2ggcmVxdWVzdCBoYXMgYmVlbiBtYWRlLCBmYWlsIHdpdGggYW5cbiAgICogZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGdpdmVuIHJlcXVlc3QgZGVzY3JpcHRpb24sIGlmIGFueS5cbiAgICovXG4gIGFic3RyYWN0IGV4cGVjdE9uZShtYXRjaEZuOiAoKHJlcTogSHR0cFJlcXVlc3Q8YW55PikgPT4gYm9vbGVhbiksIGRlc2NyaXB0aW9uPzogc3RyaW5nKTpcbiAgICAgIFRlc3RSZXF1ZXN0O1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhhdCBhIHNpbmdsZSByZXF1ZXN0IGhhcyBiZWVuIG1hZGUgd2hpY2ggbWF0Y2hlcyB0aGUgZ2l2ZW4gY29uZGl0aW9uLCBhbmQgcmV0dXJuXG4gICAqIGl0cyBtb2NrLlxuICAgKlxuICAgKiBJZiBubyBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgb3IgbW9yZSB0aGFuIG9uZSBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgZmFpbCB3aXRoIGFuXG4gICAqIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBnaXZlbiByZXF1ZXN0IGRlc2NyaXB0aW9uLCBpZiBhbnkuXG4gICAqL1xuICBhYnN0cmFjdCBleHBlY3RPbmUoXG4gICAgICBtYXRjaDogc3RyaW5nfFJlcXVlc3RNYXRjaHwoKHJlcTogSHR0cFJlcXVlc3Q8YW55PikgPT4gYm9vbGVhbiksXG4gICAgICBkZXNjcmlwdGlvbj86IHN0cmluZyk6IFRlc3RSZXF1ZXN0O1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhhdCBubyByZXF1ZXN0cyBoYXZlIGJlZW4gbWFkZSB3aGljaCBtYXRjaCB0aGUgZ2l2ZW4gVVJMLlxuICAgKlxuICAgKiBJZiBhIG1hdGNoaW5nIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgZmFpbCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBnaXZlbiByZXF1ZXN0XG4gICAqIGRlc2NyaXB0aW9uLCBpZiBhbnkuXG4gICAqL1xuICBhYnN0cmFjdCBleHBlY3ROb25lKHVybDogc3RyaW5nLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGF0IG5vIHJlcXVlc3RzIGhhdmUgYmVlbiBtYWRlIHdoaWNoIG1hdGNoIHRoZSBnaXZlbiBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBJZiBhIG1hdGNoaW5nIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgZmFpbCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBnaXZlbiByZXF1ZXN0XG4gICAqIGRlc2NyaXB0aW9uLCBpZiBhbnkuXG4gICAqL1xuICBhYnN0cmFjdCBleHBlY3ROb25lKHBhcmFtczogUmVxdWVzdE1hdGNoLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGF0IG5vIHJlcXVlc3RzIGhhdmUgYmVlbiBtYWRlIHdoaWNoIG1hdGNoIHRoZSBnaXZlbiBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAqXG4gICAqIElmIGEgbWF0Y2hpbmcgcmVxdWVzdCBoYXMgYmVlbiBtYWRlLCBmYWlsIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGdpdmVuIHJlcXVlc3RcbiAgICogZGVzY3JpcHRpb24sIGlmIGFueS5cbiAgICovXG4gIGFic3RyYWN0IGV4cGVjdE5vbmUobWF0Y2hGbjogKChyZXE6IEh0dHBSZXF1ZXN0PGFueT4pID0+IGJvb2xlYW4pLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGF0IG5vIHJlcXVlc3RzIGhhdmUgYmVlbiBtYWRlIHdoaWNoIG1hdGNoIHRoZSBnaXZlbiBjb25kaXRpb24uXG4gICAqXG4gICAqIElmIGEgbWF0Y2hpbmcgcmVxdWVzdCBoYXMgYmVlbiBtYWRlLCBmYWlsIHdpdGggYW4gZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGdpdmVuIHJlcXVlc3RcbiAgICogZGVzY3JpcHRpb24sIGlmIGFueS5cbiAgICovXG4gIGFic3RyYWN0IGV4cGVjdE5vbmUoXG4gICAgICBtYXRjaDogc3RyaW5nfFJlcXVlc3RNYXRjaHwoKHJlcTogSHR0cFJlcXVlc3Q8YW55PikgPT4gYm9vbGVhbiksIGRlc2NyaXB0aW9uPzogc3RyaW5nKTogdm9pZDtcblxuICAvKipcbiAgICogVmVyaWZ5IHRoYXQgbm8gdW5tYXRjaGVkIHJlcXVlc3RzIGFyZSBvdXRzdGFuZGluZy5cbiAgICpcbiAgICogSWYgYW55IHJlcXVlc3RzIGFyZSBvdXRzdGFuZGluZywgZmFpbCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaW5kaWNhdGluZyB3aGljaCByZXF1ZXN0cyB3ZXJlIG5vdFxuICAgKiBoYW5kbGVkLlxuICAgKlxuICAgKiBJZiBgaWdub3JlQ2FuY2VsbGVkYCBpcyBub3Qgc2V0ICh0aGUgZGVmYXVsdCksIGB2ZXJpZnkoKWAgd2lsbCBhbHNvIGZhaWwgaWYgY2FuY2VsbGVkIHJlcXVlc3RzXG4gICAqIHdlcmUgbm90IGV4cGxpY2l0bHkgbWF0Y2hlZC5cbiAgICovXG4gIGFic3RyYWN0IHZlcmlmeShvcHRzPzoge2lnbm9yZUNhbmNlbGxlZD86IGJvb2xlYW59KTogdm9pZDtcbn1cbiJdfQ==