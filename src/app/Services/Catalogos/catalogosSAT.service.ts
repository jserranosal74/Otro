import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { configuracion } from 'src/app/Models/catalogos/condiguracion.model';
import { LoginService } from './login.service';
import { usoCFDI, formaPago } from '../../Models/catalogos/catalogosSAT.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogosSATService {
  public urlCatalogosSAT: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlCatalogosSAT = URL_APIS.urlCatalogosSAT;
  }

  public getUsosFCDI(Id_UsoCFDI : number | null): Observable<usoCFDI[]> {
    return this.http.get<usoCFDI[]>(this.urlCatalogosSAT + '?Id_UsoCFDI=' + Id_UsoCFDI, this.httpOptions);
  }

  public getFormasPagoSAT(Id_FormaPago : number | null): Observable<formaPago[]> {
    return this.http.get<formaPago[]>(this.urlCatalogosSAT + '?Id_FormaPago=' + Id_FormaPago, this.httpOptions);
  }

}
