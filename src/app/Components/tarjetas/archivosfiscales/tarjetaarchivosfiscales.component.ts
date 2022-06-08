import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { datoFiscal } from '../../../Models/procesos/datosFiscales.model';
import { archivoFiscal } from '../../../Models/catalogos/archivofiscal.model';

@Component({
  selector: 'app-tarjetaarchivosfiscales',
  templateUrl: './tarjetaarchivosfiscales.component.html',
  styleUrls: ['./tarjetaarchivosfiscales.component.css']
})
export class TarjetaArchivosFiscalesComponent implements OnInit {

  @Input() _archivoFiscal : archivoFiscal = new archivoFiscal(0,'','','','','',null,null,0,0,'');

  @Output() _sePresionaEliminar = new EventEmitter<boolean>();
  @Output() _seSeleccionaDatoFiscal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  eliminarArchivosFiscales(){
    this._sePresionaEliminar.emit(true);
  }

  seleccionarArchivosFiscales(){
    this._seSeleccionaDatoFiscal.emit(true);
  }

}
