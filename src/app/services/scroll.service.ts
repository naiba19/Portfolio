import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor() {}

  scrollToSection(sectionId: string): void {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80; // Approximate header height
        const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
