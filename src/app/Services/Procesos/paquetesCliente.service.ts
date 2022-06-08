import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { plancliente } from '../../Models/procesos/plancliente.model';
import { LoginService } from '../Catalogos/login.service';
import { paqueteCliente } from 'src/app/Models/procesos/paquetecliente.model';
import { paquete } from 'src/app/Models/catalogos/paquetes.model';

@Injectable({
  providedIn: 'root',
})
export class PaquetesClienteService {
  public urlPaquetesCliente: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlPaquetesCliente = URL_APIS.urlPaquetesCliente;
  }

  public getPaquetesEmpresa(Id_Empresa : number): Observable<paquete[]> {
    return this.http.get<paquete[]>(this.urlPaquetesCliente + '?Id_Empresa=' + (Id_Empresa === null ? '' : Id_Empresa), this.httpOptions);

  }
  public getPaquetesCliente(Id_Cliente : number, Id_Estatus : number | null): Observable<paqueteCliente[]> {
    return this.http.get<paqueteCliente[]>(this.urlPaquetesCliente + '?Id_Cliente=' + Id_Cliente + '&Id_Estatus=' + Id_Estatus, this.httpOptions);
  }

  public putPaquetesCliente(Id_PlanCliente : number, Id_Plan : number, Id_Cliente : number, Id_DatosFiscales : number | null): Observable<number> {
    return this.http.put<number>(this.urlPaquetesCliente + '?Id_PlanCliente=' + Id_PlanCliente + '&Id_Plan=' + Id_Plan + '&Id_Cliente=' + Id_Cliente + '&Id_DatosFiscales=' + Id_DatosFiscales, this.httpOptions);
  }

  // public putEnviarCorreo(Id_Cliente : number, Id_PlanCliente : number, Id_Publicacion : number | null): Observable<number> {
  //   return this.http.put<number>(this.urlPaquetesCliente + '?Id_Cliente=' + Id_Cliente + '&Id_PlanCliente=' + Id_PlanCliente + '&Id_Publicacion=' + (Id_Publicacion === null ? '' : Id_Publicacion), '', this.httpOptions);
  // }

  public putEnviarCorreoPaquete(Id_Cliente : number, Id_PaqueteCliente : number | null, Id_Publicacion : number | null): Observable<number> {
    return this.http.put<number>(this.urlPaquetesCliente + '?Id_Cliente=' + Id_Cliente + '&Id_PaqueteCliente=' + Id_PaqueteCliente + '&Id_Publicacion=' + (Id_Publicacion === null ? '' : Id_Publicacion), '', this.httpOptions);
  }

  public postPaqueteCliente(Id_Cliente : number, Id_Paquete : number, Id_DatosFiscales : number | null): Observable<number> {
    return this.http.post<number>(this.urlPaquetesCliente + '?Id_Cliente=' + Id_Cliente + '&Id_Paquete=' + Id_Paquete + '&Id_DatosFiscales=' + Id_DatosFiscales, '', this.httpOptions);
  }

  public deletePaqueteCliente(Id_Paquete : number | null, Id_Cliente : number): Observable<number> {
    return this.http.delete<number>(this.urlPaquetesCliente + '?Id_Paquete=' + Id_Paquete + '&Id_Cliente=' + Id_Cliente, this.httpOptions);
  }
  
}
