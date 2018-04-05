import { Observable } from '../Observable';
export declare type NodeStyleEventEmitter = {
    addListener: (eventName: string, handler: Function) => void;
    removeListener: (eventName: string, handler: Function) => void;
};
export declare type JQueryStyleEventEmitter = {
    on: (eventName: string, handler: Function) => void;
    off: (eventName: string, handler: Function) => void;
};
export declare type EventTargetLike = EventTarget | NodeStyleEventEmitter | JQueryStyleEventEmitter | NodeList | HTMLCollection;
export declare type EventListenerOptions = {
    capture?: boolean;
    passive?: boolean;
    once?: boolean;
} | boolean;
export declare function fromEvent<T>(target: EventTargetLike, eventName: string): Observable<T>;
export declare function fromEvent<T>(target: EventTargetLike, eventName: string): Observable<T>;
export declare function fromEvent<T>(target: EventTargetLike, eventName: string, options: EventListenerOptions): Observable<T>;
