import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from '../../../Services/Catalogos/login.service';
import { empresa, empresaCliente } from '../../../Models/catalogos/empresa.model';
import { EmpresaUsuariosService } from '../../../Services/Catalogos/empresaUsuariosService.service';
import { EmpresasService } from 'src/app/Services/Catalogos/empresa.service';

@Component({
  selector: 'app-usuariosempresa',
  templateUrl: './usuariosempresa.component.html',
  styleUrls: ['./usuariosempresa.component.css']
})
export class UsuariosempresaComponent implements OnInit {
  formaEmpresaUsuarios : FormGroup = new FormGroup({});

  _empresaClientes : empresaCliente[] = [];
  _email : string = '';
  _Id_Empresa : number = 0;
  _empresas : empresa[] = [];

  constructor(  private fb : FormBuilder,
                private _empresaUsuariosService : EmpresaUsuariosService,
                private _empresasService : EmpresasService,
                private _loginService : LoginService
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerEmpresaClientes();
    this.obtenerEmpresas();
  }

  ngOnInit(): void {
    //this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaEmpresaUsuarios = this.fb.group({
      email   : [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ],
      empresa : ['', Validators.required]
    });
  }

  limpiarFormulario() {
    this.formaEmpresaUsuarios.reset({
      email   : '',
      empresa : ''
    });
  }

  obtenerEmpresaClientes() {
    
    let Id_Empresa : number | null;

    Id_Empresa = this.formaEmpresaUsuarios.get('empresa')?.value;

    debugger;

    this._empresaUsuariosService.getEmpresaClientes(Id_Empresa).subscribe(
      (data) => {

        this._empresaClientes = data;

      },
      (error: HttpErrorResponse) => {
        //Error callback

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            Swal.fire({
              icon: 'error',
              title: 'No hay usuarios dados de alta.',
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
            this._empresaClientes = [];
            break;
          case 409:
            break;
        }

      }
    );
  }

  obtenerEmpresas() {
    //this._id_Empresa = this._loginService.obtenerIdCliente();

    this._empresasService.getEmpresas().subscribe(
      (data) => {

        this._empresas = data;

      },
      (error: HttpErrorResponse) => {
        //Error callback

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            Swal.fire({
              icon: 'error',
              title: 'No hay usuarios dados de alta.',
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
            break;
          case 409:
            break;
        }

      }
    );
  }

  asignarUsuarioAEmpresa(){

    //debugger;
    if (this.formaEmpresaUsuarios.invalid) {
      return Object.values(this.formaEmpresaUsuarios.controls).forEach((control) => {
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

      this._email = this.formaEmpresaUsuarios.get('email')?.value;
      this._Id_Empresa = this.formaEmpresaUsuarios.get('empresa')?.value;

      this._empresaUsuariosService.postEmpresaCliente(this._Id_Empresa, this._email).subscribe(
        (data) => {

          //console.log('datos: ',data);

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          
          switch (data) {
            case -2:
                Toast.fire({
                  icon: 'info',
                  title: 'El usario con correo <strong>' + this._email + '</strong> ya se encuentra dado de alta, en otra empresa.'
                });
              break;
            case -1:
                Toast.fire({
                  icon: 'info',
                  title: 'El usario con correo <strong>' + this._email + '</strong> ya se encuentra dado de alta.',
                });
              break;
            case 0:
                Swal.fire({
                  icon: 'error',
                  title: 'El usario <strong>' + this._email + '</strong> primero deberá de registrarse y activarse en el sistema.',
                  showConfirmButton: false,
                  timer: 1500
                });
              break;
            default:
                Swal.fire({
                  icon: 'success',
                  title: 'El usario con correo <strong>' + this._email + '</strong> se agregó de manera correcta.',
                  showConfirmButton: false,
                  timer: 1500
                });
              break;
          }
          
          this.limpiarFormulario();
          this.obtenerEmpresaClientes();
          
        },
        (error: HttpErrorResponse) => {
          //Error callback

          // Swal.fire({
          //   icon: 'error',
          //   title: error.error['Descripcion'],
          //   text: '',
          //   showCancelButton: false,
          //   showDenyButton: false,
          // });

          switch (error.status) {
            case 401:
              Swal.fire({
                icon: 'error',
                title: 'Acceso no autorizado',
                text: 'debera autenticarse',
                showCancelButton: false,
                showDenyButton: false,
              });
              //this._loginService.cerarSesion();
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

        }
      );
    }
  }

  eliminarEmpresaCliente(objEmpresaCliente : empresaCliente) {

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea quitar al usuario <strong>' + objEmpresaCliente.Email + '</strong>?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, quitar',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1',
        confirmButton: 'order-3',
        denyButton: 'order-2',
      },
      backdrop: ` rgba(128,128,128,0.4)
                  left top
                  no-repeat
                `
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this._empresaUsuariosService.deleteEmpresaCliente(objEmpresaCliente.Id_Empresa, objEmpresaCliente.Id_Cliente).subscribe(
          (data) => {
            //Next callback
            
            Swal.fire({
              icon: 'success',
              title: 'El usuario se quitó de la empresa.',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerEmpresaClientes();
    
          },
          (error: HttpErrorResponse) => {
            //Error callback
    
            Swal.fire({
              icon: 'error',
              title: error.error['Descripcion'],
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
    
            switch (error.status) {
              case 401:
                Swal.fire({
                  icon: 'error',
                  title: 'Acceso no autorizado',
                  text: 'debera autenticarse',
                  showCancelButton: false,
                  showDenyButton: false,
                });
                this._loginService.cerarSesion();
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

        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  get emailNoValido() {
    return (this.formaEmpresaUsuarios.get('email')?.invalid && this.formaEmpresaUsuarios.get('email')?.touched);
  }

}