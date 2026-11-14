import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <a routerLink="/">NR</a>
        </div>
        
        <nav class="nav-menu">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            {{ translate('nav.home') }}
          </a>
          <a routerLink="/about" routerLinkActive="active">
            {{ translate('nav.about') }}
          </a>
          <a routerLink="/skills" routerLinkActive="active">
            {{ translate('nav.skills') }}
          </a>
          <a routerLink="/portfolio" routerLinkActive="active">
            {{ translate('nav.portfolio') }}
          </a>
          <a routerLink="/contact" routerLinkActive="active">
            {{ translate('nav.contact') }}
          </a>
        </nav>

        <div class="language-toggle">
          <button 
            (click)="toggleLanguage()" 
            [attr.aria-label]="'Switch to ' + (currentLanguage === 'de' ? 'English' : 'Deutsch')"
          >
            {{ currentLanguage === 'de' ? 'EN' : 'DE' }}
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--color-background);
      border-bottom: 1px solid var(--color-text-light);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo a {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--color-primary);
      text-decoration: none;
    }

    .nav-menu {
      display: flex;
      gap: 2rem;
      flex: 1;
      margin-left: 3rem;
    }

    .nav-menu a {
      color: var(--color-text);
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;
    }

    .nav-menu a:hover,
    .nav-menu a.active {
      color: var(--color-primary);
    }

    .language-toggle button {
      background-color: var(--color-primary);
      color: var(--color-background);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }

    .language-toggle button:hover {
      background-color: var(--color-primary-dark);
    }

    @media (max-width: 768px) {
      .header-container {
        flex-wrap: wrap;
        gap: 1rem;
      }

      .nav-menu {
        flex-basis: 100%;
        gap: 1rem;
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentLanguage: Language = 'de';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getLanguage();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage === 'de' ? 'en' : 'de';
    this.languageService.setLanguage(newLang);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
