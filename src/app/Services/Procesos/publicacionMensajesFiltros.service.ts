import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { publicacionMensajesFiltros } from 'src/app/Models/procesos/publicacionMensajesFiltros.model';

@Injectable({
  providedIn: 'root'
})

export class PublicacionMensajesFiltrosService {
  public urlPublicacionesMensajesFiltros: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlPublicacionesMensajesFiltros = URL_APIS.urlPublicacionesMensajesFiltros;
  }

  public getPublicacionMensajesFiltros(Id_Cliente : number, Id_Publicacion : number | null, Id_Accion : number | null, Id_Estatus : number | null, Email : string | null): Observable<publicacionMensajesFiltros> {
    return this.http.get<publicacionMensajesFiltros>(this.urlPublicacionesMensajesFiltros + '?Id_Cliente=' + Id_Cliente + '&Id_Publicacion=' + Id_Publicacion + '&Id_Accion=' + Id_Accion + '&Id_Estatus='+ Id_Estatus + '&Email=' + (Email === null ? '' : Email), this.httpOptions);
  }

}
