import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { estatus } from 'src/app/Models/catalogos/estatus.model';
import { paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { EstatusService } from '../../../Services/Catalogos/estatus.service';
import { publicacion } from 'src/app/Models/procesos/publicacion.model';
import { PublicacionesService } from '../../../Services/Procesos/publicaciones.service';
import { LoginService } from '../../../Services/Catalogos/login.service';

@Component({
  selector: 'app-misanuncios',
  templateUrl: './misanuncios.component.html',
  styleUrls: ['./misanuncios.component.css']
})
export class MisanunciosComponent implements OnInit {
  _publicaciones : publicacion[] = [];
  _listaEstatus : estatus[] = [];
  _estatus : estatus = new estatus(0,0,'','',new Date(), new Date());
  _paginadoDetalle : paginadoDetalle = new paginadoDetalle(0,0);
  // _opcionSeleccionada : string = 'Pausada';

  formaBusqueda =  this.fb.group({
    Id_Estado : [ '' ],
    Id_Municipio : [ '' ],
    Id_Asentamiento : [ '' ],
    Id_TipoPropiedad : [ '' ],
    Id_TipoOperacion : [ '' ],
    Id_Estatus : [ '' ],
    FechaPublicacion : [ '' ],
  });

  constructor(  private _activatedRoute: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private _publicacionesService : PublicacionesService,
                private _loginService : LoginService,
                private _estatusService : EstatusService
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerEstatusPublicacion();
    this.obtenerPublicaciones();

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

  agregarAnuncio(){
    setTimeout( () => { this.router.navigateByUrl('/publicar/operaciontipoinmueble'); }, 500 );
  }

  obtenerPublicaciones(){
    debugger;
    this._publicacionesService.getPublicaciones(this._loginService.obtenerIdCliente()).subscribe(
      (data) => {
        //Next callback
        console.log('data',data);

        this._publicaciones = data;

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

}
