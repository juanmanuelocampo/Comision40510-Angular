import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { env } from '../../../environment/environment';
import Swal from 'sweetalert2';

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

  getUsuarioAPI(usuario:Usuario): Observable<Usuario[]>{
    let auxObservable$ = this.http.get<Usuario[]>(`${env.apiURL}/usuario?usuario=${usuario.usuario}&contrasena=${usuario.contrasena}&limit=1`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.capturarError)
    );
    return auxObservable$;
  }

  getNextIdAPI(): Observable<Usuario[]>{
    let auxObservable$ = this.http.get<Usuario[]>(`${env.apiURL}/usuario?_sort=id&_order=desc&_limit=1`, {
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
    if(error.error instanceof ErrorEvent){
      Swal.fire({text: `Hubo un error del lado del cliente: ${error.message}`,icon: 'error'})
    }else{
      Swal.fire({text: `Hubo un error del lado del servidor: ${error.message}`,icon: 'error'})
    }
    return throwError(() => new Error('Error en el procesamiento de usuarios'));
  }

}
