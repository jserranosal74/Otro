import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { medioContacto } from '../../../Models/catalogos/medioContacto.model';
import { MediosContactoService } from 'src/app/Services/Catalogos/mediosContacto.service';

@Component({
  selector: 'app-medioscontacto',
  templateUrl: './medioscontacto.component.html',
  styleUrls: ['./medioscontacto.component.css']
})
export class MedioscontactoComponent implements OnInit {
  _mediosContacto : medioContacto[] = [];
  _medioContacto : medioContacto = new medioContacto(0,'','',new Date(),new Date(),0,0);
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;
  // @ViewChild('descripcion') modaldescripcion : any;
  // @ViewChild('verformaAmenidad') modalformaAmenidad : any;

  formaMedioContacto = this.fb.group({
    clave: ['', Validators.required],
    descripcion: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private _mediosContactoService: MediosContactoService,
    private _loginService : LoginService,
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerMediosContacto();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaMedioContacto = this.fb.group({
      clave: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this._medioContacto = new medioContacto(0,'','',new Date(),new Date(),0,0);
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    this.formaMedioContacto = this.fb.group({
      clave: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this._medioContacto = new medioContacto(0,'','',new Date(),new Date(),0,0);
  }

  obtenerMediosContacto() {
    let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._mediosContactoService.getMediosContacto().subscribe(
      (data) => {

        this._mediosContacto = data;

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback

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

  obtenerMedioContacto(objMedioContacto : medioContacto) {
    this._textoAccion = 'Modificar';
    this._medioContacto = objMedioContacto;

    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._mediosContactoService.getMedioContacto(objMedioContacto.Id_MedioContacto).subscribe(
      (data) => {
        //Next callback
        console.log('datos: ', data);

        this.formaMedioContacto.setValue({
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

  guardarMedioContacto(){

    if (this.formaMedioContacto.invalid) {
      return Object.values(this.formaMedioContacto.controls).forEach((control) => {
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

      if (this._medioContacto.Id_MedioContacto != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._medioContacto.Clave = this.formaMedioContacto.get('clave')?.value;
      this._medioContacto.Descripcion = this.formaMedioContacto.get('descripcion')?.value;
      this._medioContacto.FechaAlta = new Date();
      this._medioContacto.FechaModificacion = new Date();
      this._medioContacto.Id_Usuario = 1;
      this._medioContacto.Id_Estatus = 1;

      if (this._esNuevo){
        this._medioContacto.Id_MedioContacto = 0;
        this._mediosContactoService.postMedioContacto(this._medioContacto).subscribe(
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
  
            this.obtenerMediosContacto
  
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
        this._mediosContactoService.putMedioContacto(this._medioContacto).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'El plan se modifico de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerMediosContacto();
  
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

  eliminarMedioContacto(objMedioContacto : medioContacto) {
    // this._textoAccion = 'Eliminar';
    this._medioContacto = objMedioContacto;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar el medio de contacto: "' + objMedioContacto.Descripcion + '"?',
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

        this._mediosContactoService.deleteMedioContacto(objMedioContacto.Id_MedioContacto).subscribe(
          (data) => {
            //Next callback
            
            // Swal.fire('Los datos fiscales fueron eliminados', '', 'success')

            Swal.fire({
              icon: 'success',
              title: 'El plan fue eliminado.',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerMediosContacto();
    
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
  
  get claveNoValido() {
    return ( this.formaMedioContacto.get('clave')?.invalid && this.formaMedioContacto.get('clave')?.touched );
  }

  get descripcionNoValido() {
    return ( this.formaMedioContacto.get('descripcion')?.invalid && this.formaMedioContacto.get('descripcion')?.touched );
  }

}