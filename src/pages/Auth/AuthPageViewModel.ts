import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18';
import { ViewModel } from '@yoskutik/react-vvm';
import { makeObservable } from 'mobx';
import { Service } from 'typedi';
import { AuthService, WSService } from '@services';

@Service({ transient: true })
export class AuthPageViewModel extends ViewModel {
  constructor(
    public auth: AuthService,
    private ws: WSService,
  ) {
    super();
    makeObservable(this);
  }

  protected onViewMounted(): void {
    this.ws.on('/user/topic/reports/updated', this.showMessage);
  }

  protected onViewUnmounted(): void {
    this.ws.off('/user/topic/reports/updated', this.showMessage);
  }

  private showMessage = (message: string) => {
    toaster.add({
      name: 'authMessage',
      theme: 'info',
      content: message,
    });
  };
}
