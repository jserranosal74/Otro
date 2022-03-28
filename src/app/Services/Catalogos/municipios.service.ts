import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { municipio } from '../../Models/catalogos/municipio.model';

@Injectable({
  providedIn: 'root'
})

export class MunicipiosService {
  public urlBusquedasMunicipio: string;

  constructor(private http: HttpClient) { 
    this.urlBusquedasMunicipio = URL_APIS.urlBusquedasMunicipio;
  }

  public getMunicipios(Id_Estado : number): Observable<municipio[]> {
    return this.http.get<municipio[]>(this.urlBusquedasMunicipio + Id_Estado);
  }

}
