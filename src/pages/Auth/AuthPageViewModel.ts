import { ViewModel } from '@yoskutik/react-vvm';
import { makeObservable } from 'mobx';
import { Service } from 'typedi';
import { AuthService } from '@services';

@Service({ transient: true })
export class AuthPageViewModel extends ViewModel {
  constructor(public auth: AuthService) {
    super();
    makeObservable(this);
  }
}
