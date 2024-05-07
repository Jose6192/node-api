import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(public taskService:TasksService) { }

  chart?: Chart;

  data = {
    labels: ['Edificio C', 'Edificio D', 'Edificio E', 'Edificio F', 'Edificio L', 'Cafeteria', 'Domo'],
    datasets: [{
      label: 'Reportes por edificio',
      data: [10, 19, 20, 11, 16, 20, 1],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1
    }]
  };

  cardsData = [
    {
      title: 'Reportes activos  ',
      icon: 'bi bi-bell-fill',
      data: 77
    },
    {
      title: 'Reportes resueltos',
      icon: 'bi bi-bell-slash-fill',
      data: 50
    },
    {
      title: 'Mas reportes resueltos',
      icon: 'bi bi-star-fill',
      data: 'john Doe',
    }
  ];

  ngOnInit() {
    this.createChart();
    this.getActiveTasksNumber();
    this.getResolvedTasksNumber();
    this.getTopUser();
  }

  createChart(){
    this.chart = new Chart('building', {
      type: 'bar',
      data: this.data
    })
  }

  getActiveTasksNumber(){
    this.taskService.getActiveTasksNumber().subscribe(res => {
      this.cardsData[0].data = res.count;
    },err => console.log(err)
  )
  }
  getResolvedTasksNumber(){
    this.taskService.getResolvedTasksNumber().subscribe(res => {
      this.cardsData[1].data = res.count;
    },err => console.log(err))
  }
  getTopUser(){
    this.taskService.getTopUser().subscribe(res => {
      this.cardsData[2].data = res.topUser;
    }, err => console.log(err))
  }
}
