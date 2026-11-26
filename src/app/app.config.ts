import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader, provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    ...provideTranslateHttpLoader({
      prefix: './i18n/',
      suffix: '.json'
    }),
    ...provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      langs: ['en', 'de'],
      loader: provideTranslateLoader(TranslateHttpLoader)
    })
  ]
};
