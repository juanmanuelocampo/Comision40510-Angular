import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanoATexto'
})
export class BooleanoATextoPipe implements PipeTransform {

  transform(valorBooleano: boolean, ...args: any[]): string {
    //Mejora: Si no recibe argumento, le asigno YES or NO
      return valorBooleano ? ((args[0] === undefined)? 'YES' : args[0]) : ((args[1] === undefined)? 'NO' : args[1]);
  }

}
