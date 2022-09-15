import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { paginadoDetalle } from '../../Models/catalogos/asentamiento.model';
import { facturaExterna } from 'src/app/Models/procesos/facturaExterna.model';

@Injectable({
  providedIn: 'root',
})
export class FacturacionExternaService {
  public urlFacturacionExterna: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.urlFacturacionExterna = URL_APIS.urlFacturacionExterna;
  }

  public getFacturacionExternaPaginado(Id_Cliente : number | null, FechaAltaFactura : Date | null, NumPagina : number, NumRenglones : number): Observable<facturaExterna[]> {
    return this.http.get<facturaExterna[]>(this.urlFacturacionExterna + '?Id_Cliente=' + Id_Cliente + '&FechaAltaFactura=' + FechaAltaFactura + '&NumPagina=' + NumPagina + '&NumRenglones=' + NumRenglones, this.httpOptions);
  }

  public getFacturacionExternaPagDet(Id_Cliente : number | null, FechaAltaFactura : Date | null, NumRenglones : number): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlFacturacionExterna + '?Id_Cliente=' + Id_Cliente + '&FechaAltaFactura=' + FechaAltaFactura + '&NumRenglones=' + NumRenglones, this.httpOptions);
  }

  public GetEnviarFacturaExterna(UID_Cliente : string, Id_Factura : number, UUID : string, Email : string): Observable<number> {
    return this.http.get<number>(this.urlFacturacionExterna + '?UID_Cliente=' + UID_Cliente + '&Id_Factura=' + Id_Factura + '&UUID=' + UUID + '&Email=' + Email, this.httpOptions);
  }

  public postFacturacionExterna(Id_ClienteEmisor : number, Id_ClienteReceptor : number, Id_DatosFiscales : number, Id_UsoCFDI : number, Id_FormaPago : number, JsonProductos : string): Observable<number> {
    return this.http.post<number>(this.urlFacturacionExterna + '?Id_ClienteEmisor=' + Id_ClienteEmisor + '&Id_ClienteReceptor=' + Id_ClienteReceptor + '&Id_DatosFiscales=' + Id_DatosFiscales + '&Id_UsoCFDI=' + Id_UsoCFDI + '&Id_FormaPago=' + Id_FormaPago + '&JsonProductos=' + JsonProductos, '', this.httpOptions);
  }
  
}
