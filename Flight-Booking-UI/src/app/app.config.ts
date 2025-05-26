import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';

export const appConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(NavbarComponent) // ✅ add this if needed globally
  ]
};
