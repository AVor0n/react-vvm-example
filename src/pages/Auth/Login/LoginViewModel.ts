import { action, makeObservable, observable } from 'mobx';
import { Service } from 'typedi';
import { ViewModel } from '@yoskutik/react-vvm';
import { LoginModel } from './LoginModel';
import { AuthService, RouterService } from '@services';

@Service({ transient: true })
export class LoginViewModel extends ViewModel {
  @observable.ref model = LoginModel.create();

  @observable isLoading = false;

  constructor(
    private auth: AuthService,
    private routes: RouterService,
  ) {
    super();
    makeObservable(this);
  }

  @action onLogin = async () => {
    this.isLoading = true;
    await this.auth.login(this.model);
    this.routes.router?.navigate('/home');
  };
}
