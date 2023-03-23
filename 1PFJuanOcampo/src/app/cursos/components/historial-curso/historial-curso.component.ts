import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-historial-curso',
  templateUrl: './historial-curso.component.html',
  styleUrls: ['./historial-curso.component.css']
})
export class HistorialCursoComponent {
    columnChartOptions = {
      animationEnabled: true,
      title: {
        text: '',
      },
      data: [
      {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: 'line',
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
      this.columnChartOptions.title.text = "Historial del curso " + params['nombre'] + ' ' + params['apellido'];
    });
  }

  goBack(){
    this.location.back();
  }

}
