import { type RouteObject, createBrowserRouter } from 'react-router-dom';
import { Service } from 'typedi';

@Service()
export class RouterService {
  router: ReturnType<typeof createBrowserRouter> | undefined;

  init = (routes: RouteObject[]) => {
    this.router = createBrowserRouter(routes);
    return this.router;
  };
}
