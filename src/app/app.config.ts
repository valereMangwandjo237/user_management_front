import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([TokenInterceptor])
    ),
    provideToastr(),
  ]
};

export const apiURL: string = 'http://localhost:8080/produits/api'
export const apiURLCat: string = 'http://localhost:8080/produits/cat';
export const apiURLUser: string = 'http://localhost:8081/users';