import { Pais } from "./Pais";

export interface Alumno{
  nombre: string,
  edad:number,
  pais: Pais,
  activo: boolean
}
