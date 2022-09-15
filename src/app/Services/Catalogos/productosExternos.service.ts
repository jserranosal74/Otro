import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { LoginService } from './login.service';
import { productoExterno } from '../../Models/catalogos/productoexterno.model';
import { paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosExternosService {
  public urlProductos: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlProductos = URL_APIS.urlProductos;
  }

  public getProducto(Id_Producto : number | null): Observable<productoExterno[]> {
    return this.http.get<productoExterno[]>(this.urlProductos + '?Id_Producto=' + Id_Producto, this.httpOptions);
  }

  public getProductos(): Observable<productoExterno[]> {
    return this.http.get<productoExterno[]>(this.urlProductos + '?Id_Producto=', this.httpOptions);
  }

  public getProductosPaginado(NumPagina : number | null, NumRenglones : number | null): Observable<productoExterno[]> {
    return this.http.get<productoExterno[]>(this.urlProductos + '?NumPagina=' + NumPagina + '&NumRenglones=' + NumRenglones, this.httpOptions);
  }

  public getProductosPaginadoDet(NumRenglones : number | null): Observable<paginadoDetalle> {
    return this.http.get<paginadoDetalle>(this.urlProductos + '?NumRenglones=' + NumRenglones, this.httpOptions);
  }

  public putProducto(objProducto: productoExterno): Observable<productoExterno> {
    return this.http.put<productoExterno>(this.urlProductos, objProducto, this.httpOptions);
  }

  public postProducto(objProducto: productoExterno): Observable<productoExterno> {
    return this.http.post<productoExterno>(this.urlProductos, objProducto, this.httpOptions);
  }

  public deleteProducto(Id_Producto : number): Observable<productoExterno> {
    return this.http.delete<productoExterno>(this.urlProductos + '?Id_Producto=' + Id_Producto, this.httpOptions);
  }

}
