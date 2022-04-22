import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { caracteristica, tipoCaracteristica } from '../../Models/catalogos/caracteristicas.model';

@Injectable({
  providedIn: 'root'
})

export class CaracteristicasService {
  public urlCaracteristicas: string;
  public urlTipoCaracteristica: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlCaracteristicas = URL_APIS.urlCaracteristicas;
    this.urlTipoCaracteristica = URL_APIS.urlTipoCaracteristica;
  }

  public getCaracteristica(Id_Caracteristica : number, Id_TipoCaracteristica : number): Observable<caracteristica> {
    return this.http.get<caracteristica>(this.urlCaracteristicas + '?id=' + Id_Caracteristica + '&Id_TipoCaracteristica=' + Id_TipoCaracteristica);
  }

  public getCaracteristicas(): Observable<caracteristica[]> {
    return this.http.get<caracteristica[]>(this.urlCaracteristicas);
  }

  public getTipoCaracteristicas(): Observable<tipoCaracteristica[]> {
    return this.http.get<tipoCaracteristica[]>(this.urlTipoCaracteristica);
  }

  public putCaracteristica(obCaracteristica: caracteristica): Observable<caracteristica> {
    return this.http.put<caracteristica>(this.urlCaracteristicas + obCaracteristica.Id_Caracteristica, obCaracteristica, this.httpOptions);
  }

  public postCaracteristica(obCaracteristica: caracteristica): Observable<caracteristica> {
    return this.http.post<caracteristica>(this.urlCaracteristicas, obCaracteristica, this.httpOptions);
  }

  public deleteCaracteristica(Id_Caracteristica : number, Id_TipoCaracteristica : number): Observable<caracteristica> {
    return this.http.delete<caracteristica>(this.urlCaracteristicas + '?id=' + Id_Caracteristica + '&id_tipo_caractaristica=' + Id_TipoCaracteristica, this.httpOptions);
  }

}
