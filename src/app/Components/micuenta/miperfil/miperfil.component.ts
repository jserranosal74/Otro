import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ClientesService } from '../../../../app/Services/Catalogos/clientes.service';
import { cliente, clienteMedioContacto } from '../../../../app/Models/catalogos/cliente.model';
import { LoginService } from '../../../Services/Catalogos/login.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css'],
})
export class MiperfilComponent implements OnInit {
  formaPerfil = new FormGroup({});
_clienteMedioContacto : clienteMedioContacto[] = [];

  // formaPerfil = this.fb.group({
  //   nombre: ['', Validators.required],
  //   apellidos: ['', Validators.required],
  //   correo: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
  //     ],
  //   ],
  //   rfc: ['', Validators.required],
  //   telefono: ['', Validators.required],
  // });

  constructor(  private fb: FormBuilder,
                private _loginService : LoginService,
                private _clienteService: ClientesService
  ) {
    this.crearFormulario();
    this.obtenerDatosPerfil();
  }

  ngOnInit(): void {}

  crearFormulario() {
    this.formaPerfil = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ],
      rfc: ['', Validators.required],
      telefonoFijo: ['', Validators.required],
      telefonoMovil: ['', Validators.required],
    });
  }

  limpiarFormulario() {
    // Reseteo de la información
    this.formaPerfil.reset({
      nombre    : '',
      apellidos : '',
      correo    : '',
      rfc       : '',
      telefonoFijo  : '',
      telefonoMovil : ''
    });
  }

  guardarPerfil() {
    //debugger;
    if (this.formaPerfil.invalid) {
      return Object.values(this.formaPerfil.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    } else {
      //Envio de la informacion al servidor

      this._clienteMedioContacto.push(new clienteMedioContacto(1,this._loginService.obtenerIdCliente(),this.formaPerfil.get('telefonoFijo')?.value));
      this._clienteMedioContacto.push(new clienteMedioContacto(2,this._loginService.obtenerIdCliente(),this.formaPerfil.get('telefonoMovil')?.value));

      let _cliente = new cliente(
        this._loginService.obtenerIdCliente(),
        null,  // Tipo persona Cliente- Agente
        0,  // Rol
        null,
        1,
        this.formaPerfil.get('correo')?.value,
        '',
        this.formaPerfil.get('nombre')?.value,
        this.formaPerfil.get('apellidos')?.value,
        this.formaPerfil.get('rfc')?.value,
        this._clienteMedioContacto,
        '',
        0,
        0,
        0,
        '',
        '',
        new Date(),
        new Date(),
        1,
        1
      );

      this._clienteService.putCliente(_cliente).subscribe(
        (data) => {
          //Next callback

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          
          if (data === 1){
            Toast.fire({
              icon: 'success',
              title: 'La información se guardo de manera correcta.'
            });
          }
          else{
            Toast.fire({
              icon: 'error',
              title: 'Ocurrio un error al intentar guardar la información'
            });
          }

        },
        (error: HttpErrorResponse) => {
          //Error callback
          //console.log('Error del servicio: ', error.error['Descripcion']);

          // Swal.fire({
          //   icon: 'error',
          //   title: error.error['Descripcion'],
          //   text: '',
          //   showCancelButton: false,
          //   showDenyButton: false,
          // });

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

          //throw error;   //You can also throw the error to a global error handler
        }
      );
    }
  }

  obtenerDatosPerfil() {
    let Id_Usuario = this._loginService.obtenerIdCliente();

    this._clienteService.getCliente(Id_Usuario).subscribe(
      (data) => {
        //Next callback
        console.log('datos: ', data);

        this.formaPerfil.setValue({
          nombre: data.Nombre,
          apellidos: data.Apellidos,
          correo: data.Email,
          rfc: data.RFC,
          telefonoFijo: data.ClienteMedioContacto != null ? data.ClienteMedioContacto![0].Descripcion : '',
          telefonoMovil: data.ClienteMedioContacto != null ? data.ClienteMedioContacto![1].Descripcion : '',
        });

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        // Swal.fire({
        //   icon: 'error',
        //   title: error.error['Descripcion'],
        //   text: '',
        //   showCancelButton: false,
        //   showDenyButton: false,
        // });

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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  get nombreNoValido() {
    return ( this.formaPerfil.get('nombre')?.invalid && this.formaPerfil.get('nombre')?.touched );
  }

  get apellidoNoValido() {
    return ( this.formaPerfil.get('apellidos')?.invalid && this.formaPerfil.get('apellidos')?.touched );
  }

  get correoNoValido() {
    return ( this.formaPerfil.get('correo')?.invalid && this.formaPerfil.get('correo')?.touched );
  }

  get rfcNoValido() {
    return ( this.formaPerfil.get('rfc')?.invalid && this.formaPerfil.get('rfc')?.touched );
  }

  get telefonoFijoNoValido() {
    return ( this.formaPerfil.get('telefonoFijo')?.invalid && this.formaPerfil.get('telefonoFijo')?.touched );
  }

  get telefonoMovilNoValido() {
    return ( this.formaPerfil.get('telefonoMovil')?.invalid && this.formaPerfil.get('telefonoMovil')?.touched );
  }
}
