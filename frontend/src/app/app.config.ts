import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule } from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import { provideServiceWorker } from '@angular/service-worker';
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
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
    provideRouter(routes),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(CommonModule),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),
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
