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

  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.info = this._activatedRoute.snapshot.params['info'];
      this._Id_Publicacion = this._activatedRoute.snapshot.params['Id_Publicacion'];
    });
    debugger;
    this.cargarInfo();
  }

  ngOnInit(): void {
  }

  cargarInfo(){
    localStorage.setItem('usuario', this.info);
    if (this._Id_Publicacion == 0){
      window.location.href = '/';
    }
    else{
      window.location.href = '/anuncio/vista/publicacion-' + this._Id_Publicacion;
    }
  }

}
