import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MenuSidebarService } from './menu-sidebar.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { take } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { ThemeService } from '../common/service/theme.service';

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
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @ViewChild('op') op!: OverlayPanel;
  languageOptions: SelectItem[] = [];
  visibleSidebar: boolean = false;
  protected selectedLanguage: string | null = localStorage.getItem('lng');
  theme: string | null = localStorage.getItem('theme');
  darkTheme!: boolean;

  constructor(
    private menuSideBarService: MenuSidebarService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuSideBarService.isSidebarVisible$.subscribe((value) => {
      this.visibleSidebar = value;
    });
    this.translateService.addLangs(this.availableLanguages);
    if (this.selectedLanguage == null) {
      this.selectedLanguage = 'en'; // Default
      localStorage.setItem('lng', this.selectedLanguage);
    }
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
    this.updateMenu();
  }

  private readonly availableLanguages = ['de', 'en'];
  translateService = inject(TranslateService);
  items: any[] = [];

  private updateMenu() {
    this.translateService
      .get(['book', 'my-trip', 'checkIn'])
      .subscribe((translations) => {
        this.items = [
          { label: translations['book'], id: 'flight-search-section' },
          { label: translations['my-trip'], id: 'my-trip' },
          { label: translations['checkIn'], id: 'checkIn' },
        ];
      });
  }

  protected onChangeLanguage(event: any) {
    const newLanguage = event.value;
    localStorage.setItem('lng', newLanguage);

    this.translateService.use(newLanguage).subscribe(() => {
      this.updateTranslations();
      this.updateMenu();
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
    this.visibleSidebar = !this.visibleSidebar;
    this.menuSideBarService.toggleSidebar();
    setTimeout(() => {
      document.getElementById('main-content')?.focus();
    });
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
  navigateAndCloseSidebar(elementId: string) {
    this.visibleSidebar = false;
    this.menuSideBarService.toggleSidebar();
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goToLandingPage() {
    this.router.navigate(['']);
  }
  goToSignUpRegister() {
    this.router.navigate(['login']);
  }
}
