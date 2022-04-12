import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { asentamiento, paginadoDetalle } from '../../Models/catalogos/asentamiento.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class AsentamientosService {
  public urlBusquedasAsentamiento: string;
  public urlAsentamientos: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlBusquedasAsentamiento = URL_APIS.urlBusquedasAsentamiento;
    this.urlAsentamientos = URL_APIS.urlAsentamientos;
  }

  public getAsentamientos(Id_Estado : number, Id_Municipio : number): Observable<asentamiento[]> {
    return this.http.get<asentamiento[]>(this.urlBusquedasAsentamiento + Id_Estado + '/' + Id_Municipio);
  }

  public getAsentamientosPaginado(Id_Estado : number, Id_Municipio : number, NumPagina : number, NumRenglones : number): Observable<asentamiento[]> {
    return this.http.get<asentamiento[]>(this.urlAsentamientos + '/Paginado/' + Id_Estado + '/' + Id_Municipio + '/' + NumPagina + '/' + NumRenglones);
  }

  public getAsentamientosPaginadoDet(Id_Estado : number, Id_Municipio : number, NumRenglones : number): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlAsentamientos + '/Paginado/' + Id_Estado + '/' + Id_Municipio + '/' + NumRenglones);
  }

  public getAsentamiento(Id_Asentamiento : number): Observable<asentamiento> {
    return this.http.get<asentamiento>(this.urlAsentamientos + Id_Asentamiento);
  }

  public putAsentamiento(objAsentamiento: asentamiento): Observable<asentamiento> {
    return this.http.put<asentamiento>(this.urlAsentamientos + objAsentamiento.Id_Asentamiento, objAsentamiento, this.httpOptions);
  }

  public postAsentamiento(objAsentamiento: asentamiento): Observable<asentamiento> {
    return this.http.post<asentamiento>(this.urlAsentamientos, objAsentamiento, this.httpOptions);
  }

  public deleteAsentamiento(Id_Asentamiento : number): Observable<asentamiento> {
    return this.http.delete<asentamiento>(this.urlAsentamientos + Id_Asentamiento, this.httpOptions);
  }

}
