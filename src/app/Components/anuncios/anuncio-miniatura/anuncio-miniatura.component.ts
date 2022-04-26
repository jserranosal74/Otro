import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { publicacion, publicacionInfoMini, imagenModel } from '../../../Models/procesos/publicacion.model';

@Component({
  selector: 'app-anuncio-miniatura',
  templateUrl: './anuncio-miniatura.component.html',
  styleUrls: ['./anuncio-miniatura.component.css']
})
export class AnuncioMiniaturaComponent implements OnInit {
  _ligaPublicacion : string = '';

  @Input() _publicacion : publicacionInfoMini = new publicacionInfoMini(0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),'');

  // @Input() _imagen : string | null = '';

  constructor( private _router : Router) {

    this._ligaPublicacion = '/publicar/operacion-tipo-inmueble?id_Publicacion=' + this._publicacion.Id_Publicacion;

    // this._publicacion.Id_Publicacion;

   }

  ngOnInit(): void {
  }

  editarAnuncio(){
    this._router.navigateByUrl('publicar/operacion-tipo-inmueble?id_Publicacion=' + this._publicacion.Id_Publicacion);
  }

  eliminarAnuncio(){
    //this._router.navigateByUrl('publicar/operacion-tipo-inmueble?id_Publicacion=' + this._publicacion.Id_Publicacion);
  }

  pagarYActivarAnuncio(){
    this._router.navigateByUrl('publicar/pagar-y-activar?id_Publicacion=' + this._publicacion.Id_Publicacion);
  }

  verAnuncio(){
    this._router.navigateByUrl('anuncio/preview/' + (this._publicacion.TituloPublicacion)?.replaceAll(' ','-') + '-' + this._publicacion.Id_Publicacion);
  }

}
