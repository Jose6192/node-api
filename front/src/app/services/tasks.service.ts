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
  compleateTask(id: string, updates: FormData) {
    return this.http.patch<any>(this.URL + '/tasks/upload/' + id, updates);
  }
  changePriority(id: string, updates: { priority: string }) {
    return this.http.patch<any>(this.URL + '/tasks/update/' + id, updates);
  }
  getActiveTasksNumber() {
    return this.http.get<any>(this.URL + '/tasks/active');
  }
  getResolvedTasksNumber() {
    return this.http.get<any>(this.URL + '/tasks/resolved');
  }
  getTopUser() {
    return this.http.get<any>(this.URL + '/tasks/top');
  }
  getReportByBuilding() {
    return this.http.get<any>(this.URL + '/tasks/building');
  }
}
