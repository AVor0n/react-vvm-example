import { Button } from '@gravity-ui/uikit';
import { view } from '@yoskutik/react-vvm';
import { Field, Password } from '@components';
import { LoginViewModel } from './LoginViewModel';
import * as styles from './Login.module.scss';

export const Login = view(LoginViewModel)(({ viewModel }) => (
  <form className={styles.container}>
    <div className={styles.inputs}>
      <Field
        object={viewModel.model}
        bind="login"
        placeholder="Номер телефона или Email"
        pin="round-round"
        disabled={viewModel.isLoading}
        autoFocus
        size="xl"
      />
      <Field
        component={Password}
        object={viewModel.model}
        bind="password"
        placeholder="Пароль"
        pin="round-round"
        disabled={viewModel.isLoading}
        size="xl"
        showRevealButton
      />
    </div>

    <Button
      view="action"
      pin="round-round"
      width="max"
      size="xl"
      onClick={viewModel.onLogin}
      loading={viewModel.isLoading}
      disabled={!viewModel.model.isValid}
      type="submit"
    >
      Войти
    </Button>
  </form>
));
