import { ViewModel } from '@yoskutik/react-vvm';
import { action, computed, makeObservable, observable } from 'mobx';
import { Service } from 'typedi';

@Service({ transient: true })
export class RegistrationViewModel extends ViewModel {
  @observable step: 'chooseType' | 'enterData' | 'confirm' = 'chooseType';

  @observable name = '';

  @observable email = '';

  @observable phone = '';

  @observable password = '';

  @observable confirmCode = '';

  @observable registrationType: 'email' | 'phone' | undefined = undefined;

  @observable nameError = '';

  @observable emailError = '';

  @observable phoneError = '';

  @observable passwordError = '';

  @observable confirmCodeError = '';

  @observable isLoading = false;

  @computed get hasErrors() {
    return [this.nameError, this.emailError, this.phoneError, this.passwordError, this.confirmCodeError].some(Boolean);
  }

  constructor() {
    super();
    makeObservable(this);
  }

  @action onChangeName = (value: string) => {
    this.name = value;
    this.nameError = '';
  };

  @action onChangePhone = (value: string) => {
    this.phone = value;
    this.phoneError = '';
  };

  @action onChangeEmail = (value: string) => {
    this.email = value;
    this.emailError = '';
  };

  @action onChangePassword = (value: string) => {
    this.password = value;
    this.passwordError = '';
  };

  @action onChangeConfirmCode = (value: string) => {
    this.confirmCode = value;
    this.confirmCodeError = '';
  };

  @action setRegistrationType = (type?: 'email' | 'phone') => {
    this.registrationType = type;
    this.step = 'enterData';
  };

  @action onRegister = async () => {};

  @action onSendConfirmCode = async () => {};

  @action confirmEmail = () => {};

  @action confirmPhone = () => {};
}
