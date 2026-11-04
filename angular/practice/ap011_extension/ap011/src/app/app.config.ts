import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // also passes QUERY params into input()s: ?returnUrl=... set by the guards
    // arrives in LoginPage as returnUrl()
    provideRouter(routes, withComponentInputBinding())
  ]
};
