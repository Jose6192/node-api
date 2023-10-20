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
  images=[];

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

  selectedImages(event: any) {
    if (event.target.files.length > 0) {
      this.images = event.target.files;
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
    for (let img of this.images) {
      formData.append('images', img);
    }

    this.taskService.createTask(formData)
      .subscribe( res => {
        console.log(res);
      }, err => console.log(err));

  }
}
