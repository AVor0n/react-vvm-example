import { action, computed, makeObservable, observable } from 'mobx';
import { Service } from 'typedi';
import { RouterService } from './RouterService';
import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';

type User = { login: string };

@Service()
export class AuthService {
  @observable userInfo: User | null = null;

  @computed get userIsAuthenticated() {
    return !!this.userInfo;
  }

  constructor(private routes: RouterService) {
    makeObservable(this);
    try {
      const user = JSON.parse(localStorage.getItem('user') ?? 'null');
      if (user) {
        this.setUserInfo(user);
      } else {
        this.logout();
      }
    } catch {
      this.logout();
    }
  }

  @action private setUserInfo = (user: User) => {
    this.userInfo = user;
    localStorage.setItem('user', JSON.stringify(user));
  };

  @action public login = async (data: { login: string; password: string }) => {
    await new Promise((res) => setTimeout(res, 3000));
    this.setUserInfo(data);
    toaster.add({
      name: 'login',
      title: 'Enter',
      content: `Welcome, ${data.login}!`,
      theme: 'success',
    });
  };

  @action public logout = () => {
    this.userInfo = null;
    localStorage.setItem('user', '');
    this.routes.router?.navigate('/auth');
  };
}
