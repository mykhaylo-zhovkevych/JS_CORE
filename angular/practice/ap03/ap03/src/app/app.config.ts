import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

// replaces AppModule: providers live here, main.ts calls bootstrapApplication(App, appConfig)
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withComponentInputBinding: route params (e.g. :id) are passed into component input()s
    provideRouter(routes, withComponentInputBinding())
  ]
};
