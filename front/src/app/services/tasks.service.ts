import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any>(this.URL + '/tasks/get');
  }
  getTasksById(id:String){
    return this.http.get<any>(this.URL + '/tasks/get/' + id);
  }
  createTask(task:{name:string}) {
    return this.http.post<any>(this.URL + '/tasks/create', task);
  }
  deleteTask(id:String){
    return this.http.get<any>(this.URL + '/tasks/delete/' + id);
  }
  updateTask(id:String){
    return this.http.get<any>(this.URL + '/tasks/update/' + id);
  }
}
