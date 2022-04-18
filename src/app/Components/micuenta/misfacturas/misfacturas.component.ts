import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';
import { plancliente } from '../../../Models/procesos/plancliente.model';
import { LoginService } from '../../../Services/Catalogos/login.service';

@Component({
  selector: 'app-misfacturas',
  templateUrl: './misfacturas.component.html',
  styleUrls: ['./misfacturas.component.css']
})
export class MisfacturasComponent implements OnInit {
  _facturasCliente : plancliente[] = [];

  constructor( private _clienteService: ClientesService,
               private _loginService : LoginService ) { }

  ngOnInit(): void {
  }

  obtenerDetalleFactura(objfacturaCliente : plancliente) {
    let Id_Usuario = this._loginService.obtenerIdCliente();

    this._clienteService.getCliente(Id_Usuario).subscribe(
      (data) => {
        //Next callback
        console.log('datos: ', data);

        // this.formaPerfil.setValue({
        //   nombre: data.Nombre,
        //   apellidos: data.Apellidos,
        //   correo: data.Email,
        //   rfc: data.RFC,
        //   telefono: data.Nombre,
        // });

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: '',
          showCancelButton: false,
          showDenyButton: false,
        });

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

}
