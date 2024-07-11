/* eslint-disable react/jsx-key */
/* eslint-disable react-refresh/only-export-components */
import { Skeleton } from '@gravity-ui/uikit';
import { childView } from '@yoskutik/react-vvm';
import { Suspense, lazy } from 'react';
import { Link, Navigate, Outlet, Route, createRoutesFromElements } from 'react-router-dom';
import type { AppViewModel } from './AppViewModel';

const HomePage = lazy(() => import('@pages/Home'));
const AuthPage = lazy(() => import('@pages/Auth'));

const RequireAuth = childView<AppViewModel>()(({ viewModel }) => {
  if (!viewModel.auth.userIsAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
});

const PageLoader = () => (
  <Suspense fallback={<Skeleton style={{ height: '100vh' }} />}>
    <Outlet />
  </Suspense>
);

export const routes = createRoutesFromElements([
  <Route element={<PageLoader />}>
    <Route path="/auth" element={<AuthPage />} />,
    <Route element={<RequireAuth />}>
      <Route path="/home" element={<HomePage />} />,
    </Route>
    <Route
      path="/*"
      element={
        <div>
          <h1>Page not found!</h1>
          <Link to="/home">Go to homepage</Link>
        </div>
      }
    />
  </Route>,
]);
