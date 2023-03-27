import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  mostrarUsuarioContrasena: Boolean = true;
  sesionIniciada: Boolean = false;

  constructor(
    public loginService: LoginService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      usuario: new FormControl('admin', Validators.required),
      contrasena: new FormControl('admin', Validators.required),
      esAdmin: new FormControl({value: true, disabled: true})
    });
  }

  login(){
    this.loginService.loginApi(this.formulario.value);

    /* let mensaje = '';
    if((this.formulario.value.usuario == 'admin' && this.formulario.value.contrasena == 'admin') || (this.formulario.value.usuario == 'user' && this.formulario.value.contrasena == 'user')){
      this.sesionIniciada = true;
      if (this.formulario.value.usuario == 'admin'){
        mensaje = 'Atención: La sesión se iniciará con permisos de ADMINISTRADOR.';
      }else{
        mensaje = 'Atención: La sesión se iniciará con permisos restringidos.';
      }
      Swal.fire({
        title: 'Inicio de sesión',
        text: mensaje,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        let _usuario: Usuario = {
          id: 1,
          usuario: this.formulario.value.usuario,
          contrasena: this.formulario.value.contrasena,
          esAdmin: (this.formulario.value.usuario == 'admin')
        }
        this.loginService.login(_usuario);
        this.router.navigate(['inicio']);
        //if (result.isConfirmed) alert('puede seguir')
      })
    }else{
      this.sesionIniciada = false;
      Swal.fire({
        title: 'Inicio de sesión',
        text: 'Atención: Usuario o contraseña incorrectos',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    } */
  }
}
