import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { tipoPropiedad } from 'src/app/Models/catalogos/tipoPropiedad.model';
import { TiposPropiedadService } from 'src/app/Services/Catalogos/tiposPropiedades.service';

// import { SocialAuthService } from "angularx-social-login";
// import { SocialUser } from "angularx-social-login";

import { LoginService } from '../../Services/Catalogos/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuarioAutenticado : boolean = false;
  usuarioRol : string = '';
  _nombreUsuario : string = '';
  _urlFotoPerfil : string = '';
  _modoObscuro : boolean;

  _tiposPropiedad : tipoPropiedad[] = [];

  @Output() _seCambiaModo = new EventEmitter<boolean>();

  constructor( private _loginService : LoginService,
               private _tiposPropiedadService : TiposPropiedadService ) {

    this.usuarioAutenticado = this._loginService.estaAutenticado();
    this.usuarioRol = this._loginService.obtenerRolUsuario();
    this._nombreUsuario = this._loginService.obtenerNombreCliente();
    this._urlFotoPerfil = this._loginService.obtenerUrlFotoCliente();
    this._modoObscuro = ( localStorage.getItem('mo') === "true" ? true : false );

    this.ObtenerTiposPropiedad();

   }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this._loginService.cerarSesion();
  }

  cambiarModo(){
    this._modoObscuro = !this._modoObscuro;
    localStorage.setItem('mo', this._modoObscuro.toString())
    this._seCambiaModo.emit(this._modoObscuro);
  }

  ObtenerTiposPropiedad() {

    this._tiposPropiedadService.getTiposPropiedades().subscribe(
      (data) => {
        
        // Solo se muestran las primeras 8 opciones en el menu
        for (let index = 0; index <= 7; index++) {
          this._tiposPropiedad.push(data[index]);
        }

      },
      (error: HttpErrorResponse) => {
        //Error callback

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

      }
    );
  }

}
