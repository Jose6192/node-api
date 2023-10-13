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
      )
  }

  onCardClick(task: any) {
    this.selectedTask = this.selectedTask === task ? null : task;
}

}
