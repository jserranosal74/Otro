import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Router, ActivatedRoute } from '@angular/router';
import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { publicacionInfoMini } from 'src/app/Models/procesos/publicacion.model';
import { PublicacionesService } from '../../../Services/Procesos/publicaciones.service';
import { LoginService } from '../../../Services/Catalogos/login.service';
import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';
import { clienteVista } from 'src/app/Models/catalogos/cliente.model';
import { favoritoClienteParams } from 'src/app/Models/procesos/favoritoCliente.model';
import { FavoritosClienteService } from 'src/app/Services/Procesos/misFavoritos.service';
import { login } from 'src/app/Models/Auxiliares/login.model';
import { PublicacionMensajesService } from 'src/app/Services/Procesos/publicacionMensajes.service';
import { publicacionMensaje } from 'src/app/Models/procesos/publicacionMensaje.model';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent implements OnInit {
  formIniciarsesion = this.fb.group([]);
  formaMensajeVendedor = this.fb.group([]);

  _infoURL : string = '';
  _Id_Cliente : number | null = null;
  _publicacionesCliente : publicacionInfoMini[] = [];
  _clienteVista : clienteVista = new clienteVista(0,'','','','',[]);
  _usuarioVista : clienteVista = new clienteVista(0,'','','','',[]);
  _pubClienteSeleccionada! : publicacionInfoMini;

  _paginadoDetalle : paginadoDetalle = new paginadoDetalle(0,0);
  _paginas : pagina[] = [];
  _numeroPaginasMostrar = 5;
  _paginaActual = 0;
  _paginaInicial = 0;
  _paginaFinal = 4;
  _mostrarPaginaAnterior = true;
  _mostrarPaginaSiguiente = true;
  _seRealizaBusqueda = false;
  _usuarioAutenticado : boolean = false;
  // _estaComoFavorito : boolean = false;
  obtenerTipo = 'password';
  _tipoContactoVendedor : number = 0;
  _Id_Usuario_Actual = this._loginService.obtenerIdCliente();

  @ViewChild('myModalIniciarSesion') modalIniciarSesion : any;
  @ViewChild('myModalDatosUsuario') modalDatosUsuario : any;

  constructor(  private fb: FormBuilder,
                private router: Router,
                private _activatedRoute: ActivatedRoute,
                private _publicacionesService : PublicacionesService,
                private _loginService : LoginService,
                private _favoritosClienteService : FavoritosClienteService,
                private _publicacionMensajeService : PublicacionMensajesService,
                private _clienteService : ClientesService,
  ) {
  // Se obtiene el Id de la publicacion a visualizar
  debugger;
  this._activatedRoute.queryParams.subscribe(params => {
    this._infoURL = this._activatedRoute.snapshot.params['id_cliente'];
    this._Id_Cliente = parseInt(this._infoURL.split('-')[this._infoURL.split('-').length-1]);
    if (this._Id_Cliente === undefined){
      setTimeout( () => { this.router.navigateByUrl('/'); }, 700 );
    }
  });

    this.crearFormularioInicioSesion();
    this.crearFormularioDatosUsuario();
    this.ObtenerPublicaciones();
    this.CargarCliente();

  }

  ngOnInit(): void {
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

  ObtenerPublicaciones(){
    //debugger;
    this._publicacionesService.getPublicacionesMiniCliente(this._Id_Cliente!, this._loginService.obtenerIdCliente(), 0, 10, 13,null,null,null,null,null,null).subscribe(
      (data) => {

        console.log('ObtenerPublicaciones',data);
        this._publicacionesCliente = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
        this._publicacionesService.getPublicacionesMiniPagDetCliente(this._Id_Cliente!, 10, 13,null,null,null,null,null,null).subscribe(
          (data) => {
            //Next callback
            //console.log('getPublicacionesMiniPagDet', data);
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

      },
      (error: HttpErrorResponse) => {
        //Error callback
        
        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            this._publicacionesCliente = [];
            break;
          case 409:
            break;
        }

      }
    );
  }

  actualizarBusqueda(){
    this.ObtenerPublicaciones();  
  }

  CargarPaginador(paginaActual : number){
    // this._paginadoDetalle;
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
    this.obtenerPagina(this._paginaActual - 1);
  }

  obtenerPaginaSiguiente(){
    this.obtenerPagina(this._paginaActual + 1);
  }

  obtenerPagina(item : number){
    // alert(item);
    debugger;
    this._publicacionesService.getPublicacionesMiniCliente(this._Id_Cliente!, this._Id_Usuario_Actual, item, 10, null,null,null,null,null,null,null).subscribe(
      (data) => {
        //Next callback

        this._publicacionesCliente = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        this.CargarPaginador(item);

      },
      (error: HttpErrorResponse) => {
        //Error callback
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

  CargarCliente(){
    //debugger;
    //console.log('CargarCliente');
    this._clienteService.getClienteVistaCliente(this._Id_Cliente!, null).subscribe(
      (dataCliente) => {

        this._clienteVista = dataCliente;

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

  // contactarPorWhatsApp(objPubCliente : publicacionInfoMini){
  //   window.open('https://api.whatsapp.com/send/?phone=52' + '123719273' + '&text=Hola me interesa esta propiedad que vi en InmueblesMZ');
  // }

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

        this._publicacionMensajeService.postPublicacionMensaje(new publicacionMensaje(null,this._pubClienteSeleccionada.Id_Publicacion, this._pubClienteSeleccionada.Id_Cliente, this._pubClienteSeleccionada.UID_Cliente!, this._Id_Usuario_Actual!, 2,'anuncio-vista','',this.formaMensajeVendedor.get('nombreDU')?.value, this.formaMensajeVendedor.get('emailDU')?.value, this.formaMensajeVendedor.get('telefonoDU')?.value, this.formaMensajeVendedor.get('mensajeDU')?.value, new Date(),new Date(),0,0,'')).subscribe(
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

}