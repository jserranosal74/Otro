import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from './global';
import { municipio } from '../Models/municipio.model';

@Injectable({
  providedIn: 'root'
})

export class MunicipiosService {
  public urlMunicipios: string;

  constructor(private http: HttpClient) { 
    this.urlMunicipios = URL_APIS.urlMunicipios;
  }

  public getMunicipios(Id_Estado : number): Observable<municipio[]> {
    return this.http.get<municipio[]>(this.urlMunicipios  + '/' + Id_Estado);
  }

}
