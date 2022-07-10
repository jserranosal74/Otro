import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { indicador } from '../../Models/catalogos/indicador.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class IndicadoresService {
  public urlIndicadores: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlIndicadores = URL_APIS.urlIndicadores;
  }

  public getIndicadores(Id_Indicador : number | null, VisibleCliente : number | null): Observable<indicador[]> {
    return this.http.get<indicador[]>(this.urlIndicadores + '?Id_Indicador=' + (Id_Indicador === null ? '' : Id_Indicador) + '&VisibleCliente=' + (VisibleCliente === null ? '' : VisibleCliente), this.httpOptions);
  }

  public postIndicador(objIndicador : indicador): Observable<number> {
    return this.http.post<number>(this.urlIndicadores, objIndicador, this.httpOptions);
  }

  public putIndicador(objIndicador : indicador): Observable<number> {
    return this.http.put<number>(this.urlIndicadores, objIndicador, this.httpOptions);
  }

  public deleteIndicador(Id_Indicador : number): Observable<number> {
    return this.http.delete<number>(this.urlIndicadores + '?Id_Indicador=' + Id_Indicador, this.httpOptions);
  }

}
