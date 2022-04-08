import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { cliente } from 'src/app/Models/catalogos/cliente.model';
import { LoginService } from './login.service';

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

  public getClientes(): Observable<cliente[]> {
    return this.http.get<cliente[]>(this.urlClientes, this.httpOptions);
  }

  public getActivarCliente(token : string): Observable<number> {
    return this.http.get<number>(this.urlClientes + 'Activar?token=' + token);
  }

  public putCliente(objCliente: cliente): Observable<cliente> {
    return this.http.put<cliente>(this.urlClientes + objCliente.Id_Cliente, objCliente, this.httpOptions);
  }

  public postCliente(objCliente: cliente): Observable<cliente> {
    return this.http.post<cliente>(this.urlClientes, objCliente);
  }

  public deleteCliente(Id_Cliente : number): Observable<cliente> {
    return this.http.delete<cliente>(this.urlClientes + Id_Cliente, this.httpOptions);
  }

}
