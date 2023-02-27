import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SidenavService {
    private sidenav!: MatSidenav;

    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav.open();
    }


    public close() {
        return this.sidenav.close();
    }

    public toggle(): void {
      console.log('desde dentro del sidebar')
      //console.log(this.sidenav) //Si es undefined, es porque no se le pasó vien el ViewChild
      this.sidenav.toggle();
    }
  }
