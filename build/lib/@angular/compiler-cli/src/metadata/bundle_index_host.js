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
        define("@angular/compiler-cli/src/metadata/bundle_index_host", ["require", "exports", "tslib", "path", "typescript", "@angular/compiler-cli/src/metadata/bundler", "@angular/compiler-cli/src/metadata/index_writer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var path = require("path");
    var ts = require("typescript");
    var bundler_1 = require("@angular/compiler-cli/src/metadata/bundler");
    var index_writer_1 = require("@angular/compiler-cli/src/metadata/index_writer");
    var DTS = /\.d\.ts$/;
    var JS_EXT = /(\.js|)$/;
    function createSyntheticIndexHost(delegate, syntheticIndex) {
        var normalSyntheticIndexName = path.normalize(syntheticIndex.name);
        var indexContent = syntheticIndex.content;
        var indexMetadata = syntheticIndex.metadata;
        var newHost = Object.create(delegate);
        newHost.fileExists = function (fileName) {
            return path.normalize(fileName) == normalSyntheticIndexName || delegate.fileExists(fileName);
        };
        newHost.readFile = function (fileName) {
            return path.normalize(fileName) == normalSyntheticIndexName ? indexContent :
                delegate.readFile(fileName);
        };
        newHost.getSourceFile =
            function (fileName, languageVersion, onError) {
                if (path.normalize(fileName) == normalSyntheticIndexName) {
                    var sf = ts.createSourceFile(fileName, indexContent, languageVersion, true);
                    if (delegate.fileNameToModuleName) {
                        sf.moduleName = delegate.fileNameToModuleName(fileName);
                    }
                    return sf;
                }
                return delegate.getSourceFile(fileName, languageVersion, onError);
            };
        newHost.writeFile =
            function (fileName, data, writeByteOrderMark, onError, sourceFiles) {
                delegate.writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles);
                if (fileName.match(DTS) && sourceFiles && sourceFiles.length == 1 &&
                    path.normalize(sourceFiles[0].fileName) === normalSyntheticIndexName) {
                    // If we are writing the synthetic index, write the metadata along side.
                    var metadataName = fileName.replace(DTS, '.metadata.json');
                    delegate.writeFile(metadataName, indexMetadata, writeByteOrderMark, onError, []);
                }
            };
        return newHost;
    }
    function createBundleIndexHost(ngOptions, rootFiles, host) {
        var files = rootFiles.filter(function (f) { return !DTS.test(f); });
        var indexFile;
        if (files.length === 1) {
            indexFile = files[0];
        }
        else {
            try {
                for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var f = files_1_1.value;
                    // Assume the shortest file path called index.ts is the entry point
                    if (f.endsWith(path.sep + 'index.ts')) {
                        if (!indexFile || indexFile.length > f.length) {
                            indexFile = f;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (!indexFile) {
            return {
                host: host,
                errors: [{
                        file: null,
                        start: null,
                        length: null,
                        messageText: 'Angular compiler option "flatModuleIndex" requires one and only one .ts file in the "files" field.',
                        category: ts.DiagnosticCategory.Error,
                        code: 0
                    }]
            };
        }
        var indexModule = indexFile.replace(/\.ts$/, '');
        var bundler = new bundler_1.MetadataBundler(indexModule, ngOptions.flatModuleId, new bundler_1.CompilerHostAdapter(host), ngOptions.flatModulePrivateSymbolPrefix);
        var metadataBundle = bundler.getMetadataBundle();
        var metadata = JSON.stringify(metadataBundle.metadata);
        var name = path.join(path.dirname(indexModule), ngOptions.flatModuleOutFile.replace(JS_EXT, '.ts'));
        var libraryIndex = "./" + path.basename(indexModule);
        var content = index_writer_1.privateEntriesToIndex(libraryIndex, metadataBundle.privates);
        host = createSyntheticIndexHost(host, { name: name, content: content, metadata: metadata });
        return { host: host, indexName: name };
        var e_1, _a;
    }
    exports.createBundleIndexHost = createBundleIndexHost;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlX2luZGV4X2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvc3JjL21ldGFkYXRhL2J1bmRsZV9pbmRleF9ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUdILDJCQUE2QjtJQUM3QiwrQkFBaUM7SUFJakMsc0VBQStEO0lBQy9ELGdGQUFxRDtJQUVyRCxJQUFNLEdBQUcsR0FBRyxVQUFVLENBQUM7SUFDdkIsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDO0lBRTFCLGtDQUNJLFFBQVcsRUFBRSxjQUFpRTtRQUNoRixJQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JFLElBQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFDNUMsSUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQztRQUU5QyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBQyxRQUFnQjtZQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSx3QkFBd0IsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9GLENBQUMsQ0FBQztRQUVGLE9BQU8sQ0FBQyxRQUFRLEdBQUcsVUFBQyxRQUFnQjtZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RixDQUFDLENBQUM7UUFFRixPQUFPLENBQUMsYUFBYTtZ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Q0FBQzs7SUFDakMsQ0FBQztJQTVDRCxzREE0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtDb21waWxlck9wdGlvbnN9IGZyb20gJy4uL3RyYW5zZm9ybWVycy9hcGknO1xuXG5pbXBvcnQge0NvbXBpbGVySG9zdEFkYXB0ZXIsIE1ldGFkYXRhQnVuZGxlcn0gZnJvbSAnLi9idW5kbGVyJztcbmltcG9ydCB7cHJpdmF0ZUVudHJpZXNUb0luZGV4fSBmcm9tICcuL2luZGV4X3dyaXRlcic7XG5cbmNvbnN0IERUUyA9IC9cXC5kXFwudHMkLztcbmNvbnN0IEpTX0VYVCA9IC8oXFwuanN8KSQvO1xuXG5mdW5jdGlvbiBjcmVhdGVTeW50aGV0aWNJbmRleEhvc3Q8SCBleHRlbmRzIHRzLkNvbXBpbGVySG9zdD4oXG4gICAgZGVsZWdhdGU6IEgsIHN5bnRoZXRpY0luZGV4OiB7bmFtZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIG1ldGFkYXRhOiBzdHJpbmd9KTogSCB7XG4gIGNvbnN0IG5vcm1hbFN5bnRoZXRpY0luZGV4TmFtZSA9IHBhdGgubm9ybWFsaXplKHN5bnRoZXRpY0luZGV4Lm5hbWUpO1xuICBjb25zdCBpbmRleENvbnRlbnQgPSBzeW50aGV0aWNJbmRleC5jb250ZW50O1xuICBjb25zdCBpbmRleE1ldGFkYXRhID0gc3ludGhldGljSW5kZXgubWV0YWRhdGE7XG5cbiAgY29uc3QgbmV3SG9zdCA9IE9iamVjdC5jcmVhdGUoZGVsZWdhdGUpO1xuICBuZXdIb3N0LmZpbGVFeGlzdHMgPSAoZmlsZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBwYXRoLm5vcm1hbGl6ZShmaWxlTmFtZSkgPT0gbm9ybWFsU3ludGhldGljSW5kZXhOYW1lIHx8IGRlbGVnYXRlLmZpbGVFeGlzdHMoZmlsZU5hbWUpO1xuICB9O1xuXG4gIG5ld0hvc3QucmVhZEZpbGUgPSAoZmlsZU5hbWU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBwYXRoLm5vcm1hbGl6ZShmaWxlTmFtZSkgPT0gbm9ybWFsU3ludGhldGljSW5kZXhOYW1lID8gaW5kZXhDb250ZW50IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlLnJlYWRGaWxlKGZpbGVOYW1lKTtcbiAgfTtcblxuICBuZXdIb3N0LmdldFNvdXJjZUZpbGUgPVxuICAgICAgKGZpbGVOYW1lOiBzdHJpbmcsIGxhbmd1YWdlVmVyc2lvbjogdHMuU2NyaXB0VGFyZ2V0LCBvbkVycm9yPzogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCkgPT4ge1xuICAgICAgICBpZiAocGF0aC5ub3JtYWxpemUoZmlsZU5hbWUpID09IG5vcm1hbFN5bnRoZXRpY0luZGV4TmFtZSkge1xuICAgICAgICAgIGNvbnN0IHNmID0gdHMuY3JlYXRlU291cmNlRmlsZShmaWxlTmFtZSwgaW5kZXhDb250ZW50LCBsYW5ndWFnZVZlcnNpb24sIHRydWUpO1xuICAgICAgICAgIGlmICgoZGVsZWdhdGUgYXMgYW55KS5maWxlTmFtZVRvTW9kdWxlTmFtZSkge1xuICAgICAgICAgICAgc2YubW9kdWxlTmFtZSA9IChkZWxlZ2F0ZSBhcyBhbnkpLmZpbGVOYW1lVG9Nb2R1bGVOYW1lKGZpbGVOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNmO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWxlZ2F0ZS5nZXRTb3VyY2VGaWxlKGZpbGVOYW1lLCBsYW5ndWFnZVZlcnNpb24sIG9uRXJyb3IpO1xuICAgICAgfTtcblxuICBuZXdIb3N0LndyaXRlRmlsZSA9XG4gICAgICAoZmlsZU5hbWU6IHN0cmluZywgZGF0YTogc3RyaW5nLCB3cml0ZUJ5dGVPcmRlck1hcms6IGJvb2xlYW4sXG4gICAgICAgb25FcnJvcjogKChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpIHwgdW5kZWZpbmVkLFxuICAgICAgIHNvdXJjZUZpbGVzOiBSZWFkb25seTx0cy5Tb3VyY2VGaWxlPltdKSA9PiB7XG4gICAgICAgIGRlbGVnYXRlLndyaXRlRmlsZShmaWxlTmFtZSwgZGF0YSwgd3JpdGVCeXRlT3JkZXJNYXJrLCBvbkVycm9yLCBzb3VyY2VGaWxlcyk7XG4gICAgICAgIGlmIChmaWxlTmFtZS5tYXRjaChEVFMpICYmIHNvdXJjZUZpbGVzICYmIHNvdXJjZUZpbGVzLmxlbmd0aCA9PSAxICYmXG4gICAgICAgICAgICBwYXRoLm5vcm1hbGl6ZShzb3VyY2VGaWxlc1swXS5maWxlTmFtZSkgPT09IG5vcm1hbFN5bnRoZXRpY0luZGV4TmFtZSkge1xuICAgICAgICAgIC8vIElmIHdlIGFyZSB3cml0aW5nIHRoZSBzeW50aGV0aWMgaW5kZXgsIHdyaXRlIHRoZSBtZXRhZGF0YSBhbG9uZyBzaWRlLlxuICAgICAgICAgIGNvbnN0IG1ldGFkYXRhTmFtZSA9IGZpbGVOYW1lLnJlcGxhY2UoRFRTLCAnLm1ldGFkYXRhLmpzb24nKTtcbiAgICAgICAgICBkZWxlZ2F0ZS53cml0ZUZpbGUobWV0YWRhdGFOYW1lLCBpbmRleE1ldGFkYXRhLCB3cml0ZUJ5dGVPcmRlck1hcmssIG9uRXJyb3IsIFtdKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgcmV0dXJuIG5ld0hvc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdW5kbGVJbmRleEhvc3Q8SCBleHRlbmRzIHRzLkNvbXBpbGVySG9zdD4oXG4gICAgbmdPcHRpb25zOiBDb21waWxlck9wdGlvbnMsIHJvb3RGaWxlczogUmVhZG9ubHlBcnJheTxzdHJpbmc+LFxuICAgIGhvc3Q6IEgpOiB7aG9zdDogSCwgaW5kZXhOYW1lPzogc3RyaW5nLCBlcnJvcnM/OiB0cy5EaWFnbm9zdGljW119IHtcbiAgY29uc3QgZmlsZXMgPSByb290RmlsZXMuZmlsdGVyKGYgPT4gIURUUy50ZXN0KGYpKTtcbiAgbGV0IGluZGV4RmlsZTogc3RyaW5nfHVuZGVmaW5lZDtcbiAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIGluZGV4RmlsZSA9IGZpbGVzWzBdO1xuICB9IGVsc2Uge1xuICAgIGZvciAoY29uc3QgZiBvZiBmaWxlcykge1xuICAgICAgLy8gQXNzdW1lIHRoZSBzaG9ydGVzdCBmaWxlIHBhdGggY2FsbGVkIGluZGV4LnRzIGlzIHRoZSBlbnRyeSBwb2ludFxuICAgICAgaWYgKGYuZW5kc1dpdGgocGF0aC5zZXAgKyAnaW5kZXgudHMnKSkge1xuICAgICAgICBpZiAoIWluZGV4RmlsZSB8fCBpbmRleEZpbGUubGVuZ3RoID4gZi5sZW5ndGgpIHtcbiAgICAgICAgICBpbmRleEZpbGUgPSBmO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICghaW5kZXhGaWxlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhvc3QsXG4gICAgICBlcnJvcnM6IFt7XG4gICAgICAgIGZpbGU6IG51bGwgYXMgYW55IGFzIHRzLlNvdXJjZUZpbGUsXG4gICAgICAgIHN0YXJ0OiBudWxsIGFzIGFueSBhcyBudW1iZXIsXG4gICAgICAgIGxlbmd0aDogbnVsbCBhcyBhbnkgYXMgbnVtYmVyLFxuICAgICAgICBtZXNzYWdlVGV4dDpcbiAgICAgICAgICAgICdBbmd1bGFyIGNvbXBpbGVyIG9wdGlvbiBcImZsYXRNb2R1bGVJbmRleFwiIHJlcXVpcmVzIG9uZSBhbmQgb25seSBvbmUgLnRzIGZpbGUgaW4gdGhlIFwiZmlsZXNcIiBmaWVsZC4nLFxuICAgICAgICBjYXRlZ29yeTogdHMuRGlhZ25vc3RpY0NhdGVnb3J5LkVycm9yLFxuICAgICAgICBjb2RlOiAwXG4gICAgICB9XVxuICAgIH07XG4gIH1cblxuICBjb25zdCBpbmRleE1vZHVsZSA9IGluZGV4RmlsZS5yZXBsYWNlKC9cXC50cyQvLCAnJyk7XG4gIGNvbnN0IGJ1bmRsZXIgPSBuZXcgTWV0YWRhdGFCdW5kbGVyKFxuICAgICAgaW5kZXhNb2R1bGUsIG5nT3B0aW9ucy5mbGF0TW9kdWxlSWQsIG5ldyBDb21waWxlckhvc3RBZGFwdGVyKGhvc3QpLFxuICAgICAgbmdPcHRpb25zLmZsYXRNb2R1bGVQcml2YXRlU3ltYm9sUHJlZml4KTtcbiAgY29uc3QgbWV0YWRhdGFCdW5kbGUgPSBidW5kbGVyLmdldE1ldGFkYXRhQnVuZGxlKCk7XG4gIGNvbnN0IG1ldGFkYXRhID0gSlNPTi5zdHJpbmdpZnkobWV0YWRhdGFCdW5kbGUubWV0YWRhdGEpO1xuICBjb25zdCBuYW1lID1cbiAgICAgIHBhdGguam9pbihwYXRoLmRpcm5hbWUoaW5kZXhNb2R1bGUpLCBuZ09wdGlvbnMuZmxhdE1vZHVsZU91dEZpbGUgIS5yZXBsYWNlKEpTX0VYVCwgJy50cycpKTtcbiAgY29uc3QgbGlicmFyeUluZGV4ID0gYC4vJHtwYXRoLmJhc2VuYW1lKGluZGV4TW9kdWxlKX1gO1xuICBjb25zdCBjb250ZW50ID0gcHJpdmF0ZUVudHJpZXNUb0luZGV4KGxpYnJhcnlJbmRleCwgbWV0YWRhdGFCdW5kbGUucHJpdmF0ZXMpO1xuICBob3N0ID0gY3JlYXRlU3ludGhldGljSW5kZXhIb3N0KGhvc3QsIHtuYW1lLCBjb250ZW50LCBtZXRhZGF0YX0pO1xuICByZXR1cm4ge2hvc3QsIGluZGV4TmFtZTogbmFtZX07XG59XG4iXX0=