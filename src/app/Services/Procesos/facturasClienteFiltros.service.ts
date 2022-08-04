import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { factura } from 'src/app/Models/catalogos/factura.model';
import { facturasClienteFiltros } from 'src/app/Models/procesos/facturasClienteFiltros.model';

@Injectable({
  providedIn: 'root',
})
export class FacturasClienteFiltrosService {
  public urlFacturasClienteFiltros: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlFacturasClienteFiltros = URL_APIS.urlFacturasClienteFiltros;
  }

  public getFacturasClienteFiltros(UID_Cliente : string, Id_Anio : number | null, Id_Mes : number | null): Observable<facturasClienteFiltros> {
    return this.http.get<facturasClienteFiltros>(this.urlFacturasClienteFiltros + '?Id_Cliente=' + UID_Cliente + '&Id_Anio=' + Id_Anio + '&Id_Mes=' + Id_Mes, this.httpOptions);
  }
  
}
