import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { LoginService } from '../../../Services/Catalogos/login.service';
import { IndicadoresService } from '../../../Services/Catalogos/indicadores.service';
import { indicador } from '../../../Models/catalogos/indicador.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})

export class IndicadoresComponent implements OnInit {
  formaIndicador : FormGroup = new FormGroup({});
  _indicadores : indicador[] = [];
  _indicador : indicador = new indicador(0,'','','',0,0,0,new Date(),new Date(), 0,0,false);
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;

  constructor( private _indicadoresService: IndicadoresService,
               private fb: FormBuilder,
               private _loginService : LoginService
  ) {
    this.crearFormulario();
    this.obtenerIndicadores();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.formaIndicador = this.fb.group({
      clave                : ['', Validators.required],
      descripcionCorta     : ['', Validators.required],
      descripcionLarga     : [''],
      visibleCliente       : ['', Validators.required],
      enviarCorreoACliente : ['', Validators.required],
      enviarCorreoAUsuario : ['', Validators.required],
    });
    this._indicador = new indicador(0,'','','',0,0,0,new Date(),new Date(), 0,0,false);
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    // this.mediosContacto.clear();
    // this._municipios = [];
    this.formaIndicador.reset({
      clave                : '',
      descripcionCorta     : '',
      descripcionLarga     : '',
      visibleCliente       : '',
      enviarCorreoACliente : '',
      enviarCorreoAUsuario : ''
    });

    this._indicador = new indicador(0,'','','',0,0,0,new Date(),new Date(), 0,0,false);
  }

  obtenerIndicadores() {

    this._indicadoresService.getIndicadores(null, null).subscribe(
      (data) => {
        //Next callback

        this._indicadores = data;

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

  guardarEmpresa(){

    if (this.formaIndicador.invalid) {
      return Object.values(this.formaIndicador.controls).forEach((control) => {
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

      if (this._indicador.Id_Indicador != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._indicador.Clave = this.formaIndicador.get('clave')?.value.toUpperCase();
      this._indicador.DescripcionCorta = this.formaIndicador.get('descripcionCorta')?.value;
      this._indicador.DescripcionLarga = this.formaIndicador.get('descripcionLarga')?.value;
      this._indicador.VisibleCliente = this.formaIndicador.get('visibleCliente')?.value;
      this._indicador.EnviarCorreoACliente = this.formaIndicador.get('enviarCorreoACliente')?.value;
      this._indicador.EnviarCorreoAUsuario = this.formaIndicador.get('enviarCorreoAUsuario')?.value;

      this._indicador.FechaAlta = new Date();
      this._indicador.FechaModificacion = new Date();
      this._indicador.Id_Usuario = 1;
      this._indicador.Id_Estatus = 1;

      if (this._esNuevo){
        this._indicador.Id_Indicador = 0;
        this._indicadoresService.postIndicador(this._indicador).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'El indicador se agregó de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerIndicadores();
  
            this.limpiarFormulario();
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
      else{

        // debugger;
        
        this._indicadoresService.putIndicador(this._indicador).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'Los datos del indicador se modificaron de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerIndicadores();
  
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

  obtenerIndicador(objIndicador : indicador) {
    this._textoAccion = 'Modificar';
    this._indicador = objIndicador;

    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];

    this._indicadoresService.getIndicadores(objIndicador.Id_Indicador,null).subscribe(
      (data) => {
        //Next callback

        this.formaIndicador.patchValue({
          clave                : data[0].Clave,
          descripcionCorta     : data[0].DescripcionCorta,
          descripcionLarga     : data[0].DescripcionLarga,
          visibleCliente       : data[0].VisibleCliente,
          enviarCorreoACliente : data[0].EnviarCorreoACliente,
          enviarCorreoAUsuario : data[0].EnviarCorreoAUsuario
        });

      },
      (error: HttpErrorResponse) => {
        //Error callback

        //console.log('error.status',error.status);

        switch (error.status) {
          case 401:
            break;
          case 403:
            Swal.fire({
              icon: 'error',
              title: 'No hay empresas dadas de alta.',
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
            break;
          case 404:
            break;
          case 409:
            break;
        }

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  eliminarIndicador(objIndicador : indicador) {
    // this._textoAccion = 'Eliminar';
    this._indicador = objIndicador;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar el indicador: "' + objIndicador.DescripcionCorta + '"?',
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

        this._indicadoresService.deleteIndicador(objIndicador.Id_Indicador).subscribe(
          (data) => {
            //Next callback
            
            Swal.fire({
              icon: 'success',
              title: 'El indicador fue eliminado.',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerIndicadores();
    
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

  get claveNoValida() {
    return ( this.formaIndicador.get('clave')?.invalid && this.formaIndicador.get('clave')?.touched );
  }

  get descripcionCortaNoValida() {
    return ( this.formaIndicador.get('descripcionCorta')?.invalid && this.formaIndicador.get('descripcionCorta')?.touched );
  }

  get descripcionLargaNoValida() {
    return ( this.formaIndicador.get('descripcionLarga')?.invalid && this.formaIndicador.get('descripcionLarga')?.touched );
  }

  get visibleClienteNoValida() {
    return ( this.formaIndicador.get('visibleCliente')?.invalid && this.formaIndicador.get('visibleCliente')?.touched );
  }

  get enviarCorreoAClienteNoValida() {
    return ( this.formaIndicador.get('enviarCorreoACliente')?.invalid && this.formaIndicador.get('enviarCorreoACliente')?.touched );
  }

  get enviarCorreoAUsuarioNoValida() {
    return ( this.formaIndicador.get('enviarCorreoAUsuario')?.invalid && this.formaIndicador.get('enviarCorreoAUsuario')?.touched );
  }

}