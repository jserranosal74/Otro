import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { publicacionMensaje } from '../../../Models/procesos/publicacionMensaje.model';

@Component({
  selector: 'app-mensajeusuario',
  templateUrl: './mensajeusuario.component.html',
  styleUrls: ['./mensajeusuario.component.css']
})
export class MensajeusuarioComponent implements OnInit {
  @Input() _mensajeUsuario! : publicacionMensaje;

  @Output() _ResponderMensaje = new EventEmitter<boolean>();
  @Output() _ResponderWhatsApp = new EventEmitter<boolean>();
  @Output() _EliminarMensaje = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  responderMensaje(){
    this._ResponderMensaje.emit(true);
  }

  responderWhatsApp(){
    this._ResponderWhatsApp.emit(true);
  }

  eliminarMensaje(){
    this._EliminarMensaje.emit(true);
  }

}
