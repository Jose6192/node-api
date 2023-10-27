import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

  tasks: any[] = [];
  selectedTask: any;

  constructor(public tasksService: TasksService, public authService: AuthService) { }

  ngOnInit() {
    this.tasksService.getTasks()
      .subscribe(
        res => {
          this.tasks = res;
        },
        err => console.log(err)
      );
  }
  
  onCardClick(task: any) { //alterna entre seleccionar y deseleccionar la misma tarjeta 
    this.selectedTask = this.selectedTask === task ? null : task;
  }

  deleteTask(i: number, task:any){
    let answer = confirm('¿Estas seguro de querer eliminarlo?');
    if (!answer) return;
    this.tasksService.deleteTask(task._id)
      .subscribe();
    this.tasks.splice(i,1) //elimina del arreglo la tarea para no tener que cargar la pagina
  }

  transferTask(i: number, task: any) {
    let answer = confirm('¿Estás seguro de querer transferir esta tarea?');
    if (answer) {
      // Cambiar el valor de departmento
      const newDepartment = task.department === 'Sistemas' ? 'Mantenimiento' : 'Sistemas';
  
      const updates = { department: newDepartment };
  
      this.tasksService.transferTask(task._id, updates)
        .subscribe(
          res => {
            this.tasks.splice(i, 1); // Elimina del arreglo la tarea después de la solicitud exitosa
          },
          err => console.log(err)
        );
    }
  }

  getRole(){
    const data = this.authService.getDataUser();
    return data.role;
  }

  getVisibleTasks() {
    let role = this.getRole();
    return this.tasks.filter(task => role === 'Admin' || role === task.department);
  }
  
}
