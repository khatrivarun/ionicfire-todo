import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;

  constructor(private readonly angularFireAuth: AngularFireAuth) {
    this.user = null;
  }

  private async setUser(): Promise<void> {
    const firebaseUser = await this.angularFireAuth.currentUser;

    if (firebaseUser) {
      this.user = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
      };
    }
  }

  get loggedInUser() {
    return this.user;
  }

  setLoggedInUser(user: User) {
    this.user = user;
  }

  public async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      await this.angularFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      await this.setUser();
    } catch (error) {
      const code = error.code;

      if (code === 'auth/email-already-in-use') {
        throw new Error(
          'Account already exists with the provided email address'
        );
      } else if (code === 'auth/weak-password') {
        throw new Error('Please retry with a stronger password');
      } else if (code === 'auth/invalid-email') {
        throw new Error('Invalid Email Address Provided');
      }
    }
  }

  public async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      await this.angularFireAuth.signInWithEmailAndPassword(email, password);

      await this.setUser();
    } catch (error) {
      const code = error.code;

      if (code === 'auth/user-not-found') {
        throw new Error('User with that email address does not exist');
      } else if (code === 'auth/user-disabled') {
        throw new Error('User with that email address has been disabled');
      } else if (code === 'auth/wrong-password') {
        throw new Error('Incorrect Password');
      } else if (code === 'auth/invalid-email') {
        throw new Error('Invalid Email Address Provided');
      }
    }
  }

  public async signInWithGoogle(): Promise<void> {
    try {
      await this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());

      await this.setUser();
    } catch (error) {
      const code = error.code;

      if (code === 'auth/account-exists-with-different-credential') {
        throw new Error(
          'User with that Google Account exists with a different provider. Please try logging with your email and password'
        );
      } else if (code === 'auth/cancelled-popup-request') {
        throw new Error(
          'Something went wrong with trying to open the popup for logging/signing in'
        );
      } else if (code === 'auth/operation-not-supported-in-this-environment') {
        throw new Error('Your device is not supported');
      } else if (code === 'auth/popup-blocked') {
        throw new Error('Popup blocked by device');
      } else if (code === 'auth/popup-closed-by-user') {
        throw new Error('Popup closed by user');
      }
    }
  }

  public async signOut(): Promise<void> {
    try {
      await this.angularFireAuth.signOut();

      this.user = null;
    } catch (error) {
      console.log(error);
    }
  }
}
