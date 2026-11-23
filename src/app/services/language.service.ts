import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'de' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<Language>('en');
  public currentLanguage$ = this.currentLanguage.asObservable();
  private currentLanguageSignal = signal<Language>('en');

  private translations: Record<Language, Record<string, string>> = {
    de: {
      'nav.home': 'Startseite',
      'nav.about': 'Über mich',
      'nav.skills': 'Fähigkeiten',
      'nav.portfolio': 'Portfolio',
      'nav.contact': 'Kontakt',
      'hero.title': 'Full Stack Developer',
      'hero.name': 'Naiba Radshabov',
      'hero.scroll': 'Nach unten',
      'about.title': 'Über mich',
      'about.intro': 'Ich entwickle browserbasierte Anwendungen mit JavaScript und Angular. Bei der Pokédex-App habe ich die Herausforderung gelöst, große Mengen von API-Daten übersichtlich, schnell und responsiv darzustellen.',
      'about.details': 'Ich habe die Pokémon-Daten über die PokéAPI geladen, Filter- und Caching-Logik umgesetzt und die Benutzeroberfläche mobil optimiert. Das Ergebnis ist eine responsive Anwendung, mit der sich Pokémon effizient suchen und erkunden lassen.',
      'about.location': 'Standort:',
      'about.location.value': 'Hagen, Deutschland',
      'about.status': 'Status:',
      'about.status.value': 'Offen für Remote-Arbeit und Zusammenarbeit',
      'about.talk': 'Lass uns sprechen',
      'skills.title': 'Meine Fähigkeiten',
      'skills.message': 'Fehlende Fähigkeit? Ich lerne gerne neue Technologien!',
      'skills.contact': 'Kontaktiere mich',
      'portfolio.title': 'Portfolio',
      'portfolio.intro': 'Erkunden Sie eine Auswahl meiner Arbeiten - interagieren Sie mit Projekten, um meine Fähigkeiten in Aktion zu sehen.',
      'contact.title': 'Sag Hallo!',
      'contact.project.title': 'Möchtest du ein neues Projekt besprechen?',
      'contact.subtitle': 'Lass uns über deine Ideen sprechen und sie Wirklichkeit werden lassen',
      'contact.placeholder.name': 'Dein Name',
      'contact.placeholder.email': 'Deine E-Mail',
      'contact.placeholder.message': 'Deine Nachricht',
      'contact.button': 'Nachricht senden',
      'contact.sending': 'Wird gesendet...',
      'contact.privacy.accept': 'Ich habe die gelesen und akzeptiere die Verarbeitung meiner Daten wie beschrieben.',
      'contact.privacy.policy': 'Datenschutzrichtlinie',
      'contact.error.name': 'Bitte gib deinen Namen ein',
      'contact.error.email': 'Bitte gib eine gültige E-Mail-Adresse ein',
      'contact.error.message': 'Bitte gib eine Nachricht ein',
      'contact.success': 'Danke für deine Nachricht! Ich werde mich bald bei dir melden.',
      'footer.copyright': '© 2026 Naiba Radshabov. Alle Rechte vorbehalten.',
      'footer.legal': 'Rechtliche Hinweise',
      'privacy.title': 'Datenschutzerklärung',
      'privacy.placeholder': '[Datenschutzerklärung wird ergänzt]',
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
      'about.title': 'About me',
      'about.intro': 'I build browser-based applications with JavaScript and Angular. For the Pokédex project, I solved the challenge of presenting large amounts of API data in a fast, clear, and responsive interface.',
      'about.details': 'I fetched Pokémon data through the PokéAPI, implemented filtering and caching, and adapted the interface for mobile devices. The result is a responsive application that makes it easy to search and explore Pokémon.',
      'about.location': 'Location:',
      'about.location.value': 'Hagen, Germany',
      'about.status': 'Status:',
      'about.status.value': 'Open to remote work and collaboration',
      'about.talk': "Let's talk",
      'skills.title': 'My Skills',
      'skills.message': 'Don\'t see the skill you need? I\'m always ready to learn!',
      'skills.contact': 'Contact me',
      'portfolio.title': 'Portfolio',
      'portfolio.intro': 'Explore a selection of my work here - interact with projects to see my skills in action.',
      'contact.title': 'Say Hi!',
      'contact.project.title': 'Want to discuss a new project?',
      'contact.subtitle': 'Say hello! let\'s discuss your ideas and make it happen',
      'contact.placeholder.name': 'Your name',
      'contact.placeholder.email': 'Your email',
      'contact.placeholder.message': 'Your message',
      'contact.button': 'Send message',
      'contact.sending': 'Sending...',
      'contact.privacy.accept': 'I\'ve read the and agree to the processing of my data as outlined.',
      'contact.privacy.policy': 'privacy policy',
      'contact.error.name': 'Please enter your name',
      'contact.error.email': 'Please enter a valid email address',
      'contact.error.message': 'Please enter a message',
      'contact.success': 'Thank you for your message! I\'ll get back to you soon.',
      'footer.copyright': '© 2026 Naiba Radshabov. All rights reserved.',
      'footer.legal': 'Legal Notice',
      'privacy.title': 'Privacy Policy',
      'privacy.placeholder': '[Privacy Policy to be added]',
    }
  };

  constructor() {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved) {
      this.currentLanguage.next(saved);
      this.currentLanguageSignal.set(saved);
    }
    this.updateDocumentLanguage(this.currentLanguage.value);
    this.currentLanguage$.subscribe(lang => this.updateDocumentLanguage(lang));
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.next(lang);
    this.currentLanguageSignal.set(lang);
    localStorage.setItem('language', lang);
  }

  private updateDocumentLanguage(lang: Language): void {
    document.documentElement.lang = lang;
  }

  getLanguage(): Language {
    return this.currentLanguage.value;
  }

  translate(key: string): string {
    const lang = this.currentLanguageSignal();
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
