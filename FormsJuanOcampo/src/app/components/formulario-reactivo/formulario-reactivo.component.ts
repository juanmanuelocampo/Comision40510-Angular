import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-reactivo',
  templateUrl: './formulario-reactivo.component.html',
  styleUrls: ['./formulario-reactivo.component.css']
})
export class FormularioReactivoComponent {
  formularioLogin:  FormGroup;
  formularioEstudiante:  FormGroup;

  constructor(){
    let rsgexpEmail = "^[a-z]+@[a-z]+\\.[a-z]{2,3}$";
    let controles: any = {
      correo: new FormControl('', [Validators.required, Validators.pattern(rsgexpEmail)]),
      contrasena: new FormControl('', [Validators.required]),
      recordarCredenciales: new FormControl(true),
    };
    this.formularioLogin =  new FormGroup(controles);

    let controlesEstudiante: any = {
      id: new FormControl('', []),
      nombre: new FormControl('', [Validators.minLength(5)]),
      domicilio: new FormControl('', [Validators.required]),
    };
    this.formularioEstudiante =  new FormGroup(controlesEstudiante);
  }

  login(){
    console.clear();
    if (this.formularioEstudiante.status === 'INVALID'){
      Swal.fire('Atención:', 'Debe completar correctamente el formulario. Por lo tanto, no podrá continuar.', 'warning')
    }else{
      Swal.fire('Atención:', 'La operación fue realizada correctamente.', 'success')
    }
  }

  loginEstudiante(){
    console.clear();
    if (this.formularioEstudiante.status === 'INVALID'){
      Swal.fire('Atención:', 'Debe completar correctamente el formulario. Por lo tanto, no podrá continuar.', 'warning')
    }else{
      Swal.fire('Atención:', 'La operación fue realizada correctamente.', 'success')
    }
  }
}


