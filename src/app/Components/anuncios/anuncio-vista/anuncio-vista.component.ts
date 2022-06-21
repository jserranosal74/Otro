import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';
import { MultimediaPublicacionService } from 'src/app/Services/Procesos/FotosPublicacion.service';
import { PublicacionDetalleService } from 'src/app/Services/Procesos/publicacionDetalle.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { ClientesService } from '../../../Services/Catalogos/clientes.service';
import { AsentamientosService } from 'src/app/Services/Catalogos/asentamientos.service';
import { FavoritosClienteService } from 'src/app/Services/Procesos/misFavoritos.service';
import { PublicacionMensajesService } from '../../../Services/Procesos/publicacionMensajes.service';

import { publicacionDetalleVista } from 'src/app/Models/procesos/publicacionDetalle.model';
import { publicacion, publicacionCaracteristica, publicacionMultimedia } from 'src/app/Models/procesos/publicacion.model';
import { favoritoClienteParams } from 'src/app/Models/procesos/favoritoCliente.model';
import { publicacionMensaje } from 'src/app/Models/procesos/publicacionMensaje.model';
import { asentamientoUbicacion } from '../../../Models/catalogos/asentamiento.model';
import { clienteVista } from 'src/app/Models/catalogos/cliente.model';
import { login } from 'src/app/Models/Auxiliares/login.model';


@Component({
  selector: 'app-anuncio-vista',
  templateUrl: './anuncio-vista.component.html',
  styleUrls: ['./anuncio-vista.component.css']
})

export class AnuncioVistaComponent implements OnInit {
  formaMensajeVendedor = this.fb.group([]);
  formIniciarsesion = this.fb.group([]);
  formaDatosUsuario = this.fb.group([]);
  _infoURL : string = '';
  _id_publicacion : number = 0;
  _publicacion : publicacion = new publicacion(0,0,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0);
  _publicacionDetalle : publicacionDetalleVista[] = [];
  _publicacionMultimedia : publicacionMultimedia[] = [];
  _caracteristicasGenerales : publicacionCaracteristica[] = [];
  _servicios : publicacionCaracteristica[] = [];
  _exteriores : publicacionCaracteristica[] = [];
  _ambientes : publicacionCaracteristica[] = [];
  _multimedia : publicacionMultimedia[] = [];
  _asentamientoUbicacion : asentamientoUbicacion = new asentamientoUbicacion(0,0,0,0,'','','','','',0,0);
  _clienteVista : clienteVista = new clienteVista(0,'','','','',[]);
  _usuarioVista : clienteVista = new clienteVista(0,'','','','',[]);
  //_clienteMediosContacto : clienteMedioContacto[] = [];

  _fotosPrincipales : string[] = [];

  _publicacionActivada : boolean = false;
  _estaComoFavorito : boolean = false;
  _casiFavorito : boolean = false;
  _telefono : string = '';
  _telefonoOculto : boolean = false;
  _existenUnidadesVenta : boolean = false;
  _existenUnidadesRenta : boolean = false;
  _usuarioAutenticado : boolean = false;
  _loading : boolean = false;

  _gm_center = {lat: 21.89362, lng: -102.31281};
  _gm_zoom = 15;
  _gm_display?: google.maps.LatLngLiteral;

  obtenerTipo = 'password';
  // formIniciarsesion = this.fb.group({
  //   correo    : [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ],
  //   password1 : ['', Validators.required]
  // });

  @ViewChild('myModalIniciarSesion') modalIniciarSesion : any;
  @ViewChild('myModalCloseLogin') modalCloseLogin : any;
  @ViewChild('myModalDatosUsuario') modalDatosUsuario : any;
  @ViewChild('myModalCloseDatosUsuario') modalCloseDatosUsuario : any;

  constructor( private _activatedRoute : ActivatedRoute,
               private router : Router,
               private fb: FormBuilder,
               private _publicacionesService: PublicacionesService,
               private _publicacionDetalleService: PublicacionDetalleService,
               private _multimediaPublicacionService: MultimediaPublicacionService,
               private _favoritosClienteService : FavoritosClienteService,
               private _publicacionMensajeService : PublicacionMensajesService,
               private _asentamientosService : AsentamientosService,
               private _clienteService : ClientesService,
               private _loginService: LoginService ) {

    // Se obtiene el Id de la publicacion a visualizar
    this._activatedRoute.queryParams.subscribe(params => {
      this._infoURL = this._activatedRoute.snapshot.params['info'];
      this._id_publicacion = parseInt(this._infoURL.split('-')[this._infoURL.split('-').length-1]);
      if (this._id_publicacion === undefined){
        setTimeout( () => { this.router.navigateByUrl('/micuenta/miperfil'); }, 700 );
      }
    });

    this.crearFormularioInicioSesion();
    this.crearFormularioMensaje();
    this.crearFormularioDatosUsuario();
    this.CargarPublicacion();
    this.validarAutenticacion();
  }

  ngOnInit(): void {
  }

  validarAutenticacion(){
    //debugger;
    this._loginService.usuarioAutenticadoServidor().subscribe((data)=> { 

      //console.log('usuarioAutenticadoServidor',data);

      if (data){
        this._usuarioAutenticado = true;
        this.CargarUsuario();
      }else{
        localStorage.removeItem('usuario');
        this._usuarioAutenticado = false;
      }

    },(error : HttpErrorResponse) => {
      localStorage.removeItem('usuario');
      this._usuarioAutenticado = false;
      //console.log('error',error);
        switch (error.status) {
          case 401:
            this._loginService.cerarSesion();
            //this.router.navigateByUrl('/login');
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

  crearFormularioInicioSesion() {
    this.formIniciarsesion = this.fb.group({
      correo    : [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ],
      password1 : [ '', Validators.required]
    });
  }

  crearFormularioMensaje() {
    this.formaMensajeVendedor = this.fb.group({
      nombre   : [ '', Validators.required ],
      telefono : [ '', Validators.required ],
      email    : [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ],
      mensaje  : [ 'Hola, me interesa este inmueble que vi en Inmuebles MZ y quiero que me contacten. Gracias.', Validators.required ]
    });
  }

  crearFormularioDatosUsuario() {
    this.formaDatosUsuario = this.fb.group({
      nombreDU   : [ '', Validators.required ],
      telefonoDU : [ '', Validators.required ],
      emailDU    : [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ],
      mensajeDU  : [ '' ]
    });
  }

  limpiarFormularioMensaje() {
    this.formaMensajeVendedor.reset({
      nombre   : this._usuarioVista.Nombre + ' ' + this._usuarioVista.Apellidos,
      telefono : '',
      email    : this._usuarioVista.Email,
      mensaje  : 'Hola, me interesa este inmueble que vi en Inmuebles MZ y quiero que me contacten. Gracias.'
    });
  }

  limpiarFormularioInicioSesion() {
    this.formIniciarsesion.reset({
      correo   : '',
      password1 : ''
    });
  }

  limpiarFormularioDatosUsuario() {
    this.formaMensajeVendedor.reset({
      nombreDU   : '',
      telefonoDU : '',
      emailDU    : '',
      mensajeDU  : ''
    });
  }

  CargarPublicacion(){
    debugger;
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacionVista(this._id_publicacion, this._loginService.obtenerIdCliente() === 0 ? null : this._loginService.obtenerIdCliente() ).subscribe(
          (data) => {
            //console.log(data);

            this._publicacion = data;

            if (data.Id_TipoOperacion === 3){
              this._existenUnidadesVenta = false;
              this._existenUnidadesRenta = false;
              this._publicacionDetalleService.getPublicacionDetalleVista(this._publicacion.Id_Cliente, this._publicacion.Id_Publicacion).subscribe(
                (dataPD) => {
                  //Next callback
                  //console.log(dataPD);
                  this._publicacionDetalle = dataPD;

                  dataPD.forEach(item => {
                    if (item.Id_TipoOperacion === 1){
                      this._existenUnidadesVenta = true;
                    }
                    if (item.Id_TipoOperacion === 2){
                      this._existenUnidadesRenta = true;
                    }
                  });

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

            if((data.Id_Estatus === 13) ||(data.Id_Estatus === 14)){
              this._publicacionActivada = true;
            }

            //Solo obtiene el estatus de favorito si esta autenticado
            if (this._loginService.obtenerIdCliente() != 0){
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
            }

            this._asentamientosService.getAsentamientoUbicacion(this._publicacion.Id_Asentamiento!).subscribe(
              (dataAse) => {
                this._asentamientoUbicacion = dataAse;
                this._gm_center = {lat: dataAse.Latitud, lng: dataAse.Longitud};

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

            this.CargarCaracteristicas();
            this.CargarMultimediaPublicacion();
            this.CargarCliente();

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
        this._publicacionesService.getPublicacionCaracteristicas(this._publicacion.Id_Publicacion, this._publicacion.Id_Cliente).subscribe(
          (data) => {
            //console.log(data);

            //Solo cargamos las seleccionadas por el cliente
            data.forEach( item => { 
              if (item.Id_TipoCaracteristica === 1 && item.Valor){
                  this._caracteristicasGenerales.push(item);
                }
                if (item.Id_TipoCaracteristica === 2 && item.Valor){
                  this._servicios.push(item)
                }
                if (item.Id_TipoCaracteristica === 3 && item.Valor){
                  this._exteriores.push(item)
                }
                if (item.Id_TipoCaracteristica === 5 && item.Valor){
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

  CargarMultimediaPublicacion(){
    //debugger;
    if (this._id_publicacion != 0) {
        this._multimediaPublicacionService.getFotosPublicacion(this._publicacion.Id_Publicacion, this._publicacion.Id_Cliente).subscribe(
          (data) => {
            //console.log(data);
            let index : number = 0;
            data.forEach(item => {
              if (item.Id_TipoMultimedia === 1) {
                this._multimedia.push(item);
                this._fotosPrincipales[index] = item.Url!;
                index++;
              }
            });

            //console.log(this._fotosPrincipales);

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
    //debugger;
    if (this._loginService.obtenerIdCliente() === 0){
      this.limpiarFormularioInicioSesion();
      this._estaComoFavorito = false;
      this.validarAutenticacion();
      this.modalIniciarSesion.nativeElement.click();
      return;
    }

    if (!this._estaComoFavorito) {
      this._favoritosClienteService.postFavoritoCliente(new favoritoClienteParams(this._loginService.obtenerIdCliente(), this._publicacion.Id_Cliente, this._publicacion.Id_Publicacion)).subscribe(
        (data) => {
  
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

  compartirPublicacion(){
    
  }

  enviarMensaje(){

    if (this.formaMensajeVendedor.invalid) {
      return Object.values(this.formaMensajeVendedor.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
    else{

      this._loading = true;

      let _publicacionMensaje : publicacionMensaje = new publicacionMensaje(0,0,0,0,0,'','','','','','',new Date(), new Date(),0,0);

      _publicacionMensaje.Id_Cliente = this._publicacion.Id_Cliente;
      _publicacionMensaje.Id_Publicacion = this._publicacion.Id_Publicacion;
      _publicacionMensaje.Id_ClienteMensaje = (this._loginService.obtenerIdCliente() == 0 ? null : this._loginService.obtenerIdCliente() );
      _publicacionMensaje.Nombre = this.formaMensajeVendedor.get('nombre')?.value;
      _publicacionMensaje.Email = this.formaMensajeVendedor.get('email')?.value;
      _publicacionMensaje.Telefono = this.formaMensajeVendedor.get('telefono')?.value;
      _publicacionMensaje.Mensaje = this.formaMensajeVendedor.get('mensaje')?.value;
      _publicacionMensaje.Accion = 2;
      _publicacionMensaje.Componente = 'anuncio-vista';
    
      this._publicacionMensajeService.postPublicacionMensaje(_publicacionMensaje).subscribe(
        (data) => {
          //console.log('postPublicacionMensaje',data);
          this.limpiarFormularioMensaje();

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
            title: 'Su mensaje ha sido enviado de manera satisfactoria'
          });



          // this._vistaUsuarioService.postVistaUsuario(new vistaUsuario(this._publicacion.Id_Publicacion, this._publicacion.Id_Cliente, this._loginService.obtenerIdCliente() === 0? null : this._loginService.obtenerIdCliente(),'Envió mensaje', 'anuncio-vista.html', new Date())).subscribe(
          //   (dataVista) => {
      
          //     //console.log(dataVista);
          //     this._loading = false;
      
          //   },
          //   (error: HttpErrorResponse) => {
          //     console.log('error: postVistaUsuario',error);
          //     this._loading = false;
          //     switch (error.status) {
          //       case 401:
          //         break;
          //       case 403:
          //         break;
          //       case 404:
          //         break;
          //       case 409:
          //         break;
          //     }
      
          //     //throw error;   //You can also throw the error to a global error handler
          //   }
          // );


        },
        (error: HttpErrorResponse) => {
          console.log('error:postPublicacionMensaje',error);
          this._loading = false;
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

  verTelefonoContacto(){
    debugger;
    if (this._loginService.obtenerIdCliente() === 0){
      this.validarAutenticacion();
      this.modalDatosUsuario.nativeElement.click();
      return;
    }else{
      if (this._telefonoOculto){
        this._clienteVista.ClienteMedioContacto.forEach(item=>{
          if (item.Id_MedioContacto === 1){
            this._telefono = item.Descripcion;
            this._telefonoOculto = false;
          }
        })
  
        this._publicacionMensajeService.postPublicacionMensaje(new publicacionMensaje(null,this._publicacion.Id_Publicacion, this._publicacion.Id_Cliente, this._loginService.obtenerIdCliente() === 0? null : this._loginService.obtenerIdCliente(),1,'anuncio-vista','',this.formaDatosUsuario.get('nombreDU')?.value, this.formaDatosUsuario.get('telefonoDU')?.value, this.formaDatosUsuario.get('emailDU')?.value, 'Se muestra telefono a usuario', new Date(),new Date(),0,0)).subscribe(
          (dataVista) => {
  
            //console.log(dataVista);
    
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
    
            //throw error;   //You can also throw the error to a global error handler
          }
        );
  
      }
    }
  }

  get nombreNoValido() {
    return ( this.formaMensajeVendedor.get('nombre')?.invalid && this.formaMensajeVendedor.get('nombre')?.touched );
  }

  get emailNoValido() {
    return ( this.formaMensajeVendedor.get('email')?.invalid && this.formaMensajeVendedor.get('email')?.touched );
  }

  get telefonoNoValido() {
    return ( this.formaMensajeVendedor.get('telefono')?.invalid && this.formaMensajeVendedor.get('telefono')?.touched );
  }

  get mensajeNoValido() {
    return ( this.formaMensajeVendedor.get('mensaje')?.invalid && this.formaMensajeVendedor.get('mensaje')?.touched );
  }

  get nombreDUNoValido() {
    return ( this.formaDatosUsuario.get('nombreDU')?.invalid && this.formaDatosUsuario.get('nombreDU')?.touched );
  }

  get emailDUNoValido() {
    return ( this.formaDatosUsuario.get('emailDU')?.invalid && this.formaDatosUsuario.get('emailDU')?.touched );
  }

  get telefonoDUNoValido() {
    return ( this.formaDatosUsuario.get('telefonoDU')?.invalid && this.formaDatosUsuario.get('telefonoDU')?.touched );
  }

  CargarCliente(){
    //debugger;
    //console.log('CargarCliente');
    this._clienteService.getClienteVista(this._publicacion.Id_Cliente, null).subscribe(
      (dataCliente) => {

        this._clienteVista = dataCliente;

        dataCliente.ClienteMedioContacto.forEach(item=>{
          if (item.Id_MedioContacto === 1){
            this._telefono = item.Descripcion.substring(0,5);
            this._telefonoOculto = true;
          }
        })

      },
      (error: HttpErrorResponse) => {
        console.log('error: CargarCliente');
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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  CargarUsuario(){
    //debugger;
    this._clienteService.getClienteVista(this._loginService.obtenerIdCliente(), null).subscribe(
      (dataUsuario) => {
        //console.log('this._usuario',dataUsuario);
        let telefono = '';
        this._usuarioVista = dataUsuario;

        dataUsuario.ClienteMedioContacto.forEach(item=>{
          if (item.Id_MedioContacto === 2){
            telefono = item.Descripcion;
          }
        });

        this.formaMensajeVendedor.patchValue({
          nombre   : this._usuarioVista.Nombre + ' ' + this._usuarioVista.Apellidos,
          telefono : telefono,
          email    : this._usuarioVista.Email,
          mensaje  : 'Hola, me interesa este inmueble que vi en Inmuebles MZ y quiero que me contacten. Gracias.'
        });

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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  abrirVentanaWhatsApp(){

    if (this.formaMensajeVendedor.invalid) {
      return Object.values(this.formaMensajeVendedor.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    let WhatssApp : string = '';
    this._clienteVista.ClienteMedioContacto.forEach(item=>{
      if(item.Id_MedioContacto === 2){
        WhatssApp = item.Descripcion;
      }
    })

    this._publicacionMensajeService.postPublicacionMensaje(new publicacionMensaje(null,this._publicacion.Id_Publicacion, this._publicacion.Id_Cliente, this._loginService.obtenerIdCliente() === 0? null : this._loginService.obtenerIdCliente(),3,'anuncio-vista','',this.formaMensajeVendedor.get('nombre')?.value, this.formaMensajeVendedor.get('email')?.value, this.formaMensajeVendedor.get('telefono')?.value, this.formaMensajeVendedor.get('mensaje')?.value + '(WhatssApp)', new Date(),new Date(),0,0)).subscribe(
      (dataVista) => {

        //console.log(dataVista);

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

        //throw error;   //You can also throw the error to a global error handler
      }
    );

   //this.router.navigate(['https://api.whatsapp.com/send/?phone=23123123']);
   window.open('https://api.whatsapp.com/send/?phone=52' + WhatssApp + '&text=Hola me interesa esta propiedad que vi en InmueblesMZ');

  }

mostrarTelefono(){
  debugger;
  if (this.formaDatosUsuario.invalid) {
    return Object.values(this.formaDatosUsuario.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach((control) =>
          control.markAsTouched()
        );
      } else {
        control.markAsTouched();
      }
    });
  }
  else{

    //this._loading = true;

    let _publicacionMensaje : publicacionMensaje = new publicacionMensaje(0,0,0,0,0,'','','','','','',new Date(), new Date(),0,0);

    _publicacionMensaje.Id_Cliente = this._publicacion.Id_Cliente;
    _publicacionMensaje.Id_Publicacion = this._publicacion.Id_Publicacion;
    _publicacionMensaje.Id_ClienteMensaje = (this._loginService.obtenerIdCliente() == 0 ? null : this._loginService.obtenerIdCliente() );
    _publicacionMensaje.Nombre = this.formaDatosUsuario.get('nombreDU')?.value;
    _publicacionMensaje.Email = this.formaDatosUsuario.get('emailDU')?.value;
    _publicacionMensaje.Telefono = this.formaDatosUsuario.get('telefonoDU')?.value;
    _publicacionMensaje.Mensaje = 'Se muestra telefono a usuario.';
    _publicacionMensaje.Accion = 1;   // Vista
    _publicacionMensaje.Componente = 'anuncio-vista';
  
    this._publicacionMensajeService.postPublicacionMensaje(_publicacionMensaje).subscribe(
      (data) => {
        
        this.modalCloseDatosUsuario.nativeElement.click();

        if (this._telefonoOculto){
          this._clienteVista.ClienteMedioContacto.forEach(item=>{
            if (item.Id_MedioContacto === 1){
              this._telefono = item.Descripcion;
              this._telefonoOculto = false;
            }
          })
    
          // this._vistaUsuarioService.postVistaUsuario(new vistaUsuario(this._publicacion.Id_Publicacion, this._publicacion.Id_Cliente, this._loginService.obtenerIdCliente() === 0? null : this._loginService.obtenerIdCliente(),'Telefono Fijo', 'anuncio-vista.html', new Date())).subscribe(
          //   (dataVista) => {
    
          //     //console.log(dataVista);
      
          //   },
          //   (error: HttpErrorResponse) => {
          //     switch (error.status) {
          //       case 401:
          //         break;
          //       case 403:
          //         break;
          //       case 404:
          //         break;
          //       case 409:
          //         break;
          //     }
      
          //     //throw error;   //You can also throw the error to a global error handler
          //   }
          // );
    
        }


        this.limpiarFormularioDatosUsuario();

       

      },
      (error: HttpErrorResponse) => {
        //this._loading = false;
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

  abrirPublicacion(objPubDet : publicacionDetalleVista){
    //debugger;
    this.router.navigateByUrl('/anuncio/vista/' + (objPubDet.TituloPublicacion)?.replaceAll(' ','-') + '-' + objPubDet.Id_Publicacion);
    //window.open('/anuncio/vista/' + (objPubDet.TituloPublicacion)?.replaceAll(' ','-') + '-' + objPubDet.Id_Publicacion);
  }

  get correoNoValido() {
    return ( this.formIniciarsesion.get('correo')?.invalid && this.formIniciarsesion.get('correo')?.touched );
  }

  get password1NoValido() {
    return ( this.formIniciarsesion.get('password1')?.invalid && this.formIniciarsesion.get('password1')?.touched );
  }
  
  cambiarTipo(){
    if (this.obtenerTipo === 'password'){
      this.obtenerTipo = 'text';
    }
    else{
      this.obtenerTipo = 'password';
    }
    
  }

  iniciarSesion() {
    let _login = new login(
      this.formIniciarsesion.get('correo')?.value,
      this.formIniciarsesion.get('password1')?.value
    );

    if (this.formIniciarsesion.invalid) {
      return Object.values(this.formIniciarsesion.controls).forEach(
        (control) => {
          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach((control) =>
              control.markAsTouched()
            );
          } else {
            control.markAsTouched();
          }
        }
      );
    } else {
      //Envio de la informacion al servidor
      this._loginService.iniciarSesion(_login).subscribe(
        (data) => {
          //debugger;
          localStorage.setItem('usuario', JSON.stringify(data));

          this.agregarFavorito();

          // this.modalCloseLogin.nativeElement.click();

          // this.formIniciarsesion.reset({
          //   correo    : '',
          //   password1 : ''
          // });

          window.location.reload();

        },
        (error: HttpErrorResponse) => {

          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error al intentar autenticar el usuario',
            text: 'Correo y/o contraseña incorrectos.',
            showCancelButton: false,
            showDenyButton: false,
          });

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

          //throw error;   //You can also throw the error to a global error handler
        }
      );
    }
  }

  abrirPaginaCliente(){
    window.open('cliente/propiedades/' + (this._clienteVista.Nombre + '-' + this._clienteVista.Apellidos )?.replaceAll(' ','-') + '-' + this._clienteVista.Id_Cliente);
  }

}