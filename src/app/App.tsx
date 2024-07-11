import { settings } from '@gravity-ui/date-utils';
import { ThemeProvider, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit';
import { view } from '@yoskutik/react-vvm';
import { RouterProvider } from 'react-router-dom';
import { AppViewModel } from './AppViewModel';
import './App.css';

settings.loadLocale('ru').then(() => {
  settings.setLocale('ru');
});
export const App = view(AppViewModel)(({ viewModel }) => (
  <ThemeProvider theme="light">
    <ToasterProvider>
      <RouterProvider router={viewModel.router.router} />
      <ToasterComponent />
    </ToasterProvider>
  </ThemeProvider>
));
