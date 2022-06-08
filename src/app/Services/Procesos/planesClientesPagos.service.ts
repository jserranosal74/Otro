import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { planesPaquetesPagos } from '../../Models/procesos/plancliente.model';
import { LoginService } from '../Catalogos/login.service';

@Injectable({
  providedIn: 'root',
})
export class PlanesClientesPagosService {
  public urlPlanesClientePagos: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlPlanesClientePagos = URL_APIS.urlPlanesClientePagos;
  }

  public getPlanesClientesPagos(): Observable<planesPaquetesPagos[]> {
    return this.http.get<planesPaquetesPagos[]>(this.urlPlanesClientePagos, this.httpOptions);
  }

  public getPlanesClientesFiltro(EmailCliente : string | null, Id_Estatus : number | null): Observable<planesPaquetesPagos[]> {
    return this.http.get<planesPaquetesPagos[]>(this.urlPlanesClientePagos + '?EmailCliente=' + (EmailCliente === null ? '' : EmailCliente) + '&Id_Estatus=' + Id_Estatus, this.httpOptions);
  }
  
  public putPlanClientePadado(Id_PlanCliente : number, Id_Plan : number, Id_Cliente : number): Observable<number> {
    return this.http.put<number>(this.urlPlanesClientePagos + '?Id_PlanCliente=' + Id_PlanCliente + '&Id_Cliente=' + Id_Cliente + '&Id_Plan=' + Id_Plan, '', this.httpOptions);
  }
  
}
