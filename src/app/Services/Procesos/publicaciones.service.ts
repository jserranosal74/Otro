import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { publicacion, publicacionCaracteristica, publicacionInfoMini } from '../../Models/procesos/publicacion.model';
import { LoginService } from '../Catalogos/login.service';
import { paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { publicacionVistaBloquear } from '../../Models/procesos/publicacionBloquear.model';

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
    return this.http.get<publicacion>(this.urlPublicaciones + '?Id_Cliente=' + Id_Cliente + '&Id_Estatus=&Id_Publicacion=' + Id_Publicacion, this.httpOptions);
  }

  public getPublicacionVista(Id_Publicacion : number, Id_Cliente : number | null): Observable<publicacion> {
    return this.http.get<publicacion>(this.urlPublicaciones + '?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente);
  }

  public getPublicaciones(Id_Cliente : number, Id_Estatus : number | null): Observable<publicacion[]> {
    return this.http.get<publicacion[]>(this.urlPublicaciones + '?Id_Cliente=' + Id_Cliente + '&Id_Estatus=' + Id_Estatus + '&Id_Publicacion=', this.httpOptions);
  }

  public getPublicacionesMini(Id_Cliente : number, Id_Usuario : number | null, NumPagina : number, NumRenglones: number, Id_Estatus : number | null, Id_TipoPropiedad : number | null, Id_TipoOperacion : number | null, Id_TipoPlan : number | null, Id_Estado : number | null, Id_Municipio : number | null, Id_Asentamiento : number | null): Observable<publicacionInfoMini[]> {
    return this.http.get<publicacionInfoMini[]>(this.urlPublicaciones + '?Id_Cliente=' + Id_Cliente + '&Id_Usuario=' + Id_Usuario + '&NumPagina=' + NumPagina + '&NumRenglones=' + NumRenglones + '&Id_Estatus=' + Id_Estatus + '&Id_TipoPropiedad=' + Id_TipoPropiedad + '&Id_TipoOperacion=' + Id_TipoOperacion + '&Id_TipoPlan=' + Id_TipoPlan + '&Id_Estado=' + Id_Estado + '&Id_Municipio=' + Id_Municipio + '&Id_Asentamiento=' + Id_Asentamiento);
  }

  public getPublicacionesMiniPagDet(Id_Cliente : number, NumRenglones: number, Id_Estatus : number | null, Id_TipoPropiedad : number | null, Id_TipoOperacion : number | null, Id_TipoPlan : number | null, Id_Estado : number | null, Id_Municipio : number | null, Id_Asentamiento : number | null): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlPublicaciones + 'Paginado?id_cliente=' + Id_Cliente + '&numRenglones=' + NumRenglones + '&Id_Estatus=' + Id_Estatus + '&Id_TipoPropiedad=' + Id_TipoPropiedad + '&Id_TipoOperacion=' + Id_TipoOperacion + '&Id_TipoPlan=' + Id_TipoPlan + '&Id_Estado=' + Id_Estado + '&Id_Municipio=' + Id_Municipio + '&Id_Asentamiento=' + Id_Asentamiento);
  }

  public getPublicacionCaracteristicas(Id_Publicacion : number, Id_Cliente: number): Observable<publicacionCaracteristica[]> {
    return this.http.get<publicacionCaracteristica[]>(this.urlPublicaciones + 'Caracteristicas?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente);
  }

  public getPublicacionClienteCopiar(Id_Publicacion : number, Id_Cliente: number): Observable<number> {
    return this.http.get<number>(this.urlPublicaciones + 'Copiar?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente, this.httpOptions);
  }

  public getPublicacionesClienteEstatus(Email : string | null, Id_Estatus : number | null, Id_Indicador : number | null, NumPagina : number, NumRenglones : number): Observable<publicacionVistaBloquear[]> {
    return this.http.get<publicacionVistaBloquear[]>(this.urlPublicaciones + '?Email=' + (Email === null ? '' : Email) + '&Id_Estatus=' + (Id_Estatus === null ? '' : Id_Estatus) + '&Id_Indicador=' + Id_Indicador + '&Num_Pagina=' + NumPagina + '&Num_Renglones=' + NumRenglones, this.httpOptions);
  }

  public getPublicacionesClienteEstatusPagDet(Email : string | null, Id_Estatus : number | null, Id_Indicador : number | null, NumRenglones: number): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlPublicaciones + '?Email=' + (Email === null ? '' : Email) + '&Id_Estatus=' + Id_Estatus + '&Id_Indicador=' + Id_Indicador + '&numRenglones=' + NumRenglones, this.httpOptions);
  }

  public putPublicacion(objPublicacion: publicacion): Observable<publicacion> {
    return this.http.put<publicacion>(this.urlPublicaciones + objPublicacion.Id_Publicacion, objPublicacion, this.httpOptions);
  }

  public putActivarPublicacion(Id_Publicacion : number, Id_Cliente : number, Id_PlanCliente : number | null, Id_Plan : number, Id_DatosFiscales : number | null, Id_Banco : number | null, Id_PaqueteCliente : number | null, Id_PaqueteDetalle : number | null): Observable<number> {
    return this.http.put<number>(this.urlPublicaciones + '?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente + '&Id_PlanCliente=' + Id_PlanCliente + '&Id_Plan=' + Id_Plan + '&Id_DatosFiscales=' + Id_DatosFiscales + '&Id_Banco=' + Id_Banco + '&Id_PaqueteCliente=' + (Id_PaqueteCliente === null ? '' : Id_PaqueteCliente ) + '&Id_PaqueteDetalle=' + (Id_PaqueteDetalle === null ? '' : Id_PaqueteDetalle), '', this.httpOptions);
  }

  public putPublicacionCaracteristicas(Id_Publicacion: number, Id_Cliente : number, strAdicionales : string): Observable<number> {
    return this.http.get<number>(this.urlPublicaciones + 'Caracteristicas?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente + '&strAdicionales=' + strAdicionales, this.httpOptions);
  }

  public putPublicacionEstatusActualizar(Id_Publicacion : number | null, Id_Cliente : number | null, Id_Estatus : number | null): Observable<number> {
    return this.http.put<number>(this.urlPublicaciones + '?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente + '&Id_Estatus=' + Id_Estatus, '', this.httpOptions);
  }

  public postPublicacion(objPublicacion: publicacion): Observable<publicacion> {
    return this.http.post<publicacion>(this.urlPublicaciones, objPublicacion, this.httpOptions);
  }

  public postPublicacionActualizarEstatus(): Observable<number> {
    return this.http.post<number>(this.urlPublicaciones + 'ActualizarVencimiento', '', this.httpOptions);
  }

  public deletePublicacion(Id_Publicacion : number, Id_Cliente : number): Observable<publicacion> {
    return this.http.delete<publicacion>(this.urlPublicaciones + '?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente, this.httpOptions);
  }

}
