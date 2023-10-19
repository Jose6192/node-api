import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(public authService: AuthService, private router:Router) { }

  errorMessage = '';

  signInForm = new FormGroup({
    'name' : new FormControl('', Validators.required),
    'password' : new FormControl('', Validators.required)
  });

  signIn() {
    let data = this.signInForm.value;
    if (!data.name) data.name = '';
    if (!data.password) data.password = '';
    let newData = { name: data.name, password: data.password };
  
    this.authService.signIn(newData)
      .subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/tasks']);
        },
        (err) => {
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Error desconocido al iniciar sesión.';
          }
        }
      );
  }

}
