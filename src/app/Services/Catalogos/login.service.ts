import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { login } from 'src/app/Models/Auxiliares/login.model';
import { Router } from '@angular/router';
import { usuario } from 'src/app/Models/Auxiliares/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  public urlLogin: string;
  public urlRecuperarPassword: string;

  constructor(private http: HttpClient,
              private _router : Router) { 
    this.urlLogin = URL_APIS.urlLogin;
    this.urlRecuperarPassword = URL_APIS.urlRecuperarPassword;
  }

  public iniciarSesion(objLogin: login): Observable<usuario> {
    return this.http.post<usuario>(this.urlLogin, objLogin);
  }

  public cerarSesion(){
    localStorage.removeItem('usuario');
    this._router.navigate(['/inicio']);
  }

  public recuperarPassword(objLogin: login): Observable<string> {
    return this.http.post<string>(this.urlRecuperarPassword, objLogin);
  }

  public estaAutenticado(): boolean {
    
    if (localStorage.getItem('usuario')){
      return true;
    }
    else{
      return false;
    }
    //var currentUser = JSON.parse(localStorage.getItem('token')!);
    //return localStorage.getItem('token')!.length > 0;
  }

  public obtenerRolUsuario(): string {
    if (localStorage.getItem('usuario'))
    {
      return JSON.parse(localStorage.getItem('usuario')!)['Rol'];
    }
    else{
      return '';
    }
  }

}
