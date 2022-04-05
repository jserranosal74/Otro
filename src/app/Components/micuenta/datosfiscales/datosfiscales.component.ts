import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { InmobiliariasService } from '../../../Services/Catalogos/inmobiliaria.service';
import { inmobiliaria } from '../../../Models/catalogos/inmobiliaria.model';

@Component({
  selector: 'app-datosfiscales',
  templateUrl: './datosfiscales.component.html',
  styleUrls: ['./datosfiscales.component.css']
})
export class DatosfiscalesComponent implements OnInit {
  _inmobiliarias : inmobiliaria[] = [];
  _inmobiliaria : inmobiliaria = new inmobiliaria(0,0,'','','','',new Date(),new Date(), 0,0);
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;
  @ViewChild('verformaInmobiliaria') formaInmobiliaria : any;

  formaDatosFiscales = this.fb.group({
    nombre: ['', Validators.required],
    domiciliofiscal: ['', Validators.required],
    rfc: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private _inmobiliariaService: InmobiliariasService
  ) {
    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerInmobiliarias();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaDatosFiscales = this.fb.group({
      nombre: ['', Validators.required],
      domiciliofiscal: ['', Validators.required],
      rfc: ['', Validators.required],
      email: ['', Validators.required]
    });
    this._inmobiliaria = new inmobiliaria(0,0,'','','','',new Date(),new Date(), 0,0);
  }

  limpiarFormulario() {
    this.formaDatosFiscales.reset({
      nombre: '',
      domiciliofiscal: '',
      rfc: '',
      email: ''
    });
    this._inmobiliaria = new inmobiliaria(0,0,'','','','',new Date(),new Date(), 0,0);
    this._textoAccion = 'Agregar'
  }

  obtenerInmobiliarias() {
    let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._inmobiliariaService.getInmobiliarias(Id_Usuario).subscribe(
      (data) => {
        //Next callback
        console.log('datos: ', data);

        this._inmobiliarias = data;

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

  obtenerInmobiliaria(objInmobiliaria : inmobiliaria) {
    this._textoAccion = 'Modificar';
    this._inmobiliaria = objInmobiliaria;

    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];

    this._inmobiliariaService.getInmobiliaria(objInmobiliaria.Id_Inmobiliaria).subscribe(
      (data) => {
        //Next callback
        console.log('datos: ', data);

        this.formaDatosFiscales.setValue({
          nombre: data.Nombre,
          domiciliofiscal: data.DomicilioFiscal,
          rfc: data.RFC,
          email: data.Email,
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

      if (this._inmobiliaria.Id_Inmobiliaria != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._inmobiliaria.Id_Cliente = JSON.parse(localStorage.getItem('usuario')!)['Id_Usuario'];
      this._inmobiliaria.Nombre = this.formaDatosFiscales.get('nombre')?.value;
      this._inmobiliaria.DomicilioFiscal = this.formaDatosFiscales.get('domiciliofiscal')?.value;
      this._inmobiliaria.RFC = this.formaDatosFiscales.get('rfc')?.value;
      this._inmobiliaria.Email = this.formaDatosFiscales.get('email')?.value;
      this._inmobiliaria.FechaAlta = new Date();
      this._inmobiliaria.FechaModificacion = new Date();
      this._inmobiliaria.Id_Usuario = 1;
      this._inmobiliaria.Id_Estatus = 1;

      if (this._esNuevo){
        this._inmobiliaria.Id_Inmobiliaria = 0;
        this._inmobiliariaService.postInmobiliaria(this._inmobiliaria).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);
  
            this.modalClose.nativeElement.click();
  
            this.obtenerInmobiliarias();
  
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
        this._inmobiliariaService.putInmobiliaria(this._inmobiliaria).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);
            debugger;
  
            this.modalClose.nativeElement.click();
  
            this.obtenerInmobiliarias();
  
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

  eliminarDatosFiscales(objInmobiliaria : inmobiliaria) {
    this._textoAccion = 'Eliminar';
    this._inmobiliaria = objInmobiliaria;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar los datos fiscales de inmobiliaria: "' + objInmobiliaria.Nombre + '"?',
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

        this._inmobiliariaService.deleteInmobiliaria(objInmobiliaria.Id_Inmobiliaria).subscribe(
          (data) => {
            //Next callback
            
            // Swal.fire('Los datos fiscales fueron eliminados', '', 'success')

            Swal.fire({
              icon: 'success',
              title: 'Los datos fiscales fueron eliminados',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerInmobiliarias();
    
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

        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })

    // Swal.fire({
    //   icon: 'warning',
    //   title: '¿Está seguro de que desea eliminar los datos fiscales de inmobiliaria?',
    //   text: '',
    //   showCancelButton: false,
    //   showDenyButton: false,
    //   showConfirmButton: true,
    // });

    
  }

  get nombreNoValido() {
    return (
      this.formaDatosFiscales.get('nombre')?.invalid &&
      this.formaDatosFiscales.get('nombre')?.touched
    );
  }
  
  get domiciliofiscalNoValido() {
    return (
      this.formaDatosFiscales.get('domiciliofiscal')?.invalid &&
      this.formaDatosFiscales.get('domiciliofiscal')?.touched
    );
  }
  
  get rfcNoValido() {
    return (
      this.formaDatosFiscales.get('rfc')?.invalid &&
      this.formaDatosFiscales.get('rfc')?.touched
      );
    }

    get correoNoValido() {
      return (
        this.formaDatosFiscales.get('email')?.invalid &&
        this.formaDatosFiscales.get('email')?.touched
      );
    }
    
    get telefonoNoValido() {
    return (
      this.formaDatosFiscales.get('telefono')?.invalid &&
      this.formaDatosFiscales.get('telefono')?.touched
    );
  }

}
