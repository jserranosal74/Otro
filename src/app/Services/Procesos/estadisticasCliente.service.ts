import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { estadisticasCliente } from 'src/app/Models/procesos/estadisticasCliente.model';
import { paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasClienteService {
  public urlEstadisticasCliente: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlEstadisticasCliente = URL_APIS.urlEstadisticasCliente;
  }

  public getEstadisticasCliente(Id_Cliente : number, Num_Pagina : number, Num_Renglones : number, Id_Publicacion : number | null, Id_Estatus : number | null, Email : string | null, FechaInicioPublicacion : Date | null): Observable<estadisticasCliente[]> {
    return this.http.get<estadisticasCliente[]>(this.urlEstadisticasCliente + '?Id_Cliente=' + Id_Cliente + '&Num_Pagina=' + Num_Pagina + '&Num_Renglones=' + Num_Renglones + '&Id_Publicacion=' + Id_Publicacion + '&Id_Estatus=' + Id_Estatus + '&Email=' + (Email === null ? '' : Email) + '&FechaInicioPublicacion=' + FechaInicioPublicacion, this.httpOptions);
  }

  public getEstadisticasClientePagDet(Id_Cliente : number,  Num_Renglones : number, Id_Publicacion : number | null, Id_Estatus : number | null, Email : string | null, FechaInicioPublicacion : Date | null): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlEstadisticasCliente + '?Id_Cliente=' + Id_Cliente + '&Num_Renglones=' + Num_Renglones + '&Id_Publicacion=' + Id_Publicacion + '&Id_Estatus=' + Id_Estatus + '&Email=' + (Email === null ? '' : Email) + '&FechaInicioPublicacion=' + (FechaInicioPublicacion === null ? '' : FechaInicioPublicacion), this.httpOptions);
  }

}