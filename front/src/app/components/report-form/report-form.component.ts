import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import Swal from 'sweetalert2';

interface ReportForm{
  name: string;
  email: string;
  department: string;
  failType: string;
  anotherFailType: string;
  building: string;
  place: string;
}

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})


export class ReportFormComponent{

  reportForm: ReportForm = {
    name: '',
    email: '',
    department: '',
    failType: '',
    anotherFailType: '',
    building: '',
    place: ''
  }

  constructor( private taskService:TasksService ){}

  cleanPlace(){ //clean place input when building is changed
    this.reportForm.place = '';
  }

  onSubmit():void{
    /* this.taskService.createTask(this.reportForm)
      .subscribe((message : any) => {
        alert(message.message);
        this.reportForm = {
          name: '',
          email: '',
          department: '',
          failType: '',
          anotherFailType: '',
          building: '',
          place: ''
        }
      }); */

      Swal.fire({
        title: 'Tu reporte ha sido enviado',
        icon: 'success',
        confirmButtonText: 'ok',
      }).then((result) => {
        this.reportForm = {
          name: '',
          email: '',
          department: '',
          failType: '',
          anotherFailType: '',
          building: '',
          place: ''
        }
      })      
      
  };
}
