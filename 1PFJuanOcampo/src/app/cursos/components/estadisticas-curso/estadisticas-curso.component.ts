import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-estadisticas-curso',
  templateUrl: './estadisticas-curso.component.html',
  styleUrls: ['./estadisticas-curso.component.css']
})
export class EstadisticasCursoComponent {
    columnChartOptions = {
      animationEnabled: true,
      title: {
        text: '',
      },
      data: [
      {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: 'doughnut',
          dataPoints: [
            { label: 'Aprobados', y: 90 },
            { label: 'Desaprobados', y: 10 },
          ],
      },
      ],
    };

  constructor(private route: ActivatedRoute, private location: Location){
    this.route.params.subscribe(params => {
      this.columnChartOptions.title.text = "Estadísticas del Curso " + params['nombre'];
    });
  }

  goBack(){
    this.location.back();
  }

}
