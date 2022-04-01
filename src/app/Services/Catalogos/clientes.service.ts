import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { cliente } from 'src/app/Models/catalogos/cliente.model';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  public urlClientes: string;

  constructor(private http: HttpClient) { 
    this.urlClientes = URL_APIS.urlClientes;
  }

  public getCliente(Id_Cliente : number): Observable<cliente> {
    return this.http.get<cliente>(this.urlClientes + Id_Cliente);
  }

  public getClientes(): Observable<cliente[]> {
    return this.http.get<cliente[]>(this.urlClientes);
  }

  public putCliente(objCliente: cliente): Observable<cliente> {
    return this.http.put<cliente>(this.urlClientes + objCliente.Id_Cliente, objCliente);
  }

  public postCliente(objCliente: cliente): Observable<cliente> {
    return this.http.post<cliente>(this.urlClientes, objCliente);
  }

  public deleteCliente(Id_Cliente : number): Observable<cliente> {
    return this.http.delete<cliente>(this.urlClientes + Id_Cliente);
  }

}
