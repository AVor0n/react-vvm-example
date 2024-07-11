import { Tabs } from '@gravity-ui/uikit';
import { view } from '@yoskutik/react-vvm';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthPageViewModel } from './AuthPageViewModel';
import { Login } from './Login';
import { Registration } from './Registration';
import * as styles from './AuthPage.module.scss';

export const AuthPage = view(AuthPageViewModel)(({ viewModel }) => {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'reg'>('login');

  if (viewModel.auth.userIsAuthenticated && pathname.startsWith('/auth')) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className={styles.container}>
      <img src="/logo.svg" className={styles.logo} />

      <Tabs
        size="xl"
        className={styles.tabs}
        activeTab={activeTab}
        onSelectTab={(id) => setActiveTab(id as 'login' | 'reg')}
        items={[
          { id: 'login', title: 'Вход' },
          { id: 'reg', title: 'Регистрация' },
        ]}
      />

      {activeTab === 'login' && <Login />}
      {activeTab === 'reg' && <Registration />}
    </div>
  );
});
