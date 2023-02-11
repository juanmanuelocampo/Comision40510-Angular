import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from 'src/app/services/alumno.services';

@Component({
  selector: 'app-altaalumno',
  templateUrl: './altaalumno.component.html',
  styleUrls: ['./altaalumno.component.css']
})
export class AltaalumnoComponent {
    constructor(private alumnoService:AlumnoService){
    }
    
    agregarAlumno(){
        let c: Alumno = {
          id:100,
          nombre:'nombre agregado',
          apellido:'apellido agregado',
          email:'email@email.com',
          fecnac: new Date(),
          activo:true
        };
        this.alumnoService.agregarAlumno(c);
    }
}
