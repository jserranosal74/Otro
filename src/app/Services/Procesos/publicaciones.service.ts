import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { publicacion } from '../../Models/procesos/publicacion.model';

@Injectable({
  providedIn: 'root'
})

export class PublicacionesService {
  public urlPublicaciones: string;

  constructor(private http: HttpClient) { 
    this.urlPublicaciones = URL_APIS.urlPublicaciones;
  }

  public getPublicacion(Id_Publicacion : number): Observable<publicacion[]> {
    return this.http.get<publicacion[]>(this.urlPublicaciones);
  }

}
