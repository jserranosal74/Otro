import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { factura } from 'src/app/Models/catalogos/factura.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesFacturasService {
  public urlClientesFacturas: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlClientesFacturas = URL_APIS.urlClientesFacturas;
  }

  public getClienteFacturas(Id_Cliente : number, Fecha : Date): Observable<factura[]> {
    return this.http.get<factura[]>(this.urlClientesFacturas + '?Id_Cliente=' + Id_Cliente + '&Fecha=' + Fecha.getMonth() + '-01-' + Fecha.getFullYear(), this.httpOptions);
  }
  
}
