import { Component, OnInit } from '@angular/core';
import { map, Observable, pipe, Subscription } from 'rxjs';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from 'src/app/services/alumno.services';

@Component({
  selector: 'app-listadoobservable',
  templateUrl: './listadoobservable.component.html',
  styleUrls: ['./listadoobservable.component.css']
})
export class ListadoobservableComponent implements OnInit {    
    //subscripcion!: Subscription;
    //alumnos!: Array<Alumno>; //Con el async, no es necesario usar este array, ya que se usa directamente el Observable
    alumnos$!: Observable<Alumno[]>;
    alumnosfiltrados!: Array<Alumno>;

    constructor(private alumnoService: AlumnoService){
    }

    ngOnInit(): void{
        this.alumnos$ = this.alumnoService.obtenerAlumnosObservable();
        //Con el async, no es necesario usar este array this.alumnos, ni sibscribirse, ya que se usa directamente el Observable
        //La subscripción ser{ia necesaria en caso de que sea necesario hacer algún procesamiento adicional. O como en el caso de la tabla de ang-material que usa otra propiedad del mat-table
        //this.alumnos$.subscribe((alumnos) =>{
          //this.alumnos = alumnos; 
        //});

        //este tema no se explicó, lo resuelvo de la forma que creo más sencilla
        this.alumnos$
        .pipe(map((alumnos: Alumno[]) => alumnos.filter((alumno: Alumno) => alumno.activo === true)))
        .subscribe((alumnos) =>{this.alumnosfiltrados = alumnos; });        
    }

    ngDestroy(): void{
      //this.subscripcion.unsubscribe();
    }    
}
