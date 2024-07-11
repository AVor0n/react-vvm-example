import '@yoskutik/mobx-form-schema/dist/enable-legacy-experimental-decorators-types';
import 'reflect-metadata';
import { configure } from '@yoskutik/react-vvm';
import { createRoot } from 'react-dom/client';
import Container from 'typedi';
import { App } from './app/App';

configure({
  vmFactory: (VM) => Container.get(VM),
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<App />);
