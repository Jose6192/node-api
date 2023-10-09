import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service'

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {

  constructor( private taskService:TasksService){}

  task = {
    name: '',
    title: '',
    description: '',
    location: '',
    department: '',
    priority: '',
    image: ''
  }
  
  sendReport(){
    this.taskService.createTask(this.task)
      .subscribe(
        err => console.log(err)
      )
  }
}
