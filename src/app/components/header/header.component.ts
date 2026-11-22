import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentLanguage: Language = 'en';
  menuOpen = false;

  constructor(
    private languageService: LanguageService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getLanguage();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  setLanguage(language: Language): void {
    this.languageService.setLanguage(language);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:keydown.escape')
  closeMenuOnEscape(): void {
    if (this.menuOpen) {
      this.closeMenu();
    }
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  scrollToHome(): void {
    this.closeMenu();
    this.scrollService.scrollToTop();
  }

  navigateTo(sectionId: string): void {
    this.closeMenu();
    this.scrollService.scrollToSection(sectionId);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
