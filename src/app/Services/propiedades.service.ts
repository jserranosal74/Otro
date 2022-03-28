import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tipoPropiedad } from '../Models/catalogos/tipoPropiedad.model';
import { URL_APIS } from './global';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {
  public urlTiposPropiedad: string;

  constructor(private http: HttpClient) { 
    this.urlTiposPropiedad = URL_APIS.urlTipoPropiedad;
  }

  public getTiposPropiedad(): Observable<tipoPropiedad[]> {
    return this.http.get<tipoPropiedad[]>(this.urlTiposPropiedad);
  }

}
