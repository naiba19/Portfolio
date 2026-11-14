import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1>{{ translate('hero.title') }}</h1>
        <p class="subtitle">{{ translate('hero.subtitle') }}</p>
        <p class="location">Hagen, Germany</p>
        <a routerLink="/portfolio" class="cta-button">
          {{ translate('hero.cta') }}
        </a>
        <div class="social-links">
          <a href="https://github.com/naiba19" target="_blank" rel="noopener noreferrer" 
             aria-label="GitHub">
            GitHub
          </a>
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
      background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%);
      padding: 2rem;
    }

    .hero-content {
      text-align: center;
      max-width: 600px;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
      color: var(--color-text);
    }

    .subtitle {
      font-size: 1.5rem;
      color: var(--color-primary);
      margin: 0 0 0.5rem 0;
      font-weight: 600;
    }

    .location {
      font-size: 1.1rem;
      color: var(--color-text-light);
      margin: 0 0 2rem 0;
    }

    .cta-button {
      display: inline-block;
      background-color: var(--color-primary);
      color: var(--color-background);
      padding: 1rem 2rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.3s ease;
      margin-bottom: 2rem;
    }

    .cta-button:hover {
      background-color: var(--color-primary-dark);
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
    }

    .social-links a {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .social-links a:hover {
      color: var(--color-primary-dark);
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }

      .subtitle {
        font-size: 1.2rem;
      }

      .cta-button {
        padding: 0.75rem 1.5rem;
      }
    }
  `]
})
export class HeroComponent {
  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
