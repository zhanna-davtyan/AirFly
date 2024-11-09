import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {
  ExtraOptions,
  provideRouter,
  RouterFeature,
  RouterFeatures,
  RouterModule,
  withDisabledInitialNavigation, withInMemoryScrolling
} from '@angular/router';

import {routes} from './app.routes';
import { provideAnimations} from "@angular/platform-browser/animations";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import { provideServiceWorker } from '@angular/service-worker';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export const provideTranslation = () => ({
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'disabled'
    })),
    provideAnimations(),
    provideHttpClient(),
    MessageService,
    DialogService,
    ConfirmationService,
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation()))
  ]
};
