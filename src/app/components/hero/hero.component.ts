import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-text-wrapper">
            <div class="hero-heading-section">
              <h1 class="hero-heading">
                {{ translate('hero.title') }}
              </h1>
            </div>
            
            <div class="hero-divider-section">
              <div class="hero-divider-line"></div>
              <p class="hero-name">
                {{ translate('hero.name') }}
              </p>
            </div>
          </div>

          <button class="scroll-indicator" (click)="scrollToAbout()" [attr.aria-label]="'Scroll to About section'">
            <p class="scroll-text">{{ translate('hero.scroll') }}</p>
            <svg class="scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <div class="hero-sidebar">
          <p class="email-vertical">naiba.radshabov<br />@outlook.de</p>
        </div>

        <div class="hero-decoration">
          <svg class="decoration-arrow" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 20 80 20 80 80"></polyline>
          </svg>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-background);
      padding: var(--space-2xl) var(--space-lg);
      position: relative;
      overflow: hidden;
    }

    .hero-container {
      max-width: 1200px;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--space-4xl);
      align-items: center;
      position: relative;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 500px;
    }

    .hero-text-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xl);
    }

    .hero-heading-section {
      display: flex;
      flex-direction: column;
    }

    .hero-heading {
      font-family: var(--font-family-heading);
      font-size: clamp(3rem, 8vw, 4.5rem);
      font-weight: 800;
      line-height: var(--line-height-tight);
      color: var(--color-text);
      letter-spacing: -0.02em;
      margin: 0;
    }

    .hero-divider-section {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
    }

    .hero-divider-line {
      flex: 1;
      height: 2px;
      background-color: var(--color-text);
      max-width: 200px;
    }

    .hero-name {
      font-family: var(--font-family-heading);
      font-size: clamp(2.5rem, 7vw, 4rem);
      font-weight: 800;
      line-height: var(--line-height-tight);
      color: var(--color-primary);
      letter-spacing: -0.02em;
      margin: 0;
      white-space: nowrap;
    }

    .scroll-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      transition: transform 0.3s ease;
    }

    .scroll-indicator:hover {
      transform: translateY(5px);
    }

    .scroll-text {
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      font-weight: 500;
      color: var(--color-text);
      margin: 0;
    }

    .scroll-arrow {
      color: var(--color-primary);
      width: 24px;
      height: 24px;
      animation: scroll-bounce 2s infinite;
    }

    .hero-sidebar {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .email-vertical {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      color: var(--color-text);
      transform: rotate(180deg);
      letter-spacing: 0.1em;
      margin: 0;
      white-space: nowrap;
    }

    .hero-decoration {
      position: absolute;
      bottom: var(--space-2xl);
      right: var(--space-2xl);
      opacity: 0.5;
    }

    .decoration-arrow {
      color: var(--color-text);
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
      .scroll-arrow {
        animation: none;
      }
    }

    @media (max-width: 1024px) {
      .hero-heading {
        font-size: clamp(2.5rem, 6vw, 3.5rem);
      }

      .hero-name {
        font-size: clamp(2rem, 5vw, 3rem);
      }

      .hero-divider-line {
        max-width: 150px;
      }
    }

    @media (max-width: 768px) {
      .hero {
        min-height: 80vh;
        padding: var(--space-xl) var(--space-md);
      }

      .hero-container {
        grid-template-columns: 1fr;
        gap: var(--space-2xl);
      }

      .hero-heading {
        font-size: var(--font-size-4xl);
      }

      .hero-name {
        font-size: var(--font-size-3xl);
        white-space: normal;
      }

      .hero-divider-section {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-md);
      }

      .hero-divider-line {
        height: 1px;
        width: 60px;
        max-width: 100%;
      }

      .hero-sidebar {
        display: none;
      }

      .hero-decoration {
        display: none;
      }

      .scroll-indicator {
        margin-top: var(--space-2xl);
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
