import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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

  public getPlanesCliente(Id_Cliente : number, Id_Estatus : number | null): Observable<plancliente[]> {
    return this.http.get<plancliente[]>(
      this.urlPlanesCliente + 'obtenerporcliente?Id_Cliente=' + Id_Cliente + '&Id_Estatus=' + Id_Estatus, this.httpOptions
    );
  }

  public putPlanesCliente(Id_PlanCliente : number, Id_Plan : number, Id_Cliente : number, Id_DatosFiscales : number | null): Observable<number> {
    return this.http.put<number>(this.urlPlanesCliente + '?Id_PlanCliente=' + Id_PlanCliente + '&Id_Plan=' + Id_Plan + '&Id_Cliente=' + Id_Cliente + '&Id_DatosFiscales=' + Id_DatosFiscales, this.httpOptions);
  }

  public putEnviarCorreo(Id_Cliente : number, Id_PlanCliente : number, Id_Publicacion : number | null): Observable<number> {
    return this.http.put<number>(this.urlPlanesCliente + '?Id_Cliente=' + Id_Cliente + '&Id_PlanCliente=' + Id_PlanCliente + '&Id_Publicacion=' + Id_Publicacion, '', this.httpOptions);
  }

  public postPlanesCliente(Id_Cliente : number, Id_Plan : number, Id_DatosFiscales : number | null): Observable<number> {
    return this.http.post<number>(this.urlPlanesCliente + '?Id_Cliente=' + Id_Cliente + '&Id_Plan=' + Id_Plan + '&Id_DatosFiscales=' + Id_DatosFiscales, '', this.httpOptions);
  }

  public deletePlanCliente(Id_PlanCliente : number): Observable<number> {
    return this.http.delete<number>(this.urlPlanesCliente + '?Id_PlanCliente=' + Id_PlanCliente, this.httpOptions);
  }
  
}
