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
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
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
