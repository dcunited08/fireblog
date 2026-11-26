import { Injectable } from '@angular/core';
import { firebaseAuth } from '../firebase.config';
import { signInWithPopup, TwitterAuthProvider, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async isLoggedIn(): Promise<boolean> {
    // Wait for Firebase to restore any persisted session before reading it.
    await firebaseAuth.authStateReady();
    return !!firebaseAuth.currentUser;
  }

  async login(providerName: string): Promise<boolean> {
    if (providerName !== 'twitter') {
      return false;
    }

    try {
      await signInWithPopup(firebaseAuth, new TwitterAuthProvider());
      return this.isLoggedIn();
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    await signOut(firebaseAuth);
  }
}
