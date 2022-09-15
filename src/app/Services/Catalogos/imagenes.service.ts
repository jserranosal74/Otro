import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { imagen } from 'src/app/Models/catalogos/imagen.model';

@Injectable({
  providedIn: 'root'
})

export class ImagenesService {
  public urlImagenes: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlImagenes = URL_APIS.urlImagenes;
  }

  public getImagenes(Id_Imagen : number | null): Observable<imagen[]> {
    return this.http.get<imagen[]>(this.urlImagenes + '?Id_Imagen=' + Id_Imagen);
  }

}
