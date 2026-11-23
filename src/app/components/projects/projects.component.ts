import { Component, ChangeDetectorRef } from '@angular/core';
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
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class PortfolioComponent {
  currentLanguage: 'de' | 'en' = 'en';

  projects: Project[] = [
    {
      id: 1,
      name: 'Pokédex',
      descriptionDe: 'Eine Pokédex-Anwendung mit PokéAPI-Integration, dynamisches Laden von Pokémon-Daten, Filterfunktionen und responsive Design.',
      descriptionEn: 'A Pokédex application with PokéAPI integration, dynamic loading of Pokémon data, filtering features, and responsive design.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'PokéAPI'],
      image: '/projects/pokedex.png',
      github: 'https://github.com/naiba19/Pokedex',
      demo: 'https://naibaradshabov.developerakademie.net/Pokedex/index.html'
    },
    {
      id: 2,
      name: 'El Pollo Loco',
      descriptionDe: 'Ein interaktives Browser-basiertes Jump-and-Run-Spiel mit Charakteranimationen, Gegner-KI, Kollisionserkennung und Punktesystem.',
      descriptionEn: 'An interactive browser-based jump-and-run game featuring character animations, enemy AI, collision detection, and scoring system.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Object-Oriented Programming'],
      image: '/projects/el_pollo_loco.png',
      github: 'https://github.com/naiba19/El_Pollo_Loco',
      demo: 'https://naibaradshabov.developerakademie.net/El_Pollo_Loco/El_Pollo_Loco/index.html'
    },
    {
      id: 3,
      name: 'Join',
      descriptionDe: 'Ein Kanban-gestütztes Projektmanagement-Tool mit Aufgabenverwaltung, Benutzerzuweisung und übersichtlichen Statusansichten.',
      descriptionEn: 'A Kanban-based project management tool with task management, user assignment, and clear status views.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      image: '/projects/join.png',
      github: 'https://github.com/naiba19/Join',
      demo: ''
    }
  ];

  constructor(
    private languageService: LanguageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.currentLanguage = languageService.getLanguage();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      this.changeDetectorRef.markForCheck();
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
