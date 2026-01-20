import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { UiLanguage, UiLanguageService } from '../../../core/services/ui-language.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  private readonly uiLanguage = inject(UiLanguageService);

  @Output() menuClick = new EventEmitter<void>();

  readonly languages: { code: UiLanguage; labelKey: string }[] = [
    { code: 'en', labelKey: 'Lang.English' },
    { code: 'ar', labelKey: 'Lang.Arabic' },
  ];

  get currentLanguage(): UiLanguage {
    return this.uiLanguage.getCurrent();
  }

  toggleLanguage(): void {
    const next: UiLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.uiLanguage.setLanguage(next);
  }

  setLanguage(lang: UiLanguage): void {
    this.uiLanguage.setLanguage(lang);
  }
}
