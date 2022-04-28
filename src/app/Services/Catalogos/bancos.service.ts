import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { banco } from 'src/app/Models/catalogos/banco.model';

@Injectable({
  providedIn: 'root'
})

export class BancosService {
  public urlBancos: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlBancos = URL_APIS.urlBancos;
  }

  public getBancos(): Observable<banco[]> {
    return this.http.get<banco[]>(this.urlBancos, this.httpOptions);
  }

}
