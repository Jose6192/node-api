import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  errorMessage = '';
  successMessage = '';
  users: any = [];
  updateUserForm!: FormGroup;
  selectedUser: any;

  constructor(public authService: AuthService, public userService:UserService, router:Router, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.updateUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.getUsers();
  }

  signUpForm = new FormGroup({
    'name' : new FormControl('', Validators.required),
    'password' : new FormControl('', Validators.required),
    'rol' : new FormControl('', Validators.required)
  });

  getUsers() {
    this.userService.getUsers()
      .subscribe( res => this.users = res)
    this.cdr.detectChanges();
  }


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
          this.getUsers();
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

  updateUser(){
    const formData = new FormData();
    formData.append('name', this.updateUserForm.get('name')?.value);
    formData.append('password', this.updateUserForm.get('password')?.value);
    formData.append('rol', this.updateUserForm.get('rol')?.value);
    
    const index = this.selectedUser;
    const userId = this.users[index]._id;

    this.userService.updateUser(userId ,formData)
      .subscribe(
        (res) => {
          this.successMessage = res.message;
          this.getUsers();
          /* this.users[index].name = this.updateUserForm.get('name')?.value;
          this.users[index].password = this.updateUserForm.get('password')?.value;
          this.users[index].rol = this.updateUserForm.get('rol')?.value;   */
        },
        (err) => {
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Error desconocido al actualizar usuario.';
          }
        }
      )
  }

  deleteUser(index: any){
    const userId = this.users[index]._id;
    let answer = confirm('¿Estas seguro de eliminar este usuario?')
    if (!answer) return;
    this.userService.deleteUser(userId)
      .subscribe( (res) => {
        if (res.status != 200) {
          console.log('usuario eliminado');
          this.users.splice(index, 1);
        }
        alert('Usuario eliminado');
      },
      (err) => {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error desconocido al eliminar usuario.';
        }
      })

  }
/* EDITAR ingresa los datos del usuario selecionado al formulario updateUserForm */
  selectUser(index: any){
    this.selectedUser = index;
    this.updateUserForm.patchValue({
      name: this.users[index].name,
      password: this.users[index].password,
      rol: this.users[index].rol
    });
  }
}
