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
      'hero.title': 'Full Stack Developer',
      'hero.name': 'Naiba Radshabov',
      'hero.scroll': 'Scroll Down',
      'about.title': 'Über mich',
      'skills.title': 'Meine Fähigkeiten',
      'skills.message': 'Fehlende Fähigkeit? Ich lerne gerne neue Technologien!',
      'skills.contact': 'Kontaktiere mich',
      'portfolio.title': 'Portfolio',
      'portfolio.intro': 'Erkunden Sie eine Auswahl meiner Arbeiten - interagieren Sie mit Projekten, um meine Fähigkeiten in Aktion zu sehen.',
      'contact.title': 'Sag Hallo!',
      'contact.subtitle': 'Lass uns über deine Ideen sprechen und sie Wirklichkeit werden lassen',
      'contact.button': 'Nachricht senden',
      'contact.privacy.accept': 'Ich habe die gelesen und akzeptiere die Verarbeitung meiner Daten wie beschrieben.',
      'contact.privacy.policy': 'Datenschutzrichtlinie',
      'contact.error.name': 'Bitte gib deinen Namen ein',
      'contact.error.email': 'Bitte gib eine gültige E-Mail-Adresse ein',
      'contact.error.message': 'Bitte gib eine Nachricht ein',
      'contact.success': 'Danke für deine Nachricht! Ich werde mich bald bei dir melden.',
      'footer.copyright': '© 2026 Naiba Radshabov. Alle Rechte vorbehalten.',
      'footer.legal': 'Rechtliche Hinweise',
    },
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.portfolio': 'Portfolio',
      'nav.contact': 'Contact',
      'hero.title': 'Full Stack Developer',
      'hero.name': 'Naiba Radshabov',
      'hero.scroll': 'Scroll Down',
      'about.title': 'About Me',
      'skills.title': 'My Skills',
      'skills.message': 'Don\'t see the skill you need? I\'m always ready to learn!',
      'skills.contact': 'Contact me',
      'portfolio.title': 'Portfolio',
      'portfolio.intro': 'Explore a selection of my work here - interact with projects to see my skills in action.',
      'contact.title': 'Say Hi!',
      'contact.subtitle': 'Say hello! let\'s discuss your ideas and make it happen',
      'contact.button': 'Send message',
      'contact.privacy.accept': 'I\'ve read the and agree to the processing of my data as outlined.',
      'contact.privacy.policy': 'privacy policy',
      'contact.error.name': 'Please enter your name',
      'contact.error.email': 'Please enter a valid email address',
      'contact.error.message': 'Please enter a message',
      'contact.success': 'Thank you for your message! I\'ll get back to you soon.',
      'footer.copyright': '© 2026 Naiba Radshabov. All rights reserved.',
      'footer.legal': 'Legal Notice',
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
