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
        define("@angular/compiler/src/render3/r3_pipe_compiler", ["require", "exports", "@angular/compiler/src/compile_metadata", "@angular/compiler/src/output/output_ast", "@angular/compiler/src/util", "@angular/compiler/src/render3/r3_identifiers", "@angular/compiler/src/render3/r3_types", "@angular/compiler/src/render3/r3_view_compiler"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var compile_metadata_1 = require("@angular/compiler/src/compile_metadata");
    var o = require("@angular/compiler/src/output/output_ast");
    var util_1 = require("@angular/compiler/src/util");
    var r3_identifiers_1 = require("@angular/compiler/src/render3/r3_identifiers");
    var r3_types_1 = require("@angular/compiler/src/render3/r3_types");
    var r3_view_compiler_1 = require("@angular/compiler/src/render3/r3_view_compiler");
    /**
     * Write a pipe definition to the output context.
     */
    function compilePipe(outputCtx, pipe, reflector, mode) {
        var definitionMapValues = [];
        // e.g. 'type: MyPipe`
        definitionMapValues.push({ key: 'type', value: outputCtx.importExpr(pipe.type.reference), quoted: false });
        // e.g. factory: function MyPipe_Factory() { return new MyPipe(); },
        var templateFactory = r3_view_compiler_1.createFactory(pipe.type, outputCtx, reflector, []);
        definitionMapValues.push({ key: 'factory', value: templateFactory, quoted: false });
        // e.g. pure: true
        if (pipe.pure) {
            definitionMapValues.push({ key: 'pure', value: o.literal(true), quoted: false });
        }
        var className = compile_metadata_1.identifierName(pipe.type);
        className || util_1.error("Cannot resolve the name of " + pipe.type);
        var definitionField = outputCtx.constantPool.propertyNameOf(3 /* Pipe */);
        var definitionFunction = o.importExpr(r3_identifiers_1.Identifiers.definePipe).callFn([o.literalMap(definitionMapValues)]);
        if (mode === 0 /* PartialClass */) {
            outputCtx.statements.push(new o.ClassStmt(
            /* name */ className, 
            /* parent */ null, 
            /* fields */ [new o.ClassField(
                /* name */ definitionField, 
                /* type */ o.INFERRED_TYPE, 
                /* modifiers */ [o.StmtModifier.Static], 
                /* initializer */ definitionFunction)], 
            /* getters */ [], 
            /* constructorMethod */ new o.ClassMethod(null, [], []), 
            /* methods */ []));
        }
        else {
            // Create back-patch definition.
            var classReference = outputCtx.importExpr(pipe.type.reference);
            // Create the back-patch statement
            outputCtx.statements.push(new o.CommentStmt(r3_types_1.BUILD_OPTIMIZER_COLOCATE), classReference.prop(definitionField).set(definitionFunction).toStmt());
        }
    }
    exports.compilePipe = compilePipe;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfcGlwZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX3BpcGVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCwyRUFBa0c7SUFHbEcsMkRBQTBDO0lBQzFDLG1EQUE2QztJQUU3QywrRUFBbUQ7SUFDbkQsbUVBQWdFO0lBQ2hFLG1GQUFpRDtJQUVqRDs7T0FFRztJQUNILHFCQUNJLFNBQXdCLEVBQUUsSUFBeUIsRUFBRSxTQUEyQixFQUNoRixJQUFnQjtRQUNsQixJQUFNLG1CQUFtQixHQUEwRCxFQUFFLENBQUM7UUFFdEYsc0JBQXNCO1FBQ3RCLG1CQUFtQixDQUFDLElBQUksQ0FDcEIsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFFcEYsb0VBQW9FO1FBQ3BFLElBQU0sZUFBZSxHQUFHLGdDQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUVsRixrQkFBa0I7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ2pGLENBQUM7UUFFRCxJQUFNLFNBQVMsR0FBRyxpQ0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQztRQUM5QyxTQUFTLElBQUksWUFBSyxDQUFDLGdDQUE4QixJQUFJLENBQUMsSUFBTSxDQUFDLENBQUM7UUFFOUQsSUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxjQUFjLGNBQXFCLENBQUM7UUFDbkYsSUFBTSxrQkFBa0IsR0FDcEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyw0QkFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUUsRUFBRSxDQUFDLENBQUMsSUFBSSx5QkFBNEIsQ0FBQyxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUztZQUNyQyxVQUFVLENBQUMsU0FBUztZQUNwQixZQUFZLENBQUMsSUFBSTtZQUNqQixZQUFZLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVO2dCQUN6QixVQUFVLENBQUMsZUFBZTtnQkFDMUIsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhO2dCQUMxQixlQUFlLENBQUEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztnQkFDdEMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUMxQyxhQUFhLENBQUEsRUFBRTtZQUNmLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUN2RCxhQUFhLENBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixnQ0FBZ0M7WUFDaEMsSUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWpFLGtDQUFrQztZQUNsQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLG1DQUF3QixDQUFDLEVBQzNDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM3RSxDQUFDO0lBQ0gsQ0FBQztJQTlDRCxrQ0E4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLCBDb21waWxlUGlwZU1ldGFkYXRhLCBpZGVudGlmaWVyTmFtZX0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3J9IGZyb20gJy4uL2NvbXBpbGVfcmVmbGVjdG9yJztcbmltcG9ydCB7RGVmaW5pdGlvbktpbmR9IGZyb20gJy4uL2NvbnN0YW50X3Bvb2wnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge091dHB1dENvbnRleHQsIGVycm9yfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtJZGVudGlmaWVycyBhcyBSM30gZnJvbSAnLi9yM19pZGVudGlmaWVycyc7XG5pbXBvcnQge0JVSUxEX09QVElNSVpFUl9DT0xPQ0FURSwgT3V0cHV0TW9kZX0gZnJvbSAnLi9yM190eXBlcyc7XG5pbXBvcnQge2NyZWF0ZUZhY3Rvcnl9IGZyb20gJy4vcjNfdmlld19jb21waWxlcic7XG5cbi8qKlxuICogV3JpdGUgYSBwaXBlIGRlZmluaXRpb24gdG8gdGhlIG91dHB1dCBjb250ZXh0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZVBpcGUoXG4gICAgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0LCBwaXBlOiBDb21waWxlUGlwZU1ldGFkYXRhLCByZWZsZWN0b3I6IENvbXBpbGVSZWZsZWN0b3IsXG4gICAgbW9kZTogT3V0cHV0TW9kZSkge1xuICBjb25zdCBkZWZpbml0aW9uTWFwVmFsdWVzOiB7a2V5OiBzdHJpbmcsIHF1b3RlZDogYm9vbGVhbiwgdmFsdWU6IG8uRXhwcmVzc2lvbn1bXSA9IFtdO1xuXG4gIC8vIGUuZy4gJ3R5cGU6IE15UGlwZWBcbiAgZGVmaW5pdGlvbk1hcFZhbHVlcy5wdXNoKFxuICAgICAge2tleTogJ3R5cGUnLCB2YWx1ZTogb3V0cHV0Q3R4LmltcG9ydEV4cHIocGlwZS50eXBlLnJlZmVyZW5jZSksIHF1b3RlZDogZmFsc2V9KTtcblxuICAvLyBlLmcuIGZhY3Rvcnk6IGZ1bmN0aW9uIE15UGlwZV9GYWN0b3J5KCkgeyByZXR1cm4gbmV3IE15UGlwZSgpOyB9LFxuICBjb25zdCB0ZW1wbGF0ZUZhY3RvcnkgPSBjcmVhdGVGYWN0b3J5KHBpcGUudHlwZSwgb3V0cHV0Q3R4LCByZWZsZWN0b3IsIFtdKTtcbiAgZGVmaW5pdGlvbk1hcFZhbHVlcy5wdXNoKHtrZXk6ICdmYWN0b3J5JywgdmFsdWU6IHRlbXBsYXRlRmFjdG9yeSwgcXVvdGVkOiBmYWxzZX0pO1xuXG4gIC8vIGUuZy4gcHVyZTogdHJ1ZVxuICBpZiAocGlwZS5wdXJlKSB7XG4gICAgZGVmaW5pdGlvbk1hcFZhbHVlcy5wdXNoKHtrZXk6ICdwdXJlJywgdmFsdWU6IG8ubGl0ZXJhbCh0cnVlKSwgcXVvdGVkOiBmYWxzZX0pO1xuICB9XG5cbiAgY29uc3QgY2xhc3NOYW1lID0gaWRlbnRpZmllck5hbWUocGlwZS50eXBlKSAhO1xuICBjbGFzc05hbWUgfHwgZXJyb3IoYENhbm5vdCByZXNvbHZlIHRoZSBuYW1lIG9mICR7cGlwZS50eXBlfWApO1xuXG4gIGNvbnN0IGRlZmluaXRpb25GaWVsZCA9IG91dHB1dEN0eC5jb25zdGFudFBvb2wucHJvcGVydHlOYW1lT2YoRGVmaW5pdGlvbktpbmQuUGlwZSk7XG4gIGNvbnN0IGRlZmluaXRpb25GdW5jdGlvbiA9XG4gICAgICBvLmltcG9ydEV4cHIoUjMuZGVmaW5lUGlwZSkuY2FsbEZuKFtvLmxpdGVyYWxNYXAoZGVmaW5pdGlvbk1hcFZhbHVlcyldKTtcblxuICBpZiAobW9kZSA9PT0gT3V0cHV0TW9kZS5QYXJ0aWFsQ2xhc3MpIHtcbiAgICBvdXRwdXRDdHguc3RhdGVtZW50cy5wdXNoKG5ldyBvLkNsYXNzU3RtdChcbiAgICAgICAgLyogbmFtZSAqLyBjbGFzc05hbWUsXG4gICAgICAgIC8qIHBhcmVudCAqLyBudWxsLFxuICAgICAgICAvKiBmaWVsZHMgKi9bbmV3IG8uQ2xhc3NGaWVsZChcbiAgICAgICAgICAgIC8qIG5hbWUgKi8gZGVmaW5pdGlvbkZpZWxkLFxuICAgICAgICAgICAgLyogdHlwZSAqLyBvLklORkVSUkVEX1RZUEUsXG4gICAgICAgICAgICAvKiBtb2RpZmllcnMgKi9bby5TdG10TW9kaWZpZXIuU3RhdGljXSxcbiAgICAgICAgICAgIC8qIGluaXRpYWxpemVyICovIGRlZmluaXRpb25GdW5jdGlvbildLFxuICAgICAgICAvKiBnZXR0ZXJzICovW10sXG4gICAgICAgIC8qIGNvbnN0cnVjdG9yTWV0aG9kICovIG5ldyBvLkNsYXNzTWV0aG9kKG51bGwsIFtdLCBbXSksXG4gICAgICAgIC8qIG1ldGhvZHMgKi9bXSkpO1xuICB9IGVsc2Uge1xuICAgIC8vIENyZWF0ZSBiYWNrLXBhdGNoIGRlZmluaXRpb24uXG4gICAgY29uc3QgY2xhc3NSZWZlcmVuY2UgPSBvdXRwdXRDdHguaW1wb3J0RXhwcihwaXBlLnR5cGUucmVmZXJlbmNlKTtcblxuICAgIC8vIENyZWF0ZSB0aGUgYmFjay1wYXRjaCBzdGF0ZW1lbnRcbiAgICBvdXRwdXRDdHguc3RhdGVtZW50cy5wdXNoKFxuICAgICAgICBuZXcgby5Db21tZW50U3RtdChCVUlMRF9PUFRJTUlaRVJfQ09MT0NBVEUpLFxuICAgICAgICBjbGFzc1JlZmVyZW5jZS5wcm9wKGRlZmluaXRpb25GaWVsZCkuc2V0KGRlZmluaXRpb25GdW5jdGlvbikudG9TdG10KCkpO1xuICB9XG59Il19