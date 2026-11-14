import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="contact">
      <div class="contact-container">
        <h2>{{ translate('contact.title') }}</h2>
        
        <div class="contact-info">
          <p class="info-placeholder">[Contact information to be added]</p>
        </div>

        <form class="contact-form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Name</label>
            <input 
              id="name" 
              type="text" 
              [(ngModel)]="formData.name" 
              name="name"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              [(ngModel)]="formData.email" 
              name="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              [(ngModel)]="formData.message" 
              name="message"
              required
            ></textarea>
          </div>

          <div class="form-group checkbox">
            <input 
              id="gdpr" 
              type="checkbox" 
              [(ngModel)]="formData.gdprConsent" 
              name="gdprConsent"
              required
            />
            <label for="gdpr">I agree to the privacy policy</label>
          </div>

          <button type="submit" [disabled]="!isFormValid()">Send</button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      padding: 4rem 2rem;
      background-color: var(--color-surface);
    }

    .contact-container {
      max-width: 600px;
      margin: 0 auto;
    }

    h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      text-align: center;
      color: var(--color-text);
    }

    .contact-info {
      text-align: center;
      margin-bottom: 2rem;
    }

    .info-placeholder {
      font-style: italic;
      color: var(--color-text-light);
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.checkbox {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }

    label {
      color: var(--color-text);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .form-group.checkbox label {
      margin-bottom: 0;
    }

    input[type="text"],
    input[type="email"],
    textarea {
      padding: 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      font-size: 1rem;
      color: var(--color-text);
      background-color: var(--color-background);
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    textarea:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(31, 197, 181, 0.1);
    }

    textarea {
      resize: vertical;
      min-height: 120px;
      font-family: inherit;
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    button {
      background-color: var(--color-primary);
      color: var(--color-background);
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }

    button:disabled {
      background-color: var(--color-border);
      cursor: not-allowed;
      opacity: 0.6;
    }

    @media (max-width: 768px) {
      h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: '',
    gdprConsent: false
  };

  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  isFormValid(): boolean {
    return this.formData.name.trim() !== '' &&
           this.formData.email.trim() !== '' &&
           this.formData.message.trim() !== '' &&
           this.formData.gdprConsent;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      console.log('Form submitted:', this.formData);
      // Reset form
      this.formData = {
        name: '',
        email: '',
        message: '',
        gdprConsent: false
      };
    }
  }
}
