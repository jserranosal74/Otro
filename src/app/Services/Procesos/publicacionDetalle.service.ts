import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { publicacionDetalle, publicacionDetalleVista } from '../../Models/procesos/publicacionDetalle.model';
import { publicacion } from '../../Models/procesos/publicacion.model';

@Injectable({
  providedIn: 'root',
})
export class PublicacionDetalleService {
  public urlPublicacionDetalle: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlPublicacionDetalle = URL_APIS.urlPublicacionDetalle;
  }

  public getPublicacionDetalle(Id_ClientePadre : string, Id_PublicacionPadre : number): Observable<publicacionDetalle[]> {
    return this.http.get<publicacionDetalle[]>(this.urlPublicacionDetalle + '?Id_ClientePadre=' + Id_ClientePadre + '&Id_PublicacionPadre=' + Id_PublicacionPadre);
  }

  public getPublicacionDetalleCompleta(Id_ClientePadre : string, Id_PublicacionPadre : number, SoloAgregadas : number): Observable<publicacion[]> {
    return this.http.get<publicacion[]>(this.urlPublicacionDetalle + '?Id_ClientePadre=' + Id_ClientePadre + '&Id_PublicacionPadre=' + Id_PublicacionPadre + '&SoloAgregadas=' + SoloAgregadas, this.httpOptions);
  }

  public getPublicacionDetalleVista(Id_ClientePadre : number, Id_PublicacionPadre : number): Observable<publicacionDetalleVista[]> {
    return this.http.get<publicacionDetalleVista[]>(this.urlPublicacionDetalle + '?Id_Cliente=' + Id_ClientePadre + '&Id_Publicacion=' + Id_PublicacionPadre);
  }

  public postPublicacionDetalle(JsonPublicacionDetalle : string): Observable<number> {
    return this.http.post<number>(this.urlPublicacionDetalle + '?JsonPublicacionDetalle=' + JsonPublicacionDetalle, '', this.httpOptions);
  }

  public deletePublicacionDetalle(Id_PublicacionDetalle : number): Observable<number> {
    return this.http.delete<number>(this.urlPublicacionDetalle + '?Id_PublicacionDetalle=' + Id_PublicacionDetalle, this.httpOptions);
  }
  
}
