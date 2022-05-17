import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';

import { login } from 'src/app/Models/Auxiliares/login.model';

@Component({
  selector: 'app-restablecerpassword',
  templateUrl: './restablecerpassword.component.html',
  styleUrls: ['./restablecerpassword.component.css']
})
export class RestablecerpasswordComponent implements OnInit {
  formaRestablecer = this.fb.group({
    password1: [ '', Validators.required ],
    password2: [ '', Validators.required ]
  });

  token = '';

  constructor( private fb : FormBuilder,
               private _activatedRoute : ActivatedRoute,
               private router : Router,
               private _loginService : LoginService ) {

    this._activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });

    this.crearFormulario();
    this.validarToken();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.formaRestablecer = this.fb.group({
      password1: [ '', Validators.required ],
      password2: [ '', Validators.required ]
    });
  }

  validarToken() {
    this._loginService.validarToken(this.token).subscribe(
      (data) => {
        //debugger;
        this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {

        Swal.fire({
          icon: 'error',
          title: 'Dirección inexistente',
          text: '',
          showCancelButton: false,
          showDenyButton: false,
        });

        this.router.navigateByUrl('/inicio');

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            break;
          case 409:
            break;
        }

      }
    );
  }

  restablecerPassword() {
    //console.log(this.formaRestablecer);
    //debugger;
    if (this.formaRestablecer.invalid) {
      return Object.values(this.formaRestablecer.controls).forEach(
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
    } else if(this.passwordsDiferentes){
      return;
    } 
    else {

      //Envio de la informacion al servidor
      this._loginService.restablecerPassword(this.token, this.formaRestablecer.get('password1')?.value).subscribe(
        (data) => {
          //debugger;
          //console.log('datos: ', data);

          Swal.fire({
            icon: 'success',
            title: 'Su password ha sido restablecido de manera exitosa.',
            text: '',
            showCancelButton: false,
            showDenyButton: false,
          });

          this.router.navigateByUrl('/iniciarsesion');
          
        },
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 401:
              break;
            case 403:
              break;
            case 404:
              break;
            case 409:
              break;
          }

        }
      );
    }
  }

  limpiarFormulario() {
    // Reseteo de la información
    this.formaRestablecer.reset({
      password1: '',
      password2: ''
    });
  }

  get password1NoValido() {
    return ( this.formaRestablecer.get('password1')?.invalid && this.formaRestablecer.get('password1')?.touched );
  }

  get password2NoValido() {
    return ( this.formaRestablecer.get('password2')?.invalid && this.formaRestablecer.get('password2')?.touched );
  }

  get passwordsDiferentes() {
    return (this.formaRestablecer.get('password1')?.value != this.formaRestablecer.get('password2')?.value);
  }

}