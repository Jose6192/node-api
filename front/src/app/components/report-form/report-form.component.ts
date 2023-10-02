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
    nombre:'', titulo:'', descripcion:'', ubicacion:'', departamento:'', prioridad:'', imagen:''
  };
  
  sendReport(){
    console.log(this.task);
    this.taskService.postTask(this.task)
     .subscribe(
      res => console.log(JSON.stringify(res)),
      err => console.log(err)
     )
  }

}
