import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription, filter } from 'rxjs';
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
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    PortfolioComponent,
    ContactComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  title = 'naiba-portfolio';
  isPrivacyPage = false;
  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updatePrivacyPage(window.location.pathname);
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.updatePrivacyPage(event.urlAfterRedirects));
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private updatePrivacyPage(url: string): void {
    this.isPrivacyPage = url.split('?')[0].split('#')[0] === '/privacy';
  }
}
