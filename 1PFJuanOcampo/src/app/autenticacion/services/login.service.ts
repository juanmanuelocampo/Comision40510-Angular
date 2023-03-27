import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Sesion } from 'src/app/models/sesion';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/usuarios/services/usuarios.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private sesion: SesionService,
    private servicioUsuario: UsuarioService,
    private router: Router
  ) { }

  login(usuario: Usuario){
    let sesion: Sesion = {
      sesionActiva: true,
      usuarioActivo: usuario
    };

    this.sesion.crearSesion(sesion);
  }

  /*
  */

  async loginApi(usuario: Usuario): Promise<boolean> {
    let mensaje = '';
    const auxUsuario = await this.servicioUsuario.getUsuarioAPI(usuario).toPromise()
    if (auxUsuario?.toString().length === 0) {
      Swal.fire({
        title: 'Inicio de sesión',
        text: 'Atención: Usuario o contraseña incorrectos',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return false;
    }else{
      console.log(auxUsuario)
      if (auxUsuario && auxUsuario[0]?.esAdmin){
        mensaje = 'Atención: La sesión se iniciará con permisos de ADMINISTRADOR.';
        usuario.esAdmin = true;
      }else{
        mensaje = 'Atención: La sesión se iniciará con permisos restringidos.';
        usuario.esAdmin = false;
      }
      Swal.fire({
        title: 'Inicio de sesión',
        text: mensaje,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      }).then( (result) => {
        let sesion: Sesion = {
          sesionActiva: true,
          usuarioActivo: usuario
        };
        //usuario.esAdmin = auxUsuario[0]?.esAdmin;
        this.sesion.crearSesion(sesion);
        this.router.navigate(['/inicio']);
        return true;
      })
    }


      /* Swal.fire({
        title: 'Inicio de sesión',
        text: mensaje,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        let _usuario: Usuario = {
          id: 1,
          usuario: usuario.usuario,
          contrasena: usuario.contrasena,
          esAdmin: (usuario.usuario == 'admin')
        }
        let sesion: Sesion = {
          sesionActiva: true,
          usuarioActivo: usuario
        };
        this.sesion.crearSesion(sesion);
        this.router.navigate(['/inicio']);
        return true; */
        //this.login(_usuario);
        //this.router.navigate(['inicio']);
        //if (result.isConfirmed) alert('puede seguir')
      /* })
    }else{
      //this.sesionIniciada = false;
      Swal.fire({
        title: 'Inicio de sesión',
        text: 'Atención: Usuario o contraseña incorrectos',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return false;
    }


    let sesion: Sesion = {
      sesionActiva: true,
      usuarioActivo: usuario
    };
    this.sesion.crearSesion(sesion);
 */
    return false;
  }

  getSesion(){
    return this.sesion.obtenerSesion();
  };

}
