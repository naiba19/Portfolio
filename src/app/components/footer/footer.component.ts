import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <p>{{ translate('footer.copyright') }}</p>
        </div>
        
        <div class="footer-links">
          <a routerLink="/privacy">Privacy Policy</a>
          <a href="https://github.com/naiba19" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--color-text);
      color: var(--color-background);
      padding: 2rem;
      margin-top: 4rem;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .footer-content p {
      margin: 0;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
    }

    .footer-links a {
      color: var(--color-background);
      text-decoration: none;
      transition: opacity 0.3s ease;
    }

    .footer-links a:hover {
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .footer-container {
        flex-direction: column;
        text-align: center;
      }

      .footer-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
