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

  isLoggedIn() {
    return this.authService.loggedIn();
  }

}

