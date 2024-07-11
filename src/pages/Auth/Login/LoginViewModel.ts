import { ViewModel } from '@yoskutik/react-vvm';
import { action, makeObservable, observable } from 'mobx';
import { Service } from 'typedi';
import { AuthService, RouterService } from '@services';
import { LoginModel } from './LoginModel';

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
    this.routes.router.navigate('/home');
  };
}
