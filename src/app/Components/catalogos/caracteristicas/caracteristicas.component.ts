import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { CaracteristicasService } from 'src/app/Services/Catalogos/caracteristicas.service';
import { caracteristica, tipoCaracteristica } from '../../../Models/catalogos/caracteristicas.model';
import { TipoCaracteristicaPipe }  from '../../../pipes/TipoCaracteristica.pipe'

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent implements OnInit {
  _caracteristicas : caracteristica[] = [];
  _caracteristica : caracteristica = new caracteristica(0,0,null,new Date(),new Date(),null,null);
  _tiposCaracteristicas : tipoCaracteristica[] = [];
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;
  // @ViewChild('descripcion') modaldescripcion : any;

  formaCaracteristica = this.fb.group({
    tipoCaracteristica: ['', Validators.required],
    descripcion: ['', Validators.required]
    // orden: ['', [Validators.required, Validators.pattern('[0-9]'),],]
  });

  constructor(
    private fb: FormBuilder,
    private _caracteristicasService: CaracteristicasService,
    private _loginService : LoginService,
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerCaracteristicas();
    this.obtenerTiposCaracteristicas();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaCaracteristica = this.fb.group({
      tipoCaracteristica: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this._caracteristica = new caracteristica(0,0,null,new Date(),new Date(),null,null);
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    this.formaCaracteristica.reset({
      tipoCaracteristica: '',
      descripcion: ''
    });
    this._caracteristica = new caracteristica(0,0,null,new Date(),new Date(),null,null);
  }

  obtenerCaracteristicas() {
    // let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];

    this._caracteristicasService.getCaracteristicas().subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        this._caracteristicas = data;

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

  obtenerTiposCaracteristicas(){

    this._caracteristicasService.getTipoCaracteristicas().subscribe(
      (data) => {
        //Next callback

        this._tiposCaracteristicas = data;

        this.formaCaracteristica.setValue({
          tipoCaracteristica: data[0].Id_TipoCaracteristica,
          descripcion: ''
        });

      },
      (error: HttpErrorResponse) => {
        //Error callback

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: 'Error al cargar los tipos de caracteristicas',
          showCancelButton: false,
          showDenyButton: false,
        });

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

  obtenerCaracteristica(objCaracteristica : caracteristica) {
    this._textoAccion = 'Modificar';
    this._caracteristica = objCaracteristica;
    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];

    this._caracteristicasService.getCaracteristica(objCaracteristica.Id_Caracteristica!,objCaracteristica.Id_TipoCaracteristica!).subscribe(
      (data) => {
        //Next callback
        console.log('datosxxx: ', data);

        this.formaCaracteristica.setValue({
          tipoCaracteristica : data.Id_TipoCaracteristica,
          descripcion : data.Descripcion
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

  guardarCaracteristica(){

    if (this.formaCaracteristica.invalid) {
      return Object.values(this.formaCaracteristica.controls).forEach((control) => {
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

      if (this._caracteristica.Id_Caracteristica != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._caracteristica.Id_TipoCaracteristica = this.formaCaracteristica.get('tipoCaracteristica')?.value;
      this._caracteristica.Descripcion = this.formaCaracteristica.get('descripcion')?.value;
      this._caracteristica.FechaAlta = new Date();
      this._caracteristica.FechaModificacion = new Date();
      this._caracteristica.Id_Usuario = 1;
      this._caracteristica.Id_Estatus = 1;

      if (this._esNuevo){
        this._caracteristica.Id_Caracteristica = 0;
        this._caracteristicasService.postCaracteristica(this._caracteristica).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'La caracteristica se agrego de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerCaracteristicas();
  
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
        this._caracteristicasService.putCaracteristica(this._caracteristica).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'La amenidad se modifico de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerCaracteristicas();
  
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

  eliminarCaracteristica(objCaracteristica : caracteristica) {
    // this._textoAccion = 'Eliminar';
    this._caracteristica = objCaracteristica;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar la característica: <strong>' + objCaracteristica.Descripcion + '</strong>?',
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

        this._caracteristicasService.deleteCaracteristica(objCaracteristica.Id_Caracteristica, objCaracteristica.Id_TipoCaracteristica).subscribe(
          (data) => {
            //Next callback
            
            Swal.fire({
              icon: 'success',
              title: 'La característica <strong>' + data.Descripcion + '</strong> fue eliminada.',
              showConfirmButton: false,
              timer: 1000
            })
    
            this.obtenerCaracteristicas();
    
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

  get descripcionNoValido() {
    return ( this.formaCaracteristica.get('descripcion')?.invalid && this.formaCaracteristica.get('descripcion')?.touched );
  }
      
  get tipoCaracteristicaNoValido() {
    return ( this.formaCaracteristica.get('tipoCaracteristica')?.invalid && this.formaCaracteristica.get('tipoCaracteristica')?.touched );
  }

}