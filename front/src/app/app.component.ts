import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isDarkTheme?: boolean;
  navCollapsed: boolean = false;



  constructor(public authService: AuthService) {}

  ngOnInit(){
    //aplica el tema
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

  logOut() {
    this.authService.logOut();
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }
  applyTheme() {
    const theme = this.isDarkTheme ? 'dark' : 'light';
    const body = document.body as HTMLElement;
    body.setAttribute('data-bs-theme', theme);
  }
  toggleNav() {
    this.navCollapsed = !this.navCollapsed;
  };

  tokenIsExpired() {
    return this.authService.tokenIsExpired();
  }

  isLogedIn() {
    return this.authService.loggedIn();
  }

}

