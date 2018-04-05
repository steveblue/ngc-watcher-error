
"use strict"

var path = require('path');
var dir = path.resolve(__dirname);

module.exports = function() {
  return {
    "rxjs/util/tryCatch": "rxjs-compat/_esm2015/util/tryCatch",
    "rxjs/util/toSubscriber": "rxjs-compat/_esm2015/util/toSubscriber",
    "rxjs/util/subscribeToResult": "rxjs-compat/_esm2015/util/subscribeToResult",
    "rxjs/util/subscribeToPromise": "rxjs-compat/_esm2015/util/subscribeToPromise",
    "rxjs/util/subscribeToObservable": "rxjs-compat/_esm2015/util/subscribeToObservable",
    "rxjs/util/subscribeToIterable": "rxjs-compat/_esm2015/util/subscribeToIterable",
    "rxjs/util/subscribeToArray": "rxjs-compat/_esm2015/util/subscribeToArray",
    "rxjs/util/subscribeTo": "rxjs-compat/_esm2015/util/subscribeTo",
    "rxjs/util/root": "rxjs-compat/_esm2015/util/root",
    "rxjs/util/pipe": "rxjs-compat/_esm2015/util/pipe",
    "rxjs/util/not": "rxjs-compat/_esm2015/util/not",
    "rxjs/util/noop": "rxjs-compat/_esm2015/util/noop",
    "rxjs/util/isScheduler": "rxjs-compat/_esm2015/util/isScheduler",
    "rxjs/util/isPromise": "rxjs-compat/_esm2015/util/isPromise",
    "rxjs/util/isObservable": "rxjs-compat/_esm2015/util/isObservable",
    "rxjs/util/isObject": "rxjs-compat/_esm2015/util/isObject",
    "rxjs/util/isNumeric": "rxjs-compat/_esm2015/util/isNumeric",
    "rxjs/util/isIterable": "rxjs-compat/_esm2015/util/isIterable",
    "rxjs/util/isFunction": "rxjs-compat/_esm2015/util/isFunction",
    "rxjs/util/isDate": "rxjs-compat/_esm2015/util/isDate",
    "rxjs/util/isArrayLike": "rxjs-compat/_esm2015/util/isArrayLike",
    "rxjs/util/isArray": "rxjs-compat/_esm2015/util/isArray",
    "rxjs/util/identity": "rxjs-compat/_esm2015/util/identity",
    "rxjs/util/hostReportError": "rxjs-compat/_esm2015/util/hostReportError",
    "rxjs/util/errorObject": "rxjs-compat/_esm2015/util/errorObject",
    "rxjs/util/applyMixins": "rxjs-compat/_esm2015/util/applyMixins",
    "rxjs/util/UnsubscriptionError": "rxjs-compat/_esm2015/util/UnsubscriptionError",
    "rxjs/util/TimeoutError": "rxjs-compat/_esm2015/util/TimeoutError",
    "rxjs/util/ObjectUnsubscribedError": "rxjs-compat/_esm2015/util/ObjectUnsubscribedError",
    "rxjs/util/Immediate": "rxjs-compat/_esm2015/util/Immediate",
    "rxjs/util/EmptyError": "rxjs-compat/_esm2015/util/EmptyError",
    "rxjs/util/ArgumentOutOfRangeError": "rxjs-compat/_esm2015/util/ArgumentOutOfRangeError",
    "rxjs/symbol/rxSubscriber": "rxjs-compat/_esm2015/symbol/rxSubscriber",
    "rxjs/symbol/observable": "rxjs-compat/_esm2015/symbol/observable",
    "rxjs/symbol/iterator": "rxjs-compat/_esm2015/symbol/iterator",
    "rxjs/scheduler/queue": "rxjs-compat/_esm2015/scheduler/queue",
    "rxjs/scheduler/async": "rxjs-compat/_esm2015/scheduler/async",
    "rxjs/scheduler/asap": "rxjs-compat/_esm2015/scheduler/asap",
    "rxjs/scheduler/animationFrame": "rxjs-compat/_esm2015/scheduler/animationFrame",
    "rxjs/operators/zipAll": "rxjs-compat/_esm2015/operators/zipAll",
    "rxjs/operators/zip": "rxjs-compat/_esm2015/operators/zip",
    "rxjs/operators/withLatestFrom": "rxjs-compat/_esm2015/operators/withLatestFrom",
    "rxjs/operators/windowWhen": "rxjs-compat/_esm2015/operators/windowWhen",
    "rxjs/operators/windowToggle": "rxjs-compat/_esm2015/operators/windowToggle",
    "rxjs/operators/windowTime": "rxjs-compat/_esm2015/operators/windowTime",
    "rxjs/operators/windowCount": "rxjs-compat/_esm2015/operators/windowCount",
    "rxjs/operators/window": "rxjs-compat/_esm2015/operators/window",
    "rxjs/operators/toArray": "rxjs-compat/_esm2015/operators/toArray",
    "rxjs/operators/timestamp": "rxjs-compat/_esm2015/operators/timestamp",
    "rxjs/operators/timeoutWith": "rxjs-compat/_esm2015/operators/timeoutWith",
    "rxjs/operators/timeout": "rxjs-compat/_esm2015/operators/timeout",
    "rxjs/operators/timeInterval": "rxjs-compat/_esm2015/operators/timeInterval",
    "rxjs/operators/throwIfEmpty": "rxjs-compat/_esm2015/operators/throwIfEmpty",
    "rxjs/operators/throttleTime": "rxjs-compat/_esm2015/operators/throttleTime",
    "rxjs/operators/throttle": "rxjs-compat/_esm2015/operators/throttle",
    "rxjs/operators/tap": "rxjs-compat/_esm2015/operators/tap",
    "rxjs/operators/takeWhile": "rxjs-compat/_esm2015/operators/takeWhile",
    "rxjs/operators/takeUntil": "rxjs-compat/_esm2015/operators/takeUntil",
    "rxjs/operators/takeLast": "rxjs-compat/_esm2015/operators/takeLast",
    "rxjs/operators/take": "rxjs-compat/_esm2015/operators/take",
    "rxjs/operators/switchMapTo": "rxjs-compat/_esm2015/operators/switchMapTo",
    "rxjs/operators/switchMap": "rxjs-compat/_esm2015/operators/switchMap",
    "rxjs/operators/switchAll": "rxjs-compat/_esm2015/operators/switchAll",
    "rxjs/operators/subscribeOn": "rxjs-compat/_esm2015/operators/subscribeOn",
    "rxjs/operators/startWith": "rxjs-compat/_esm2015/operators/startWith",
    "rxjs/operators/skipWhile": "rxjs-compat/_esm2015/operators/skipWhile",
    "rxjs/operators/skipUntil": "rxjs-compat/_esm2015/operators/skipUntil",
    "rxjs/operators/skipLast": "rxjs-compat/_esm2015/operators/skipLast",
    "rxjs/operators/skip": "rxjs-compat/_esm2015/operators/skip",
    "rxjs/operators/single": "rxjs-compat/_esm2015/operators/single",
    "rxjs/operators/shareReplay": "rxjs-compat/_esm2015/operators/shareReplay",
    "rxjs/operators/share": "rxjs-compat/_esm2015/operators/share",
    "rxjs/operators/sequenceEqual": "rxjs-compat/_esm2015/operators/sequenceEqual",
    "rxjs/operators/scan": "rxjs-compat/_esm2015/operators/scan",
    "rxjs/operators/sampleTime": "rxjs-compat/_esm2015/operators/sampleTime",
    "rxjs/operators/sample": "rxjs-compat/_esm2015/operators/sample",
    "rxjs/operators/retryWhen": "rxjs-compat/_esm2015/operators/retryWhen",
    "rxjs/operators/retry": "rxjs-compat/_esm2015/operators/retry",
    "rxjs/operators/repeatWhen": "rxjs-compat/_esm2015/operators/repeatWhen",
    "rxjs/operators/repeat": "rxjs-compat/_esm2015/operators/repeat",
    "rxjs/operators/refCount": "rxjs-compat/_esm2015/operators/refCount",
    "rxjs/operators/reduce": "rxjs-compat/_esm2015/operators/reduce",
    "rxjs/operators/race": "rxjs-compat/_esm2015/operators/race",
    "rxjs/operators/publishReplay": "rxjs-compat/_esm2015/operators/publishReplay",
    "rxjs/operators/publishLast": "rxjs-compat/_esm2015/operators/publishLast",
    "rxjs/operators/publishBehavior": "rxjs-compat/_esm2015/operators/publishBehavior",
    "rxjs/operators/publish": "rxjs-compat/_esm2015/operators/publish",
    "rxjs/operators/pluck": "rxjs-compat/_esm2015/operators/pluck",
    "rxjs/operators/partition": "rxjs-compat/_esm2015/operators/partition",
    "rxjs/operators/pairwise": "rxjs-compat/_esm2015/operators/pairwise",
    "rxjs/operators/onErrorResumeNext": "rxjs-compat/_esm2015/operators/onErrorResumeNext",
    "rxjs/operators/observeOn": "rxjs-compat/_esm2015/operators/observeOn",
    "rxjs/operators/multicast": "rxjs-compat/_esm2015/operators/multicast",
    "rxjs/operators/min": "rxjs-compat/_esm2015/operators/min",
    "rxjs/operators/mergeScan": "rxjs-compat/_esm2015/operators/mergeScan",
    "rxjs/operators/mergeMapTo": "rxjs-compat/_esm2015/operators/mergeMapTo",
    "rxjs/operators/mergeMap": "rxjs-compat/_esm2015/operators/mergeMap",
    "rxjs/operators/mergeAll": "rxjs-compat/_esm2015/operators/mergeAll",
    "rxjs/operators/merge": "rxjs-compat/_esm2015/operators/merge",
    "rxjs/operators/max": "rxjs-compat/_esm2015/operators/max",
    "rxjs/operators/materialize": "rxjs-compat/_esm2015/operators/materialize",
    "rxjs/operators/mapTo": "rxjs-compat/_esm2015/operators/mapTo",
    "rxjs/operators/map": "rxjs-compat/_esm2015/operators/map",
    "rxjs/operators/last": "rxjs-compat/_esm2015/operators/last",
    "rxjs/operators/isEmpty": "rxjs-compat/_esm2015/operators/isEmpty",
    "rxjs/operators/ignoreElements": "rxjs-compat/_esm2015/operators/ignoreElements",
    "rxjs/operators/groupBy": "rxjs-compat/_esm2015/operators/groupBy",
    "rxjs/operators/first": "rxjs-compat/_esm2015/operators/first",
    "rxjs/operators/findIndex": "rxjs-compat/_esm2015/operators/findIndex",
    "rxjs/operators/find": "rxjs-compat/_esm2015/operators/find",
    "rxjs/operators/finalize": "rxjs-compat/_esm2015/operators/finalize",
    "rxjs/operators/filter": "rxjs-compat/_esm2015/operators/filter",
    "rxjs/operators/expand": "rxjs-compat/_esm2015/operators/expand",
    "rxjs/operators/exhaustMap": "rxjs-compat/_esm2015/operators/exhaustMap",
    "rxjs/operators/exhaust": "rxjs-compat/_esm2015/operators/exhaust",
    "rxjs/operators/every": "rxjs-compat/_esm2015/operators/every",
    "rxjs/operators/elementAt": "rxjs-compat/_esm2015/operators/elementAt",
    "rxjs/operators/distinctUntilKeyChanged": "rxjs-compat/_esm2015/operators/distinctUntilKeyChanged",
    "rxjs/operators/distinctUntilChanged": "rxjs-compat/_esm2015/operators/distinctUntilChanged",
    "rxjs/operators/distinct": "rxjs-compat/_esm2015/operators/distinct",
    "rxjs/operators/dematerialize": "rxjs-compat/_esm2015/operators/dematerialize",
    "rxjs/operators/delayWhen": "rxjs-compat/_esm2015/operators/delayWhen",
    "rxjs/operators/delay": "rxjs-compat/_esm2015/operators/delay",
    "rxjs/operators/defaultIfEmpty": "rxjs-compat/_esm2015/operators/defaultIfEmpty",
    "rxjs/operators/debounceTime": "rxjs-compat/_esm2015/operators/debounceTime",
    "rxjs/operators/debounce": "rxjs-compat/_esm2015/operators/debounce",
    "rxjs/operators/count": "rxjs-compat/_esm2015/operators/count",
    "rxjs/operators/concatMapTo": "rxjs-compat/_esm2015/operators/concatMapTo",
    "rxjs/operators/concatMap": "rxjs-compat/_esm2015/operators/concatMap",
    "rxjs/operators/concatAll": "rxjs-compat/_esm2015/operators/concatAll",
    "rxjs/operators/concat": "rxjs-compat/_esm2015/operators/concat",
    "rxjs/operators/combineLatest": "rxjs-compat/_esm2015/operators/combineLatest",
    "rxjs/operators/combineAll": "rxjs-compat/_esm2015/operators/combineAll",
    "rxjs/operators/catchError": "rxjs-compat/_esm2015/operators/catchError",
    "rxjs/operators/bufferWhen": "rxjs-compat/_esm2015/operators/bufferWhen",
    "rxjs/operators/bufferToggle": "rxjs-compat/_esm2015/operators/bufferToggle",
    "rxjs/operators/bufferTime": "rxjs-compat/_esm2015/operators/bufferTime",
    "rxjs/operators/bufferCount": "rxjs-compat/_esm2015/operators/bufferCount",
    "rxjs/operators/buffer": "rxjs-compat/_esm2015/operators/buffer",
    "rxjs/operators/auditTime": "rxjs-compat/_esm2015/operators/auditTime",
    "rxjs/operators/audit": "rxjs-compat/_esm2015/operators/audit",
    "rxjs/operator/zipAll": "rxjs-compat/_esm2015/operator/zipAll",
    "rxjs/operator/zip": "rxjs-compat/_esm2015/operator/zip",
    "rxjs/operator/withLatestFrom": "rxjs-compat/_esm2015/operator/withLatestFrom",
    "rxjs/operator/windowWhen": "rxjs-compat/_esm2015/operator/windowWhen",
    "rxjs/operator/windowToggle": "rxjs-compat/_esm2015/operator/windowToggle",
    "rxjs/operator/windowTime": "rxjs-compat/_esm2015/operator/windowTime",
    "rxjs/operator/windowCount": "rxjs-compat/_esm2015/operator/windowCount",
    "rxjs/operator/window": "rxjs-compat/_esm2015/operator/window",
    "rxjs/operator/toPromise": "rxjs-compat/_esm2015/operator/toPromise",
    "rxjs/operator/toArray": "rxjs-compat/_esm2015/operator/toArray",
    "rxjs/operator/timestamp": "rxjs-compat/_esm2015/operator/timestamp",
    "rxjs/operator/timeoutWith": "rxjs-compat/_esm2015/operator/timeoutWith",
    "rxjs/operator/timeout": "rxjs-compat/_esm2015/operator/timeout",
    "rxjs/operator/timeInterval": "rxjs-compat/_esm2015/operator/timeInterval",
    "rxjs/operator/throttleTime": "rxjs-compat/_esm2015/operator/throttleTime",
    "rxjs/operator/throttle": "rxjs-compat/_esm2015/operator/throttle",
    "rxjs/operator/takeWhile": "rxjs-compat/_esm2015/operator/takeWhile",
    "rxjs/operator/takeUntil": "rxjs-compat/_esm2015/operator/takeUntil",
    "rxjs/operator/takeLast": "rxjs-compat/_esm2015/operator/takeLast",
    "rxjs/operator/take": "rxjs-compat/_esm2015/operator/take",
    "rxjs/operator/switchMapTo": "rxjs-compat/_esm2015/operator/switchMapTo",
    "rxjs/operator/switchMap": "rxjs-compat/_esm2015/operator/switchMap",
    "rxjs/operator/switch": "rxjs-compat/_esm2015/operator/switch",
    "rxjs/operator/subscribeOn": "rxjs-compat/_esm2015/operator/subscribeOn",
    "rxjs/operator/startWith": "rxjs-compat/_esm2015/operator/startWith",
    "rxjs/operator/skipWhile": "rxjs-compat/_esm2015/operator/skipWhile",
    "rxjs/operator/skipUntil": "rxjs-compat/_esm2015/operator/skipUntil",
    "rxjs/operator/skipLast": "rxjs-compat/_esm2015/operator/skipLast",
    "rxjs/operator/skip": "rxjs-compat/_esm2015/operator/skip",
    "rxjs/operator/single": "rxjs-compat/_esm2015/operator/single",
    "rxjs/operator/shareReplay": "rxjs-compat/_esm2015/operator/shareReplay",
    "rxjs/operator/share": "rxjs-compat/_esm2015/operator/share",
    "rxjs/operator/sequenceEqual": "rxjs-compat/_esm2015/operator/sequenceEqual",
    "rxjs/operator/scan": "rxjs-compat/_esm2015/operator/scan",
    "rxjs/operator/sampleTime": "rxjs-compat/_esm2015/operator/sampleTime",
    "rxjs/operator/sample": "rxjs-compat/_esm2015/operator/sample",
    "rxjs/operator/retryWhen": "rxjs-compat/_esm2015/operator/retryWhen",
    "rxjs/operator/retry": "rxjs-compat/_esm2015/operator/retry",
    "rxjs/operator/repeatWhen": "rxjs-compat/_esm2015/operator/repeatWhen",
    "rxjs/operator/repeat": "rxjs-compat/_esm2015/operator/repeat",
    "rxjs/operator/reduce": "rxjs-compat/_esm2015/operator/reduce",
    "rxjs/operator/race": "rxjs-compat/_esm2015/operator/race",
    "rxjs/operator/publishReplay": "rxjs-compat/_esm2015/operator/publishReplay",
    "rxjs/operator/publishLast": "rxjs-compat/_esm2015/operator/publishLast",
    "rxjs/operator/publishBehavior": "rxjs-compat/_esm2015/operator/publishBehavior",
    "rxjs/operator/publish": "rxjs-compat/_esm2015/operator/publish",
    "rxjs/operator/pluck": "rxjs-compat/_esm2015/operator/pluck",
    "rxjs/operator/partition": "rxjs-compat/_esm2015/operator/partition",
    "rxjs/operator/pairwise": "rxjs-compat/_esm2015/operator/pairwise",
    "rxjs/operator/onErrorResumeNext": "rxjs-compat/_esm2015/operator/onErrorResumeNext",
    "rxjs/operator/observeOn": "rxjs-compat/_esm2015/operator/observeOn",
    "rxjs/operator/multicast": "rxjs-compat/_esm2015/operator/multicast",
    "rxjs/operator/min": "rxjs-compat/_esm2015/operator/min",
    "rxjs/operator/mergeScan": "rxjs-compat/_esm2015/operator/mergeScan",
    "rxjs/operator/mergeMapTo": "rxjs-compat/_esm2015/operator/mergeMapTo",
    "rxjs/operator/mergeMap": "rxjs-compat/_esm2015/operator/mergeMap",
    "rxjs/operator/mergeAll": "rxjs-compat/_esm2015/operator/mergeAll",
    "rxjs/operator/merge": "rxjs-compat/_esm2015/operator/merge",
    "rxjs/operator/max": "rxjs-compat/_esm2015/operator/max",
    "rxjs/operator/materialize": "rxjs-compat/_esm2015/operator/materialize",
    "rxjs/operator/mapTo": "rxjs-compat/_esm2015/operator/mapTo",
    "rxjs/operator/map": "rxjs-compat/_esm2015/operator/map",
    "rxjs/operator/let": "rxjs-compat/_esm2015/operator/let",
    "rxjs/operator/last": "rxjs-compat/_esm2015/operator/last",
    "rxjs/operator/isEmpty": "rxjs-compat/_esm2015/operator/isEmpty",
    "rxjs/operator/ignoreElements": "rxjs-compat/_esm2015/operator/ignoreElements",
    "rxjs/operator/groupBy": "rxjs-compat/_esm2015/operator/groupBy",
    "rxjs/operator/first": "rxjs-compat/_esm2015/operator/first",
    "rxjs/operator/findIndex": "rxjs-compat/_esm2015/operator/findIndex",
    "rxjs/operator/find": "rxjs-compat/_esm2015/operator/find",
    "rxjs/operator/finally": "rxjs-compat/_esm2015/operator/finally",
    "rxjs/operator/filter": "rxjs-compat/_esm2015/operator/filter",
    "rxjs/operator/expand": "rxjs-compat/_esm2015/operator/expand",
    "rxjs/operator/exhaustMap": "rxjs-compat/_esm2015/operator/exhaustMap",
    "rxjs/operator/exhaust": "rxjs-compat/_esm2015/operator/exhaust",
    "rxjs/operator/every": "rxjs-compat/_esm2015/operator/every",
    "rxjs/operator/elementAt": "rxjs-compat/_esm2015/operator/elementAt",
    "rxjs/operator/do": "rxjs-compat/_esm2015/operator/do",
    "rxjs/operator/distinctUntilKeyChanged": "rxjs-compat/_esm2015/operator/distinctUntilKeyChanged",
    "rxjs/operator/distinctUntilChanged": "rxjs-compat/_esm2015/operator/distinctUntilChanged",
    "rxjs/operator/distinct": "rxjs-compat/_esm2015/operator/distinct",
    "rxjs/operator/dematerialize": "rxjs-compat/_esm2015/operator/dematerialize",
    "rxjs/operator/delayWhen": "rxjs-compat/_esm2015/operator/delayWhen",
    "rxjs/operator/delay": "rxjs-compat/_esm2015/operator/delay",
    "rxjs/operator/defaultIfEmpty": "rxjs-compat/_esm2015/operator/defaultIfEmpty",
    "rxjs/operator/debounceTime": "rxjs-compat/_esm2015/operator/debounceTime",
    "rxjs/operator/debounce": "rxjs-compat/_esm2015/operator/debounce",
    "rxjs/operator/count": "rxjs-compat/_esm2015/operator/count",
    "rxjs/operator/concatMapTo": "rxjs-compat/_esm2015/operator/concatMapTo",
    "rxjs/operator/concatMap": "rxjs-compat/_esm2015/operator/concatMap",
    "rxjs/operator/concatAll": "rxjs-compat/_esm2015/operator/concatAll",
    "rxjs/operator/concat": "rxjs-compat/_esm2015/operator/concat",
    "rxjs/operator/combineLatest": "rxjs-compat/_esm2015/operator/combineLatest",
    "rxjs/operator/combineAll": "rxjs-compat/_esm2015/operator/combineAll",
    "rxjs/operator/catch": "rxjs-compat/_esm2015/operator/catch",
    "rxjs/operator/bufferWhen": "rxjs-compat/_esm2015/operator/bufferWhen",
    "rxjs/operator/bufferToggle": "rxjs-compat/_esm2015/operator/bufferToggle",
    "rxjs/operator/bufferTime": "rxjs-compat/_esm2015/operator/bufferTime",
    "rxjs/operator/bufferCount": "rxjs-compat/_esm2015/operator/bufferCount",
    "rxjs/operator/buffer": "rxjs-compat/_esm2015/operator/buffer",
    "rxjs/operator/auditTime": "rxjs-compat/_esm2015/operator/auditTime",
    "rxjs/operator/audit": "rxjs-compat/_esm2015/operator/audit",
    "rxjs/observable/zip": "rxjs-compat/_esm2015/observable/zip",
    "rxjs/observable/using": "rxjs-compat/_esm2015/observable/using",
    "rxjs/observable/timer": "rxjs-compat/_esm2015/observable/timer",
    "rxjs/observable/throw": "rxjs-compat/_esm2015/observable/throw",
    "rxjs/observable/scalar": "rxjs-compat/_esm2015/observable/scalar",
    "rxjs/observable/range": "rxjs-compat/_esm2015/observable/range",
    "rxjs/observable/race": "rxjs-compat/_esm2015/observable/race",
    "rxjs/observable/pairs": "rxjs-compat/_esm2015/observable/pairs",
    "rxjs/observable/onErrorResumeNext": "rxjs-compat/_esm2015/observable/onErrorResumeNext",
    "rxjs/observable/of": "rxjs-compat/_esm2015/observable/of",
    "rxjs/observable/never": "rxjs-compat/_esm2015/observable/never",
    "rxjs/observable/merge": "rxjs-compat/_esm2015/observable/merge",
    "rxjs/observable/interval": "rxjs-compat/_esm2015/observable/interval",
    "rxjs/observable/if": "rxjs-compat/_esm2015/observable/if",
    "rxjs/observable/generate": "rxjs-compat/_esm2015/observable/generate",
    "rxjs/observable/fromPromise": "rxjs-compat/_esm2015/observable/fromPromise",
    "rxjs/observable/fromObservable": "rxjs-compat/_esm2015/observable/fromObservable",
    "rxjs/observable/fromIterable": "rxjs-compat/_esm2015/observable/fromIterable",
    "rxjs/observable/fromEventPattern": "rxjs-compat/_esm2015/observable/fromEventPattern",
    "rxjs/observable/fromEvent": "rxjs-compat/_esm2015/observable/fromEvent",
    "rxjs/observable/fromArray": "rxjs-compat/_esm2015/observable/fromArray",
    "rxjs/observable/from": "rxjs-compat/_esm2015/observable/from",
    "rxjs/observable/forkJoin": "rxjs-compat/_esm2015/observable/forkJoin",
    "rxjs/observable/empty": "rxjs-compat/_esm2015/observable/empty",
    "rxjs/observable/dom/webSocket": "rxjs-compat/_esm2015/observable/dom/webSocket",
    "rxjs/observable/dom/ajax": "rxjs-compat/_esm2015/observable/dom/ajax",
    "rxjs/observable/dom/WebSocketSubject": "rxjs-compat/_esm2015/observable/dom/WebSocketSubject",
    "rxjs/observable/dom/AjaxObservable": "rxjs-compat/_esm2015/observable/dom/AjaxObservable",
    "rxjs/observable/defer": "rxjs-compat/_esm2015/observable/defer",
    "rxjs/observable/concat": "rxjs-compat/_esm2015/observable/concat",
    "rxjs/observable/combineLatest": "rxjs-compat/_esm2015/observable/combineLatest",
    "rxjs/observable/bindNodeCallback": "rxjs-compat/_esm2015/observable/bindNodeCallback",
    "rxjs/observable/bindCallback": "rxjs-compat/_esm2015/observable/bindCallback",
    "rxjs/observable/SubscribeOnObservable": "rxjs-compat/_esm2015/observable/SubscribeOnObservable",
    "rxjs/observable/ConnectableObservable": "rxjs-compat/_esm2015/observable/ConnectableObservable",
    "rxjs/add/operator/zipAll": "rxjs-compat/_esm2015/add/operator/zipAll",
    "rxjs/add/operator/zip": "rxjs-compat/_esm2015/add/operator/zip",
    "rxjs/add/operator/withLatestFrom": "rxjs-compat/_esm2015/add/operator/withLatestFrom",
    "rxjs/add/operator/windowWhen": "rxjs-compat/_esm2015/add/operator/windowWhen",
    "rxjs/add/operator/windowToggle": "rxjs-compat/_esm2015/add/operator/windowToggle",
    "rxjs/add/operator/windowTime": "rxjs-compat/_esm2015/add/operator/windowTime",
    "rxjs/add/operator/windowCount": "rxjs-compat/_esm2015/add/operator/windowCount",
    "rxjs/add/operator/window": "rxjs-compat/_esm2015/add/operator/window",
    "rxjs/add/operator/toPromise": "rxjs-compat/_esm2015/add/operator/toPromise",
    "rxjs/add/operator/toArray": "rxjs-compat/_esm2015/add/operator/toArray",
    "rxjs/add/operator/timestamp": "rxjs-compat/_esm2015/add/operator/timestamp",
    "rxjs/add/operator/timeoutWith": "rxjs-compat/_esm2015/add/operator/timeoutWith",
    "rxjs/add/operator/timeout": "rxjs-compat/_esm2015/add/operator/timeout",
    "rxjs/add/operator/timeInterval": "rxjs-compat/_esm2015/add/operator/timeInterval",
    "rxjs/add/operator/throttleTime": "rxjs-compat/_esm2015/add/operator/throttleTime",
    "rxjs/add/operator/throttle": "rxjs-compat/_esm2015/add/operator/throttle",
    "rxjs/add/operator/takeWhile": "rxjs-compat/_esm2015/add/operator/takeWhile",
    "rxjs/add/operator/takeUntil": "rxjs-compat/_esm2015/add/operator/takeUntil",
    "rxjs/add/operator/takeLast": "rxjs-compat/_esm2015/add/operator/takeLast",
    "rxjs/add/operator/take": "rxjs-compat/_esm2015/add/operator/take",
    "rxjs/add/operator/switchMapTo": "rxjs-compat/_esm2015/add/operator/switchMapTo",
    "rxjs/add/operator/switchMap": "rxjs-compat/_esm2015/add/operator/switchMap",
    "rxjs/add/operator/switch": "rxjs-compat/_esm2015/add/operator/switch",
    "rxjs/add/operator/subscribeOn": "rxjs-compat/_esm2015/add/operator/subscribeOn",
    "rxjs/add/operator/startWith": "rxjs-compat/_esm2015/add/operator/startWith",
    "rxjs/add/operator/skipWhile": "rxjs-compat/_esm2015/add/operator/skipWhile",
    "rxjs/add/operator/skipUntil": "rxjs-compat/_esm2015/add/operator/skipUntil",
    "rxjs/add/operator/skipLast": "rxjs-compat/_esm2015/add/operator/skipLast",
    "rxjs/add/operator/skip": "rxjs-compat/_esm2015/add/operator/skip",
    "rxjs/add/operator/single": "rxjs-compat/_esm2015/add/operator/single",
    "rxjs/add/operator/shareReplay": "rxjs-compat/_esm2015/add/operator/shareReplay",
    "rxjs/add/operator/share": "rxjs-compat/_esm2015/add/operator/share",
    "rxjs/add/operator/sequenceEqual": "rxjs-compat/_esm2015/add/operator/sequenceEqual",
    "rxjs/add/operator/scan": "rxjs-compat/_esm2015/add/operator/scan",
    "rxjs/add/operator/sampleTime": "rxjs-compat/_esm2015/add/operator/sampleTime",
    "rxjs/add/operator/sample": "rxjs-compat/_esm2015/add/operator/sample",
    "rxjs/add/operator/retryWhen": "rxjs-compat/_esm2015/add/operator/retryWhen",
    "rxjs/add/operator/retry": "rxjs-compat/_esm2015/add/operator/retry",
    "rxjs/add/operator/repeatWhen": "rxjs-compat/_esm2015/add/operator/repeatWhen",
    "rxjs/add/operator/repeat": "rxjs-compat/_esm2015/add/operator/repeat",
    "rxjs/add/operator/reduce": "rxjs-compat/_esm2015/add/operator/reduce",
    "rxjs/add/operator/race": "rxjs-compat/_esm2015/add/operator/race",
    "rxjs/add/operator/publishReplay": "rxjs-compat/_esm2015/add/operator/publishReplay",
    "rxjs/add/operator/publishLast": "rxjs-compat/_esm2015/add/operator/publishLast",
    "rxjs/add/operator/publishBehavior": "rxjs-compat/_esm2015/add/operator/publishBehavior",
    "rxjs/add/operator/publish": "rxjs-compat/_esm2015/add/operator/publish",
    "rxjs/add/operator/pluck": "rxjs-compat/_esm2015/add/operator/pluck",
    "rxjs/add/operator/partition": "rxjs-compat/_esm2015/add/operator/partition",
    "rxjs/add/operator/pairwise": "rxjs-compat/_esm2015/add/operator/pairwise",
    "rxjs/add/operator/onErrorResumeNext": "rxjs-compat/_esm2015/add/operator/onErrorResumeNext",
    "rxjs/add/operator/observeOn": "rxjs-compat/_esm2015/add/operator/observeOn",
    "rxjs/add/operator/multicast": "rxjs-compat/_esm2015/add/operator/multicast",
    "rxjs/add/operator/min": "rxjs-compat/_esm2015/add/operator/min",
    "rxjs/add/operator/mergeScan": "rxjs-compat/_esm2015/add/operator/mergeScan",
    "rxjs/add/operator/mergeMapTo": "rxjs-compat/_esm2015/add/operator/mergeMapTo",
    "rxjs/add/operator/mergeMap": "rxjs-compat/_esm2015/add/operator/mergeMap",
    "rxjs/add/operator/mergeAll": "rxjs-compat/_esm2015/add/operator/mergeAll",
    "rxjs/add/operator/merge": "rxjs-compat/_esm2015/add/operator/merge",
    "rxjs/add/operator/max": "rxjs-compat/_esm2015/add/operator/max",
    "rxjs/add/operator/materialize": "rxjs-compat/_esm2015/add/operator/materialize",
    "rxjs/add/operator/mapTo": "rxjs-compat/_esm2015/add/operator/mapTo",
    "rxjs/add/operator/map": "rxjs-compat/_esm2015/add/operator/map",
    "rxjs/add/operator/let": "rxjs-compat/_esm2015/add/operator/let",
    "rxjs/add/operator/last": "rxjs-compat/_esm2015/add/operator/last",
    "rxjs/add/operator/isEmpty": "rxjs-compat/_esm2015/add/operator/isEmpty",
    "rxjs/add/operator/ignoreElements": "rxjs-compat/_esm2015/add/operator/ignoreElements",
    "rxjs/add/operator/groupBy": "rxjs-compat/_esm2015/add/operator/groupBy",
    "rxjs/add/operator/first": "rxjs-compat/_esm2015/add/operator/first",
    "rxjs/add/operator/findIndex": "rxjs-compat/_esm2015/add/operator/findIndex",
    "rxjs/add/operator/find": "rxjs-compat/_esm2015/add/operator/find",
    "rxjs/add/operator/finally": "rxjs-compat/_esm2015/add/operator/finally",
    "rxjs/add/operator/filter": "rxjs-compat/_esm2015/add/operator/filter",
    "rxjs/add/operator/expand": "rxjs-compat/_esm2015/add/operator/expand",
    "rxjs/add/operator/exhaustMap": "rxjs-compat/_esm2015/add/operator/exhaustMap",
    "rxjs/add/operator/exhaust": "rxjs-compat/_esm2015/add/operator/exhaust",
    "rxjs/add/operator/every": "rxjs-compat/_esm2015/add/operator/every",
    "rxjs/add/operator/elementAt": "rxjs-compat/_esm2015/add/operator/elementAt",
    "rxjs/add/operator/do": "rxjs-compat/_esm2015/add/operator/do",
    "rxjs/add/operator/distinctUntilKeyChanged": "rxjs-compat/_esm2015/add/operator/distinctUntilKeyChanged",
    "rxjs/add/operator/distinctUntilChanged": "rxjs-compat/_esm2015/add/operator/distinctUntilChanged",
    "rxjs/add/operator/distinct": "rxjs-compat/_esm2015/add/operator/distinct",
    "rxjs/add/operator/dematerialize": "rxjs-compat/_esm2015/add/operator/dematerialize",
    "rxjs/add/operator/delayWhen": "rxjs-compat/_esm2015/add/operator/delayWhen",
    "rxjs/add/operator/delay": "rxjs-compat/_esm2015/add/operator/delay",
    "rxjs/add/operator/defaultIfEmpty": "rxjs-compat/_esm2015/add/operator/defaultIfEmpty",
    "rxjs/add/operator/debounceTime": "rxjs-compat/_esm2015/add/operator/debounceTime",
    "rxjs/add/operator/debounce": "rxjs-compat/_esm2015/add/operator/debounce",
    "rxjs/add/operator/count": "rxjs-compat/_esm2015/add/operator/count",
    "rxjs/add/operator/concatMapTo": "rxjs-compat/_esm2015/add/operator/concatMapTo",
    "rxjs/add/operator/concatMap": "rxjs-compat/_esm2015/add/operator/concatMap",
    "rxjs/add/operator/concatAll": "rxjs-compat/_esm2015/add/operator/concatAll",
    "rxjs/add/operator/concat": "rxjs-compat/_esm2015/add/operator/concat",
    "rxjs/add/operator/combineLatest": "rxjs-compat/_esm2015/add/operator/combineLatest",
    "rxjs/add/operator/combineAll": "rxjs-compat/_esm2015/add/operator/combineAll",
    "rxjs/add/operator/catch": "rxjs-compat/_esm2015/add/operator/catch",
    "rxjs/add/operator/bufferWhen": "rxjs-compat/_esm2015/add/operator/bufferWhen",
    "rxjs/add/operator/bufferToggle": "rxjs-compat/_esm2015/add/operator/bufferToggle",
    "rxjs/add/operator/bufferTime": "rxjs-compat/_esm2015/add/operator/bufferTime",
    "rxjs/add/operator/bufferCount": "rxjs-compat/_esm2015/add/operator/bufferCount",
    "rxjs/add/operator/buffer": "rxjs-compat/_esm2015/add/operator/buffer",
    "rxjs/add/operator/auditTime": "rxjs-compat/_esm2015/add/operator/auditTime",
    "rxjs/add/operator/audit": "rxjs-compat/_esm2015/add/operator/audit",
    "rxjs/add/observable/zip": "rxjs-compat/_esm2015/add/observable/zip",
    "rxjs/add/observable/using": "rxjs-compat/_esm2015/add/observable/using",
    "rxjs/add/observable/timer": "rxjs-compat/_esm2015/add/observable/timer",
    "rxjs/add/observable/throw": "rxjs-compat/_esm2015/add/observable/throw",
    "rxjs/add/observable/range": "rxjs-compat/_esm2015/add/observable/range",
    "rxjs/add/observable/race": "rxjs-compat/_esm2015/add/observable/race",
    "rxjs/add/observable/pairs": "rxjs-compat/_esm2015/add/observable/pairs",
    "rxjs/add/observable/onErrorResumeNext": "rxjs-compat/_esm2015/add/observable/onErrorResumeNext",
    "rxjs/add/observable/of": "rxjs-compat/_esm2015/add/observable/of",
    "rxjs/add/observable/never": "rxjs-compat/_esm2015/add/observable/never",
    "rxjs/add/observable/merge": "rxjs-compat/_esm2015/add/observable/merge",
    "rxjs/add/observable/interval": "rxjs-compat/_esm2015/add/observable/interval",
    "rxjs/add/observable/if": "rxjs-compat/_esm2015/add/observable/if",
    "rxjs/add/observable/generate": "rxjs-compat/_esm2015/add/observable/generate",
    "rxjs/add/observable/fromPromise": "rxjs-compat/_esm2015/add/observable/fromPromise",
    "rxjs/add/observable/fromEventPattern": "rxjs-compat/_esm2015/add/observable/fromEventPattern",
    "rxjs/add/observable/fromEvent": "rxjs-compat/_esm2015/add/observable/fromEvent",
    "rxjs/add/observable/from": "rxjs-compat/_esm2015/add/observable/from",
    "rxjs/add/observable/forkJoin": "rxjs-compat/_esm2015/add/observable/forkJoin",
    "rxjs/add/observable/empty": "rxjs-compat/_esm2015/add/observable/empty",
    "rxjs/add/observable/dom/webSocket": "rxjs-compat/_esm2015/add/observable/dom/webSocket",
    "rxjs/add/observable/dom/ajax": "rxjs-compat/_esm2015/add/observable/dom/ajax",
    "rxjs/add/observable/defer": "rxjs-compat/_esm2015/add/observable/defer",
    "rxjs/add/observable/concat": "rxjs-compat/_esm2015/add/observable/concat",
    "rxjs/add/observable/combineLatest": "rxjs-compat/_esm2015/add/observable/combineLatest",
    "rxjs/add/observable/bindNodeCallback": "rxjs-compat/_esm2015/add/observable/bindNodeCallback",
    "rxjs/add/observable/bindCallback": "rxjs-compat/_esm2015/add/observable/bindCallback",
    "rxjs/Subscription": "rxjs-compat/_esm2015/Subscription",
    "rxjs/Subscriber": "rxjs-compat/_esm2015/Subscriber",
    "rxjs/SubjectSubscription": "rxjs-compat/_esm2015/SubjectSubscription",
    "rxjs/Subject": "rxjs-compat/_esm2015/Subject",
    "rxjs/Scheduler": "rxjs-compat/_esm2015/Scheduler",
    "rxjs/Rx": "rxjs-compat/_esm2015/Rx",
    "rxjs/ReplaySubject": "rxjs-compat/_esm2015/ReplaySubject",
    "rxjs/OuterSubscriber": "rxjs-compat/_esm2015/OuterSubscriber",
    "rxjs/Operator": "rxjs-compat/_esm2015/Operator",
    "rxjs/Observer": "rxjs-compat/_esm2015/Observer",
    "rxjs/Observable": "rxjs-compat/_esm2015/Observable",
    "rxjs/Notification": "rxjs-compat/_esm2015/Notification",
    "rxjs/InnerSubscriber": "rxjs-compat/_esm2015/InnerSubscriber",
    "rxjs/BehaviorSubject": "rxjs-compat/_esm2015/BehaviorSubject",
    "rxjs/AsyncSubject": "rxjs-compat/_esm2015/AsyncSubject"
};
}
