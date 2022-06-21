import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { publicacionMensaje } from 'src/app/Models/procesos/publicacionMensaje.model';

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

  public getPublicacionesMensajes(Id_Cliente : number, Id_Publicacion : number | null, Id_Accion : number | null, Id_Estatus : number | null, Email : string | null): Observable<publicacionMensaje[]> {
    return this.http.get<publicacionMensaje[]>(this.urlPublicacionesMensajes + '?Id_Cliente=' + Id_Cliente + '&Id_Publicacion=' + Id_Publicacion + '&Id_Accion=' + Id_Accion + '&Id_Estatus=' + Id_Estatus + '&Email=' + (Email === null ? '' : Email), this.httpOptions);
  }

  public postPublicacionMensaje(objPublicacionMensaje : publicacionMensaje): Observable<number> {
    return this.http.post<number>(this.urlPublicacionesMensajes, objPublicacionMensaje);
  }

  public deletePublicacionMensaje(Id_PublicacionMensaje : number | null, Id_Publicacion : number, Id_Cliente : number): Observable<number> {
    return this.http.delete<number>(this.urlPublicacionesMensajes + '?Id_PublicacionMensaje=' + Id_PublicacionMensaje + '&Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente, this.httpOptions);
  }
  
}
