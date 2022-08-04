import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { estadisticasClienteFiltros } from '../../Models/procesos/estadisticasClienteFiltros.model';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasClienteFiltrosService {
  public urlEstadisticasClienteFiltros: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlEstadisticasClienteFiltros = URL_APIS.urlEstadisticasClienteFiltros;
  }

  public getEstadisticasClienteFiltros(UID_Cliente : string, Id_Publicacion : number | null, Id_Estatus : number | null, Email : string | null, FechaInicioPublicacion : Date | null): Observable<estadisticasClienteFiltros> {
    return this.http.get<estadisticasClienteFiltros>(this.urlEstadisticasClienteFiltros + '?Id_Cliente=' + UID_Cliente + '&Id_Publicacion=' + Id_Publicacion + '&Id_Estatus=' + Id_Estatus + '&Email=' + (Email === null ? '' : Email) + '&FechaInicioPublicacion=' + FechaInicioPublicacion, this.httpOptions);
  }

}