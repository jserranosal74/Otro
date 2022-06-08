import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PaquetesService } from '../../../Services/Catalogos/paquetes.service';
import { PaquetesEmpresasService } from 'src/app/Services/Catalogos/paquetesEmpresas.service';

import { plancliente } from 'src/app/Models/procesos/plancliente.model';
import { paquete } from 'src/app/Models/catalogos/paquetes.model';
import { paqueteEmpresa } from '../../../Models/catalogos/paquetesempresas.model';
import { empresa } from 'src/app/Models/catalogos/empresa.model';
import { EmpresasService } from '../../../Services/Catalogos/empresa.service';

@Component({
  selector: 'app-asignarpaqueteacliente',
  templateUrl: './asignarpaqueteacliente.component.html',
  styleUrls: ['./asignarpaqueteacliente.component.css']
})
export class AsignarPaqueteAClienteComponent implements OnInit {
  formaCliente = this.fb.group({});
  formaPaqueteEmpresa = this.fb.group({});

  _paquetes : paquete[] = [];
  _paquete : paquete = new paquete(0,'',0,'','',null,null,[],new Date(),new Date(),0,0,0);
  _planCliente : plancliente = new plancliente(0,0,0,null,'',0,0,0,0,'',new Date(),null,null,null,null,new Date(),new Date(),0,'',0,false);
  _paquetesEmpresas : paqueteEmpresa[] = [];
  _paqueteEmpresa! : paqueteEmpresa;
  _empresas : empresa[] = [];
  _empresasModal : empresa[] = [];
  _empresa! : empresa;
  _empresaModal! : empresa;
  _paqueteSeleccionado! : paquete;

  @ViewChild('MyModalPaquete') modalPaquete : any;
  @ViewChild('myModalClose') modalCerrar : any;

  constructor(  private fb: FormBuilder,
                private _paquetesService: PaquetesService,
                private _paquetesEmpresasService: PaquetesEmpresasService,
                private _loginService : LoginService,
                private _empresasService : EmpresasService
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerEmpresas();
    this.obtenerPaquetes();
    this.obtenerPaquetesEmpresas();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaCliente = this.fb.group({
      empresa : ['', Validators.required]
    });
    this.formaPaqueteEmpresa = this.fb.group({
      empresaModal : ['', Validators.required]
    });
    this._paquete  = new paquete(0,'',0,'','',null,null,[],new Date(),new Date(),0,0,0);
  }

  limpiarFormulario() {
    this.formaCliente.reset({
      empresa : ''
    });
    this.formaPaqueteEmpresa.reset({
      empresaModal : ''
    });
    this._paquete  = new paquete(0,'',0,'','',null,null,[],new Date(),new Date(),0,0,0);
  }

  obtenerEmpresas() {
    //this._id_Empresa = this._loginService.obtenerIdCliente();

    this._empresasService.getEmpresas().subscribe(
      (data) => {

        this._empresas = data;
        this._empresa = this._empresas[0];
        this._empresasModal = data;
        this._empresaModal = this._empresasModal[0];

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

  obtenerPaquetes() {
    this._paquetesService.getPaquetes().subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        data.forEach( item =>{
            item.Seleccionado = 0;
        });

        this._paquetes = data;

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

  obtenerPaquetesEmpresas() {
    //debugger;
    this._paquetesEmpresasService.getPaquetesEmpresas( this.formaCliente.get('empresa')?.value === '' ? null : this.formaCliente.get('empresa')?.value).subscribe(
      (data) => {
        //Next callback
       
        this._paquetesEmpresas = data;

      },
      (error: HttpErrorResponse) => {

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            this._paquetesEmpresas = [];
            break;
          case 409:
            break;
        }

      }
    );
  }

  // agregarPaqueteAEmpresa(){

  //   if (this.formaCliente.invalid) {
  //     return Object.values(this.formaCliente.controls).forEach((control) => {
  //       if (control instanceof FormGroup) {
  //         Object.values(control.controls).forEach((control) =>
  //           control.markAsTouched()
  //         );
  //       } else {
  //         control.markAsTouched();
  //       }
  //     });
  //   } else {

  //     if(this._empresa.Id_Empresa != null){
  //         this.modalPaquete.nativeElement.click();
  //       }
  //       else{
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Seleccione la empresa a asignar. Verifique.',
  //           showCancelButton: false,
  //           showDenyButton: false,
  //         });
  //       }

  //   }
  // }

  buscarPaquetes(){

    if (this.formaCliente.invalid) {
      return Object.values(this.formaCliente.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    } else {

     this.obtenerPaquetesEmpresas();

    }
  }

  // obtenerCliente() {
  //   //let Id_Usuario = this._loginService.obtenerIdCliente();

  //   this._clienteService.getCliente(null, this.formaCliente.get('email')?.value).subscribe(
  //     (data) => {
  //       //Next callback
  //       this._cliente = data;

  //       if(data.Id_Empresa != null){
  //         this.modalPaquete.nativeElement.click();
  //       }
  //       else{
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'El cliente no se encuentra asignado a ninguna empresa ' + this.formaCliente.get('email')?.value + '. Verifique.',
  //           showCancelButton: false,
  //           showDenyButton: false,
  //         });
  //       }

  //       //this.modalFacturas.nativeElement.click();

  //     },
  //     (error: HttpErrorResponse) => {

  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Al parecer el cliente con correo ' + this.formaCliente.get('email')?.value + ' no existe. Verifique.',
  //         showCancelButton: false,
  //         showDenyButton: false,
  //       });

  //       switch (error.status) {
  //         case 401:
  //           break;
  //         case 403:
  //           break;
  //         case 404:
  //           break;
  //         case 409:
  //           break;
  //       }
  //     }
  //   );
  // }

  seleccionarPaqueteCliente(objPaqueteSeleccionado : paquete){
    //debugger;
    this._paquetes.forEach(item => {
        item.Seleccionado = 0;
    });
    this._paqueteSeleccionado = objPaqueteSeleccionado;
    this._paqueteSeleccionado.Seleccionado = 1;
  }

  eliminarPaqueteEmpresa(objPaqueteEmpresa : paqueteEmpresa){

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar la asignación: "' + objPaqueteEmpresa.Id_Paquete + '-' + objPaqueteEmpresa.Id_Empresa  + '"?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
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

        this._paquetesEmpresasService.deletePaqueteEmpresa(objPaqueteEmpresa.Id_Paquete, objPaqueteEmpresa.Id_Empresa).subscribe(
          (data) => {
            //Next callback
            
            Swal.fire({
              icon: 'success',
              title: 'La asignación fue eliminada.',
              showConfirmButton: false,
              timer: 1500
            })

            this.obtenerPaquetesEmpresas();

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

  guardarPaqueteEmpresa(){

    if (this.formaPaqueteEmpresa.invalid) {
      return Object.values(this.formaPaqueteEmpresa.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    } else {
debugger;
      if(this._empresaModal.Id_Empresa != null){
        this._paquetesEmpresasService.putPaqueteEmpresa(new paqueteEmpresa(this._paqueteSeleccionado.Id_Paquete, '', 0, this.formaPaqueteEmpresa.get('empresaModal')?.value,'',new Date(),new Date(),0,0,0) ).subscribe(
          (data) => {
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
    
            Toast.fire({
              icon: 'success',
              title: 'Paquete asignado de manera correcta.'
            });
    
            this.modalCerrar.nativeElement.click();
    
            this.obtenerPaquetesEmpresas();
    
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
        else{
          Swal.fire({
            icon: 'error',
            title: 'Seleccione la empresa a asignar. Verifique.',
            showCancelButton: false,
            showDenyButton: false,
          });
        }

    }
  }

  // enviarCorreo(objplanCliente : plancliente){
  //   //debugger;
  //   objplanCliente.Enviando = true;
  //   this._planClienteService.putEnviarCorreo(objplanCliente.Id_Cliente, objplanCliente.Id_PlanCliente, ( objplanCliente.Id_Publicacion === 0 ? null : objplanCliente.Id_Publicacion ) ).subscribe(
  //     (data) => {
  //       //console.log('datos: ',data);
  //       objplanCliente.Enviando = false;
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: 'top-end',
  //         showConfirmButton: false,
  //         timer: 2000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.addEventListener('mouseenter', Swal.stopTimer)
  //           toast.addEventListener('mouseleave', Swal.resumeTimer)
  //         }
  //       });

  //       Toast.fire({
  //         icon: 'success',
  //         title: 'La información ha sido enviada a su cuenta de correo, revise por favor.'
  //       });

  //     },
  //     (error: HttpErrorResponse) => {
  //       //Error callback
  //       objplanCliente.Enviando = false;
  //       switch (error.status) {
  //         case 401:
  //           break;
  //         case 403:
  //           break;
  //         case 404:
  //           break;
  //         case 409:
  //           break;
  //       }

  //     }
  //   );
  // }

  // get emailNoValido() {
  //   return ( this.formaCliente.get('email')?.invalid && this.formaCliente.get('email')?.touched );
  // }

}