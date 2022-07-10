import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { imagenModel, publicacionMultimedia } from '../../Models/procesos/publicacion.model';
import { LoginService } from '../Catalogos/login.service';

@Injectable({
  providedIn: 'root'
})

export class MultimediaPublicacionService {
  public urlPublicacionMultimedia: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlPublicacionMultimedia = URL_APIS.urlPublicacionMultimedia;
  }

  public getMultimediaPublicacion(Id_Publicacion : number, Id_Cliente: number, Id_TipoMultimedia : number | null): Observable<publicacionMultimedia[]> {
    return this.http.get<publicacionMultimedia[]>(this.urlPublicacionMultimedia + '?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente + '&Id_TipoMultimedia=' + Id_TipoMultimedia);
  }
  
  public getMultimediaCliente(Id_Cliente: number, Id_Publicacion : number | null, Solo_Pred : number | null): Observable<publicacionMultimedia[]> {
    return this.http.get<publicacionMultimedia[]>(this.urlPublicacionMultimedia + '?Id_Cliente=' + Id_Cliente + '&Id_Publicacion=' + Id_Publicacion + '&Solo_Pred=' + Solo_Pred);
  }

  public postFotosPublicacion(Id_Publicacion : number, Id_Cliente: number, lstImagenes: imagenModel[]): Observable<number> {
    return this.http.post<number>(this.urlPublicacionMultimedia + '?Id_Publicacion=' + Id_Publicacion + '&Id_Cliente=' + Id_Cliente, lstImagenes, this.httpOptions);
  }

}
