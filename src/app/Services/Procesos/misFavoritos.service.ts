import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from '../Catalogos/login.service';
import { paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { favoritoClienteParams } from 'src/app/Models/procesos/favoritoCliente.model';
import { favoritoCliente } from '../../Models/procesos/favoritoCliente.model';

@Injectable({
  providedIn: 'root'
})

export class FavoritosClienteService {
  public urlFavoritosCliente: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlFavoritosCliente = URL_APIS.urlFavoritosCliente;
  }

  public getFavoritosCliente(UID_Cliente : string, NumPagina : number, NumRenglones : number): Observable<favoritoCliente[]> {
    return this.http.get<favoritoCliente[]>(this.urlFavoritosCliente + '?Id_Cliente=' + UID_Cliente + '&NumPagina=' + NumPagina + '&NumRenglones=' + NumRenglones, this.httpOptions);
  }

  public getFavoritoCliente(Id_Cliente_FavoritoCliente : string, UID_Cliente : string, Id_Publicacion : number): Observable<number> {
    return this.http.get<number>(this.urlFavoritosCliente + '?Id_Cliente_FavoritoCliente=' + Id_Cliente_FavoritoCliente + '&Id_Cliente=' + UID_Cliente + '&Id_Publicacion=' + Id_Publicacion, this.httpOptions);
  }

  public getFavoritosClienteResumen(UID_Cliente : string, NumRenglones: number): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlFavoritosCliente + '?Id_Cliente=' + UID_Cliente + '&NumRenglones=' + NumRenglones, this.httpOptions);
  }

  public postFavoritoCliente(objParametrosFC: favoritoClienteParams): Observable<number> {
    return this.http.post<number>(this.urlFavoritosCliente, objParametrosFC, this.httpOptions);
  }

  public deleteFavoritoCliente(objParametrosFC: favoritoClienteParams): Observable<number> {
    const Options = {
        headers: new HttpHeaders({ Authorization: `Bearer ` + this._loginService.obtenerToken() }),
        body: objParametrosFC };
    return this.http.delete<number>(this.urlFavoritosCliente, Options);
  }

}
