import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { estatus } from 'src/app/Models/catalogos/estatus.model';
import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { EstatusService } from '../../../Services/Catalogos/estatus.service';
import { publicacion, publicacionInfoMini } from 'src/app/Models/procesos/publicacion.model';
import { PublicacionesService } from '../../../Services/Procesos/publicaciones.service';
import { LoginService } from '../../../Services/Catalogos/login.service';

@Component({
  selector: 'app-misanuncios',
  templateUrl: './misanuncios.component.html',
  styleUrls: ['./misanuncios.component.css']
})
export class MisanunciosComponent implements OnInit {
  _publicaciones : publicacionInfoMini[] = [];
  _listaEstatus : estatus[] = [];
  _estatus : estatus = new estatus(0,0,'','',new Date(), new Date());

  _paginadoDetalle : paginadoDetalle = new paginadoDetalle(0,0);
  _paginas: pagina[] = [];
  _numeroPaginasMostrar = 5;
  _paginaActual = 0;
  _paginaInicial = 0;
  _paginaFinal = 4;
  _mostrarPaginaAnterior = true;
  _mostrarPaginaSiguiente = true;
  _seRealizaBusqueda = false;

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
    // this.obtenerPublicaciones();

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
    setTimeout( () => { this.router.navigateByUrl('/publicar/operacion-tipo-inmueble'); }, 500 );
  }

  buscarPublicaciones(){
    //debugger;
    // this._publicacionesService.getPublicacionesMini(this._loginService.obtenerIdCliente(),0,10,'').subscribe(
    //   (data) => {
    //     //Next callback
    //     console.log('data',data);

    //     this._publicaciones = data;

    //   },
    //   (error: HttpErrorResponse) => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: error.error['Descripcion'],
    //       text: '',
    //       showCancelButton: false,
    //       showDenyButton: false,
    //     });

    //     switch (error.status) {
    //       case 401:
    //         break;
    //       case 403:
    //         break;
    //       case 404:
    //         break;
    //       case 409:
    //         break;
    //     }

    //     //throw error;   //You can also throw the error to a global error handler
    //   }
    // );


    if (this.formaBusqueda.invalid) {
      return Object.values(this.formaBusqueda.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    } else {

      this._publicacionesService.getPublicacionesMini(this._loginService.obtenerIdCliente(),0,10,'').subscribe(
        (data) => {
          //Next callback
  
          this._publicaciones = data;
  
          if (data.length > 0) {
            this._seRealizaBusqueda = true;
          }

          // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
          this._publicacionesService.getPublicacionesMiniPagDet(this._loginService.obtenerIdCliente(), 10, '').subscribe(
            (data) => {
              //Next callback
              console.log(data);
              this._paginadoDetalle = data;

              this.CargarPaginador(0);
      
            },
            (error: HttpErrorResponse) => {
              
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

  CargarPaginador(paginaActual : number){
    // this._paginadoDetalle;
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
    this.obtenerPagina(this._paginaActual - 1);
  }

  obtenerPaginaSiguiente(){
    this.obtenerPagina(this._paginaActual + 1);
  }

  obtenerPagina(item : number){
    // alert(item);

    this._publicacionesService.getPublicacionesMini(this._loginService.obtenerIdCliente(), item, 10, '').subscribe(
      (data) => {
        //Next callback

        this._publicaciones = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        this.CargarPaginador(item);

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
