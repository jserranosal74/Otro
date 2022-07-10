import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  _publicacion: publicacion = new publicacion(0,0,null,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0,'','',0);
  _id_publicacion : number = 0;
  loading : boolean = false;
  _subtiposPropiedad : subtipoPropiedad[] = [];
  _numeroPaso : number = 1;
  _esNuevo : boolean = true;
  _rentaVentaDesarrollo : number | null = 0;
  _esDesarrollo : boolean = false;
  _bloquearTipoOperacion = false;
  _bloquearDesarrollo = false;
  _bloquearSiPerteneceDesarrollo = false;

  formaOTI = this.fb.group({
  });

  constructor( private _activatedRoute: ActivatedRoute,
               private _tipoPropiedadService: TiposPropiedadService,
               private _publicacionesService: PublicacionesService,
               private _tiposPropiedadService: TiposPropiedadService,
               private _loginService: LoginService,
               private fb: FormBuilder,
               private router: Router ) {

    this._activatedRoute.queryParams.subscribe(params => {
      this._id_publicacion = params['Id_Publicacion'];
      if (this._id_publicacion === undefined){
        this._id_publicacion = 0;
      }
    });
    
    this.configurarSiEsEmpresa();
    //this.probarAutenticacion();
    this.crearFormulario();
    this.obtenerTiposPropiedad();
    this.CargarPublicacion();
   }

  ngOnInit(): void {
  }

  configurarSiEsEmpresa(){
    if (this._loginService.obtenerIdEmpresa() != null){
      this._esDesarrollo = true;
    }
    else{
      this._esDesarrollo = false;
    }
  }

  // probarAutenticacion(){
  //   this._loginService.sesionValida().subscribe((data)=> { 

  //   },(error : HttpErrorResponse) => {
  //   console.log('error',error);
  //       switch (error.status) {
  //         case 401:
  //           this._loginService.cerarSesion();
  //           this.router.navigateByUrl('/login');
  //           break;
  //         case 403:
  //           break;
  //         case 404:
  //           break;
  //         case 409:
  //           break;
  //       }
  //     }
  //   );
  // }

  obtenerTiposPropiedad(){
    // console.log(this.loading);
    this._tipoPropiedadService.getTiposPropiedades().subscribe((data) => {
      this._tiposPropiedad = data;
      //this._tiposPropiedad.unshift(new tipoPropiedad(0,'','--Selecccione el tipo de inmueble--',new Date(),new Date(),1,1));
      //this.loading = true;
       // return 0;
      });

  }

  seleccionarOperacion(){
    debugger;
    this._rentaVentaDesarrollo = this.formaOTI.controls['tipoOperacion'].value;

    if (this._rentaVentaDesarrollo == 3){
      this.formaOTI.patchValue({
        tipoPropiedad : 12,
        subtipoPropiedad : ''
      });
      this._bloquearDesarrollo = true;
    }
    else{
      this.formaOTI.patchValue({
        tipoPropiedad : 1,
        subtipoPropiedad : ''
      });
      this._bloquearDesarrollo = false;
    }
  }

  CargarPublicacion(){
    debugger;
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
          (data) => {
            //Next callback
            console.log(data);
            this._publicacion = data;

            this._rentaVentaDesarrollo = data.Id_TipoOperacion;

            this.obtenerSubTiposPropiedad(data.Id_TipoPropiedad!)

            this.formaOTI.setValue({
              tipoOperacion : data.Id_TipoOperacion,
              tipoPropiedad : data.Id_TipoPropiedad,
              subtipoPropiedad : data.Id_SubtipoPropiedad
            });

            // Si es desarrollo el que se carga se bloquea el cambio de tipo de operacion
            if(data.Id_TipoOperacion === 3){
                this._bloquearDesarrollo = true;
                this._bloquearTipoOperacion = true;
            }

            // Bloquear boton de desarrollo si el anuncio ya pertenece a un desarrollo
            if(data.PerteneceADesarrollo === 1)
            {
              this._bloquearSiPerteneceDesarrollo = true;
            }

          },
          (error: HttpErrorResponse) => {
            //Error callback

            this._id_publicacion = 0;
            this.router.navigateByUrl('/publicar/operacion-tipo-inmueble');

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
debugger;
      if (this._publicacion.Id_Publicacion != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._publicacion.Id_Cliente = this._loginService.obtenerIdCliente();
      this._publicacion.Id_TipoOperacion = this.formaOTI.get('tipoOperacion')?.value;
      this._publicacion.Id_TipoPropiedad = this.formaOTI.get('tipoPropiedad')?.value;
      this._publicacion.Id_SubtipoPropiedad = this.formaOTI.get('subtipoPropiedad')?.value;
      this._publicacion.FechaAlta = new Date();
      this._publicacion.FechaModificacion = new Date();
      this._publicacion.Id_Usuario = 1;
      this._publicacion.Id_Estatus = 8;

      if (this._esNuevo){
        this._publicacion.Id_Publicacion = 0;
        this._publicacionesService.postPublicacion(this._publicacion).subscribe(
          (data) => {
            //Next callback

            this._id_publicacion = data.Id_Publicacion;

            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
    
            Toast.fire({
              icon: 'success',
              title: 'La información se guardo de manera correcta.'
            });

            this._numeroPaso = 2;
            setTimeout( () => { this.router.navigate(['/publicar/ubicacion'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );

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
        // console.log('this._publicacion', this._publicacion);
        this._publicacionesService.putPublicacion(this._publicacion).subscribe(
          (data) => {
  
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
    
            Toast.fire({
              icon: 'success',
              title: 'La información se guardo de manera correcta.'
            });

            this._numeroPaso = 2;
            setTimeout( () => { this.router.navigate(['/publicar/ubicacion'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );
  
            //this.limpiarFormulario();
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
    
  }
}

limpiarFormulario(){
  this.formaOTI.reset({
    tipoOperacion : '',
    tipoPropiedad : '',
    subtipoPropiedad : ''
  });
  
}

pantallaSiguiente(){
  this._numeroPaso = 2;
  setTimeout( () => { this.router.navigate(['/publicar/ubicacion'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );

}

  obtenerSubTiposPropiedad(Id_TipoPropiedad : number) {
    let id_TP = 0;
    if (Id_TipoPropiedad == 0){
      id_TP = this.formaOTI.controls['tipoPropiedad'].value;
    }else{
      id_TP = Id_TipoPropiedad!;
    }
    debugger;
    this._tiposPropiedadService.getSubTiposPropiedad(id_TP).subscribe(
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
