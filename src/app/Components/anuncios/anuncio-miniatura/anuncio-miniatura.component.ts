import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { FavoritosClienteService } from 'src/app/Services/Procesos/misFavoritos.service';
import Swal from 'sweetalert2';

import { publicacionInfoMini } from '../../../Models/procesos/publicacion.model';
import { PublicacionesService } from '../../../Services/Procesos/publicaciones.service';
import { favoritoClienteParams } from '../../../Models/procesos/favoritoCliente.model';

@Component({
  selector: 'app-anuncio-miniatura',
  templateUrl: './anuncio-miniatura.component.html',
  styleUrls: ['./anuncio-miniatura.component.css']
})
export class AnuncioMiniaturaComponent implements OnInit {
  _ligaPublicacion : string = '';

  @Input() _publicacion : publicacionInfoMini = new publicacionInfoMini(0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),'');
  @Input() _tipoBusqueda : string = 'misAnuncios';    // Pueden ser: misAnuncios, misFavoritos
  @Output() _seEliminoPublicacion = new EventEmitter<boolean>();
  @Output() _seEliminaFavorito = new EventEmitter<boolean>();

  constructor( private _router : Router,
               private _loginService : LoginService,
               private _publicacionService : PublicacionesService,
               private _favoritosClienteService : FavoritosClienteService ) {

    this._ligaPublicacion = '/publicar/operacion-tipo-inmueble?id_Publicacion=' + this._publicacion.Id_Publicacion;

   }

  ngOnInit(): void {
  }

  editarAnuncio(){
    this._router.navigateByUrl('publicar/operacion-tipo-inmueble?id_Publicacion=' + this._publicacion.Id_Publicacion);
  }

  eliminarAnuncio(){

    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que desea eliminar el anuncio: "' + this._publicacion.TituloPublicacion + '"?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1',
        confirmButton: 'order-3',
        denyButton: 'order-2',
      },
      backdrop: ` rgba(128,128,128,0.4)
                  left top
                  no-repeat
                `
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this._publicacionService.deletePublicacion(this._publicacion.Id_Publicacion, this._publicacion.Id_Cliente).subscribe(
          (data) => {
            //Next callback

            this._seEliminoPublicacion.emit(true);
            
          },
          (error: HttpErrorResponse) => {
            //Error callback
            switch (error.status) {
              case 401:
                Swal.fire({
                  icon: 'error',
                  title: 'Acceso no autorizado',
                  text: 'debera autenticarse',
                  showCancelButton: false,
                  showDenyButton: false,
                });
                this._loginService.cerarSesion();
                break;
              case 403:
                break;
              case 404:
                break;
              case 409:
                break;
            }
          }
        );

        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  quitarFavorito(){

    let objFavoritosCliente : favoritoClienteParams = new favoritoClienteParams(this._loginService.obtenerIdCliente(), this._publicacion.Id_Cliente, this._publicacion.Id_Publicacion);

    this._favoritosClienteService.deleteFavoritoCliente(objFavoritosCliente).subscribe(
      (data) => {

        this._seEliminaFavorito.emit(true);
        
      },
      (error: HttpErrorResponse) => {
        //Error callback
        switch (error.status) {
          case 401:
            Swal.fire({
              icon: 'error',
              title: 'Acceso no autorizado',
              text: 'debera autenticarse',
              showCancelButton: false,
              showDenyButton: false,
            });
            this._loginService.cerarSesion();
            break;
          case 403:
            break;
          case 404:
            break;
          case 409:
            break;
        }
      }
    );

  }

  pagarYActivarAnuncio(){
    this._router.navigateByUrl('publicar/pagar-y-activar?id_Publicacion=' + this._publicacion.Id_Publicacion);
  }

  verAnuncio(){
    this._router.navigateByUrl('anuncio/preview/' + (this._publicacion.TituloPublicacion)?.replaceAll(' ','-') + '-' + this._publicacion.Id_Publicacion);
  }

}
