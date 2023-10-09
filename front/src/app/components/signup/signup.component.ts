import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public authService: AuthService, private router:Router) { }

  user = {
    name: '',
    password: '',
    rol: ''
  }

  signUp() {
    this.authService.signUp(this.user)
      .subscribe(
        res => {          
          this.router.navigate(['/tasks']);
        },
        err => console.log(err)
      )
  }

}
