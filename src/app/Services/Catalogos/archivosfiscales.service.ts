import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { archivoFiscal } from 'src/app/Models/catalogos/archivofiscal.model';

@Injectable({
  providedIn: 'root'
})

export class ArchivosFiscalesService {
  public urlArchivosFiscales: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlArchivosFiscales = URL_APIS.urlArchivosFiscales;
  }

  public getArchivoFiscal(Id_Estatus : number | null): Observable<archivoFiscal> {
    return this.http.get<archivoFiscal>(this.urlArchivosFiscales + '?Id_Estatus=' + Id_Estatus, this.httpOptions);
  }

  public getArchivosFiscales(): Observable<archivoFiscal[]> {
    return this.http.get<archivoFiscal[]>(this.urlArchivosFiscales + '?Id_Estatus=', this.httpOptions);
  }

  public putArchivoFiscal(objArchivoFiscal : archivoFiscal): Observable<number> {
    return this.http.put<number>(this.urlArchivosFiscales, objArchivoFiscal, this.httpOptions);
  }

  public deleteArchivoFiscal(Id_ArchivoFiscal : number | null): Observable<number> {
    return this.http.delete<number>(this.urlArchivosFiscales + '?Id_ArchivoFiscal=' + Id_ArchivoFiscal, this.httpOptions);
  }

}
