import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { medioContacto } from '../../Models/catalogos/medioContacto.model';

@Injectable({
  providedIn: 'root'
})
export class MediosContactoService {
  public urlMediosContacto: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlMediosContacto = URL_APIS.urlMediosContacto;
  }

  public getMedioContacto(Id_Plan : number): Observable<medioContacto> {
    return this.http.get<medioContacto>(this.urlMediosContacto + Id_Plan);
  }

  public getMediosContacto(): Observable<medioContacto[]> {
    return this.http.get<medioContacto[]>(this.urlMediosContacto);
  }

  public putMedioContacto(objMedioContacto: medioContacto): Observable<medioContacto> {
    return this.http.put<medioContacto>(this.urlMediosContacto + objMedioContacto.Id_MedioContacto, objMedioContacto, this.httpOptions);
  }

  public postMedioContacto(objMedioContacto: medioContacto): Observable<medioContacto> {
    return this.http.post<medioContacto>(this.urlMediosContacto, objMedioContacto, this.httpOptions);
  }

  public deleteMedioContacto(Id_MedioContacto : number): Observable<medioContacto> {
    return this.http.delete<medioContacto>(this.urlMediosContacto + Id_MedioContacto, this.httpOptions);
  }

}
