import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent {
  @Input() ExisteError! : boolean;
  @Input() valrequerido! : boolean;
  @Input() valpatron! : boolean;
  @Input() valminlength! : boolean;
  @Input() valemail! : boolean;

  constructor(){
  }
}
