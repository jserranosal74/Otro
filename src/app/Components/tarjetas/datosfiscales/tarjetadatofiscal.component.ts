import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { datoFiscal } from '../../../Models/procesos/datosFiscales.model';

@Component({
  selector: 'app-tarjetadatofiscal',
  templateUrl: './tarjetadatofiscal.component.html',
  styleUrls: ['./tarjetadatofiscal.component.css']
})
export class TarjetaDatoFiscalComponent implements OnInit {

  @Input() _datoFiscal : datoFiscal = new datoFiscal(0,0,0,'','','','',0,new Date(),new Date(),0,0);

  @Output() _sePresionaEliminar = new EventEmitter<boolean>();
  @Output() _sePresionaEditar = new EventEmitter<boolean>();
  @Output() _sePresionaPredeterminado = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  eliminarDatoFiscal(){
    this._sePresionaEliminar.emit(true);
  }

  editarDatoFiscal(){
    this._sePresionaEditar.emit(true);
  }

  predeterminarDatoFiscal(){
    this._sePresionaPredeterminado.emit(true);
  }

}
