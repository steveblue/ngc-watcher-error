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
 * An interface that {\@link FormGroupDirective} and {\@link NgForm} implement.
 *
 * Only used by the forms module.
 *
 * \@stable
 * @record
 */
export function Form() { }
function Form_tsickle_Closure_declarations() {
    /**
     * Add a control to this form.
     * @type {?}
     */
    Form.prototype.addControl;
    /**
     * Remove a control from this form.
     * @type {?}
     */
    Form.prototype.removeControl;
    /**
     * Look up the {\@link FormControl} associated with a particular {\@link NgControl}.
     * @type {?}
     */
    Form.prototype.getControl;
    /**
     * Add a group of controls to this form.
     * @type {?}
     */
    Form.prototype.addFormGroup;
    /**
     * Remove a group of controls from this form.
     * @type {?}
     */
    Form.prototype.removeFormGroup;
    /**
     * Look up the {\@link FormGroup} associated with a particular {\@link AbstractFormGroupDirective}.
     * @type {?}
     */
    Form.prototype.getFormGroup;
    /**
     * Update the model for a particular control with a new value.
     * @type {?}
     */
    Form.prototype.updateModel;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3Jtcy9zcmMvZGlyZWN0aXZlcy9mb3JtX2ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Zvcm1Db250cm9sLCBGb3JtR3JvdXB9IGZyb20gJy4uL21vZGVsJztcblxuaW1wb3J0IHtBYnN0cmFjdEZvcm1Hcm91cERpcmVjdGl2ZX0gZnJvbSAnLi9hYnN0cmFjdF9mb3JtX2dyb3VwX2RpcmVjdGl2ZSc7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcblxuXG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIHRoYXQge0BsaW5rIEZvcm1Hcm91cERpcmVjdGl2ZX0gYW5kIHtAbGluayBOZ0Zvcm19IGltcGxlbWVudC5cbiAqXG4gKiBPbmx5IHVzZWQgYnkgdGhlIGZvcm1zIG1vZHVsZS5cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybSB7XG4gIC8qKlxuICAgKiBBZGQgYSBjb250cm9sIHRvIHRoaXMgZm9ybS5cbiAgICovXG4gIGFkZENvbnRyb2woZGlyOiBOZ0NvbnRyb2wpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjb250cm9sIGZyb20gdGhpcyBmb3JtLlxuICAgKi9cbiAgcmVtb3ZlQ29udHJvbChkaXI6IE5nQ29udHJvbCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIExvb2sgdXAgdGhlIHtAbGluayBGb3JtQ29udHJvbH0gYXNzb2NpYXRlZCB3aXRoIGEgcGFydGljdWxhciB7QGxpbmsgTmdDb250cm9sfS5cbiAgICovXG4gIGdldENvbnRyb2woZGlyOiBOZ0NvbnRyb2wpOiBGb3JtQ29udHJvbDtcblxuICAvKipcbiAgICogQWRkIGEgZ3JvdXAgb2YgY29udHJvbHMgdG8gdGhpcyBmb3JtLlxuICAgKi9cbiAgYWRkRm9ybUdyb3VwKGRpcjogQWJzdHJhY3RGb3JtR3JvdXBEaXJlY3RpdmUpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBncm91cCBvZiBjb250cm9scyBmcm9tIHRoaXMgZm9ybS5cbiAgICovXG4gIHJlbW92ZUZvcm1Hcm91cChkaXI6IEFic3RyYWN0Rm9ybUdyb3VwRGlyZWN0aXZlKTogdm9pZDtcblxuICAvKipcbiAgICogTG9vayB1cCB0aGUge0BsaW5rIEZvcm1Hcm91cH0gYXNzb2NpYXRlZCB3aXRoIGEgcGFydGljdWxhciB7QGxpbmsgQWJzdHJhY3RGb3JtR3JvdXBEaXJlY3RpdmV9LlxuICAgKi9cbiAgZ2V0Rm9ybUdyb3VwKGRpcjogQWJzdHJhY3RGb3JtR3JvdXBEaXJlY3RpdmUpOiBGb3JtR3JvdXA7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgbW9kZWwgZm9yIGEgcGFydGljdWxhciBjb250cm9sIHdpdGggYSBuZXcgdmFsdWUuXG4gICAqL1xuICB1cGRhdGVNb2RlbChkaXI6IE5nQ29udHJvbCwgdmFsdWU6IGFueSk6IHZvaWQ7XG59XG4iXX0=