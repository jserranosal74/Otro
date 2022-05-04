import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { publicacion } from 'src/app/Models/procesos/publicacion.model';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { publicacionDetalle } from '../../../Models/procesos/publicacionDetalle.model';
import { PublicacionDetalleService } from 'src/app/Services/Procesos/publicacionDetalle.service';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent implements OnInit {
  _numeroPaso = 1;
  _publicacion: publicacion = new publicacion(0,0,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0);
  _id_publicacion : number = 0;
  _AniosAntiguedad : number | null = 0;
  _mostrarAniosAntiguedad : boolean = false;
  _publicacionesHijas : publicacion[] = [];
  _publicacionDetalle : publicacionDetalle[] = [];
  _publicacionHija : string = '';

  _checkMoneda1 : boolean = false;
  _checkMoneda2 : boolean = false;

  _checkNueva : boolean = false;
  _checkEnConstruccion : boolean = false;
  _checkAnios : boolean = false;
  _esDesarrollo : boolean = false;
  _publicacionActivada : boolean = false;

  formCaracteristicas = this.fb.group({
    recamarasDesde                  : [ '' ],
    recamarasHasta                  : [ '' ],
    baniosCompDesde                 : [ '' ],
    baniosCompHasta                 : [ '' ],
    mediosbaniosDesde               : [ '' ],
    mediosbaniosHasta               : [ '' ],
    estacionamientoDesde            : [ '' ],
    estacionamientoHasta            : [ '' ],
    superficieConstruidaDesde       : [ '' ],
    superficieConstruidaHasta       : [ '' ],
    superficieTerreno               : [ '' ],
    unidadesDisponibles             : [ '' ],
    nivelesConstruidos              : [ '' ],
    nivelPropiedad                  : [ '' ],
    coutaMantenimiento              : [ '' ],
    aniosAntiguedad                 : [ '' ],
    precioDesde                     : [ '' ],
    precioHasta                     : [ '' ],
    precioNegociable                : [ '' ],
    tituloPublicacion               : [ '' ],
    descripcion                     : [ '' ]
  });

  constructor(  private _activatedRoute: ActivatedRoute,
                private _publicacionesService: PublicacionesService,
                private _publicacionDetalleService: PublicacionDetalleService,
                private _loginService: LoginService,
                private fb: FormBuilder,
                private router: Router) {

    this._activatedRoute.queryParams.subscribe(params => {
      this._id_publicacion = params['id_Publicacion'];
      if (this._id_publicacion === undefined){
        this._id_publicacion = 0;
        setTimeout( () => { this.router.navigateByUrl('/publicar/operacion-tipo-inmueble'); }, 700 );
      }
    });

    this.crearFormulario();
    this.inicializarFormulario();
    this.CargarPublicacion();
    //this.obtenerAnunciosAEnlazar();
   }

  ngOnInit(): void {
  }

  crearFormulario() {
      this.formCaracteristicas = this.fb.group({
        recamarasDesde            : [ '' ],
        recamarasHasta            : [ '' ],
        baniosCompDesde           : [ '' ],
        baniosCompHasta           : [ '' ],
        mediosbaniosDesde         : [ '' ],
        mediosbaniosHasta         : [ '' ],
        estacionamientoDesde      : [ '' ],
        estacionamientoHasta      : [ '' ],
        superficieConstruidaDesde : [ '' ],
        superficieConstruidaHasta : [ '' ],
        superficieTerreno         : [ '' ],
        unidadesDisponibles       : [ '' ],
        nivelesConstruidos        : [ '' ],
        nivelPropiedad            : [ '' ],
        coutaMantenimiento        : [ '' ],
        aniosAntiguedad           : [ '' ],
        precioDesde               : [ '' ],
        precioHasta               : [ '' ],
        precioNegociable          : [ '' ],
        tituloPublicacion         : [ '' ],
        descripcion               : [ '' ]
      });

  }

  inicializarFormulario() {
    this.formCaracteristicas.patchValue({
      recamarasDesde            : 0,
      recamarasHasta            : 0,
      baniosCompDesde           : 0,
      baniosCompHasta           : 0,
      mediosbaniosDesde         : 0,
      mediosbaniosHasta         : 0,
      estacionamientoDesde      : 0,
      estacionamientoHasta      : 0,
      superficieConstruidaDesde : 0,
      superficieConstruidaHasta : 0,
      superficieTerreno         : 0,
      unidadesDisponibles       : 0,
      nivelesConstruidos        : 0,
      nivelPropiedad            : 0,
      coutaMantenimiento        : 0,
      aniosAntiguedad           : '',
      precioDesde               : 0,
      precioHasta               : 0,
      precioNegociable          : 0,
      tituloPublicacion         : '',
      descripcion               : '',
    });

}

  regresar(){
    this._numeroPaso = 2;

    //setTimeout( () => { this.router.navigateByUrl('/publicar/fotosyvideos'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/ubicacion'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  pantallaSiguiente(){
    this._numeroPaso = 2;
    setTimeout( () => { this.router.navigate(['/publicar/fotosyvideos'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  seleccionarAntiguedad(intAnios : number){
    // debugger;
    this._AniosAntiguedad = intAnios;
    if ((intAnios === 0) || (intAnios === -1))
      this._mostrarAniosAntiguedad = true;
    
    else
      this._mostrarAniosAntiguedad = false;
    // this._AniosAntiguedad = this.formCaracteristicas.controls['aniosAntiguedad'].value;
    
  }

  CargarPublicacion(){
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
          (data) => {
            //Next callback

            if (data.Id_TipoOperacion === 3){
              this._publicacionDetalleService.getPublicacionDetalleCompleta(this._loginService.obtenerIdCliente(), this._id_publicacion, 1).subscribe(
                (dataPublicacionDetalle) => {
                  //Next callback
                  this._publicacionesHijas = dataPublicacionDetalle;
                },
                (error: HttpErrorResponse) => {
          
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

              this._publicacionDetalleService.getPublicacionDetalle(this._loginService.obtenerIdCliente(), this._id_publicacion).subscribe(
                (dataPD) => {
                  //Next callback
                  this._publicacionDetalle = dataPD;
                },
                (error: HttpErrorResponse) => {
          
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

            this._publicacion = data;

            if((data.Id_Estatus === 13) ||(data.Id_Estatus === 14)){
              this._publicacionActivada = true;
            }

            this._checkMoneda1 = data.Id_Moneda == 1 ? true : false;
            this._checkMoneda2 = data.Id_Moneda == 2 ? true : false;

            this._checkNueva = (data.Antiguedad === 0 || data.Antiguedad === null)? true : false;
            this._checkEnConstruccion = data.Antiguedad === -1 ? true : false;
            this._checkAnios = data.Antiguedad! >= 1 ? true : false;

            if (data.Antiguedad! <= 0){
              this._mostrarAniosAntiguedad = true;
            }
            else{
              this._mostrarAniosAntiguedad = false;
            }

            if (data.Id_TipoOperacion === 3){
              this._esDesarrollo = true;
            }

            this.formCaracteristicas.patchValue({
              recamarasDesde            : data.RecamarasDesde,
              recamarasHasta            : data.RecamarasHasta,
              baniosCompDesde           : data.BaniosCompDesde,
              baniosCompHasta           : data.BaniosCompHasta,
              mediosbaniosDesde         : data.MedioBanioDesde,
              mediosbaniosHasta         : data.MedioBanioHasta,
              estacionamientoDesde      : data.EstacionamientosDesde,
              estacionamientoHasta      : data.EstacionamientosHasta,
              superficieConstruidaDesde : data.SuperficieConstruidaDesde,
              superficieConstruidaHasta : data.SuperficieConstruidaHasta,
              superficieTerreno         : data.SuperficieTerreno,
              unidadesDisponibles       : data.UnidadesDisponibles,
              nivelesConstruidos        : data.NivelesConstruidos,
              nivelPropiedad            : data.NivelPropiedad,
              coutaMantenimiento        : data.CuotaMantenimiento,
              aniosAntiguedad           : data.Antiguedad,
              precioDesde               : data.PrecioDesde,
              precioHasta               : data.PrecioHasta,
              precioNegociable          : data.PrecioNegociable,
              tituloPublicacion         : data.TituloPublicacion,
              descripcion               : data.Descripcion,
            });

          },
          (error: HttpErrorResponse) => {
            //Error callback

            this._id_publicacion = 0;
            this.router.navigateByUrl('/publicar/operacion-tipo-inmueble');

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
  }

  guardarCaracteristicas() {

    //Envio de la informacion al servidor
      //debugger;
      this._publicacion.Id_Publicacion = this._id_publicacion;
      this._publicacion.Id_Cliente = this._loginService.obtenerIdCliente();
      this._publicacion.RecamarasDesde = this.formCaracteristicas.get('recamarasDesde')?.value;
      this._publicacion.RecamarasHasta = this.formCaracteristicas.get('recamarasHasta')?.value;
      this._publicacion.BaniosCompDesde = this.formCaracteristicas.get('baniosCompDesde')?.value;
      this._publicacion.BaniosCompHasta = this.formCaracteristicas.get('baniosCompHasta')?.value;
      this._publicacion.MedioBanioDesde = this.formCaracteristicas.get('mediosbaniosDesde')?.value;
      this._publicacion.MedioBanioHasta = this.formCaracteristicas.get('mediosbaniosHasta')?.value;
      this._publicacion.EstacionamientosDesde = this.formCaracteristicas.get('estacionamientoDesde')?.value;
      this._publicacion.EstacionamientosHasta = this.formCaracteristicas.get('estacionamientoHasta')?.value;
      this._publicacion.SuperficieConstruidaDesde = this.formCaracteristicas.get('superficieConstruidaDesde')?.value;
      this._publicacion.SuperficieConstruidaHasta = this.formCaracteristicas.get('superficieConstruidaHasta')?.value;
      this._publicacion.SuperficieTerreno = this.formCaracteristicas.get('superficieTerreno')?.value;
      this._publicacion.CuotaMantenimiento = this.formCaracteristicas.get('coutaMantenimiento')?.value;

      if ((this._AniosAntiguedad === 0) || (this._AniosAntiguedad === -1))
        this._publicacion.Antiguedad = this._AniosAntiguedad;
      else
        this._publicacion.Antiguedad = this.formCaracteristicas.get('aniosAntiguedad')?.value

      this._publicacion.PrecioDesde = this.formCaracteristicas.get('precioDesde')?.value;
      this._publicacion.PrecioHasta = this.formCaracteristicas.get('precioHasta')?.value;

      if (this._checkMoneda1)
        this._publicacion.Id_Moneda = 1;
      else
        this._publicacion.Id_Moneda = 2;

      if (this.formCaracteristicas.get('precioNegociable')?.value)
        this._publicacion.PrecioNegociable = 1;
      else
        this._publicacion.PrecioNegociable = 0;

      this._publicacion.NivelesConstruidos = this.formCaracteristicas.get('nivelesConstruidos')?.value;
      this._publicacion.NivelPropiedad = this.formCaracteristicas.get('nivelPropiedad')?.value;
      this._publicacion.TituloPublicacion = this.formCaracteristicas.get('tituloPublicacion')?.value;
      this._publicacion.Descripcion = this.formCaracteristicas.get('descripcion')?.value;
      this._publicacion.FechaModificacion = new Date();

      // Convertir objeto de publicacion => publicacionDetalle para guardar
      // this._publicacionesHijas.forEach(item => {
      //   this._publicacionDetalle.push(new publicacionDetalle(0,this._id_publicacion, item.Id_Cliente, item.Id_Publicacion, item.Id_Cliente, 0 ));
      // })

      this._publicacionesService.putPublicacion(this._publicacion).subscribe(
        (data) => {

          if (this._publicacion.Id_TipoOperacion === 3){
              this._publicacionDetalleService.postPublicacionDetalle(JSON.stringify(this._publicacionDetalle)).subscribe( data2 => {

                console.log('data2', data2);

              },
                (error: HttpErrorResponse) => {
                  switch (error.status) {
                    case 401:
                      this._loginService.cerarSesion();
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

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
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
          setTimeout( () => { this.router.navigate(['/publicar/fotosyvideos'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );

        },
        (error: HttpErrorResponse) => {
          //Error callback

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

  cambiarMoneda(i : number){
    if(i===1){
      this._checkMoneda1 = true;
      this._checkMoneda2 = false;
    }
    else{
      this._checkMoneda1 = false;
      this._checkMoneda2 = true;
    }
  }

  cambiarTipoAnuncio(i : number){
    if(i === 1){
      this._esDesarrollo = true;
    }
    else{
      this._esDesarrollo = false;
    }
  }

  quitarPublicacionHija(item : publicacion){
    var Id_Eliminado : number;

    this._publicacionesHijas.forEach((element,index)=>{
      if ((element.Id_Publicacion === item.Id_Publicacion) && (element.Id_Cliente === item.Id_Cliente)) {
        this._publicacionesHijas.splice(index,1);
      }
    });
    debugger;
    this._publicacionDetalle.forEach((element,index)=>{
      if ((element.Id_PublicacionHija === item.Id_Publicacion) && (element.Id_ClienteHija === item.Id_Cliente)) {
        Id_Eliminado = element.Id_PublicacionDetalle;
        this._publicacionDetalle.splice(index,1);
      }
      if ((Id_Eliminado != 0) && (element.Id_PublicacionHija === item.Id_Publicacion) && (element.Id_ClienteHija === item.Id_Cliente)) {
        
        this._publicacionDetalleService.deletePublicacionDetalle(element.Id_PublicacionDetalle).subscribe( data2 => {
          Id_Eliminado = 0;
        },
          (error: HttpErrorResponse) => {
            switch (error.status) {
              case 401:
                this._loginService.cerarSesion();
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
    });

  }

  obtenerAnunciosAEnlazar(){
    this._publicacionDetalleService.getPublicacionDetalleCompleta(this._loginService.obtenerIdCliente(), this._id_publicacion, 0).subscribe(
      (data) => {
        //Next callback

        this._publicacionDetalle.forEach((item,index) => {
          if (item.Id_PublicacionDetalle === 0){
            this._publicacionDetalle.splice(index,1);
          }
        });
        
        var existePublicacion = 0;
        data.forEach(item => {
          existePublicacion = 0;
          this._publicacionesHijas.forEach( PH => {
            if(item.Id_Publicacion === PH.Id_Publicacion){
              existePublicacion = 1;
            }
          })
          if (existePublicacion === 0){
            this._publicacionesHijas.push(item);
            this._publicacionDetalle.push(new publicacionDetalle(0,this._id_publicacion, item.Id_Cliente, item.Id_Publicacion, item.Id_Cliente, 0 ));
          }
        });

        //this._publicacionesHijas = data;
      },
      (error: HttpErrorResponse) => {
        //Error callback

        // this._id_publicacion = 0;
        // this.router.navigateByUrl('/publicar/operacion-tipo-inmueble');

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
    
            Toast.fire({
              icon: 'info',
              title: 'No existen mas anuncios que agregar'
            });
            break;
          case 409:
            break;
        }

      }
    );
  }

}