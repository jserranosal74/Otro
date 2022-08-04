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

  public getClienteFacturas(UID_Cliente : string, Id_PlanCliente : number | null, Id_PaqueteCliente : number | null, Id_Anio : number | null, Id_Mes : number | null): Observable<factura[]> {
    return this.http.get<factura[]>(this.urlClientesFacturas + '?Id_Cliente=' + UID_Cliente + '&Id_PlanCliente=' + Id_PlanCliente + '&Id_PaqueteCliente=' + Id_PaqueteCliente + '&Id_Anio=' + Id_Anio + '&Id_Mes=' + Id_Mes, this.httpOptions);
  }

  public getEnviarFactura(UID_Cliente : string, Id_PlanCliente : number | null, Id_PaqueteCliente : number | null): Observable<number> {
    return this.http.get<number>(this.urlClientesFacturas + '?Id_Cliente=' + UID_Cliente + '&Id_PlanCliente=' + ( Id_PlanCliente === null ? '' : Id_PlanCliente) + '&Id_PaqueteCliente=' + ( Id_PaqueteCliente === null ? '' : Id_PaqueteCliente), this.httpOptions);
  }
  
}
