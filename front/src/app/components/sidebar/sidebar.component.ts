import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  list = [
    { name: 'Inicio', icon: 'bi bi-house-door-fill', route: '/tasks' },
    { name: 'reporte', icon: 'bi bi-clipboard-data-fill', route: '/report-form' },
    { name: 'historial', icon: 'bi bi-archive-fill', route: '/task-history' },
    { name: 'Conocimiento', icon: 'bi bi-book-fill', route: '/knowledge'}
  ]

  admin = [
    { name: 'Usuarios', icon: 'bi bi-people-fill', route: '/signup' },
    { name: 'Ficha tecnica', icon: 'bi bi-pc', route: '/technical-form' },
    { name: 'Estadisticas', icon: 'bi bi-bar-chart-line-fill', route: '/statistics' }
  ]

  sistemas = [
    { name: 'Ficha tecnica', icon: 'bi bi-file-earmark-text-fill', route: '/technical-form' }
  ]

  constructor( public authService: AuthService ) { }

  ngOnInit() {
    this.updateList();
  }

  updateList(){
    //introde en list los elementos que se mostraran en el side-nav dependiendo del rol del usuario
    if(this.authService.getDataUser().role == 'Admin'){
      console.log('admin');
      for(let i = 0; i < this.admin.length; i++){
        this.list.push(this.admin[i]);
      }
    }
    if(this.authService.getDataUser().role == 'Sistemas'){
      for(let i = 0; i < this.sistemas.length; i++){
        this.list.push(this.sistemas[i]);
      }
    }  
  }

}
