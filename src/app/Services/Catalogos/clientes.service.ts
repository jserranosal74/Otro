import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { cliente, clienteVista } from 'src/app/Models/catalogos/cliente.model';
import { LoginService } from './login.service';
import { paginadoDetalle } from '../../Models/catalogos/asentamiento.model';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  public urlClientes: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlClientes = URL_APIS.urlClientes;
  }

  public getCliente(UID_Cliente : string | null, Email : string | null): Observable<cliente> {
    return this.http.get<cliente>(this.urlClientes + '?Id_Cliente=' + UID_Cliente + '&Email=' + (Email === null ? '' : Email) + '&Id_Estatus=', this.httpOptions);
  }

  public getClienteVista(UID_Cliente : string | null, Email : string | null): Observable<clienteVista> {
    return this.http.get<clienteVista>(this.urlClientes + '?UID_Cliente=' + UID_Cliente + '&Email=' + (Email === null ? '' : Email));
  }

  public getClienteVistaCliente(Id_Cliente : number, Email : string | null): Observable<clienteVista> {
    return this.http.get<clienteVista>(this.urlClientes + '?Id_Cliente=' + Id_Cliente + '&Email=' + (Email === null ? '' : Email));
  }

  // public getClientes(): Observable<cliente[]> {
  //   return this.http.get<cliente[]>(this.urlClientes, this.httpOptions);
  // }

  public getClientesPaginado(UID_Cliente : string | null, Id_Cliente : number | null, Email : string | null, Id_TipoCliente : number | null, Id_Estatus : number | null, NumPagina : number | null, NumRenglones : number | null): Observable<cliente[]> {
    return this.http.get<cliente[]>(this.urlClientes + '?UID_Cliente=' + UID_Cliente + '&Id_Cliente=' + Id_Cliente + '&Email=' + Email + '&Id_TipoCliente=' + Id_TipoCliente + '&Id_Estatus=' + Id_Estatus + '&NumPagina=' + NumPagina + '&NumRenglones=' + NumRenglones, this.httpOptions);
  }

  public getClientesPaginadoDet(UID_Cliente : string | null, Id_Cliente : number | null, Email : string | null, Id_TipoCliente : number | null, Id_Estatus : number | null, NumRenglones : number | null): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlClientes + '?UID_Cliente=' + UID_Cliente + '&Id_Cliente=' + Id_Cliente + '&Email=' + Email + '&Id_TipoCliente=' + Id_TipoCliente + '&Id_Estatus=' + Id_Estatus + '&NumRenglones=' + NumRenglones, this.httpOptions);
  }

  public getActivarCliente(token : string): Observable<number> {
    return this.http.get<number>(this.urlClientes + 'Activar?token=' + token);
  }

  public putCliente(objCliente: cliente): Observable<number> {
    return this.http.put<number>(this.urlClientes + objCliente.Id_Cliente, objCliente, this.httpOptions);
  }

  public postCliente(objCliente: cliente): Observable<cliente> {
    return this.http.post<cliente>(this.urlClientes, objCliente);
  }

  public deleteCliente(Id_Cliente : number): Observable<cliente> {
    return this.http.delete<cliente>(this.urlClientes + Id_Cliente, this.httpOptions);
  }

}
