import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="contact dark-section">
      <img class="contact-arrow" src="/arrows/right.svg" alt="" aria-hidden="true">
      <div class="contact-container">
        <div class="contact-header">
          <h2 class="contact-title">{{ translate('contact.title') }}</h2>
          <p class="contact-subtitle">
            {{ translate('contact.subtitle') }}
          </p>
        </div>

        <form class="contact-form" [formGroup]="contactForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <input 
              type="text" 
              placeholder="Your name"
              formControlName="name"
              class="form-input"
              (blur)="markAsTouched('name')"
            />
            <div *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched" class="error-state">
              {{ translate('contact.error.name') }}
            </div>
          </div>

          <div class="form-group">
            <input 
              type="email" 
              placeholder="Your email"
              formControlName="email"
              class="form-input"
              (blur)="markAsTouched('email')"
            />
            <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched" class="error-state">
              {{ translate('contact.error.email') }}
            </div>
          </div>

          <div class="form-group">
            <textarea 
              placeholder="Your message"
              formControlName="message"
              class="form-input form-textarea"
              (blur)="markAsTouched('message')"
            ></textarea>
            <div *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched" class="error-state">
              {{ translate('contact.error.message') }}
            </div>
          </div>

          <div class="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="privacy"
              formControlName="privacyConsent"
              (blur)="markAsTouched('privacyConsent')"
            />
            <label for="privacy">
              {{ translate('contact.privacy.accept') }}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" class="privacy-link">
                {{ translate('contact.privacy.policy') }}
              </a>
            </label>
          </div>

          <button 
            type="submit" 
            class="contact-button"
            [disabled]="!contactForm.valid || submitButtonText === 'Sending...'"
          >
            {{ submitButtonText }}
          </button>

          <div *ngIf="submitSuccess" class="success-message">
            {{ translate('contact.success') }}
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      position: relative;
      background: linear-gradient(
        168deg,
        var(--color-background) 0,
        var(--color-background) 170px,
        var(--color-dark-bg) 171px,
        var(--color-dark-bg) 100%
      );
      color: var(--color-text-dark);
      padding: 220px var(--space-lg) var(--space-4xl);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .contact-arrow {
      position: absolute;
      top: 3rem;
      right: 3.5rem;
      width: 235px;
      height: 235px;
      pointer-events: none;
    }

    .contact-container {
      max-width: 600px;
      width: 100%;
    }

    .contact-header {
      margin-bottom: var(--space-3xl);
      text-align: center;
    }

    .contact-title {
      font-family: var(--font-family-heading);
      font-size: var(--font-size-5xl);
      font-weight: 800;
      color: var(--color-text-dark);
      margin: 0 0 var(--space-md) 0;
      letter-spacing: -0.02em;
    }

    .contact-subtitle {
      font-family: var(--font-family-body);
      font-size: var(--font-size-lg);
      color: var(--color-primary);
      margin: 0;
      line-height: var(--line-height-relaxed);
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .form-input {
      background-color: transparent;
      border: none;
      border-bottom: var(--border-width) solid var(--color-text-dark);
      padding: var(--space-sm) 0;
      font-family: var(--font-family-body);
      font-size: var(--font-size-md);
      color: var(--color-text-dark);
      transition: all 0.3s ease;
    }

    .form-input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    .form-input:focus {
      outline: none;
      border-bottom-color: var(--color-primary);
      box-shadow: 0 2px 0 0 var(--color-primary);
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
      border: var(--border-width) solid var(--color-text-dark);
      padding: var(--space-md);
      border-radius: 0;
    }

    .form-textarea:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(255, 159, 64, 0.2);
    }

    .error-state {
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      color: #FF6B6B;
      margin-top: -var(--space-sm);
    }

    .checkbox-group {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: var(--space-md);
      margin-top: var(--space-md);
    }

    .checkbox-group input {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-top: 2px;
      flex-shrink: 0;
    }

    .checkbox-group label {
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      color: var(--color-text-dark);
      cursor: pointer;
      line-height: var(--line-height-relaxed);
    }

    .privacy-link {
      color: var(--color-primary);
      text-decoration: underline;
      transition: color 0.3s ease;
    }

    .privacy-link:hover {
      color: var(--color-primary-light);
    }

    .contact-button {
      background-color: transparent;
      border: var(--border-width) solid var(--color-text-dark);
      color: var(--color-text-dark);
      padding: var(--space-md) var(--space-lg);
      font-family: var(--font-family-body);
      font-size: var(--font-size-md);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: var(--space-md);
    }

    .contact-button:hover:not(:disabled) {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-dark-bg);
    }

    .contact-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .success-message {
      background-color: rgba(76, 175, 80, 0.2);
      border: var(--border-width) solid #4CAF50;
      color: #4CAF50;
      padding: var(--space-md);
      border-radius: var(--border-radius-sm);
      font-family: var(--font-family-body);
      font-size: var(--font-size-sm);
      margin-top: var(--space-md);
      text-align: center;
    }

    @media (max-width: 768px) {
      .contact {
        padding: var(--space-2xl) var(--space-md);
      }

      .contact-title {
        font-size: var(--font-size-3xl);
      }

      .contact-subtitle {
        font-size: var(--font-size-md);
      }

      .form-input {
        font-size: var(--font-size-sm);
      }

      .checkbox-group {
        gap: var(--space-sm);
      }
    }
  `]
})
export class ContactComponent {
  submitButtonText = 'Send message';
  submitSuccess = false;
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacyConsent: [false, Validators.requiredTrue]
    });

    this.languageService.currentLanguage$.subscribe(() => {
      this.submitButtonText = this.translate('contact.button');
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  markAsTouched(fieldName: string): void {
    const field = this.contactForm.get(fieldName);
    if (field) {
      field.markAsTouched();
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitButtonText = 'Sending...';
      console.log('Form submitted:', this.contactForm.value);
      
      setTimeout(() => {
        this.submitSuccess = true;
        this.contactForm.reset();
        this.submitButtonText = this.translate('contact.button');
        
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      }, 500);
    }
  }
}
