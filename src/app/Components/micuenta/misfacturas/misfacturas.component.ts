import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { LoginService } from '../../../Services/Catalogos/login.service';
import { factura } from 'src/app/Models/catalogos/factura.model';
import { ClientesFacturasService } from 'src/app/Services/Procesos/clientesFacturas.service';

@Component({
  selector: 'app-misfacturas',
  templateUrl: './misfacturas.component.html',
  styleUrls: ['./misfacturas.component.css']
})
export class MisfacturasComponent implements OnInit {
  _facturasCliente : factura[] = [];

  constructor( private _clientesFacturasService : ClientesFacturasService,
               private _loginService : LoginService ) { 

  this.ObtenerFacturasCliente();
  }

  ngOnInit(): void {
  }

  ObtenerFacturasCliente() {

    this._clientesFacturasService.getClienteFacturas(this._loginService.obtenerIdCliente(), null, null, null).subscribe(
      (data) => {
        console.log('datos: ', data);
        this._facturasCliente = data;
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

  enviarFacturaCliente(objFactura : factura){
    objFactura.Enviando = true;
    this._clientesFacturasService.getEnviarFactura(this._loginService.obtenerIdCliente(), objFactura.Id_PlanCliente, objFactura.Id_PaqueteCliente).subscribe(
      (data) => {
        //console.log('datos: ', data);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
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

        objFactura.Enviando = false;
      },
      (error: HttpErrorResponse) => {
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

}
