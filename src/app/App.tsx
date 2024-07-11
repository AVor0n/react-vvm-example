import { RouterProvider } from 'react-router-dom';
import { settings } from '@gravity-ui/date-utils';
import { view } from '@yoskutik/react-vvm';
import { ThemeProvider, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit';
import { AppViewModel } from './AppViewModel';
import './App.css';

settings.loadLocale('ru').then(() => {
  settings.setLocale('ru');
});
export const App = view(AppViewModel)(({ viewModel }) => {
  return (
    <ThemeProvider theme="light">
      <ToasterProvider>
        <RouterProvider router={viewModel.router.router!} />
        <ToasterComponent />
      </ToasterProvider>
    </ThemeProvider>
  );
});
