import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { publicacionMensaje } from 'src/app/Models/procesos/publicacionMensaje.model';
import { paginadoDetalle } from '../../Models/catalogos/asentamiento.model';

@Injectable({
  providedIn: 'root',
})
export class PublicacionMensajesService {
  public urlPublicacionesMensajes: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlPublicacionesMensajes = URL_APIS.urlPublicacionesMensajes;
  }

  public getPublicacionesMensajes(Id_Cliente : number, Num_Pagina : number, Num_Renglones : number, Id_Publicacion : number | null, Id_Indicador : number | null, Id_Estatus : number | null, Email : string | null, Fecha : Date | null): Observable<publicacionMensaje[]> {
    return this.http.get<publicacionMensaje[]>(this.urlPublicacionesMensajes + '?Id_Cliente=' + Id_Cliente + '&Num_Pagina=' + Num_Pagina + '&Num_Renglones=' + Num_Renglones + '&Id_Publicacion=' + (Id_Publicacion === null ? '' : Id_Publicacion) + '&Id_Indicador=' + (Id_Indicador === null ? '' : Id_Indicador) + '&Id_Estatus=' + (Id_Estatus === null ? '' : Id_Estatus) + '&Email=' + (Email === null ? '' : Email) + '&Fecha=' + (Fecha === null ? '' : Fecha), this.httpOptions);
  }

  public getPublicacionesMensajesPagDet(Id_Cliente : number,  Num_Renglones : number, Id_Publicacion : number | null, Id_Indicador : number | null, Id_Estatus : number | null, Email : string | null, Fecha : Date | null): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlPublicacionesMensajes + '?Id_Cliente=' + Id_Cliente + '&Num_Renglones=' + Num_Renglones + '&Id_Publicacion=' + Id_Publicacion + '&Id_Indicador=' + Id_Indicador + '&Id_Estatus=' + Id_Estatus + '&Email=' + (Email === null ? '' : Email) + '&Fecha=' + (Fecha === null ? '' : Fecha), this.httpOptions);
  }

  public postPublicacionMensaje(objPublicacionMensaje : publicacionMensaje): Observable<number> {
    return this.http.post<number>(this.urlPublicacionesMensajes, objPublicacionMensaje);
  }

  public putPublicacionMensaje(objPublicacionMensaje : publicacionMensaje): Observable<number> {
    return this.http.put<number>(this.urlPublicacionesMensajes, objPublicacionMensaje, this.httpOptions);
  }

  public deletePublicacionMensaje(Id_PublicacionMensaje : number | null, Id_Publicacion : number, Id_Cliente : number): Observable<number> {
    return this.http.delete<number>(this.urlPublicacionesMensajes + '?Id_PublicacionMensaje=' + Id_PublicacionMensaje + '&Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente, this.httpOptions);
  }
  
}
