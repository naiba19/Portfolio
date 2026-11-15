import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Skill {
  icon: string;
  label: string;
  category: 'frontend' | 'backend' | 'devops';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="skills">
      <div class="skills-container">
        <h2 class="skills-title">{{ translate('skills.title') }}</h2>
        
        <div class="skills-frame">
          <div class="skills-grid">
            <div *ngFor="let skill of skills" class="skill-item">
              <div class="skill-icon">{{ skill.icon }}</div>
              <p class="skill-label">{{ skill.label }}</p>
            </div>
          </div>

          <div class="skills-message">
            <p>{{ translate('skills.message') }}</p>
            <a [href]="'mailto:naiba.radshabov@outlook.de'" class="contact-link">
              {{ translate('skills.contact') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills {
      background-color: var(--color-background);
      padding: var(--space-4xl) var(--space-lg);
    }

    .skills-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .skills-title {
      font-family: var(--font-family-heading);
      font-size: var(--font-size-5xl);
      font-weight: 800;
      text-align: center;
      margin-bottom: var(--space-3xl);
      color: var(--color-text);
      letter-spacing: -0.02em;
    }

    .skills-frame {
      border: var(--border-width) solid var(--color-text);
      padding: var(--space-3xl);
      background-color: var(--color-background);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: var(--space-2xl);
      margin-bottom: var(--space-3xl);
    }

    .skill-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      text-align: center;
    }

    .skill-icon {
      font-size: var(--font-size-4xl);
      line-height: 1;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .skill-label {
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      font-weight: 500;
      color: var(--color-text);
      margin: 0;
    }

    .skills-message {
      border-top: var(--border-width) solid var(--color-border);
      padding-top: var(--space-2xl);
      text-align: center;
    }

    .skills-message p {
      font-family: var(--font-family-body);
      font-size: var(--font-size-md);
      color: var(--color-text);
      margin-bottom: var(--space-md);
    }

    .contact-link {
      display: inline-block;
      color: var(--color-primary);
      font-weight: 600;
      border-bottom: 2px solid var(--color-primary);
      padding-bottom: 2px;
      transition: all 0.3s ease;
    }

    .contact-link:hover {
      color: var(--color-primary-dark);
      border-bottom-color: var(--color-primary-dark);
    }

    @media (max-width: 1024px) {
      .skills-title {
        font-size: var(--font-size-4xl);
      }

      .skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .skills {
        padding: var(--space-2xl) var(--space-md);
      }

      .skills-title {
        font-size: var(--font-size-3xl);
        margin-bottom: var(--space-2xl);
      }

      .skills-frame {
        padding: var(--space-2xl);
      }

      .skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
        gap: var(--space-lg);
        margin-bottom: var(--space-2xl);
      }

      .skill-icon {
        font-size: var(--font-size-3xl);
      }
    }
  `]
})
export class SkillsComponent {
  skills: Skill[] = [
    { icon: '⚡', label: 'Angular', category: 'frontend' },
    { icon: '🔹', label: 'TypeScript', category: 'frontend' },
    { icon: '📝', label: 'JavaScript', category: 'frontend' },
    { icon: '🎨', label: 'HTML', category: 'frontend' },
    { icon: '🎨', label: 'CSS', category: 'frontend' },
    { icon: '⚡', label: 'Supabase', category: 'backend' },
    { icon: '🔧', label: 'Git', category: 'devops' },
    { icon: '🔄', label: 'Scrum', category: 'devops' },
    { icon: '🖼️', label: 'Material Design', category: 'frontend' },
    { icon: '🔌', label: 'REST API', category: 'backend' },
  ];

  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
