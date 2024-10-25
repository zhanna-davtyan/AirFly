import { Inject, Injectable, OnDestroy } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
  RedirectRequest,
} from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnDestroy {
  isAuthenticated = new Subject<boolean>();
  activeUser = new Subject<string | undefined>();
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  initializeMSAL() {
    this.msalService.handleRedirectObservable().subscribe();
    this.msalService.instance.enableAccountStorageEvents();
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        ) //hört auf Account added/removed events
      )
      .subscribe(() => {
        if (this.msalService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.isAuthenticated.next(
            this.msalService.instance.getAllAccounts().length > 0
          );
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  checkAndSetActiveAccount() {

    let activeAccount = this.msalService.instance.getActiveAccount(); //check ob active account

    if (
      !activeAccount &&
      this.msalService.instance.getAllAccounts().length > 0
    ) {
      activeAccount = this.msalService.instance.getAllAccounts()[0];
      this.msalService.instance.setActiveAccount(activeAccount);
    }

    this.isAuthenticated.next(!!activeAccount);
    this.activeUser.next(activeAccount?.username);
  }

  login() {
    this.msalService.loginRedirect({
      ...this.msalGuardConfig.authRequest,
    } as RedirectRequest);
  }

  logout() {
    this.msalService.logoutRedirect();
  }
}
