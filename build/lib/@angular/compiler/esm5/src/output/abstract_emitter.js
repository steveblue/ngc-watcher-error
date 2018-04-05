/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as o from './output_ast';
import { SourceMapGenerator } from './source_map';
var _SINGLE_QUOTE_ESCAPE_STRING_RE = /'|\\|\n|\r|\$/g;
var _LEGAL_IDENTIFIER_RE = /^[$A-Z_][0-9A-Z_$]*$/i;
var _INDENT_WITH = '  ';
export var CATCH_ERROR_VAR = o.variable('error', null, null);
export var CATCH_STACK_VAR = o.variable('stack', null, null);
var _EmittedLine = /** @class */ (function () {
    function _EmittedLine(indent) {
        this.indent = indent;
        this.partsLength = 0;
        this.parts = [];
        this.srcSpans = [];
    }
    return _EmittedLine;
}());
var EmitterVisitorContext = /** @class */ (function () {
    function EmitterVisitorContext(_indent) {
        this._indent = _indent;
        this._classes = [];
        this._preambleLineCount = 0;
        this._lines = [new _EmittedLine(_indent)];
    }
    EmitterVisitorContext.createRoot = function () { return new EmitterVisitorContext(0); };
    Object.defineProperty(EmitterVisitorContext.prototype, "_currentLine", {
        get: function () { return this._lines[this._lines.length - 1]; },
        enumerable: true,
        configurable: true
    });
    EmitterVisitorContext.prototype.println = function (from, lastPart) {
        if (lastPart === void 0) { lastPart = ''; }
        this.print(from || null, lastPart, true);
    };
    EmitterVisitorContext.prototype.lineIsEmpty = function () { return this._currentLine.parts.length === 0; };
    EmitterVisitorContext.prototype.lineLength = function () {
        return this._currentLine.indent * _INDENT_WITH.length + this._currentLine.partsLength;
    };
    EmitterVisitorContext.prototype.print = function (from, part, newLine) {
        if (newLine === void 0) { newLine = false; }
        if (part.length > 0) {
            this._currentLine.parts.push(part);
            this._currentLine.partsLength += part.length;
            this._currentLine.srcSpans.push(from && from.sourceSpan || null);
        }
        if (newLine) {
            this._lines.push(new _EmittedLine(this._indent));
        }
    };
    EmitterVisitorContext.prototype.removeEmptyLastLine = function () {
        if (this.lineIsEmpty()) {
            this._lines.pop();
        }
    };
    EmitterVisitorContext.prototype.incIndent = function () {
        this._indent++;
        if (this.lineIsEmpty()) {
            this._currentLine.indent = this._indent;
        }
    };
    EmitterVisitorContext.prototype.decIndent = function () {
        this._indent--;
        if (this.lineIsEmpty()) {
            this._currentLine.indent = this._indent;
        }
    };
    EmitterVisitorContext.prototype.pushClass = function (clazz) { this._classes.push(clazz); };
    EmitterVisitorContext.prototype.popClass = function () { return this._classes.pop(); };
    Object.defineProperty(EmitterVisitorContext.prototype, "currentClass", {
        get: function () {
            return this._classes.length > 0 ? this._classes[this._classes.length - 1] : null;
        },
        enumerable: true,
        configurable: true
    });
    EmitterVisitorContext.prototype.toSource = function () {
        return this.sourceLines
            .map(function (l) { return l.parts.length > 0 ? _createIndent(l.indent) + l.parts.join('') : ''; })
            .join('\n');
    };
    EmitterVisitorContext.prototype.toSourceMapGenerator = function (genFilePath, startsAtLine) {
        if (startsAtLine === void 0) { startsAtLine = 0; }
        var map = new SourceMapGenerator(genFilePath);
        var firstOffsetMapped = false;
        var mapFirstOffsetIfNeeded = function () {
            if (!firstOffsetMapped) {
                // Add a single space so that tools won't try to load the file from disk.
                // Note: We are using virtual urls like `ng:///`, so we have to
                // provide a content here.
                map.addSource(genFilePath, ' ').addMapping(0, genFilePath, 0, 0);
                firstOffsetMapped = true;
            }
        };
        for (var i = 0; i < startsAtLine; i++) {
            map.addLine();
            mapFirstOffsetIfNeeded();
        }
        this.sourceLines.forEach(function (line, lineIdx) {
            map.addLine();
            var spans = line.srcSpans;
            var parts = line.parts;
            var col0 = line.indent * _INDENT_WITH.length;
            var spanIdx = 0;
            // skip leading parts without source spans
            while (spanIdx < spans.length && !spans[spanIdx]) {
                col0 += parts[spanIdx].length;
                spanIdx++;
            }
            if (spanIdx < spans.length && lineIdx === 0 && col0 === 0) {
                firstOffsetMapped = true;
            }
            else {
                mapFirstOffsetIfNeeded();
            }
            while (spanIdx < spans.length) {
                var span = spans[spanIdx];
                var source = span.start.file;
                var sourceLine = span.start.line;
                var sourceCol = span.start.col;
                map.addSource(source.url, source.content)
                    .addMapping(col0, source.url, sourceLine, sourceCol);
                col0 += parts[spanIdx].length;
                spanIdx++;
                // assign parts without span or the same span to the previous segment
                while (spanIdx < spans.length && (span === spans[spanIdx] || !spans[spanIdx])) {
                    col0 += parts[spanIdx].length;
                    spanIdx++;
                }
            }
        });
        return map;
    };
    EmitterVisitorContext.prototype.setPreambleLineCount = function (count) { return this._preambleLineCount = count; };
    EmitterVisitorContext.prototype.spanOf = function (line, column) {
        var emittedLine = this._lines[line - this._preambleLineCount];
        if (emittedLine) {
            var columnsLeft = column - _createIndent(emittedLine.indent).length;
            for (var partIndex = 0; partIndex < emittedLine.parts.length; partIndex++) {
                var part = emittedLine.parts[partIndex];
                if (part.length > columnsLeft) {
                    return emittedLine.srcSpans[partIndex];
                }
                columnsLeft -= part.length;
            }
        }
        return null;
    };
    Object.defineProperty(EmitterVisitorContext.prototype, "sourceLines", {
        get: function () {
            if (this._lines.length && this._lines[this._lines.length - 1].parts.length === 0) {
                return this._lines.slice(0, -1);
            }
            return this._lines;
        },
        enumerable: true,
        configurable: true
    });
    return EmitterVisitorContext;
}());
export { EmitterVisitorContext };
var AbstractEmitterVisitor = /** @class */ (function () {
    function AbstractEmitterVisitor(_escapeDollarInStrings) {
        this._escapeDollarInStrings = _escapeDollarInStrings;
    }
    AbstractEmitterVisitor.prototype.visitExpressionStmt = function (stmt, ctx) {
        stmt.expr.visitExpression(this, ctx);
        ctx.println(stmt, ';');
        return null;
    };
    AbstractEmitterVisitor.prototype.visitReturnStmt = function (stmt, ctx) {
        ctx.print(stmt, "return ");
        stmt.value.visitExpression(this, ctx);
        ctx.println(stmt, ';');
        return null;
    };
    AbstractEmitterVisitor.prototype.visitIfStmt = function (stmt, ctx) {
        ctx.print(stmt, "if (");
        stmt.condition.visitExpression(this, ctx);
        ctx.print(stmt, ") {");
        var hasElseCase = stmt.falseCase != null && stmt.falseCase.length > 0;
        if (stmt.trueCase.length <= 1 && !hasElseCase) {
            ctx.print(stmt, " ");
            this.visitAllStatements(stmt.trueCase, ctx);
            ctx.removeEmptyLastLine();
            ctx.print(stmt, " ");
        }
        else {
            ctx.println();
            ctx.incIndent();
            this.visitAllStatements(stmt.trueCase, ctx);
            ctx.decIndent();
            if (hasElseCase) {
                ctx.println(stmt, "} else {");
                ctx.incIndent();
                this.visitAllStatements(stmt.falseCase, ctx);
                ctx.decIndent();
            }
        }
        ctx.println(stmt, "}");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitThrowStmt = function (stmt, ctx) {
        ctx.print(stmt, "throw ");
        stmt.error.visitExpression(this, ctx);
        ctx.println(stmt, ";");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitCommentStmt = function (stmt, ctx) {
        if (stmt.multiline) {
            ctx.println(stmt, "/* " + stmt.comment + " */");
        }
        else {
            stmt.comment.split('\n').forEach(function (line) { ctx.println(stmt, "// " + line); });
        }
        return null;
    };
    AbstractEmitterVisitor.prototype.visitJSDocCommentStmt = function (stmt, ctx) {
        ctx.println(stmt, "/*" + stmt.toString() + "*/");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitWriteVarExpr = function (expr, ctx) {
        var lineWasEmpty = ctx.lineIsEmpty();
        if (!lineWasEmpty) {
            ctx.print(expr, '(');
        }
        ctx.print(expr, expr.name + " = ");
        expr.value.visitExpression(this, ctx);
        if (!lineWasEmpty) {
            ctx.print(expr, ')');
        }
        return null;
    };
    AbstractEmitterVisitor.prototype.visitWriteKeyExpr = function (expr, ctx) {
        var lineWasEmpty = ctx.lineIsEmpty();
        if (!lineWasEmpty) {
            ctx.print(expr, '(');
        }
        expr.receiver.visitExpression(this, ctx);
        ctx.print(expr, "[");
        expr.index.visitExpression(this, ctx);
        ctx.print(expr, "] = ");
        expr.value.visitExpression(this, ctx);
        if (!lineWasEmpty) {
            ctx.print(expr, ')');
        }
        return null;
    };
    AbstractEmitterVisitor.prototype.visitWritePropExpr = function (expr, ctx) {
        var lineWasEmpty = ctx.lineIsEmpty();
        if (!lineWasEmpty) {
            ctx.print(expr, '(');
        }
        expr.receiver.visitExpression(this, ctx);
        ctx.print(expr, "." + expr.name + " = ");
        expr.value.visitExpression(this, ctx);
        if (!lineWasEmpty) {
            ctx.print(expr, ')');
        }
        return null;
    };
    AbstractEmitterVisitor.prototype.visitInvokeMethodExpr = function (expr, ctx) {
        expr.receiver.visitExpression(this, ctx);
        var name = expr.name;
        if (expr.builtin != null) {
            name = this.getBuiltinMethodName(expr.builtin);
            if (name == null) {
                // some builtins just mean to skip the call.
                return null;
            }
        }
        ctx.print(expr, "." + name + "(");
        this.visitAllExpressions(expr.args, ctx, ",");
        ctx.print(expr, ")");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitInvokeFunctionExpr = function (expr, ctx) {
        expr.fn.visitExpression(this, ctx);
        ctx.print(expr, "(");
        this.visitAllExpressions(expr.args, ctx, ',');
        ctx.print(expr, ")");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitReadVarExpr = function (ast, ctx) {
        var varName = ast.name;
        if (ast.builtin != null) {
            switch (ast.builtin) {
                case o.BuiltinVar.Super:
                    varName = 'super';
                    break;
                case o.BuiltinVar.This:
                    varName = 'this';
                    break;
                case o.BuiltinVar.CatchError:
                    varName = CATCH_ERROR_VAR.name;
                    break;
                case o.BuiltinVar.CatchStack:
                    varName = CATCH_STACK_VAR.name;
                    break;
                default:
                    throw new Error("Unknown builtin variable " + ast.builtin);
            }
        }
        ctx.print(ast, varName);
        return null;
    };
    AbstractEmitterVisitor.prototype.visitInstantiateExpr = function (ast, ctx) {
        ctx.print(ast, "new ");
        ast.classExpr.visitExpression(this, ctx);
        ctx.print(ast, "(");
        this.visitAllExpressions(ast.args, ctx, ',');
        ctx.print(ast, ")");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitLiteralExpr = function (ast, ctx) {
        var value = ast.value;
        if (typeof value === 'string') {
            ctx.print(ast, escapeIdentifier(value, this._escapeDollarInStrings));
        }
        else {
            ctx.print(ast, "" + value);
        }
        return null;
    };
    AbstractEmitterVisitor.prototype.visitConditionalExpr = function (ast, ctx) {
        ctx.print(ast, "(");
        ast.condition.visitExpression(this, ctx);
        ctx.print(ast, '? ');
        ast.trueCase.visitExpression(this, ctx);
        ctx.print(ast, ': ');
        ast.falseCase.visitExpression(this, ctx);
        ctx.print(ast, ")");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitNotExpr = function (ast, ctx) {
        ctx.print(ast, '!');
        ast.condition.visitExpression(this, ctx);
        return null;
    };
    AbstractEmitterVisitor.prototype.visitAssertNotNullExpr = function (ast, ctx) {
        ast.condition.visitExpression(this, ctx);
        return null;
    };
    AbstractEmitterVisitor.prototype.visitBinaryOperatorExpr = function (ast, ctx) {
        var opStr;
        switch (ast.operator) {
            case o.BinaryOperator.Equals:
                opStr = '==';
                break;
            case o.BinaryOperator.Identical:
                opStr = '===';
                break;
            case o.BinaryOperator.NotEquals:
                opStr = '!=';
                break;
            case o.BinaryOperator.NotIdentical:
                opStr = '!==';
                break;
            case o.BinaryOperator.And:
                opStr = '&&';
                break;
            case o.BinaryOperator.Or:
                opStr = '||';
                break;
            case o.BinaryOperator.Plus:
                opStr = '+';
                break;
            case o.BinaryOperator.Minus:
                opStr = '-';
                break;
            case o.BinaryOperator.Divide:
                opStr = '/';
                break;
            case o.BinaryOperator.Multiply:
                opStr = '*';
                break;
            case o.BinaryOperator.Modulo:
                opStr = '%';
                break;
            case o.BinaryOperator.Lower:
                opStr = '<';
                break;
            case o.BinaryOperator.LowerEquals:
                opStr = '<=';
                break;
            case o.BinaryOperator.Bigger:
                opStr = '>';
                break;
            case o.BinaryOperator.BiggerEquals:
                opStr = '>=';
                break;
            default:
                throw new Error("Unknown operator " + ast.operator);
        }
        ctx.print(ast, "(");
        ast.lhs.visitExpression(this, ctx);
        ctx.print(ast, " " + opStr + " ");
        ast.rhs.visitExpression(this, ctx);
        ctx.print(ast, ")");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitReadPropExpr = function (ast, ctx) {
        ast.receiver.visitExpression(this, ctx);
        ctx.print(ast, ".");
        ctx.print(ast, ast.name);
        return null;
    };
    AbstractEmitterVisitor.prototype.visitReadKeyExpr = function (ast, ctx) {
        ast.receiver.visitExpression(this, ctx);
        ctx.print(ast, "[");
        ast.index.visitExpression(this, ctx);
        ctx.print(ast, "]");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitLiteralArrayExpr = function (ast, ctx) {
        ctx.print(ast, "[");
        this.visitAllExpressions(ast.entries, ctx, ',');
        ctx.print(ast, "]");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitLiteralMapExpr = function (ast, ctx) {
        var _this = this;
        ctx.print(ast, "{");
        this.visitAllObjects(function (entry) {
            ctx.print(ast, escapeIdentifier(entry.key, _this._escapeDollarInStrings, entry.quoted) + ":");
            entry.value.visitExpression(_this, ctx);
        }, ast.entries, ctx, ',');
        ctx.print(ast, "}");
        return null;
    };
    AbstractEmitterVisitor.prototype.visitCommaExpr = function (ast, ctx) {
        ctx.print(ast, '(');
        this.visitAllExpressions(ast.parts, ctx, ',');
        ctx.print(ast, ')');
        return null;
    };
    AbstractEmitterVisitor.prototype.visitAllExpressions = function (expressions, ctx, separator) {
        var _this = this;
        this.visitAllObjects(function (expr) { return expr.visitExpression(_this, ctx); }, expressions, ctx, separator);
    };
    AbstractEmitterVisitor.prototype.visitAllObjects = function (handler, expressions, ctx, separator) {
        var incrementedIndent = false;
        for (var i = 0; i < expressions.length; i++) {
            if (i > 0) {
                if (ctx.lineLength() > 80) {
                    ctx.print(null, separator, true);
                    if (!incrementedIndent) {
                        // continuation are marked with double indent.
                        ctx.incIndent();
                        ctx.incIndent();
                        incrementedIndent = true;
                    }
                }
                else {
                    ctx.print(null, separator, false);
                }
            }
            handler(expressions[i]);
        }
        if (incrementedIndent) {
            // continuation are marked with double indent.
            ctx.decIndent();
            ctx.decIndent();
        }
    };
    AbstractEmitterVisitor.prototype.visitAllStatements = function (statements, ctx) {
        var _this = this;
        statements.forEach(function (stmt) { return stmt.visitStatement(_this, ctx); });
    };
    return AbstractEmitterVisitor;
}());
export { AbstractEmitterVisitor };
export function escapeIdentifier(input, escapeDollar, alwaysQuote) {
    if (alwaysQuote === void 0) { alwaysQuote = true; }
    if (input == null) {
        return null;
    }
    var body = input.replace(_SINGLE_QUOTE_ESCAPE_STRING_RE, function () {
        var match = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            match[_i] = arguments[_i];
        }
        if (match[0] == '$') {
            return escapeDollar ? '\\$' : '$';
        }
        else if (match[0] == '\n') {
            return '\\n';
        }
        else if (match[0] == '\r') {
            return '\\r';
        }
        else {
            return "\\" + match[0];
        }
    });
    var requiresQuotes = alwaysQuote || !_LEGAL_IDENTIFIER_RE.test(body);
    return requiresQuotes ? "'" + body + "'" : body;
}
function _createIndent(count) {
    var res = '';
    for (var i = 0; i < count; i++) {
        res += _INDENT_WITH;
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3RfZW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9vdXRwdXQvYWJzdHJhY3RfZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxPQUFPLEtBQUssQ0FBQyxNQUFNLGNBQWMsQ0FBQztBQUNsQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFaEQsSUFBTSw4QkFBOEIsR0FBRyxnQkFBZ0IsQ0FBQztBQUN4RCxJQUFNLG9CQUFvQixHQUFHLHVCQUF1QixDQUFDO0FBQ3JELElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQztBQUMxQixNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9ELE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFNL0Q7SUFJRSxzQkFBbUIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFIakMsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUNyQixhQUFRLEdBQTZCLEVBQUUsQ0FBQztJQUNKLENBQUM7SUFDdkMsbUJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUVEO0lBT0UsK0JBQW9CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBSDNCLGFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBQzdCLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUVRLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQUMsQ0FBQztJQU41RSxnQ0FBVSxH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QztnQkFDYixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsWUFBWTtnQkFDaEMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDZCxLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRztnQkFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDYixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDdEIsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDYixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSTtnQkFDeEIsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDWixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSztnQkFDekIsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDWixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTTtnQkFDMUIsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDWixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUTtnQkFDNUIsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDWixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTTtnQkFDMUIsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDWixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSztnQkFDekIsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDWixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsV0FBVztnQkFDL0IsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDYixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTTtnQkFDMUIsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDWixLQUFLLENBQUM7WUFDUixLQUFLLENBQUMsQ0FBQyxjQUFj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LENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDcEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLE9BQUssS0FBSyxDQUFDLENBQUMsQ0FBRyxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILElBQU0sY0FBYyxHQUFHLFdBQVcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFJLElBQUksTUFBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDN0MsQ0FBQztBQUVELHVCQUF1QixLQUFhO0lBQ2xDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDL0IsR0FBRyxJQUFJLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGFyc2VTb3VyY2VTcGFufSBmcm9tICcuLi9wYXJzZV91dGlsJztcblxuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dF9hc3QnO1xuaW1wb3J0IHtTb3VyY2VNYXBHZW5lcmF0b3J9IGZyb20gJy4vc291cmNlX21hcCc7XG5cbmNvbnN0IF9TSU5HTEVfUVVPVEVfRVNDQVBFX1NUUklOR19SRSA9IC8nfFxcXFx8XFxufFxccnxcXCQvZztcbmNvbnN0IF9MRUdBTF9JREVOVElGSUVSX1JFID0gL15bJEEtWl9dWzAtOUEtWl8kXSokL2k7XG5jb25zdCBfSU5ERU5UX1dJVEggPSAnICAnO1xuZXhwb3J0IGNvbnN0IENBVENIX0VSUk9SX1ZBUiA9IG8udmFyaWFibGUoJ2Vycm9yJywgbnVsbCwgbnVsbCk7XG5leHBvcnQgY29uc3QgQ0FUQ0hfU1RBQ0tfVkFSID0gby52YXJpYWJsZSgnc3RhY2snLCBudWxsLCBudWxsKTtcblxuZXhwb3J0IGludGVyZmFjZSBPdXRwdXRFbWl0dGVyIHtcbiAgZW1pdFN0YXRlbWVudHMoZ2VuRmlsZVBhdGg6IHN0cmluZywgc3RtdHM6IG8uU3RhdGVtZW50W10sIHByZWFtYmxlPzogc3RyaW5nfG51bGwpOiBzdHJpbmc7XG59XG5cbmNsYXNzIF9FbWl0dGVkTGluZSB7XG4gIHBhcnRzTGVuZ3RoID0gMDtcbiAgcGFydHM6IHN0cmluZ1tdID0gW107XG4gIHNyY1NwYW5zOiAoUGFyc2VTb3VyY2VTcGFufG51bGwpW10gPSBbXTtcbiAgY29uc3RydWN0b3IocHVibGljIGluZGVudDogbnVtYmVyKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRW1pdHRlclZpc2l0b3JDb250ZXh0IHtcbiAgc3RhdGljIGNyZWF0ZVJvb3QoKTogRW1pdHRlclZpc2l0b3JDb250ZXh0IHsgcmV0dXJuIG5ldyBFbWl0dGVyVmlzaXRvckNvbnRleHQoMCk7IH1cblxuICBwcml2YXRlIF9saW5lczogX0VtaXR0ZWRMaW5lW107XG4gIHByaXZhdGUgX2NsYXNzZXM6IG8uQ2xhc3NTdG10W10gPSBbXTtcbiAgcHJpdmF0ZSBfcHJlYW1ibGVMaW5lQ291bnQgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2luZGVudDogbnVtYmVyKSB7IHRoaXMuX2xpbmVzID0gW25ldyBfRW1pdHRlZExpbmUoX2luZGVudCldOyB9XG5cbiAgcHJpdmF0ZSBnZXQgX2N1cnJlbnRMaW5lKCk6IF9FbWl0dGVkTGluZSB7IHJldHVybiB0aGlzLl9saW5lc1t0aGlzLl9saW5lcy5sZW5ndGggLSAxXTsgfVxuXG4gIHByaW50bG4oZnJvbT86IHtzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4gfCBudWxsfXxudWxsLCBsYXN0UGFydDogc3RyaW5nID0gJycpOiB2b2lkIHtcbiAgICB0aGlzLnByaW50KGZyb20gfHwgbnVsbCwgbGFzdFBhcnQsIHRydWUpO1xuICB9XG5cbiAgbGluZUlzRW1wdHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jdXJyZW50TGluZS5wYXJ0cy5sZW5ndGggPT09IDA7IH1cblxuICBsaW5lTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRMaW5lLmluZGVudCAqIF9JTkRFTlRfV0lUSC5sZW5ndGggKyB0aGlzLl9jdXJyZW50TGluZS5wYXJ0c0xlbmd0aDtcbiAgfVxuXG4gIHByaW50KGZyb206IHtzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4gfCBudWxsfXxudWxsLCBwYXJ0OiBzdHJpbmcsIG5ld0xpbmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmIChwYXJ0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRMaW5lLnBhcnRzLnB1c2gocGFydCk7XG4gICAgICB0aGlzLl9jdXJyZW50TGluZS5wYXJ0c0xlbmd0aCArPSBwYXJ0Lmxlbmd0aDtcbiAgICAgIHRoaXMuX2N1cnJlbnRMaW5lLnNyY1NwYW5zLnB1c2goZnJvbSAmJiBmcm9tLnNvdXJjZVNwYW4gfHwgbnVsbCk7XG4gICAgfVxuICAgIGlmIChuZXdMaW5lKSB7XG4gICAgICB0aGlzLl9saW5lcy5wdXNoKG5ldyBfRW1pdHRlZExpbmUodGhpcy5faW5kZW50KSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRW1wdHlMYXN0TGluZSgpIHtcbiAgICBpZiAodGhpcy5saW5lSXNFbXB0eSgpKSB7XG4gICAgICB0aGlzLl9saW5lcy5wb3AoKTtcbiAgICB9XG4gIH1cblxuICBpbmNJbmRlbnQoKSB7XG4gICAgdGhpcy5faW5kZW50Kys7XG4gICAgaWYgKHRoaXMubGluZUlzRW1wdHkoKSkge1xuICAgICAgdGhpcy5fY3VycmVudExpbmUuaW5kZW50ID0gdGhpcy5faW5kZW50O1xuICAgIH1cbiAgfVxuXG4gIGRlY0luZGVudCgpIHtcbiAgICB0aGlzLl9pbmRlbnQtLTtcbiAgICBpZiAodGhpcy5saW5lSXNFbXB0eSgpKSB7XG4gICAgICB0aGlzLl9jdXJyZW50TGluZS5pbmRlbnQgPSB0aGlzLl9pbmRlbnQ7XG4gICAgfVxuICB9XG5cbiAgcHVzaENsYXNzKGNsYXp6OiBvLkNsYXNzU3RtdCkgeyB0aGlzLl9jbGFzc2VzLnB1c2goY2xhenopOyB9XG5cbiAgcG9wQ2xhc3MoKTogby5DbGFzc1N0bXQgeyByZXR1cm4gdGhpcy5fY2xhc3Nlcy5wb3AoKSAhOyB9XG5cbiAgZ2V0IGN1cnJlbnRDbGFzcygpOiBvLkNsYXNzU3RtdHxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY2xhc3Nlcy5sZW5ndGggPiAwID8gdGhpcy5fY2xhc3Nlc1t0aGlzLl9jbGFzc2VzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgfVxuXG4gIHRvU291cmNlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlTGluZXNcbiAgICAgICAgLm1hcChsID0+IGwucGFydHMubGVuZ3RoID4gMCA/IF9jcmVhdGVJbmRlbnQobC5pbmRlbnQpICsgbC5wYXJ0cy5qb2luKCcnKSA6ICcnKVxuICAgICAgICAuam9pbignXFxuJyk7XG4gIH1cblxuICB0b1NvdXJjZU1hcEdlbmVyYXRvcihnZW5GaWxlUGF0aDogc3RyaW5nLCBzdGFydHNBdExpbmU6IG51bWJlciA9IDApOiBTb3VyY2VNYXBHZW5lcmF0b3Ige1xuICAgIGNvbnN0IG1hcCA9IG5ldyBTb3VyY2VNYXBHZW5lcmF0b3IoZ2VuRmlsZVBhdGgpO1xuXG4gICAgbGV0IGZpcnN0T2Zmc2V0TWFwcGVkID0gZmFsc2U7XG4gICAgY29uc3QgbWFwRmlyc3RPZmZzZXRJZk5lZWRlZCA9ICgpID0+IHtcbiAgICAgIGlmICghZmlyc3RPZmZzZXRNYXBwZWQpIHtcbiAgICAgICAgLy8gQWRkIGEgc2luZ2xlIHNwYWNlIHNvIHRoYXQgdG9vbHMgd29uJ3QgdHJ5IHRvIGxvYWQgdGhlIGZpbGUgZnJvbSBkaXNrLlxuICAgICAgICAvLyBOb3RlOiBXZSBhcmUgdXNpbmcgdmlydHVhbCB1cmxzIGxpa2UgYG5nOi8vL2AsIHNvIHdlIGhhdmUgdG9cbiAgICAgICAgLy8gcHJvdmlkZSBhIGNvbnRlbnQgaGVyZS5cbiAgICAgICAgbWFwLmFkZFNvdXJjZShnZW5GaWxlUGF0aCwgJyAnKS5hZGRNYXBwaW5nKDAsIGdlbkZpbGVQYXRoLCAwLCAwKTtcbiAgICAgICAgZmlyc3RPZmZzZXRNYXBwZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXJ0c0F0TGluZTsgaSsrKSB7XG4gICAgICBtYXAuYWRkTGluZSgpO1xuICAgICAgbWFwRmlyc3RPZmZzZXRJZk5lZWRlZCgpO1xuICAgIH1cblxuICAgIHRoaXMuc291cmNlTGluZXMuZm9yRWFjaCgobGluZSwgbGluZUlkeCkgPT4ge1xuICAgICAgbWFwLmFkZExpbmUoKTtcblxuICAgICAgY29uc3Qgc3BhbnMgPSBsaW5lLnNyY1NwYW5zO1xuICAgICAgY29uc3QgcGFydHMgPSBsaW5lLnBhcnRzO1xuICAgICAgbGV0IGNvbDAgPSBsaW5lLmluZGVudCAqIF9JTkRFTlRfV0lUSC5sZW5ndGg7XG4gICAgICBsZXQgc3BhbklkeCA9IDA7XG4gICAgICAvLyBza2lwIGxlYWRpbmcgcGFydHMgd2l0aG91dCBzb3VyY2Ugc3BhbnNcbiAgICAgIHdoaWxlIChzcGFuSWR4IDwgc3BhbnMubGVuZ3RoICYmICFzcGFuc1tzcGFuSWR4XSkge1xuICAgICAgICBjb2wwICs9IHBhcnRzW3NwYW5JZHhdLmxlbmd0aDtcbiAgICAgICAgc3BhbklkeCsrO1xuICAgICAgfVxuICAgICAgaWYgKHNwYW5JZHggPCBzcGFucy5sZW5ndGggJiYgbGluZUlkeCA9PT0gMCAmJiBjb2wwID09PSAwKSB7XG4gICAgICAgIGZpcnN0T2Zmc2V0TWFwcGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcEZpcnN0T2Zmc2V0SWZOZWVkZWQoKTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHNwYW5JZHggPCBzcGFucy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc3BhbiA9IHNwYW5zW3NwYW5JZHhdICE7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNwYW4uc3RhcnQuZmlsZTtcbiAgICAgICAgY29uc3Qgc291cmNlTGluZSA9IHNwYW4uc3RhcnQubGluZTtcbiAgICAgICAgY29uc3Qgc291cmNlQ29sID0gc3Bhbi5zdGFydC5jb2w7XG4gICAgICAgIG1hcC5hZGRTb3VyY2Uoc291cmNlLnVybCwgc291cmNlLmNvbnRlbnQpXG4gICAgICAgICAgICAuYWRkTWFwcGluZyhjb2wwLCBzb3VyY2UudXJsLCBzb3VyY2VMaW5lLCBzb3VyY2VDb2wpO1xuXG4gICAgICAgIGNvbDAgKz0gcGFydHNbc3BhbklkeF0ubGVuZ3RoO1xuICAgICAgICBzcGFuSWR4Kys7XG5cbiAgICAgICAgLy8gYXNzaWduIHBhcnRzIHdpdGhvdXQgc3BhbiBvciB0aGUgc2FtZSBzcGFuIHRvIHRoZSBwcmV2aW91cyBzZWdtZW50XG4gICAgICAgIHdoaWxlIChzcGFuSWR4IDwgc3BhbnMubGVuZ3RoICYmIChzcGFuID09PSBzcGFuc1tzcGFuSWR4XSB8fCAhc3BhbnNbc3BhbklkeF0pKSB7XG4gICAgICAgICAgY29sMCArPSBwYXJ0c1tzcGFuSWR4XS5sZW5ndGg7XG4gICAgICAgICAgc3BhbklkeCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgc2V0UHJlYW1ibGVMaW5lQ291bnQoY291bnQ6IG51bWJlcikgeyByZXR1cm4gdGhpcy5fcHJlYW1ibGVMaW5lQ291bnQgPSBjb3VudDsgfVxuXG4gIHNwYW5PZihsaW5lOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogUGFyc2VTb3VyY2VTcGFufG51bGwge1xuICAgIGNvbnN0IGVtaXR0ZWRMaW5lID0gdGhpcy5fbGluZXNbbGluZSAtIHRoaXMuX3ByZWFtYmxlTGluZUNvdW50XTtcbiAgICBpZiAoZW1pdHRlZExpbmUpIHtcbiAgICAgIGxldCBjb2x1bW5zTGVmdCA9IGNvbHVtbiAtIF9jcmVhdGVJbmRlbnQoZW1pdHRlZExpbmUuaW5kZW50KS5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBwYXJ0SW5kZXggPSAwOyBwYXJ0SW5kZXggPCBlbWl0dGVkTGluZS5wYXJ0cy5sZW5ndGg7IHBhcnRJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHBhcnQgPSBlbWl0dGVkTGluZS5wYXJ0c1twYXJ0SW5kZXhdO1xuICAgICAgICBpZiAocGFydC5sZW5ndGggPiBjb2x1bW5zTGVmdCkge1xuICAgICAgICAgIHJldHVybiBlbWl0dGVkTGluZS5zcmNTcGFuc1twYXJ0SW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIGNvbHVtbnNMZWZ0IC09IHBhcnQubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHNvdXJjZUxpbmVzKCk6IF9FbWl0dGVkTGluZVtdIHtcbiAgICBpZiAodGhpcy5fbGluZXMubGVuZ3RoICYmIHRoaXMuX2xpbmVzW3RoaXMuX2xpbmVzLmxlbmd0aCAtIDFdLnBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xpbmVzLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2xpbmVzO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEVtaXR0ZXJWaXNpdG9yIGltcGxlbWVudHMgby5TdGF0ZW1lbnRWaXNpdG9yLCBvLkV4cHJlc3Npb25WaXNpdG9yIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZXNjYXBlRG9sbGFySW5TdHJpbmdzOiBib29sZWFuKSB7fVxuXG4gIHZpc2l0RXhwcmVzc2lvblN0bXQoc3RtdDogby5FeHByZXNzaW9uU3RhdGVtZW50LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgc3RtdC5leHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGN0eC5wcmludGxuKHN0bXQsICc7Jyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdFJldHVyblN0bXQoc3RtdDogby5SZXR1cm5TdGF0ZW1lbnQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoc3RtdCwgYHJldHVybiBgKTtcbiAgICBzdG10LnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGN0eC5wcmludGxuKHN0bXQsICc7Jyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhYnN0cmFjdCB2aXNpdENhc3RFeHByKGFzdDogby5DYXN0RXhwciwgY29udGV4dDogYW55KTogYW55O1xuXG4gIGFic3RyYWN0IHZpc2l0RGVjbGFyZUNsYXNzU3RtdChzdG10OiBvLkNsYXNzU3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnk7XG5cbiAgdmlzaXRJZlN0bXQoc3RtdDogby5JZlN0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoc3RtdCwgYGlmIChgKTtcbiAgICBzdG10LmNvbmRpdGlvbi52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoc3RtdCwgYCkge2ApO1xuICAgIGNvbnN0IGhhc0Vsc2VDYXNlID0gc3RtdC5mYWxzZUNhc2UgIT0gbnVsbCAmJiBzdG10LmZhbHNlQ2FzZS5sZW5ndGggPiAwO1xuICAgIGlmIChzdG10LnRydWVDYXNlLmxlbmd0aCA8PSAxICYmICFoYXNFbHNlQ2FzZSkge1xuICAgICAgY3R4LnByaW50KHN0bXQsIGAgYCk7XG4gICAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LnRydWVDYXNlLCBjdHgpO1xuICAgICAgY3R4LnJlbW92ZUVtcHR5TGFzdExpbmUoKTtcbiAgICAgIGN0eC5wcmludChzdG10LCBgIGApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHgucHJpbnRsbigpO1xuICAgICAgY3R4LmluY0luZGVudCgpO1xuICAgICAgdGhpcy52aXNpdEFsbFN0YXRlbWVudHMoc3RtdC50cnVlQ2FzZSwgY3R4KTtcbiAgICAgIGN0eC5kZWNJbmRlbnQoKTtcbiAgICAgIGlmIChoYXNFbHNlQ2FzZSkge1xuICAgICAgICBjdHgucHJpbnRsbihzdG10LCBgfSBlbHNlIHtgKTtcbiAgICAgICAgY3R4LmluY0luZGVudCgpO1xuICAgICAgICB0aGlzLnZpc2l0QWxsU3RhdGVtZW50cyhzdG10LmZhbHNlQ2FzZSwgY3R4KTtcbiAgICAgICAgY3R4LmRlY0luZGVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgICBjdHgucHJpbnRsbihzdG10LCBgfWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYWJzdHJhY3QgdmlzaXRUcnlDYXRjaFN0bXQoc3RtdDogby5UcnlDYXRjaFN0bXQsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55O1xuXG4gIHZpc2l0VGhyb3dTdG10KHN0bXQ6IG8uVGhyb3dTdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50KHN0bXQsIGB0aHJvdyBgKTtcbiAgICBzdG10LmVycm9yLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGN0eC5wcmludGxuKHN0bXQsIGA7YCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRDb21tZW50U3RtdChzdG10OiBvLkNvbW1lbnRTdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgaWYgKHN0bXQubXVsdGlsaW5lKSB7XG4gICAgICBjdHgucHJpbnRsbihzdG10LCBgLyogJHtzdG10LmNvbW1lbnR9ICovYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0bXQuY29tbWVudC5zcGxpdCgnXFxuJykuZm9yRWFjaCgobGluZSkgPT4geyBjdHgucHJpbnRsbihzdG10LCBgLy8gJHtsaW5lfWApOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRKU0RvY0NvbW1lbnRTdG10KHN0bXQ6IG8uSlNEb2NDb21tZW50U3RtdCwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpIHtcbiAgICBjdHgucHJpbnRsbihzdG10LCBgLyoke3N0bXQudG9TdHJpbmcoKX0qL2ApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYWJzdHJhY3QgdmlzaXREZWNsYXJlVmFyU3RtdChzdG10OiBvLkRlY2xhcmVWYXJTdG10LCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueTtcblxuICB2aXNpdFdyaXRlVmFyRXhwcihleHByOiBvLldyaXRlVmFyRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IGxpbmVXYXNFbXB0eSA9IGN0eC5saW5lSXNFbXB0eSgpO1xuICAgIGlmICghbGluZVdhc0VtcHR5KSB7XG4gICAgICBjdHgucHJpbnQoZXhwciwgJygnKTtcbiAgICB9XG4gICAgY3R4LnByaW50KGV4cHIsIGAke2V4cHIubmFtZX0gPSBgKTtcbiAgICBleHByLnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGlmICghbGluZVdhc0VtcHR5KSB7XG4gICAgICBjdHgucHJpbnQoZXhwciwgJyknKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRXcml0ZUtleUV4cHIoZXhwcjogby5Xcml0ZUtleUV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjb25zdCBsaW5lV2FzRW1wdHkgPSBjdHgubGluZUlzRW1wdHkoKTtcbiAgICBpZiAoIWxpbmVXYXNFbXB0eSkge1xuICAgICAgY3R4LnByaW50KGV4cHIsICcoJyk7XG4gICAgfVxuICAgIGV4cHIucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGV4cHIsIGBbYCk7XG4gICAgZXhwci5pbmRleC52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoZXhwciwgYF0gPSBgKTtcbiAgICBleHByLnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGlmICghbGluZVdhc0VtcHR5KSB7XG4gICAgICBjdHgucHJpbnQoZXhwciwgJyknKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRXcml0ZVByb3BFeHByKGV4cHI6IG8uV3JpdGVQcm9wRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IGxpbmVXYXNFbXB0eSA9IGN0eC5saW5lSXNFbXB0eSgpO1xuICAgIGlmICghbGluZVdhc0VtcHR5KSB7XG4gICAgICBjdHgucHJpbnQoZXhwciwgJygnKTtcbiAgICB9XG4gICAgZXhwci5yZWNlaXZlci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoZXhwciwgYC4ke2V4cHIubmFtZX0gPSBgKTtcbiAgICBleHByLnZhbHVlLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGlmICghbGluZVdhc0VtcHR5KSB7XG4gICAgICBjdHgucHJpbnQoZXhwciwgJyknKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRJbnZva2VNZXRob2RFeHByKGV4cHI6IG8uSW52b2tlTWV0aG9kRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGV4cHIucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgbGV0IG5hbWUgPSBleHByLm5hbWU7XG4gICAgaWYgKGV4cHIuYnVpbHRpbiAhPSBudWxsKSB7XG4gICAgICBuYW1lID0gdGhpcy5nZXRCdWlsdGluTWV0aG9kTmFtZShleHByLmJ1aWx0aW4pO1xuICAgICAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgICAvLyBzb21lIGJ1aWx0aW5zIGp1c3QgbWVhbiB0byBza2lwIHRoZSBjYWxsLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgY3R4LnByaW50KGV4cHIsIGAuJHtuYW1lfShgKTtcbiAgICB0aGlzLnZpc2l0QWxsRXhwcmVzc2lvbnMoZXhwci5hcmdzLCBjdHgsIGAsYCk7XG4gICAgY3R4LnByaW50KGV4cHIsIGApYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhYnN0cmFjdCBnZXRCdWlsdGluTWV0aG9kTmFtZShtZXRob2Q6IG8uQnVpbHRpbk1ldGhvZCk6IHN0cmluZztcblxuICB2aXNpdEludm9rZUZ1bmN0aW9uRXhwcihleHByOiBvLkludm9rZUZ1bmN0aW9uRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGV4cHIuZm4udmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGV4cHIsIGAoYCk7XG4gICAgdGhpcy52aXNpdEFsbEV4cHJlc3Npb25zKGV4cHIuYXJncywgY3R4LCAnLCcpO1xuICAgIGN0eC5wcmludChleHByLCBgKWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0UmVhZFZhckV4cHIoYXN0OiBvLlJlYWRWYXJFeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgbGV0IHZhck5hbWUgPSBhc3QubmFtZSAhO1xuICAgIGlmIChhc3QuYnVpbHRpbiAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKGFzdC5idWlsdGluKSB7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluVmFyLlN1cGVyOlxuICAgICAgICAgIHZhck5hbWUgPSAnc3VwZXInO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG8uQnVpbHRpblZhci5UaGlzOlxuICAgICAgICAgIHZhck5hbWUgPSAndGhpcyc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluVmFyLkNhdGNoRXJyb3I6XG4gICAgICAgICAgdmFyTmFtZSA9IENBVENIX0VSUk9SX1ZBUi5uYW1lICE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Ugby5CdWlsdGluVmFyLkNhdGNoU3RhY2s6XG4gICAgICAgICAgdmFyTmFtZSA9IENBVENIX1NUQUNLX1ZBUi5uYW1lICE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGJ1aWx0aW4gdmFyaWFibGUgJHthc3QuYnVpbHRpbn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY3R4LnByaW50KGFzdCwgdmFyTmFtZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRJbnN0YW50aWF0ZUV4cHIoYXN0OiBvLkluc3RhbnRpYXRlRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGN0eC5wcmludChhc3QsIGBuZXcgYCk7XG4gICAgYXN0LmNsYXNzRXhwci52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYXN0LCBgKGApO1xuICAgIHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QuYXJncywgY3R4LCAnLCcpO1xuICAgIGN0eC5wcmludChhc3QsIGApYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdExpdGVyYWxFeHByKGFzdDogby5MaXRlcmFsRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGNvbnN0IHZhbHVlID0gYXN0LnZhbHVlO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjdHgucHJpbnQoYXN0LCBlc2NhcGVJZGVudGlmaWVyKHZhbHVlLCB0aGlzLl9lc2NhcGVEb2xsYXJJblN0cmluZ3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LnByaW50KGFzdCwgYCR7dmFsdWV9YCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYWJzdHJhY3QgdmlzaXRFeHRlcm5hbEV4cHIoYXN0OiBvLkV4dGVybmFsRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnk7XG5cbiAgdmlzaXRDb25kaXRpb25hbEV4cHIoYXN0OiBvLkNvbmRpdGlvbmFsRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGN0eC5wcmludChhc3QsIGAoYCk7XG4gICAgYXN0LmNvbmRpdGlvbi52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYXN0LCAnPyAnKTtcbiAgICBhc3QudHJ1ZUNhc2UudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGFzdCwgJzogJyk7XG4gICAgYXN0LmZhbHNlQ2FzZSAhLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIGN0eC5wcmludChhc3QsIGApYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXROb3RFeHByKGFzdDogby5Ob3RFeHByLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCk6IGFueSB7XG4gICAgY3R4LnByaW50KGFzdCwgJyEnKTtcbiAgICBhc3QuY29uZGl0aW9uLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0QXNzZXJ0Tm90TnVsbEV4cHIoYXN0OiBvLkFzc2VydE5vdE51bGwsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBhc3QuY29uZGl0aW9uLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGFic3RyYWN0IHZpc2l0RnVuY3Rpb25FeHByKGFzdDogby5GdW5jdGlvbkV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55O1xuICBhYnN0cmFjdCB2aXNpdERlY2xhcmVGdW5jdGlvblN0bXQoc3RtdDogby5EZWNsYXJlRnVuY3Rpb25TdG10LCBjb250ZXh0OiBhbnkpOiBhbnk7XG5cbiAgdmlzaXRCaW5hcnlPcGVyYXRvckV4cHIoYXN0OiBvLkJpbmFyeU9wZXJhdG9yRXhwciwgY3R4OiBFbWl0dGVyVmlzaXRvckNvbnRleHQpOiBhbnkge1xuICAgIGxldCBvcFN0cjogc3RyaW5nO1xuICAgIHN3aXRjaCAoYXN0Lm9wZXJhdG9yKSB7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuRXF1YWxzOlxuICAgICAgICBvcFN0ciA9ICc9PSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLklkZW50aWNhbDpcbiAgICAgICAgb3BTdHIgPSAnPT09JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuTm90RXF1YWxzOlxuICAgICAgICBvcFN0ciA9ICchPSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk5vdElkZW50aWNhbDpcbiAgICAgICAgb3BTdHIgPSAnIT09JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuQW5kOlxuICAgICAgICBvcFN0ciA9ICcmJic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk9yOlxuICAgICAgICBvcFN0ciA9ICd8fCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLlBsdXM6XG4gICAgICAgIG9wU3RyID0gJysnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5NaW51czpcbiAgICAgICAgb3BTdHIgPSAnLSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLkRpdmlkZTpcbiAgICAgICAgb3BTdHIgPSAnLyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBvLkJpbmFyeU9wZXJhdG9yLk11bHRpcGx5OlxuICAgICAgICBvcFN0ciA9ICcqJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuTW9kdWxvOlxuICAgICAgICBvcFN0ciA9ICclJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG8uQmluYXJ5T3BlcmF0b3IuTG93ZXI6XG4gICAgICAgIG9wU3RyID0gJzwnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5Mb3dlckVxdWFsczpcbiAgICAgICAgb3BTdHIgPSAnPD0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5CaWdnZXI6XG4gICAgICAgIG9wU3RyID0gJz4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Ugby5CaW5hcnlPcGVyYXRvci5CaWdnZXJFcXVhbHM6XG4gICAgICAgIG9wU3RyID0gJz49JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gb3BlcmF0b3IgJHthc3Qub3BlcmF0b3J9YCk7XG4gICAgfVxuICAgIGN0eC5wcmludChhc3QsIGAoYCk7XG4gICAgYXN0Lmxocy52aXNpdEV4cHJlc3Npb24odGhpcywgY3R4KTtcbiAgICBjdHgucHJpbnQoYXN0LCBgICR7b3BTdHJ9IGApO1xuICAgIGFzdC5yaHMudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGFzdCwgYClgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZpc2l0UmVhZFByb3BFeHByKGFzdDogby5SZWFkUHJvcEV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBhc3QucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGFzdCwgYC5gKTtcbiAgICBjdHgucHJpbnQoYXN0LCBhc3QubmFtZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRSZWFkS2V5RXhwcihhc3Q6IG8uUmVhZEtleUV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBhc3QucmVjZWl2ZXIudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGFzdCwgYFtgKTtcbiAgICBhc3QuaW5kZXgudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgY3R4LnByaW50KGFzdCwgYF1gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2aXNpdExpdGVyYWxBcnJheUV4cHIoYXN0OiBvLkxpdGVyYWxBcnJheUV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoYXN0LCBgW2ApO1xuICAgIHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QuZW50cmllcywgY3R4LCAnLCcpO1xuICAgIGN0eC5wcmludChhc3QsIGBdYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRMaXRlcmFsTWFwRXhwcihhc3Q6IG8uTGl0ZXJhbE1hcEV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoYXN0LCBge2ApO1xuICAgIHRoaXMudmlzaXRBbGxPYmplY3RzKGVudHJ5ID0+IHtcbiAgICAgIGN0eC5wcmludChhc3QsIGAke2VzY2FwZUlkZW50aWZpZXIoZW50cnkua2V5LCB0aGlzLl9lc2NhcGVEb2xsYXJJblN0cmluZ3MsIGVudHJ5LnF1b3RlZCl9OmApO1xuICAgICAgZW50cnkudmFsdWUudmlzaXRFeHByZXNzaW9uKHRoaXMsIGN0eCk7XG4gICAgfSwgYXN0LmVudHJpZXMsIGN0eCwgJywnKTtcbiAgICBjdHgucHJpbnQoYXN0LCBgfWApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0Q29tbWFFeHByKGFzdDogby5Db21tYUV4cHIsIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogYW55IHtcbiAgICBjdHgucHJpbnQoYXN0LCAnKCcpO1xuICAgIHRoaXMudmlzaXRBbGxFeHByZXNzaW9ucyhhc3QucGFydHMsIGN0eCwgJywnKTtcbiAgICBjdHgucHJpbnQoYXN0LCAnKScpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZpc2l0QWxsRXhwcmVzc2lvbnMoZXhwcmVzc2lvbnM6IG8uRXhwcmVzc2lvbltdLCBjdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dCwgc2VwYXJhdG9yOiBzdHJpbmcpOlxuICAgICAgdm9pZCB7XG4gICAgdGhpcy52aXNpdEFsbE9iamVjdHMoZXhwciA9PiBleHByLnZpc2l0RXhwcmVzc2lvbih0aGlzLCBjdHgpLCBleHByZXNzaW9ucywgY3R4LCBzZXBhcmF0b3IpO1xuICB9XG5cbiAgdmlzaXRBbGxPYmplY3RzPFQ+KFxuICAgICAgaGFuZGxlcjogKHQ6IFQpID0+IHZvaWQsIGV4cHJlc3Npb25zOiBUW10sIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0LFxuICAgICAgc2VwYXJhdG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgaW5jcmVtZW50ZWRJbmRlbnQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4cHJlc3Npb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgaWYgKGN0eC5saW5lTGVuZ3RoKCkgPiA4MCkge1xuICAgICAgICAgIGN0eC5wcmludChudWxsLCBzZXBhcmF0b3IsIHRydWUpO1xuICAgICAgICAgIGlmICghaW5jcmVtZW50ZWRJbmRlbnQpIHtcbiAgICAgICAgICAgIC8vIGNvbnRpbnVhdGlvbiBhcmUgbWFya2VkIHdpdGggZG91YmxlIGluZGVudC5cbiAgICAgICAgICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICAgICAgICAgIGN0eC5pbmNJbmRlbnQoKTtcbiAgICAgICAgICAgIGluY3JlbWVudGVkSW5kZW50ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3R4LnByaW50KG51bGwsIHNlcGFyYXRvciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBoYW5kbGVyKGV4cHJlc3Npb25zW2ldKTtcbiAgICB9XG4gICAgaWYgKGluY3JlbWVudGVkSW5kZW50KSB7XG4gICAgICAvLyBjb250aW51YXRpb24gYXJlIG1hcmtlZCB3aXRoIGRvdWJsZSBpbmRlbnQuXG4gICAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgICBjdHguZGVjSW5kZW50KCk7XG4gICAgfVxuICB9XG5cbiAgdmlzaXRBbGxTdGF0ZW1lbnRzKHN0YXRlbWVudHM6IG8uU3RhdGVtZW50W10sIGN0eDogRW1pdHRlclZpc2l0b3JDb250ZXh0KTogdm9pZCB7XG4gICAgc3RhdGVtZW50cy5mb3JFYWNoKChzdG10KSA9PiBzdG10LnZpc2l0U3RhdGVtZW50KHRoaXMsIGN0eCkpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVJZGVudGlmaWVyKFxuICAgIGlucHV0OiBzdHJpbmcsIGVzY2FwZURvbGxhcjogYm9vbGVhbiwgYWx3YXlzUXVvdGU6IGJvb2xlYW4gPSB0cnVlKTogYW55IHtcbiAgaWYgKGlucHV0ID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBib2R5ID0gaW5wdXQucmVwbGFjZShfU0lOR0xFX1FVT1RFX0VTQ0FQRV9TVFJJTkdfUkUsICguLi5tYXRjaDogc3RyaW5nW10pID0+IHtcbiAgICBpZiAobWF0Y2hbMF0gPT0gJyQnKSB7XG4gICAgICByZXR1cm4gZXNjYXBlRG9sbGFyID8gJ1xcXFwkJyA6ICckJztcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09ICdcXG4nKSB7XG4gICAgICByZXR1cm4gJ1xcXFxuJztcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09ICdcXHInKSB7XG4gICAgICByZXR1cm4gJ1xcXFxyJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBcXFxcJHttYXRjaFswXX1gO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IHJlcXVpcmVzUXVvdGVzID0gYWx3YXlzUXVvdGUgfHwgIV9MRUdBTF9JREVOVElGSUVSX1JFLnRlc3QoYm9keSk7XG4gIHJldHVybiByZXF1aXJlc1F1b3RlcyA/IGAnJHtib2R5fSdgIDogYm9keTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUluZGVudChjb3VudDogbnVtYmVyKTogc3RyaW5nIHtcbiAgbGV0IHJlcyA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICByZXMgKz0gX0lOREVOVF9XSVRIO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4iXX0=