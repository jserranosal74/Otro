import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { tipoPropiedad } from '../../../Models/catalogos/tipoPropiedad.model';
import { TiposPropiedadService } from '../../../Services/Catalogos/tiposPropiedades.service';
import { publicacion } from '../../../Models/procesos/publicacion.model';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../../Services/Catalogos/login.service';
import { subtipoPropiedad } from 'src/app/Models/catalogos/tipoPropiedadDetalle.model';

@Component({
  selector: 'app-operaciontipoinmueble',
  templateUrl: './operaciontipoinmueble.component.html',
  styleUrls: ['./operaciontipoinmueble.component.css']
})
export class OperaciontipoinmuebleComponent implements OnInit {
  _tiposPropiedad : tipoPropiedad[] = [];
  _publicacion: publicacion = new publicacion(0,0,0,0,0,'','','',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, null, null, new Date(), new Date(),0,0);
  //tipoPropiedadSeleccionada : number = 0;
  loading : boolean = false;
  _subtiposPropiedad : subtipoPropiedad[] = [];
  _numeroPaso : number = 1;
  _esNuevo : boolean = true;
  // EsRenta=false;
  // VentaSeleccionada = false;
  // RentaSeleccionada = false;

  formaOTI = this.fb.group({
    tipoOperacion : ['', [Validators.required] ],
    tipoPropiedad : ['', [Validators.required] ],
    subtipoPropiedad : [''],
  });

  constructor( private _tipoPropiedadService: TiposPropiedadService,
               private _publicacionesService: PublicacionesService,
               private _tiposPropiedadService: TiposPropiedadService,
               private _loginService: LoginService,
               private fb: FormBuilder,
               private router: Router ) {
    this.crearFormulario();
    this.obtenerTiposPropiedad();
    // this.tipoPropiedadSeleccionada = 0;
   }

  ngOnInit(): void {
  }

  obtenerTiposPropiedad(){
    console.log(this.loading);
    this._tipoPropiedadService.getTiposPropiedades().subscribe((data) => {
      this._tiposPropiedad = data;
      //this._tiposPropiedad.unshift(new tipoPropiedad(0,'','--Selecccione el tipo de inmueble--',new Date(),new Date(),1,1));
      this.loading = true;
        return 0;
      });

  }

  get tipoOperacionNoValido() {
    return this.formaOTI.get('tipoOperacion')?.invalid && this.formaOTI.get('tipoOperacion')?.touched
  }

  get tipoPropiedadValido() {
    return this.formaOTI.get('tipoPropiedad')?.invalid && this.formaOTI.get('tipoPropiedad')?.touched
  }

    crearFormulario() {
      this.formaOTI = this.fb.group({
      tipoOperacion : ['', [Validators.required] ],
      tipoPropiedad : ['', [Validators.required] ],
      subtipoPropiedad : [''],
      });
  }

  regresar(){
    this._numeroPaso = 2;

    setTimeout( () => { this.router.navigateByUrl('/publicar/caracteristicas'); }, 500 );
  }

  guardarOTI() {
debugger;
    if ( this.formaOTI.invalid ) {
      return Object.values( this.formaOTI.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    else{
      //Envio de la informacion al servidor

      if (this._publicacion.Id_Publicacion != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._publicacion.Id_TipoOperacion = this.formaOTI.get('tipoOperacion')?.value;
      this._publicacion.Id_TipoPropiedad = this.formaOTI.get('tipoPropiedad')?.value;
      // this._publicacion.subTipoPropiedad = this.formaOTI.get('subTipoPropiedad')?.value;
      this._publicacion.FechaAlta = new Date();
      this._publicacion.FechaModificacion = new Date();
      this._publicacion.Id_Usuario = 1;
      this._publicacion.Id_Estatus = 1;

      if (this._esNuevo){
        this._publicacion.Id_Publicacion = 0;
        this._publicacionesService.postPublicacion(this._publicacion).subscribe(
          (data) => {
            //Next callback
            console.log('datos: ',data);

            this._numeroPaso = 2;
            setTimeout( () => { this.router.navigate(['/publicar/ubicacion']); }, 500 );

            Swal.fire({
              icon: 'success',
              title: 'La publicación se guardo de manera correcta',
              showConfirmButton: false,
              timer: 1000
            })
  
            // this.modalClose.nativeElement.click();
  
            // this.obtenerPlanes();
  
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
        this._publicacionesService.putPublicacion(this._publicacion).subscribe(
          (data) => {
  
            // this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'El plan se modifico de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            // this.obtenerPlanes();
  
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

limpiarFormulario(){
  this.formaOTI.reset({
    tipoOperacion : '',
    tipoPropiedad : ''
  });
  
}

// obtenerSubtiposPropiedad(){
//     //console.log('sel:' + sel + ',' + this.formaOTI.controls['tipoPropiedad'].value);
//     //console.log(sel);

//   }

  obtenerSubTiposPropiedad() {

    if (this.formaOTI.invalid) {
      return Object.values(this.formaOTI.controls).forEach((control) => {
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
      this._tiposPropiedadService.getSubTiposPropiedad(this.formaOTI.controls['tipoPropiedad'].value).subscribe(
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

}
