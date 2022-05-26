import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { plan } from 'src/app/Models/catalogos/planes.model';
import { LoginService } from './login.service';
import { paquete } from 'src/app/Models/catalogos/paquetes.model';

@Injectable({
  providedIn: 'root'
})
export class PaquetesService {
  public urlPaquetes: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlPaquetes = URL_APIS.urlPaquetes;
  }

  public getPaquete(Id_Paquete : number | null, Id_Empresa : number | null): Observable<paquete> {
    return this.http.get<paquete>(this.urlPaquetes + '?Id_Paquete=' + Id_Paquete + '&Id_Empresa=' + Id_Empresa, this.httpOptions);
  }

  public getPaquetes(): Observable<paquete[]> {
    return this.http.get<paquete[]>(this.urlPaquetes + '?Id_Paquete=&Id_Empresa=', this.httpOptions);
  }

  public putPaquete(objPaquete: paquete): Observable<paquete> {
    return this.http.put<paquete>(this.urlPaquetes, objPaquete, this.httpOptions);
  }

  public postPaquete(objPaquete: paquete): Observable<paquete> {
    return this.http.post<paquete>(this.urlPaquetes, objPaquete, this.httpOptions);
  }

  public deletePaquete(Id_Paquete : number): Observable<paquete> {
    return this.http.delete<paquete>(this.urlPaquetes + Id_Paquete, this.httpOptions);
  }

}
