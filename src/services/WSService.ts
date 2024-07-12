/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';
import { Client } from '@stomp/stompjs';
import { Service } from 'typedi';

type Callback<T> = (message: T, subscriber: Subscriber<T>) => void;
export interface Subscriber<T> {
  callback: Callback<T>;
  unsubscribe?: () => void;
}

@Service()
export class WSService {
  public client: Client | undefined = undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private subscribers: Record<string, Subscriber<any>[]> = {};

  private subscribe = <T>(topic: string, subscriber: Subscriber<T>) => {
    const stompSubscription = this.client?.subscribe(topic, (frame) => {
      subscriber.callback(JSON.parse(frame.body) as T, subscriber);
    });
    subscriber.unsubscribe = () => {
      // socket is open
      if (this.client?.webSocket?.readyState === 1) {
        stompSubscription?.unsubscribe();
      }

      if (this.subscribers[topic]) {
        this.subscribers[topic] = this.subscribers[topic]!.filter((sub) => sub !== subscriber);
      }
    };
  };

  public connect = () => {
    const protocol = window.location.protocol.includes('https') ? 'wss' : 'ws';
    this.client = new Client({
      brokerURL: `${protocol}://${window.location.host}/socket`,
      reconnectDelay: 15000,
    });

    this.client.onConnect = () => {
      Object.keys(this.subscribers).forEach((topic) => {
        this.subscribers[topic]!.forEach((subscriber) => {
          this.subscribe(topic, subscriber);
        });
      });
    };

    this.client.onWebSocketClose = async (frame: { code: number; reason: string }) => {
      // session closed
      if (frame.code === 1008) {
        await this.client?.deactivate();
        this.subscribers = {};

        toaster.add({
          name: 'Unauthorized',
          theme: 'danger',
          content: frame.reason,
        });
      }
    };

    this.client.activate();
  };

  public on = <T>(topic: string, callback: Callback<T>): Subscriber<T> => {
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
    }
    const subscriber: Subscriber<T> = { callback };
    this.subscribers[topic]!.push(subscriber);

    if (this.client?.connected) {
      this.subscribe<T>(topic, subscriber);
    }

    return subscriber;
  };

  public off = <T>(topic: string, callback: Callback<T>) => {
    if (this.subscribers[topic]) {
      const subscriber = this.subscribers[topic]!.find((sub) => sub.callback === callback);
      subscriber?.unsubscribe?.();
    }
  };

  public once = <T>(topic: string): Promise<T> =>
    new Promise((resolve) => {
      const subscriber = this.on<T>(topic, (message) => {
        if (subscriber.unsubscribe) {
          subscriber.unsubscribe();
        }
        resolve(message);
      });
    });

  public send = (topic: string, message: object) => {
    this.client?.publish({
      destination: topic,
      body: JSON.stringify(message),
    });
  };
}
