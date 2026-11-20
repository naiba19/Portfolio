import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" id="home">
      <div class="hero-email-left">
        <span class="email-text">naiba.radshabov<br>@outlook.de</span>
      </div>

      <div class="hero-center">
        <div class="hero-heading-wrapper">
          <h1 class="hero-heading">{{ translate('hero.title') }}</h1>
        </div>

        <div class="hero-name-section">
          <div class="hero-divider"></div>
          <span class="hero-name">{{ translate('hero.name') }}</span>
        </div>

        <button class="hero-scroll-btn" (click)="scrollToAbout()" [attr.aria-label]="'Scroll to About section'">
          <span class="scroll-label">{{ translate('hero.scroll') }}</span>
          <svg class="scroll-arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      <div class="hero-arrow-right">
        <div class="scroll-down-box">
          <svg class="down-arrow" width="116" height="180" viewBox="0 0 116 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33 145.105L58 170.105L83 145.105" stroke-width="4" stroke="currentColor"/>
            <path d="M58 78V170.105" stroke-width="4" stroke="currentColor"/>
          </svg>
          <p class="scroll-text">Scroll<br>Down</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: minmax(80px, auto) 1fr minmax(80px, auto);
      gap: var(--space-3xl);
      align-items: center;
      justify-items: start;
      background-color: var(--color-background);
      padding: var(--space-2xl) var(--space-4xl);
      position: relative;
      overflow: visible;
    }

    .hero-email-left {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 500px;
      width: 100%;
      justify-self: start;
    }

    .email-text {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform: rotate(180deg);
      font-family: var(--font-family-body);
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text);
      letter-spacing: 0.05em;
      white-space: nowrap;
      line-height: 1.6;
      text-align: center;
    }

    .hero-center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: var(--space-2xl);
      flex: 1;
      text-align: left;
      max-width: 1000px;
    }

    .hero-heading-wrapper {
      width: 100%;
      max-width: 650px;
    }

    .hero-heading {
      font-family: var(--font-family-heading);
      font-size: clamp(4rem, 12vw, 7.5rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      color: var(--color-text);
      margin: 0;
      max-width: 1000px;
      word-break: break-word;
    }

    .hero-name-section {
      display: flex;
      align-items: center;
      gap: var(--space-xl);
      margin-top: var(--space-sm);
    }

    .hero-divider {
      width: 240px;
      height: 1px;
      background-color: var(--color-text);
      flex-shrink: 0;
    }

    .hero-name {
      font-family: var(--font-family-heading);
      font-size: clamp(2rem, 6vw, 3.5rem);
      font-weight: 800;
      color: var(--color-primary);
      white-space: nowrap;
      letter-spacing: -0.02em;
    }

    .hero-scroll-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      margin-top: var(--space-2xl);
      transition: transform 0.3s ease;
    }

    .hero-scroll-btn:hover {
      transform: translateY(5px);
    }

    .scroll-label {
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      font-weight: 500;
      color: var(--color-text);
    }

    .scroll-arrow-icon {
      color: var(--color-primary);
      width: 24px;
      height: 24px;
      animation: scroll-bounce 2s infinite;
    }

    .hero-arrow-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 500px;
      width: 100%;
      justify-self: end;
    }

    .scroll-down-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);
      text-align: center;
    }

    .down-arrow {
      width: 100%;
      max-width: 80px;
      height: auto;
      color: var(--color-text);
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .scroll-text {
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      font-weight: 400;
      color: var(--color-text);
      line-height: 1.4;
      margin: 0;
      white-space: nowrap;
    }

    @keyframes scroll-bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(10px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .scroll-arrow-icon {
        animation: none;
      }
    }

    @media (max-width: 1024px) {
      .hero {
        grid-template-columns: 1fr;
        gap: var(--space-2xl);
        min-height: 90vh;
      }

      .hero-email-left,
      .hero-arrow-right {
        display: none;
      }

      .hero-center {
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
      }

      .hero-heading {
        font-size: clamp(2.5rem, 10vw, 5rem);
      }

      .hero-name {
        font-size: clamp(1.5rem, 5vw, 2.5rem);
      }

      .hero-name-section {
        justify-content: center;
        margin-top: var(--space-md);
      }

      .hero-divider {
        width: 150px;
      }
    }

    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
        gap: var(--space-xl);
        min-height: 80vh;
        padding: var(--space-xl) var(--space-md);
      }

      .hero-heading {
        font-size: clamp(2rem, 9vw, 3.5rem);
      }

      .hero-name {
        font-size: clamp(1.2rem, 4vw, 2rem);
      }

      .hero-name-section {
        flex-direction: column;
        align-items: center;
        gap: var(--space-md);
      }

      .hero-divider {
        width: 100px;
        height: 1px;
      }

      .hero-scroll-btn {
        margin-top: var(--space-xl);
      }

      .scroll-down-box {
        gap: var(--space-sm);
      }

      .down-arrow {
        max-width: 60px;
      }
    }
  `]
})
export class HeroComponent {
  constructor(
    private languageService: LanguageService,
    private scrollService: ScrollService
  ) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  scrollToAbout(): void {
    this.scrollService.scrollToSection('about');
  }
}

