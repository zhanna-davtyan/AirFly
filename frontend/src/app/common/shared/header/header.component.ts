import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Button} from "primeng/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  protected userEmail: string | undefined;
  protected isAuthenticated: boolean | undefined;


  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.initializeAuthentication();
  }

  private initializeAuthentication() {
    // Do this in parallel to make it work (do NOT try to use nested subscriptions)!
    this.authenticationService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
    this.authenticationService.activeUser.subscribe((activeUser: string | undefined) => {
      this.userEmail = activeUser;
    });
    // This must be done after the parallel subscriptions :-(
    this.authenticationService.initializeMSAL();
  }

  protected logout() {
    this.authenticationService.logout();
  }

  protected login(){
    this.authenticationService.login();
  }
}
