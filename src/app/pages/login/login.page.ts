import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertController: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.isSubmitted = false;
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Not Valid');
    } else {
      this.authService
        .loginWithEmailAndPassword(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .then(() => {
          this.router.navigate(['home']);
        })
        .catch((error) => {
          this.alertController
            .create({
              header: 'Error while logging in',
              message: error.message,
              buttons: ['OKAY'],
            })
            .then((result) => result.present());
        });
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
