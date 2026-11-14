import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about">
      <div class="about-container">
        <h2>{{ translate('about.title') }}</h2>
        <div class="about-content">
          <p class="placeholder">
            [Biography to be added]
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      padding: 4rem 2rem;
      background-color: var(--color-surface);
    }

    .about-container {
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      text-align: center;
      color: var(--color-text);
    }

    .about-content {
      line-height: 1.8;
      color: var(--color-text-light);
    }

    .placeholder {
      text-align: center;
      font-style: italic;
      padding: 2rem;
      background-color: var(--color-background);
      border-radius: 8px;
      color: var(--color-text);
    }

    @media (max-width: 768px) {
      h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class AboutComponent {
  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
