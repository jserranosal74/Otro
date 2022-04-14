import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { plancliente } from '../../Models/procesos/plancliente.model';
import { LoginService } from '../Catalogos/login.service';

@Injectable({
  providedIn: 'root',
})
export class PlanesclienteService {
  public urlPlanesCliente: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlPlanesCliente = URL_APIS.urlPlanesCliente;
  }

  public getPlanesCliente(Id_Cliente: number): Observable<plancliente[]> {
    //debugger;
    return this.http.get<plancliente[]>(
      this.urlPlanesCliente + 'obtenerporcliente?id=' + Id_Cliente, this.httpOptions
    );
  }

  public postPlanesCliente(objPlanCliente: plancliente): Observable<plancliente[]> {
    return this.http.post<plancliente[]>(
      this.urlPlanesCliente, objPlanCliente, this.httpOptions
    );
  }

}
