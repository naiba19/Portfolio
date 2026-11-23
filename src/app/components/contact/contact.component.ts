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
      privacyConsent: [false, Validators.requiredTrue]
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
    if (this.contactForm.valid) {
      this.submitButtonText = this.translate('contact.sending');
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
