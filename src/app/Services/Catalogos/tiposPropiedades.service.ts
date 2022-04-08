import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tipoPropiedad } from '../../Models/catalogos/tipoPropiedad.model';
import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { tipoPropiedadDetalle } from 'src/app/Models/catalogos/tipoPropiedadDetalle.model';

@Injectable({
  providedIn: 'root'
})
export class TiposPropiedadService {
  public urlTiposPropiedad: string;
  public urlTiposPropiedadDetalle: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlTiposPropiedad = URL_APIS.urlTipoPropiedad;
    this.urlTiposPropiedadDetalle = URL_APIS.urlTipoPropiedadDetalle;
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
  public getTipoPropiedadDetalle(Id_TipoPropiedadDetalle : number): Observable<tipoPropiedadDetalle> {
    return this.http.get<tipoPropiedadDetalle>(this.urlTiposPropiedadDetalle + Id_TipoPropiedadDetalle);
  }

  public getTiposPropiedadesDetalle(): Observable<tipoPropiedadDetalle[]> {
    return this.http.get<tipoPropiedadDetalle[]>(this.urlTiposPropiedadDetalle);
  }

  public putTipoPropiedadDetalle(objTipoPropiedadDetalle: tipoPropiedadDetalle): Observable<tipoPropiedadDetalle> {
    return this.http.put<tipoPropiedadDetalle>(this.urlTiposPropiedadDetalle + objTipoPropiedadDetalle.Id_TipoPropiedadDetalle, objTipoPropiedadDetalle, this.httpOptions);
  }

  public postTipoPropiedadDetalle(objTipoPropiedadDetalle: tipoPropiedadDetalle): Observable<tipoPropiedad> {
    return this.http.post<tipoPropiedad>(this.urlTiposPropiedadDetalle, objTipoPropiedadDetalle, this.httpOptions);
  }

  public deleteTipoPropiedadDetalle(Id_TipoPropiedadDetalle : number): Observable<tipoPropiedadDetalle> {
    return this.http.delete<tipoPropiedadDetalle>(this.urlTiposPropiedadDetalle + Id_TipoPropiedadDetalle, this.httpOptions);
  }

}
