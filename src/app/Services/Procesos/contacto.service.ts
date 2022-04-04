import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { contacto } from 'src/app/Models/ayuda/contacto/contacto.model';

@Injectable({
  providedIn: 'root'
})

export class ContactoService {
  public urlContacto: string;

  constructor(private http: HttpClient) { 
    this.urlContacto = URL_APIS.urlContacto;
  }

  public postContacto(objContacto: contacto): Observable<contacto> {
    return this.http.post<contacto>(this.urlContacto, objContacto);
  }

}
