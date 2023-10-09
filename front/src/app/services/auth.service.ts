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

  signUp(user: { name: string; password: string; rol: String; }) {
    return this.http.post<any>(this.URL + '/users/signup', user);
  }

  signIn(user: { name: string; password: string; }) {
    return this.http.post<any>(this.URL + '/users/signin', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
 
/* CAMBIAR IS ADMMIN O poner funcion GET ROLE ????*/

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    return !!token && this.jwtHelper.decodeToken(token).role === 'admin';
  }

  getDataUser(id:String){
    return this.http.get<any>(this.URL + '/users/get/' + id);
  }


  
}
