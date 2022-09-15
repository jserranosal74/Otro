import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { DatosFiscalesService } from '../../../Services/Procesos/datosFiscales.service';
import { datoFiscal } from '../../../Models/procesos/datosFiscales.model';
import { tipoPersona } from '../../../Models/catalogos/tipoPersona.model';
import { TiposPersonaService } from 'src/app/Services/Catalogos/tiposPersonas.service';

@Component({
  selector: 'app-misdatosfiscales',
  templateUrl: './misdatosfiscales.component.html',
  styleUrls: ['./misdatosfiscales.component.css']
})
export class MisDatosFiscalesComponent implements OnInit {
  _datosFiscales : datoFiscal[] = [];
  _datoFiscal : datoFiscal = new datoFiscal(0,0,null,0,'','','','','',0,new Date(),new Date(), 0,0,0);
  _tiposPersonas : tipoPersona[] = [];
  _tipoPersona : tipoPersona = new tipoPersona(0,'',new Date(), new Date(), 0,0,);
  _textoAccion = '';
  _cargandoInformacion : boolean = false;
  _tamanioRFC = 0;

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;

  formaDatosFiscales = this.fb.group({});

  constructor( private fb: FormBuilder,
               private _loginService : LoginService,
               private _datosfiscalesService : DatosFiscalesService,
               private _tiposPersonaService : TiposPersonaService
  ) {
    this._cargandoInformacion = true;
    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerDatosFiscales();
    this.obtenerTiposPersonas();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaDatosFiscales = this.fb.group({
      tipopersona       : [ '', Validators.required],
      nombrerazonsocial : [ '', Validators.required],
      domiciliofiscal   : [ '', Validators.required],
      rfc               : [ '', Validators.required],
      email             : [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ],
      codigopostal      : [ '', Validators.required]
    });
    this._datoFiscal = new datoFiscal(0,0,null,0,'','','','','',0,new Date(),new Date(),0,0,0);
  }

  limpiarFormulario() {
    this.formaDatosFiscales.reset({
      tipopersona       : '',
      nombrerazonsocial : '',
      domiciliofiscal   : '',
      rfc               : '',
      email             : '',
      codigopostal      : ''
    });
    this._datoFiscal = new datoFiscal(0,0,null,0,'','','','','',0,new Date(),new Date(), 0,0,0);
    this._textoAccion = 'Agregar'
  }

  obtenerTiposPersonas() {
    //debugger;
    this._tiposPersonaService.getTiposPersonas().subscribe(
      (data) => {
        //Next callback
        this._tiposPersonas = data;

        this._cargandoInformacion = false;
      },
      (error: HttpErrorResponse) => {
        
        this._cargandoInformacion = false;

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

      }
    );
  }

  obtenerDatosFiscales() {

    this._datosfiscalesService.getDatosFiscalesCliente(this._loginService.obtenerIdCliente()!).subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        this._datosFiscales = data;

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback

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

  obtenerDatoFiscal(objDatoFiscal : datoFiscal) {
    this._textoAccion = 'Modificar';
    this._datoFiscal = objDatoFiscal;
    //debugger;
        this._datosfiscalesService.getDatoFiscalCliente(this._loginService.obtenerIdCliente()!, objDatoFiscal.Id_DatosFiscales).subscribe(
      (data) => {
        //Next callback
        // console.log('datos: ', data);

        this.formaDatosFiscales.setValue({
          tipopersona       : data.Id_TipoPersona,
          nombrerazonsocial : data.NombreRazonSocial,
          domiciliofiscal   : data.DomicilioFiscal,
          rfc               : data.RFC,
          email             : data.Email,
          codigopostal      : data.CodigoPostal,
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

  guardarDatosFiscales(){

    if (this.formaDatosFiscales.invalid) {
      return Object.values(this.formaDatosFiscales.controls).forEach((control) => {
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

      if (this._datoFiscal.Id_DatosFiscales != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._datoFiscal.UID_Cliente = this._loginService.obtenerIdCliente();
      this._datoFiscal.Id_TipoPersona = this.formaDatosFiscales.get('tipopersona')?.value;
      this._datoFiscal.NombreRazonSocial = this.formaDatosFiscales.get('nombrerazonsocial')?.value;
      this._datoFiscal.DomicilioFiscal = this.formaDatosFiscales.get('domiciliofiscal')?.value;
      this._datoFiscal.RFC = this.formaDatosFiscales.get('rfc')?.value;
      this._datoFiscal.Email = this.formaDatosFiscales.get('email')?.value;
      this._datoFiscal.CodigoPostal = this.formaDatosFiscales.get('codigopostal')?.value;
      this._datoFiscal.FechaAlta = new Date();
      this._datoFiscal.FechaModificacion = new Date();
      this._datoFiscal.Id_Usuario = 1;
      this._datoFiscal.Id_Estatus = 1;

      if (this._esNuevo){
        this._datoFiscal.Id_DatosFiscales = 0;

        if(this._datosFiscales.length === 0){
          this._datoFiscal.Predeterminada = 1;
        }
        
        this._datosfiscalesService.postDatosFiscales(this._datoFiscal).subscribe(
          (data) => {
            //Next callback
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
            
            Toast.fire({
              icon: 'success',
              title: 'La información se guardó de manera correcta.'
            });
  
            this.modalClose.nativeElement.click();
  
            this.obtenerDatosFiscales();
  
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
  
          }
        );
      }
      else{
        this._datosfiscalesService.putDatosFiscales(this._datoFiscal).subscribe(
          (data) => {
            //Next callback
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
            
            Toast.fire({
              icon: 'success',
              title: 'La información se actualizó de manera correcta.'
            });
  
            this.modalClose.nativeElement.click();
  
            this.obtenerDatosFiscales();
  
            this.limpiarFormulario();
          },
          (error: HttpErrorResponse) => {
            //Error callback
            //console.log('Error del servicio: ', error.error['Descripcion']);
  
            Swal.fire({
              icon: 'error',
              title: 'ERROR',
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
  
          }
        );
      }
    }
  }

  actualizarPredeterminado(objDatoFiscal : datoFiscal){

    this._datosFiscales.forEach(item => {
      if ((item.Predeterminada === 1) && (objDatoFiscal.Predeterminada != 1)){
        item.Predeterminada = 0;
        this._datosfiscalesService.putDatosFiscales(item).subscribe(
          (data) => {

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
    });

    objDatoFiscal.Predeterminada = 1;
    this._datosfiscalesService.putDatosFiscales(objDatoFiscal).subscribe(
      (data) => {

        this.obtenerDatosFiscales();

        this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback
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

  eliminarDatosFiscales(objDatoFiscal : datoFiscal) {
    
    this._datoFiscal = objDatoFiscal;

    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que desea eliminar el dato fiscal: "' + objDatoFiscal.NombreRazonSocial + '"?',
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


        this._datosfiscalesService.deleteDatosFiscales(this._loginService.obtenerIdCliente()!, objDatoFiscal.Id_DatosFiscales).subscribe(
          (data) => {
            //Next callback
            
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
    
            Toast.fire({
              icon: 'success',
              title: 'El dato fiscal fue eliminado.'
            });
    
            this.obtenerDatosFiscales();
    
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
                //console.log('error 401');
                break;
              case 403:
                //console.log('error 403');
                break;
              case 404:

                Swal.fire({
                icon: 'error',
                title: 'La información fiscal no se puede eliminar',
                text: 'Primero elimine el plan o paquete que tiene pendiente de pagar.',
                showCancelButton: false,
                showDenyButton: false,
              });
        
                break;
              case 409:
                //console.log('error 409');
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

  get nombreNoValido() {
    return ( this.formaDatosFiscales.get('nombrerazonsocial')?.invalid && this.formaDatosFiscales.get('nombrerazonsocial')?.touched );
  }
  
  get domiciliofiscalNoValido() {
    return ( this.formaDatosFiscales.get('domiciliofiscal')?.invalid && this.formaDatosFiscales.get('domiciliofiscal')?.touched );
  }
  
  get rfcNoValido() {
    return ( this.formaDatosFiscales.get('rfc')?.invalid && this.formaDatosFiscales.get('rfc')?.touched );
    }

  get correoNoValido() {
      return ( this.formaDatosFiscales.get('email')?.invalid && this.formaDatosFiscales.get('email')?.touched );
    }
    
  get telefonoNoValido() {
    return ( this.formaDatosFiscales.get('telefono')?.invalid && this.formaDatosFiscales.get('telefono')?.touched );
  }

  get tipopersonaNoValido() {
    return ( this.formaDatosFiscales.get('tipopersona')?.invalid && this.formaDatosFiscales.get('tipopersona')?.touched );
  }

  get codigopostalNoValido() {
    return ( this.formaDatosFiscales.get('codigopostal')?.invalid && this.formaDatosFiscales.get('codigopostal')?.touched );
  }

  establecerRFC(){
    //debugger;
    let _rfc = '';
    _rfc = this.formaDatosFiscales.get('rfc')?.value;
    if (this.formaDatosFiscales.get('tipopersona')?.value === '1')
    {
      this._tamanioRFC = 12     // Persona moral
      this.formaDatosFiscales.patchValue({
        rfc : _rfc.substring(0,12)
      });
    }
    else
      this._tamanioRFC = 13    // Persona fisica
  }

}
