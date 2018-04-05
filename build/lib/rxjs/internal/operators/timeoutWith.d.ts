import { ObservableInput, OperatorFunction, MonoTypeOperatorFunction, SchedulerLike } from '../types';
export declare function timeoutWith<T>(due: number | Date, withObservable: ObservableInput<T>, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T>;
export declare function timeoutWith<T, R>(due: number | Date, withObservable: ObservableInput<R>, scheduler?: SchedulerLike): OperatorFunction<T, T | R>;
