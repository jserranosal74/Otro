import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  _modoObscuro : boolean;
  // _userSocial = new SocialUser();
  // _loggedIn : boolean = false;

  @Output() _seCambiaModo = new EventEmitter<boolean>();

  constructor( private _loginService : LoginService,
               //private authService: SocialAuthService,
               private _router : Router) {

    this.usuarioAutenticado = this._loginService.estaAutenticado();
    this.usuarioRol = this._loginService.obtenerRolUsuario();
    this._nombreUsuario = this._loginService.obtenerNombreCliente();
    this._modoObscuro = ( localStorage.getItem('mo') === "true" ? true : false );
   }

  ngOnInit(): void {
    // this.authService.authState.subscribe((user) => {
    //   this._userSocial = user;
    //   this._loggedIn = (user != null);
    //   console.log(this._userSocial);
    // });
  }

  cerrarSesion(){
    this._loginService.cerarSesion();
  }

  cambiarModo(){
    this._modoObscuro = !this._modoObscuro;
    localStorage.setItem('mo', this._modoObscuro.toString())
    this._seCambiaModo.emit(this._modoObscuro);
  }

}
