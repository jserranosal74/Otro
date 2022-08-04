import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { planesPaquetesClienteFiltros } from 'src/app/Models/procesos/planesPaquetesClienteFiltros.model';

@Injectable({
  providedIn: 'root'
})

export class PlanesPaquetesClienteFiltrosService {
  public urlPlanesPaquetesClienteFiltros: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlPlanesPaquetesClienteFiltros = URL_APIS.urlPlanesPaquetesClienteFiltros;
  }

  public getPlanesPaquetesClienteFiltros(UID_Cliente : string, Id_TipoAnuncio : number | null, Id_TipoPlan : number | null, Id_Estatus : number | null): Observable<planesPaquetesClienteFiltros> {
    return this.http.get<planesPaquetesClienteFiltros>(this.urlPlanesPaquetesClienteFiltros + '?Id_Cliente=' + UID_Cliente + '&Id_TipoAnuncio='+ Id_TipoAnuncio + '&Id_TipoPlan=' + Id_TipoPlan + '&Id_Estatus=' + Id_Estatus, this.httpOptions);
  }

}
