import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from './global';
import { estado } from '../Models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  public urlEstados: string;

  constructor(private http: HttpClient) { 
    this.urlEstados = URL_APIS.urlEstados;
  }

  public getEstados(Id_Pais : number): Observable<estado[]> {
    return this.http.get<estado[]>(this.urlEstados);
  }

}
