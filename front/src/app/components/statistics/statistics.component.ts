import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  chart?: Chart;

  constructor() { }

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

  ngOnInit(): void {
    this.chart = new Chart('building', {
      type: 'bar',
      data: this.data
    })
  }

}
