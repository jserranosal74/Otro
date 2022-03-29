import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { asentamiento } from '../../Models/catalogos/asentamiento.model';

@Injectable({
  providedIn: 'root'
})

export class AsentamientosService {
  public urlBusquedasAsentamiento: string;
  public urlAsentamientos: string;

  constructor(private http: HttpClient) { 
    this.urlBusquedasAsentamiento = URL_APIS.urlBusquedasAsentamiento;
    this.urlAsentamientos = URL_APIS.urlAsentamientos;
  }

  public getAsentamientos(Id_Estado : number, Id_Municipio : number): Observable<asentamiento[]> {
    return this.http.get<asentamiento[]>(this.urlBusquedasAsentamiento + Id_Estado + '/' + Id_Municipio);
  }

  public getAsentamiento(Id_Asentamiento : number): Observable<asentamiento[]> {
    return this.http.get<asentamiento[]>(this.urlAsentamientos + Id_Asentamiento);
  }

  public putAmenidades(objAsentamiento: asentamiento): Observable<asentamiento> {
    return this.http.put<asentamiento>(this.urlAsentamientos + objAsentamiento.Id_Asentamiento, objAsentamiento);
  }

  public postAmenidades(objAsentamiento: asentamiento): Observable<asentamiento> {
    return this.http.post<asentamiento>(this.urlAsentamientos, objAsentamiento);
  }

  public postDelete(Id_Asentamiento : number): Observable<asentamiento> {
    return this.http.delete<asentamiento>(this.urlAsentamientos + Id_Asentamiento);
  }

}
