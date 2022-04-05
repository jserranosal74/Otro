import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/Catalogos/login.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuarioAutenticado : boolean = false;
  usuarioRol : string = '';

  constructor( private _loginService : LoginService,
               private _router : Router) {
    // console.log('this.usuarioAutenticado', this.usuarioAutenticado);
    this.usuarioAutenticado = this._loginService.estaAutenticado();
    this.usuarioRol = this._loginService.obtenerRolUsuario();
    // console.log('this.usuarioAutenticado', this.usuarioAutenticado);
   }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this._loginService.cerarSesion();
    //this._router.navigate(['/inicio'])
    //window.location.href = '/inicio';
  }

}
