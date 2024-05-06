import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isDarkTheme?: boolean;
  navCollapsed: boolean = false;

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

  constructor(public authService: AuthService) {}

  ngOnInit(){
    //aplica el tema
    this.updateList(); 
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
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

  logOut() {
    this.authService.logOut();
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }
  applyTheme() {
    const theme = this.isDarkTheme ? 'dark' : 'light';
    const body = document.body as HTMLElement;
    body.setAttribute('data-bs-theme', theme);
  }
  toggleNav() {
    this.navCollapsed = !this.navCollapsed;
  };

  tokenIsExpired() {
    return this.authService.tokenIsExpired();
  }

  isLogedIn() {
    return this.authService.loggedIn();
  }

}

