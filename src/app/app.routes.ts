import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PortfolioComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
    data: { title: 'Naiba Radshabov - Full Stack Developer' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About Me' }
  },
  {
    path: 'skills',
    component: SkillsComponent,
    data: { title: 'Skills' }
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    data: { title: 'Portfolio' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contact' }
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: { title: 'Privacy Policy' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
