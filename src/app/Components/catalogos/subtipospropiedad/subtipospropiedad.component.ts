import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { tipoPropiedad } from 'src/app/Models/catalogos/tipoPropiedad.model';
import { TiposPropiedadService } from 'src/app/Services/Catalogos/tiposPropiedades.service';
import { subtipoPropiedad } from 'src/app/Models/catalogos/tipoPropiedadDetalle.model';

@Component({
  selector: 'app-subtipospropiedad',
  templateUrl: './subtipospropiedad.component.html',
  styleUrls: ['./subtipospropiedad.component.css']
})
export class SubtipospropiedadComponent implements OnInit {
  _tiposPropiedad : tipoPropiedad[] = [];
  _tiposPropiedadModal : tipoPropiedad[] = [];
  // _tipoPropiedad : tipoPropiedad = new tipoPropiedad(0,'','',new Date(),new Date(),0,0);
  _subtiposPropiedad : subtipoPropiedad[] = [];
  _subtipoPropiedad : subtipoPropiedad = new subtipoPropiedad(0,0,'','',new Date(),new Date(),0,0);
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;
  // @ViewChild('descripcion') modaldescripcion : any;
  // @ViewChild('verformaAmenidad') modalformaAmenidad : any;

  formaBusqueda = this.fb.group({
    tipopropiedad : ['', Validators.required]
  });
  
  formaSubtipoPropiedad = this.fb.group({
    tipopropiedadmodal : ['', Validators.required],
    clave : ['', Validators.required],
    descripcion:  ['', Validators.required]
  });

  constructor( private fb: FormBuilder,
               private _tiposPropiedadService: TiposPropiedadService,
               private _loginService : LoginService ) {

    this.crearFormularios();
    this.limpiarFormularioSubTipos();
    this.obtenerTiposPropiedad();
  }

  ngOnInit(): void {
  }

  crearFormularios() {
    this.formaBusqueda = this.fb.group({
      tipopropiedad : ['', Validators.required]
    });

    this.formaSubtipoPropiedad = this.fb.group({
      tipopropiedadmodal : ['', Validators.required],
      clave : ['', Validators.required],
      descripcion:  ['', Validators.required]
    });
    // this._tipoPropiedad = new tipoPropiedad(0,'','',new Date(),new Date(),0,0);
  }

  limpiarFormularioSubTipos() {
    this._textoAccion = 'Agregar';
    this.formaSubtipoPropiedad.reset({
      tipopropiedadmodal : '',
      clave         : '',
      descripcion   : ''
    });
    // this._tipoPropiedad = new tipoPropiedad(0,'','',new Date(),new Date(),0,0);
  }

  obtenerTiposPropiedad() {
    // let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];

    this._tiposPropiedadService.getTiposPropiedades().subscribe(
      (data) => {
        //Next callback
        this._tiposPropiedad = data;
        this._tiposPropiedadModal = data;

      },
      (error: HttpErrorResponse) => {
        //Error callback

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: 'Error al cargar las tipos de propiedad',
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

  obtenerSubTiposPropiedad() {

    if (this.formaBusqueda.invalid) {
      return Object.values(this.formaBusqueda.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
    else {
      this._tiposPropiedadService.getSubTiposPropiedad(this.formaBusqueda.controls['tipopropiedad'].value).subscribe(
        (data) => {
          //Next callback
  
          this._subtiposPropiedad = data;
  
        },
        (error: HttpErrorResponse) => {
          //Error callback
  
          Swal.fire({
            icon: 'error',
            title: error.error['Descripcion'],
            text: 'Error al cargar las tipos de propiedad',
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

  obtenerSubTipoPropiedad(objSubTipoPropiedad : subtipoPropiedad) {
    this._textoAccion = 'Modificar';
    this._subtipoPropiedad = objSubTipoPropiedad;

    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];

    this._tiposPropiedadService.getSubTipoPropiedad(objSubTipoPropiedad.Id_SubtipoPropiedad).subscribe(
      (data) => {
        //Next callback
        // console.log('datos: ', data);

        this.formaSubtipoPropiedad.setValue({
          tipopropiedadmodal : data.Id_TipoPropiedad,
          clave         : data.Clave,
          descripcion   : data.Descripcion
        });

        // this.limpiarFormulario();
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

  guardarSubTipoPropiedad(){

    if (this.formaSubtipoPropiedad.invalid) {
      return Object.values(this.formaSubtipoPropiedad.controls).forEach((control) => {
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

      if (this._subtipoPropiedad.Id_SubtipoPropiedad != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._subtipoPropiedad.Id_TipoPropiedad = this.formaSubtipoPropiedad.get('tipopropiedadmodal')?.value;
      this._subtipoPropiedad.Clave = this.formaSubtipoPropiedad.get('clave')?.value;
      this._subtipoPropiedad.Descripcion = this.formaSubtipoPropiedad.get('descripcion')?.value;
      this._subtipoPropiedad.FechaAlta = new Date();
      this._subtipoPropiedad.FechaModificacion = new Date();
      this._subtipoPropiedad.Id_Usuario = 1;
      this._subtipoPropiedad.Id_Estatus = 1;

      if (this._esNuevo){
        this._subtipoPropiedad.Id_SubtipoPropiedad = 0;
        this._tiposPropiedadService.postSubTipoPropiedad(this._subtipoPropiedad).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'El tipo de propiedad se agrego de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerTiposPropiedad();
  
            this.limpiarFormularioSubTipos();
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
      else {
        this._tiposPropiedadService.putSubTipoPropiedad(this._subtipoPropiedad).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'El subtipo de propiedad se modificó de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerTiposPropiedad();
  
            this.limpiarFormularioSubTipos();
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

  eliminarSubTipoPropiedad(objSubtipoPropiedad : subtipoPropiedad) {

    this._subtipoPropiedad = objSubtipoPropiedad;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar el tipo de propiedad: "' + objSubtipoPropiedad.Descripcion + '"?',
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

        this._tiposPropiedadService.deleteSubTipoPropiedad(objSubtipoPropiedad.Id_SubtipoPropiedad).subscribe(
          (data) => {
            //Next callback
            
            this.obtenerSubTiposPropiedad();

            Swal.fire({
              icon: 'success',
              title: 'El sub tipo de propiedad fue eliminado.',
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

  get tipopropiedadNoValido() {
    return ( this.formaBusqueda.get('tipopropiedad')?.invalid && this.formaBusqueda.get('tipopropiedad')?.touched );
  }

  get tipopropiedadmodalNoValido() {
    return ( this.formaSubtipoPropiedad.get('tipopropiedadmodal')?.invalid && this.formaSubtipoPropiedad.get('tipopropiedadmodal')?.touched );
  }

  get claveNoValido() {
    return ( this.formaSubtipoPropiedad.get('clave')?.invalid && this.formaSubtipoPropiedad.get('clave')?.touched );
  }

  get descripcionNoValido() {
    return ( this.formaSubtipoPropiedad.get('descripcion')?.invalid && this.formaSubtipoPropiedad.get('descripcion')?.touched );
  }

}