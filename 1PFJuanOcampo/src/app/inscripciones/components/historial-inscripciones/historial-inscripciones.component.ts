import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-historial-inscripcion',
  templateUrl: './historial-inscripciones.component.html',
  styleUrls: ['./historial-inscripciones.component.css']
})
export class HistorialInscripcionComponent {
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
      this.columnChartOptions.title.text = "Historial del inscripcion " + params['nombre'] + ' ' + params['apellido'];
    });
  }

  goBack(){
    this.location.back();
  }

}
