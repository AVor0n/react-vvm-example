import { childView } from '@yoskutik/react-vvm';
import { RegistrationViewModel } from '../RegistrationViewModel';
import { TextBox } from '../../../../components';
import { Button } from '@gravity-ui/uikit';
import * as styles from '../Registration.module.scss';

export const ConfirmBlock = childView<RegistrationViewModel>()(({ viewModel }) => (
  <form className={styles.block}>
    <div className={styles.inputs}>
      <TextBox
        placeholder="Код подтверждения"
        pin="round-round"
        alwaysShowError
        value={viewModel.confirmCode}
        onChange={viewModel.onChangeConfirmCode}
        error={viewModel.confirmCodeError}
        disabled={viewModel.isLoading}
        size="xl"
        autoFocus
      />
    </div>
    <Button
      view="action"
      pin="round-round"
      width="max"
      size="xl"
      type="submit"
      disabled={viewModel.hasErrors}
      loading={viewModel.isLoading}
      onClick={viewModel.onSendConfirmCode}
    >
      Войти в личный кабинет
    </Button>
  </form>
));
