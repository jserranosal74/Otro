import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { tipoOperacion } from '../../Models/catalogos/tipoOperacion.model';

@Injectable({
  providedIn: 'root'
})
export class TiposOperacionService {
  public urlTipoOperacion: string;

  constructor(private http: HttpClient) { 
    this.urlTipoOperacion = URL_APIS.urlTipoOperacion;
  }

  public getTiposOperacion(): Observable<tipoOperacion[]> {
    return this.http.get<tipoOperacion[]>(this.urlTipoOperacion);
  }

}
