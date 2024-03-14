import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  @Input() sideNavStatus: boolean = false;

  list = [
    { name: 'Inicio', icon: 'fa-solid fa-house', route: '/tasks' },
    { name: 'reporte', icon: 'fa-solid fa-clipboard-list', route: '/report-form' },
    { name: 'Usuarios', icon: 'fa-solid fa-users', route: '/signup' },
    { name: 'servicio', icon: 'fa-solid fa-desktop', route: '/technical-form' },
    { name: 'historial', icon: 'fa-solid fa-file', route: '/task-history' }
  ]

}
