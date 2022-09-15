import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { tipoPropiedad } from 'src/app/Models/catalogos/tipoPropiedad.model';
import { TiposPropiedadService } from 'src/app/Services/Catalogos/tiposPropiedades.service';
import { tipoOperacion } from '../../../Models/catalogos/tipoOperacion.model';
import { TiposOperacionService } from '../../../Services/Catalogos/tiposOperacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador-detallado',
  templateUrl: './buscador-detallado.component.html',
  styleUrls: ['./buscador-detallado.component.css']
})
export class BusquedadetalladaComponent implements OnInit {
  formaFiltros = this.fb.group({});
  formaUbicacion = this.fb.group({});
  
  _tiposOperacion : tipoOperacion[] = [];
  _tiposPropiedad : tipoPropiedad[] = [];
  _verTiposOperacion : boolean = false;
  _verTiposPropiedad : boolean = false;
  _verRangosRecamaras : boolean = false;
  _verRangosPrecios : boolean = false;
  _cantRecamaras = 0;

  // _estados       : estado[] = [];
  // _municipios    : municipio[] = [];
  // _asentamientos : asentamiento[] = [];
  // _cargandoEstados = false;
  // _cargandoMunicipios = false;
  // _cargandoAsentamientos = false;
  // _cadenaBusqueda = '';
  // _cadenaBusquedaEstado = '';
  // _cadenaBusquedaMunicipio = '';
  // _cadenaBusquedaAsentamiento = '';
  _filtros = '';
  _filtrosSinPagina = '';

  @Input() _filtrosBarraDireccion : string = '';

  constructor( private fb : FormBuilder,
               private router : Router,
               private _tiposPropiedadService: TiposPropiedadService,
               private _tiposOperacionService: TiposOperacionService ) 
               { 
                debugger;
    this._filtros = window.location.pathname;
    this._filtrosSinPagina = this._filtros.substring(0,this._filtros.indexOf('-pagina-') === -1 ? this._filtros.length : this._filtros.indexOf('-pagina-'))
  
    // this._cargandoEstados = false;
    // this._cargandoMunicipios = false;
    // this._cargandoAsentamientos = false;

    this.crearFormulario();
    //this.crearFormularioUbicacion();
    this.obtenerTiposOperacion();
    this.obtenerTiposPropiedad();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.formaFiltros = this.fb.group({
      tipoOperacion  : [ '' ],
      tipoPropiedad  : [ '' ],
      cantRecamaras  : [ '' ],
      precioDesde    : [ '' ],
      precioHasta    : [ '' ]
    });
  }

  // crearFormularioUbicacion(){
  //   this.formaUbicacion = this.fb.group({
  //     estado       : [ '' ],
  //     municipio    : [ '' ],
  //     asentamiento : [ '' ]
  //   });
  // }

  obtenerTiposPropiedad(){
    // console.log(this.loading);
    this._tiposPropiedadService.getTiposPropiedades().subscribe((data) => {

      this._tiposPropiedad = data;

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

      });
  }

  obtenerTiposOperacion(){
    // console.log(this.loading);
    this._tiposOperacionService.getTiposOperacion().subscribe((data) => {

      this._tiposOperacion = data;

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

      });
  }

  verTiposOperaciones(){
    debugger;
    this._verTiposOperacion = !this._verTiposOperacion;
    this._verTiposPropiedad = false;
    this._verRangosRecamaras = false;
    this._verRangosPrecios = false;
  }

  verTiposPropiedades(){
    debugger;
    this._verTiposOperacion = false;
    this._verTiposPropiedad = !this._verTiposPropiedad;
    this._verRangosRecamaras = false;
    this._verRangosPrecios = false;
  }

  verRangosRecamaras(){
    debugger;
    this._verTiposOperacion = false;
    this._verTiposPropiedad = false;
    this._verRangosRecamaras = !this._verRangosRecamaras;
    this._verRangosPrecios = false;
  }

  verRangosPrecios(){
    debugger;
    this._verTiposOperacion = false;
    this._verTiposPropiedad = false;
    this._verRangosRecamaras = false;
    this._verRangosPrecios = !this._verRangosPrecios;
  }

  limpiarRecamaras(){
    this._cantRecamaras = 0;
  }

  actualizarConsulta(){
    this._verTiposOperacion = false;
    this._verTiposPropiedad = false;
    this._verRangosRecamaras = false;
    this._verRangosPrecios = false;
  }

  seleccionarOperacion(){
    debugger;
    this._cantRecamaras = this.formaUbicacion.controls['cantRecamaras'].value;
  }

  // obtenerEstados(){
  //   debugger;

  //   this._verTiposOperacion = false;
  //   this._verTiposPropiedad = false;
  //   this._verRangosRecamaras = false;
  //   this._verRangosPrecios = false;

  //   this._municipios = [];
  //   this._asentamientos = [];

  //   this._cargandoEstados = true;

  //   this._estadosService.getEstados(1).subscribe(
  //     (data) => {
  //       //Next callback
  //       //console.log(data);
  //       this._estados = data;

  //       this._cargandoEstados = false;

  //     },
  //     (error: HttpErrorResponse) => {
        
  //       this._cargandoEstados = false;

  //       switch (error.status) {
  //         case 401:
  //           //console.log('error 401');
  //           break;
  //         case 403:
  //           //console.log('error 403');
  //           break;
  //         case 404:
  //           //console.log('error 404');
  //           break;
  //         case 409:
  //           //console.log('error 409');
  //           break;
  //       }

  //       //throw error;   //You can also throw the error to a global error handler
  //     }
  //   );
  // }

  // obtenerMunicipios(objEstado : estado) {
  //   debugger;

  //   this._asentamientos = [];
  //   this._cargandoMunicipios = true;

  //   this.formaUbicacion.patchValue({
  //     estado       : objEstado.Nombre,
  //     municipio    : '',
  //     asentamiento : ''
  //   });

  //   this._cadenaBusquedaEstado = 'en el estado de ' + objEstado.Nombre;

  //   this._cadenaBusqueda = this._cadenaBusquedaEstado;

  //   this._municipiosService.getMunicipios(objEstado.Id_Estado).subscribe(
  //     (data) => {
  //       //Next callback
  //       // console.log('datos: ', data);

  //       this._municipios = data;

  //       this._cargandoMunicipios = false;

  //     },
  //     (error: HttpErrorResponse) => {

  //       this._cargandoMunicipios = false;

  //       switch (error.status) {
  //         case 401:
  //           //console.log('error 401');
  //           break;
  //         case 403:
  //           //console.log('error 403');
  //           break;
  //         case 404:
  //           //console.log('error 404');
  //           break;
  //         case 409:
  //           //console.log('error 409');
  //           break;
  //       }

  //       //throw error;   //You can also throw the error to a global error handler
  //     }
  //   );
  // }

  // obtenerAsentamientos(objMunicipio : municipio) {
  //   debugger;

  //   this._cargandoAsentamientos = true;

  //   this.formaUbicacion.patchValue({
  //     municipio    : objMunicipio.Municipio,
  //     asentamiento : ''
  //   });

  //   this._cadenaBusquedaMunicipio = ' y municipio de ' + objMunicipio.Municipio;

  //   this._cadenaBusqueda = this._cadenaBusquedaEstado + this._cadenaBusquedaMunicipio;

  //   this._asentamientosService.getAsentamientos(objMunicipio.Id_Estado, objMunicipio.Id_Municipio).subscribe(
  //     (data) => {
  //       //Next callback
  //       // console.log('datos: ', data);

  //       this._asentamientos = data;

  //       this._cargandoAsentamientos = false;

  //     },
  //     (error: HttpErrorResponse) => {

  //       this._cargandoAsentamientos = false;

  //       switch (error.status) {
  //         case 401:
  //           //console.log('error 401');
  //           break;
  //         case 403:
  //           //console.log('error 403');
  //           break;
  //         case 404:
  //           //console.log('error 404');
  //           break;
  //         case 409:
  //           //console.log('error 409');
  //           break;
  //       }

  //       //throw error;   //You can also throw the error to a global error handler
  //     }
  //   );
  // }

  // verModal(){
  //   //this.modalUbicacion.nativeElement.click();
  //   this.limpiarBusqueda();
  // }

  // limpiarBusqueda(){
  //   this._cadenaBusqueda = '';
  //   this._cadenaBusquedaEstado = '';
  //   this._cadenaBusquedaMunicipio = '';
  //   this._cadenaBusquedaAsentamiento = '';
  //   this._municipios = [];
  //   this._asentamientos = [];
    
  //   this.formaUbicacion.reset({
  //     estado       : '',
  //     municipio    : '',
  //     asentamiento : ''
  //   });
  // }

  // seleccionarAsentamiento(objAsentamiento : asentamiento){

  //   objAsentamiento.Seleccionado = !objAsentamiento.Seleccionado;

  //   let asentamientos = '';
  //   let asentamientosSeleccionados = false;

  //   this._asentamientos.forEach(item => {
  //     if (item.Seleccionado === true)
  //       asentamientos += item.Asentamiento + ' o ';
  //   });

  //   this.formaUbicacion.patchValue({
  //     asentamiento : asentamientos
  //   });

  //   if (asentamientos.length > 0)
  //     this._cadenaBusquedaAsentamiento = ' en la colonia de ' + asentamientos.substring(0,asentamientos.length-3);
  //   else
  //   this._cadenaBusquedaAsentamiento = '';

  //   this._cadenaBusqueda = this._cadenaBusquedaEstado + this._cadenaBusquedaMunicipio + this._cadenaBusquedaAsentamiento;

  // }

  ejecutarConsulta(){
    debugger;
    //this.router.navigateByUrl('/' +  + this._filtrosSinPagina + '-' + this._cadenaBusqueda.replaceAll(' ','-'));
  }

}
