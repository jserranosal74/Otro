import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { FavoritosClienteService } from 'src/app/Services/Procesos/misFavoritos.service';
import Swal from 'sweetalert2';

import { publicacionInfoMini, publicacionMultimedia } from '../../../Models/procesos/publicacion.model';
import { PublicacionesService } from '../../../Services/Procesos/publicaciones.service';
import { favoritoClienteParams } from '../../../Models/procesos/favoritoCliente.model';

@Component({
  selector: 'app-anuncio-inferior',
  templateUrl: './anuncio-inferior.component.html',
  styleUrls: ['./anuncio-inferior.component.css']
})
export class AnuncioInferiorComponent implements OnInit {
  _ligaPublicacion : string = '';
  _listaFotografias : publicacionMultimedia[] = [];

  @Input() _publicacionesEspeciales : publicacionInfoMini[] = [];
  @Input() _idControl : string = '';

  constructor( private _loginService : LoginService,
               private _publicacionService : PublicacionesService,
               private _favoritosClienteService : FavoritosClienteService ) {

    //this._ligaPublicacion = '/publicar/operacion-tipo-inmueble?Id_Publicacion=' + this._publicacion.Id_Publicacion;

   }

  ngOnInit(): void {
  }

  verPublicacionCliente(objPublicacion : publicacionInfoMini){
    window.open('/propiedad/' + (objPublicacion.TituloPublicacion)?.replaceAll(' ','-') + '-' + objPublicacion.Id_Publicacion);
  }

}
