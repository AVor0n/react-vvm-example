import { ViewModel } from '@yoskutik/react-vvm';
import { makeObservable } from 'mobx';
import Container, { Service } from 'typedi';
import { AuthService, RouterService } from '../services';
import { routes } from './router';

@Service()
export class AppViewModel extends ViewModel {
  auth = Container.get(AuthService);
  router = Container.get(RouterService);

  constructor() {
    super();
    makeObservable(this);
    this.router.init(routes);
  }
}
