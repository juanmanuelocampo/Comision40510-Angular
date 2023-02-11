import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from 'src/app/services/alumno.services';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {
  alumnos!: Array<Alumno>;    
  constructor(private alumnoService: AlumnoService){       
  }  

  ngOnInit(): void {    
    this.alumnoService.obtenerAlumnosPromeses()
    .then((alumnos: Array<Alumno>)=>{
        this.alumnos = alumnos;
    })
    .catch((error: any) => {
        console.log(error);
    });
  }  
}
