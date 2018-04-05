import { Subscriber } from '../Subscriber';
/**
 * Subscribes to an ArrayLike with a subscriber
 * @param array The array or array-like to subscribe to
 * @param subscriber The subscriber to subscribe with.
 */
export declare const subscribeToArray: <T>(array: ArrayLike<T>) => (subscriber: Subscriber<T>) => void;
