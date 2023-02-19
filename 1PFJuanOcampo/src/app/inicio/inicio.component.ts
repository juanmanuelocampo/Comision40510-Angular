import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  columnChartOptions = {
    animationEnabled: true,
    title: {
      text: '',
    },
    data: [
    {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'bar',
        dataPoints: [
          { label: 'Ventana Cursos', y: 90 },
          { label: 'Ventana Alumnos', y: 100 },
          { label: 'Ventana Profesores', y: 70 },
        ],
    },
    ],
  };
}
