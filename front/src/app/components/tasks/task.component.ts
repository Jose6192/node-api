import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

  tasks: any[] = [];
  selectedTask: any;

  constructor(public tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.getTasks()
      .subscribe(
        res => {
          this.tasks = res;
        },
        err => console.log(err)
      );
  }
  //alterna entre seleccionar y deseleccionar la misma tarjeta 
  onCardClick(task: any) {
    this.selectedTask = this.selectedTask === task ? null : task;
  }

  deleteTask(i: number, task:any){
    let answer = confirm('¿Estas seguro de querer eliminarlo?');
    this.tasksService.deleteTask(task._id)
      .subscribe();
    if(answer){
      this.tasks.splice(i,1)
    }
  }
}
