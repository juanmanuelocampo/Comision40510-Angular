import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-estadisticas-alumno',
  templateUrl: './estadisticas-alumno.component.html',
  styleUrls: ['./estadisticas-alumno.component.css']
})
export class EstadisticasAlumnoComponent {
    columnChartOptions = {
      animationEnabled: true,
      title: {
        text: '',
      },
      data: [
      {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: 'column',
          dataPoints: [
            { label: 'C#', y: 9 },
            { label: 'C++', y: 8 },
            { label: 'Java', y: 6 },
            { label: 'Angular', y: 6 },
            { label: 'React', y: 7 },
          ],
      },
      ],
  };

  constructor(private route: ActivatedRoute, private location: Location){
    this.route.params.subscribe(params => {
      this.columnChartOptions.title.text = "Estadísticas del alumno " + params['id'];
    });
  }

  goBack(){
    this.location.back();
  }

}
