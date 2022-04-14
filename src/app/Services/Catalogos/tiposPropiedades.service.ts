import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tipoPropiedad } from '../../Models/catalogos/tipoPropiedad.model';
import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { subtipoPropiedad } from '../../Models/catalogos/tipoPropiedadDetalle.model';

@Injectable({
  providedIn: 'root'
})
export class TiposPropiedadService {
  public urlTiposPropiedad: string;
  public urlSubTipoPropiedad: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlTiposPropiedad = URL_APIS.urlTipoPropiedad;
    this.urlSubTipoPropiedad = URL_APIS.urlSubTipoPropiedad;
  }

  public getTipoPropiedad(Id_TipoPropiedad : number): Observable<tipoPropiedad> {
    return this.http.get<tipoPropiedad>(this.urlTiposPropiedad + Id_TipoPropiedad);
  }

  public getTiposPropiedades(): Observable<tipoPropiedad[]> {
    return this.http.get<tipoPropiedad[]>(this.urlTiposPropiedad);
  }

  public putTipoPropiedad(objTipoPropiedad: tipoPropiedad): Observable<tipoPropiedad> {
    return this.http.put<tipoPropiedad>(this.urlTiposPropiedad + objTipoPropiedad.Id_TipoPropiedad, objTipoPropiedad, this.httpOptions);
  }

  public postTipoPropiedad(objTipoPropiedad: tipoPropiedad): Observable<tipoPropiedad> {
    return this.http.post<tipoPropiedad>(this.urlTiposPropiedad, objTipoPropiedad, this.httpOptions);
  }

  public deleteTipoPropiedad(Id_Amenidad : number): Observable<tipoPropiedad> {
    return this.http.delete<tipoPropiedad>(this.urlTiposPropiedad + Id_Amenidad, this.httpOptions);
  }

  // Propiedad Detalle
  public getSubTipoPropiedad(Id_SubtipoPropiedad : number): Observable<subtipoPropiedad> {
    return this.http.get<subtipoPropiedad>(this.urlSubTipoPropiedad + Id_SubtipoPropiedad);
  }

  public getSubTiposPropiedad(Id_TipoPropiedad : number): Observable<subtipoPropiedad[]> {
    return this.http.get<subtipoPropiedad[]>(this.urlSubTipoPropiedad + 'TipoPropiedad/' + Id_TipoPropiedad);
  }

  public putSubTipoPropiedad(objTipoPropiedadDetalle: subtipoPropiedad): Observable<subtipoPropiedad> {
    return this.http.put<subtipoPropiedad>(this.urlSubTipoPropiedad + objTipoPropiedadDetalle.Id_SubtipoPropiedad, objTipoPropiedadDetalle, this.httpOptions);
  }

  public postSubTipoPropiedad(objTipoPropiedadDetalle: subtipoPropiedad): Observable<tipoPropiedad> {
    return this.http.post<tipoPropiedad>(this.urlSubTipoPropiedad, objTipoPropiedadDetalle, this.httpOptions);
  }

  public deleteSubTipoPropiedad(Id_TipoPropiedadDetalle : number): Observable<subtipoPropiedad> {
    return this.http.delete<subtipoPropiedad>(this.urlSubTipoPropiedad + Id_TipoPropiedadDetalle, this.httpOptions);
  }

}
