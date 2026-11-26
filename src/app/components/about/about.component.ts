import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(
    private scrollService: ScrollService
  ) {}

  scrollToContact(): void {
    this.scrollService.scrollToSection('contact');
  }

  scrollToSkills(): void {
    this.scrollService.scrollToSection('skills');
  }
}
