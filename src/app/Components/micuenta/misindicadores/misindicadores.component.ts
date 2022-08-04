import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { LoginService } from '../../../Services/Catalogos/login.service';
import { EstadisticasClienteService } from 'src/app/Services/Procesos/estadisticasCliente.service';
import { estadisticasCliente } from '../../../Models/procesos/estadisticasCliente.model';
import { estadisticasClienteFiltros, Estatus, FechaInicioPublicacion, Publicacion, verFiltros } from 'src/app/Models/procesos/estadisticasClienteFiltros.model';
import { EstadisticasClienteFiltrosService } from 'src/app/Services/Procesos/estadisticasClienteFiltros.service';
import { Email, Indicador, indicadoresColumnas } from '../../../Models/procesos/estadisticasClienteFiltros.model';
import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { IndicadoresService } from '../../../Services/Catalogos/indicadores.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-misindicadores',
  templateUrl: './misindicadores.component.html',
  styleUrls: ['./misindicadores.component.css']
})
export class MisIndicadoresComponent implements OnInit {
  _estadisticasCliente : estadisticasCliente[] = [];
  _mostrarFiltros : boolean = sessionStorage.getItem('mf') === '1'? true : false;
  _mostrarIndicadores : boolean = true;

  _estadisticasClienteFiltros : estadisticasClienteFiltros = new estadisticasClienteFiltros([],[],[],[]);
  _indicadoresColumnas : indicadoresColumnas = new indicadoresColumnas([]);
  _verFiltros : verFiltros = new verFiltros(true, true, true, true);
  _filtrosSeleccionados : estadisticasClienteFiltros = new estadisticasClienteFiltros([],[],[],[]);

  // Paginador
  formaNumeroPagina = this.fb.group({});
  _paginadoDetalle : paginadoDetalle = new paginadoDetalle(0,0);
  _paginas: pagina[] = [];
  _numeroPaginasMostrar = 5;
  _paginaActual = 0;
  _paginaInicial = 0;
  _paginaFinal = 4;
  _mostrarPaginaAnterior = true;
  _mostrarPaginaSiguiente = true;
  _seRealizaBusqueda = false;

  _collapseFiltros = false;
  _colapseIndicador = false;
  _colapsePublicacion = false;
  _colapseEmail = false;
  _colapseEstatus = false;
  _colapseFechaInicioPublicacion = false;

  @ViewChild('myColapseFiltro1') colapseFiltro1 : any;
  @ViewChild('myColapseFiltro2') colapseFiltro2 : any;
  @ViewChild('myColapseFiltro3') colapseFiltro3 : any;
  @ViewChild('myColapseFiltro4') colapseFiltro4 : any;
  @ViewChild('myColapseFiltro5') colapseFiltro5 : any;

  constructor( private _estadisticasClienteService : EstadisticasClienteService,
               private _estadisticasClienteFiltrosService : EstadisticasClienteFiltrosService,
               private _indicadoresService : IndicadoresService,
               private fb: FormBuilder,
               private _loginService : LoginService ) { 

    this.crearFormularioNumeroPagina();
    this.ejecutarConsulta(0);
    this.obtenerFiltrosEstadisticas(null,null);
    this.ObtenerIndicadores();
    this.CargarDetallePaginador();
    this._mostrarFiltros = sessionStorage.getItem('mf') === '1'? true : false;
  }

  ngOnInit(): void {
  }

  crearFormularioNumeroPagina() {
    this.formaNumeroPagina = this.fb.group({
      numeroPagina : ['', [Validators.required] ]
    });
  }

  ObtenerIndicadores() {

    this._indicadoresService.getIndicadores(null, 1).subscribe(
      (data) => {
        console.log('getIndicadores antes: ', data);
        this._indicadoresColumnas.lstIndicadores = data;
        console.log('getIndicadores despues: ', data);

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

  obtenerFiltrosEstadisticas(filtroSeleccionado : string | null, strAgregarQuitar : string | null){
    debugger;

    if (strAgregarQuitar === 'Agregar'){
      switch (filtroSeleccionado) {
        case 'Publicacion':
            this._verFiltros.Publicacion = false;
          break;
        case 'Email':
            this._verFiltros.Email = false;
          break;
        case 'Estatus':
            this._verFiltros.Estatus = false;
          break;
        case 'FechaInicioPublicacion':
            this._verFiltros.FechaInicioPublicacion = false;
          break;
        default:
          break;
      }
    }
    else {
      switch (filtroSeleccionado) {
        case null:
            this._verFiltros = new verFiltros(true,true,true,true);
          break;
        case 'Publicacion':
            this._verFiltros.Publicacion = true;
          break;
        case 'Email':
            this._verFiltros.Email = true;
          break;
        case 'Estatus':
            this._verFiltros.Estatus = true;
          break;
        case 'FechaInicioPublicacion':
            this._verFiltros.FechaInicioPublicacion = true;
          break;
        default:
          break;
      }
    }

    this._estadisticasClienteFiltrosService.getEstadisticasClienteFiltros(this._loginService.obtenerIdCliente()!, this._filtrosSeleccionados.lstPublicaciones[0] === undefined ? null : this._filtrosSeleccionados.lstPublicaciones[0].Id_Publicacion,
                                                                                                                 this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus,
                                                                                                                 this._filtrosSeleccionados.lstEmails[0] === undefined ? null : this._filtrosSeleccionados.lstEmails[0].Email,
                                                                                                                 this._filtrosSeleccionados.lstFechasInicioPublicacion[0] === undefined ? null : this._filtrosSeleccionados.lstFechasInicioPublicacion[0].FechaInicioPublicacion).subscribe(
      (data) => {
        //Next callback
        // this._opcionSeleccionada = 'Pausada';
        //console.log('data', data);
        this._estadisticasClienteFiltros = data;
        
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

  mostrarFiltros(){
    this._mostrarFiltros = !this._mostrarFiltros;
    sessionStorage.setItem('mf', this._mostrarFiltros ? '1' : '0');
  }

  CargarDetallePaginador(){
    //debugger;
    // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
    this._estadisticasClienteService.getEstadisticasClientePagDet(this._loginService.obtenerIdCliente()!, 10, this._filtrosSeleccionados.lstPublicaciones[0] === undefined ? null : this._filtrosSeleccionados.lstPublicaciones[0].Id_Publicacion,
                                                                                                                this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus,
                                                                                                                this._filtrosSeleccionados.lstEmails[0] === undefined ? null : this._filtrosSeleccionados.lstEmails[0].Email,
                                                                                                                this._filtrosSeleccionados.lstFechasInicioPublicacion[0] === undefined ? null : this._filtrosSeleccionados.lstFechasInicioPublicacion[0].FechaInicioPublicacion).subscribe(
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

  seleccionarColumnaIndicador(objIndicador : Indicador){
    objIndicador.Mostrar = !objIndicador.Mostrar;

  }

  seleccionarFiltroPublicacion(objPublicacion : Publicacion){

    this._filtrosSeleccionados.lstPublicaciones.push(objPublicacion);

    this._estadisticasClienteFiltros.lstPublicaciones.forEach((item,index) => {
      if (item.Id_Publicacion === objPublicacion.Id_Publicacion){
        this._estadisticasClienteFiltros.lstPublicaciones.splice(index,1); 
      }
    });

    
    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosEstadisticas('Publicacion','Agregar');
    
  }

  seleccionarFiltroEmail(objEmail : Email){

    this._filtrosSeleccionados.lstEmails.push(objEmail);

    this._estadisticasClienteFiltros.lstEmails.forEach((item,index) => {
      if (item.Email === objEmail.Email){
        this._estadisticasClienteFiltros.lstEmails.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosEstadisticas('Email','Agregar');
  }

  seleccionarFiltroEstatus(objEstatus : Estatus){

    this._filtrosSeleccionados.lstEstatus.push(objEstatus);

    this._estadisticasClienteFiltros.lstEstatus.forEach((item,index) => {
      if (item.Id_Estatus === objEstatus.Id_Estatus){
        this._estadisticasClienteFiltros.lstEstatus.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosEstadisticas('Estatus','Agregar');
  }

  seleccionarFiltroFechaInicioPublicacion(objFechaInicio : FechaInicioPublicacion){

    this._filtrosSeleccionados.lstFechasInicioPublicacion.push(objFechaInicio);

    this._estadisticasClienteFiltros.lstFechasInicioPublicacion.forEach((item,index) => {
      if (item.FechaInicioPublicacion === objFechaInicio.FechaInicioPublicacion){
        this._estadisticasClienteFiltros.lstFechasInicioPublicacion.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosEstadisticas('FechaInicioPublicacion','Agregar');
  }

  ejecutarConsulta(numPagina : number | null){
    debugger;

    if(numPagina === null){
      numPagina = this.formaNumeroPagina.get('numeroPagina')!.value - 1;
      if (numPagina! > this._paginadoDetalle.TotalPaginas)
          numPagina = this._paginadoDetalle.TotalPaginas - 1;
      if (numPagina! < 1)
          numPagina = 0
    }

    this._estadisticasClienteService.getEstadisticasCliente(this._loginService.obtenerIdCliente()!, numPagina, 10, this._filtrosSeleccionados.lstPublicaciones[0] === undefined ? null : this._filtrosSeleccionados.lstPublicaciones[0].Id_Publicacion,
                                                                                                    this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus,
                                                                                                    this._filtrosSeleccionados.lstEmails[0] === undefined ? null : this._filtrosSeleccionados.lstEmails[0].Email,
                                                                                                    this._filtrosSeleccionados.lstFechasInicioPublicacion[0] === undefined ? null : this._filtrosSeleccionados.lstFechasInicioPublicacion[0].FechaInicioPublicacion).subscribe(
      (data) => {
        //Next callback
        //console.log('getEstadisticasCliente', data);
        this._estadisticasCliente = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        this.formaNumeroPagina.patchValue({
          numeroPagina : numPagina! + 1
        });

        this.CargarPaginador(numPagina!);

      },
      (error: HttpErrorResponse) => {
        //Error callback
        
        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            this._estadisticasCliente = [];
            break;
          case 409:
            break;
        }

      }
    );
  }

  removerFiltroPublicacion(objPublicacion : Publicacion){
    this._estadisticasClienteFiltros.lstPublicaciones.push(objPublicacion);

    this._filtrosSeleccionados.lstPublicaciones.forEach((item,index) => {
      if (item.Id_Publicacion === objPublicacion.Id_Publicacion){
        this._filtrosSeleccionados.lstPublicaciones.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosEstadisticas('Publicacion','Quitar');

  }

  removerFiltroEmail(objEmail : Email){
    this._estadisticasClienteFiltros.lstEmails.push(objEmail);

    this._filtrosSeleccionados.lstEmails.forEach((item,index) => {
      if (item.Email === objEmail.Email){
        this._filtrosSeleccionados.lstEmails.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosEstadisticas('Email','Quitar');

  }

  removerFiltroEstatus(objEstatus : Estatus){
    this._estadisticasClienteFiltros.lstEstatus.push(objEstatus);

    this._filtrosSeleccionados.lstEstatus.forEach((item,index) => {
      if (item.Id_Estatus === objEstatus.Id_Estatus){
        this._filtrosSeleccionados.lstEstatus.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosEstadisticas('Estatus','Quitar');

  }

  removerFiltroFechaInicioPublicacion(objFechaInicio : FechaInicioPublicacion){
    this._estadisticasClienteFiltros.lstFechasInicioPublicacion.push(objFechaInicio);

    this._filtrosSeleccionados.lstFechasInicioPublicacion.forEach((item,index) => {
      if (item.FechaInicioPublicacion === objFechaInicio.FechaInicioPublicacion){
        this._filtrosSeleccionados.lstFechasInicioPublicacion.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosEstadisticas('FechaInicioPublicacion','Quitar');

  }

  colapseIndicador(){
    this._colapseIndicador = !this._colapseIndicador;
  }

  colapsePublicacion(){
    this._colapsePublicacion = !this._colapsePublicacion;
  }

  colapseEmail(){
    this._colapseEmail = !this._colapseEmail;
  }

  colapseEstatus(){
    this._colapseEstatus = !this._colapseEstatus;
  }

  colapseFechaInicioPublicacion(){
    this._colapseFechaInicioPublicacion = !this._colapseFechaInicioPublicacion;
  }

  colapsarFiltros(){
    debugger;
    this._collapseFiltros = !this._collapseFiltros;

    if (this._collapseFiltros){
      if (!this._colapsePublicacion)
        this.colapseFiltro1.nativeElement.click();
      if (!this._colapseEmail)
        this.colapseFiltro2.nativeElement.click();
      if (!this._colapseEstatus)
        this.colapseFiltro3.nativeElement.click();
      if (!this._colapseFechaInicioPublicacion)
        this.colapseFiltro4.nativeElement.click();
    }
    else{
      if (this._colapsePublicacion)
        this.colapseFiltro1.nativeElement.click();
      if (this._colapseEmail)
        this.colapseFiltro2.nativeElement.click();
      if (this._colapseEstatus)
        this.colapseFiltro3.nativeElement.click();
      if (this._colapseFechaInicioPublicacion)
        this.colapseFiltro4.nativeElement.click();
    }
    
  }

  eliminarFiltros(){

    this._filtrosSeleccionados = new estadisticasClienteFiltros([],[],[],[]);

    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
    this.obtenerFiltrosEstadisticas(null,null);

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

  mostrarIndicadores(){
    this._indicadoresColumnas.lstIndicadores.forEach(item => {
      item.Mostrar = this._mostrarIndicadores;
    })
    this._mostrarIndicadores = !this._mostrarIndicadores;
  }

  verPublicacionCliente(objEstadistica : estadisticasCliente){
    window.open('propiedad/' + (objEstadistica.TituloPublicacion)?.replaceAll(' ','-') + '-' + objEstadistica.Id_Publicacion);
  }

}