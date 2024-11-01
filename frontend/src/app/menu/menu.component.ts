import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { FlightSearchComponent } from '../flight/flight-search/flight-search.component';
import { MenuSidebarService } from './menu-sidebar.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { switchMap, take } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'flights', component: FlightSearchComponent },
];
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
  ],
  templateUrl: './menu.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @ViewChild('op') op!: OverlayPanel;

  constructor(private menusidebarService: MenuSidebarService) {}
  visibleSidebar: boolean = false;
  protected selectedLanguage: string | null = localStorage.getItem('lng');
  languageOptions: SelectItem[] = [];

  ngOnInit() {
    this.menusidebarService.isSidebarVisible$.subscribe((value) => {
      this.visibleSidebar = value;
    });
    this.translateService.addLangs(this.availableLanguages);
    if (this.selectedLanguage == null) {
      this.selectedLanguage = 'en'; // Default
      localStorage.setItem('lng', this.selectedLanguage);
    }
    this.translateService.use(this.selectedLanguage);
    this.updateTranslations();
    this.updateMenuTranslations();
  }

  private readonly availableLanguages = ['de', 'en'];
  translateService = inject(TranslateService);
  items: any[] = [];

  // items = [
  //   { label: 'Buchen', routerLink: '/' },
  //   { label: 'Meine Reise', routerLink: '/' },
  //   { label: 'Check-in', routerLink: '/' },
  // ];


  private updateMenuTranslations() {
    this.translateService.get([
      'book',
      'my-trip',
      'checkIn',
    ]).subscribe(translations => {
      this.items = [
        { label: translations['book'], routerLink: '/' },
        { label: translations['my-trip'], routerLink: '/' },
        { label: translations['checkIn'], routerLink: '/' },
      ];
    });
  }
  protected onChangeLanguage(event: any) {
    const newLanguage = event.value;
    localStorage.setItem('lng', newLanguage);

    this.translateService.use(newLanguage).subscribe(() => {
      this.updateTranslations();
      this.updateMenuTranslations();
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
    this.menusidebarService.toggleSidebar();
    setTimeout(() => {
      document.getElementById('main-content')?.focus();
    });
  }
}
