import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tipoPropiedad } from '../../Models/catalogos/tipoPropiedad.model';
import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { tipoAsentamiento } from '../../Models/catalogos/tipoAsentamiento.model';

@Injectable({
  providedIn: 'root'
})
export class TiposAsentamientoService {
  public urlTiposAsentamiento: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlTiposAsentamiento = URL_APIS.urlTiposAsentamiento;
  }

  public getTipoAsentamiento(Id_TipoPropiedad : number): Observable<tipoAsentamiento> {
    return this.http.get<tipoAsentamiento>(this.urlTiposAsentamiento + Id_TipoPropiedad);
  }

  public getTiposAsentamientos(): Observable<tipoAsentamiento[]> {
    return this.http.get<tipoAsentamiento[]>(this.urlTiposAsentamiento);
  }

  public putTipoAsentamiento(objTipoAsentamiento: tipoAsentamiento): Observable<tipoAsentamiento> {
    return this.http.put<tipoAsentamiento>(this.urlTiposAsentamiento + objTipoAsentamiento.Id_TipoAsentamiento, objTipoAsentamiento, this.httpOptions);
  }

  public postTipoAsentamiento(objTipoAsentamiento: tipoAsentamiento): Observable<tipoAsentamiento> {
    return this.http.post<tipoAsentamiento>(this.urlTiposAsentamiento, objTipoAsentamiento, this.httpOptions);
  }

  public deleteTipoAsentamiento(Id_Amenidad : number): Observable<tipoAsentamiento> {
    return this.http.delete<tipoAsentamiento>(this.urlTiposAsentamiento + Id_Amenidad, this.httpOptions);
  }

}
