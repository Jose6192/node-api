import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit {

  completedTasks: any[] = [];

  constructor(private tasksService: TasksService, private authService: AuthService) { }
  
  ngOnInit() {
    this.tasksService.getTasks()
      .subscribe(
        res => {
          let tasks: any[] = res;
          let role = this.getRole();
          if (role === 'Admin') {
            this.completedTasks = tasks.filter((task: any) => task.status === 'completed');
          } else {
            /* Si el usuario no es un administrador, filtra por rol */
            this.completedTasks = tasks.filter((task: any) => task.status === 'completed' && (task.department === role));
          }
        }
      )
  }

  getRole(){
    const data = this.authService.getDataUser();
    return data.role;
  }

}
