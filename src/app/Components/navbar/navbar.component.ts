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

  constructor( private _login : LoginService,
               private _router : Router) {
    console.log('this.usuarioAutenticado', this.usuarioAutenticado);
    this.usuarioAutenticado = this._login.estaAutenticado();
    console.log('this.usuarioAutenticado', this.usuarioAutenticado);
   }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this._login.cerarSesion();
    this._router.navigate(['/inicio'])
  }

}
