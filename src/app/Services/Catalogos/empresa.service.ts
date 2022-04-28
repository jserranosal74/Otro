import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { empresa } from '../../Models/catalogos/empresa.model';

@Injectable({
  providedIn: 'root'
})

export class EmpresasService {
  public urlEmpresas: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlEmpresas = URL_APIS.urlEmpresas;
  }

  public getEmpresa(Id_Empresa : number): Observable<empresa> {
    return this.http.get<empresa>(this.urlEmpresas + Id_Empresa, this.httpOptions);
    // return this.http.get<empresa>(this.urlEmpresas + Id_Empresa, this.httpOptions)
    //                 .pipe( map( data => ({ 
    //                     Id_Empresa : data.Id_Empresa,
    //                     Nombre : data.Nombre,
    //                     Descripcion : data.Descripcion,
    //                     TipoEmpresa : data.TipoEmpresa,
    //                     MediosContacto : data.MediosContacto,
    //                     FechaAlta : data.FechaAlta,
    //                     FechaModificacion : data.FechaModificacion,
    //                     Id_Usuario : data.Id_Usuario,
    //                     Id_Estatus : data.Id_Estatus,
    //                  })));
  }

  public getEmpresas(): Observable<empresa[]> {
    return this.http.get<empresa[]>(this.urlEmpresas, this.httpOptions);
  }

  public putEmpresa(objEmpresa: empresa): Observable<empresa> {
    return this.http.put<empresa>(this.urlEmpresas + objEmpresa.Id_Empresa, objEmpresa, this.httpOptions);
  }

  public postEmpresa(objEmpresa: empresa): Observable<empresa> {
    return this.http.post<empresa>(this.urlEmpresas, objEmpresa, this.httpOptions);
  }

  public deleteEmpresa(Id_Empresa : number): Observable<empresa> {
    return this.http.delete<empresa>(this.urlEmpresas + Id_Empresa, this.httpOptions);
  }

}
