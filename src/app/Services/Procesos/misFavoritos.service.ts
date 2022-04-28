import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { publicacion } from '../../Models/procesos/publicacion.model';
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

  public getFavoritosCliente(Id_Cliente : number, NumPagina : number, NumRenglones : number): Observable<favoritoCliente[]> {
    return this.http.get<favoritoCliente[]>(this.urlFavoritosCliente + '?Id_Cliente=' + Id_Cliente + '&NumPagina=' + NumPagina + '&NumRenglones=' + NumRenglones, this.httpOptions);
  }

  public getFavoritosClienteResumen(Id_Cliente : number, NumRenglones: number): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlFavoritosCliente + '?Id_Cliente=' + Id_Cliente + '&NumRenglones=' + NumRenglones, this.httpOptions);
  }

  public putFavoritoCliente(objParametrosFC: favoritoClienteParams): Observable<number> {
    return this.http.put<number>(this.urlFavoritosCliente, objParametrosFC, this.httpOptions);
  }

  public deleteFavoritoCliente(objParametrosFC: favoritoClienteParams): Observable<number> {
    const Options = {
        headers: new HttpHeaders({ Authorization: `Bearer ` + this._loginService.obtenerToken() }),
        body: objParametrosFC };
    return this.http.delete<number>(this.urlFavoritosCliente, Options);
  }

}
