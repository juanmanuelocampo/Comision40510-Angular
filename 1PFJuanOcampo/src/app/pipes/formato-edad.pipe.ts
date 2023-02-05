import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoEdad'
})
export class FormatoEdadPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): number {
    //Función sacada de internet y adaptada
    let hoy = new Date();
    let cumpleanos = new Date(value);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
  }

}
