import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';

import { estatus } from 'src/app/Models/catalogos/estatus.model';
import { EstatusService } from '../../../Services/Catalogos/estatus.service';
import { publicacionVistaBloquear } from 'src/app/Models/procesos/publicacionBloquear.model';
import { PublicacionesService } from '../../../Services/Procesos/publicaciones.service';
import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';

@Component({
  selector: 'app-bloquearpublicacion',
  templateUrl: './bloquearpublicacion.component.html',
  styleUrls: ['./bloquearpublicacion.component.css']
})
export class BloquearPublicacionComponent implements OnInit {
  formaBusqueda = this.fb.group({});

  _estatusPublicacion : estatus[] = [];
  _publicacionVistaBloquear : publicacionVistaBloquear[] = [];
  //_reportadasFraude : boolean = false;

    // Paginador
    _paginadoDetalle : paginadoDetalle = new paginadoDetalle(0,0);
    _paginas: pagina[] = [];
    _numeroPaginasMostrar = 5;
    _paginaActual = 0;
    _paginaInicial = 0;
    _paginaFinal = 4;
    _mostrarPaginaAnterior = true;
    _mostrarPaginaSiguiente = true;
    _seRealizaBusqueda = false;

  constructor(  private fb: FormBuilder,
                private _estatusService: EstatusService,
                private _publicacionesService : PublicacionesService,
                private _loginService : LoginService
  ) {

    this.crearFormulario();
    this.obtenerEstatus();
    this.ejecutarConsulta(0);
    this.CargarDetallePaginador();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaBusqueda = this.fb.group({
      email   : '',
      estatus : '13',
      fraude  : '1'
    });
  }

  limpiarFormulario() {
    this.formaBusqueda.reset({
      email   : '',
      estatus : '13',
      fraude  : '1'
    });
  }

  obtenerEstatus() {

    this._estatusService.getEstatusProceso('Publicacion').subscribe(
      (data) => {

        this._estatusPublicacion = data;

      },
      (error: HttpErrorResponse) => {
        //Error callback

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            Swal.fire({
              icon: 'error',
              title: 'No hay usuarios dados de alta.',
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
            break;
          case 409:
            break;
        }

      }
    );
  }

  bloquearPublicacionCliente(objPublucacion : publicacionVistaBloquear){

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea bloquear la publicación: "' + objPublucacion.Id_Publicacion + '-' + objPublucacion.TituloPublicacion  + '"?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1',
        confirmButton: 'order-3',
        denyButton: 'order-2',
      },
      backdrop: ` rgba(128,128,128,0.4)
                  left top
                  no-repeat
                `
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this._publicacionesService.putPublicacionEstatusActualizar(objPublucacion.Id_Publicacion, objPublucacion.Id_Cliente, 9).subscribe(
          (data) => {
            //Next callback
            
            Swal.fire({
              icon: 'success',
              title: 'La publicación fue bloqueada de manera satisfactoria.',
              showConfirmButton: false,
              timer: 1500
            })

          },
          (error: HttpErrorResponse) => {
            //Error callback

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

        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  CargarDetallePaginador(){
    debugger;

    let email : string | null;
    let id_Estatus : number | null;
    let Id_Indicador_Fraude : number | null;

    if (this.formaBusqueda.get('estatus')?.value === '')
      id_Estatus = null;
    else
      id_Estatus = this.formaBusqueda.get('estatus')?.value;

    if (this.formaBusqueda.get('email')?.value === '')
      email = null;
    else
      email = this.formaBusqueda.get('email')?.value;

    if (this.formaBusqueda.get('fraude')?.value)
      Id_Indicador_Fraude = 15;
    else
      Id_Indicador_Fraude = null;

    // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
    this._publicacionesService.getPublicacionesClienteEstatusPagDet(email, id_Estatus, Id_Indicador_Fraude, 10).subscribe(
        (data) => {
        //Next callback
        //console.log('getPublicacionesClienteEstatusPagDet',data);
        this._paginadoDetalle = data;

        this.CargarPaginador(0);

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

  ejecutarConsulta(numPagina : number){
    
    let email : string | null;
    let id_Estatus : number | null;
    let Id_Indicador_Fraude : number | null;

    if (this.formaBusqueda.get('estatus')?.value === '')
      id_Estatus = null;
    else
      id_Estatus = this.formaBusqueda.get('estatus')?.value;

    if (this.formaBusqueda.get('email')?.value === '')
      email = null;
    else
      email = this.formaBusqueda.get('email')?.value;

    if (this.formaBusqueda.get('fraude')?.value)
      Id_Indicador_Fraude = 15;
    else
      Id_Indicador_Fraude = null;

    this._publicacionesService.getPublicacionesClienteEstatus(email, id_Estatus, Id_Indicador_Fraude, numPagina, 10).subscribe(
      (data) => {
        //Next callback

        this._publicacionVistaBloquear = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        if(numPagina === 0)
          this.CargarDetallePaginador();
        else
          this.CargarPaginador(numPagina);

      },
      (error: HttpErrorResponse) => {
        //Error callback
        
        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            this._publicacionVistaBloquear = [];
            break;
          case 409:
            break;
        }
      }
    );
  }

  CargarPaginador(paginaActual : number){
    //debugger;
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
    this.ejecutarConsulta(this._paginaActual - 1);
  }

  obtenerPaginaSiguiente(){
    this.ejecutarConsulta(this._paginaActual + 1);
  }

  get emailNoValido() {
    return ( this.formaBusqueda.get('email')?.invalid && this.formaBusqueda.get('email')?.touched );
  }

  get descripcionNoValido() {
    return ( this.formaBusqueda.get('estatus')?.invalid && this.formaBusqueda.get('estatus')?.touched );
  }

}