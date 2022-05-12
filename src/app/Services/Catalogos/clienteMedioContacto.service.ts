import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { clienteMedioContacto } from '../../Models/catalogos/cliente.model';

@Injectable({
  providedIn: 'root'
})

export class ClienteMediosContactoService {
  public urlClienteMedioContacto: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlClienteMedioContacto = URL_APIS.urlClienteMedioContacto;
  }

  public getClienteMediosContacto(Id_Cliente : number): Observable<clienteMedioContacto[]> {
    return this.http.get<clienteMedioContacto[]>(this.urlClienteMedioContacto + '?Id_Cliente=' + Id_Cliente, this.httpOptions);
  }

}
