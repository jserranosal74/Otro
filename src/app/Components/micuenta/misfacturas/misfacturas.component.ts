import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { LoginService } from '../../../Services/Catalogos/login.service';
import { factura } from 'src/app/Models/catalogos/factura.model';
import { ClientesFacturasService } from 'src/app/Services/Procesos/clientesFacturas.service';
import { Anio, facturasClienteFiltros, Mes, verFiltros } from 'src/app/Models/procesos/facturasClienteFiltros.model';
import { FacturasClienteFiltrosService } from '../../../Services/Procesos/facturasClienteFiltros.service';

@Component({
  selector: 'app-misfacturas',
  templateUrl: './misfacturas.component.html',
  styleUrls: ['./misfacturas.component.css']
})
export class MisFacturasComponent implements OnInit {
  _facturasCliente : factura[] = [];
  _mostrarFiltros : boolean = sessionStorage.getItem('mf') === '1'? true : false;
  _cargandoInformacion : boolean = false;

  _facturasFiltros : facturasClienteFiltros = new facturasClienteFiltros([],[]);
  _verFiltros : verFiltros = new verFiltros(true,true);
  _filtrosSeleccionados : facturasClienteFiltros = new facturasClienteFiltros([],[]);

  _collapseFiltros = false;
  _colapseAnio = false;
  _colapseMes = false;

  @ViewChild('myColapseFiltro1') colapseFiltro1 : any;
  @ViewChild('myColapseFiltro2') colapseFiltro2 : any;

  constructor( private _clientesFacturasService : ClientesFacturasService,
               private _facturasClienteFiltrosService : FacturasClienteFiltrosService,
               private _loginService : LoginService ) { 
    this._cargandoInformacion = true;
    this.ObtenerFacturasCliente();
    this.obtenerFiltrosFacturas(null,null);
    this._mostrarFiltros = sessionStorage.getItem('mf') === '1'? true : false;
  }

  ngOnInit(): void {
  }

  ObtenerFacturasCliente() {
    debugger;
    this._clientesFacturasService.getClienteFacturas(this._loginService.obtenerIdCliente()!, null, null, null, null).subscribe(
      (data) => {

        if (data === null){
          this._facturasCliente = [];
        }
        else{
          this._facturasCliente = data;
        }
        
      },
      (error: HttpErrorResponse) => {

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
  }

  enviarFacturaCliente(objFactura : factura){
    debugger;
    objFactura.Enviando = true;
    this._clientesFacturasService.getEnviarFactura(this._loginService.obtenerIdCliente()!, objFactura.Id_PlanCliente, objFactura.Id_PaqueteCliente).subscribe(
      (data) => {
        //console.log('datos: ', data);
        if (data === 1){
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
            title: 'La información se envió a su correo de manera correcta.'
          });
        }
        else if (data === 0){
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
            icon: 'error',
            title: 'Ocurrio un error al intentar enviar su factura, intentelo más tarde.'
          });
        }

        objFactura.Enviando = false;
      },
      (error: HttpErrorResponse) => {

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
          icon: 'error',
          title: 'Ocurrio un error al intentar enviar su factura, intentelo más tarde.'
        });

        objFactura.Enviando = false;

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

  obtenerFiltrosFacturas(filtroSeleccionado : string | null, strAgregarQuitar : string | null){
    debugger;

    if (strAgregarQuitar === 'Agregar'){
      switch (filtroSeleccionado) {
        case 'Anio':
            this._verFiltros.Anio = false;
          break;
        case 'Mes':
            this._verFiltros.Mes = false;
          break;
        default:
          break;
      }
    }
    else {
      switch (filtroSeleccionado) {
        case null:
            this._verFiltros = new verFiltros(true,true);
          break;
        case 'Anio':
            this._verFiltros.Anio = true;
          break;
        case 'Mes':
            this._verFiltros.Mes = true;
          break;
        default:
          break;
      }
    }

    this._facturasClienteFiltrosService.getFacturasClienteFiltros(this._loginService.obtenerIdCliente()!, this._filtrosSeleccionados.lstAnios[0] === undefined ? null : this._filtrosSeleccionados.lstAnios[0].Id_Anio, 
                                                                                                          this._filtrosSeleccionados.lstMeses[0] === undefined ? null : this._filtrosSeleccionados.lstMeses[0].Id_Mes).subscribe(
      (data) => {
        //Next callback
        // this._opcionSeleccionada = 'Pausada';
        this._facturasFiltros = data;

        this._cargandoInformacion = false;
        
      },
      (error: HttpErrorResponse) => {

        this._cargandoInformacion = false;

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

  seleccionarFiltroAnio(objAnio : Anio){

    this._filtrosSeleccionados.lstAnios.push(objAnio);

    this._facturasFiltros.lstAnios.forEach((item,index) => {
      if (item.Id_Anio === objAnio.Id_Anio){
        this._facturasFiltros.lstAnios.splice(index,1); 
      }
    });

    
    this.ejecutarConsulta(0);
    this.obtenerFiltrosFacturas('Anio','Agregar');
    
  }

  seleccionarFiltroMes(objMes : Mes){

    this._filtrosSeleccionados.lstMeses.push(objMes);

    this._facturasFiltros.lstMeses.forEach((item,index) => {
      if (item.Id_Mes === objMes.Id_Mes){
        this._facturasFiltros.lstMeses.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosFacturas('Mes','Agregar');
  }

  ejecutarConsulta(numPagina : number){
    debugger;
    this._clientesFacturasService.getClienteFacturas(this._loginService.obtenerIdCliente()!, null, null, this._filtrosSeleccionados.lstAnios[0] === undefined ? null : this._filtrosSeleccionados.lstAnios[0].Id_Anio, 
                                                                                                        this._filtrosSeleccionados.lstMeses[0] === undefined ? null : this._filtrosSeleccionados.lstMeses[0].Id_Mes).subscribe(
      (data) => {
        //Next callback
        //console.log('getPublicacionesMini', data);
        this._facturasCliente = data;

      },
      (error: HttpErrorResponse) => {
        //Error callback
        
        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            this._facturasCliente = [];
            break;
          case 409:
            break;
        }

      }
    );
  }

  removerFiltroAnio(objAnio : Anio){
    // this._facturasFiltros.lstEstatus.push(objAnio);

    this._filtrosSeleccionados.lstAnios.forEach((item,index) => {
      if (item.Id_Anio === objAnio.Id_Anio){
        this._filtrosSeleccionados.lstAnios.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosFacturas('Anio','Quitar');

  }

  removerFiltroMes(objMes : Mes){
    this._facturasFiltros.lstMeses.push(objMes);

    this._filtrosSeleccionados.lstMeses.forEach((item,index) => {
      if (item.Id_Mes === objMes.Id_Mes){
        this._filtrosSeleccionados.lstMeses.splice(index,1); 
      }
    });

    this.ejecutarConsulta(0);
    this.obtenerFiltrosFacturas('Mes','Quitar');

  }

  colapseAnio(){
    this._colapseAnio = !this._colapseAnio;
  }

  colapseMes(){
    this._colapseMes = !this._colapseMes;
  }

  colapsarFiltros(){
    debugger;
    this._collapseFiltros = !this._collapseFiltros;

    if (this._collapseFiltros){
      if (!this._colapseAnio)
        this.colapseFiltro1.nativeElement.click();
      if (!this._colapseMes)
        this.colapseFiltro2.nativeElement.click();
    }
    else{
      if (this._colapseAnio)
        this.colapseFiltro1.nativeElement.click();
      if (this._colapseMes)
        this.colapseFiltro2.nativeElement.click();
    }
    
  }

  eliminarFiltros(){

    this._filtrosSeleccionados = new facturasClienteFiltros([],[]);

    this.ejecutarConsulta(0);
    this.obtenerFiltrosFacturas(null,null);

  }

}
