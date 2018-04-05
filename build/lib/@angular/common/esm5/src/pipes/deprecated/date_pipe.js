/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
  */
import * as tslib_1 from "tslib";
import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import { ISO8601_DATE_REGEX, isoStringToDate } from '../../i18n/format_date';
import { invalidPipeArgumentError } from '../invalid_pipe_argument_error';
import { DateFormatter } from './intl';
/**
 * @ngModule CommonModule
 * @whatItDoes Formats a date according to locale rules.
 * @howToUse `date_expression | date[:format]`
 * @description
 *
 * Where:
 * - `expression` is a date object or a number (milliseconds since UTC epoch) or an ISO string
 * (https://www.w3.org/TR/NOTE-datetime).
 * - `format` indicates which date/time components to include. The format can be predefined as
 *   shown below or custom as shown in the table.
 *   - `'medium'`: equivalent to `'yMMMdjms'` (e.g. `Sep 3, 2010, 12:05:08 PM` for `en-US`)
 *   - `'short'`: equivalent to `'yMdjm'` (e.g. `9/3/2010, 12:05 PM` for `en-US`)
 *   - `'fullDate'`: equivalent to `'yMMMMEEEEd'` (e.g. `Friday, September 3, 2010` for `en-US`)
 *   - `'longDate'`: equivalent to `'yMMMMd'` (e.g. `September 3, 2010` for `en-US`)
 *   - `'mediumDate'`: equivalent to `'yMMMd'` (e.g. `Sep 3, 2010` for `en-US`)
 *   - `'shortDate'`: equivalent to `'yMd'` (e.g. `9/3/2010` for `en-US`)
 *   - `'mediumTime'`: equivalent to `'jms'` (e.g. `12:05:08 PM` for `en-US`)
 *   - `'shortTime'`: equivalent to `'jm'` (e.g. `12:05 PM` for `en-US`)
 *
 *
 *  | Component | Symbol | Narrow | Short Form   | Long Form         | Numeric   | 2-digit   |
 *  |-----------|:------:|--------|--------------|-------------------|-----------|-----------|
 *  | era       |   G    | G (A)  | GGG (AD)     | GGGG (Anno Domini)| -         | -         |
 *  | year      |   y    | -      | -            | -                 | y (2015)  | yy (15)   |
 *  | month     |   M    | L (S)  | MMM (Sep)    | MMMM (September)  | M (9)     | MM (09)   |
 *  | day       |   d    | -      | -            | -                 | d (3)     | dd (03)   |
 *  | weekday   |   E    | E (S)  | EEE (Sun)    | EEEE (Sunday)     | -         | -         |
 *  | hour      |   j    | -      | -            | -                 | j (13)    | jj (13)   |
 *  | hour12    |   h    | -      | -            | -                 | h (1 PM)  | hh (01 PM)|
 *  | hour24    |   H    | -      | -            | -                 | H (13)    | HH (13)   |
 *  | minute    |   m    | -      | -            | -                 | m (5)     | mm (05)   |
 *  | second    |   s    | -      | -            | -                 | s (9)     | ss (09)   |
 *  | timezone  |   z    | -      | -            | z (Pacific Standard Time)| -  | -         |
 *  | timezone  |   Z    | -      | Z (GMT-8:00) | -                 | -         | -         |
 *  | timezone  |   a    | -      | a (PM)       | -                 | -         | -         |
 *
 * In javascript, only the components specified will be respected (not the ordering,
 * punctuations, ...) and details of the formatting will be dependent on the locale.
 *
 * Timezone of the formatted text will be the local system timezone of the end-user's machine.
 *
 * When the expression is a ISO string without time (e.g. 2016-09-19) the time zone offset is not
 * applied and the formatted text will have the same day, month and year of the expression.
 *
 * WARNINGS:
 * - this pipe is marked as pure hence it will not be re-evaluated when the input is mutated.
 *   Instead users should treat the date as an immutable object and change the reference when the
 *   pipe needs to re-run (this is to avoid reformatting the date on every change detection run
 *   which would be an expensive operation).
 * - this pipe uses the Internationalization API. Therefore it is only reliable in Chrome and Opera
 *   browsers.
 *
 * ### Examples
 *
 * Assuming `dateObj` is (year: 2010, month: 9, day: 3, hour: 12 PM, minute: 05, second: 08)
 * in the _local_ time and locale is 'en-US':
 *
 * {@example common/pipes/ts/date_pipe.ts region='DeprecatedDatePipe'}
 *
 * @stable
 */
var DeprecatedDatePipe = /** @class */ (function () {
    function DeprecatedDatePipe(_locale) {
        this._locale = _locale;
    }
    DeprecatedDatePipe.prototype.transform = function (value, pattern) {
        if (pattern === void 0) { pattern = 'mediumDate'; }
        if (value == null || value === '' || value !== value)
            return null;
        var date;
        if (typeof value === 'string') {
            value = value.trim();
        }
        if (isDate(value)) {
            date = value;
        }
        else if (!isNaN(value - parseFloat(value))) {
            date = new Date(parseFloat(value));
        }
        else if (typeof value === 'string' && /^(\d{4}-\d{1,2}-\d{1,2})$/.test(value)) {
            /**
                   * For ISO Strings without time the day, month and year must be extracted from the ISO String
                   * before Date creation to avoid time offset and errors in the new Date.
                   * If we only replace '-' with ',' in the ISO String ("2015,01,01"), and try to create a new
                   * date, some browsers (e.g. IE 9) will throw an invalid Date error
                   * If we leave the '-' ("2015-01-01") and try to create a new Date("2015-01-01") the
                   * timeoffset
                   * is applied
                   * Note: ISO months are 0 for January, 1 for February, ...
                   */
            var _a = tslib_1.__read(value.split('-').map(function (val) { return parseInt(val, 10); }), 3), y = _a[0], m = _a[1], d = _a[2];
            date = new Date(y, m - 1, d);
        }
        else {
            date = new Date(value);
        }
        if (!isDate(date)) {
            var match = void 0;
            if ((typeof value === 'string') && (match = value.match(ISO8601_DATE_REGEX))) {
                date = isoStringToDate(match);
            }
            else {
                throw invalidPipeArgumentError(DeprecatedDatePipe, value);
            }
        }
        return DateFormatter.format(date, this._locale, DeprecatedDatePipe._ALIASES[pattern] || pattern);
    };
    /** @internal */
    DeprecatedDatePipe._ALIASES = {
        'medium': 'yMMMdjms',
        'short': 'yMdjm',
        'fullDate': 'yMMMMEEEEd',
        'longDate': 'yMMMMd',
        'mediumDate': 'yMMMd',
        'shortDate': 'yMd',
        'mediumTime': 'jms',
        'shortTime': 'jm'
    };
    DeprecatedDatePipe.decorators = [
        { type: Pipe, args: [{ name: 'date', pure: true },] }
    ];
    /** @nocollapse */
    DeprecatedDatePipe.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
    ]; };
    return DeprecatedDatePipe;
}());
export { DeprecatedDatePipe };
function isDate(value) {
    return value instanceof Date && !isNaN(value.valueOf());
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZV9waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL3NyYy9waXBlcy9kZXByZWNhdGVkL2RhdGVfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFDLGtCQUFrQixFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzNFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE4RW5DLDRCQUF1QztRQUFBLFlBQU8sR0FBUCxPQUFPO0tBQVk7SUFFMUQsc0NBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxPQUE4QjtRQUE5Qix3QkFBQSxFQUFBLHNCQUE4QjtRQUNsRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFbEUsSUFBSSxJQUFVLENBQUM7UUFFZixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzlCLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7UUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksR0FBRyxLQUFLLENBQUM7U0FDZDtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNwQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksMkJBQTJCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7WUFXaEYsZ0dBQU8sU0FBQyxFQUFFLFNBQUMsRUFBRSxTQUFDLENBQTZEO1lBQzNFLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksS0FBSyxTQUF1QixDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSx3QkFBd0IsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUMzRDtTQUNGO1FBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQztLQUMxRTs7a0NBdEQwQztRQUN6QyxRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUUsT0FBTztRQUNoQixVQUFVLEVBQUUsWUFBWTtRQUN4QixVQUFVLEVBQUUsUUFBUTtRQUNwQixZQUFZLEVBQUUsT0FBTztRQUNyQixXQUFXLEVBQUUsS0FBSztRQUNsQixZQUFZLEVBQUUsS0FBSztRQUNuQixXQUFXLEVBQUUsSUFBSTtLQUNsQjs7Z0JBWkYsSUFBSSxTQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDOzs7O2dEQWNqQixNQUFNLFNBQUMsU0FBUzs7NkJBekYvQjs7U0E0RWEsa0JBQWtCO0FBMkQvQixnQkFBZ0IsS0FBVTtJQUN4QixNQUFNLENBQUMsS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztDQUN6RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBAbGljZW5zZVxuKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbipcbiogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICAqL1xuXG5pbXBvcnQge0luamVjdCwgTE9DQUxFX0lELCBQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SVNPODYwMV9EQVRFX1JFR0VYLCBpc29TdHJpbmdUb0RhdGV9IGZyb20gJy4uLy4uL2kxOG4vZm9ybWF0X2RhdGUnO1xuaW1wb3J0IHtpbnZhbGlkUGlwZUFyZ3VtZW50RXJyb3J9IGZyb20gJy4uL2ludmFsaWRfcGlwZV9hcmd1bWVudF9lcnJvcic7XG5pbXBvcnQge0RhdGVGb3JtYXR0ZXJ9IGZyb20gJy4vaW50bCc7XG5cbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICogQHdoYXRJdERvZXMgRm9ybWF0cyBhIGRhdGUgYWNjb3JkaW5nIHRvIGxvY2FsZSBydWxlcy5cbiAqIEBob3dUb1VzZSBgZGF0ZV9leHByZXNzaW9uIHwgZGF0ZVs6Zm9ybWF0XWBcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFdoZXJlOlxuICogLSBgZXhwcmVzc2lvbmAgaXMgYSBkYXRlIG9iamVjdCBvciBhIG51bWJlciAobWlsbGlzZWNvbmRzIHNpbmNlIFVUQyBlcG9jaCkgb3IgYW4gSVNPIHN0cmluZ1xuICogKGh0dHBzOi8vd3d3LnczLm9yZy9UUi9OT1RFLWRhdGV0aW1lKS5cbiAqIC0gYGZvcm1hdGAgaW5kaWNhdGVzIHdoaWNoIGRhdGUvdGltZSBjb21wb25lbnRzIHRvIGluY2x1ZGUuIFRoZSBmb3JtYXQgY2FuIGJlIHByZWRlZmluZWQgYXNcbiAqICAgc2hvd24gYmVsb3cgb3IgY3VzdG9tIGFzIHNob3duIGluIHRoZSB0YWJsZS5cbiAqICAgLSBgJ21lZGl1bSdgOiBlcXVpdmFsZW50IHRvIGAneU1NTWRqbXMnYCAoZS5nLiBgU2VwIDMsIDIwMTAsIDEyOjA1OjA4IFBNYCBmb3IgYGVuLVVTYClcbiAqICAgLSBgJ3Nob3J0J2A6IGVxdWl2YWxlbnQgdG8gYCd5TWRqbSdgIChlLmcuIGA5LzMvMjAxMCwgMTI6MDUgUE1gIGZvciBgZW4tVVNgKVxuICogICAtIGAnZnVsbERhdGUnYDogZXF1aXZhbGVudCB0byBgJ3lNTU1NRUVFRWQnYCAoZS5nLiBgRnJpZGF5LCBTZXB0ZW1iZXIgMywgMjAxMGAgZm9yIGBlbi1VU2ApXG4gKiAgIC0gYCdsb25nRGF0ZSdgOiBlcXVpdmFsZW50IHRvIGAneU1NTU1kJ2AgKGUuZy4gYFNlcHRlbWJlciAzLCAyMDEwYCBmb3IgYGVuLVVTYClcbiAqICAgLSBgJ21lZGl1bURhdGUnYDogZXF1aXZhbGVudCB0byBgJ3lNTU1kJ2AgKGUuZy4gYFNlcCAzLCAyMDEwYCBmb3IgYGVuLVVTYClcbiAqICAgLSBgJ3Nob3J0RGF0ZSdgOiBlcXVpdmFsZW50IHRvIGAneU1kJ2AgKGUuZy4gYDkvMy8yMDEwYCBmb3IgYGVuLVVTYClcbiAqICAgLSBgJ21lZGl1bVRpbWUnYDogZXF1aXZhbGVudCB0byBgJ2ptcydgIChlLmcuIGAxMjowNTowOCBQTWAgZm9yIGBlbi1VU2ApXG4gKiAgIC0gYCdzaG9ydFRpbWUnYDogZXF1aXZhbGVudCB0byBgJ2ptJ2AgKGUuZy4gYDEyOjA1IFBNYCBmb3IgYGVuLVVTYClcbiAqXG4gKlxuICogIHwgQ29tcG9uZW50IHwgU3ltYm9sIHwgTmFycm93IHwgU2hvcnQgRm9ybSAgIHwgTG9uZyBGb3JtICAgICAgICAgfCBOdW1lcmljICAgfCAyLWRpZ2l0ICAgfFxuICogIHwtLS0tLS0tLS0tLXw6LS0tLS0tOnwtLS0tLS0tLXwtLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tfFxuICogIHwgZXJhICAgICAgIHwgICBHICAgIHwgRyAoQSkgIHwgR0dHIChBRCkgICAgIHwgR0dHRyAoQW5ubyBEb21pbmkpfCAtICAgICAgICAgfCAtICAgICAgICAgfFxuICogIHwgeWVhciAgICAgIHwgICB5ICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCB5ICgyMDE1KSAgfCB5eSAoMTUpICAgfFxuICogIHwgbW9udGggICAgIHwgICBNICAgIHwgTCAoUykgIHwgTU1NIChTZXApICAgIHwgTU1NTSAoU2VwdGVtYmVyKSAgfCBNICg5KSAgICAgfCBNTSAoMDkpICAgfFxuICogIHwgZGF5ICAgICAgIHwgICBkICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBkICgzKSAgICAgfCBkZCAoMDMpICAgfFxuICogIHwgd2Vla2RheSAgIHwgICBFICAgIHwgRSAoUykgIHwgRUVFIChTdW4pICAgIHwgRUVFRSAoU3VuZGF5KSAgICAgfCAtICAgICAgICAgfCAtICAgICAgICAgfFxuICogIHwgaG91ciAgICAgIHwgICBqICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBqICgxMykgICAgfCBqaiAoMTMpICAgfFxuICogIHwgaG91cjEyICAgIHwgICBoICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBoICgxIFBNKSAgfCBoaCAoMDEgUE0pfFxuICogIHwgaG91cjI0ICAgIHwgICBIICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBIICgxMykgICAgfCBISCAoMTMpICAgfFxuICogIHwgbWludXRlICAgIHwgICBtICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBtICg1KSAgICAgfCBtbSAoMDUpICAgfFxuICogIHwgc2Vjb25kICAgIHwgICBzICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCBzICg5KSAgICAgfCBzcyAoMDkpICAgfFxuICogIHwgdGltZXpvbmUgIHwgICB6ICAgIHwgLSAgICAgIHwgLSAgICAgICAgICAgIHwgeiAoUGFjaWZpYyBTdGFuZGFyZCBUaW1lKXwgLSAgfCAtICAgICAgICAgfFxuICogIHwgdGltZXpvbmUgIHwgICBaICAgIHwgLSAgICAgIHwgWiAoR01ULTg6MDApIHwgLSAgICAgICAgICAgICAgICAgfCAtICAgICAgICAgfCAtICAgICAgICAgfFxuICogIHwgdGltZXpvbmUgIHwgICBhICAgIHwgLSAgICAgIHwgYSAoUE0pICAgICAgIHwgLSAgICAgICAgICAgICAgICAgfCAtICAgICAgICAgfCAtICAgICAgICAgfFxuICpcbiAqIEluIGphdmFzY3JpcHQsIG9ubHkgdGhlIGNvbXBvbmVudHMgc3BlY2lmaWVkIHdpbGwgYmUgcmVzcGVjdGVkIChub3QgdGhlIG9yZGVyaW5nLFxuICogcHVuY3R1YXRpb25zLCAuLi4pIGFuZCBkZXRhaWxzIG9mIHRoZSBmb3JtYXR0aW5nIHdpbGwgYmUgZGVwZW5kZW50IG9uIHRoZSBsb2NhbGUuXG4gKlxuICogVGltZXpvbmUgb2YgdGhlIGZvcm1hdHRlZCB0ZXh0IHdpbGwgYmUgdGhlIGxvY2FsIHN5c3RlbSB0aW1lem9uZSBvZiB0aGUgZW5kLXVzZXIncyBtYWNoaW5lLlxuICpcbiAqIFdoZW4gdGhlIGV4cHJlc3Npb24gaXMgYSBJU08gc3RyaW5nIHdpdGhvdXQgdGltZSAoZS5nLiAyMDE2LTA5LTE5KSB0aGUgdGltZSB6b25lIG9mZnNldCBpcyBub3RcbiAqIGFwcGxpZWQgYW5kIHRoZSBmb3JtYXR0ZWQgdGV4dCB3aWxsIGhhdmUgdGhlIHNhbWUgZGF5LCBtb250aCBhbmQgeWVhciBvZiB0aGUgZXhwcmVzc2lvbi5cbiAqXG4gKiBXQVJOSU5HUzpcbiAqIC0gdGhpcyBwaXBlIGlzIG1hcmtlZCBhcyBwdXJlIGhlbmNlIGl0IHdpbGwgbm90IGJlIHJlLWV2YWx1YXRlZCB3aGVuIHRoZSBpbnB1dCBpcyBtdXRhdGVkLlxuICogICBJbnN0ZWFkIHVzZXJzIHNob3VsZCB0cmVhdCB0aGUgZGF0ZSBhcyBhbiBpbW11dGFibGUgb2JqZWN0IGFuZCBjaGFuZ2UgdGhlIHJlZmVyZW5jZSB3aGVuIHRoZVxuICogICBwaXBlIG5lZWRzIHRvIHJlLXJ1biAodGhpcyBpcyB0byBhdm9pZCByZWZvcm1hdHRpbmcgdGhlIGRhdGUgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBydW5cbiAqICAgd2hpY2ggd291bGQgYmUgYW4gZXhwZW5zaXZlIG9wZXJhdGlvbikuXG4gKiAtIHRoaXMgcGlwZSB1c2VzIHRoZSBJbnRlcm5hdGlvbmFsaXphdGlvbiBBUEkuIFRoZXJlZm9yZSBpdCBpcyBvbmx5IHJlbGlhYmxlIGluIENocm9tZSBhbmQgT3BlcmFcbiAqICAgYnJvd3NlcnMuXG4gKlxuICogIyMjIEV4YW1wbGVzXG4gKlxuICogQXNzdW1pbmcgYGRhdGVPYmpgIGlzICh5ZWFyOiAyMDEwLCBtb250aDogOSwgZGF5OiAzLCBob3VyOiAxMiBQTSwgbWludXRlOiAwNSwgc2Vjb25kOiAwOClcbiAqIGluIHRoZSBfbG9jYWxfIHRpbWUgYW5kIGxvY2FsZSBpcyAnZW4tVVMnOlxuICpcbiAqIHtAZXhhbXBsZSBjb21tb24vcGlwZXMvdHMvZGF0ZV9waXBlLnRzIHJlZ2lvbj0nRGVwcmVjYXRlZERhdGVQaXBlJ31cbiAqXG4gKiBAc3RhYmxlXG4gKi9cbkBQaXBlKHtuYW1lOiAnZGF0ZScsIHB1cmU6IHRydWV9KVxuZXhwb3J0IGNsYXNzIERlcHJlY2F0ZWREYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvKiogQGludGVybmFsICovXG4gIHN0YXRpYyBfQUxJQVNFUzoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgJ21lZGl1bSc6ICd5TU1NZGptcycsXG4gICAgJ3Nob3J0JzogJ3lNZGptJyxcbiAgICAnZnVsbERhdGUnOiAneU1NTU1FRUVFZCcsXG4gICAgJ2xvbmdEYXRlJzogJ3lNTU1NZCcsXG4gICAgJ21lZGl1bURhdGUnOiAneU1NTWQnLFxuICAgICdzaG9ydERhdGUnOiAneU1kJyxcbiAgICAnbWVkaXVtVGltZSc6ICdqbXMnLFxuICAgICdzaG9ydFRpbWUnOiAnam0nXG4gIH07XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgX2xvY2FsZTogc3RyaW5nKSB7fVxuXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBwYXR0ZXJuOiBzdHJpbmcgPSAnbWVkaXVtRGF0ZScpOiBzdHJpbmd8bnVsbCB7XG4gICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09ICcnIHx8IHZhbHVlICE9PSB2YWx1ZSkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgZGF0ZTogRGF0ZTtcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRyaW0oKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgZGF0ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAoIWlzTmFOKHZhbHVlIC0gcGFyc2VGbG9hdCh2YWx1ZSkpKSB7XG4gICAgICBkYXRlID0gbmV3IERhdGUocGFyc2VGbG9hdCh2YWx1ZSkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAvXihcXGR7NH0tXFxkezEsMn0tXFxkezEsMn0pJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgIC8qKlxuICAgICAgICogRm9yIElTTyBTdHJpbmdzIHdpdGhvdXQgdGltZSB0aGUgZGF5LCBtb250aCBhbmQgeWVhciBtdXN0IGJlIGV4dHJhY3RlZCBmcm9tIHRoZSBJU08gU3RyaW5nXG4gICAgICAgKiBiZWZvcmUgRGF0ZSBjcmVhdGlvbiB0byBhdm9pZCB0aW1lIG9mZnNldCBhbmQgZXJyb3JzIGluIHRoZSBuZXcgRGF0ZS5cbiAgICAgICAqIElmIHdlIG9ubHkgcmVwbGFjZSAnLScgd2l0aCAnLCcgaW4gdGhlIElTTyBTdHJpbmcgKFwiMjAxNSwwMSwwMVwiKSwgYW5kIHRyeSB0byBjcmVhdGUgYSBuZXdcbiAgICAgICAqIGRhdGUsIHNvbWUgYnJvd3NlcnMgKGUuZy4gSUUgOSkgd2lsbCB0aHJvdyBhbiBpbnZhbGlkIERhdGUgZXJyb3JcbiAgICAgICAqIElmIHdlIGxlYXZlIHRoZSAnLScgKFwiMjAxNS0wMS0wMVwiKSBhbmQgdHJ5IHRvIGNyZWF0ZSBhIG5ldyBEYXRlKFwiMjAxNS0wMS0wMVwiKSB0aGVcbiAgICAgICAqIHRpbWVvZmZzZXRcbiAgICAgICAqIGlzIGFwcGxpZWRcbiAgICAgICAqIE5vdGU6IElTTyBtb250aHMgYXJlIDAgZm9yIEphbnVhcnksIDEgZm9yIEZlYnJ1YXJ5LCAuLi5cbiAgICAgICAqL1xuICAgICAgY29uc3QgW3ksIG0sIGRdID0gdmFsdWUuc3BsaXQoJy0nKS5tYXAoKHZhbDogc3RyaW5nKSA9PiBwYXJzZUludCh2YWwsIDEwKSk7XG4gICAgICBkYXRlID0gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgIH1cblxuICAgIGlmICghaXNEYXRlKGRhdGUpKSB7XG4gICAgICBsZXQgbWF0Y2g6IFJlZ0V4cE1hdGNoQXJyYXl8bnVsbDtcbiAgICAgIGlmICgodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgJiYgKG1hdGNoID0gdmFsdWUubWF0Y2goSVNPODYwMV9EQVRFX1JFR0VYKSkpIHtcbiAgICAgICAgZGF0ZSA9IGlzb1N0cmluZ1RvRGF0ZShtYXRjaCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBpbnZhbGlkUGlwZUFyZ3VtZW50RXJyb3IoRGVwcmVjYXRlZERhdGVQaXBlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIERhdGVGb3JtYXR0ZXIuZm9ybWF0KFxuICAgICAgICBkYXRlLCB0aGlzLl9sb2NhbGUsIERlcHJlY2F0ZWREYXRlUGlwZS5fQUxJQVNFU1twYXR0ZXJuXSB8fCBwYXR0ZXJuKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0RhdGUodmFsdWU6IGFueSk6IHZhbHVlIGlzIERhdGUge1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTih2YWx1ZS52YWx1ZU9mKCkpO1xufVxuIl19