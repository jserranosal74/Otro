import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { inmobiliaria } from 'src/app/Models/catalogos/inmobiliaria.model';

@Injectable({
  providedIn: 'root'
})

export class InmobiliariasService {
  public urlInmobiliarias: string;
  public urlInmobiliariasCliente: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlInmobiliarias = URL_APIS.urlInmobiliarias;
    this.urlInmobiliariasCliente = URL_APIS.urlInmobiliariasCliente;

  }

  public getInmobiliaria(Id_Inmobiliaria : number): Observable<inmobiliaria> {
    return this.http.get<inmobiliaria>(this.urlInmobiliarias + Id_Inmobiliaria, this.httpOptions);
  }

  public getInmobiliarias(Id_Cliente : number): Observable<inmobiliaria[]> {
    return this.http.get<inmobiliaria[]>(this.urlInmobiliariasCliente + '?id_cliente=' + Id_Cliente, this.httpOptions);
  }

  public putInmobiliaria(objInmobiliaria: inmobiliaria): Observable<inmobiliaria> {
    return this.http.put<inmobiliaria>(this.urlInmobiliarias + objInmobiliaria.Id_Inmobiliaria, objInmobiliaria, this.httpOptions);
  }

  public postInmobiliaria(objInmobiliaria: inmobiliaria): Observable<inmobiliaria> {
    return this.http.post<inmobiliaria>(this.urlInmobiliarias, objInmobiliaria, this.httpOptions);
  }

  public deleteInmobiliaria(objInmobiliaria : number): Observable<inmobiliaria> {
    return this.http.delete<inmobiliaria>(this.urlInmobiliarias + objInmobiliaria, this.httpOptions);
  }

}
