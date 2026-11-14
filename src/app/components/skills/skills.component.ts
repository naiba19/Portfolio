import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Skill {
  category: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="skills">
      <div class="skills-container">
        <h2>{{ translate('skills.title') }}</h2>
        
        <div class="skills-grid">
          <div *ngFor="let skillGroup of skillGroups" class="skill-category">
            <h3>{{ skillGroup.category }}</h3>
            <ul>
              <li *ngFor="let skill of skillGroup.skills">{{ skill }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills {
      padding: 4rem 2rem;
      background-color: var(--color-background);
    }

    .skills-container {
      max-width: 1000px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2.5rem;
      margin-bottom: 3rem;
      text-align: center;
      color: var(--color-text);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .skill-category {
      background-color: var(--color-surface);
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .skill-category h3 {
      color: var(--color-primary);
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }

    .skill-category ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .skill-category li {
      color: var(--color-text-light);
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--color-border);
    }

    .skill-category li:last-child {
      border-bottom: none;
    }

    @media (max-width: 768px) {
      h2 {
        font-size: 2rem;
      }

      .skills-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SkillsComponent {
  skillGroups: Skill[] = [
    {
      category: 'Frontend',
      skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'REST APIs']
    },
    {
      category: 'Tools & Others',
      skills: ['Git', 'npm', 'Responsive Design', 'OOP']
    }
  ];

  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
