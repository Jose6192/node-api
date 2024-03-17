import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  @Input() sideNavStatus: boolean = false;

  list = [
    { name: 'Inicio', icon: 'bi bi-house-door-fill', route: '/tasks' },
    { name: 'reporte', icon: 'bi bi-clipboard-data-fill', route: '/report-form' },
    { name: 'Usuarios', icon: 'bi bi-people-fill', route: '/signup' },
    { name: 'servicio', icon: 'bi bi-pc', route: '/technical-form' },
    { name: 'historial', icon: 'bi bi-archive-fill', route: '/task-history' }
  ]

}
