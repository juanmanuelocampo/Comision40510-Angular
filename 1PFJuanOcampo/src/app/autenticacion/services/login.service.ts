import { Injectable } from '@angular/core';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Sesion } from 'src/app/models/sesion';
import { Usuario } from 'src/app/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private sesion: SesionService
  ) { }

  login(usuario: Usuario){
    let sesion: Sesion = {
      sesionActiva: true,
      usuarioActivo: usuario
    };

    this.sesion.crearSesion(sesion);
  }

  getSesion(){
    return this.sesion.obtenerSesion();
  };

}
