import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from '../../../Services/Catalogos/login.service';
import { planesPaquetesPagos } from '../../../Models/procesos/plancliente.model';
import { PlanesClientesPagosService } from 'src/app/Services/Procesos/planesClientesPagos.service';
import { EstatusService } from 'src/app/Services/Catalogos/estatus.service';
import { estatus } from 'src/app/Models/catalogos/estatus.model';
import { PaquetesClientesPagosService } from 'src/app/Services/Procesos/paquetesClientesPagos.service';

@Component({
  selector: 'app-confirmarpagosplanes',
  templateUrl: './confirmarpagosplanes.component.html',
  styleUrls: ['./confirmarpagosplanes.component.css']
})
export class ConfirmarPagosPlanesComponent implements OnInit {
  formaBusqueda = this.fb.group({});

  _planesClientes : planesPaquetesPagos[] = [];
  _estatusPlanesClientes : estatus[] = [];
  _planCliente! : planesPaquetesPagos;
  _confirmando : boolean = false;
  _estatusSeleccionado : string = '';

  constructor( private fb: FormBuilder,
               private _loginService : LoginService,
               private _planesClienteService : PlanesClientesPagosService,
               private _paquetesClienteService : PaquetesClientesPagosService,
               private _estatusService : EstatusService,
  ) {

    this.crearFormularioBusquda();
    this.obtenerPlanesYPaquetesClientes();
    this.obtenerEstatusPlanesYPaquetes();
  }

  ngOnInit(): void {
    // this.limpiarFormulario();
  }

  crearFormularioBusquda() {
    this.formaBusqueda = this.fb.group({
      estatusPlanCliente : [15],        // por default en espera de pago
      emailCliente       : [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ]
    });
  }

  obtenerPlanesYPaquetesClientes() {
    this._planesClienteService.getPlanesClientesFiltro(this.formaBusqueda.get('emailCliente')?.value, this.formaBusqueda.get('estatusPlanCliente')!.value).subscribe(
      (data) => {
        //Next callback
        //console.log('data',data);
        this._planesClientes = data;

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

  obtenerEstatusPlanesYPaquetes() {
    this._estatusService.getEstatusProceso('PlanCliente').subscribe(
      (data) => {
        //Next callback
        this._estatusPlanesClientes = data;
        this._estatusSeleccionado = '15';
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

  estatusSeleccionado(){
    //debugger;
    this._estatusSeleccionado = this.formaBusqueda.controls['estatusPlanCliente'].value;
    this._planesClientes = [];
  }

  confirmarDesconfirmarPago(objPlanClientePago : planesPaquetesPagos ){

    if(objPlanClientePago.Id_Estatus != 15){
      Swal.fire({
        icon: 'error',
        title: 'El plan ' + objPlanClientePago.Id_PlanCliente + ' ya se encuentra confirmado.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    objPlanClientePago.Confirmando = true;

    debugger;

    if (objPlanClientePago.Id_Paquete === 0){
      this._planesClienteService.putPlanClientePadado(objPlanClientePago.Id_PlanCliente, objPlanClientePago.Id_Plan, objPlanClientePago.UID_Cliente).subscribe(
        (data) => {
          objPlanClientePago.Confirmando = false;
          Swal.fire({
            icon: 'success',
            title: 'El pago del plan ha sido confirmado.',
            showConfirmButton: false,
            timer: 1500
          })
  
          this.obtenerPlanesYPaquetesClientes();
  
        },
        (error: HttpErrorResponse) => {
          //Error callback
          objPlanClientePago.Confirmando = false;
  
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: '',
            showCancelButton: false,
            showDenyButton: false,
          });
  
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
    }
    else{
      this._paquetesClienteService.putPaquetesClientePagado(objPlanClientePago.Id_Paquete, objPlanClientePago.Id_Cliente).subscribe(
        (data) => {
          objPlanClientePago.Confirmando = false;
          Swal.fire({
            icon: 'success',
            title: 'El pago del paquete ha sido confirmado.',
            showConfirmButton: false,
            timer: 1500
          })
  
          this.obtenerPlanesYPaquetesClientes();
  
        },
        (error: HttpErrorResponse) => {
          //Error callback
          //console.log('Error del servicio: ', error.error['Descripcion']);
  
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: '',
            showCancelButton: false,
            showDenyButton: false,
          });
  
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
              //console.log('error 403');
              break;
            case 404:
              //console.log('error 404');
              break;
            case 409:
              //console.log('error 409');
              break;
          }
  
        }
      );
    }

    
  }

}