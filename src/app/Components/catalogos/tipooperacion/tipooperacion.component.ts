import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { TiposOperacionService } from 'src/app/Services/Catalogos/tiposOperacion.service';
import Swal from 'sweetalert2';
import { tipoOperacion } from '../../../Models/catalogos/tipoOperacion.model';

@Component({
  selector: 'app-tipooperacion',
  templateUrl: './tipooperacion.component.html',
  styleUrls: ['./tipooperacion.component.css']
})
export class TipooperacionComponent implements OnInit {
  _tiposOperacion : tipoOperacion[] = [];

  constructor(
    private _tiposOperacionService: TiposOperacionService,
    private _loginService : LoginService,
  ) {
    this.obtenerAmenidades();
  }

  ngOnInit(): void {

  }

  obtenerAmenidades() {
    let Id_Usuario = this._loginService.obtenerIdCliente();

    this._tiposOperacionService.getTiposOperacion().subscribe(
      (data) => {

        this._tiposOperacion = data;

      },
      (error: HttpErrorResponse) => {

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: 'Error al cargar los tipos de operacion.',
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