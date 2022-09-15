import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ClientesService } from '../../Services/Catalogos/clientes.service';
import { cliente } from 'src/app/Models/catalogos/cliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  obtenerTipo = 'password';
  soypropietario = '';
  _soyAgente = '';

  formLogin = this.fb.group({
    correo: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    password1: ['', Validators.required],
    password2: ['', Validators.required]
  });

  constructor( private router : Router,
               private fb: FormBuilder,
               private _clienteService: ClientesService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  crearFormulario() {
    this.formLogin = this.fb.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  guardarRegistro() {
  debugger;

  let tipoCliente = 2;
  if (this._soyAgente){
    tipoCliente = 3;
  }

    if (this.formLogin.invalid) {
      return Object.values(this.formLogin.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    } else if(this.passwordsDiferentes){
      return;
    }  
    else {
      //Envio de la informacion al servidor

      let _cliente = new cliente(
        0,
        null,
        1,    //1 = InmueblesMeza, 2 = Externo
        1,
        tipoCliente,
        null,
        1,
        this.formLogin.get('correo')?.value,
        this.formLogin.get('password1')?.value,
        '',
        '',
        '',
        [],
        '',
        0,
        0,
        0,
        '',
        '',
        new Date(),
        new Date(),
        new Date(),
        1,
        '',
        1,
        ''
      );
  
      //debugger;

      this._clienteService.postCliente(_cliente).subscribe(
        (data) => {
          //Next callback
          console.log('datos: ',data);

          Swal.fire({
            icon: 'success',
            title: 'Gracias por registrarse!!!!',
            text: 'Revise su correo por favor para activar su cuenta.',
            showCancelButton: false,
            showDenyButton: false,
          });

          this.limpiarFormulario();

          this.router.navigateByUrl('/inmobiliaria/iniciarsesion');

        },
        (error: HttpErrorResponse) => {
          //Error callback
          //console.log('Error del servicio: ', error.error['Descripcion']);

          Swal.fire({
            icon: 'error',
            title: error.error,
            text: '',
            showCancelButton: false,
            showDenyButton: false,
          });
          
          switch (error.status) {
            case 401:
                //console.log('error 401');
                break;
            case 403:
                //console.log('error 403');
                break;
            case 404:
                //console.log('error 404');
                break;
            case 409:
                //console.log('error 409');
                break;
        }

          //throw error;   //You can also throw the error to a global error handler
        }
      );

    }

    
  }

  limpiarFormulario(){
    // Reseteo de la información
    this.formLogin.reset({
      correo    : '',
      password1 : '',
      password2 : '',
      soyagente : false
    });
  }

  get correoNoValido() {
    return (this.formLogin.get('correo')?.invalid && this.formLogin.get('correo')?.touched);
  }

  get password1NoValido() {
    return (this.formLogin.get('password1')?.invalid && this.formLogin.get('password1')?.touched);
  }

  get password2NoValido() {
    return (this.formLogin.get('password2')?.invalid && this.formLogin.get('password2')?.touched);
  }

  get passwordsDiferentes() {
    return (this.formLogin.get('password1')?.value != this.formLogin.get('password2')?.value);
  }

  cambiarTipo(){
    if (this.obtenerTipo === 'password'){
      this.obtenerTipo = 'text';
    }
    else{
      this.obtenerTipo = 'password';
    }
    
  }

}
