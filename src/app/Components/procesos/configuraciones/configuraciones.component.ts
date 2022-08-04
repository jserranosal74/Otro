import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { ConfiguracionService } from 'src/app/Services/Catalogos/configuracion.service';
import { configuracion } from '../../../Models/catalogos/condiguracion.model';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {
  formaConfiguracion = this.fb.group({});

  _configuraciones : configuracion[] = [];
  _configuracion : configuracion = new configuracion(0,'',0,'',new Date(),new Date(),0,0);
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;

  constructor( private fb: FormBuilder,
               private _configuracionService: ConfiguracionService,
               private _loginService : LoginService,
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerConfiguraciones();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaConfiguracion = this.fb.group({
      configuracion : ['', Validators.required],
      valor         : ['', Validators.required],
      descripcion   : ['', Validators.required]
    });
    this._configuracion = new configuracion(0,'',0,'',new Date(),new Date(),0,0);
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    this.formaConfiguracion.reset({
      configuracion : '',
      valor         : '',
      descripcion   : ''
    });
    this._configuracion = new configuracion(0,'',0,'',new Date(),new Date(),0,0);
  }

  obtenerConfiguraciones() {
    // let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];

    this._configuracionService.getConfiguracion(null).subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        this._configuraciones = data;

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        // Swal.fire({
        //   icon: 'error',
        //   title: error.error['Descripcion'],
        //   text: 'Error al cargar las inmobiliarias',
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
            //console.log('error 404');
            break;
          case 409:
            //console.log('error 409');
            break;
        }

      }
    );
  }

  obtenerCaracteristica(objConfiguracion : configuracion) {
    this._textoAccion = 'Modificar';
    this._configuracion = objConfiguracion;
    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];

    this._configuracionService.getConfiguracion(objConfiguracion.Id_Configuracion).subscribe(
      (data) => {
        //Next callback
        //console.log('datosxxx: ', data);

        this.formaConfiguracion.patchValue({
          configuracion : data[0].Configuracion,
          valor         : data[0].Valor,
          descripcion   : data[0].Descripcion
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

  guardarConfiguracion(){

    if (this.formaConfiguracion.invalid) {
      return Object.values(this.formaConfiguracion.controls).forEach((control) => {
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

      if (this._configuracion.Id_Configuracion != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._configuracion.Configuracion = this.formaConfiguracion.get('configuracion')?.value;
      this._configuracion.Valor = this.formaConfiguracion.get('valor')?.value;
      this._configuracion.Descripcion = this.formaConfiguracion.get('descripcion')?.value;

      if (this._esNuevo){
        this._configuracion.Id_Configuracion = 0;
        this._configuracionService.postConfiguracion(this._configuracion).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'La configuración se agregó de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerConfiguraciones();
  
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
      else{
        this._configuracionService.putConfiguracion(this._configuracion).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'La configuración se modificó de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerConfiguraciones();
  
            this.limpiarFormulario();
          },
          (error: HttpErrorResponse) => {
            //Error callback
            //console.log('Error del servicio: ', error.error['Descripcion']);
  
            // Swal.fire({
            //   icon: 'error',
            //   title: 'ERROR',
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
    }
  }

  eliminarCaracteristica(objConfiguracion : configuracion) {
    // this._textoAccion = 'Eliminar';
    this._configuracion = objConfiguracion;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar la configuración: <strong>' + objConfiguracion.Descripcion + '</strong>?',
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

        this._configuracionService.deleteConfiguracion(objConfiguracion.Id_Configuracion).subscribe(
          (data) => {
            //Next callback
            
            Swal.fire({
              icon: 'success',
              title: 'La configuración <strong>' + objConfiguracion.Descripcion + '</strong> fue eliminada.',
              showConfirmButton: false,
              timer: 1000
            })
    
            this.obtenerConfiguraciones();
    
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
    
            //throw error;   //You can also throw the error to a global error handler
          }
        );

        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  get configuracionNoValido() {
    return ( this.formaConfiguracion.get('configuracion')?.invalid && this.formaConfiguracion.get('configuracion')?.touched );
  }
      
  get valorNoValido() {
    return ( this.formaConfiguracion.get('valor')?.invalid && this.formaConfiguracion.get('valor')?.touched );
  }

  get descripcionNoValido() {
    return ( this.formaConfiguracion.get('descripcion')?.invalid && this.formaConfiguracion.get('descripcion')?.touched );
  }

}