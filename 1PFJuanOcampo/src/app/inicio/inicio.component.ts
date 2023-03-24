import { Component } from '@angular/core';
import { VentanaStatsService } from '../shared/services/ventana-stats.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  //Obtengo la referencia al gráfico del html
  chart: any;
  getChartInstance(chart: object) {
		this.chart = chart;
	}

  constructor(
    private ventanaStatsService: VentanaStatsService,
  ){}

  //Parametrizo el gráfico
  columnChartOptions = {
    animationEnabled: false,
    title: {
      text: 'Estadísticas de uso del sistema',
    },
    data: [
    {
        type: 'column', // Change type to "doughnut", "line", "splineArea", etc.
        dataPoints: [],
    },
    ],
  };

  ngOnInit(): void {
    //Asigno los datos del gráfico
    this.ventanaStatsService.obtenerStatsAPI().subscribe((data: any) => {
        this.columnChartOptions.data[0].dataPoints = data;
        this.chart.render();
      }
    )
  }
}
