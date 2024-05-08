import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { }

  private URL = 'http://localhost:3000';

  signUp(user: { name: string; password: string; rol: string; }) {
    return this.http.post<any>(this.URL + '/users/signup', user);
  }

  signIn(user: { name: string; password: string; }) {
    return this.http.post<any>(this.URL + '/users/signin', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  tokenIsExpired() {
    const token = localStorage.getItem('token');
    if(token){
      return this.jwtHelper.isTokenExpired(token);
    }else{
      return console.log('error al obtener el token');
    }
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getDataUser(){
    const token = localStorage.getItem('token')
    if(token){
      return this.jwtHelper.decodeToken(token);
    }else{
      return console.log('error al obtener los datos del usuario');
    } 
  }
  
}
