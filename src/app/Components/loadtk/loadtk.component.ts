import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loadtk',
  templateUrl: './loadtk.component.html',
  styleUrls: ['./loadtk.component.css']
})
export class LoadtkComponent implements OnInit {
  info : string = '';
  _Id_Publicacion : number | null = null;
  _urlRedirect : string | null = null;

  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.info = this._activatedRoute.snapshot.params['info'];
      this._Id_Publicacion = this._activatedRoute.snapshot.params['Id_Publicacion'];
      this._urlRedirect = this._activatedRoute.snapshot.params['urlRedirect'];
    });
    debugger;
    this.cargarInfo();
  }

  ngOnInit(): void {
  }

  cargarInfo(){
    localStorage.setItem('usuario', this.info);
    if ((this._Id_Publicacion == 0) && (this._urlRedirect?.indexOf('inmobiliaria/iniciarsesion') === undefined) || (this._urlRedirect?.indexOf('inmobiliaria/iniciarsesion') === -1)){
      window.location.href = this._urlRedirect!;
    } else if ((this._Id_Publicacion == 0) && (this._urlRedirect?.indexOf('inmobiliaria/iniciarsesion') != undefined)){
      window.location.href = '/';
    }
    else{
      window.location.href = '/propiedad/publicacion-' + this._Id_Publicacion;
    }
  }

}
