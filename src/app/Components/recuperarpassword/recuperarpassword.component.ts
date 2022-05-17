import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { login } from 'src/app/Models/Auxiliares/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperarpassword',
  templateUrl: './recuperarpassword.component.html',
  styleUrls: ['./recuperarpassword.component.css']
})
export class RecuperarpasswordComponent implements OnInit {
  formRP = this.fb.group({
    correo: [ '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ]
  });

  constructor( private fb: FormBuilder, 
               private _loginService: LoginService,
               private _router : Router) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.formRP = this.fb.group({
      correo: [ '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ]
    });
  }

  recuperarPassword() {
    //console.log(this.formRP);

    // let _login = new login(
    //   this.formRP.get('correo')?.value,
    //   this.formRP.get('password1')?.value
    // );

    if (this.formRP.invalid) {
      return Object.values(this.formRP.controls).forEach(
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

      let _login = new login(
        this.formRP.get('correo')?.value,
        this.formRP.get('password1')?.value,
      );

      //Envio de la informacion al servidor
      this._loginService.recuperarPassword(_login).subscribe(
        (data) => {
          //debugger;
          //console.log('datos: ', data);

          Swal.fire({
            icon: 'success',
            title: 'Se envio un correo a su cuenta.',
            text: 'Revise las instrucciones para reestablecer su password.',
            showCancelButton: false,
            showDenyButton: false,
          });

          //localStorage.setItem('usuario', JSON.stringify(data));
          
          //console.log(localStorage.getItem('usuario'));
          //console.log(JSON.parse(localStorage.getItem('usuario')!));
          //JSON.parse(localStorage.getItem('usuario'))['Token']

          //this._router.navigateByUrl('/inicio');

          //window.location.href = '/inicio';

          this.limpiarFormulario();
        },
        (error: HttpErrorResponse) => {
          //Error callback
          //console.log('Error del servicio: ', error);

          switch (error.status) {
            case 401:
              //this.router.navigateByUrl("/login");
              //console.log('error 401');
              break;
            case 403:
              //this.router.navigateByUrl("/unauthorized");
              //console.log('error 403');
              break;
            case 404:

              Swal.fire({
                icon: 'error',
                title: 'Cuenta de correo inexistente',
                text: '',
                showCancelButton: false,
                showDenyButton: false,
              });
    
              //console.log('error 404');
              break;
            case 409:
              
              Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error al intentar enviar el correo',
                text: 'Intentelo mas tarde',
                showCancelButton: false,
                showDenyButton: false,
              });

              //console.log('error 409');
              break;
          }

          

          //throw error;   //You can also throw the error to a global error handler
        }
      );
    }
  }

  limpiarFormulario() {
    // Reseteo de la información
    this.formRP.reset({
      correo: '',
      password1: ''
    });
  }

  get correoNoValido() {
    return (
      this.formRP.get('correo')?.invalid &&
      this.formRP.get('correo')?.touched
    );
  }

}
