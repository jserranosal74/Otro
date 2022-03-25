import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from './global';
import { asentamiento } from '../Models/asentamiento.model';

@Injectable({
  providedIn: 'root'
})

export class AsentamientosService {
  public urlAsentamientos: string;

  constructor(private http: HttpClient) { 
    this.urlAsentamientos = URL_APIS.urlAsentamientos;
  }

  public getAsentamientos(Id_Estado : number, Id_Municipio : number): Observable<asentamiento[]> {
    return this.http.get<asentamiento[]>(this.urlAsentamientos + Id_Estado + '/' + Id_Municipio);
  }

}
