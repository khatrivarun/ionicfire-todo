import { AlertController } from '@ionic/angular';
import { AuthService } from './../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signInForm: FormGroup;
  isSubmitted: boolean;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertController: AlertController
  ) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      passwordAgain: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get errorControl() {
    return this.signInForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.signInForm.valid) {
      console.log('Not Valid');
    } else {
      if (
        this.signInForm.value.password !== this.signInForm.value.passwordAgain
      ) {
        this.alertController
          .create({
            header: 'Error while signing in',
            message: 'Passwords do not match',
            buttons: ['OKAY'],
          })
          .then((result) => result.present());
        return;
      }
      this.authService
        .signInWithEmailAndPassword(
          this.signInForm.value.email,
          this.signInForm.value.password
        )
        .then(() => {
          this.router.navigate(['home']);
        })
        .catch((error) =>
          this.alertController
            .create({
              header: 'Error while signing in',
              message: error.message,
              buttons: ['OKAY'],
            })
            .then((result) => result.present())
        );
    }
  }

  onGoogleSignButtonPressed() {
    this.authService
      .signInWithGoogle()
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch((error) =>
        this.alertController
          .create({
            header: 'Error while signing in',
            message: error.message,
            buttons: ['OKAY'],
          })
          .then((result) => result.present())
      );
  }
}
