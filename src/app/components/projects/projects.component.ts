import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

interface Project {
  id: number;
  name: string;
  descriptionKey: string;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      id: 1,
      name: 'Pokédex',
      descriptionKey: 'portfolio.projects.pokedex',
      technologies: ['JavaScript', 'HTML', 'CSS', 'PokéAPI'],
      image: '/projects/pokedex.png',
      github: 'https://github.com/naiba19/Pokedex',
      demo: 'https://naibaradshabov.developerakademie.net/Pokedex/index.html'
    },
    {
      id: 2,
      name: 'El Pollo Loco',
      descriptionKey: 'portfolio.projects.pollo',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Object-Oriented Programming'],
      image: '/projects/el_pollo_loco.png',
      github: 'https://github.com/naiba19/El_Pollo_Loco',
      demo: 'https://naibaradshabov.developerakademie.net/El_Pollo_Loco/El_Pollo_Loco/index.html'
    },
    {
      id: 3,
      name: 'Join',
      descriptionKey: 'portfolio.projects.join',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      image: '/projects/join.png',
      github: 'https://github.com/naiba19/Join',
      demo: ''
    }
  ];

}
