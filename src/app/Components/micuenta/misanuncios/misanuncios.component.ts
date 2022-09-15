import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { estatus } from 'src/app/Models/catalogos/estatus.model';
import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { EstatusService } from '../../../Services/Catalogos/estatus.service';
import { publicacionInfoMini, publicacionMultimedia } from 'src/app/Models/procesos/publicacion.model';
import { PublicacionesService } from '../../../Services/Procesos/publicaciones.service';
import { LoginService } from '../../../Services/Catalogos/login.service';
import { Asentamiento, Estado, Estatus, Municipio, publicacionClienteFiltros, TipoOperacion, TipoPlan, TipoPropiedad, verFiltros } from '../../../Models/procesos/publicacionClienteFiltros.model';
import { PublicacionesClienteFiltrosService } from '../../../Services/Procesos/publicacionesClienteFiltros.service';

@Component({
  selector: 'app-misanuncios',
  templateUrl: './misanuncios.component.html',
  styleUrls: ['./misanuncios.component.css']
})
export class MisAnunciosComponent implements OnInit {
  formaBusqueda =  this.fb.group({});
  formaNumeroPagina = this.fb.group({});

  _publicacionesInfoMini : publicacionInfoMini[] = [];
  _publicacionesFiltros : publicacionClienteFiltros = new publicacionClienteFiltros([],[],[],[],[],[],[]);
  _verFiltros : verFiltros = new verFiltros(true,true,true,true,true,false,false);
  _filtrosSeleccionados : publicacionClienteFiltros = new publicacionClienteFiltros([],[],[],[],[],[],[]);
  _listaEstatus : estatus[] = [];
  _estatus : estatus = new estatus(0,0,'','',new Date(), new Date());
  _misAnuncios = 'misAnuncios';
  _mostrarFiltros : boolean = sessionStorage.getItem('mf') === '1'? true : false;
  _cargandoInformacion : boolean = false;

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

  _colapseEstatus = false;
  _colapseTipoPropiedad = false;
  _colapseTipoOperacion = false;
  _colapseTipoPlan = false;
  _colapseEstados = false;
  _colapseMunicipios = false;
  _colapseAsentamientos = false;

  @ViewChild('myColapseFiltro1') colapseFiltro1 : any;
  @ViewChild('myColapseFiltro2') colapseFiltro2 : any;
  @ViewChild('myColapseFiltro3') colapseFiltro3 : any;
  @ViewChild('myColapseFiltro4') colapseFiltro4 : any;
  @ViewChild('myColapseFiltro5') colapseFiltro5 : any;
  @ViewChild('myColapseFiltro6') colapseFiltro6 : any;
  @ViewChild('myColapseFiltro7') colapseFiltro7 : any;

  constructor(  private router: Router,
                private fb: FormBuilder,
                private _publicacionesService : PublicacionesService,
                private _loginService : LoginService,
                private _estatusService : EstatusService,
                private _publicacionesFiltrosService : PublicacionesClienteFiltrosService
  ) {
    this._cargandoInformacion = true;
    this.crearFormulario();
    this.crearFormularioNumeroPagina();
    this.limpiarFormulario();
    this.obtenerEstatusPublicacion();
    this.obtenerFiltrosPublicaciones(null,null);
    this._mostrarFiltros = sessionStorage.getItem('mf') === '1'? true : false;
    this.ejecutarConsulta(0);
  }

  crearFormulario() {
    this.formaBusqueda =  this.fb.group({
      estatusPublicacion : [ '' ],
    });
  }

  limpiarFormulario() {
    this.formaBusqueda.reset({
      estatusPublicacion : '' ,
    });
  }

  ngOnInit(): void {
  }

  crearFormularioNumeroPagina() {
    this.formaNumeroPagina = this.fb.group({
      numeroPagina : ['', [Validators.required] ]
    });
  }

  agregarAnuncio(){
    setTimeout( () => { this.router.navigateByUrl('/publicar/operacion-tipo-inmueble'); }, 500 );
  }

  obtenerEstatusPublicacion(){
    this._estatusService.getEstatusProceso('Publicacion').subscribe(
      (data) => {
        //Next callback
        console.log('data',data);
        // this._opcionSeleccionada = 'Pausada';
        this._listaEstatus = data;

        this.formaBusqueda.setValue({
          estatusPublicacion : data[0].Id_Estatus
        });

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

  obtenerFiltrosPublicaciones(filtroSeleccionado : string | null, strAgregarQuitar : string | null){
    debugger;

    if (strAgregarQuitar === 'Agregar'){
      switch (filtroSeleccionado) {
        case 'Estatus':
            this._verFiltros.Estatus = false;
          break;
        case 'TipoPropiedad':
            this._verFiltros.TipoPropiedad = false;
          break;
        case 'TipoOperacion':
            this._verFiltros.TipoOperacion = false;
          break;
        case 'TipoPlan':
            this._verFiltros.TipoPlan = false;
          break;
        case 'Estado':
            this._verFiltros.Estado = false;
            this._verFiltros.Municipio = true;
            this._verFiltros.Asentamiento = false;
          break;
        case 'Municipio':
            this._verFiltros.Estado = false;
            this._verFiltros.Municipio = false;
            this._verFiltros.Asentamiento = true;
          break;
        case 'Asentamiento':
            this._verFiltros.Estado = false;
            this._verFiltros.Municipio = false;
            this._verFiltros.Asentamiento = false;
          break;
        default:
          break;
      }
    }
    else {
      switch (filtroSeleccionado) {
        case null:
            this._verFiltros = new verFiltros(true,true,true,true,true,false,false);
          break;
        case 'Estatus':
            this._verFiltros.Estatus = true;
          break;
        case 'TipoPropiedad':
            this._verFiltros.TipoPropiedad = true;
          break;
        case 'TipoOperacion':
            this._verFiltros.TipoOperacion = true;
          break;
        case 'TipoPlan':
            this._verFiltros.TipoPlan = true;
          break;
        case 'Estado':
            this._verFiltros.Estado = true;
            this._verFiltros.Municipio = false;
            this._verFiltros.Asentamiento = false;
          break;
        case 'Municipio':
            this._verFiltros.Estado = false;
            this._verFiltros.Municipio = true;
            this._verFiltros.Asentamiento = false;
          break;
        case 'Asentamiento':
            this._verFiltros.Estado = false;
            this._verFiltros.Municipio = false;
            this._verFiltros.Asentamiento = true;
          break;
        default:
          break;
      }
    }

    this._publicacionesFiltrosService.getPublicacionClienteFiltros(this._loginService.obtenerIdCliente()!, this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus, 
                                                                                                          this._filtrosSeleccionados.lstTiposPropiedad[0] === undefined ? null : this._filtrosSeleccionados.lstTiposPropiedad[0].Id_TipoPropiedad,
                                                                                                          this._filtrosSeleccionados.lstTiposOperacion[0] === undefined ? null : this._filtrosSeleccionados.lstTiposOperacion[0].Id_TipoOperacion, 
                                                                                                          this._filtrosSeleccionados.lstTiposPlanes[0] === undefined ? null : this._filtrosSeleccionados.lstTiposPlanes[0].Id_Plan, 
                                                                                                          this._filtrosSeleccionados.lstEstados[0] === undefined ? null : this._filtrosSeleccionados.lstEstados[0].Id_Estado, 
                                                                                                          this._filtrosSeleccionados.lstMunicipios[0] === undefined ? null : this._filtrosSeleccionados.lstMunicipios[0].Id_Municipio, 
                                                                                                          this._filtrosSeleccionados.lstAsentamientos[0] === undefined ? null : this._filtrosSeleccionados.lstAsentamientos[0].Id_Asentamiento).subscribe(
      (data) => {
        //Next callback
        // this._opcionSeleccionada = 'Pausada';
        this._publicacionesFiltros = data;
        
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
    this.ejecutarConsulta(this._paginaActual - 1);
  }

  obtenerPaginaSiguiente(){
    this.ejecutarConsulta(this._paginaActual + 1);
  }

  mostrarFiltros(){
    this._mostrarFiltros = !this._mostrarFiltros;
      //    this.colapseFiltros.nativeElement.click();
    sessionStorage.setItem('mf', this._mostrarFiltros ? '1' : '0');
  }

  seleccionarFiltroEstatus(objEstatus : Estatus){

    this._filtrosSeleccionados.lstEstatus.push(objEstatus);

    this._publicacionesFiltros.lstEstatus.forEach((item,index) => {
      if (item.Id_Estatus === objEstatus.Id_Estatus){
        this._publicacionesFiltros.lstEstatus.splice(index,1); 
      }
    });

    
    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('Estatus','Agregar');
    
    //this._verFiltros.Estatus = false;

  }

  seleccionarFiltroTipoPropiedad(objTipoPropiedad : TipoPropiedad){

    this._filtrosSeleccionados.lstTiposPropiedad.push(objTipoPropiedad);

    this._publicacionesFiltros.lstTiposPropiedad.forEach((item,index) => {
      if (item.Id_TipoPropiedad === objTipoPropiedad.Id_TipoPropiedad){
        this._publicacionesFiltros.lstTiposPropiedad.splice(index,1); 
      }
    });

    //this._verFiltros.TipoPropiedad = false;

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('TipoPropiedad','Agregar');
  }

  seleccionarFiltroTipoOperacion(objTipoOperacion : TipoOperacion){
    this._filtrosSeleccionados.lstTiposOperacion.push(objTipoOperacion);

    this._publicacionesFiltros.lstTiposOperacion.forEach((item,index) => {
      if (item.Id_TipoOperacion === objTipoOperacion.Id_TipoOperacion){
        this._publicacionesFiltros.lstTiposOperacion.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('TipoOperacion','Agregar');
  }

  seleccionarFiltroTipoPlan(objTipoPlan : TipoPlan){
    this._filtrosSeleccionados.lstTiposPlanes.push(objTipoPlan);

    this._publicacionesFiltros.lstTiposPlanes.forEach((item,index) => {
      if (item.Id_Plan === objTipoPlan.Id_Plan){
        this._publicacionesFiltros.lstTiposPlanes.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('TipoPlan','Agregar');
  }

  seleccionarFiltroEstado(objEstado : Estado){
    this._filtrosSeleccionados.lstEstados.push(objEstado);

    this._publicacionesFiltros.lstEstados.forEach((item,index) => {
      if (item.Id_Estado === objEstado.Id_Estado){
        this._publicacionesFiltros.lstEstados.splice(index,1); 
      }
    });

    // this._verFiltros.Estado = false;
    // this._verFiltros.Municipio = true;
    // this._verFiltros.Asentamiento = false;

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('Estado','Agregar');
  }

  seleccionarFiltroMunicipio(objMunicipio : Municipio){
    
    this._filtrosSeleccionados.lstMunicipios.push(objMunicipio);

    this._publicacionesFiltros.lstMunicipios.forEach((item,index) => {
      if (item.Id_Municipio === objMunicipio.Id_Municipio){
        this._publicacionesFiltros.lstMunicipios.splice(index,1); 
      }
    });

    // this._verFiltros.Estado = false;
    // this._verFiltros.Municipio = false;
    // this._verFiltros.Asentamiento = true;

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('Municipio','Agregar');
  }

  seleccionarFiltroAsentamiento(objAsentamiento : Asentamiento){

    this._filtrosSeleccionados.lstAsentamientos.push(objAsentamiento);

    this._publicacionesFiltros.lstAsentamientos.forEach((item,index) => {
      if (item.Id_Asentamiento === objAsentamiento.Id_Asentamiento){
        this._publicacionesFiltros.lstAsentamientos.splice(index,1); 
      }
    });

    // this._verFiltros.Estado = false;
    // this._verFiltros.Municipio = false;
    // this._verFiltros.Asentamiento = false;

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('Asentamiento','Agregar');
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

    //this._cargandoInformacion = true;

    this._publicacionesService.getPublicacionesMini(this._loginService.obtenerIdCliente()!, this._loginService.obtenerIdCliente()!, numPagina, 10, this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus, 
                                                                                                                this._filtrosSeleccionados.lstTiposPropiedad[0] === undefined ? null : this._filtrosSeleccionados.lstTiposPropiedad[0].Id_TipoPropiedad,
                                                                                                                this._filtrosSeleccionados.lstTiposOperacion[0] === undefined ? null : this._filtrosSeleccionados.lstTiposOperacion[0].Id_TipoOperacion, 
                                                                                                                this._filtrosSeleccionados.lstTiposPlanes[0] === undefined ? null : this._filtrosSeleccionados.lstTiposPlanes[0].Id_Plan, 
                                                                                                                this._filtrosSeleccionados.lstEstados[0] === undefined ? null : this._filtrosSeleccionados.lstEstados[0].Id_Estado, 
                                                                                                                this._filtrosSeleccionados.lstMunicipios[0] === undefined ? null : this._filtrosSeleccionados.lstMunicipios[0].Id_Municipio, 
                                                                                                                this._filtrosSeleccionados.lstAsentamientos[0] === undefined ? null : this._filtrosSeleccionados.lstAsentamientos[0].Id_Asentamiento).subscribe(
      (data) => {
        //Next callback
        //console.log('getPublicacionesMini', data);
        this._publicacionesInfoMini = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        this.formaNumeroPagina.patchValue({
          numeroPagina : numPagina! + 1
        });

        // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
        this._publicacionesService.getPublicacionesMiniPagDet(this._loginService.obtenerIdCliente()!, 10, this._filtrosSeleccionados.lstEstatus[0] === undefined ? null : this._filtrosSeleccionados.lstEstatus[0].Id_Estatus, 
                                                                                                         this._filtrosSeleccionados.lstTiposPropiedad[0] === undefined ? null : this._filtrosSeleccionados.lstTiposPropiedad[0].Id_TipoPropiedad,
                                                                                                         this._filtrosSeleccionados.lstTiposOperacion[0] === undefined ? null : this._filtrosSeleccionados.lstTiposOperacion[0].Id_TipoOperacion,
                                                                                                         this._filtrosSeleccionados.lstTiposPlanes[0] === undefined ? null : this._filtrosSeleccionados.lstTiposPlanes[0].Id_Plan, 
                                                                                                         this._filtrosSeleccionados.lstEstados[0] === undefined ? null : this._filtrosSeleccionados.lstEstados[0].Id_Estado, 
                                                                                                         this._filtrosSeleccionados.lstMunicipios[0] === undefined ? null : this._filtrosSeleccionados.lstMunicipios[0].Id_Municipio, 
                                                                                                         this._filtrosSeleccionados.lstAsentamientos[0] === undefined ? null : this._filtrosSeleccionados.lstAsentamientos[0].Id_Asentamiento).subscribe(
          (data) => {
            //Next callback
            //console.log('getPublicacionesMiniPagDet', data);
            this._paginadoDetalle = data;

            this.CargarPaginador(numPagina!);
            
            this._cargandoInformacion = false;
    
          },
          (error: HttpErrorResponse) => {
            this._cargandoInformacion = false;
            this._seRealizaBusqueda = true;
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
        this._cargandoInformacion = false;
        this._seRealizaBusqueda = true;
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
            break;
          case 404:
            this._publicacionesInfoMini = [];
            break;
          case 409:
            break;
        }

      }
    );
  }

  removerFiltroEstatus(objEstatus : Estatus){
    // this._publicacionesFiltros.lstEstatus.push(objEstatus);

    this._filtrosSeleccionados.lstEstatus.forEach((item,index) => {
      if (item.Id_Estatus === objEstatus.Id_Estatus){
        this._filtrosSeleccionados.lstEstatus.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('Estatus','Quitar');

  }

  removerFiltroTipoPropiedad(objTipoPropiedad : TipoPropiedad){
    this._publicacionesFiltros.lstTiposPropiedad.push(objTipoPropiedad);

    this._filtrosSeleccionados.lstTiposPropiedad.forEach((item,index) => {
      if (item.Id_TipoPropiedad === objTipoPropiedad.Id_TipoPropiedad){
        this._filtrosSeleccionados.lstTiposPropiedad.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('TipoPropiedad','Quitar');

  }

  removerFiltroTipoOperacion(objTipoOperacion : TipoOperacion){
    this._publicacionesFiltros.lstTiposOperacion.push(objTipoOperacion);

    this._filtrosSeleccionados.lstTiposOperacion.forEach((item,index) => {
      if (item.Id_TipoOperacion === objTipoOperacion.Id_TipoOperacion){
        this._filtrosSeleccionados.lstTiposOperacion.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('TipoOperacion','Quitar');
  }

  removerFiltroTipoPlan(objTipoPlan : TipoPlan){
    this._publicacionesFiltros.lstTiposPlanes.push(objTipoPlan);

    this._filtrosSeleccionados.lstTiposPlanes.forEach((item,index) => {
      if (item.Id_Plan === objTipoPlan.Id_Plan){
        this._filtrosSeleccionados.lstTiposPlanes.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('TipoPlan','Quitar');
  }

  removerFiltroEstados(objEstado : Estado){
    this._publicacionesFiltros.lstEstados.push(objEstado);

    this._filtrosSeleccionados.lstEstados.forEach((item,index) => {
      if (item.Id_Estado === objEstado.Id_Estado){
        this._filtrosSeleccionados.lstEstados.splice(index,1); 
      }
    });

    this._filtrosSeleccionados.lstMunicipios.forEach(item => {
      this._publicacionesFiltros.lstMunicipios.push(item);
    });

    this._filtrosSeleccionados.lstMunicipios.forEach((item,index) => {
        this._filtrosSeleccionados.lstMunicipios.splice(index,1); 
    });

    this._filtrosSeleccionados.lstAsentamientos.forEach(item => {
      this._publicacionesFiltros.lstAsentamientos.push(item);
    });

    this._filtrosSeleccionados.lstAsentamientos.forEach((item,index) => {
        this._filtrosSeleccionados.lstAsentamientos.splice(index,1); 
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('Estado','Quitar');
  }

  removerFiltroMunicipios(objMunicipio : Municipio){
    this._publicacionesFiltros.lstMunicipios.push(objMunicipio);

    this._filtrosSeleccionados.lstMunicipios.forEach((item,index) => {
      if (item.Id_Municipio === objMunicipio.Id_Municipio){
        this._filtrosSeleccionados.lstMunicipios.splice(index,1); 
      }
    });

    this._filtrosSeleccionados.lstAsentamientos.forEach(item => {
      this._publicacionesFiltros.lstAsentamientos.push(item);
    });

    this._filtrosSeleccionados.lstAsentamientos.forEach((item,index) => {
        this._filtrosSeleccionados.lstAsentamientos.splice(index,1); 
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('Municipio','Quitar');
  }

  removerFiltroAsentamientos(objAsentamiento : Asentamiento){
    this._publicacionesFiltros.lstAsentamientos.push(objAsentamiento);

    this._filtrosSeleccionados.lstAsentamientos.forEach((item,index) => {
      if (item.Id_Asentamiento === objAsentamiento.Id_Asentamiento){
        this._filtrosSeleccionados.lstAsentamientos.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones('Asentamiento','Quitar');
  }

  colapseEstatus(){
    this._colapseEstatus = !this._colapseEstatus;
  }

  colapseTipoPropiedad(){
    this._colapseTipoPropiedad = !this._colapseTipoPropiedad;
  }

  colapseTipoOperacion(){
    this._colapseTipoOperacion = !this._colapseTipoOperacion;
  }

  colapseTipoPlan(){
    this._colapseTipoPlan = !this._colapseTipoPlan;
  }

  colapseEstado(){
    this._colapseEstados = !this._colapseEstados;
  }

  colapseMunicipios(){
    this._colapseMunicipios = !this._colapseMunicipios;
  }

  colapseAsentamientos(){
    this._colapseAsentamientos = !this._colapseAsentamientos;
  }

  colapsarFiltros(){
    debugger;
    this._collapseFiltros = !this._collapseFiltros;

    if (this._collapseFiltros){
      if (!this._colapseEstatus)
        this.colapseFiltro1.nativeElement.click();
      if (!this._colapseTipoPropiedad)
        this.colapseFiltro2.nativeElement.click();
      if (!this._colapseTipoOperacion)
        this.colapseFiltro3.nativeElement.click();
      if (!this._colapseEstados)
        this.colapseFiltro4.nativeElement.click();
      if (!this._colapseMunicipios)
        this.colapseFiltro5.nativeElement.click();
      if (!this._colapseAsentamientos)
        this.colapseFiltro6.nativeElement.click();
      if (!this._colapseTipoPlan)
        this.colapseFiltro7.nativeElement.click();
    }
    else{
      if (this._colapseEstatus)
        this.colapseFiltro1.nativeElement.click();
      if (this._colapseTipoPropiedad)
        this.colapseFiltro2.nativeElement.click();
      if (this._colapseTipoOperacion)
        this.colapseFiltro3.nativeElement.click();
      if (this._colapseEstados)
        this.colapseFiltro4.nativeElement.click();
      if (this._colapseMunicipios)
        this.colapseFiltro5.nativeElement.click();
      if (this._colapseAsentamientos)
        this.colapseFiltro6.nativeElement.click();
      if (this._colapseTipoPlan)
        this.colapseFiltro7.nativeElement.click();
    }
    
  }

  eliminarFiltros(){

    this._filtrosSeleccionados = new publicacionClienteFiltros([],[],[],[],[],[],[]);

    this.ejecutarConsulta(0);
    this.obtenerFiltrosPublicaciones(null,null);

  }

  copiarAnuncio(objPublicacion : publicacionInfoMini){
    debugger;
    this._publicacionesService.getPublicacionClienteCopiar(objPublicacion.Id_Publicacion, this._loginService.obtenerIdCliente()!).subscribe(
      (data) => {
        //Next callback

        this.ejecutarConsulta(0);
        
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
          title: 'El anuncio se copio de manera correcta y se almaceno con estatus de: borrador.'
        });

        this.obtenerFiltrosPublicaciones(null,null);

      },
      (error: HttpErrorResponse) => {
        //Error callback
        
        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            this._publicacionesInfoMini = [];
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

  cancelarPublicacion(objPublicacion : publicacionInfoMini){
    debugger;
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que desea cancelar la Publicación: "' + (objPublicacion.TituloPublicacion === null ? 'Sin titulo' : objPublicacion.TituloPublicacion ) + '"?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar',
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

        this._publicacionesService.deletePublicacion(objPublicacion.Id_Publicacion, this._loginService.obtenerIdCliente()!).subscribe(
          (data) => {
            //Next callback

            this._filtrosSeleccionados = new publicacionClienteFiltros([],[],[],[],[],[],[]);
            this.ejecutarConsulta(0);
            this.obtenerFiltrosPublicaciones(null,null);
            
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

}