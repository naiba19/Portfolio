import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'de' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<Language>('en');
  public currentLanguage$ = this.currentLanguage.asObservable();

  constructor(private translate: TranslateService) {
    const saved = localStorage.getItem('language');
    const initialLanguage: Language = saved === 'de' ? 'de' : 'en';

    this.translate.addLangs(['en', 'de']);
    this.translate.setFallbackLang('en');
    this.translate.use(initialLanguage);
    this.currentLanguage.next(initialLanguage);
    this.updateDocumentLanguage(initialLanguage);
    this.currentLanguage$.subscribe(lang => this.updateDocumentLanguage(lang));
  }

  setLanguage(lang: Language): void {
    this.translate.use(lang);
    this.currentLanguage.next(lang);
    localStorage.setItem('language', lang);
  }

  private updateDocumentLanguage(lang: Language): void {
    document.documentElement.lang = lang;
  }

  getLanguage(): Language {
    return this.currentLanguage.value;
  }
}
