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
        define("@angular/compiler/src/injectable_compiler", ["require", "exports", "@angular/compiler/src/compile_metadata", "@angular/compiler/src/identifiers", "@angular/compiler/src/output/output_ast", "@angular/compiler/src/output/value_util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var compile_metadata_1 = require("@angular/compiler/src/compile_metadata");
    var identifiers_1 = require("@angular/compiler/src/identifiers");
    var o = require("@angular/compiler/src/output/output_ast");
    var value_util_1 = require("@angular/compiler/src/output/value_util");
    function mapEntry(key, value) {
        return { key: key, value: value, quoted: false };
    }
    var InjectableCompiler = /** @class */ (function () {
        function InjectableCompiler(reflector, alwaysGenerateDef) {
            this.reflector = reflector;
            this.alwaysGenerateDef = alwaysGenerateDef;
            this.tokenInjector = reflector.resolveExternalReference(identifiers_1.Identifiers.Injector);
        }
        InjectableCompiler.prototype.depsArray = function (deps, ctx) {
            var _this = this;
            return deps.map(function (dep) {
                var token = dep;
                var defaultValue = undefined;
                var args = [token];
                var flags = 0 /* Default */;
                if (Array.isArray(dep)) {
                    for (var i = 0; i < dep.length; i++) {
                        var v = dep[i];
                        if (v) {
                            if (v.ngMetadataName === 'Optional') {
                                defaultValue = null;
                            }
                            else if (v.ngMetadataName === 'SkipSelf') {
                                flags |= 1 /* SkipSelf */;
                            }
                            else if (v.ngMetadataName === 'Self') {
                                flags |= 2 /* Self */;
                            }
                            else if (v.ngMetadataName === 'Inject') {
                                token = v.token;
                            }
                            else {
                                token = v;
                            }
                        }
                    }
                }
                var tokenExpr;
                if (typeof token === 'string') {
                    tokenExpr = o.literal(token);
                }
                else if (token === _this.tokenInjector) {
                    tokenExpr = o.importExpr(identifiers_1.Identifiers.INJECTOR);
                }
                else {
                    tokenExpr = ctx.importExpr(token);
                }
                if (flags !== 0 /* Default */ || defaultValue !== undefined) {
                    args = [tokenExpr, o.literal(defaultValue), o.literal(flags)];
                }
                else {
                    args = [tokenExpr];
                }
                return o.importExpr(identifiers_1.Identifiers.inject).callFn(args);
            });
        };
        InjectableCompiler.prototype.factoryFor = function (injectable, ctx) {
            var retValue;
            if (injectable.useExisting) {
                retValue = o.importExpr(identifiers_1.Identifiers.inject).callFn([ctx.importExpr(injectable.useExisting)]);
            }
            else if (injectable.useFactory) {
                var deps = injectable.deps || [];
                if (deps.length > 0) {
                    retValue = ctx.importExpr(injectable.useFactory).callFn(this.depsArray(deps, ctx));
                }
                else {
                    return ctx.importExpr(injectable.useFactory);
                }
            }
            else if (injectable.useValue) {
                retValue = value_util_1.convertValueToOutputAst(ctx, injectable.useValue);
            }
            else {
                var clazz = injectable.useClass || injectable.symbol;
                var depArgs = this.depsArray(this.reflector.parameters(clazz), ctx);
                retValue = new o.InstantiateExpr(ctx.importExpr(clazz), depArgs);
            }
            return o.fn([], [new o.ReturnStatement(retValue)], undefined, undefined, injectable.symbol.name + '_Factory');
        };
        InjectableCompiler.prototype.injectableDef = function (injectable, ctx) {
            var providedIn = o.NULL_EXPR;
            if (injectable.providedIn !== undefined) {
                if (injectable.providedIn === null) {
                    providedIn = o.NULL_EXPR;
                }
                else if (typeof injectable.providedIn === 'string') {
                    providedIn = o.literal(injectable.providedIn);
                }
                else {
                    providedIn = ctx.importExpr(injectable.providedIn);
                }
            }
            var def = [
                mapEntry('factory', this.factoryFor(injectable, ctx)),
                mapEntry('token', ctx.importExpr(injectable.type.reference)),
                mapEntry('providedIn', providedIn),
            ];
            return o.importExpr(identifiers_1.Identifiers.defineInjectable).callFn([o.literalMap(def)]);
        };
        InjectableCompiler.prototype.compile = function (injectable, ctx) {
            if (this.alwaysGenerateDef || injectable.providedIn !== undefined) {
                var className = compile_metadata_1.identifierName(injectable.type);
                var clazz = new o.ClassStmt(className, null, [
                    new o.ClassField('ngInjectableDef', o.INFERRED_TYPE, [o.StmtModifier.Static], this.injectableDef(injectable, ctx)),
                ], [], new o.ClassMethod(null, [], []), []);
                ctx.statements.push(clazz);
            }
        };
        return InjectableCompiler;
    }());
    exports.InjectableCompiler = InjectableCompiler;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9pbmplY3RhYmxlX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBR0gsMkVBQStIO0lBRy9ILGlFQUEwQztJQUMxQywyREFBeUM7SUFDekMsc0VBQTREO0lBYTVELGtCQUFrQixHQUFXLEVBQUUsS0FBbUI7UUFDaEQsTUFBTSxDQUFDLEVBQUMsR0FBRyxLQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDtRQUVFLDRCQUFvQixTQUEyQixFQUFVLGlCQUEwQjtZQUEvRCxjQUFTLEdBQVQsU0FBUyxDQUFrQjtZQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUztZQUNqRixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7UUFFTyxzQ0FBUyxHQUFqQixVQUFrQixJQUFXLEVBQUUsR0FBa0I7WUFBakQsaUJBeUNDO1lBeENDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztnQkFDakIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUNoQixJQUFJLFlBQVksR0FBRyxTQUFTLENBQUM7Z0JBQzdCLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLElBQUksS0FBSyxrQkFBbUMsQ0FBQztnQkFDN0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1B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QyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsSUFBTSxTQUFTLEdBQUcsaUNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFHLENBQUM7Z0JBQ3BELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDekIsU0FBUyxFQUFFLElBQUksRUFDZjtvQkFDRSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQ1osaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN6QyxFQUNELEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNILENBQUM7UUFDSCx5QkFBQztJQUFELENBQUMsQUF6R0QsSUF5R0M7SUF6R1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N0YXRpY1N5bWJvbH0gZnJvbSAnLi9hb3Qvc3RhdGljX3N5bWJvbCc7XG5pbXBvcnQge0NvbXBpbGVJbmplY3RhYmxlTWV0YWRhdGEsIENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhLCBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSwgaWRlbnRpZmllck5hbWV9IGZyb20gJy4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3J9IGZyb20gJy4vY29tcGlsZV9yZWZsZWN0b3InO1xuaW1wb3J0IHtJbmplY3RGbGFncywgTm9kZUZsYWdzfSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHtJZGVudGlmaWVyc30gZnJvbSAnLi9pZGVudGlmaWVycyc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtjb252ZXJ0VmFsdWVUb091dHB1dEFzdH0gZnJvbSAnLi9vdXRwdXQvdmFsdWVfdXRpbCc7XG5pbXBvcnQge3R5cGVTb3VyY2VTcGFufSBmcm9tICcuL3BhcnNlX3V0aWwnO1xuaW1wb3J0IHtOZ01vZHVsZVByb3ZpZGVyQW5hbHl6ZXJ9IGZyb20gJy4vcHJvdmlkZXJfYW5hbHl6ZXInO1xuaW1wb3J0IHtPdXRwdXRDb250ZXh0fSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJQcm92aWRlckRlZiwgZGVwRGVmLCBwcm92aWRlckRlZn0gZnJvbSAnLi92aWV3X2NvbXBpbGVyL3Byb3ZpZGVyX2NvbXBpbGVyJztcblxudHlwZSBNYXBFbnRyeSA9IHtcbiAga2V5OiBzdHJpbmcsXG4gIHF1b3RlZDogYm9vbGVhbixcbiAgdmFsdWU6IG8uRXhwcmVzc2lvblxufTtcbnR5cGUgTWFwTGl0ZXJhbCA9IE1hcEVudHJ5W107XG5cbmZ1bmN0aW9uIG1hcEVudHJ5KGtleTogc3RyaW5nLCB2YWx1ZTogby5FeHByZXNzaW9uKTogTWFwRW50cnkge1xuICByZXR1cm4ge2tleSwgdmFsdWUsIHF1b3RlZDogZmFsc2V9O1xufVxuXG5leHBvcnQgY2xhc3MgSW5qZWN0YWJsZUNvbXBpbGVyIHtcbiAgcHJpdmF0ZSB0b2tlbkluamVjdG9yOiBTdGF0aWNTeW1ib2w7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmbGVjdG9yOiBDb21waWxlUmVmbGVjdG9yLCBwcml2YXRlIGFsd2F5c0dlbmVyYXRlRGVmOiBib29sZWFuKSB7XG4gICAgdGhpcy50b2tlbkluamVjdG9yID0gcmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5JbmplY3Rvcik7XG4gIH1cblxuICBwcml2YXRlIGRlcHNBcnJheShkZXBzOiBhbnlbXSwgY3R4OiBPdXRwdXRDb250ZXh0KTogby5FeHByZXNzaW9uW10ge1xuICAgIHJldHVybiBkZXBzLm1hcChkZXAgPT4ge1xuICAgICAgbGV0IHRva2VuID0gZGVwO1xuICAgICAgbGV0IGRlZmF1bHRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIGxldCBhcmdzID0gW3Rva2VuXTtcbiAgICAgIGxldCBmbGFnczogSW5qZWN0RmxhZ3MgPSBJbmplY3RGbGFncy5EZWZhdWx0O1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVwKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHYgPSBkZXBbaV07XG4gICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgIGlmICh2Lm5nTWV0YWRhdGFOYW1lID09PSAnT3B0aW9uYWwnKSB7XG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHYubmdNZXRhZGF0YU5hbWUgPT09ICdTa2lwU2VsZicpIHtcbiAgICAgICAgICAgICAgZmxhZ3MgfD0gSW5qZWN0RmxhZ3MuU2tpcFNlbGY7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHYubmdNZXRhZGF0YU5hbWUgPT09ICdTZWxmJykge1xuICAgICAgICAgICAgICBmbGFncyB8PSBJbmplY3RGbGFncy5TZWxmO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2Lm5nTWV0YWRhdGFOYW1lID09PSAnSW5qZWN0Jykge1xuICAgICAgICAgICAgICB0b2tlbiA9IHYudG9rZW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0b2tlbiA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCB0b2tlbkV4cHI6IG8uRXhwcmVzc2lvbjtcbiAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRva2VuRXhwciA9IG8ubGl0ZXJhbCh0b2tlbik7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuID09PSB0aGlzLnRva2VuSW5qZWN0b3IpIHtcbiAgICAgICAgdG9rZW5FeHByID0gby5pbXBvcnRFeHByKElkZW50aWZpZXJzLklOSkVDVE9SKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRva2VuRXhwciA9IGN0eC5pbXBvcnRFeHByKHRva2VuKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZsYWdzICE9PSBJbmplY3RGbGFncy5EZWZhdWx0IHx8IGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFyZ3MgPSBbdG9rZW5FeHByLCBvLmxpdGVyYWwoZGVmYXVsdFZhbHVlKSwgby5saXRlcmFsKGZsYWdzKV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcmdzID0gW3Rva2VuRXhwcl07XG4gICAgICB9XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKElkZW50aWZpZXJzLmluamVjdCkuY2FsbEZuKGFyZ3MpO1xuICAgIH0pO1xuICB9XG5cbiAgZmFjdG9yeUZvcihpbmplY3RhYmxlOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhLCBjdHg6IE91dHB1dENvbnRleHQpOiBvLkV4cHJlc3Npb24ge1xuICAgIGxldCByZXRWYWx1ZTogby5FeHByZXNzaW9uO1xuICAgIGlmIChpbmplY3RhYmxlLnVzZUV4aXN0aW5nKSB7XG4gICAgICByZXRWYWx1ZSA9IG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5pbmplY3QpLmNhbGxGbihbY3R4LmltcG9ydEV4cHIoaW5qZWN0YWJsZS51c2VFeGlzdGluZyldKTtcbiAgICB9IGVsc2UgaWYgKGluamVjdGFibGUudXNlRmFjdG9yeSkge1xuICAgICAgY29uc3QgZGVwcyA9IGluamVjdGFibGUuZGVwcyB8fCBbXTtcbiAgICAgIGlmIChkZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0VmFsdWUgPSBjdHguaW1wb3J0RXhwcihpbmplY3RhYmxlLnVzZUZhY3RvcnkpLmNhbGxGbih0aGlzLmRlcHNBcnJheShkZXBzLCBjdHgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjdHguaW1wb3J0RXhwcihpbmplY3RhYmxlLnVzZUZhY3RvcnkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaW5qZWN0YWJsZS51c2VWYWx1ZSkge1xuICAgICAgcmV0VmFsdWUgPSBjb252ZXJ0VmFsdWVUb091dHB1dEFzdChjdHgsIGluamVjdGFibGUudXNlVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjbGF6eiA9IGluamVjdGFibGUudXNlQ2xhc3MgfHwgaW5qZWN0YWJsZS5zeW1ib2w7XG4gICAgICBjb25zdCBkZXBBcmdzID0gdGhpcy5kZXBzQXJyYXkodGhpcy5yZWZsZWN0b3IucGFyYW1ldGVycyhjbGF6eiksIGN0eCk7XG4gICAgICByZXRWYWx1ZSA9IG5ldyBvLkluc3RhbnRpYXRlRXhwcihjdHguaW1wb3J0RXhwcihjbGF6eiksIGRlcEFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gby5mbihcbiAgICAgICAgW10sIFtuZXcgby5SZXR1cm5TdGF0ZW1lbnQocmV0VmFsdWUpXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgICAgIGluamVjdGFibGUuc3ltYm9sLm5hbWUgKyAnX0ZhY3RvcnknKTtcbiAgfVxuXG4gIGluamVjdGFibGVEZWYoaW5qZWN0YWJsZTogQ29tcGlsZUluamVjdGFibGVNZXRhZGF0YSwgY3R4OiBPdXRwdXRDb250ZXh0KTogby5FeHByZXNzaW9uIHtcbiAgICBsZXQgcHJvdmlkZWRJbjogby5FeHByZXNzaW9uID0gby5OVUxMX0VYUFI7XG4gICAgaWYgKGluamVjdGFibGUucHJvdmlkZWRJbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoaW5qZWN0YWJsZS5wcm92aWRlZEluID09PSBudWxsKSB7XG4gICAgICAgIHByb3ZpZGVkSW4gPSBvLk5VTExfRVhQUjtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGluamVjdGFibGUucHJvdmlkZWRJbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcHJvdmlkZWRJbiA9IG8ubGl0ZXJhbChpbmplY3RhYmxlLnByb3ZpZGVkSW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvdmlkZWRJbiA9IGN0eC5pbXBvcnRFeHByKGluamVjdGFibGUucHJvdmlkZWRJbik7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGRlZjogTWFwTGl0ZXJhbCA9IFtcbiAgICAgIG1hcEVudHJ5KCdmYWN0b3J5JywgdGhpcy5mYWN0b3J5Rm9yKGluamVjdGFibGUsIGN0eCkpLFxuICAgICAgbWFwRW50cnkoJ3Rva2VuJywgY3R4LmltcG9ydEV4cHIoaW5qZWN0YWJsZS50eXBlLnJlZmVyZW5jZSkpLFxuICAgICAgbWFwRW50cnkoJ3Byb3ZpZGVkSW4nLCBwcm92aWRlZEluKSxcbiAgICBdO1xuICAgIHJldHVybiBvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuZGVmaW5lSW5qZWN0YWJsZSkuY2FsbEZuKFtvLmxpdGVyYWxNYXAoZGVmKV0pO1xuICB9XG5cbiAgY29tcGlsZShpbmplY3RhYmxlOiBDb21waWxlSW5qZWN0YWJsZU1ldGFkYXRhLCBjdHg6IE91dHB1dENvbnRleHQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hbHdheXNHZW5lcmF0ZURlZiB8fCBpbmplY3RhYmxlLnByb3ZpZGVkSW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gaWRlbnRpZmllck5hbWUoaW5qZWN0YWJsZS50eXBlKSAhO1xuICAgICAgY29uc3QgY2xhenogPSBuZXcgby5DbGFzc1N0bXQoXG4gICAgICAgICAgY2xhc3NOYW1lLCBudWxsLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIG5ldyBvLkNsYXNzRmllbGQoXG4gICAgICAgICAgICAgICAgJ25nSW5qZWN0YWJsZURlZicsIG8uSU5GRVJSRURfVFlQRSwgW28uU3RtdE1vZGlmaWVyLlN0YXRpY10sXG4gICAgICAgICAgICAgICAgdGhpcy5pbmplY3RhYmxlRGVmKGluamVjdGFibGUsIGN0eCkpLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgW10sIG5ldyBvLkNsYXNzTWV0aG9kKG51bGwsIFtdLCBbXSksIFtdKTtcbiAgICAgIGN0eC5zdGF0ZW1lbnRzLnB1c2goY2xhenopO1xuICAgIH1cbiAgfVxufVxuIl19