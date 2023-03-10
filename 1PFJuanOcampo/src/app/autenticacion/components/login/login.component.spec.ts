import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';

import { LoginComponent } from './login.component';
import { Sesion } from '../../../models/sesion';

describe('Pruebas unitarios de LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1º Test) El componente se creó correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('2º Test) Permitir intentar iniciar sesión si usuario y contraseña tienen valores', () => {
    const formulario = component.formulario;
    const txtUsuario = formulario.controls["usuario"];
    const txtContrasena = formulario.controls["contrasena"];
    txtUsuario.setValue('admin');
    txtContrasena.setValue('admin');
    expect(formulario.valid).toBeTruthy();
  });

  it('3º Test) NO permitir intentar iniciar sesión si usuario está vacío', () => {
    const formulario = component.formulario;
    const txtUsuario = formulario.controls["usuario"];
    const txtContrasena = formulario.controls["contrasena"];
    txtUsuario.setValue('');
    txtContrasena.setValue('admin');
    expect(formulario.valid).toBeFalsy();
  });

  it('4º Test) NO permitir intentar iniciar sesión si password está vacío', () => {
    const formulario = component.formulario;
    const txtUsuario = formulario.controls["usuario"];
    const txtContrasena = formulario.controls["contrasena"];
    txtUsuario.setValue('admin');
    txtContrasena.setValue('');
    expect(formulario.valid).toBeFalsy();
  });

  it('5º) Verifico un usuario y contraseña correctos', () => {
    const formulario = component.formulario;
    const txtUsuario = formulario.controls["usuario"];
    const txtContrasena = formulario.controls["contrasena"];
    txtUsuario.setValue('admin');
    txtContrasena.setValue('admin');
    const boton = fixture.debugElement.query(By.css("#btn-login"));
    boton.nativeElement.click();
    fixture.detectChanges();
    expect(component.sesionIniciada).toBeTruthy();
  });

  it('6º) Verifico un usuario y contraseña incorrectos', () => {
    const formulario = component.formulario;
    const txtUsuario = formulario.controls["usuario"];
    const txtContrasena = formulario.controls["contrasena"];
    txtUsuario.setValue('admin');
    txtContrasena.setValue('***');
    const boton = fixture.debugElement.query(By.css("#btn-login"));
    boton.nativeElement.click();
    fixture.detectChanges();
    expect(component.sesionIniciada).toBeFalsy();
  });
});
