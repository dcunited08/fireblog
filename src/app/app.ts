import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  // A signal so the navbar re-renders when the async auth check resolves (the app is zoneless).
  readonly isLoggedIn = signal(false);

  constructor(public authService: AuthService) {}

  async ngOnInit() {
    this.isLoggedIn.set(await this.authService.isLoggedIn());
  }

  async login() {
    const success = await this.authService.login('twitter');
    if (success) {
      this.isLoggedIn.set(true);
    }
  }

  async logout() {
    await this.authService.logout();
    this.isLoggedIn.set(false);
  }
}
