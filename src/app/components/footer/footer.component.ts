import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(
    private languageService: LanguageService,
    private scrollService: ScrollService
  ) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }

  scrollToContact(): void {
    this.scrollService.scrollToSection('contact');
  }
}
