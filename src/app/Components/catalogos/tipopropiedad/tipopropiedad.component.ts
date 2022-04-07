import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { tipoPropiedad } from 'src/app/Models/catalogos/tipoPropiedad.model';
import { TiposPropiedadService } from 'src/app/Services/Catalogos/tiposPropiedades.service';

@Component({
  selector: 'app-tipopropiedad',
  templateUrl: './tipopropiedad.component.html',
  styleUrls: ['./tipopropiedad.component.css']
})
export class TipopropiedadComponent implements OnInit {
  _tiposPropiedad : tipoPropiedad[] = [];
  _tipoPropiedad : tipoPropiedad = new tipoPropiedad(0,'','',new Date(),new Date(),0,0);
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;
  @ViewChild('descripcion') modaldescripcion : any;
  // @ViewChild('verformaAmenidad') modalformaAmenidad : any;

  formaTipoPropiedad = this.fb.group({
    clave: ['', Validators.required],
    descripcion: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private _tiposPropiedadService: TiposPropiedadService,
    private _loginService : LoginService,
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerTiposPropiedad();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaTipoPropiedad = this.fb.group({
      clave: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this._tipoPropiedad = new tipoPropiedad(0,'','',new Date(),new Date(),0,0);
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    this.formaTipoPropiedad.reset({
      clave: '',
      descripcion: ''
    });
    this._tipoPropiedad = new tipoPropiedad(0,'','',new Date(),new Date(),0,0);
  }

  obtenerTiposPropiedad() {
    let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._tiposPropiedadService.getTiposPropiedades().subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        this._tiposPropiedad = data;

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

  obtenerTipoPropiedad(objTipoPropiedad : tipoPropiedad) {
    this._textoAccion = 'Modificar';
    this._tipoPropiedad = objTipoPropiedad;

    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._tiposPropiedadService.getTipoPropiedad(objTipoPropiedad.Id_TipoPropiedad).subscribe(
      (data) => {
        //Next callback
        console.log('datos: ', data);

        this.formaTipoPropiedad.setValue({
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

  guardarPlan(){

    if (this.formaTipoPropiedad.invalid) {
      return Object.values(this.formaTipoPropiedad.controls).forEach((control) => {
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

      if (this._tipoPropiedad.Id_TipoPropiedad != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._tipoPropiedad.Clave = this.formaTipoPropiedad.get('precio')?.value;
      this._tipoPropiedad.Descripcion = this.formaTipoPropiedad.get('descripcion')?.value;
      this._tipoPropiedad.FechaAlta = new Date();
      this._tipoPropiedad.FechaModificacion = new Date();
      this._tipoPropiedad.Id_Usuario = 1;
      this._tipoPropiedad.Id_Estatus = 1;

      if (this._esNuevo){
        this._tipoPropiedad.Id_TipoPropiedad = 0;
        this._tiposPropiedadService.postTipoPropiedad(this._tipoPropiedad).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'El plan se agrego de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerTiposPropiedad();
  
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
        this._tiposPropiedadService.putTipoPropiedad(this._tipoPropiedad).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'El plan se modifico de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerTiposPropiedad();
  
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

  eliminarTipoPropiedad(objTipoPropiedad : tipoPropiedad) {
    // this._textoAccion = 'Eliminar';
    this._tipoPropiedad = objTipoPropiedad;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar el tipo de propiedad: "' + objTipoPropiedad.Descripcion + '"?',
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

        this._tiposPropiedadService.deleteTipoPropiedad(objTipoPropiedad.Id_TipoPropiedad).subscribe(
          (data) => {
            //Next callback
            
            // Swal.fire('Los datos fiscales fueron eliminados', '', 'success')

            Swal.fire({
              icon: 'success',
              title: 'El tipo de propiedad fue eliminado.',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerTiposPropiedad();
    
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
    return ( this.formaTipoPropiedad.get('descripcion')?.invalid && this.formaTipoPropiedad.get('descripcion')?.touched );
  }
      
  get claveNoValido() {
    return ( this.formaTipoPropiedad.get('clave')?.invalid && this.formaTipoPropiedad.get('clave')?.touched );
  }

}