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

  building: string = 'Campus';

  selectBuilding(building: string){
    this.building = building;
  }

/*   buildings = [
    {name: 'Campus', img:{firstF:'campus-utrm.jpg'}},
    {name: 'Edificio C', img: { firstF:'Edificio_C_Biblioteca.jpg'}},
    {name: 'Edificio D', img: { firstF:'Edificio_D_Docencia_PB.jpg', secondF:'Edificio_D_Docencia_PA.jpg'}},
    {name: 'Edificio E', img: { firstF:'Edificio_E_Gastro.jpg'}},
    {name: 'Edificio F', img: { firstF:'Edificio_F_Mtto_Indus.jpg'}},
    {name: 'Edificio L', img: { firstF:'Edif_L_Docencia_PB.jpg', secondF:'Edif_L_Docencia_PA.jpg'}},
  ] */

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
    this.taskService.createTask(this.reportForm)
      .subscribe(res => {
        alert(res.message);
        this.reportForm = {
          name: '',
          email: '',
          department: '',
          failType: '',
          anotherFailType: '',
          building: '',
          place: ''
        }
      }, err => alert('Error: '+ err.status +' '+ err.error.message));

      /* Swal.fire({
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
      })  */     
      
  };



}
