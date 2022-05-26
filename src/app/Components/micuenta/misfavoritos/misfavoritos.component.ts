import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { LoginService } from '../../../Services/Catalogos/login.service';
import { FavoritosClienteService } from '../../../Services/Procesos/misFavoritos.service';
import { favoritoCliente } from '../../../Models/procesos/favoritoCliente.model';

@Component({
  selector: 'app-misfavoritos',
  templateUrl: './misfavoritos.component.html',
  styleUrls: ['./misfavoritos.component.css']
})
export class MisfavoritosComponent implements OnInit {
  _favoritosCliente : favoritoCliente[] = [];
  //_misFavoritos : string = 'misFavoritos';

  _paginadoDetalle : paginadoDetalle = new paginadoDetalle(0,0);
  _paginas: pagina[] = [];
  _numeroPaginasMostrar = 5;
  _paginaActual = 0;
  _paginaInicial = 0;
  _paginaFinal = 4;
  _mostrarPaginaAnterior = true;
  _mostrarPaginaSiguiente = true;
  _seRealizaBusqueda = false;

  constructor(  private router: Router,
                private _favoritosClienteServide : FavoritosClienteService,
                private _loginService : LoginService
  ) {

    this.obtenerMisFavoritos();
    //this.obtenerImagenesPublicaciones();
  }

  ngOnInit(): void {
  }

  agregarAnuncio(){
    setTimeout( () => { this.router.navigateByUrl('/publicar/operacion-tipo-inmueble'); }, 500 );
  }

  obtenerMisFavoritos(){
    this._favoritosClienteServide.getFavoritosCliente(this._loginService.obtenerIdCliente(),0,10).subscribe(
      (data) => {
        //Next callback

        this._favoritosCliente = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
        this._favoritosClienteServide.getFavoritosClienteResumen(this._loginService.obtenerIdCliente(), 10).subscribe(
          (data) => {
            //Next callback
            //console.log('getFavoritosClienteResumen', data);
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
          }
        );

      },
      (error: HttpErrorResponse) => {
        //Error callback
        
        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            this._favoritosCliente = [];
            this._paginadoDetalle = new paginadoDetalle(0,0);
            this._seRealizaBusqueda = false;
            break;
          case 409:
            break;
        }
      }
    );
  }

  actualizarBusqueda(){
    this.obtenerMisFavoritos();  
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
      //console.log('Configuracion 1');
    }
    else if(paginaActual > 0 && this._paginaFinal < this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = true;
      this._mostrarPaginaSiguiente = true;
      //console.log('Configuracion 2');
    }
    else if(paginaActual >= 0 && this._paginaFinal < this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = false;
      this._mostrarPaginaSiguiente = true;
      //console.log('Configuracion 3');
    }
    else if(paginaActual > 0 && this._paginaFinal == this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = true;
      this._mostrarPaginaSiguiente = false;
      //console.log('Configuracion 4');
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

    this._favoritosClienteServide.getFavoritosCliente(this._loginService.obtenerIdCliente(), item, 10).subscribe(
      (data) => {
        //Next callback

        this._favoritosCliente = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        this.CargarPaginador(item);

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

}