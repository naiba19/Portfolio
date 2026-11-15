import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PortfolioComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    PortfolioComponent,
    ContactComponent
  ],
  template: `
    <app-header></app-header>
    <main>
      <section id="home">
        <app-hero></app-hero>
      </section>
      
      <section id="about">
        <app-about></app-about>
      </section>
      
      <section id="skills">
        <app-skills></app-skills>
      </section>
      
      <section id="portfolio">
        <app-portfolio></app-portfolio>
      </section>
      
      <section id="contact">
        <app-contact></app-contact>
      </section>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      flex: 1;
      width: 100%;
    }

    section {
      width: 100%;
    }
  `]
})
export class App {
  title = 'naiba-portfolio';
}
