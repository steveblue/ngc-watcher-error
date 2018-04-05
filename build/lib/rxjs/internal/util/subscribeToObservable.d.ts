import { Subscriber } from '../Subscriber';
/**
 * Subscribes to an object that implements Symbol.observable with the given
 * Subscriber.
 * @param obj An object that implements Symbol.observable
 * @param subscriber The Subscriber to use to subscribe to the observable
 */
export declare const subscribeToObservable: <T>(obj: any) => (subscriber: Subscriber<T>) => any;
