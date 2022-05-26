import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { empresa, empresaCliente } from '../../Models/catalogos/empresa.model';

@Injectable({
  providedIn: 'root'
})

export class EmpresaUsuariosService {
  public urlEmpresaClientes: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlEmpresaClientes = URL_APIS.urlEmpresaClientes;
  }

  public getEmpresaClientes(Id_Empresa : number | null): Observable<empresaCliente[]> {
    return this.http.get<empresaCliente[]>(this.urlEmpresaClientes + '?Id_Empresa=' + Id_Empresa, this.httpOptions);
  }

  public postEmpresaCliente(Id_Empresa : number, strEmailCliente : string): Observable<number> {
    return this.http.put<number>('/api/EmpresaClientes' + '?Id_Empresa=' + Id_Empresa + '&strEmailCliente=' + strEmailCliente, '', this.httpOptions);
  }

  public deleteEmpresaCliente(Id_Empresa : number, Id_Cliente: number): Observable<number> {
    return this.http.delete<number>(this.urlEmpresaClientes + '?Id_Empresa=' + Id_Empresa + '&Id_Cliente=' + Id_Cliente, this.httpOptions);
  }

}
