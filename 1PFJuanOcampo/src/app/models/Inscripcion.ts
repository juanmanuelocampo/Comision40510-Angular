import { Alumno } from "./Alumno";
import { Curso } from "./Curso";

export interface Inscripcion{
    id: number,
    fecha: Date,
    alumno: Alumno,
    curso: Curso,
}
