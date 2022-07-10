import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PublicacionMensajesService } from '../../../Services/Procesos/publicacionMensajes.service';
import { publicacionMensaje } from '../../../Models/procesos/publicacionMensaje.model';
import { Email, Estatus, Fecha, Publicacion, publicacionMensajesFiltros, verFiltros } from 'src/app/Models/procesos/publicacionMensajesFiltros.model';
import { PublicacionMensajesFiltrosService } from 'src/app/Services/Procesos/publicacionMensajesFiltros.service';
import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { Indicador } from '../../../Models/procesos/publicacionMensajesFiltros.model';

@Component({
  selector: 'app-mismensajes',
  templateUrl: './mismensajes.component.html',
  styleUrls: ['./mismensajes.component.css']
})
export class MisMensajesComponent implements OnInit {
  _mensajesUsuarios : publicacionMensaje[] = [];
  _mostrarFiltros : boolean = sessionStorage.getItem('mf') === '1'? true : false;
  _collapseFiltros = false;
  _mensajeSeleccionado : publicacionMensaje = new publicacionMensaje(0,0,0,0,0,'','','','','','',new Date(), new Date(),0,0,'');

  _publicacionMensajesFiltros : publicacionMensajesFiltros = new publicacionMensajesFiltros([],[],[],[],[]);
  _verFiltros : verFiltros = new verFiltros(true,true,true,true,true);
  _filtrosSeleccionados : publicacionMensajesFiltros = new publicacionMensajesFiltros([],[],[],[],[]);

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

  _colapseEstatus = false;
  _colapseAccion = false;
  _colapsePublicacion = false;
  _colapseEmail = false;
  _colapseFecha = false;

  @ViewChild('myColapseFiltro1') colapseFiltro1 : any;
  @ViewChild('myColapseFiltro2') colapseFiltro2 : any;
  @ViewChild('myColapseFiltro3') colapseFiltro3 : any;
  @ViewChild('myColapseFiltro4') colapseFiltro4 : any;
  @ViewChild('myColapseFiltro5') colapseFiltro5 : any;
  @ViewChild('myModalCerrarMensaje') modalCerrarMensaje : any;

  constructor( private fb: FormBuilder,
               private _loginService : LoginService,
               private _publicacionMensajesService: PublicacionMensajesService,
               private _publicacionMensajesFiltrosService : PublicacionMensajesFiltrosService
  ) {
    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes(null,null);
    this._mostrarFiltros = sessionStorage.getItem('mf') === '1'? true : false;
  }

  ngOnInit(): void {
  }

  verMensaje(objMensaje : publicacionMensaje){

    this._mensajeSeleccionado = objMensaje;

    if ((objMensaje.Id_Estatus != 20) && (objMensaje.Id_Estatus != 21)){
      this._publicacionMensajesService.putPublicacionMensaje(new publicacionMensaje(objMensaje.Id_PublicacionMensaje, objMensaje.Id_Publicacion, objMensaje.Id_Cliente,null,0,'','','','','','',new Date(), new Date(),0,20,'')).subscribe(
        (data) => {
          //Next callback

          this.ejecutarConsulta(0);
          this.CargarDetallePaginador();
          this.obtenerFiltrosMensajes(null,null);
  
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

  responderWhatsApp(objMensaje : publicacionMensaje){

    if (objMensaje.Id_Estatus != 21){
      this._publicacionMensajesService.putPublicacionMensaje(new publicacionMensaje(objMensaje.Id_PublicacionMensaje, objMensaje.Id_Publicacion, objMensaje.Id_Cliente,null,0,'','','','','','',new Date(), new Date(),0,21,'')).subscribe(
        (data) => {
          //Next callback

          this.ejecutarConsulta(0);
          this.CargarDetallePaginador();
          this.obtenerFiltrosMensajes(null,null);
  
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
    
    window.open('https://api.whatsapp.com/send/?phone=52' + objMensaje.Telefono + '&text=Hola vi que estas interesado en esta propiedad: ' + objMensaje.TituloPublicacion + '. ¿Te puedo ayudar en algo?');
  }

  responderEmail(objMensaje : publicacionMensaje){
    if (objMensaje.Id_Estatus != 21){
      this._publicacionMensajesService.putPublicacionMensaje(new publicacionMensaje(objMensaje.Id_PublicacionMensaje, objMensaje.Id_Publicacion, objMensaje.Id_Cliente,null,0,'','','','','','',new Date(), new Date(),0,21,'')).subscribe(
        (data) => {
          //Next callback

          this.ejecutarConsulta(0);
          this.CargarDetallePaginador();
          this.obtenerFiltrosMensajes(null,null);
  
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
    
    //window.open('https://api.whatsapp.com/send/?phone=52' + objMensaje.Telefono + '&text=Hola vi que estas interesado en esta propiedad: ' + objMensaje.TituloPublicacion + '. ¿Te puedo ayudar en algo?');
  }

  verPublicacionCliente(objMensaje : publicacionMensaje){
    window.open('anuncio/vista/' + (objMensaje.TituloPublicacion)?.replaceAll(' ','-') + '-' + objMensaje.Id_Publicacion);
  }

  eliminarMensaje(objMensaje : publicacionMensaje){

    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que desea eliminar el mensaje # "' + objMensaje.Id_PublicacionMensaje + '"?',
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

        this._publicacionMensajesService.deletePublicacionMensaje(objMensaje.Id_PublicacionMensaje, objMensaje.Id_Publicacion, objMensaje.Id_Cliente).subscribe(
          (data) => {
            //Next callback
    
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
    
            Toast.fire({
              icon: 'success',
              title: 'El mensaje se eliminó de manera satisfactoria'
            });
    
            this.ejecutarConsulta(0);
            this.CargarDetallePaginador();
            this.obtenerFiltrosMensajes(null,null);
    
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

        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  mostrarFiltros(){
    this._mostrarFiltros = !this._mostrarFiltros;
    sessionStorage.setItem('mf', this._mostrarFiltros ? '1' : '0');
  }

  CargarDetallePaginador(){
    //debugger;
    // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
    this._publicacionMensajesService.getPublicacionesMensajesPagDet(this._loginService.obtenerIdCliente(), 10, this._filtrosSeleccionados.lstPublicaciones[0] === undefined ? null : this._filtrosSeleccionados.lstPublicaciones[0].Id_Publicacion,
                                                                                                                this._filtrosSeleccionados.lstIndicadores[0] === undefined ? null : this._filtrosSeleccionados.lstIndicadores[0].Id_Indicador,
                                                                                                                this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus,
                                                                                                                this._filtrosSeleccionados.lstEmails[0] === undefined ? null : this._filtrosSeleccionados.lstEmails[0].Email,
                                                                                                                this._filtrosSeleccionados.lstFechas[0] === undefined ? null : this._filtrosSeleccionados.lstFechas[0].FechaAlta).subscribe(
        (data) => {
        //Next callback
        //console.log('getPublicacionesMensajesPagDet', data);
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

  seleccionarFiltroEstatus(objEstatus : Estatus){

    this._filtrosSeleccionados.lstEstatus.push(objEstatus);

    this._publicacionMensajesFiltros.lstEstatus.forEach((item,index) => {
      if (item.Id_Estatus === objEstatus.Id_Estatus){
        this._publicacionMensajesFiltros.lstEstatus.splice(index,1); 
      }
    });
    
    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes('Estatus','Agregar');
  }

  seleccionarFiltroIndicador(objIndicador : Indicador){

    this._filtrosSeleccionados.lstIndicadores.push(objIndicador);

    this._publicacionMensajesFiltros.lstIndicadores.forEach((item,index) => {
      if (item.Id_Indicador === objIndicador.Id_Indicador){
        this._publicacionMensajesFiltros.lstIndicadores.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes('Indicador','Agregar');
  }

  seleccionarFiltroPublicacion(objPublicacion : Publicacion){
    this._filtrosSeleccionados.lstPublicaciones.push(objPublicacion);

    this._publicacionMensajesFiltros.lstPublicaciones.forEach((item,index) => {
      if (item.Id_Publicacion === objPublicacion.Id_Publicacion){
        this._publicacionMensajesFiltros.lstPublicaciones.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes('Publicacion','Agregar');
  }

  seleccionarFiltroEmail(objEmail : Email){
    this._filtrosSeleccionados.lstEmails.push(objEmail);

    this._publicacionMensajesFiltros.lstEmails.forEach((item,index) => {
      if (item.Email === objEmail.Email){
        this._publicacionMensajesFiltros.lstEmails.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes('Email','Agregar');
  }

  seleccionarFiltroFecha(objFecha : Fecha){
    this._filtrosSeleccionados.lstFechas.push(objFecha);

    this._publicacionMensajesFiltros.lstFechas.forEach((item,index) => {
      if (item.FechaAlta === objFecha.FechaAlta){
        this._publicacionMensajesFiltros.lstFechas.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes('Fecha','Agregar');
  }

  ejecutarConsulta(numPagina : number){
    //debugger;
    this._publicacionMensajesService.getPublicacionesMensajes(this._loginService.obtenerIdCliente(), numPagina, 10, this._filtrosSeleccionados.lstPublicaciones[0] === undefined ? null : this._filtrosSeleccionados.lstPublicaciones[0].Id_Publicacion,
                                                                                                     this._filtrosSeleccionados.lstIndicadores[0] === undefined ? null : this._filtrosSeleccionados.lstIndicadores[0].Id_Indicador,
                                                                                                     this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus,
                                                                                                     this._filtrosSeleccionados.lstEmails[0] === undefined ? null : this._filtrosSeleccionados.lstEmails[0].Email,
                                                                                                     this._filtrosSeleccionados.lstFechas[0] === undefined ? null : this._filtrosSeleccionados.lstFechas[0].FechaAlta).subscribe(
      (data) => {
        //Next callback

        this._mensajesUsuarios = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        this.CargarPaginador(numPagina);

      },
      (error: HttpErrorResponse) => {
        //Error callback
        
        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            this._mensajesUsuarios = [];
            break;
          case 409:
            break;
        }
      }
    );
    this.CargarDetallePaginador();
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
    this.ejecutarConsulta(this._paginaActual - 1);
  }

  obtenerPaginaSiguiente(){
    this.ejecutarConsulta(this._paginaActual + 1);
  }

  removerFiltroEstatus(objEstatus : Estatus){
    // this._planesPaquetesFiltros.lstEstatus.push(objEstatus);

    this._filtrosSeleccionados.lstEstatus.forEach((item,index) => {
      if (item.Id_Estatus === objEstatus.Id_Estatus){
        this._filtrosSeleccionados.lstEstatus.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes('Estatus','Quitar');

  }

  removerFiltroIndicador(objIndicador : Indicador){
    this._publicacionMensajesFiltros.lstIndicadores.push(objIndicador);

    this._filtrosSeleccionados.lstIndicadores.forEach((item,index) => {
      if (item.Id_Indicador === objIndicador.Id_Indicador){
        this._filtrosSeleccionados.lstIndicadores.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes('Indicador','Quitar');

  }

  removerFiltroPublicacion(objPublicacion : Publicacion){
    this._publicacionMensajesFiltros.lstPublicaciones.push(objPublicacion);

    this._filtrosSeleccionados.lstPublicaciones.forEach((item,index) => {
      if (item.Id_Publicacion === objPublicacion.Id_Publicacion){
        this._filtrosSeleccionados.lstPublicaciones.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes('Publicacion','Quitar');
  }

  removerFiltroEmail(objEmail : Email){
    this._publicacionMensajesFiltros.lstEmails.push(objEmail);

    this._filtrosSeleccionados.lstEmails.forEach((item,index) => {
      if (item.Email === objEmail.Email){
        this._filtrosSeleccionados.lstEmails.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes('Email','Quitar');
  }

  removerFiltroFecha(objFecha : Fecha){
    this._publicacionMensajesFiltros.lstFechas.push(objFecha);

    this._filtrosSeleccionados.lstFechas.forEach((item,index) => {
      if (item.FechaAlta === objFecha.FechaAlta){
        this._filtrosSeleccionados.lstFechas.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes('Fecha','Quitar');
  }

  colapseEstatus(){
    this._colapseEstatus = !this._colapseEstatus;
  }

  colapseAccion(){
    this._colapseAccion = !this._colapseAccion;
  }

  colapsePublicacion(){
    this._colapsePublicacion = !this._colapsePublicacion;
  }

  colapseEmail(){
    this._colapseEmail = !this._colapseEmail;
  }

  colapseFecha(){
    this._colapseFecha = !this._colapseFecha;
  }

  colapsarFiltros(){
    //debugger;
    this._collapseFiltros = !this._collapseFiltros;

    if (this._collapseFiltros){
      if (!this._colapseEstatus)
        this.colapseFiltro1.nativeElement.click();
      if (!this._colapseAccion)
        this.colapseFiltro2.nativeElement.click();
      if (!this._colapsePublicacion)
        this.colapseFiltro3.nativeElement.click();
      if (!this._colapseEmail)
        this.colapseFiltro4.nativeElement.click();
      if (!this._colapseFecha)
        this.colapseFiltro5.nativeElement.click();
    }
    else{
      if (this._colapseEstatus)
        this.colapseFiltro1.nativeElement.click();
      if (this._colapseAccion)
        this.colapseFiltro2.nativeElement.click();
      if (this._colapsePublicacion)
        this.colapseFiltro3.nativeElement.click();
      if (this._colapseEmail)
        this.colapseFiltro4.nativeElement.click();
      if (this._colapseFecha)
        this.colapseFiltro5.nativeElement.click();
    }
  }

  eliminarFiltros(){

    this._filtrosSeleccionados = new publicacionMensajesFiltros([],[],[],[],[]);

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosMensajes(null,null);

  }

  obtenerFiltrosMensajes(filtroSeleccionado : string | null, strAgregarQuitar : string | null){
    //debugger;

    if (strAgregarQuitar === 'Agregar'){
      switch (filtroSeleccionado) {
        case 'Estatus':
            this._verFiltros.Estatus = false;
          break;
        case 'Indicador':
            this._verFiltros.Indicador = false;
          break;
        case 'Publicacion':
            this._verFiltros.Publicacion = false;
          break;
        case 'Email':
            this._verFiltros.Email = false;
          break;
        case 'Fecha':
            this._verFiltros.Fecha = false;
          break;
        default:
          break;
      }
    }
    else {
      switch (filtroSeleccionado) {
        case null:
            this._verFiltros = new verFiltros(true,true,true,true,true);
          break;
        case 'Estatus':
            this._verFiltros.Estatus = true;
          break;
        case 'Indicador':
            this._verFiltros.Indicador = true;
          break;
        case 'Publicacion':
            this._verFiltros.Publicacion = true;
          break;
        case 'Email':
            this._verFiltros.Email = true;
          break;
        case 'Fecha':
            this._verFiltros.Fecha = true;
          break;
        default:
          break;
      }
    }
    debugger;
    this._publicacionMensajesFiltrosService.getPublicacionMensajesFiltros(this._loginService.obtenerIdCliente(), this._filtrosSeleccionados.lstPublicaciones[0] === undefined ? null : this._filtrosSeleccionados.lstPublicaciones[0].Id_Publicacion,
                                                                                                                 this._filtrosSeleccionados.lstIndicadores[0] === undefined ? null : this._filtrosSeleccionados.lstIndicadores[0].Id_Indicador,
                                                                                                                 this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus,
                                                                                                                 this._filtrosSeleccionados.lstEmails[0] === undefined ? null : this._filtrosSeleccionados.lstEmails[0].Email,
                                                                                                                 this._filtrosSeleccionados.lstFechas[0] === undefined ? null : this._filtrosSeleccionados.lstFechas[0].FechaAlta).subscribe(
      (data) => {
        //Next callback
        //console.log('data',data);
        this._publicacionMensajesFiltros = data;
        //console.log('_publicacionMensajesFiltros',this._publicacionMensajesFiltros);
        
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
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

}
