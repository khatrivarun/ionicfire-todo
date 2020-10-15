import { User } from './../models/user.model';
import { AuthService } from './../services/auth/auth.service';
import 'firebase/auth';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const loggedInUser: User = {
            uid: user.uid,
            name: user.displayName,
          };

          this.authService.setLoggedInUser(loggedInUser);

          resolve(true);
        } else {
          resolve(false);
          this.router.navigate(['login']);
        }
      });
    });
  }
}
