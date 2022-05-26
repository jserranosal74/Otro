import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { publicacionInfoMini } from 'src/app/Models/procesos/publicacion.model';

@Component({
  selector: 'app-anuncio-vista-buscador',
  templateUrl: './anuncio-vista-buscador.component.html',
  styleUrls: ['./anuncio-vista-buscador.component.css']
})
export class AnuncioVistaBuscadorComponent implements OnInit {
  @Input() _publicacionCliente! : publicacionInfoMini;

  @Output() _contactarPorWhatsApp = new EventEmitter<publicacionInfoMini>();
  @Output() _contactarPorMensaje = new EventEmitter<publicacionInfoMini>();
  @Output() _seAgregaFavorito = new EventEmitter<publicacionInfoMini>();

  constructor() { }

  ngOnInit(): void {
  }

  contactarPorWhatsApp(){
    this._contactarPorWhatsApp.emit(this._publicacionCliente);
  }

  contactarPorMensaje(){
    this._contactarPorMensaje.emit(this._publicacionCliente);
  }

  seAgregaFavorito(){
    this._seAgregaFavorito.emit(this._publicacionCliente);
  }

  seAbreVistaPropiedad(){
    window.open('anuncio/vista/' + (this._publicacionCliente.TituloPublicacion)?.replaceAll(' ','-') + '-' + this._publicacionCliente.Id_Publicacion);
  }

}
