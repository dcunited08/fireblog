import { Component, OnInit } from '@angular/core';
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
  isLoggedIn = false;

  constructor(public authService: AuthService) {}

  async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn();
  }

  async login() {
    const success = await this.authService.login('twitter');
    if (success) {
      this.isLoggedIn = true;
    }
  }

  async logout() {
    await this.authService.logout();
    this.isLoggedIn = false;
  }
}
