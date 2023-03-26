import { Alumno } from "./Alumno";
import { Profesor } from "./Profesor";

export interface Curso{
  id: number,
  nombre: string,
  profesor: Profesor,
}
