import axios from 'axios';
import { makeObservable } from 'mobx';
import { Service } from 'typedi';
import { Store } from './Store';

interface StoreItem {
  id: string;
  name: string;
  age: number;
}

interface StoreApiResponse {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
  }[];
}

@Service()
export class ExampleStore extends Store<StoreItem, StoreApiResponse> {
  protected loadMethod = () => axios.get<StoreApiResponse>('/example-store').then(({ data }) => data);

  protected get enableForLoad() {
    return Math.random() < 0.5;
  }

  protected preprocess = (response: StoreApiResponse) =>
    response.data.map((item) => ({
      id: item.id,
      age: item.age,
      name: `${item.firstName} ${item.lastName}`,
    }));

  get = (id: string) => {
    if (!this.isLoaded) return null;
    const elem = this.data.find((it) => it.name === id);
    return elem || null;
  };

  constructor() {
    super();
    makeObservable(this);
  }
}
