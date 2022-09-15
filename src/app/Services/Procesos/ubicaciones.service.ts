import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { ubicacion } from 'src/app/Models/procesos/ubicacion.model';

@Injectable({
  providedIn: 'root'
})

export class UbicacionesService {
  public urlUbicaciones: string;

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     Authorization: `Bearer ` + this._loginService.obtenerToken(),
  //   })
  // };

  constructor(  private http: HttpClient) { 
    this.urlUbicaciones = URL_APIS.urlUbicaciones;
  }

  public getUbicaciones(strUbicacion : string): Observable<ubicacion[]> {
    return this.http.get<ubicacion[]>(this.urlUbicaciones + '?strUbicacion=' + strUbicacion);
  }

}
