import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { paqueteEmpresa } from 'src/app/Models/catalogos/paquetesempresas.model';

@Injectable({
  providedIn: 'root'
})
export class PaquetesEmpresasService {
  public urlPaquetesEmpresas: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlPaquetesEmpresas = URL_APIS.urlPaquetesEmpresas;
  }

  // public getPaqueteEmpresa(Id_Paquete : number, Id_Empresa : number): Observable<paqueteEmpresa[]> {
  //   return this.http.get<paqueteEmpresa[]>(this.urlPaquetesEmpresas + '?Id_Paquete=' + Id_Paquete + '&Id_Empresa=' + Id_Empresa, this.httpOptions);
  // }

  public getPaquetesEmpresas(Id_Empresa : number | null, Id_Paquete : number | null): Observable<paqueteEmpresa[]> {
    return this.http.get<paqueteEmpresa[]>(this.urlPaquetesEmpresas + '?Id_Empresa=' + (Id_Empresa === null ? '' : Id_Empresa) + '&Id_Paquete=' + (Id_Paquete === null ? '' : Id_Paquete), this.httpOptions);
  }

  public putPaqueteEmpresa(objPaquete: paqueteEmpresa): Observable<number> {
    return this.http.put<number>(this.urlPaquetesEmpresas, objPaquete, this.httpOptions);
  }

  public deletePaqueteEmpresa(Id_Paquete : number, Id_Empresa : number): Observable<number> {
    return this.http.delete<number>(this.urlPaquetesEmpresas + '?Id_Paquete=' + Id_Paquete + '&Id_Empresa=' + Id_Empresa, this.httpOptions);
  }

}
