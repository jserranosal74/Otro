import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from '../Services/Catalogos/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _loginService : LoginService,
              private _router : Router){
    //console.log('entro al AuthGuard');
  }

  canActivate(  ): boolean {
      if (this._loginService.estaAutenticado()){
        return true;
      }
      else{
        this._router.navigateByUrl('/login');
        return false;
      }
  }
  
}
