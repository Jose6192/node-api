import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public authService: AuthService ) { }

  getRole(){
    const data = this.authService.getDataUser();
    return data.role;
  }

}

