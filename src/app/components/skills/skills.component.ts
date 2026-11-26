import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollService } from '../../services/scroll.service';

interface Skill {
  icon: string;
  iconColored?: string;
  label: string;
  category: 'frontend' | 'backend' | 'devops';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  constructor(private scrollService: ScrollService) {}

  animatingIcons = new Set<number>();

  skills: Skill[] = [
    { icon: '/skills/angular.svg', iconColored: '/skills/skills_alt/angular.png', label: 'Angular', category: 'frontend' },
    { icon: '/skills/typescript.svg', iconColored: '/skills/skills_alt/typescript.png', label: 'TypeScript', category: 'frontend' },
    { icon: '/skills/javascript.svg', iconColored: '/skills/skills_alt/javascript.png', label: 'JavaScript', category: 'frontend' },
    { icon: '/skills/html.svg', iconColored: '/skills/skills_alt/html.png', label: 'HTML', category: 'frontend' },
    { icon: '/skills/css.svg', iconColored: '/skills/skills_alt/css.png', label: 'CSS', category: 'frontend' },
    { icon: '/skills/supabase.svg', iconColored: '/skills/skills_alt/supabase.png', label: 'Supabase', category: 'backend' },
    { icon: '/skills/git.svg', iconColored: '/skills/skills_alt/git.png', label: 'Git', category: 'devops' },
    { icon: '/skills/scrum.svg', iconColored: '/skills/skills_alt/scrum.png', label: 'Scrum', category: 'devops' },
    { icon: '/skills/rest-api.svg', iconColored: '/skills/skills_alt/rest-api.png', label: 'REST-API', category: 'backend' },
    { icon: '/skills/material-design-icon.svg', label: 'Material Design', category: 'frontend' },
  ];

  onIconMouseEnter(index: number): void {
    if (!this.animatingIcons.has(index)) {
      this.animatingIcons.add(index);
    }
  }

  onIconMouseLeave(index: number): void {
    this.animatingIcons.delete(index);
  }

  isAnimating(index: number): boolean {
    return this.animatingIcons.has(index);
  }

  scrollToPortfolio(): void {
    this.scrollService.scrollToSection('portfolio');
  }
}
