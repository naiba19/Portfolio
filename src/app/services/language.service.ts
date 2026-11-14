import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'de' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<Language>('de');
  public currentLanguage$ = this.currentLanguage.asObservable();

  private translations: Record<Language, Record<string, string>> = {
    de: {
      'nav.home': 'Startseite',
      'nav.about': 'Über mich',
      'nav.skills': 'Fähigkeiten',
      'nav.portfolio': 'Portfolio',
      'nav.contact': 'Kontakt',
      'hero.title': 'Naiba Radshabov',
      'hero.subtitle': 'Full Stack Developer',
      'hero.cta': 'Meine Projekte ansehen',
      'about.title': 'Über mich',
      'skills.title': 'Fähigkeiten',
      'portfolio.title': 'Meine Projekte',
      'contact.title': 'Kontakt',
      'footer.copyright': '© 2026 Naiba Radshabov. Alle Rechte vorbehalten.',
    },
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.portfolio': 'Portfolio',
      'nav.contact': 'Contact',
      'hero.title': 'Naiba Radshabov',
      'hero.subtitle': 'Full Stack Developer',
      'hero.cta': 'View my projects',
      'about.title': 'About Me',
      'skills.title': 'Skills',
      'portfolio.title': 'My Projects',
      'contact.title': 'Contact',
      'footer.copyright': '© 2026 Naiba Radshabov. All rights reserved.',
    }
  };

  constructor() {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved) {
      this.currentLanguage.next(saved);
    }
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.next(lang);
    localStorage.setItem('language', lang);
  }

  getLanguage(): Language {
    return this.currentLanguage.value;
  }

  translate(key: string): string {
    const lang = this.currentLanguage.value;
    return this.translations[lang][key] || key;
  }

  getTranslations(): Observable<Record<string, string>> {
    return new Observable(observer => {
      observer.next(this.translations[this.currentLanguage.value]);
      const subscription = this.currentLanguage$.subscribe(lang => {
        observer.next(this.translations[lang]);
      });
      return () => subscription.unsubscribe();
    });
  }
}
