import { view } from '@yoskutik/react-vvm';
import { ChooseTypeBlock, ConfirmBlock, EnterDataBlock } from './components';
import { RegistrationViewModel } from './RegistrationViewModel';
import * as styles from './Registration.module.scss';

export const Registration = view(RegistrationViewModel)(({ viewModel }) => (
  <div className={styles.container}>
    {viewModel.step === 'chooseType' && <ChooseTypeBlock />}
    {viewModel.step === 'enterData' && <EnterDataBlock />}
    {viewModel.step === 'confirm' && <ConfirmBlock />}
  </div>
));
