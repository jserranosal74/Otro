import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { factura } from '../../../Models/catalogos/factura.model';

@Component({
  selector: 'app-tarjetafactura',
  templateUrl: './tarjetafactura.component.html',
  styleUrls: ['./tarjetafactura.component.css']
})
export class TarjetafacturaComponent implements OnInit {

  @Input() _factura : factura = new factura(0,0,0,0,0,'',0,new Date(),new Date(),'','','');
  @Input() _origen : string = '';

  @Output() _verDetalleFactura = new EventEmitter<boolean>();
  @Output() _enviarFactura = new EventEmitter<boolean>();

  constructor( ) { }

  ngOnInit(): void {
  }

  verDetalleFactura(){
    this._verDetalleFactura.emit(true);
  }

  enviarFactura(){
    this._enviarFactura.emit(true);
  }

}
