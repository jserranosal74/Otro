import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { cliente, clienteVista } from 'src/app/Models/catalogos/cliente.model';
import { LoginService } from './login.service';
import { factura } from 'src/app/Models/catalogos/factura.model';

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

  public getCliente(Id_Cliente : number): Observable<cliente> {
    return this.http.get<cliente>(this.urlClientes + Id_Cliente, this.httpOptions);
  }

  public getClienteVista(Id_Cliente : number): Observable<clienteVista> {
    return this.http.get<clienteVista>(this.urlClientes + '?Id_Cliente=' + Id_Cliente);
  }

  public getClientes(): Observable<cliente[]> {
    return this.http.get<cliente[]>(this.urlClientes, this.httpOptions);
  }

  public getActivarCliente(token : string): Observable<number> {
    return this.http.get<number>(this.urlClientes + 'Activar?token=' + token);
  }

  public putCliente(objCliente: cliente): Observable<number> {
    return this.http.put<number>(this.urlClientes + objCliente.Id_Cliente, objCliente, this.httpOptions);
  }

  public postCliente(objCliente: cliente): Observable<cliente> {
    return this.http.post<cliente>(this.urlClientes, objCliente, this.httpOptions);
  }

  public deleteCliente(Id_Cliente : number): Observable<cliente> {
    return this.http.delete<cliente>(this.urlClientes + Id_Cliente, this.httpOptions);
  }

}
