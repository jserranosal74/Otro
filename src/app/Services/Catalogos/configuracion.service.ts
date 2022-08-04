import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { configuracion } from 'src/app/Models/catalogos/condiguracion.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  public urlConfiguracion: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlConfiguracion = URL_APIS.urlConfiguracion;
  }

  public getConfiguracion(Id_Configuracion : number | null): Observable<configuracion[]> {
    return this.http.get<configuracion[]>(this.urlConfiguracion + '?Id_Configuracion=' + Id_Configuracion);
  }

  public putConfiguracion(objConfiguracion : configuracion): Observable<number> {
    return this.http.put<number>(this.urlConfiguracion, objConfiguracion, this.httpOptions);
  }

  public postConfiguracion(objConfiguracion : configuracion): Observable<number> {
    return this.http.post<number>(this.urlConfiguracion, objConfiguracion, this.httpOptions);
  }

  public deleteConfiguracion(Id_Configuracion : number): Observable<number> {
    return this.http.delete<number>(this.urlConfiguracion + '?Id_Configuracion=' + Id_Configuracion, this.httpOptions);
  }

}
