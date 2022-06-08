import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { paquete, paqueteDetalle } from 'src/app/Models/catalogos/paquetes.model';

import { plan } from 'src/app/Models/catalogos/planes.model';

@Component({
  selector: 'app-tarjetapaquetes',
  templateUrl: './tarjetapaquetes.component.html',
  styleUrls: ['./tarjetapaquetes.component.css']
})
export class TarjetaPaquetesComponent implements OnInit {

  @Input() _paquete! : paquete;
  @Input() _origen : string = '';

  @Output() _sePresionaComprar = new EventEmitter<boolean>();
  @Output() _sePresionaModificar = new EventEmitter<boolean>();
  @Output() _sePresionaEliminar = new EventEmitter<boolean>();
  @Output() _sePresionaElegirPaquete = new EventEmitter<boolean>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  comprarPaquete(){
    this._sePresionaComprar.emit(true);
  }

  modificarPaquete(){
    this._sePresionaModificar.emit(true);
  }

  elegirPaqueteCliente(){
    this._sePresionaElegirPaquete.emit(true);
  }

  eliminarPaquete(){
    this._sePresionaEliminar.emit(true);
  }

}