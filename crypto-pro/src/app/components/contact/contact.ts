import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  isSending: boolean = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      from_name: ['', Validators.required],
      from_email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  sendEmail(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSending = true;

    emailjs.send(
      'service_c1702yc',
      'template_2h3h8pn',
      this.contactForm.value,
      '-zTCou1K3GXzj3c3n'
    ).then(
      () => {
        alert('¡Mensaje enviado!');
        this.contactForm.reset();
        this.isSending = false;
      },
      (error) => {
        alert('Error al enviar');
        this.isSending = false;
      }
    );
  }
}
