import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { loginInterceptor } from './core/interceptors/login.interceptor';
import { DatePipe } from '@angular/common';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), DatePipe, provideHttpClient(withInterceptors([loginInterceptor]))]
};
