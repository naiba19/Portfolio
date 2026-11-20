import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header" [class.menu-open]="menuOpen">
      <div class="header-container">
        <div class="logo">
          <button class="logo-text" (click)="scrollToHome()" [attr.aria-label]="'Home'">[NR]</button>
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
            type="button"
            class="hamburger-menu"
            [class.open]="menuOpen"
            (click)="toggleMenu()"
            [attr.aria-label]="menuOpen ? 'Close navigation menu' : 'Open navigation menu'"
            [attr.aria-expanded]="menuOpen"
            aria-controls="navigation-menu"
          >
            <span class="hamburger-line line1"></span>
            <span class="hamburger-line line2"></span>
            <span class="hamburger-line line3"></span>
          </button>
        </div>
      </div>

      <!-- Overlay Menu -->
      <div
        id="navigation-menu"
        class="menu-overlay"
        [class.open]="menuOpen"
        (click)="closeMenu()"
      >
        <nav class="menu-content" aria-label="Main navigation" (click)="$event.stopPropagation()">
          <button type="button" class="menu-item" (click)="navigateTo('about')">About me</button>
          <button type="button" class="menu-item" (click)="navigateTo('skills')">My skills</button>
          <button type="button" class="menu-item" (click)="navigateTo('portfolio')">Portfolio</button>
        </nav>

        <div class="menu-footer" (click)="$event.stopPropagation()">
          <div class="menu-footer-content">
            <div class="menu-contact">
              <a class="menu-say-hi" href="mailto:naiba.radshabov@outlook.de">Say Hi!</a>
              <a class="menu-email" href="mailto:naiba.radshabov@outlook.de">
                naiba.radshabov@outlook.de
              </a>
            </div>

            <div class="menu-socials" aria-label="Social links">
              <a href="https://github.com/naiba19" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.36-.01 2.46-.01 2.79 0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"/>
                </svg>
              </a>
              <a href="mailto:naiba.radshabov@outlook.de" aria-label="Email">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.8"/>
                  <path d="m4 6 8 7 8-7" fill="none" stroke="currentColor" stroke-width="1.8"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5.4 7.7A2.3 2.3 0 1 0 5.4 3a2.3 2.3 0 0 0 0 4.7ZM3.5 21h3.8V9.2H3.5V21Zm6.1 0h3.8v-6.5c0-1.7.3-3.4 2.5-3.4 2.1 0 2.1 2 2.1 3.5V21h3.8v-7.1c0-3.5-.8-6.1-4.8-6.1-1.9 0-3.2 1-3.7 2h-.1V9.2H9.6V21Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
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

    .header.menu-open {
      position: fixed;
      left: 0;
      right: 0;
      background-color: #ffffff;
      border-bottom-color: transparent;
    }

    .header.menu-open .header-container {
      position: relative;
      z-index: 101;
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
      top: 80px;
      left: 0;
      width: 100%;
      height: calc(100vh - 80px);
      background-color: #ffffff;
      z-index: 99;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .menu-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .menu-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: clamp(2.25rem, 5vh, 4rem);
      width: 100%;
      height: calc(100% - clamp(180px, 24vh, 240px));
      margin: 0 auto;
      padding: 120px var(--space-lg) 2rem;
      text-align: center;
    }

    .menu-item {
      background: none;
      border: none;
      color: var(--color-text);
      text-decoration: none;
      font-family: var(--font-family-heading);
      font-size: clamp(2.25rem, 5vw, 4.25rem);
      font-weight: 800;
      line-height: 1.05;
      transition: color 0.3s ease, transform 0.3s ease;
      cursor: pointer;
      padding: 0;
      position: relative;
      align-self: center;
    }

    .menu-item::before {
      content: '';
      position: absolute;
      left: -1.25rem;
      bottom: -0.35rem;
      width: 0.75rem;
      height: 0.75rem;
      border-left: 2px solid var(--color-text);
      border-bottom: 2px solid var(--color-text);
    }

    .menu-item:hover,
    .menu-item:focus {
      color: var(--color-primary);
      outline: none;
      transform: translateX(4px);
    }

    .menu-item:hover::before,
    .menu-item:focus::before {
      border-color: var(--color-primary);
    }

    .menu-footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: clamp(180px, 24vh, 240px);
      background-color: var(--color-dark-bg);
      clip-path: polygon(0 18%, 100% 0, 100% 100%, 0 100%);
      color: var(--color-text-dark);
    }

    .menu-footer-content {
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 3.5rem var(--space-lg) 1.5rem;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }

    .menu-contact {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      align-items: flex-start;
    }

    .menu-say-hi {
      color: #ffffff;
      font-family: var(--font-family-heading);
      font-size: clamp(2.25rem, 4vw, 3.75rem);
      font-weight: 800;
      line-height: 1;
      text-decoration: none;
    }

    .menu-email {
      color: #ffffff;
      font-family: var(--font-family-body);
      font-size: clamp(0.875rem, 1.5vw, 1.125rem);
      text-decoration: none;
    }

    .menu-socials {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-bottom: 0.25rem;
    }

    .menu-socials a {
      width: 22px;
      height: 22px;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .menu-socials svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
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

      .menu-overlay {
        top: 72px;
        height: calc(100dvh - 72px);
      }

      .menu-content {
        height: calc(100% - 170px);
        padding: 100px var(--space-md) 1.5rem;
        gap: 2rem;
      }

      .menu-item {
        font-size: clamp(2rem, 9vw, 3.25rem);
      }

      .menu-footer {
        height: 170px;
      }

      .menu-footer-content {
        padding: 3.25rem var(--space-md) 1.25rem;
      }

      .menu-say-hi {
        font-size: 2.25rem;
      }

      .menu-email {
        max-width: 170px;
        font-size: 0.75rem;
      }

      .menu-socials {
        gap: 0.75rem;
      }

      .menu-socials a {
        width: 18px;
        height: 18px;
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

  @HostListener('document:keydown.escape')
  closeMenuOnEscape(): void {
    if (this.menuOpen) {
      this.closeMenu();
    }
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
