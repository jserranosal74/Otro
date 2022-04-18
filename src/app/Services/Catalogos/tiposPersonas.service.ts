import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tipoPropiedad } from '../../Models/catalogos/tipoPropiedad.model';
import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { subtipoPropiedad } from '../../Models/catalogos/tipoPropiedadDetalle.model';
import { tipoPersona } from '../../Models/catalogos/tipoPersona.model';

@Injectable({
  providedIn: 'root'
})
export class TiposPersonaService {
  public urlTipoPersona: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlTipoPersona = URL_APIS.urlTipoPersona;
  }

  public getTiposPersonas(): Observable<tipoPersona[]> {
    return this.http.get<tipoPersona[]>(this.urlTipoPersona, this.httpOptions);
  }

}
