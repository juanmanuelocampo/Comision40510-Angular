import { Usuario } from "./Usuario";

export interface Sesion{
    sesionActiva: boolean;
    usuarioActivo?: Usuario;
}
