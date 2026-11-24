import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  submitButtonText = 'Send message';
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      privacyConsent: [false, Validators.requiredTrue],
      website: ['']
    });

    this.submitButtonText = this.translate.instant('contact.button');
    this.translate.onLangChange.subscribe(() => {
      this.submitButtonText = this.isSubmitting
        ? this.translate.instant('contact.sending')
        : this.translate.instant('contact.button');
      this.changeDetectorRef.markForCheck();
    });
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

    this.isSubmitting = true;
    this.submitButtonText = this.translate.instant('contact.sending');
    const payload = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
      website: this.contactForm.value.website
    };

    const isLocalDevelopment =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';
    const contactEndpoint = isLocalDevelopment
      ? 'http://localhost:8000/contact.php'
      : '/contact.php';

    fetch(contactEndpoint, {
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
        this.isSubmitting = false;
        this.submitButtonText = this.translate.instant('contact.button');
        this.changeDetectorRef.markForCheck();
        setTimeout(() => {
          this.submitSuccess = false;
          this.submitError = false;
          this.changeDetectorRef.markForCheck();
        }, 5000);
      });
  }
}
