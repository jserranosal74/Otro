import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { login } from 'src/app/Models/Auxiliares/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  public urlLogin: string;

  constructor(private http: HttpClient,
              private _router : Router) { 
    this.urlLogin = URL_APIS.urlLogin;
  }

  public iniciarSesion(objLogin: login): Observable<string> {
    return this.http.post<string>(this.urlLogin, objLogin);
  }

  public cerarSesion(){
    localStorage.removeItem('token');
    this._router.navigate(['/inicio']);
  }

  public estaAutenticado(): boolean {
    if (localStorage.getItem('token')){
      return true;
    }
    else{
      return false;
    }
    //var currentUser = JSON.parse(localStorage.getItem('token')!);
    //return localStorage.getItem('token')!.length > 0;
  }

}
