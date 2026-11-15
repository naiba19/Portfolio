import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Project {
  id: number;
  name: string;
  descriptionDe: string;
  descriptionEn: string;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="portfolio">
      <div class="portfolio-container">
        <h2 class="portfolio-title">{{ translate('portfolio.title') }}</h2>
        
        <p class="portfolio-intro">
          {{ translate('portfolio.intro') }}
        </p>

        <div class="projects-list">
          <article 
            *ngFor="let project of projects; let even = even" 
            class="project"
            [class.even]="even"
          >
            <div class="project-number">{{ project.id | number: '2.0-0' }}</div>
            
            <div class="project-content">
              <div class="project-text">
                <h3 class="project-name">{{ project.name }}</h3>
                
                <p class="project-description">
                  {{ currentLanguage === 'de' ? project.descriptionDe : project.descriptionEn }}
                </p>
                
                <div class="project-tech">
                  <span *ngFor="let tech of project.technologies" class="tech-label">
                    {{ tech }}
                  </span>
                </div>

                <div class="project-actions">
                  <a *ngIf="project.github" [href]="project.github" target="_blank" rel="noopener noreferrer" class="project-link">
                    GitHub
                  </a>
                </div>
              </div>

              <div class="project-image-container" *ngIf="project.image">
                <div class="image-frame">
                  <img [src]="project.image" [alt]="project.name" loading="lazy">
                </div>
                <div class="project-arrow">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="20" cy="20" r="18"></circle>
                    <polyline points="14 20 20 26 26 20"></polyline>
                    <polyline points="20 14 20 26"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .portfolio {
      background-color: var(--color-background);
      padding: var(--space-4xl) var(--space-lg);
    }

    .portfolio-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .portfolio-title {
      font-family: var(--font-family-heading);
      font-size: var(--font-size-5xl);
      font-weight: 800;
      margin-bottom: var(--space-md);
      color: var(--color-text);
      letter-spacing: -0.02em;
    }

    .portfolio-intro {
      font-family: var(--font-family-body);
      font-size: var(--font-size-lg);
      color: var(--color-text);
      margin-bottom: var(--space-3xl);
      line-height: var(--line-height-relaxed);
    }

    .projects-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4xl);
    }

    .project {
      display: grid;
      grid-template-columns: 60px 1fr;
      gap: var(--space-2xl);
      align-items: center;
    }

    .project.even {
      grid-template-columns: 1fr 60px;
      direction: rtl;
    }

    .project.even > * {
      direction: ltr;
    }

    .project-number {
      font-family: var(--font-family-heading);
      font-size: var(--font-size-2xl);
      font-weight: 800;
      color: var(--color-text);
      text-align: center;
    }

    .project-content {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--space-2xl);
      align-items: center;
    }

    .project.even .project-content {
      grid-template-columns: auto 1fr;
    }

    .project-text {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .project-name {
      font-family: var(--font-family-heading);
      font-size: var(--font-size-3xl);
      font-weight: 800;
      color: var(--color-text);
      margin: 0;
      letter-spacing: -0.01em;
    }

    .project-description {
      font-family: var(--font-family-body);
      font-size: var(--font-size-md);
      color: var(--color-text);
      line-height: var(--line-height-relaxed);
      margin: 0;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
    }

    .tech-label {
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      color: var(--color-text);
      padding: 0.25rem 0;
    }

    .tech-label::after {
      content: ' | ';
      margin-left: var(--space-sm);
      color: var(--color-text-light);
    }

    .tech-label:last-child::after {
      content: '';
      margin: 0;
    }

    .project-actions {
      display: flex;
      gap: var(--space-md);
    }

    .project-link {
      display: inline-block;
      border: var(--border-width) solid var(--color-text);
      padding: 0.75rem 1.5rem;
      font-family: var(--font-family-body);
      font-weight: 600;
      color: var(--color-text);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .project-link:hover {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-background);
    }

    .project-image-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);
    }

    .image-frame {
      border: var(--border-width) solid var(--color-text);
      width: 280px;
      height: 200px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-surface);
    }

    .image-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .project-arrow {
      width: 60px;
      height: 60px;
      border: var(--border-width) solid var(--color-text);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .project-arrow:hover {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-background);
    }

    .project-arrow svg {
      width: 24px;
      height: 24px;
      stroke: currentColor;
    }

    @media (max-width: 1024px) {
      .portfolio-title {
        font-size: var(--font-size-4xl);
      }

      .project-name {
        font-size: var(--font-size-2xl);
      }

      .image-frame {
        width: 250px;
        height: 180px;
      }
    }

    @media (max-width: 768px) {
      .portfolio {
        padding: var(--space-2xl) var(--space-md);
      }

      .portfolio-title {
        font-size: var(--font-size-3xl);
        margin-bottom: var(--space-md);
      }

      .projects-list {
        gap: var(--space-2xl);
      }

      .project {
        grid-template-columns: 1fr;
        gap: var(--space-lg);
      }

      .project.even {
        grid-template-columns: 1fr;
        direction: ltr;
      }

      .project.even > * {
        direction: ltr;
      }

      .project-content {
        grid-template-columns: 1fr;
      }

      .project.even .project-content {
        grid-template-columns: 1fr;
      }

      .project-number {
        font-size: var(--font-size-lg);
      }

      .project-name {
        font-size: var(--font-size-xl);
      }

      .image-frame {
        width: 100%;
        height: 200px;
      }
    }
  `]
})
export class PortfolioComponent {
  currentLanguage: 'de' | 'en' = 'de';

  projects: Project[] = [
    {
      id: 1,
      name: 'Pokédex',
      descriptionDe: 'Eine Pokédex-Anwendung mit PokéAPI-Integration, dynamisches Laden von Pokémon-Daten, Filterfunktionen und responsive Design.',
      descriptionEn: 'A Pokédex application with PokéAPI integration, dynamic loading of Pokémon data, filtering features, and responsive design.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'PokéAPI'],
      image: 'assets/projects/pokedex.jpg',
      github: 'https://github.com/naiba19'
    },
    {
      id: 2,
      name: 'El Pollo Loco',
      descriptionDe: 'Ein interaktives Browser-basiertes Jump-and-Run-Spiel mit Charakteranimationen, Gegner-KI, Kollisionserkennung und Punktesystem.',
      descriptionEn: 'An interactive browser-based jump-and-run game featuring character animations, enemy AI, collision detection, and scoring system.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Object-Oriented Programming'],
      image: 'assets/projects/el-pollo-loco.jpg',
      github: 'https://github.com/naiba19'
    }
  ];

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
