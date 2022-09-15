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
  _publicacion: publicacion = new publicacion(0,0,null,null,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0,'','',null,null,0);
  _id_publicacion : number = 0;
  _subtiposPropiedad : subtipoPropiedad[] = [];
  _numeroPaso : number = 1;
  _esNuevo : boolean = true;
  _RenVenDesRemEven : number | null = 0;
  _esDesarrollo : boolean = false;
  _bloquearTipoOperacion = false;
  _bloquearDesarrollo = false;
  _bloquearSiPerteneceDesarrollo = false;
  _loading = false;

  formaOTI = this.fb.group({});

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

      //Cargamos todos los tipos de propiedad excepto 'Desarrollo' con id = 11
      data.forEach(item => {
        if (item.Id_TipoPropiedad != 11)
        this._tiposPropiedad.push(item);
      });
      //this._tiposPropiedad = data;
      });

  }

  seleccionarOperacion(){
    debugger;
    this._RenVenDesRemEven = this.formaOTI.controls['tipoOperacion'].value;

    if (this._RenVenDesRemEven == 3){
      //Agregamos el tipo de propiedad = 'Desarrollo' y lo seleccionamos en el combo
      this._tiposPropiedad.push(new tipoPropiedad(11, 'Desa', 'Desarrollo','desarrollos',11,new Date(), new Date(), 1, 1));
      this.formaOTI.patchValue({
        tipoPropiedad : 11,
        subtipoPropiedad : ''
      });
      this._bloquearDesarrollo = true;
    }
    else{

      //Eliminamos el tipo de propiedad = 'Desarrollo' y lo quitamos del combo para que no se muestre
      this._tiposPropiedad.forEach((item,index) => {
        if (item.Id_TipoPropiedad === 11){
          this._tiposPropiedad.splice(index,1); 
        }
      });

      // Seleccionamos por default el tipo de propiedad = 'Casa'
      this.formaOTI.patchValue({
        tipoPropiedad : 1,
        subtipoPropiedad : ''
      });
      this._bloquearDesarrollo = false;
    }

    this.obtenerSubTiposPropiedad(0);

  }

  CargarPublicacion(){
    //debugger;
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()!).subscribe(
          (data) => {
            //Next callback
            if((data.Id_Estatus === 13) ||(data.Id_Estatus === 14)){
              this.router.navigateByUrl('/micuenta/mis-anuncios');
            }

            this._publicacion = data;

            this._RenVenDesRemEven = data.Id_TipoOperacion;

            this.obtenerSubTiposPropiedad(data.Id_TipoPropiedad!)

            this.formaOTI.setValue({
              tipoOperacion    : data.Id_TipoOperacion,
              tipoPropiedad    : data.Id_TipoPropiedad,
              subtipoPropiedad : data.Id_SubtipoPropiedad
            });

            // Si es desarrollo el que se carga se bloquea el cambio de tipo de operacion
            if(data.Id_TipoOperacion === 3){
                this._bloquearDesarrollo = true;
                this._bloquearTipoOperacion = true;
            }

            // Bloquear boton de desarrollo si el anuncio ya pertenece a un desarrollo
            if(data.Id_PublicacionDesarrollo != null)
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
      tipoOperacion    : ['', [Validators.required] ],
      tipoPropiedad    : ['', [Validators.required] ],
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
      //debugger;
      if (this._publicacion.Id_Publicacion != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._publicacion.UID_Cliente = this._loginService.obtenerIdCliente();
      this._publicacion.Id_TipoOperacion = this.formaOTI.get('tipoOperacion')?.value;
      this._publicacion.Id_TipoPropiedad = this.formaOTI.get('tipoPropiedad')?.value;
      this._publicacion.Id_SubtipoPropiedad = this.formaOTI.get('subtipoPropiedad')?.value;
      this._publicacion.FechaAlta = new Date();
      this._publicacion.FechaModificacion = new Date();
      this._publicacion.Id_Usuario = 1;
      this._publicacion.Id_Estatus = 8;

      this._loading = true;

      if (this._esNuevo){
        this._publicacion.Id_Publicacion = 0;
        this._publicacion.PrecioDesde = 0;
        this._publicacion.PrecioDescuento = 0;
        this._publicacion.PrecioNegociable = 0;
        this._publicacion.RecamarasDesde = 0;
        this._publicacion.BaniosCompDesde = 0;
        this._publicacion.MedioBanioDesde = 0;
        this._publicacion.EstacionamientosDesde = 0;
        this._publicacion.SuperficieConstruidaDesde = 0;
        this._publicacion.SuperficieTerreno = 0;
        this._publicacion.NivelesConstruidos = 0;
        this._publicacionesService.postPublicacion(this._publicacion).subscribe(
          (data) => {
            //Next callback

            this._id_publicacion = data.Id_Publicacion;

            this._loading = false;

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

            this._loading = false;
  
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
                // Conflicto - Conflict
                Swal.fire({
                  icon: 'error',
                  title: 'Imposible crear mas publicaciones con estatus de Borrador',
                  text: 'Elimine algunas de las publicaciones para que pueda crear otra ó modifique alguna de las que ya tiene.',
                  showCancelButton: false,
                  showDenyButton: false,
                });
                break;
            }
  
          }
        );
      }
      else{
        // console.log('this._publicacion', this._publicacion);
        this._publicacionesService.putPublicacion(this._publicacion).subscribe(
          (data) => {

            this._loading = false;
  
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
