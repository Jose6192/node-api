import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

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

  getDataUser(id:String){
    return this.http.get<any>(this.URL + '/users/get/' + id);
  }


  
}
