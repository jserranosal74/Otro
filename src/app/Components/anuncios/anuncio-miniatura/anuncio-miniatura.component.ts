import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { publicacion } from '../../../Models/procesos/publicacion.model';

@Component({
  selector: 'app-anuncio-miniatura',
  templateUrl: './anuncio-miniatura.component.html',
  styleUrls: ['./anuncio-miniatura.component.css']
})
export class AnuncioMiniaturaComponent implements OnInit {
  _ligaPublicacion : string = '';
  @Input() _publicacion : publicacion = new publicacion(0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null, null, null, new Date(), new Date(),0,0);

  constructor( private _router : Router) {

    this._ligaPublicacion = '/publicar/operaciontipoinmueble?id_Publicacion=' + this._publicacion.Id_Publicacion;

    // this._publicacion.Id_Publicacion;

   }

  ngOnInit(): void {
  }

  editarPagina(){
    this._router.navigateByUrl('publicar/operaciontipoinmueble?id_Publicacion=' + this._publicacion.Id_Publicacion);

  }

}
