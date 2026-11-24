import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  submitButtonText = 'Send message';
  submitSuccess = false;
  submitError = false;
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacyConsent: [false, Validators.requiredTrue],
      website: ['']
    });

    this.submitButtonText = this.translate('contact.button');
    this.languageService.currentLanguage$.subscribe(() => {
      this.submitButtonText = this.translate('contact.button');
      this.changeDetectorRef.markForCheck();
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
    if (!this.contactForm.valid) {
      return;
    }

    this.submitButtonText = this.translate('contact.sending');
    const payload = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
      website: this.contactForm.value.website
    };

    fetch('/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async response => {
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Contact request failed');
        }
        this.submitSuccess = true;
        this.contactForm.reset();
      })
      .catch(() => {
        this.submitSuccess = false;
        this.submitError = true;
      })
      .finally(() => {
        this.submitButtonText = this.translate('contact.button');
        this.changeDetectorRef.markForCheck();
        setTimeout(() => {
          this.submitSuccess = false;
          this.submitError = false;
          this.changeDetectorRef.markForCheck();
        }, 5000);
      });
  }
}
