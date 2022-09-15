import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { planesPaquetesPagos } from '../../Models/procesos/plancliente.model';
import { LoginService } from '../Catalogos/login.service';

@Injectable({
  providedIn: 'root',
})
export class PaquetesClientesPagosService {
  public urlPaquetesClientePagos: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlPaquetesClientePagos = URL_APIS.urlPaquetesClientePagos;
  }

  public getPaquetesClientesPagos(): Observable<planesPaquetesPagos[]> {
    return this.http.get<planesPaquetesPagos[]>(this.urlPaquetesClientePagos, this.httpOptions);
  }

  public getPaquetesClientesFiltro(EmailCliente : string | null, Id_Estatus : number | null): Observable<planesPaquetesPagos[]> {
    return this.http.get<planesPaquetesPagos[]>(this.urlPaquetesClientePagos + '?EmailCliente=' + (EmailCliente === null ? '' : EmailCliente) + '&Id_Estatus=' + Id_Estatus, this.httpOptions);
  }
  
  public putPaquetesClientePagado(Id_Paquete : number, UID_Cliente : string): Observable<number> {
    return this.http.put<number>(this.urlPaquetesClientePagos + '?Id_Paquete=' + Id_Paquete + '&UID_Cliente=' + UID_Cliente, '', this.httpOptions);
  }
  
}
