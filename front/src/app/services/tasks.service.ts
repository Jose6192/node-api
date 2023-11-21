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
  createTask(task: any) {
    return this.http.post<any>(this.URL + '/tasks/create', task);
  }
  deleteTask(id:String){
    return this.http.delete<any>(this.URL + '/tasks/delete/' + id);
  }
  transferTask(id: string, updates: { department: string }) {
    return this.http.patch<any>(this.URL + '/tasks/update/' + id, updates);
  }
  compleateTask(id: string, updates: { status: string, completedTime: Date }) {
    return this.http.patch<any>(this.URL + '/tasks/update/' + id, updates);
  }
}
