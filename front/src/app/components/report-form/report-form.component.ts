import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent{

  reportForm: FormGroup;

  image: any;

  constructor( private taskService:TasksService, private formBuilder: FormBuilder){
    this.reportForm = this.formBuilder.group({
      'name': [''],
      'title': [''],
      'description': [''],
      'location': [''],
      'department': [''],
      'priority': [''],
    });
  }

  selectedImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
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
    formData.append('image', this.image);

    this.taskService.createTask(formData)
      .subscribe( res => {
        console.log(res);
      }, err => console.log(err));

  }
}
