import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { publicacionInfoMini } from 'src/app/Models/procesos/publicacion.model';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { FavoritosClienteService } from 'src/app/Services/Procesos/misFavoritos.service';
import { favoritoClienteParams } from 'src/app/Models/procesos/favoritoCliente.model';
import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';
import { clienteVista } from 'src/app/Models/catalogos/cliente.model';
import { PublicacionMensajesService } from 'src/app/Services/Procesos/publicacionMensajes.service';
import { publicacionMensaje } from 'src/app/Models/procesos/publicacionMensaje.model';
import { login } from 'src/app/Models/Auxiliares/login.model';
import { usuario } from '../../Models/Auxiliares/cliente.model';
import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  formIniciarsesion = this.fb.group([]);
  formaMensajeVendedor = this.fb.group([]);
  
  _filtros : string = '';
  _publicaciones : publicacionInfoMini[] = [];
  _usuarioAutenticado : boolean = false;
  _clienteVista : clienteVista = new clienteVista(0,'','','','',[]);
  _usuarioVista : clienteVista = new clienteVista(0,'','','','',[]);
  _pubClienteSeleccionada! : publicacionInfoMini;
  _publicacionesLMB : publicacionInfoMini[] = [];
  _publicacionesRPT : publicacionInfoMini[] = [];
  _publicacionesDD : publicacionInfoMini[] = [];
  obtenerTipo = 'password';
  _tipoContactoVendedor : number = 0;

  // Paginador
  _paginadoDetalle : paginadoDetalle = new paginadoDetalle(0,0);
  _paginas: pagina[] = [];
  _numeroPaginasMostrar = 5;
  _paginaActual = 0;
  _paginaInicial = 0;
  _paginaFinal = 4;
  _mostrarPaginaAnterior = true;
  _mostrarPaginaSiguiente = true;
  _seRealizaBusqueda = false;

  @ViewChild('myModalIniciarSesion') modalIniciarSesion : any;
  @ViewChild('myModalDatosUsuario') modalDatosUsuario : any;

  constructor( private fb: FormBuilder,
               private router : Router,
               private _activatedRoute : ActivatedRoute,
               private _publicacionesService : PublicacionesService,
               private _favoritosClienteService : FavoritosClienteService,
               private _clienteService : ClientesService,
               private _publicacionMensajeService : PublicacionMensajesService,
               private _loginService : LoginService ) { 
    debugger;
    this._activatedRoute.queryParams.subscribe((params) => {
      this._filtros = this._activatedRoute.snapshot.params['filtros'];
    });

    //console.log('this._filtros', this._filtros);

    if (this._filtros != '' && this._filtros !== undefined) {
      this.crearFormularioInicioSesion();
      this.crearFormularioDatosUsuario();
      this.ejecutarConsulta();
      this.CargarDetallePaginador();
    }
    
    this.ejecutarBusquedaEspecial('RPT');
    this.ejecutarBusquedaEspecial('LMB');
    this.ejecutarBusquedaEspecial('DD');

  }

  ngOnInit(): void {
    //this.ejecutarConsulta();
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

  CargarDetallePaginador(){
    //debugger;
    // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
    this._publicacionesService.getPublicacionesBuscarPagDet(this._filtros).subscribe(
        (data) => {
        //Next callback
        console.log('getPublicacionesBuscarPagDet', data);
        this._paginadoDetalle = data;

        this.CargarPaginador(0);

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
    
    let Id_Usuario = this._loginService.obtenerIdCliente()!;

    this._publicacionesService.postPublicacionesBuscar(this._filtros, new usuario(Id_Usuario,null,'','','','')).subscribe(
      (data) => {

        //console.log('obtenerPublicacionesBusqueda',data);
        this._publicaciones = data;

        this._seRealizaBusqueda = true;
        
        if (this._filtros.indexOf('-pagina-') > 0 ){
          let _pagina = this._filtros.indexOf('-pagina-') + 8;
          let _numeroPagina = parseInt(this._filtros.substring(_pagina,_pagina + 10));
          this.CargarPaginador(_numeroPagina - 1);
        }
        else{
          this.CargarPaginador(0);
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
            this._seRealizaBusqueda = true;
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
      this._filtros = this._filtros + '-pagina-' + (numPagina + 1);
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('/' + this._filtros);
      this.ngOnInit();
    }
    else{
      this._filtros = this._filtros + '-pagina-' + (numPagina + 1);
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl('/' + this._filtros);
      this.ngOnInit();
    }
  }

  abrirVentanaContacto(objPubCliente : publicacionInfoMini, tipoContacto : number){
    //debugger;
    this.limpiarFormularioDatosUsuario();
    this._tipoContactoVendedor = tipoContacto;

    if (this._loginService.obtenerIdCliente() === null){
      this.validarAutenticacion();
      this._pubClienteSeleccionada = objPubCliente;
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

        this._publicacionMensajeService.postPublicacionMensaje(new publicacionMensaje(null,this._pubClienteSeleccionada.Id_Publicacion, this._pubClienteSeleccionada.Id_Cliente, this._loginService.obtenerIdCliente()!, this._loginService.obtenerIdCliente() === null ? null : this._loginService.obtenerIdCliente(),2,'anuncio-vista','',this.formaMensajeVendedor.get('nombreDU')?.value, this.formaMensajeVendedor.get('emailDU')?.value, this.formaMensajeVendedor.get('telefonoDU')?.value, this.formaMensajeVendedor.get('mensajeDU')?.value, new Date(),new Date(),0,0,'')).subscribe(
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
    debugger;
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

}
