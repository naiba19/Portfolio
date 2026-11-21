import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer dark-section">
      <div class="footer-container">
        <div class="footer-top">
          <p class="footer-logo">NR</p>
          <p class="footer-copyright">{{ translate('footer.copyright') }}</p>
        </div>
        
        <div class="footer-links">
          <button (click)="scrollToContact()" class="footer-link">{{ translate('footer.legal') }}</button>
          <a href="https://github.com/naiba19" target="_blank" rel="noopener noreferrer" class="footer-link">
            GitHub
          </a>
          <a href="mailto:naiba.radshabov@outlook.de" class="footer-link">
            Email
          </a>
        </div>

        <button (click)="scrollToTop()" class="back-to-top" [attr.aria-label]="'Back to top'">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--color-dark-bg);
      background-image: url('/background.png');
      background-size: cover;
      background-position: center;
      color: var(--color-text-dark);
      padding: var(--space-3xl) var(--space-lg);
      border-top: var(--border-width) solid var(--color-border-dark);
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr 60px;
      gap: var(--space-2xl);
      align-items: start;
    }

    .footer-top {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .footer-logo {
      font-family: var(--font-family-heading);
      font-size: var(--font-size-2xl);
      font-weight: 800;
      color: var(--color-text-dark);
      margin: 0;
      letter-spacing: -0.05em;
    }

    .footer-copyright {
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .footer-link {
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      color: var(--color-text-dark);
      text-decoration: none;
      transition: color 0.3s ease;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      text-align: left;
    }

    .footer-link:hover {
      color: var(--color-primary);
    }

    .back-to-top {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border: var(--border-width) solid var(--color-text-dark);
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--color-text-dark);
      background: none;
      padding: 0;
    }

    .back-to-top:hover {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-dark-bg);
    }

    .back-to-top svg {
      width: 24px;
      height: 24px;
    }

    @media (max-width: 768px) {
      .footer-container {
        grid-template-columns: 1fr;
        gap: var(--space-lg);
      }

      .back-to-top {
        width: 50px;
        height: 50px;
      }
    }
  `]
})
export class FooterComponent {
  constructor(
    private languageService: LanguageService,
    private scrollService: ScrollService
  ) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }

  scrollToContact(): void {
    this.scrollService.scrollToSection('contact');
  }
}
