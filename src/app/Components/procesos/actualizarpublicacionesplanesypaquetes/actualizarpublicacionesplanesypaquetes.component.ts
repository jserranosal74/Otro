import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';

import { PublicacionesService } from '../../../Services/Procesos/publicaciones.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-actualizarpublicacionesplanesypaquetes',
  templateUrl: './actualizarpublicacionesplanesypaquetes.component.html',
  styleUrls: ['./actualizarpublicacionesplanesypaquetes.component.css']
})
export class ActualizarPublicacionesPlanesYPaquetesComponent implements OnInit {

  constructor(  private _paquetesService: PublicacionesService,
                private _loginService : LoginService,
  ) {

  }

  ngOnInit(): void {
  }

  actualizarEstatusPublicaciones(){

    this._paquetesService.postPublicacionActualizarEstatus().subscribe(
      (data) => {

        Swal.fire({
          icon: 'success',
          title: 'Se actualizaron ' + data + ' anuncios a vencidos de manera correcta.',
          text: '',
          showCancelButton: false,
          showDenyButton: false,
        });

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
            return throwError(() => new Error)
          case 404:
            return throwError(() => new Error)
          case 409:
            return throwError(() => new Error)
        }
        return throwError(() => new Error)
      }
    );
  }

  // actualizarEstatusPlanesYPaquetes(){

  //   this._planesClienteService.postPlanesYPaquetesActualizar().subscribe(
  //     (data) => {
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: 'top-end',
  //         showConfirmButton: false,
  //         timer: 2000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.addEventListener('mouseenter', Swal.stopTimer)
  //           toast.addEventListener('mouseleave', Swal.resumeTimer)
  //         }
  //       });

  //       Toast.fire({
  //         icon: 'success',
  //         title: 'Planes y paquetes actualizados.'
  //       });

  //     },
  //     (error: HttpErrorResponse) => {
  //       switch (error.status) {
  //         case 401:
  //           break;
  //         case 403:
  //           break;
  //         case 404:
  //           break;
  //         case 409:
  //           break;
  //       }

  //     }
  //   );
  // }

}