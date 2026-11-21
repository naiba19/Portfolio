import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  constructor(
    private languageService: LanguageService,
    private scrollService: ScrollService
  ) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  scrollToAbout(): void {
    this.scrollService.scrollToSection('about');
  }
}

