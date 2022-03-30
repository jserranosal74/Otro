import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { amenidad } from '../../Models/catalogos/amenidades.model';

@Injectable({
  providedIn: 'root'
})

export class AmenidadesService {
  public urlAmenidades: string;

  constructor(private http: HttpClient) { 
    this.urlAmenidades = URL_APIS.urlAmenidades;
  }

  public getAmenidad(Id_Amenidad : number): Observable<amenidad> {
    return this.http.get<amenidad>(this.urlAmenidades + Id_Amenidad);
  }

  public getAmenidades(): Observable<amenidad[]> {
    return this.http.get<amenidad[]>(this.urlAmenidades);
  }

  public putAmenidad(objAmenidad: amenidad): Observable<amenidad> {
    return this.http.put<amenidad>(this.urlAmenidades + objAmenidad.Id_Amenidad, objAmenidad);
  }

  public postAmenidad(objAmenidad: amenidad): Observable<amenidad> {
    return this.http.post<amenidad>(this.urlAmenidades, objAmenidad);
  }

  public deleteAmenidad(Id_Amenidad : number): Observable<amenidad> {
    return this.http.delete<amenidad>(this.urlAmenidades + Id_Amenidad);
  }

}
