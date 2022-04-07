import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { amenidad } from '../../Models/catalogos/amenidades.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class AmenidadesService {
  public urlAmenidades: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlAmenidades = URL_APIS.urlAmenidades;
  }

  public getAmenidad(Id_Amenidad : number): Observable<amenidad> {
    return this.http.get<amenidad>(this.urlAmenidades + Id_Amenidad);
  }

  public getAmenidades(): Observable<amenidad[]> {
    return this.http.get<amenidad[]>(this.urlAmenidades);
  }

  public putAmenidad(objAmenidad: amenidad): Observable<amenidad> {
    return this.http.put<amenidad>(this.urlAmenidades + objAmenidad.Id_Amenidad, objAmenidad, this.httpOptions);
  }

  public postAmenidad(objAmenidad: amenidad): Observable<amenidad> {
    return this.http.post<amenidad>(this.urlAmenidades, objAmenidad, this.httpOptions);
  }

  public deleteAmenidad(Id_Amenidad : number): Observable<amenidad> {
    return this.http.delete<amenidad>(this.urlAmenidades + Id_Amenidad, this.httpOptions);
  }

}
