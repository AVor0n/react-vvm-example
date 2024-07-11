import { childView } from '@yoskutik/react-vvm';
import { RegistrationViewModel } from '../RegistrationViewModel';
import { Button } from '@gravity-ui/uikit';
import { Password, TextBox } from '../../../../components';
import * as styles from '../Registration.module.scss';

export const EnterDataBlock = childView<RegistrationViewModel>()(({ viewModel }) => (
  <form className={styles.block}>
    <div className={styles.inputs}>
      <TextBox
        size="xl"
        pin="round-round"
        autoFocus
        alwaysShowError
        disabled={viewModel.isLoading}
        type={viewModel.registrationType === 'email' ? 'email' : 'tel'}
        placeholder={viewModel.registrationType === 'email' ? 'Email' : 'Телефон'}
        value={viewModel.registrationType === 'email' ? viewModel.email : viewModel.phone}
        error={viewModel.registrationType === 'email' ? viewModel.emailError : viewModel.phoneError}
        onChange={viewModel.registrationType === 'email' ? viewModel.onChangeEmail : viewModel.onChangePhone}
      />
      <Password
        value={viewModel.password}
        onChange={viewModel.onChangePassword}
        error={viewModel.passwordError}
        disabled={viewModel.isLoading}
        alwaysShowError
        placeholder="Пароль"
        pin="round-round"
        size="xl"
        showRevealButton
      />
      <TextBox
        size="xl"
        pin="round-round"
        placeholder={'Имя'}
        alwaysShowError
        disabled={viewModel.isLoading}
        value={viewModel.name}
        onChange={viewModel.onChangeName}
        error={viewModel.nameError}
      />
    </div>
    <Button
      view="action"
      pin="round-round"
      width="max"
      size="xl"
      type="submit"
      disabled={viewModel.hasErrors}
      onClick={viewModel.onRegister}
      loading={viewModel.isLoading}
    >
      Зарегистрироваться
    </Button>
  </form>
));
