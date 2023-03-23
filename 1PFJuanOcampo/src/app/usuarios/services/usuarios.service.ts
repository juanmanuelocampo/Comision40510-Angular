import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  constructor(private http: HttpClient) {
  }

  nuevoUsuario: Usuario = {
    id: 0,
    usuario: '',
    contrasena: '',
    esAdmin: false
  };

  obtenerUsuariosAPI(): Observable<Usuario[]>{
      let auxObservable$ = this.http.get<Usuario[]>(`${env.apiURL}/usuario`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'encoding': 'UTF-8'
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  eliminarUsuarioAPI(usuario: Usuario): Observable<Usuario>{
      let auxObservable$ = this.http.delete<Usuario>(`${env.apiURL}/usuario/${usuario.id}`, {
        headers: new HttpHeaders({
        })
      }).pipe(
        catchError(this.capturarError)
      );
      return auxObservable$;
  }

  editarUsuarioAPI(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${env.apiURL}/usuario/${usuario.id}`, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  agregarUsuarioAPI(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${env.apiURL}/usuario`, usuario, {
      headers: new HttpHeaders({
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
  }

  private capturarError(error: HttpErrorResponse){
    alert('error')
    if(error.error instanceof ErrorEvent){
      alert(`Hubo un error del lado del cliente: ${error.message}`);
    }else{
      alert(`Hubo un error del lado del servidor: ${error.message}`);
    }
    return throwError(() => new Error('Error en el procesamiento de usuarios'));
  }

}
