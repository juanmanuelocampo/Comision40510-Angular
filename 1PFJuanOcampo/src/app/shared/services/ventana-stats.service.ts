import { Injectable } from '@angular/core';
import { catchError, concat, Observable, of, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from '../../../environment/environment';
import Swal from 'sweetalert2';
import { DataPointChart } from 'src/app/models/DataPointChart';

@Injectable({
  providedIn: 'root'
})

export class VentanaStatsService {
  constructor(private http: HttpClient) {
  }

  obtenerStatsAPI(): Observable<DataPointChart[]>{
      let auxObservable$ = this.http.get<DataPointChart[]>(`${env.apiURL}/ventanastat`, {
          headers: new HttpHeaders({
          'content-type': 'application/json',
          'encoding': 'UTF-8'
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  getStatsAPI(idVentana: Number): Observable<DataPointChart>{
    let auxObservable$ = this.http.get<DataPointChart>(`${env.apiURL}/ventanastat/${idVentana}`, {
        headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
    return auxObservable$;
}


incrementarStatsAPI(idVentana: Number): Observable<DataPointChart>{
    let _ventana: DataPointChart = {
      id: 3,
      label: "Profesores",
      y: 26
    };

    const obsGetVentana$ = this.http.get<DataPointChart>(`${env.apiURL}/ventanastat/${idVentana}`)
    const obsIncrVentana$ = (ventana: any) => { //ventana es el parámetro que espero recibir. Que será el resultado del obsGetVentana$
      ventana.y++; //incremento en uno los ingresos a la ventana
      //Ejecuto el put para que modifique la BD
      return this.http.put<DataPointChart>(
          `${env.apiURL}/ventanastat/${idVentana}`,
          ventana,
          {headers: new HttpHeaders({'Content-Type': 'application/json'})})
    };

    return obsGetVentana$.pipe(
      switchMap((ventana: DataPointChart) => {
        return obsIncrVentana$(ventana);
      })
    )
  }

  private capturarError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      Swal.fire({text: `Hubo un error del lado del cliente: ${error.message}`,icon: 'error'})
    }else{
      Swal.fire({text: `Hubo un error del lado del servidor: ${error.message}`,icon: 'error'})
    }
    return throwError(() => new Error('Error en el procesamiento de cursos'));
  }

}
