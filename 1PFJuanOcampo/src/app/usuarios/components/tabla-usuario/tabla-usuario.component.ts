import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { FormUsuarioDialogComponent } from '../form-usuario-dialog/form-usuario-dialog.component';
import { UsuarioService } from '../../services/usuarios.service';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Sesion } from 'src/app/models/sesion';
import { UsuarioState } from '../../usuario-state/usuario-state.reducer';
import { Store } from '@ngrx/store';
import { selectCargandoUsuarios, selectUsuariosCargados } from '../../usuario-state/usuario-state.selectors';
import { cargarUsuarioState, eliminarUsuarioState } from '../../usuario-state/usuario-state.actions';

@Component({
  selector: 'app-tablausuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablausuarioComponent {
  estadoventana: string = 'consulta';
  usuarios$!: Observable<Array<Usuario>>;
  dataSource!: MatTableDataSource<Usuario>;
  columnas: Array<string> = ['id', 'usuario', 'contrasena', 'esAdmin', 'acciones'];
  sesion$!: Observable<Sesion>;
  cargando$!: Observable<Boolean>;
  ABMSubscription!: Subscription;

  constructor(
      private dialog: MatDialog,
      private usuarioService: UsuarioService,
      private router: Router,
      private sesionService: SesionService,
      private store: Store<UsuarioState>,
  ){}

  ngOnInit(): void {
    this.store.dispatch(cargarUsuarioState());
    this.cargando$ = this.store.select(selectCargandoUsuarios);
    this.usuarios$ = this.store.select(selectUsuariosCargados);
    this.dataSource = new MatTableDataSource<Usuario>();

    //Esto se ejecuta cada vez que se actualiza el store
    this.ABMSubscription = this.usuarios$.subscribe((usuarios: Array<Usuario>) => {
      this.dataSource.data = usuarios;
    });
    this.sesion$ = this.sesionService.obtenerSesion();
  }

  ngOnDestroy() {
    this.ABMSubscription.unsubscribe();
  }

  eliminar(usuario:Usuario){
    this.store.dispatch(eliminarUsuarioState({usuario: usuario}));
  }

  modoEdicion(usuario:Usuario){
    this.estadoventana = 'edicion';
    this.abrirModal(usuario);
  }
  modoAlta(){
    this.estadoventana = 'alta';
    let usuario:Usuario = this.usuarioService.nuevoUsuario;
    this.abrirModal(usuario);
  }

  redirigirHistorial(usuario: Usuario){
    //Si bien envío el id y el objeto completo. Se deberían enviar solo una u otra
    this.router.navigate(['usuario/historial/' + usuario.id, usuario]);
  }

  abrirModal(usuario: Usuario){
    const dialogRef = this.dialog.open(FormUsuarioDialogComponent, {
      data: {...usuario, estadoventana:this.estadoventana} //Revisar tutor: es una buena práctica la forma en que envío el estadoventana?
    });
  }
}
