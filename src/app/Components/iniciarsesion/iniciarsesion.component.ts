import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { login } from 'src/app/Models/Auxiliares/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css'],
})
export class IniciarsesionComponent implements OnInit {
  formIniciarsesion = this.fb.group({
    correo: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    password1: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, 
    private _loginService: LoginService,
    private _router : Router) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  crearFormulario() {
    this.formIniciarsesion = this.fb.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password1: ['', Validators.required]
    });
  }

  iniciarSesion() {
    console.log(this.formIniciarsesion);

    let _login = new login(
      this.formIniciarsesion.get('correo')?.value,
      this.formIniciarsesion.get('password1')?.value
    );

    if (this.formIniciarsesion.invalid) {
      return Object.values(this.formIniciarsesion.controls).forEach(
        (control) => {
          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach((control) =>
              control.markAsTouched()
            );
          } else {
            control.markAsTouched();
          }
        }
      );
    } else {
      //Envio de la informacion al servidor
      this._loginService.iniciarSesion(_login).subscribe(
        (data) => {
          //debugger;
          console.log('datos: ', data);

          localStorage.setItem('token', data);

          this._router.navigate(['/inicio']);

          this.limpiarFormulario();
        },
        (error: HttpErrorResponse) => {
          //Error callback
          console.log('Error del servicio: ', error.error['Descripcion']);

          switch (error.status) {
            case 401:
              //this.router.navigateByUrl("/login");
              console.log('error 401');
              break;
            case 403:
              //this.router.navigateByUrl("/unauthorized");
              console.log('error 403');
              break;
            case 404:
              //this.router.navigateByUrl("/unauthorized");
              console.log('error 404');
              break;
            case 409:
              //this.router.navigateByUrl("/unauthorized");
              console.log('error 409');
              break;
          }

          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error al intentar autenticar el usuario',
            text: 'Correo y/o contraseña incorrectos.',
            showCancelButton: false,
            showDenyButton: false,
          });

          //throw error;   //You can also throw the error to a global error handler
        }
      );
    }
  }

  limpiarFormulario() {
    // Reseteo de la información
    this.formIniciarsesion.reset({
      correo: '',
      password1: ''
    });
  }

  get correoNoValido() {
    return (
      this.formIniciarsesion.get('correo')?.invalid &&
      this.formIniciarsesion.get('correo')?.touched
    );
  }

  get password1NoValido() {
    return (
      this.formIniciarsesion.get('password1')?.invalid &&
      this.formIniciarsesion.get('password1')?.touched
    );
  }
}
