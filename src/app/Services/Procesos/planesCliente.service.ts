import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { plancliente } from '../../Models/procesos/plancliente.model';
import { LoginService } from '../Catalogos/login.service';

@Injectable({
  providedIn: 'root',
})
export class PlanesClienteService {
  public urlPlanesCliente: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlPlanesCliente = URL_APIS.urlPlanesCliente;
  }

  public getPlanesCliente(UID_Cliente : string, Id_Estatus : number | null, Id_TipoPlan : number | null): Observable<plancliente[]> {
    return this.http.get<plancliente[]>(
      this.urlPlanesCliente + 'obtenerporcliente?Id_Cliente=' + UID_Cliente + '&Id_Estatus=' + Id_Estatus + '&Id_TipoPlan=' + Id_TipoPlan, this.httpOptions
    );
  }

  public putPlanesCliente(Id_PlanCliente : number, Id_Plan : number, Id_Cliente : number, Id_DatosFiscales : number | null): Observable<number> {
    return this.http.put<number>(this.urlPlanesCliente + '?Id_PlanCliente=' + Id_PlanCliente + '&Id_Plan=' + Id_Plan + '&Id_Cliente=' + Id_Cliente + '&Id_DatosFiscales=' + Id_DatosFiscales, this.httpOptions);
  }

  public putEnviarCorreoPlan(UID_Cliente : string, Id_PlanCliente : number, Id_Publicacion : number | null): Observable<number> {
    return this.http.put<number>(this.urlPlanesCliente + '?UID_Cliente=' + UID_Cliente + '&Id_PlanCliente=' + Id_PlanCliente + '&Id_Publicacion=' + (Id_Publicacion === null ? '' : Id_Publicacion), '', this.httpOptions);

  }

  public postPlanesCliente(UID_Cliente : string, Id_Plan : number, Id_DatosFiscales : number | null): Observable<number> {
    return this.http.post<number>(this.urlPlanesCliente + '?UID_Cliente=' + UID_Cliente + '&Id_Plan=' + Id_Plan + '&Id_DatosFiscales=' + Id_DatosFiscales, '', this.httpOptions);
  }

  // public postPlanesYPaquetesActualizar(): Observable<number> {
  //   return this.http.post<number>(this.urlPlanesCliente, '', this.httpOptions);
  // }

  public deletePlanCliente(Id_PlanCliente : number): Observable<number> {
    return this.http.delete<number>(this.urlPlanesCliente + '?Id_PlanCliente=' + Id_PlanCliente, this.httpOptions);
  }
  
}
