import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { ArchivosFiscalesService } from '../../../Services/Catalogos/archivosfiscales.service';
import { archivoFiscal } from '../../../Models/catalogos/archivofiscal.model';

@Component({
  selector: 'app-archivosfiscales',
  templateUrl: './archivosfiscales.component.html',
  styleUrls: ['./archivosfiscales.component.css']
})
export class ArchivosFiscalesComponent implements OnInit {
  formaArchivoFiscal = this.fb.group({});

  _archivosFiscales : archivoFiscal[] = [];
  _archivoFiscal : archivoFiscal = new archivoFiscal(null,'','','','','',null,null,0,0,'');
  _textoAccion ='';

  _archivoCer: any;
  _archivoKey: any;

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;

  constructor(
    private fb: FormBuilder,
    private _archivosFiscalesService: ArchivosFiscalesService,
    private _loginService : LoginService,
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerArchivosFiscales();
  }

  ngOnInit(): void {
    //this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaArchivoFiscal = this.fb.group({
      nombreArchivoCer  : ['', Validators.required],
      nombreArchivoKey  : ['', Validators.required],
      password          : ['', Validators.required]
    });
    this._archivoFiscal = new archivoFiscal(null,'','','','','',null,null,0,0,'');
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    this.formaArchivoFiscal.reset({
      nombreArchivoCer : '',
      nombreArchivoKey : '',
      password         : ''
    });
    this._archivoFiscal = new archivoFiscal(null,'','','','','',null,null,0,0,'');
  }

  obtenerArchivosFiscales() {
    this._archivosFiscalesService.getArchivosFiscales().subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        this._archivosFiscales = data;

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {

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

  guardarArchivosFiscales(){

    if (this.formaArchivoFiscal.invalid) {
      return Object.values(this.formaArchivoFiscal.controls).forEach((control) => {
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

      if (this._archivoFiscal.Id_ArchivoFiscal != null){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }
      debugger;
      this._archivoFiscal.NombreArchivoCer = this.formaArchivoFiscal.get('nombreArchivoCer')?.value.replace(/^.*[\\\/]/, '');
      this._archivoFiscal.NombreArchivoKey = this.formaArchivoFiscal.get('nombreArchivoKey')?.value.replace(/^.*[\\\/]/, '');
      this._archivoFiscal.ArchivoCer = this._archivoCer.result.split('base64,')[1];
      this._archivoFiscal.ArchivoKey = this._archivoKey.result.split('base64,')[1];
      this._archivoFiscal.Password = this.formaArchivoFiscal.get('password')?.value;
      this._archivoFiscal.FechaAlta = new Date();
      this._archivoFiscal.FechaModificacion = new Date();
      this._archivoFiscal.Id_Usuario = 1;
      this._archivoFiscal.Id_Estatus = 1;

      if (this._esNuevo){
        this._archivoFiscal.Id_ArchivoFiscal = null;
        this._archivosFiscalesService.putArchivoFiscal(this._archivoFiscal).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'Los archivos fiscales se agregaron de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerArchivosFiscales();
  
            this.limpiarFormulario();
          },
          (error: HttpErrorResponse) => {
            //Error callback
  
            switch (error.status) {
              case 401:
                this._loginService.cerarSesion();
                break;
              case 403:
                //console.log('error 403');
                break;
              case 404:
                //console.log('error 404');
                break;
              case 409:
                Swal.fire({
                  icon: 'error',
                  title: 'Primero debe de eliminar los archivos registrados actualmente en el sistema.',
                  showConfirmButton: false,
                  timer: 3000
                })
                break;
            }
  
          }
        );
      }
    }
  }

  eliminarArchivosFiscales(objArchivoFiscal : archivoFiscal) {
    // this._textoAccion = 'Eliminar';
    this._archivoFiscal = objArchivoFiscal;

    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que desea eliminar los archivos ficales con Id: "' + objArchivoFiscal.Id_ArchivoFiscal + '"?',
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
          debugger;
        this._archivosFiscalesService.deleteArchivoFiscal(objArchivoFiscal.Id_ArchivoFiscal).subscribe(
          (data) => {
            //Next callback
            
            // Swal.fire('Los datos fiscales fueron eliminados', '', 'success')

            Swal.fire({
              icon: 'success',
              title: 'Los archivos fiscales fueron eliminados',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerArchivosFiscales();
    
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

  get ArchivoCerNoValido() {
    return ( this.formaArchivoFiscal.get('nombreArchivoCer')?.invalid && this.formaArchivoFiscal.get('nombreArchivoCer')?.touched );
  }
      
  get ArchivoKeyNoValido() {
    return ( this.formaArchivoFiscal.get('nombreArchivoKey')?.invalid && this.formaArchivoFiscal.get('nombreArchivoKey')?.touched );
  }

  get passwordNoValido() {
    return ( this.formaArchivoFiscal.get('password')?.invalid && this.formaArchivoFiscal.get('password')?.touched );
  }

  obtenerArchivoCer(archivoCer : Event){
    let lstArchivos = (<HTMLInputElement>archivoCer.target).files;
    for (let index = 0; index < lstArchivos!.length; index++) {
      this.readFileAsText(lstArchivos![index],'cer');
    }
  }

  obtenerArchivoKey(archivoKey : Event){
    let lstArchivos = (<HTMLInputElement>archivoKey.target).files;
    for (let index = 0; index < lstArchivos!.length; index++) {
      this.readFileAsText(lstArchivos![index], 'key');
    }
  }

  readFileAsText(file : File, tipoArchivo : string){
    let fr = new FileReader();

    fr.readAsDataURL(file);

    if (tipoArchivo === 'cer')
      this._archivoCer = fr;
    else
      this._archivoKey = fr;
  }
}

