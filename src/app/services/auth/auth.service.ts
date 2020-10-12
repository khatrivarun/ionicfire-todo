import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly angularFireAuth: AngularFireAuth) {}

  public async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      await this.angularFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  public async signInWithGoogle(): Promise<void> {
    try {
      await this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }

  public async signOut(): Promise<void> {
    try {
      await this.angularFireAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
}
