import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { publicacionClienteFiltros } from '../../Models/procesos/publicacionClienteFiltros.model';

@Injectable({
  providedIn: 'root'
})

export class PublicacionesClienteFiltrosService {
  public urlPublicacionesClienteFiltros: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlPublicacionesClienteFiltros = URL_APIS.urlPublicacionesClienteFiltros;
  }

  public getPublicacionClienteFiltros(Id_Cliente : number, Id_Estatus : number | null, Id_TipoPropiedad : number | null, Id_TipoOperacion : number | null, Id_Estado : number | null, Id_Municipio : number | null, Id_Asentamiento : number | null): Observable<publicacionClienteFiltros> {
    return this.http.get<publicacionClienteFiltros>(this.urlPublicacionesClienteFiltros + '?Id_Cliente=' + Id_Cliente + '&Id_Estatus='+ Id_Estatus + '&Id_TipoPropiedad=' + Id_TipoPropiedad + '&Id_TipoOperacion=' + Id_TipoOperacion + '&Id_Estado=' + Id_Estado + '&Id_Municipio=' + Id_Municipio + '&Id_Asentamiento=' + Id_Asentamiento, this.httpOptions);
  }

}
