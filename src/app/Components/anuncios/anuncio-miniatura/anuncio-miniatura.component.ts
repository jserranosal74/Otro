import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { FavoritosClienteService } from 'src/app/Services/Procesos/misFavoritos.service';
import Swal from 'sweetalert2';

import { publicacionInfoMini, publicacionMultimedia } from '../../../Models/procesos/publicacion.model';
import { PublicacionesService } from '../../../Services/Procesos/publicaciones.service';
import { favoritoClienteParams } from '../../../Models/procesos/favoritoCliente.model';

@Component({
  selector: 'app-anuncio-miniatura',
  templateUrl: './anuncio-miniatura.component.html',
  styleUrls: ['./anuncio-miniatura.component.css']
})
export class AnuncioMiniaturaComponent implements OnInit {
  _ligaPublicacion : string = '';
  _listaFotografias : publicacionMultimedia[] = [];

  @Input() _publicacion : publicacionInfoMini = new publicacionInfoMini(0,0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),'',0,0,[]);
  @Input() _tipoBusqueda : string = 'misAnuncios';    // Pueden ser: misAnuncios, misFavoritos

  @Output() _seEliminoPublicacion = new EventEmitter<boolean>();
  @Output() _seCanceloPublicacion = new EventEmitter<boolean>();
  @Output() _seEliminaFavorito = new EventEmitter<boolean>();
  @Output() _seEligeCopiar = new EventEmitter<boolean>();

  constructor( private _loginService : LoginService,
               private _publicacionService : PublicacionesService,
               private _favoritosClienteService : FavoritosClienteService ) {

    this._ligaPublicacion = '/publicar/operacion-tipo-inmueble?Id_Publicacion=' + this._publicacion.Id_Publicacion;

   }

  ngOnInit(): void {
    this._publicacion.lstMultimedia?.forEach(item=>{
      if (item.Predeterminada === false)
        this._listaFotografias.push(item);
    });
  }

  eliminarAnuncio(){

    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que desea eliminar el anuncio: "' + (this._publicacion.TituloPublicacion === null ? 'Sin titulo' : this._publicacion.TituloPublicacion ) + '"?',
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

        this._publicacionService.deletePublicacion(this._publicacion.Id_Publicacion, this._loginService.obtenerIdCliente()!).subscribe(
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

  verPublicacionCliente(){
    window.open('propiedad/' + (this._publicacion.TituloPublicacion)?.replaceAll(' ','-') + '-' + this._publicacion.Id_Publicacion);
  }

  cancelarPublicacion(){
    this._seCanceloPublicacion.emit(true);
  }

  copiarPublicacion(){
    this._seEligeCopiar.emit(true);
  }

}
