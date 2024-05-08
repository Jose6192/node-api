import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit {

  imageURL = 'http://localhost:3000/imagen/'
  completedTasks: any[] = [];
  filterText: string = '';
  visibleTasksCount: number = 6;

  constructor(private tasksService: TasksService, private authService: AuthService) { }
  
  ngOnInit() {
    this.tasksService.getTasks()
      .subscribe(
        res => {
          let tasks: any[] = res;
          let filteredTasks: any[] = [];
          let role = this.getRole();
          if (role === 'Admin') {
            filteredTasks = tasks.filter((task: any) => task.status === 'completado');
            this.completedTasks = filteredTasks;
          } else {
            /* Si el usuario no es un administrador, filtra por rol */
            tasks = tasks.filter((task: any) => task.status === 'completado' && (task.department === role));
          }
        }
      )
  }

  get filteredTasks() {
    return this.completedTasks.filter(task =>
      task.folio.includes(this.filterText) ||
      task.description.includes(this.filterText) ||
      task.place.includes(this.filterText) ||
      task.department.includes(this.filterText)
    );
  }

  showMore() {
    this.visibleTasksCount += 6;
  }

  getRole(){
    const data = this.authService.getDataUser();
    return data.role;
  }

}
