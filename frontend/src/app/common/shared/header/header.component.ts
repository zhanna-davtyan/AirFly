import {Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {SelectItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Button,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  protected selectedLanguage: string | null = localStorage.getItem('lng');
  languageOptions: SelectItem[] = [];

  private readonly availableLanguages = ['de', 'en'];
  translateService = inject(TranslateService);

  constructor(
  ) {}

  ngOnInit() {
    this.translateService.addLangs(this.availableLanguages);
    if (this.selectedLanguage == null) {
      this.selectedLanguage = 'en'; // Default
      localStorage.setItem('lng', this.selectedLanguage);
    }
    this.translateService.use(this.selectedLanguage);
    this.updateTranslations();
  }

  protected onChangeLanguage(event: any) {
    localStorage.setItem('lng', event.value);
    this.translateService.use(event.value);
    this.updateTranslations();
  }

  private updateTranslations() {
    this.translateService
      .get([
        'base.language.en',
        'base.language.de'
      ])
      .pipe(take(1))
      .subscribe(translations => {
        this.languageOptions = this.availableLanguages.map(option => ({
          value: option,
          label: translations['base.language.' + option],
        }));
      });
  }
}
