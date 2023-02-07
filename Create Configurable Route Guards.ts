/*
Create Configurable Route Guards
https://netbasal.com/create-configurable-route-guards-in-angular-b5f255045e07

Guards and resolvers can now be plain functions in Angular v14.2.0. The inject() function can be used inside the function if we also want to use DI.

https://gist.github.com/NetanelBasal/1c745d274013277e659109bf1d4d0fbb#file-guard-plain-1-ts
*/

const routes = [
    {
      path: 'somePath',
      component: EditCmp,
      canDeactivate: [(component: EditCmp) => !component.hasUnsavedChanges],
    },
    { path: 'somePath', canActivate: [() => inject(MyDependency).canActivate()] },
];

/*
Now that we can use plain JS functions, we can take advantage of the power of functions in JS. In other words, we can compose or create higher-order functions. Most applications usually have a route guard for protected and unprotected routes. We can create one configurable guard that rules them all:

https://netbasal.com/create-configurable-route-guards-in-angular-b5f255045e07
*/

import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export function authGuard({
  redirectTo,
  isProtected = true,
}: {
  redirectTo?: any[];
  isProtected?: boolean;
} = {}): CanMatchFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const isLoggedIn = authService.isLoggedIn();

    if (isProtected) {
      if (isLoggedIn) {
        return true;
      }

      return router.createUrlTree(redirectTo ?? ['login']);
    } else {
      if (!isLoggedIn) {
        return true;
      }

      return router.createUrlTree(redirectTo ?? ['dashboard']);
    }
  };
}

/*
We’ve created a higher-order function that takes a configuration and returns a canMatch function guard. Now, we can use it in our routes:
https://gist.github.com/NetanelBasal/55f8e051135ac3788cab79907decaee4#file-guard-plain-3-ts
*/
const routes = [
    {
      path: 'login',
      component: LoginPageComponent,
      canMatch: [authGuard({ isProtected: false })],
    },
    {
      path: 'todos',
      component: TodosPageComponent,
      canMatch: [authGuard()],
    },
    {
      path: 'foo',
      component: FooPageComponent,
      canMatch: [authGuard({ redirectTo: ['foo', 'bar'] })],
    },
];