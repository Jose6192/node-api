import { Component, OnInit, } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  reports: any[] = [];
  selectedReport: any;
  selectedFile: any;
  imageURL = 'http://localhost:3000/imagen/'
  compleateReportData = { finalizedAt: '', solvedby: '' }

  compleateForm: FormGroup;

  constructor(public tasksService: TasksService, public authService: AuthService, private fb: FormBuilder) {
    this.compleateForm = fb.group({
      description: ['', Validators.required],
      images: ['']
    })
  }

  ngOnInit() {
    this.getReports();
  }

  generateFormData() { //cuando se presiona el boton siguiente para mostrar los datos estaticos del formulario 
    this.compleateReportData.finalizedAt = Date();
    this.compleateReportData.solvedby = this.authService.getDataUser().name;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('finalizedAt', this.compleateReportData.finalizedAt);
    formData.append('solvedby', this.compleateReportData.solvedby);
    formData.append('description', this.compleateForm.get('description')!.value);
    formData.append('images', this.selectedFile);
    formData.append('status', 'completado');
    formData.append('imagePaths', '');

    this.tasksService.compleateTask(this.selectedReport._id, formData)
      .subscribe(
        res => {
          alert('Tarea completada con éxito');
          location.reload();
          this.compleateForm.reset();
        },
        err => console.log(err)
      );
  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }



  selectReport(report: any) { //selecciona la tarea para mostrarla en el modal
    this.selectedReport = this.selectedReport = report;
  }

  deleteReport(i: number, report: any) {
    let answer = confirm('¿Estas seguro de querer eliminarlo?');
    if (!answer) return;
    this.tasksService.deleteTask(report._id)
      .subscribe();
    this.reports.splice(i, 1) //PROBLEMA AL ELIMINAR UNA TAREA
  }

  transferReport(i: number, report: any) {
    let answer = confirm('¿Estás seguro de querer transferir esta tarea?');
    if (answer) {
      // Cambiar el valor de departmento
      const newDepartment = report.department === 'Sistemas' ? 'Mantenimiento' : 'Sistemas';
      const updates = { department: newDepartment };
      this.tasksService.transferTask(report._id, updates)
        .subscribe(
          res => location.reload(),
          err => console.log(err)
        );
    }
  }

  getRole() {
    const data = this.authService.getDataUser();
    return data.role;
  }

  getReports() {
    this.tasksService.getTasks()
      .subscribe(
        res => {
          let reports: any[] = res;
          this.reports = reports.filter((report: any) => report.status === 'pendiente');
          this.reports = this.getVisibleReports();
        }
      )
  }

  getVisibleReports() { //si se cambia la itecaion de las cards por una variable no funciona hay que usar getVisibleReports();
    let role = this.getRole();
    return this.reports.filter(report => role === 'Admin' || role === report.department);
  }

  changepriority(i: number, report: any, priority: string) {
    const updates = {
      priority: priority
    }
    this.tasksService.changePriority(report._id, updates)
      .subscribe(
        res => {
          this.reports[i].priority = updates.priority;
        }
      );
  }

}
