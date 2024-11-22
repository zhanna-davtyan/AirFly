import { CommonModule } from '@angular/common';
import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { Subscription, take } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { ThemeService } from '../common/service/theme.service';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '../user/user.service';
import { LoginComponent } from '../user/login/login.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    RouterModule,
    FormsModule,
    DropdownModule,
    TooltipModule,
    OverlayPanelModule,
    TranslateModule,
    InputTextModule,
    InputSwitchModule,
    ToggleButtonModule,
    ToolbarModule,
    DividerModule,
    MenubarModule,
    AvatarModule,
    LoginComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() currentStep!: number;
  @Input() currentStepDescription!: string;

  languageOptions: SelectItem[] = [];
  protected selectedLanguage: string | null = localStorage.getItem('lng');
  private readonly availableLanguages = ['de', 'en'];

  theme: string | null = localStorage.getItem('theme');
  darkTheme!: boolean;
  private authSubscription!: Subscription;
  isLoggedIn = false;
  isAdmin = false;
  isLoginSidebarVisible: boolean = false;

  isSidebarVisible: boolean = false;
  @ViewChild('adminOp') adminOp!: OverlayPanel;
  @ViewChild('languageOp') languageOp!: OverlayPanel;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private userService: UserService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.addLangs(this.availableLanguages);
    if (this.selectedLanguage == null) {
      this.selectedLanguage = 'en'; // Default
      localStorage.setItem('lng', this.selectedLanguage);
    }
    this.translateService.use(this.selectedLanguage);
    this.updateTranslations();

    if (this.theme == null) {
      this.theme = 'theme-dark'; // Default
      localStorage.setItem('theme', 'theme-dark');
    } else if (this.theme == 'theme-light') {
      this.theme = 'theme-light';
      localStorage.setItem('theme', 'theme-light');
      this.themeService.switchTheme('theme-light');
    }
    this.darkTheme = !this.theme || this.theme === 'theme-dark';
    this.translateService.use(this.selectedLanguage);
    this.updateTranslations();

    this.authSubscription = this.userService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.isAdmin = this.userService.isAdmin();
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  protected onLanguageChange(event: any) {
    const newLanguage = event.value;
    localStorage.setItem('lng', newLanguage);
    this.translateService.use(newLanguage).subscribe(() => {
      this.updateTranslations();
    });
  }

  private updateTranslations() {
    this.translateService
      .get(['base.language.en', 'base.language.de'])
      .pipe(take(1))
      .subscribe((translations) => {
        this.languageOptions = this.availableLanguages.map((option) => ({
          value: option,
          label: translations['base.language.' + option],
        }));
      });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleLoginSidebar() {
    this.isLoginSidebarVisible = !this.isLoginSidebarVisible;
  }

  changeTheme(event: any) {
    if (event.checked === true) {
      this.themeService.switchTheme('theme-dark');
      localStorage.setItem('theme', 'theme-dark');
      this.darkTheme = true;
    } else {
      this.themeService.switchTheme('theme-light');
      localStorage.setItem('theme', 'theme-light');
      this.darkTheme = false;
    }
  }

  navigateToBookNewFlight() {
    this.toggleSidebar();
    this.router.navigate(['search-flight']);
  }

  navigateToMyBookings() {
    this.toggleSidebar();
    this.router.navigate(['my-bookings']);
  }

  navigateToAllFlights() {
    this.toggleSidebar();
    this.router.navigate(['all-flights']);
  }

  navigateToAllBookings() {
    this.toggleSidebar();
    this.router.navigate(['all-bookings']);
  }

  showBorderBottom() {
    if (this.currentStep && this.currentStepDescription) {
      if (this.currentStep != 0 && this.currentStepDescription != '') {
        return false;
      }
    }
    return true;
  }

  closeLoginSidebar() {
    this.isLoginSidebarVisible = false;
  }

  logout() {
    this.userService.deleteToken();
    this.router.navigate(['']);
  }
}
