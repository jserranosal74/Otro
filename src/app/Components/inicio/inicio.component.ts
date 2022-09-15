import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { publicacionInfoMini } from 'src/app/Models/procesos/publicacion.model';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { FavoritosClienteService } from 'src/app/Services/Procesos/misFavoritos.service';
import { favoritoClienteParams } from 'src/app/Models/procesos/favoritoCliente.model';
import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';
import { cliente, clienteVista } from 'src/app/Models/catalogos/cliente.model';
import { PublicacionMensajesService } from 'src/app/Services/Procesos/publicacionMensajes.service';
import { publicacionMensaje } from 'src/app/Models/procesos/publicacionMensaje.model';
import { login } from 'src/app/Models/Auxiliares/login.model';
import { usuario } from '../../Models/Auxiliares/cliente.model';
import { asentamiento, pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { ImagenesService } from 'src/app/Services/Catalogos/imagenes.service';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { ConfiguracionService } from '../../Services/Catalogos/configuracion.service';
import { estado } from 'src/app/Models/catalogos/estado.model';
import { municipio } from 'src/app/Models/catalogos/municipio.model';
import { EstadosService } from 'src/app/Services/Catalogos/estados.service';
import { MunicipiosService } from 'src/app/Services/Catalogos/municipios.service';
import { AsentamientosService } from 'src/app/Services/Catalogos/asentamientos.service';

const fbLoginOptions = {
  // scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  scope: 'email'
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  formIniciarsesion = this.fb.group([]);
  formaMensajeVendedor = this.fb.group([]);
  formaUbicacion = this.fb.group({});
  
  _filtros : string = '';
  _filtrosSinPagina : string = '';
  _publicaciones : publicacionInfoMini[] = [];
  _usuarioAutenticado : boolean = false;
  _clienteVista : clienteVista = new clienteVista(0,'','','','',[]);
  _usuarioVista : clienteVista = new clienteVista(0,'','','','',[]);
  _pubClienteSeleccionada! : publicacionInfoMini;
  _publicacionesLMB : publicacionInfoMini[] = [];
  _publicacionesRPT : publicacionInfoMini[] = [];
  _publicacionesDD : publicacionInfoMini[] = [];
  _publicacionesBP : publicacionInfoMini[] = [];
  obtenerTipo = 'password';
  _tipoContactoVendedor : number = 0;
  _imagenInicio : string = '';
  _modoObscuro = ( localStorage.getItem('mo') === "true" ? true : false );
  _tipoAutenticacion : number = 0;
  _direccionPagina : string = '';
  _tiempoTransicion : number = 60 * 1000;  // en segundos

  // Paginador
  _paginadoDetalle : paginadoDetalle = new paginadoDetalle(0,0);
  _paginas: pagina[] = [];
  _numeroPaginasMostrar = 5;
  _paginaActual = 0;
  _paginaInicial = 0;
  _paginaFinal = 4;
  _mostrarPaginaAnterior = true;
  _mostrarPaginaSiguiente = true;
  _ejecutandoBusqueda = false;
  _imagenesCargadas = false;
  _busquedaRealizada = false;

  // Ubicacion
  _estados       : estado[] = [];
  _municipios    : municipio[] = [];
  _asentamientos : asentamiento[] = [];
  _cargandoEstados = false;
  _cargandoMunicipios = false;
  _cargandoAsentamientos = false;
  _cadenaBusqueda = '';
  _cadenaBusquedaEstado = '';
  _cadenaBusquedaMunicipio = '';
  _cadenaBusquedaAsentamiento = '';

  @ViewChild('myModalIniciarSesion') modalIniciarSesion : any;
  @ViewChild('myModalDatosUsuario') modalDatosUsuario : any;
  @ViewChild('myModalCloseDatosUsuario') cerrarModalDatosUsuario : any;

  @ViewChild('myModalUbicacion') modalUbicacion : any;
  @ViewChild('myModalCloseUbicacion') modalClose : any;

  constructor( private fb: FormBuilder,
               private authService : SocialAuthService,
               private router : Router,
               private _estadosService: EstadosService,
               private _municipiosService: MunicipiosService,
               private _asentamientosService: AsentamientosService,
               private _activatedRoute : ActivatedRoute,
               private _publicacionesService : PublicacionesService,
               private _favoritosClienteService : FavoritosClienteService,
               private _clienteService : ClientesService,
               private _publicacionMensajeService : PublicacionMensajesService,
               private _imagenesService : ImagenesService,
               private _configuracionesService : ConfiguracionService,
               private _loginService : LoginService ) { 
    this._activatedRoute.queryParams.subscribe((params) => {
      debugger;
      this._filtros = this._activatedRoute.snapshot.params['filtros'];
      if ((this._filtros != undefined) && (this._filtros.length > 0))
        this._filtrosSinPagina = this._filtros.substring(0,this._filtros.indexOf('-pagina-') === -1 ? this._filtros.length : this._filtros.indexOf('-pagina-'))
    });
    //debugger;
    this._direccionPagina = 'https://' + window.location.host + '/api/clientes/autenticargoogle?Id_Publicacion=0&urlRedirect=' + encodeURIComponent(window.location.href);
    
    this._cargandoEstados = false;
    this._cargandoMunicipios = false;
    this._cargandoAsentamientos = false;

    this.obtenerConfiguracion();
    this.crearFormularioUbicacion();
    this.crearFormularioInicioSesion();
    this.crearFormularioDatosUsuario();

    if (this._filtros != '' && this._filtros !== undefined) {
      this.obtenerEstados();
      this.ejecutarConsulta();
      this.validarAutenticacion();
    }
    
    this.ejecutarBusquedaEspecial('RPT');
    this.ejecutarBusquedaEspecial('LMB');
    this.ejecutarBusquedaEspecial('DD');
    this.ejecutarBusquedaEspecial('BP');

  }

  ngOnInit(): void {
    //this.router.navigateByUrl('/' + this._filtros);
  }

  crearFormularioUbicacion(){
    this.formaUbicacion = this.fb.group({
      estado       : [ '' ],
      municipio    : [ '' ],
      asentamiento : [ '' ]
    });
  }

  crearFormularioInicioSesion() {
    this.formIniciarsesion = this.fb.group({
      correo    : [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ],
      password1 : [ '', Validators.required]
    });
  }

  crearFormularioDatosUsuario() {
    this.formaMensajeVendedor = this.fb.group({
      nombreDU   : [ '', Validators.required ],
      telefonoDU : [ '', Validators.required ],
      emailDU    : [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ],
      mensajeDU  : [ '', Validators.required ]
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

  limpiarFormularioInicioSesion() {
    this.formIniciarsesion.reset({
      correo    : '',
      password1 : ''
    });
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

        this.formaMensajeVendedor.reset({
          nombreDU   : this._usuarioVista.Nombre + ' ' + this._usuarioVista.Apellidos,
          telefonoDU : telefono,
          emailDU    : this._usuarioVista.Email,
          mensajeDU  : 'Hola, me interesa esta propiedad que vi en Inmuebles Meza y quiero que me contacten. Gracias.'
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

  CargarDetallePaginador(){
    //debugger;
    // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
    this._publicacionesService.getPublicacionesBuscarPagDet(this._filtros).subscribe(
        (data) => {
        //Next callback
        console.log('getPublicacionesBuscarPagDet', data);
        this._paginadoDetalle = data;

        console.log('this._filtros', this._filtros);
        
        if (this._filtros.indexOf('-pagina-') > -1 ){
          let _pagina = this._filtros.indexOf('-pagina-') + 8;
          let _numeroPagina = parseInt(this._filtros.substring(_pagina,_pagina + 10));
          console.log('_numeroPagina',_numeroPagina);
          this.CargarPaginador(_numeroPagina - 1);
        }
        else{
          this.CargarPaginador(0);
        }

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

  ejecutarConsulta(){
    debugger;
    
    if (this._filtros === undefined)
      return;

    this._ejecutandoBusqueda = true;

    this._busquedaRealizada = false;
    
    let Id_Usuario = this._loginService.obtenerIdCliente()!;

    this._publicacionesService.postPublicacionesBuscar(this._filtros, new usuario(Id_Usuario,null,'','','','')).subscribe(
      (data) => {

        console.log('postPublicacionesBuscar',data);
        this._publicaciones = data;

        this._ejecutandoBusqueda = false;
        this._busquedaRealizada = true;

        this.CargarDetallePaginador();

      },
      (error: HttpErrorResponse) => {
        //Error callback
        this._busquedaRealizada = true;
        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            this._ejecutandoBusqueda = false;
            this._publicaciones = [];
            break;
          case 409:
            break;
        }

      }
    );
  }

  cambiarPagina(numPagina : number){
    debugger;
    if (this._filtros.indexOf('-pagina-') > 0 ){
      let _textoPagina = this._filtros.substring(this._filtros.indexOf('-pagina-'),this._filtros.indexOf('-pagina-') + 10);
      this._filtros = this._filtros.replace(_textoPagina,'');
      //this._filtros = this._filtros + '-pagina-' + (numPagina + 1);
      //this.router.routeReuseStrategy.shouldReuseRoute = () => true;
      //this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/' + this._filtros]);
      //this.router.navigateByUrl('/' + this._filtros);
      //this.router.navigate(['/', this._filtros]);
      //this.ngOnInit();
    }
    else{
      this._filtros = this._filtros + '-pagina-' + (numPagina + 1);
      //this.router.routeReuseStrategy.shouldReuseRoute = () => true;
      //this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/' + this._filtros]);
      //this.router.navigateByUrl('/' + this._filtros);
      //this.router.navigate(['/', this._filtros]);
      ///this.ngOnInit();
    }
  }

  abrirVentanaContacto(objPubCliente : publicacionInfoMini, tipoContacto : number){
    //debugger;
    //this.limpiarFormularioDatosUsuario();
    this._tipoContactoVendedor = tipoContacto;
    this._pubClienteSeleccionada = objPubCliente;

    if (this._loginService.obtenerIdCliente() === null){
      this.limpiarFormularioDatosUsuario();
      this.validarAutenticacion();
      this.modalDatosUsuario.nativeElement.click();
      return;
    }
    else if(tipoContacto === 2){
      this.modalDatosUsuario.nativeElement.click();
      return;
    }

    let WhatssApp : string = '';
        this._clienteVista.ClienteMedioContacto.forEach(item=>{
          if(item.Id_MedioContacto === 2){
            WhatssApp = item.Descripcion;
          }
        });

    window.open('https://api.whatsapp.com/send/?phone=52' + WhatssApp + '&text=Hola me interesa mas información sobre esta propiedad: ' + objPubCliente.TituloPublicacion);

  }

  agregarFavorito(objPubCliente: publicacionInfoMini){
    debugger;
    if (this._loginService.obtenerIdCliente() === null){
      this.limpiarFormularioInicioSesion();
      objPubCliente.EsFavorito = 0;
      this.validarAutenticacion();
      this._pubClienteSeleccionada = objPubCliente;
      this.modalIniciarSesion.nativeElement.click();
      return;
    }

    if (!objPubCliente.EsFavorito) {
      this._favoritosClienteService.postFavoritoCliente(new favoritoClienteParams(this._loginService.obtenerIdCliente(), objPubCliente.Id_Cliente, objPubCliente.Id_Publicacion)).subscribe(
        (data) => {
  
          objPubCliente.EsFavorito = 1;
  
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
      this._favoritosClienteService.deleteFavoritoCliente(new favoritoClienteParams(this._loginService.obtenerIdCliente(), objPubCliente.Id_Cliente, objPubCliente.Id_Publicacion)).subscribe(
        (data) => {
  
          objPubCliente.EsFavorito = 0;
  
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

  contactarVendedor(){
    debugger;
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

      if (this._tipoContactoVendedor === 1){
        
        let WhatssApp : string = '';
        this._clienteVista.ClienteMedioContacto.forEach(item=>{
          if(item.Id_MedioContacto === 2){
            WhatssApp = item.Descripcion;
          }
        });

        window.open('https://api.whatsapp.com/send/?phone=52' + WhatssApp + '&text=Hola me interesa esta propiedad que vi en InmueblesMZ');

      }
      else {

        this._publicacionMensajeService.postPublicacionMensaje(new publicacionMensaje(null,this._pubClienteSeleccionada.Id_Publicacion, this._pubClienteSeleccionada.Id_Cliente, this._loginService.obtenerIdCliente()!, this._loginService.obtenerIdCliente() === null ? null : this._loginService.obtenerIdCliente(),2,'inicio','',this.formaMensajeVendedor.get('nombreDU')?.value, this.formaMensajeVendedor.get('emailDU')?.value, this.formaMensajeVendedor.get('telefonoDU')?.value, this.formaMensajeVendedor.get('mensajeDU')?.value, new Date(),new Date(),0,0,'')).subscribe(
          (dataVista) => {

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
    
            this.cerrarModalDatosUsuario.nativeElement.click();
    
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

  get nombreDUNoValido() {
    return ( this.formaMensajeVendedor.get('nombreDU')?.invalid && this.formaMensajeVendedor.get('nombreDU')?.touched );
  }
  
  get telefonoDUNoValido() {
    return ( this.formaMensajeVendedor.get('telefonoDU')?.invalid && this.formaMensajeVendedor.get('telefonoDU')?.touched );
  }

  get emailDUNoValido() {
    return ( this.formaMensajeVendedor.get('emailDU')?.invalid && this.formaMensajeVendedor.get('emailDU')?.touched );
  }

  get mensajeDUNoValido() {
    return ( this.formaMensajeVendedor.get('mensajeDU')?.invalid && this.formaMensajeVendedor.get('mensajeDU')?.touched );
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

          this.agregarFavorito(this._pubClienteSeleccionada);

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

  CargarPaginador(paginaActual : number){
    //debugger;
    this._paginas = [];

    if ( this._paginadoDetalle.TotalPaginas <= this._numeroPaginasMostrar ){
      for (let index = 0; index < this._paginadoDetalle.TotalPaginas; index++) {
        if (index == paginaActual)
          this._paginas.push(new pagina(true, index));
        else
          this._paginas.push(new pagina(false, index));
      }
      this._paginaInicial = 0;
      this._paginaFinal = this._paginadoDetalle.TotalPaginas;
    }
    else if ( paginaActual <= (this._paginadoDetalle.TotalPaginas - this._numeroPaginasMostrar) ){
      for (let index = paginaActual; index < (paginaActual + this._numeroPaginasMostrar); index++) {
        if (index == paginaActual)
          this._paginas.push(new pagina(true, index));
        else
          this._paginas.push(new pagina(false, index));
      }
      this._paginaInicial = paginaActual + 1;
      this._paginaFinal = paginaActual + this._numeroPaginasMostrar;
    }
    else {
        for (let index = (this._paginadoDetalle.TotalPaginas - this._numeroPaginasMostrar); index < this._paginadoDetalle.TotalPaginas; index++) {
          if (index == paginaActual)
          this._paginas.push(new pagina(true, index));
        else
          this._paginas.push(new pagina(false, index));
        }
        this._paginaInicial = (this._paginadoDetalle.TotalPaginas - this._numeroPaginasMostrar);
        this._paginaFinal = this._paginadoDetalle.TotalPaginas;
      }
    
    console.log(this._paginas);

    if ( paginaActual == 0 && paginaActual <= this._numeroPaginasMostrar && this._numeroPaginasMostrar >= this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = false;
      this._mostrarPaginaSiguiente = false;
      console.log('Configuracion 1');
    }
    else if(paginaActual > 0 && this._paginaFinal < this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = true;
      this._mostrarPaginaSiguiente = true;
      console.log('Configuracion 2');
    }
    else if(paginaActual >= 0 && this._paginaFinal < this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = false;
      this._mostrarPaginaSiguiente = true;
      console.log('Configuracion 3');
    }
    else if(paginaActual > 0 && this._paginaFinal == this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = true;
      this._mostrarPaginaSiguiente = false;
      console.log('Configuracion 4');
    }

    console.log('paginaActual:' + paginaActual, 'this._paginaFinal:' + this._paginaFinal);

    this._paginaActual = paginaActual;

  }

  obtenerPaginaAnterior(){
    //this.ejecutarConsulta(this._paginaActual - 1);
    let _textoPagina = this._filtros.substring(this._filtros.indexOf('-pagina-'),this._filtros.indexOf('-pagina-') + 10);
    this._filtros = this._filtros.replace(_textoPagina,'');
    this.router.navigateByUrl('/' + this._filtros + '-pagina-' + (this._paginaActual - 1));
  }

  obtenerPaginaSiguiente(){
    //this.ejecutarConsulta(this._paginaActual + 1);
    let _textoPagina = this._filtros.substring(this._filtros.indexOf('-pagina-'),this._filtros.indexOf('-pagina-') + 10);
    this._filtros = this._filtros.replace(_textoPagina,'');
    this.router.navigateByUrl('/' + this._filtros + '-pagina-' + (this._paginaActual + 1));
  }

  ejecutarBusquedaEspecial(tipoBusqueda : string){
    let Id_Usuario = this._loginService.obtenerIdCliente()!;

    this._publicacionesService.getPublicacionesBuscarEspecial(Id_Usuario, tipoBusqueda).subscribe(
      (data) => {

        console.log('ejecutarBusquedaEspecial',data);

        switch (tipoBusqueda) {
          case 'RPT':
            this._publicacionesRPT = data;
            break;
          case 'LMB':
            this._publicacionesLMB = data;
            break;
          case 'DD':
            this._publicacionesDD = data;
            break;
          case 'BP':
            this._publicacionesBP = data;
            break;
        }

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

  obtenerConfiguracion(){

    // Id del TiempoTransicion
    this._configuracionesService.getConfiguracion(7).subscribe(
      (data) => {

        this._tiempoTransicion = data[0].Valor * 1000;    // En segundos

        this.obtenerImagenesInicio();

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

  obtenerImagenesInicio(){

    var images = new Array();

    this._imagenesService.getImagenes(null).subscribe(
      (data) => {

        //console.log('obtenerImagenesInicio',data);
        for (var i = 0; i < data.length; i++) {
          images[i] = new Image();
          images[i].Id_Imagen = data[i].Id_Imagen;
          images[i].src = data[i].UrlImagen;
        }

        this._imagenInicio = images[Math.floor(Math.random() * (images[images.length-1].Id_Imagen))].src;

        setInterval(() => { 
          //this._imagenInicio = data[Math.floor(Math.random() * (data[data.length-1].Id_Imagen))].UrlImagen;
          // Se cambia cada minuto
          this._imagenInicio = images[Math.floor(Math.random() * (images[images.length-1].Id_Imagen))].src;
        }, this._tiempoTransicion);

        this._imagenesCargadas = true;

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

  iniciarSesionFacebook(){
    debugger;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions).then( datosUsuario => { 
      this._tipoAutenticacion = 3; // Facebook
      this.AgregarUsuario(datosUsuario);
    });
  }

  AgregarUsuario(datosUsuario : SocialUser) {
  
    let _cliente = new cliente(0,null,1,1,2,null,this._tipoAutenticacion,datosUsuario.email,'',datosUsuario.firstName,datosUsuario.lastName,'',[],datosUsuario.photoUrl,0,0,0,'','',new Date(),new Date(),new Date(),1,'',1,'');

    debugger;

    this._clienteService.postCliente(_cliente).subscribe(
      (data) => {
        //Next callback
        console.log('Id_cliente',data);
        
        this._loginService.iniciarSesion(new login(_cliente.Email, _cliente.Password)).subscribe(
          (data) => {
            //debugger;
            console.log('datos: ', data);
  
            localStorage.setItem('usuario', JSON.stringify(data));
            
            window.location.reload();
  
            //this.limpiarFormulario();
          },
          (error: HttpErrorResponse) => {
            //Error callback
            //console.log('Error del servicio: ', error);
  
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

        //this.iniciarSesion();

        this.limpiarFormularioInicioSesion();

        //this.router.navigateByUrl('/iniciarsesion');
        //window.location.reload();

      },
      (error: HttpErrorResponse) => {
        //Error callback

        Swal.fire({
          icon: 'error',
          title: error.error,
          text: '',
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

  obtenerEstados(){
    debugger;

    // this._verTiposOperacion = false;
    // this._verTiposPropiedad = false;
    // this._verRangosRecamaras = false;
    // this._verRangosPrecios = false;

    this._municipios = [];
    this._asentamientos = [];

    this._cargandoEstados = true;

    this._estadosService.getEstados(1).subscribe(
      (data) => {
        //Next callback
        //console.log(data);
        this._estados = data;

        this._cargandoEstados = false;

      },
      (error: HttpErrorResponse) => {
        
        this._cargandoEstados = false;

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

  obtenerMunicipios(objEstado : estado) {
    debugger;

    this._asentamientos = [];
    this._cargandoMunicipios = true;

    this.formaUbicacion.patchValue({
      estado       : objEstado.Nombre,
      municipio    : '',
      asentamiento : ''
    });

    this._cadenaBusquedaEstado = 'en el estado de ' + objEstado.Nombre;

    this._cadenaBusqueda = this._cadenaBusquedaEstado;

    this._municipiosService.getMunicipios(objEstado.Id_Estado).subscribe(
      (data) => {
        //Next callback
        // console.log('datos: ', data);

        this._municipios = data;

        this._cargandoMunicipios = false;

      },
      (error: HttpErrorResponse) => {

        this._cargandoMunicipios = false;

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

  obtenerAsentamientos(objMunicipio : municipio) {
    debugger;

    this._cargandoAsentamientos = true;

    this.formaUbicacion.patchValue({
      municipio    : objMunicipio.Municipio,
      asentamiento : ''
    });

    this._cadenaBusquedaMunicipio = ' y municipio de ' + objMunicipio.Municipio;

    this._cadenaBusqueda = this._cadenaBusquedaEstado + this._cadenaBusquedaMunicipio;

    this._asentamientosService.getAsentamientos(objMunicipio.Id_Estado, objMunicipio.Id_Municipio).subscribe(
      (data) => {
        //Next callback
        // console.log('datos: ', data);

        this._asentamientos = data;

        this._cargandoAsentamientos = false;

      },
      (error: HttpErrorResponse) => {

        this._cargandoAsentamientos = false;

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

  verModal(){
    //this.modalUbicacion.nativeElement.click();
    this.limpiarBusqueda();
  }

  limpiarBusqueda(){
    this._cadenaBusqueda = '';
    this._cadenaBusquedaEstado = '';
    this._cadenaBusquedaMunicipio = '';
    this._cadenaBusquedaAsentamiento = '';
    this._municipios = [];
    this._asentamientos = [];
    
    this.formaUbicacion.reset({
      estado       : '',
      municipio    : '',
      asentamiento : ''
    });
  }

  seleccionarAsentamiento(objAsentamiento : asentamiento){

    objAsentamiento.Seleccionado = !objAsentamiento.Seleccionado;

    let asentamientos = '';
    let asentamientosSeleccionados = false;

    this._asentamientos.forEach(item => {
      if (item.Seleccionado === true)
        asentamientos += item.Asentamiento + ' o ';
    });

    this.formaUbicacion.patchValue({
      asentamiento : asentamientos
    });

    if (asentamientos.length > 0)
      this._cadenaBusquedaAsentamiento = ' en la colonia de ' + asentamientos.substring(0,asentamientos.length-3);
    else
    this._cadenaBusquedaAsentamiento = '';

    this._cadenaBusqueda = this._cadenaBusquedaEstado + this._cadenaBusquedaMunicipio + this._cadenaBusquedaAsentamiento;

  }

}
