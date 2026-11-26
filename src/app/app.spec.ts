import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { AuthService } from './services/auth.service';

describe('App', () => {
  let loggedIn: boolean;

  beforeEach(async () => {
    loggedIn = false;
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { isLoggedIn: async () => loggedIn, login: async () => true, logout: async () => {} } },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the brand and a login link when logged out', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.navbar-brand')?.textContent).toContain('JDanielCook');
    expect(el.textContent).toContain('Login with Twitter');
    expect(el.textContent).not.toContain('Admin');
  });

  it('should show Admin and Logout when logged in', async () => {
    loggedIn = true;
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Admin');
    expect(el.textContent).toContain('Logout');
  });
});
