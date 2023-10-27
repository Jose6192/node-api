import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:3000';

  getUsers() {
    return this.http.get<any>(this.URL + '/users/get');
  }

  updateUser(id:string, update: FormData) {
    return this.http.patch<any>(this.URL + '/users/update/' + id , update);
  }

  deleteUser(id:string) {
    return this.http.delete<any>(this.URL + '/users/delete/' + id);
  }

}
