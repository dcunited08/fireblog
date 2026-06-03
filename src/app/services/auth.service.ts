import { Injectable } from '@angular/core';
import { firebaseAuth } from '../firebase.config';
import { signInWithPopup, TwitterAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPromise: Promise<User | null>;

  constructor() {
    this.userPromise = new Promise((resolve) => {
      onAuthStateChanged(firebaseAuth, (user) => {
        resolve(user);
      });
    });
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.userPromise;
    return !!user;
  }

  async login(providerName: string): Promise<boolean> {
    let provider;
    if (providerName === 'twitter') {
      provider = new TwitterAuthProvider();
    } else {
      return false;
    }

    try {
      await signInWithPopup(firebaseAuth, provider);
      // Re-init the promise to get the latest state immediately
      this.userPromise = new Promise((resolve) => {
        onAuthStateChanged(firebaseAuth, (user) => {
          resolve(user);
        });
      });
      return await this.isLoggedIn();
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    await signOut(firebaseAuth);
    this.userPromise = new Promise((resolve) => {
      onAuthStateChanged(firebaseAuth, (user) => {
        resolve(user);
      });
    });
  }
}
