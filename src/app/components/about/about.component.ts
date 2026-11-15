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
        <h2 class="about-title">{{ translate('about.title') }}</h2>
        
        <div class="about-content">
          <div class="about-text">
            <p class="about-intro">
              I'm a full-stack developer passionate about creating clean, functional, and user-centered web applications. 
              With a focus on modern technologies and best practices, I transform ideas into interactive digital experiences.
            </p>
            
            <p class="about-details">
              I work with technologies like Angular, TypeScript, JavaScript, and REST APIs to build scalable applications. 
              My approach combines analytical thinking, creative problem-solving, and attention to detail.
            </p>

            <div class="about-info">
              <p><strong>📍 Location:</strong> Hagen, Germany</p>
              <p><strong>🔄 Status:</strong> Open to remote work and collaboration</p>
            </div>
          </div>

          <div class="about-image-frame">
            <div class="image-placeholder">
              <img src="assets/portrait.jpg" alt="Naiba Radshabov" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      background-color: var(--color-background);
      padding: var(--space-4xl) var(--space-lg);
      min-height: auto;
    }

    .about-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .about-title {
      font-family: var(--font-family-heading);
      font-size: var(--font-size-5xl);
      font-weight: 800;
      margin-bottom: var(--space-3xl);
      color: var(--color-text);
      letter-spacing: -0.02em;
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4xl);
      align-items: center;
    }

    .about-text {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .about-intro,
    .about-details {
      font-family: var(--font-family-body);
      font-size: var(--font-size-lg);
      line-height: var(--line-height-relaxed);
      color: var(--color-text);
      margin: 0;
    }

    .about-info {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      padding: var(--space-lg);
      background-color: var(--color-surface);
      border-left: var(--border-width) solid var(--color-primary);
    }

    .about-info p {
      font-family: var(--font-family-body);
      font-size: var(--font-size-md);
      margin: 0;
      color: var(--color-text);
    }

    .about-image-frame {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .image-placeholder {
      width: 100%;
      aspect-ratio: 3/4;
      border: var(--border-width) solid var(--color-text);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-surface);
    }

    .image-placeholder img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-placeholder::before {
      content: '';
      position: absolute;
      inset: var(--space-lg);
      border: var(--border-width) solid var(--color-text);
      pointer-events: none;
      z-index: 1;
    }

    @media (max-width: 1024px) {
      .about-title {
        font-size: var(--font-size-4xl);
      }

      .about-content {
        gap: var(--space-2xl);
      }
    }

    @media (max-width: 768px) {
      .about {
        padding: var(--space-2xl) var(--space-md);
      }

      .about-title {
        font-size: var(--font-size-3xl);
        margin-bottom: var(--space-2xl);
      }

      .about-content {
        grid-template-columns: 1fr;
        gap: var(--space-2xl);
      }

      .about-intro,
      .about-details {
        font-size: var(--font-size-md);
      }

      .image-placeholder {
        aspect-ratio: auto;
        height: 400px;
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
