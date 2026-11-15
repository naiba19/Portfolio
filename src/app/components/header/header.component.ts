import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <button class="logo-text" (click)="scrollToHome()" [attr.aria-label]="'Home'">NR</button>
        </div>
        
        <div class="header-right">
          <div class="language-toggle">
            <button 
              (click)="toggleLanguage()" 
              class="lang-button"
              [attr.aria-label]="'Switch to ' + (currentLanguage === 'de' ? 'English' : 'Deutsch')"
            >
              {{ currentLanguage === 'de' ? 'EN' : 'DE' }}
            </button>
          </div>

          <button 
            class="hamburger-menu"
            [class.open]="menuOpen"
            (click)="toggleMenu()"
            [attr.aria-label]="'Toggle navigation menu'"
            [attr.aria-expanded]="menuOpen"
          >
            <span class="hamburger-line line1"></span>
            <span class="hamburger-line line2"></span>
            <span class="hamburger-line line3"></span>
          </button>
        </div>
      </div>

      <!-- Overlay Menu -->
      <div class="menu-overlay" [class.open]="menuOpen" (click)="closeMenu()">
        <nav class="menu-content" (click)="$event.stopPropagation()">
          <button class="menu-item" (click)="navigateTo('about')">
            {{ translate('nav.about') }}
          </button>
          <button class="menu-item" (click)="navigateTo('skills')">
            {{ translate('nav.skills') }}
          </button>
          <button class="menu-item" (click)="navigateTo('portfolio')">
            {{ translate('nav.portfolio') }}
          </button>
          <button class="menu-item" (click)="navigateTo('contact')">
            {{ translate('nav.contact') }}
          </button>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--color-background);
      border-bottom: var(--border-width) solid var(--color-border);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--space-lg) var(--space-lg);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-lg);
    }

    .logo {
      display: flex;
      align-items: center;
    }

    .logo-text {
      font-family: var(--font-family-heading);
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-text);
      background: none;
      border: none;
      text-decoration: none;
      letter-spacing: -0.05em;
      cursor: pointer;
      transition: color 0.3s ease;
      padding: 0;
    }

    .logo-text:hover {
      color: var(--color-primary);
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .language-toggle {
      display: flex;
      align-items: center;
    }

    .lang-button {
      background-color: transparent;
      color: var(--color-text);
      border: var(--border-width) solid var(--color-text);
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      font-weight: 600;
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      transition: all 0.3s ease;
    }

    .lang-button:hover {
      background-color: var(--color-primary);
      color: var(--color-background);
      border-color: var(--color-primary);
    }

    /* Hamburger Menu */
    .hamburger-menu {
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 4px;
      width: 40px;
      height: 40px;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .hamburger-line {
      width: 24px;
      height: 2px;
      background-color: var(--color-text);
      transition: all 0.3s ease;
      transform-origin: center;
    }

    .hamburger-menu.open .line1 {
      transform: rotate(45deg) translate(8px, 8px);
    }

    .hamburger-menu.open .line2 {
      opacity: 0;
    }

    .hamburger-menu.open .line3 {
      transform: rotate(-45deg) translate(7px, -7px);
    }

    /* Menu Overlay */
    .menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.95);
      z-index: 99;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .menu-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xl);
      text-align: center;
    }

    .menu-item {
      background: none;
      border: none;
      color: var(--color-background);
      text-decoration: none;
      font-family: var(--font-family-body);
      font-size: clamp(1.25rem, 4vw, 2rem);
      font-weight: 500;
      transition: color 0.3s ease;
      cursor: pointer;
      padding: 0;
    }

    .menu-item:hover,
    .menu-item:focus {
      color: var(--color-primary);
      outline: none;
    }

    @media (max-width: 768px) {
      .header-container {
        padding: var(--space-md) var(--space-md);
      }

      .lang-button {
        padding: 0.4rem 0.8rem;
        font-size: var(--font-size-xs);
      }

      .hamburger-menu {
        width: 36px;
        height: 36px;
      }

      .hamburger-line {
        width: 20px;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentLanguage: Language = 'de';
  menuOpen = false;

  constructor(
    private languageService: LanguageService,
    private scrollService: ScrollService
  ) {}

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

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  scrollToHome(): void {
    this.closeMenu();
    this.scrollService.scrollToTop();
  }

  navigateTo(sectionId: string): void {
    this.closeMenu();
    this.scrollService.scrollToSection(sectionId);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
