import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { amenidad } from 'src/app/Models/catalogos/amenidades.model';
import { AmenidadesService } from '../../../Services/Catalogos/amenidades.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';

@Component({
  selector: 'app-amenidades',
  templateUrl: './amenidades.component.html',
  styleUrls: ['./amenidades.component.css']
})
export class AmenidadesComponent implements OnInit {
  _amenidades : amenidad[] = [];
  _amenidad : amenidad = new amenidad(0,'',0,null,null,0,0);
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;
  @ViewChild('descripcion') modaldescripcion : any;
  // @ViewChild('verformaAmenidad') modalformaAmenidad : any;

  formaAmenidad = this.fb.group({
    descripcion: ['', Validators.required],
    orden: ['', [Validators.required, Validators.pattern('[0-9]'),],]
  });

  constructor(
    private fb: FormBuilder,
    private _amenidadService: AmenidadesService,
    private _loginService : LoginService,
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerAmenidades();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaAmenidad = this.fb.group({
      descripcion: ['', Validators.required],
      orden: ['', [Validators.required, Validators.pattern('[0-9]'),],]
    });
    this._amenidad = new amenidad(0,'',0,null,null,0,0);
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    this.formaAmenidad.reset({
      descripcion: '',
      orden: ''
    });
    this._amenidad = new amenidad(0,'',0,null,null,0,0);
  }

  obtenerAmenidades() {
    let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._amenidadService.getAmenidades().subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        this._amenidades = data;

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

  obtenerAmenidad(objAmenidad : amenidad) {
    this._textoAccion = 'Modificar';
    this._amenidad = objAmenidad;

    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._amenidadService.getAmenidad(objAmenidad.Id_Amenidad).subscribe(
      (data) => {
        //Next callback
        console.log('datos: ', data);

        this.formaAmenidad.setValue({
          descripcion: data.Descripcion,
          orden: data.Orden
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

  guardarAmenidad(){
debugger;
    if (this.formaAmenidad.invalid) {
      return Object.values(this.formaAmenidad.controls).forEach((control) => {
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

      if (this._amenidad.Id_Amenidad != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._amenidad.Descripcion = this.formaAmenidad.get('descripcion')?.value;
      this._amenidad.Orden = this.formaAmenidad.get('orden')?.value;
      this._amenidad.FechaAlta = new Date();
      this._amenidad.FechaModificacion = new Date();
      this._amenidad.Id_Usuario = 1;
      this._amenidad.Id_Estatus = 1;

      if (this._esNuevo){
        this._amenidad.Id_Amenidad = 0;
        this._amenidadService.postAmenidad(this._amenidad).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'La amenidad se agrego de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerAmenidades();
  
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
        this._amenidadService.putAmenidad(this._amenidad).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'La amenidad se modifico de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerAmenidades();
  
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

  eliminarAmenidad(objAmenidad : amenidad) {
    // this._textoAccion = 'Eliminar';
    this._amenidad = objAmenidad;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar los datos fiscales de inmobiliaria: "' + objAmenidad.Descripcion + '"?',
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

        this._amenidadService.deleteAmenidad(objAmenidad.Id_Amenidad).subscribe(
          (data) => {
            //Next callback
            
            // Swal.fire('Los datos fiscales fueron eliminados', '', 'success')

            Swal.fire({
              icon: 'success',
              title: 'La amenidad fue eliminada.',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerAmenidades();
    
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
    return (
      this.formaAmenidad.get('descripcion')?.invalid &&
      this.formaAmenidad.get('descripcion')?.touched
    );
  }
      
  get ordenNoValido() {
    return (
      this.formaAmenidad.get('orden')?.invalid &&
      this.formaAmenidad.get('orden')?.touched
    );
  }

}

