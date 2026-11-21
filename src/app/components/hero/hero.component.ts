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
          <h1 class="hero-heading">
            <span>Full Stack</span>
            <span>Developer</span>
          </h1>
        </div>

        <div class="hero-name-section">
          <img class="hero-divider" src="/arrows/line.svg" alt="" aria-hidden="true">
          <span class="hero-name">{{ translate('hero.name') }}</span>
        </div>
      </div>

      <button class="hero-scroll-btn" (click)="scrollToAbout()" [attr.aria-label]="'Scroll to About section'">
        <img class="down-arrow" src="/arrows/down.svg" alt="" aria-hidden="true">
        <span class="scroll-text">Scroll<br>Down</span>
      </button>
    </section>
  `,
  styles: [`
    .hero {
      min-height: calc(100vh - 80px);
      display: grid;
      grid-template-columns: 100px minmax(0, 760px) 100px;
      gap: clamp(1rem, 2.5vw, 2.5rem);
      align-items: center;
      justify-content: center;
      background-color: var(--color-background);
      background-image: radial-gradient(circle, rgba(240, 219, 199, 0.65) 0.75px, transparent 1px);
      background-size: 32px 32px;
      background-position: 0 0;
      padding: var(--space-2xl) clamp(1.5rem, 5vw, 4rem);
      position: relative;
      overflow: hidden;
    }

    .hero-email-left {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 180px;
      align-self: center;
      width: 100px;
      transform: translateY(7rem);
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
      gap: 1.5rem;
      text-align: left;
      width: 760px;
      max-width: 100%;
      transform: translateY(-4.5rem);
    }

    .hero-heading-wrapper {
      width: 100%;
    }

    .hero-heading {
      font-family: var(--font-family-heading);
      font-size: clamp(4.5rem, 7.4vw, 7rem);
      font-weight: 800;
      line-height: 0.9;
      letter-spacing: -0.045em;
      color: var(--color-text);
      margin: 0;
    }

    .hero-heading span {
      display: block;
      white-space: nowrap;
    }

    .hero-name-section {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      width: 100%;
    }

    .hero-divider {
      width: clamp(320px, 58%, 480px);
      height: 3px;
      object-fit: contain;
      flex-shrink: 0;
    }

    .hero-name {
      font-family: var(--font-family-body);
      font-size: clamp(2rem, 3.2vw, 3rem);
      font-weight: 700;
      color: var(--color-primary);
      white-space: nowrap;
      letter-spacing: -0.02em;
      line-height: 1;
    }

    .hero-scroll-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      width: 100px;
      align-self: center;
      transform: translateY(7rem);
    }

    .down-arrow {
      width: 96px;
      height: 160px;
      animation: arrow-flow 2.2s cubic-bezier(0.37, 0, 0.63, 1) infinite;
      will-change: transform;
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

    @keyframes arrow-flow {
      0%, 100% { transform: translateY(-10px); }
      50% { transform: translateY(18px); }
    }

    @media (prefers-reduced-motion: reduce) {
      .down-arrow {
        animation: none;
      }
    }

    @media (max-width: 1024px) {
      .hero {
        grid-template-columns: 60px minmax(0, 1fr) 80px;
        gap: var(--space-2xl);
        min-height: 90vh;
        padding-inline: var(--space-lg);
      }

      .hero-email-left {
        width: 60px;
        height: 180px;
      }

      .hero-scroll-btn {
        width: 80px;
      }

      .hero-center {
        justify-content: center;
        align-items: flex-start;
        text-align: left;
        width: 100%;
        transform: translateY(-1rem);
      }

      .hero-heading {
        font-size: clamp(4rem, 8vw, 6rem);
      }

      .hero-name {
        font-size: clamp(1.5rem, 5vw, 2.5rem);
      }

      .hero-name-section {
        justify-content: flex-start;
        gap: 1.25rem;
      }

      .hero-divider {
        width: clamp(180px, 52%, 360px);
      }
    }

    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        min-height: 80vh;
        padding: var(--space-xl) var(--space-md);
        align-content: center;
      }

      .hero-center {
        transform: none;
      }

      .hero-email-left {
        position: absolute;
        left: 1rem;
        bottom: 2rem;
        width: auto;
        min-height: 0;
        height: auto;
        opacity: 0.85;
      }

      .hero-scroll-btn {
        position: absolute;
        right: 1.25rem;
        bottom: 2rem;
        width: auto;
        transform: none;
      }

      .hero-heading {
        font-size: clamp(2rem, 9vw, 3.5rem);
        line-height: 0.92;
        letter-spacing: -0.045em;
      }

      .hero-name {
        font-size: clamp(1.2rem, 4vw, 2rem);
      }

      .hero-name-section {
        width: min(100%, 520px);
        gap: 0.75rem;
      }

      .hero-divider {
        width: clamp(100px, 48%, 240px);
        height: 3px;
      }

      .down-arrow {
        width: 72px;
        height: 120px;
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

