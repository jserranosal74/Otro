import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { datoFiscal } from '../../Models/procesos/datosFiscales.model';

@Injectable({
  providedIn: 'root'
})

export class DatosFiscalesService {
  public urlDatosFiscales: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(  private http: HttpClient, 
                private _loginService: LoginService) { 
    this.urlDatosFiscales = URL_APIS.urlDatosFiscales;
  }

  public getDatosFiscalesCliente(UID_Cliente : string): Observable<datoFiscal[]> {
    return this.http.get<datoFiscal[]>(this.urlDatosFiscales + '?id_cliente=' + UID_Cliente + '&id_datofiscal=', this.httpOptions);
  }

  public getDatoFiscalCliente(UID_Cliente : string, Id_DatosFiscales : number): Observable<datoFiscal> {
    return this.http.get<datoFiscal>(this.urlDatosFiscales + '?id_cliente=' + UID_Cliente + '&id_datofiscal=' + Id_DatosFiscales, this.httpOptions);
  }

  public putDatosFiscales(objDatosFiscales: datoFiscal): Observable<datoFiscal> {
    return this.http.put<datoFiscal>(this.urlDatosFiscales + objDatosFiscales.Id_DatosFiscales, objDatosFiscales, this.httpOptions);
  }

  public postDatosFiscales(objDatosFiscales: datoFiscal): Observable<datoFiscal> {
    return this.http.post<datoFiscal>(this.urlDatosFiscales, objDatosFiscales, this.httpOptions);
  }

  public deleteDatosFiscales(UID_Cliente : string, Id_DatosFiscales : number): Observable<datoFiscal> {
    return this.http.delete<datoFiscal>(this.urlDatosFiscales + '?UID_Cliente=' + UID_Cliente + '&Id_DatosFiscales=' + Id_DatosFiscales, this.httpOptions);
  }

}
