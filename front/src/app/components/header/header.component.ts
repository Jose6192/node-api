import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public authService: AuthService) {
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

  isDarkTheme: boolean;

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
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

}
