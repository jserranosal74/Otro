import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { login } from 'src/app/Models/Auxiliares/login.model';
import { Router } from '@angular/router';
import { usuario } from 'src/app/Models/Auxiliares/cliente.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  // private auth : gapi.auth2.GoogleAuth = new gapi.auth2.GoogleAuth();
  // private user : any;

  public urlLogin: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this.obtenerToken(),
    })
  };

  constructor(private http: HttpClient,
              //private zone: NgZone,
              private _router : Router) { 
    this.urlLogin = URL_APIS.urlLogin;

  }

  public iniciarSesion(objLogin: login): Observable<usuario> {
    return this.http.post<usuario>(this.urlLogin + 'authenticate/', objLogin);
  }

  public cerarSesion(){
    localStorage.removeItem('usuario');
    window.location.reload();
  }

  public recuperarPassword(objLogin: login): Observable<string> {
    return this.http.post<string>(this.urlLogin + 'recuperarpassword/', objLogin);
  }
  
  public validarToken(Token : string): Observable<string> {
    return this.http.get<string>(this.urlLogin + 'validartoken?token=' + Token);
  }
  
  public restablecerPassword(Token : string, Password : string): Observable<string> {
    return this.http.put<string>(this.urlLogin + 'restablecerpassword?Token=' + Token + '&Password=' + Password,'');
  }
  
  public obtenerTokenGoogle(): Observable<string> {
    return this.http.post<string>(this.urlLogin + 'obtenertokengoogle?credential=','');
  }

  // Servicios de autenticacion funcionando
  // public sesionValida(): Observable<boolean> {
  //   return this.http.get<boolean>(this.urlLogin + 'echoping/');
  // }

  // Servicios de autenticacion funcionando
  public usuarioAutenticadoServidor(): Observable<boolean> {
    if (this.obtenerToken() === ''){
      return this.http.get<boolean>(this.urlLogin + 'echouser/');
    }else{
      return this.http.get<boolean>(this.urlLogin + 'echouser/', this.httpOptions);
    }
  }

  public estaAutenticado(): boolean {
    
    if (localStorage.getItem('usuario')){
      return true;
    }
    else{
      return false;
    }
  }

  public obtenerRolUsuario(): string {
    if (localStorage.getItem('usuario'))
    {
      return JSON.parse(localStorage.getItem('usuario')!)['Rol'];
    }
    else{
      return '';
    }
  }

  public obtenerIdCliente(): number {
    if (localStorage.getItem('usuario'))
    {
      return JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];
    }
    else{
      return 0;
    }
  }

  public obtenerIdEmpresa(): number {
    if (localStorage.getItem('usuario'))
    {
      return JSON.parse(localStorage.getItem('usuario')!)['Id_Empresa'];
    }
    else{
      return 0;
    }
  }

  // public obtenerIdEmpresaCliente(): number {
  //   if (localStorage.getItem('usuario'))
  //   {
  //     return JSON.parse(localStorage.getItem('usuario')!)['Id_EmpresaCliente'];
  //   }
  //   else{
  //     return 0;
  //   }
  // }

  public obtenerNombreCliente(): string {
    if (localStorage.getItem('usuario'))
    {
      return JSON.parse(localStorage.getItem('usuario')!)['NombreUsuario'];
    }
    else{
      return '';
    }
  }

  public obtenerUrlFotoCliente(): string {
    if (localStorage.getItem('usuario'))
    {
      return JSON.parse(localStorage.getItem('usuario')!)['UrlFotoPerfil'];
    }
    else{
      return '';
    }
  }

  public obtenerToken(): string {
    if (localStorage.getItem('usuario'))
    {
      return JSON.parse(localStorage.getItem('usuario')!)['Token'];
    }
    else{
      return '';
    }
  }

}
