import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export type UiLanguage = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class UiLanguageService {
  private readonly translate = inject(TranslateService);

  private readonly storageKey = 'projment_lang';

  private readonly languageSubject = new BehaviorSubject<UiLanguage>('en');
  readonly language$ = this.languageSubject.asObservable();

  init(): void {
    const lang = this.getCurrent();
    this.setLanguage(lang);
  }

  getCurrent(): UiLanguage {
    const saved = (localStorage.getItem(this.storageKey) as UiLanguage | null) ?? null;
    if (saved === 'en' || saved === 'ar') {
      return saved;
    }

    const browser = (navigator.language || 'en').toLowerCase();
    if (browser.startsWith('ar')) {
      return 'ar';
    }

    return 'en';
  }

  setLanguage(lang: UiLanguage): void {
    localStorage.setItem(this.storageKey, lang);
    this.languageSubject.next(lang);

    this.translate.use(lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
