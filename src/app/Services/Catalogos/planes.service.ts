import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL_APIS } from '../global';
import { plan } from 'src/app/Models/catalogos/planes.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  public urlPlanes: string;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ` + this._loginService.obtenerToken(),
    })
  };

  constructor(private http: HttpClient, private _loginService: LoginService) { 
    this.urlPlanes = URL_APIS.urlPlanes;
  }

  public getPlan(Id_Plan : number): Observable<plan[]> {
    return this.http.get<plan[]>(this.urlPlanes + '?Id_Plan=' + Id_Plan + '&Visible=');
  }

  public getPlanes(Id_Plan : number | null, Visible : boolean | null): Observable<plan[]> {
    return this.http.get<plan[]>(this.urlPlanes + '?Id_Plan=' + Id_Plan + '&Visible=' + Visible);
  }

  public putPlan(objPlan: plan): Observable<plan> {
    return this.http.put<plan>(this.urlPlanes + objPlan.Id_Plan, objPlan, this.httpOptions);
  }

  public postPlan(objPlan: plan): Observable<plan> {
    return this.http.post<plan>(this.urlPlanes, objPlan, this.httpOptions);
  }

  public deletePlan(Id_Plan : number): Observable<plan> {
    return this.http.delete<plan>(this.urlPlanes + Id_Plan, this.httpOptions);
  }

}
