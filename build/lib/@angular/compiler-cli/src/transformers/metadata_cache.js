/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/transformers/metadata_cache", ["require", "exports", "tslib", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ts = require("typescript");
    /**
     * Cache, and potentially transform, metadata as it is being collected.
     */
    var MetadataCache = /** @class */ (function () {
        function MetadataCache(collector, strict, transformers) {
            this.collector = collector;
            this.strict = strict;
            this.transformers = transformers;
            this.metadataCache = new Map();
            try {
                for (var transformers_1 = tslib_1.__values(transformers), transformers_1_1 = transformers_1.next(); !transformers_1_1.done; transformers_1_1 = transformers_1.next()) {
                    var transformer = transformers_1_1.value;
                    if (transformer.connect) {
                        transformer.connect(this);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (transformers_1_1 && !transformers_1_1.done && (_a = transformers_1.return)) _a.call(transformers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _a;
        }
        MetadataCache.prototype.getMetadata = function (sourceFile) {
            if (this.metadataCache.has(sourceFile.fileName)) {
                return this.metadataCache.get(sourceFile.fileName);
            }
            var substitute = undefined;
            // Only process transformers on modules that are not declaration files.
            var declarationFile = sourceFile.isDeclarationFile;
            var moduleFile = ts.isExternalModule(sourceFile);
            if (!declarationFile && moduleFile) {
                var _loop_1 = function (transform) {
                    var transformSubstitute = transform.start(sourceFile);
                    if (transformSubstitute) {
                        if (substitute) {
                            var previous_1 = substitute;
                            substitute = function (value, node) {
                                return transformSubstitute(previous_1(value, node), node);
                            };
                        }
                        else {
                            substitute = transformSubstitute;
                        }
                    }
                };
                try {
                    for (var _a = tslib_1.__values(this.transformers), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var transform = _b.value;
                        _loop_1(transform);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            var result = this.collector.getMetadata(sourceFile, this.strict, substitute);
            this.metadataCache.set(sourceFile.fileName, result);
            return result;
            var e_2, _c;
        };
        return MetadataCache;
    }());
    exports.MetadataCache = MetadataCache;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGFfY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvc3JjL3RyYW5zZm9ybWVycy9tZXRhZGF0YV9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFFSCwrQkFBaUM7SUFhakM7O09BRUc7SUFDSDtRQUdFLHVCQUNZLFNBQTRCLEVBQVUsTUFBZSxFQUNyRCxZQUFtQztZQURuQyxjQUFTLEdBQVQsU0FBUyxDQUFtQjtZQUFVLFdBQU0sR0FBTixNQUFNLENBQVM7WUFDckQsaUJBQVksR0FBWixZQUFZLENBQXVCO1lBSnZDLGtCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQW9DLENBQUM7O2dCQUtsRSxHQUFHLENBQUMsQ0FBb0IsSUFBQSxpQkFBQSxpQkFBQSxZQUFZLENBQUEsMENBQUE7b0JBQS9CLElBQUksV0FBVyx5QkFBQTtvQkFDbEIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLENBQUM7aUJBQ0Y7Ozs7Ozs7Ozs7UUFDSCxDQUFDO1FBRUQsbUNBQVcsR0FBWCxVQUFZLFVBQXlCO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckQsQ0FBQztZQUNELElBQUksVUFBVSxHQUE2QixTQUFTLENBQUM7WUFFckQsdUVBQXVFO1lBQ3ZFLElBQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztZQUNyRCxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQzt3Q0FDMUIsU0FBUztvQkFDaEIsSUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN4RCxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7d0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQ2YsSUFBTSxVQUFRLEdBQW1CLFVBQVUsQ0FBQzs0QkFDNUMsVUFBVSxHQUFHLFVBQUMsS0FBb0IsRUFBRSxJQUFhO2dDQUM3QyxPQUFBLG1CQUFtQixDQUFDLFVBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDOzRCQUFoRCxDQUFnRCxDQUFDO3dCQUN2RCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQzt3QkFDbkMsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7O29CQVhELEdBQUcsQ0FBQyxDQUFrQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQSxnQkFBQTt3QkFBbEMsSUFBSSxTQUFTLFdBQUE7Z0NBQVQsU0FBUztxQkFXakI7Ozs7Ozs7OztZQUNILENBQUM7WUFFRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxNQUFNLENBQUM7O1FBQ2hCLENBQUM7UUFDSCxvQkFBQztJQUFELENBQUMsQUF6Q0QsSUF5Q0M7SUF6Q1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge01ldGFkYXRhQ29sbGVjdG9yLCBNZXRhZGF0YVZhbHVlLCBNb2R1bGVNZXRhZGF0YX0gZnJvbSAnLi4vbWV0YWRhdGEvaW5kZXgnO1xuXG5pbXBvcnQge01ldGFkYXRhUHJvdmlkZXJ9IGZyb20gJy4vY29tcGlsZXJfaG9zdCc7XG5cbmV4cG9ydCB0eXBlIFZhbHVlVHJhbnNmb3JtID0gKHZhbHVlOiBNZXRhZGF0YVZhbHVlLCBub2RlOiB0cy5Ob2RlKSA9PiBNZXRhZGF0YVZhbHVlO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFkYXRhVHJhbnNmb3JtZXIge1xuICBjb25uZWN0PyhjYWNoZTogTWV0YWRhdGFDYWNoZSk6IHZvaWQ7XG4gIHN0YXJ0KHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBWYWx1ZVRyYW5zZm9ybXx1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2FjaGUsIGFuZCBwb3RlbnRpYWxseSB0cmFuc2Zvcm0sIG1ldGFkYXRhIGFzIGl0IGlzIGJlaW5nIGNvbGxlY3RlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1ldGFkYXRhQ2FjaGUgaW1wbGVtZW50cyBNZXRhZGF0YVByb3ZpZGVyIHtcbiAgcHJpdmF0ZSBtZXRhZGF0YUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIE1vZHVsZU1ldGFkYXRhfHVuZGVmaW5lZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgY29sbGVjdG9yOiBNZXRhZGF0YUNvbGxlY3RvciwgcHJpdmF0ZSBzdHJpY3Q6IGJvb2xlYW4sXG4gICAgICBwcml2YXRlIHRyYW5zZm9ybWVyczogTWV0YWRhdGFUcmFuc2Zvcm1lcltdKSB7XG4gICAgZm9yIChsZXQgdHJhbnNmb3JtZXIgb2YgdHJhbnNmb3JtZXJzKSB7XG4gICAgICBpZiAodHJhbnNmb3JtZXIuY29ubmVjdCkge1xuICAgICAgICB0cmFuc2Zvcm1lci5jb25uZWN0KHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldE1ldGFkYXRhKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBNb2R1bGVNZXRhZGF0YXx1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLm1ldGFkYXRhQ2FjaGUuaGFzKHNvdXJjZUZpbGUuZmlsZU5hbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tZXRhZGF0YUNhY2hlLmdldChzb3VyY2VGaWxlLmZpbGVOYW1lKTtcbiAgICB9XG4gICAgbGV0IHN1YnN0aXR1dGU6IFZhbHVlVHJhbnNmb3JtfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgcHJvY2VzcyB0cmFuc2Zvcm1lcnMgb24gbW9kdWxlcyB0aGF0IGFyZSBub3QgZGVjbGFyYXRpb24gZmlsZXMuXG4gICAgY29uc3QgZGVjbGFyYXRpb25GaWxlID0gc291cmNlRmlsZS5pc0RlY2xhcmF0aW9uRmlsZTtcbiAgICBjb25zdCBtb2R1bGVGaWxlID0gdHMuaXNFeHRlcm5hbE1vZHVsZShzb3VyY2VGaWxlKTtcbiAgICBpZiAoIWRlY2xhcmF0aW9uRmlsZSAmJiBtb2R1bGVGaWxlKSB7XG4gICAgICBmb3IgKGxldCB0cmFuc2Zvcm0gb2YgdGhpcy50cmFuc2Zvcm1lcnMpIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtU3Vic3RpdHV0ZSA9IHRyYW5zZm9ybS5zdGFydChzb3VyY2VGaWxlKTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybVN1YnN0aXR1dGUpIHtcbiAgICAgICAgICBpZiAoc3Vic3RpdHV0ZSkge1xuICAgICAgICAgICAgY29uc3QgcHJldmlvdXM6IFZhbHVlVHJhbnNmb3JtID0gc3Vic3RpdHV0ZTtcbiAgICAgICAgICAgIHN1YnN0aXR1dGUgPSAodmFsdWU6IE1ldGFkYXRhVmFsdWUsIG5vZGU6IHRzLk5vZGUpID0+XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtU3Vic3RpdHV0ZShwcmV2aW91cyh2YWx1ZSwgbm9kZSksIG5vZGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWJzdGl0dXRlID0gdHJhbnNmb3JtU3Vic3RpdHV0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNvbGxlY3Rvci5nZXRNZXRhZGF0YShzb3VyY2VGaWxlLCB0aGlzLnN0cmljdCwgc3Vic3RpdHV0ZSk7XG4gICAgdGhpcy5tZXRhZGF0YUNhY2hlLnNldChzb3VyY2VGaWxlLmZpbGVOYW1lLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0iXX0=