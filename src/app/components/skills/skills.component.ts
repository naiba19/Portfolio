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
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skills: Skill[] = [
    { icon: '/skills/angular.svg', label: 'Angular', category: 'frontend' },
    { icon: '/skills/typescript.svg', label: 'TypeScript', category: 'frontend' },
    { icon: '/skills/javascript.svg', label: 'JavaScript', category: 'frontend' },
    { icon: '/skills/html.svg', label: 'HTML', category: 'frontend' },
    { icon: '/skills/css.svg', label: 'CSS', category: 'frontend' },
    { icon: '/skills/supabase.svg', label: 'Supabase', category: 'backend' },
    { icon: '/skills/git.svg', label: 'Git', category: 'devops' },
    { icon: '/skills/scrum.svg', label: 'Scrum', category: 'devops' },
    { icon: '/skills/material-design.svg', label: 'Material Design', category: 'frontend' },
    { icon: '/skills/rest-api.svg', label: 'REST API', category: 'backend' },
  ];

  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
