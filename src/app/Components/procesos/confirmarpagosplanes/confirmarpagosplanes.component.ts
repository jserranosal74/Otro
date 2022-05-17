import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from '../../../Services/Catalogos/login.service';
import { planClientePagos } from '../../../Models/procesos/plancliente.model';
import { PlanesClientesPagosService } from 'src/app/Services/Procesos/planesClientesPagos.service';

@Component({
  selector: 'app-confirmarpagosplanes',
  templateUrl: './confirmarpagosplanes.component.html',
  styleUrls: ['./confirmarpagosplanes.component.css']
})
export class ConfirmarPagosPlanesComponent implements OnInit {
  _planesClientes : planClientePagos[] = [];
  _planCliente : planClientePagos = new planClientePagos(0,0,0,0,'',0,'','','',new Date(),new Date(),'',0,'');

  constructor(  private fb: FormBuilder,
                private _loginService : LoginService,
                private _planesClienteService : PlanesClientesPagosService,
  ) {

    this.obtenerPlanesClientes();
  }

  ngOnInit(): void {
    // this.limpiarFormulario();
  }

  obtenerPlanesClientes() {

    this._planesClienteService.getPlanesClientesPagos().subscribe(
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


  confirmarDesconfirmarPago(objPlanClientePago : planClientePagos ){

    this._planesClienteService.putPlanClientePadado(objPlanClientePago.Id_PlanCliente, objPlanClientePago.Id_Plan, objPlanClientePago.Id_Cliente).subscribe(
      (data) => {

        Swal.fire({
          icon: 'success',
          title: 'La información del pago se actualizo de manera correcta.',
          showConfirmButton: false,
          timer: 1000
        })



        this.obtenerPlanesClientes();

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