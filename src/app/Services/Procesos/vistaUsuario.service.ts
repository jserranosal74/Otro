import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { vistaUsuario } from 'src/app/Models/procesos/vistaUsuario.model';

@Injectable({
  providedIn: 'root'
})

export class VistaUsuarioService {
  public urlVistasUsuarios: string;

  constructor( private http: HttpClient, 
               private _loginService: LoginService ) { 
    this.urlVistasUsuarios = URL_APIS.urlVistasUsuarios;
  }

  public postVistaUsuario(objVistaUsuario: vistaUsuario): Observable<number> {
    return this.http.post<number>(this.urlVistasUsuarios, objVistaUsuario);
  }

}
