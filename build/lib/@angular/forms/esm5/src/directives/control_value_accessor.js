/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/**
 * Used to provide a {@link ControlValueAccessor} for form controls.
 *
 * See {@link DefaultValueAccessor} for how to implement one.
 * @stable
 */
export var NG_VALUE_ACCESSOR = new InjectionToken('NgValueAccessor');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbF92YWx1ZV9hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUE2RzdDLE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUF1QixpQkFBaUIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAgYWN0cyBhcyBhIGJyaWRnZSBiZXR3ZWVuIHRoZSBBbmd1bGFyIGZvcm1zIEFQSSBhbmQgYVxuICogbmF0aXZlIGVsZW1lbnQgaW4gdGhlIERPTS5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2UgaWYgeW91IHdhbnQgdG8gY3JlYXRlIGEgY3VzdG9tIGZvcm0gY29udHJvbCBkaXJlY3RpdmVcbiAqIHRoYXQgaW50ZWdyYXRlcyB3aXRoIEFuZ3VsYXIgZm9ybXMuXG4gKlxuICogQHN0YWJsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqXG4gICAqIFdyaXRlcyBhIG5ldyB2YWx1ZSB0byB0aGUgZWxlbWVudC5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSB0byB3cml0ZSB0byB0aGUgdmlldyB3aGVuIHByb2dyYW1tYXRpY1xuICAgKiAobW9kZWwgLT4gdmlldykgY2hhbmdlcyBhcmUgcmVxdWVzdGVkLlxuICAgKlxuICAgKiBFeGFtcGxlIGltcGxlbWVudGF0aW9uIG9mIGB3cml0ZVZhbHVlYDpcbiAgICpcbiAgICogYGBgdHNcbiAgICogd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAqICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZDtcblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wncyB2YWx1ZVxuICAgKiBjaGFuZ2VzIGluIHRoZSBVSS5cbiAgICpcbiAgICogVGhpcyBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSBvbiBpbml0aWFsaXphdGlvbiBzbyBpdCBjYW4gdXBkYXRlIHRoZSBmb3JtXG4gICAqIG1vZGVsIHdoZW4gdmFsdWVzIHByb3BhZ2F0ZSBmcm9tIHRoZSB2aWV3ICh2aWV3IC0+IG1vZGVsKS5cbiAgICpcbiAgICogSWYgeW91IGFyZSBpbXBsZW1lbnRpbmcgYHJlZ2lzdGVyT25DaGFuZ2VgIGluIHlvdXIgb3duIHZhbHVlIGFjY2Vzc29yLCB5b3VcbiAgICogd2lsbCB0eXBpY2FsbHkgd2FudCB0byBzYXZlIHRoZSBnaXZlbiBmdW5jdGlvbiBzbyB5b3VyIGNsYXNzIGNhbiBjYWxsIGl0XG4gICAqIGF0IHRoZSBhcHByb3ByaWF0ZSB0aW1lLlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAqICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogV2hlbiB0aGUgdmFsdWUgY2hhbmdlcyBpbiB0aGUgVUksIHlvdXIgY2xhc3Mgc2hvdWxkIGNhbGwgdGhlIHJlZ2lzdGVyZWRcbiAgICogZnVuY3Rpb24gdG8gYWxsb3cgdGhlIGZvcm1zIEFQSSB0byB1cGRhdGUgaXRzZWxmOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBob3N0OiB7XG4gICAqICAgIChjaGFuZ2UpOiAnX29uQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJ1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZDtcblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgcmVjZWl2ZXNcbiAgICogYSBibHVyIGV2ZW50LlxuICAgKlxuICAgKiBUaGlzIGlzIGNhbGxlZCBieSB0aGUgZm9ybXMgQVBJIG9uIGluaXRpYWxpemF0aW9uIHNvIGl0IGNhbiB1cGRhdGUgdGhlIGZvcm0gbW9kZWxcbiAgICogb24gYmx1ci5cbiAgICpcbiAgICogSWYgeW91IGFyZSBpbXBsZW1lbnRpbmcgYHJlZ2lzdGVyT25Ub3VjaGVkYCBpbiB5b3VyIG93biB2YWx1ZSBhY2Nlc3NvciwgeW91XG4gICAqIHdpbGwgdHlwaWNhbGx5IHdhbnQgdG8gc2F2ZSB0aGUgZ2l2ZW4gZnVuY3Rpb24gc28geW91ciBjbGFzcyBjYW4gY2FsbCBpdFxuICAgKiB3aGVuIHRoZSBjb250cm9sIHNob3VsZCBiZSBjb25zaWRlcmVkIGJsdXJyZWQgKGEuay5hLiBcInRvdWNoZWRcIikuXG4gICAqXG4gICAqIGBgYHRzXG4gICAqIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICogICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogT24gYmx1ciAob3IgZXF1aXZhbGVudCksIHlvdXIgY2xhc3Mgc2hvdWxkIGNhbGwgdGhlIHJlZ2lzdGVyZWQgZnVuY3Rpb24gdG8gYWxsb3dcbiAgICogdGhlIGZvcm1zIEFQSSB0byB1cGRhdGUgaXRzZWxmOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBob3N0OiB7XG4gICAqICAgICcoYmx1ciknOiAnX29uVG91Y2hlZCgpJ1xuICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgd2hlbiB0aGUgY29udHJvbCBzdGF0dXMgY2hhbmdlcyB0b1xuICAgKiBvciBmcm9tIFwiRElTQUJMRURcIi4gRGVwZW5kaW5nIG9uIHRoZSB2YWx1ZSwgaXQgc2hvdWxkIGVuYWJsZSBvciBkaXNhYmxlIHRoZVxuICAgKiBhcHByb3ByaWF0ZSBET00gZWxlbWVudC5cbiAgICpcbiAgICogRXhhbXBsZSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0RGlzYWJsZWRTdGF0ZWA6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgKiAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkXG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZDtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIHByb3ZpZGUgYSB7QGxpbmsgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZvciBmb3JtIGNvbnRyb2xzLlxuICpcbiAqIFNlZSB7QGxpbmsgRGVmYXVsdFZhbHVlQWNjZXNzb3J9IGZvciBob3cgdG8gaW1wbGVtZW50IG9uZS5cbiAqIEBzdGFibGVcbiAqL1xuZXhwb3J0IGNvbnN0IE5HX1ZBTFVFX0FDQ0VTU09SID0gbmV3IEluamVjdGlvblRva2VuPENvbnRyb2xWYWx1ZUFjY2Vzc29yPignTmdWYWx1ZUFjY2Vzc29yJyk7XG4iXX0=