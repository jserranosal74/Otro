import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { TiposAsentamientoService } from '../../../Services/Catalogos/tiposAsentamiento.service';
import { tipoAsentamiento } from '../../../Models/catalogos/tipoAsentamiento.model';

@Component({
  selector: 'app-tiposasentamiento',
  templateUrl: './tiposasentamiento.component.html',
  styleUrls: ['./tiposasentamiento.component.css']
})
export class TiposasentaientoComponent implements OnInit {
  _tiposAsentamiento : tipoAsentamiento[] = [];
  _tipoAsentamiento : tipoAsentamiento = new tipoAsentamiento(0,'','',new Date(),new Date(),0,0);
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;
  // @ViewChild('descripcion') modaldescripcion : any;
  // @ViewChild('verformaAmenidad') modalformaAmenidad : any;

  formaTipoAsentamiento = this.fb.group({
    clave: ['', Validators.required],
    descripcion: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private _tiposAsentamientoService: TiposAsentamientoService,
    private _loginService : LoginService,
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerTiposAsentamiento();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaTipoAsentamiento = this.fb.group({
      clave: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this._tipoAsentamiento = new tipoAsentamiento(0,'','',new Date(),new Date(),0,0);
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    this.formaTipoAsentamiento.reset({
      clave: '',
      descripcion: ''
    });
    this._tipoAsentamiento = new tipoAsentamiento(0,'','',new Date(),new Date(),0,0);
  }

  obtenerTiposAsentamiento() {
    let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._tiposAsentamientoService.getTiposAsentamientos().subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        this._tiposAsentamiento = data;

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: 'Error al cargar las inmobiliarias',
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

  obtenerTipoAsentamiento(objTipoAsentamiento : tipoAsentamiento) {
    this._textoAccion = 'Modificar';
    this._tipoAsentamiento = objTipoAsentamiento;

    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._tiposAsentamientoService.getTipoAsentamiento(objTipoAsentamiento.Id_TipoAsentamiento).subscribe(
      (data) => {
        //Next callback
        console.log('datos: ', data);

        this.formaTipoAsentamiento.setValue({
          clave: data.Clave,
          descripcion: data.Descripcion
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

  guardarTipoAsentamiento(){

    if (this.formaTipoAsentamiento.invalid) {
      return Object.values(this.formaTipoAsentamiento.controls).forEach((control) => {
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

      if (this._tipoAsentamiento.Id_TipoAsentamiento != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._tipoAsentamiento.Clave = this.formaTipoAsentamiento.get('clave')?.value;
      this._tipoAsentamiento.Descripcion = this.formaTipoAsentamiento.get('descripcion')?.value;
      this._tipoAsentamiento.FechaAlta = new Date();
      this._tipoAsentamiento.FechaModificacion = new Date();
      this._tipoAsentamiento.Id_Usuario = 1;
      this._tipoAsentamiento.Id_Estatus = 1;

      if (this._esNuevo){
        this._tipoAsentamiento.Id_TipoAsentamiento = 0;
        this._tiposAsentamientoService.postTipoAsentamiento(this._tipoAsentamiento).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'El tipo de asentamiento se agrego de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerTiposAsentamiento();
  
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
        this._tiposAsentamientoService.putTipoAsentamiento(this._tipoAsentamiento).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'El tipo de asentamiento se modificó de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerTiposAsentamiento();
  
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

  eliminarTipoAsentamiento(objTipoAsentamiento : tipoAsentamiento) {
    // this._textoAccion = 'Eliminar';
    this._tipoAsentamiento = objTipoAsentamiento;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar el tipo de asentamiento: "' + objTipoAsentamiento.Descripcion + '"?',
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

        this._tiposAsentamientoService.deleteTipoAsentamiento(objTipoAsentamiento.Id_TipoAsentamiento).subscribe(
          (data) => {
            //Next callback
            
            // Swal.fire('Los datos fiscales fueron eliminados', '', 'success')

            Swal.fire({
              icon: 'success',
              title: 'El tipo de asentamiento fue eliminado.',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerTiposAsentamiento();
    
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

  get descripcionNoValido() {
    return ( this.formaTipoAsentamiento.get('descripcion')?.invalid && this.formaTipoAsentamiento.get('descripcion')?.touched );
  }
      
  get claveNoValido() {
    return ( this.formaTipoAsentamiento.get('clave')?.invalid && this.formaTipoAsentamiento.get('clave')?.touched );
  }

}