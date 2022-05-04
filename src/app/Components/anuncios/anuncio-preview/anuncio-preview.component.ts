import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';
import { MultimediaPublicacionService } from 'src/app/Services/Procesos/FotosPublicacion.service';
import { PublicacionDetalleService } from 'src/app/Services/Procesos/publicacionDetalle.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';

import { publicacionDetalle } from 'src/app/Models/procesos/publicacionDetalle.model';
import { publicacion, publicacionCaracteristica, publicacionMultimedia } from 'src/app/Models/procesos/publicacion.model';
import { FavoritosClienteService } from 'src/app/Services/Procesos/misFavoritos.service';
import { favoritoClienteParams } from 'src/app/Models/procesos/favoritoCliente.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-anuncio-preview',
  templateUrl: './anuncio-preview.component.html',
  styleUrls: ['./anuncio-preview.component.css']
})
export class AnuncioPreviewComponent implements OnInit {
  formaMensajeVendedor = this.fb.group([]);
  _infoURL : string = '';
  _id_publicacion : number = 0;
  _publicacion : publicacion = new publicacion(0,0,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0);
  _publicacionDetalle : publicacionDetalle[] = [];
  _publicacionMultimedia : publicacionMultimedia[] = [];
  _caracteristicasGenerales : publicacionCaracteristica[] = [];
  _servicios : publicacionCaracteristica[] = [];
  _exteriores : publicacionCaracteristica[] = [];
  _ambientes : publicacionCaracteristica[] = [];
  _multimedia : publicacionMultimedia[] = [];

  _publicacionActivada : boolean = false;
  _estaComoFavorito : boolean = false;
  _casiFavorito : boolean = false;

  constructor( private _activatedRoute : ActivatedRoute,
               private router : Router,
               private fb: FormBuilder,
               private _publicacionesService: PublicacionesService,
               private _publicacionDetalleService: PublicacionDetalleService,
               private _fotosPublicacionService: MultimediaPublicacionService,
               private _favoritosClienteService : FavoritosClienteService,
               private _loginService: LoginService ) {

    // Se obtiene el Id de la publicacion a visualizar
    this._activatedRoute.queryParams.subscribe(params => {
      this._infoURL = this._activatedRoute.snapshot.params['info'];
      this._id_publicacion = parseInt(this._infoURL.split('-')[this._infoURL.split('-').length-1]);
      if (this._id_publicacion === undefined){
        setTimeout( () => { this.router.navigateByUrl('/micuenta/miperfil'); }, 700 );
      }
    });

    this.probarAutenticacion();
    this.crearFormularioMensaje();
    this.CargarPublicacion();
    this.CargarCaracteristicas();
  }

  ngOnInit(): void {
  }

  probarAutenticacion(){
    this._loginService.sesionValida().subscribe((data)=> { 

    },(error : HttpErrorResponse) => {
    console.log('error',error);
        switch (error.status) {
          case 401:
            this._loginService.cerarSesion();
            this.router.navigateByUrl('/login');
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

  crearFormularioMensaje() {
    this.formaMensajeVendedor = this.fb.group({
      nombre   : [ '' ],
      telefono : [ '' ],
      email    : [ '' ],
      mensaje  : [ '' ]
    });
  }

  limpiarFormularioMensaje() {
    this.formaMensajeVendedor = this.fb.group({
      nombre   : '',
      telefono : '',
      email    : '',
      mensaje  : ''
    });
  }

  CargarPublicacion(){
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
          (data) => {
            //Next callback

            if (data.Id_TipoOperacion === 3){
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

            this._favoritosClienteService.getFavoritoCliente(this._loginService.obtenerIdCliente(), this._publicacion.Id_Cliente, this._publicacion.Id_Publicacion).subscribe(
              (dataFav) => {
                //Next callback
                this._estaComoFavorito = dataFav === 0 ? false : true;
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

  CargarCaracteristicas(){
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacionCaracteristicas(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
          (data) => {
            //Next callback
            console.log(data);

            //this._caracteristicasAdicionales = data;

            data.forEach( item => { 
              if (item.Id_TipoCaracteristica === 1){
                  this._caracteristicasGenerales.push(item);
                }
                if (item.Id_TipoCaracteristica === 2){
                  this._servicios.push(item)
                }
                if (item.Id_TipoCaracteristica === 3){
                  this._exteriores.push(item)
                }
                if (item.Id_TipoCaracteristica === 5){
                  this._ambientes.push(item)
                }
            });

          },
          (error: HttpErrorResponse) => {
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

  CargarFotosPublicacion(){
    //debugger;
    if (this._id_publicacion != 0) {
        this._fotosPublicacionService.getFotosPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
          (data) => {
            //console.log(data);

            data.forEach(item => {
              //if (item.Id_TipoMultimedia === 1) {
                this._multimedia.push(item);
              //}
            });

            // data.forEach(element => {
            //   if (element.Id_TipoMultimedia === 2) {
            //     this.videos.push( this.fb.group({ Id_Multimedia : element.Id_Multimedia, 
            //                                       Id_TipoMultimedia : element.Id_TipoMultimedia,
            //                                       Url : element.Url, 
            //                                       Descripcion : element.Descripcion,
            //                                       Predeterminada : element.Predeterminada,
            //                                       ImagenBase64 : ''
            //                                     }));
            //   }
            // });

          },
          (error: HttpErrorResponse) => {
            //this._id_publicacion = 0;
            //this.router.navigateByUrl('/publicar/operacion-tipo-inmueble');
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

  agregarFavorito(){
    debugger;
    if(!this._estaComoFavorito){
      this._favoritosClienteService.postFavoritoCliente(new favoritoClienteParams(this._loginService.obtenerIdCliente(), this._publicacion.Id_Cliente, this._publicacion.Id_Publicacion)).subscribe(
        (data) => {
  
          // const Toast = Swal.mixin({
          //   toast: true,
          //   position: 'top-end',
          //   showConfirmButton: false,
          //   timer: 1000,
          //   timerProgressBar: true,
          //   didOpen: (toast) => {
          //     toast.addEventListener('mouseenter', Swal.stopTimer)
          //     toast.addEventListener('mouseleave', Swal.resumeTimer)
          //   }
          // });
  
          // Toast.fire({
          //   icon: 'success',
          //   title: 'La información se guardo de manera correcta.'
          // });
  
          this._estaComoFavorito = true;
  
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
    else{
      this._favoritosClienteService.deleteFavoritoCliente(new favoritoClienteParams(this._loginService.obtenerIdCliente(), this._publicacion.Id_Cliente, this._publicacion.Id_Publicacion)).subscribe(
        (data) => {
  
          this._estaComoFavorito = false;
  
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
    
  }

  enviarMensaje(){

  }

}
