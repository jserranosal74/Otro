import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/Catalogos/login.service';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.css']
})
export class SalirComponent implements OnInit {

  constructor( private _loginService : LoginService ) { 
    this._loginService.cerarSesion();
  }

  ngOnInit(): void {
  }

}
