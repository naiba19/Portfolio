import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Project {
  id: string;
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
        <h2>{{ translate('portfolio.title') }}</h2>
        
        <div class="projects-grid">
          <article *ngFor="let project of projects" class="project-card">
            <div class="project-header">
              <h3>{{ project.name }}</h3>
            </div>
            
            <p class="project-description">
              {{ currentLanguage === 'de' ? project.descriptionDe : project.descriptionEn }}
            </p>
            
            <div class="technologies">
              <span *ngFor="let tech of project.technologies" class="tech-tag">
                {{ tech }}
              </span>
            </div>

            <div class="project-links">
              <a *ngIf="project.github" [href]="project.github" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a *ngIf="project.demo" [href]="project.demo" target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .portfolio {
      padding: 4rem 2rem;
      background-color: var(--color-background);
    }

    .portfolio-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      text-align: center;
      color: var(--color-text);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .project-card {
      background-color: var(--color-surface);
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .project-header h3 {
      font-size: 1.5rem;
      color: var(--color-primary);
      margin: 0 0 1rem 0;
    }

    .project-description {
      color: var(--color-text-light);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-tag {
      background-color: var(--color-primary);
      color: var(--color-background);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .project-links {
      display: flex;
      gap: 1rem;
    }

    .project-links a {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .project-links a:hover {
      color: var(--color-primary-dark);
    }

    @media (max-width: 768px) {
      h2 {
        font-size: 2rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PortfolioComponent {
  currentLanguage: 'de' | 'en' = 'de';

  projects: Project[] = [
    {
      id: 'el-pollo-loco',
      name: 'El Pollo Loco',
      descriptionDe: 'Ein interaktives JavaScript-Spiel mit OOP-Prinzipien, Kollisionserkennung und komplexer Spiellogik.',
      descriptionEn: 'An interactive JavaScript game featuring OOP principles, collision detection, and complex game logic.',
      technologies: ['JavaScript', 'OOP', 'Game Logic', 'Collision Detection'],
      github: 'https://github.com/naiba19'
    },
    {
      id: 'pokedex',
      name: 'Pokédex',
      descriptionDe: 'Eine Pokédex-Anwendung mit REST API Integration, Abrufen von Daten, Caching und Lazy Loading für optimale Performance.',
      descriptionEn: 'A Pokédex application featuring REST API integration, data fetching, caching, and lazy loading for optimal performance.',
      technologies: ['JavaScript', 'REST API', 'Fetch', 'Caching', 'Lazy Loading'],
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
