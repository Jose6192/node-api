import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';


interface ReportForm{
  name: string;
  email: string;
  department: string;
  failType: string;
  anotherFailType: string;
  building: string;
  place: string;
  description: string;
}

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})


export class ReportFormComponent{

  building: string = 'Campus';

  selectBuilding(building: string){
    this.building = building;
  }

  reportForm: ReportForm = {
    name: '',
    email: '',
    department: '',
    failType: '',
    anotherFailType: '',
    building: '',
    place: '',
    description: ''
  }

  constructor( private taskService:TasksService ){}

  cleanPlace(){ //clean place input when building is changed
    this.reportForm.place = '';
  }

  onSubmit():void{
    this.taskService.createTask(this.reportForm)
      .subscribe(res => {
        alert(res.message + ' Su folio es: ' + res.folio);
        this.reportForm = {
          name: '',
          email: '',
          department: '',
          failType: '',
          anotherFailType: '',
          building: '',
          place: '',
          description: ''
        }
      }, err => alert('Error: '+ err.status +' '+ err.error.message));   
      
  };



}
