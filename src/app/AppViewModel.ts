import { ViewModel } from '@yoskutik/react-vvm';
import { makeObservable } from 'mobx';
import { Service } from 'typedi';
import { AuthService, RouterService } from '../services';
import { routes } from './router';

@Service()
export class AppViewModel extends ViewModel {
  constructor(
    public router: RouterService,
    public auth: AuthService,
  ) {
    super();
    makeObservable(this);
    this.router.init(routes);
  }
}
