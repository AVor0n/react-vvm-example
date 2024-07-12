import { action, computed, observable, reaction, runInAction, when, makeObservable } from 'mobx';
import Container from 'typedi';
import { AuthService } from '@services';

export abstract class Store<T = unknown, U = unknown> {
  @observable.shallow data: T[] = [];

  @observable.shallow response: U | undefined = undefined;

  protected abstract readonly loadMethod: () => Promise<U>;

  protected requestParams: unknown[] = [];

  @observable isLoaded = false;

  loaded?: Promise<T[]> = undefined;

  abstract get: (id: never) => T | null;

  protected abstract preprocess: (response: U) => T[];

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  protected get enableForLoad() {
    return true;
  }

  @computed public get parentEnableForLoad() {
    return Container.get(AuthService).userIsAuthenticated && this.enableForLoad;
  }

  constructor() {
    makeObservable(this);
    this.update().then(() => {
      reaction(
        () => this.parentEnableForLoad,
        (value) => value && this.update(),
      );
    });
  }

  @action update = async (): Promise<T[]> => {
    this.isLoaded = false;

    this.loaded = new Promise((resolve, reject) => {
      when(() => this.parentEnableForLoad)
        .then(() =>
          this.loadMethod(...(this.requestParams as [])).then((res) => {
            runInAction(() => {
              this.response = res;
            });
            return this.preprocess(res);
          }),
        )
        .then((data) =>
          runInAction(() => {
            this.data = data;
            this.isLoaded = true;
            resolve(this.data);
            return this.data;
          }),
        )
        .catch((error: unknown) => reject(error));
    });

    return this.loaded;
  };
}
