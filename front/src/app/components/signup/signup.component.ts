import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public authService: AuthService, private router:Router) { }

  errorMessage = '';
  successMessage = '';

  signUpForm = new FormGroup({
    'name' : new FormControl('', Validators.required),
    'password' : new FormControl('', Validators.required),
    'rol' : new FormControl('', Validators.required)
  });

  signUp() {
    let data = this.signUpForm.value;
    if (!data.name) data.name = '';
    if (!data.password) data.password = '';
    if (!data.rol) data.rol = '';
    let newData = { name: data.name, password: data.password, rol: data.rol};

    this.authService.signUp(newData)
      .subscribe(
        (res) => {
          this.successMessage = res.message;      
          this.signUpForm.reset();
        },
        (err) => {
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Error desconocido al registar usuario.';
          }
        }
      )
  }

}
