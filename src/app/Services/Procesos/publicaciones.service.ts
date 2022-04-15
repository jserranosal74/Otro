import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { publicacion } from '../../Models/procesos/publicacion.model';
import { LoginService } from '../Catalogos/login.service';

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
    return this.http.get<publicacion>(this.urlPublicaciones + Id_Publicacion + '/' + Id_Cliente, this.httpOptions);
  }

  public getPublicaciones(Id_Cliente : number): Observable<publicacion[]> {
    return this.http.get<publicacion[]>(this.urlPublicaciones + 'Id_Cliente=' + Id_Cliente, this.httpOptions);
  }

  public putPublicacion(objPublicacion: publicacion): Observable<publicacion> {
    return this.http.put<publicacion>(this.urlPublicaciones + objPublicacion.Id_Publicacion, objPublicacion, this.httpOptions);
  }

  public postPublicacion(objPublicacion: publicacion): Observable<publicacion> {
    return this.http.post<publicacion>(this.urlPublicaciones, objPublicacion, this.httpOptions);
  }

  public deletePublicacion(Id_Publicacion : number): Observable<publicacion> {
    return this.http.delete<publicacion>(this.urlPublicaciones + Id_Publicacion, this.httpOptions);
  }

}
