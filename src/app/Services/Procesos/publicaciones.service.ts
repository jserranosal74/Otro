import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { publicacion, publicacionCaracteristica, publicacionInfoMini } from '../../Models/procesos/publicacion.model';
import { LoginService } from '../Catalogos/login.service';
import { paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';

@Injectable({
  providedIn: 'root'
})

export class PublicacionesService {
  public urlPublicaciones: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlPublicaciones = URL_APIS.urlPublicaciones;
  }

  public getPublicacion(Id_Publicacion : number, Id_Cliente : number): Observable<publicacion> {
    return this.http.get<publicacion>('/api/Publicaciones/' + '?Id_Cliente=' + Id_Cliente + '&Id_Estatus=&Id_Publicacion=' + Id_Publicacion, this.httpOptions);
  }

  public getPublicacionVista(Id_Publicacion : number): Observable<publicacion> {
    return this.http.get<publicacion>('/api/Publicaciones/' + '?Id_Publicacion=' + Id_Publicacion);
  }

  public getPublicaciones(Id_Cliente : number, Id_Estatus : number | null): Observable<publicacion[]> {
    return this.http.get<publicacion[]>(this.urlPublicaciones + '?Id_Cliente=' + Id_Cliente + '&Id_Estatus=' + Id_Estatus + '&Id_Publicacion=', this.httpOptions);
  }

  public getPublicacionesMini(Id_Cliente : number, Id_Usuario : number | null, NumPagina : number, NumRenglones: number, strFiltros: string): Observable<publicacionInfoMini[]> {
    return this.http.get<publicacionInfoMini[]>(this.urlPublicaciones + '?Id_Cliente=' + Id_Cliente + '&Id_Usuario=' + Id_Usuario + '&NumPagina=' + NumPagina + '&NumRenglones=' + NumRenglones + '&strFiltros=' + strFiltros);
  }

  public getPublicacionesMiniPagDet(Id_Cliente : number, NumRenglones: number, strFiltros: string): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlPublicaciones + 'Paginado?id_cliente=' + Id_Cliente + '&numRenglones=' + NumRenglones + '&strFiltros=' + strFiltros);
  }

  public getPublicacionCaracteristicas(Id_Publicacion : number, Id_Cliente: number): Observable<publicacionCaracteristica[]> {
    return this.http.get<publicacionCaracteristica[]>(this.urlPublicaciones + 'Caracteristicas?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente);
  }

  public putPublicacion(objPublicacion: publicacion): Observable<publicacion> {
    return this.http.put<publicacion>(this.urlPublicaciones + objPublicacion.Id_Publicacion, objPublicacion, this.httpOptions);
  }

  public putActivarPublicacion(Id_Publicacion : number, Id_Cliente : number, Id_PlanCliente : number | null, Id_Plan : number, Id_DatosFiscales : number | null, Id_Banco : number | null, Id_Paquete : number | null, Id_PaqueteDetalle : number | null): Observable<publicacion> {
    return this.http.put<publicacion>(this.urlPublicaciones + '?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente + '&Id_PlanCliente=' + Id_PlanCliente + '&Id_Plan=' + Id_Plan + '&Id_DatosFiscales=' + Id_DatosFiscales + '&Id_Banco=' + Id_Banco + '&Id_Paquete=' + (Id_Paquete === null ? '' : Id_Paquete ) + '&Id_PaqueteDetalle=' + (Id_PaqueteDetalle === null ? '' : Id_PaqueteDetalle), '', this.httpOptions);
  }

  public putPublicacionCaracteristicas(Id_Publicacion: number, Id_Cliente : number, strAdicionales : string): Observable<number> {
    return this.http.get<number>(this.urlPublicaciones + 'Caracteristicas?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente + '&strAdicionales=' + strAdicionales, this.httpOptions);
  }

  public postPublicacion(objPublicacion: publicacion): Observable<publicacion> {
    return this.http.post<publicacion>(this.urlPublicaciones, objPublicacion, this.httpOptions);
  }

  public deletePublicacion(Id_Publicacion : number, Id_Cliente : number): Observable<publicacion> {
    return this.http.delete<publicacion>(this.urlPublicaciones + '?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente, this.httpOptions);
  }

}
