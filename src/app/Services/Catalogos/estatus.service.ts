import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { estatus } from 'src/app/Models/catalogos/estatus.model';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {
  public urlEstatus: string;

  constructor(private http: HttpClient) { 
    this.urlEstatus = URL_APIS.urlEstatus;
  }

  public getEstatusProceso(strProceso : string): Observable<estatus[]> {
    return this.http.get<estatus[]>(this.urlEstatus + '?strProceso=' + strProceso);
  }

}
