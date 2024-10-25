import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import {
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '16347b55-93d1-4bc1-84e8-7a4d7518394b',
      authority: 'https://login.microsoftonline.com/dfd50f92-2488-4dd0-9ba6-077db72b2ae7',
      redirectUri: '/',
    },
    system: {
      loggerOptions: {
        loggerCallback(logLevel, message, containsPii) {
          if (containsPii) {
            return;
          }
          switch (logLevel) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              // console.info(message);
              return;
            case LogLevel.Verbose:
              // console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
          }
        },
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('http://localhost:8080', ['16347b55-93d1-4bc1-84e8-7a4d7518394b/.default']);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...['16347b55-93d1-4bc1-84e8-7a4d7518394b/.default']],
    },
  };
}
