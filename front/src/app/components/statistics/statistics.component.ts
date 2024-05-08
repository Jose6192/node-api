import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(public taskService: TasksService) { }

  chart?: Chart;

  buildingData = {
    labels: ['Edificio C', 'Edificio D', 'Edificio E', 'Edificio F', 'Edificio L', 'Cafeteria', 'Domo'],
    datasets: [{
      data: [0, 0, 0, 0, 0, 0, 0],
      label: 'Reportes por edificio',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1
    }]
  };

  cardsData = [
    {
      title: 'Reportes activos  ',
      icon: 'bi bi-bell-fill',
      data: 'sin datos'
    },
    {
      title: 'Reportes resueltos',
      icon: 'bi bi-bell-slash-fill',
      data: 'sin datos'
    },
    {
      title: 'Mas reportes resueltos',
      icon: 'bi bi-star-fill',
      data: 'sin datos',
    }
  ];

  ngOnInit() {
    this.getReportByBuilding();
    this.getActiveTasksNumber();
    this.getResolvedTasksNumber();
    this.getTopUser();
  }

  createChart() {
    this.chart = new Chart('building', {
      type: 'bar',
      data: this.buildingData
    })
  }

  getActiveTasksNumber() {
    this.taskService.getActiveTasksNumber().subscribe(res => {
      this.cardsData[0].data = res.count;
    }, err => console.log(err)
    )
  }
  getResolvedTasksNumber() {
    this.taskService.getResolvedTasksNumber().subscribe(res => {
      this.cardsData[1].data = res.count;
    }, err => console.log(err))
  }
  getTopUser() {
    this.taskService.getTopUser().subscribe(res => {
      this.cardsData[2].data = res.topUser;
    }, err => console.log(err))
  }

  getReportByBuilding() {
    this.taskService.getReportByBuilding().subscribe(
        res => {
            const data = res as { reportesPorEdificio: { _id: string, total: number }[] };
            const reportesPorEdificio = data.reportesPorEdificio;
            const nuevosDatos = reportesPorEdificio.map(reporte => reporte.total);
            this.buildingData.datasets[0].data = nuevosDatos;
            this.createChart();            
        },
        err => console.log(err)
    );
}


}
