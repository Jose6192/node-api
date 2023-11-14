import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service'
import { FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent{

  reportForm: FormGroup;
  images=[];
  /* Mensajes para el usuario en el formulario */
  succesMessage: string = '';
  errorMessage: string = '';

  /* variablesForm */
  selectedDepartment: string | undefined;
  problem: string | undefined;
  building: string | undefined;

  constructor( private taskService:TasksService, private formBuilder: FormBuilder){
    this.reportForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'location': ['', Validators.required],
      'department': ['', Validators.required],
      'priority': ['', Validators.required]
    });
  }

  selectedImages(event: any) {
    if (event.target.files.length > 0) {
      this.images = event.target.files;
      console.log(this.images);
    }
  }
  
  sendReport(){
    const formData = new FormData();
    formData.append('name', this.reportForm.get('name')?.value || '');
    formData.append('title', this.reportForm.get('title')?.value || '');
    formData.append('description', this.reportForm.get('description')?.value || '');
    formData.append('location', this.reportForm.get('location')?.value || '');
    formData.append('department', this.reportForm.get('department')?.value || '');
    formData.append('priority', this.reportForm.get('priority')?.value || '');
    formData.append('status', 'pending');
    formData.append('compleatedTime', '');
    for (let img of this.images) {
      formData.append('images', img);
    }

    this.taskService.createTask(formData)
      .subscribe( res => {
        this.succesMessage = (res.message);
      }, err => this.errorMessage = 'Error al enviar reporte');

  }
}
