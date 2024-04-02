import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor( public authService: AuthService ) { }

  sideNavStatus: boolean = false;

  toggleSideNav() {
    this.sideNavStatus = !this.sideNavStatus;
  }

  tokenIsExpired() {
    return this.authService.tokenIsExpired();
  }

  isLogedIn() {
    return this.authService.loggedIn();
  }

}

