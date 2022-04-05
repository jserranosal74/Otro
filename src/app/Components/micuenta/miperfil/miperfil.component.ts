import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';
import { cliente } from 'src/app/Models/catalogos/cliente.model';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css'],
})
export class MiperfilComponent implements OnInit {
  formaPerfil = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    correo: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    rfc: ['', Validators.required],
    telefono: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
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
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      rfc: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  limpiarFormulario() {
    // Reseteo de la información
    this.formaPerfil.reset({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      rfc: ['', Validators.required],
      telefono: ['', Validators.required],
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

      let _cliente = new cliente(
        0,
        1,
        2, //Rol
        this.formaPerfil.get('correo')?.value,
        this.formaPerfil.get('password1')?.value,
        '',
        '',
        '',
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

      this._clienteService.postCliente(_cliente).subscribe(
        (data) => {
          //Next callback
          //console.log('datos: ',data);

          // Swal.fire({
          //   icon: 'success',
          //   title: 'Gracias por registrarse!!!!',
          //   text: 'Revise su correo por favor para activar su cuenta.',
          //   showCancelButton: false,
          //   showDenyButton: false,
          // });

          this.limpiarFormulario();
        },
        (error: HttpErrorResponse) => {
          //Error callback
          //console.log('Error del servicio: ', error.error['Descripcion']);

          Swal.fire({
            icon: 'error',
            title: error.error['Descripcion'],
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

  obtenerDatosPerfil() {
    let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._clienteService.getCliente(Id_Usuario).subscribe(
      (data) => {
        //Next callback
        console.log('datos: ', data);

        this.formaPerfil.setValue({
          nombre: data.Nombre,
          apellidos: data.Apellidos,
          correo: data.Email,
          rfc: data.RFC,
          telefono: data.Nombre,
        });

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
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

  get nombreNoValido() {
    return (
      this.formaPerfil.get('nombre')?.invalid &&
      this.formaPerfil.get('nombre')?.touched
    );
  }

  get apellidoNoValido() {
    return (
      this.formaPerfil.get('apellidos')?.invalid &&
      this.formaPerfil.get('apellidos')?.touched
    );
  }

  get correoNoValido() {
    return (
      this.formaPerfil.get('correo')?.invalid &&
      this.formaPerfil.get('correo')?.touched
    );
  }

  get rfcNoValido() {
    return (
      this.formaPerfil.get('rfc')?.invalid &&
      this.formaPerfil.get('rfc')?.touched
    );
  }

  get telefonoNoValido() {
    return (
      this.formaPerfil.get('telefono')?.invalid &&
      this.formaPerfil.get('telefono')?.touched
    );
  }
}
