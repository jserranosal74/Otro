import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { plancliente } from 'src/app/Models/procesos/plancliente.model';

@Component({
  selector: 'app-tarjetaplanescliente',
  templateUrl: './tarjetaplanescliente.component.html',
  styleUrls: ['./tarjetaplanescliente.component.css']
})
export class TarjetaPlanesClienteComponent implements OnInit {

  @Input() _planCliente : plancliente = new plancliente(0,0,0,'',0,0,0,null,new Date(),new Date(),0,0);
  @Input() _tipoTarjeta : string = '';

  @Output() _seEligePlanCliente = new EventEmitter<boolean>();
  // @Output() _sePresionaEditar = new EventEmitter<boolean>();
  // @Output() _sePresionaPredeterminado = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  elegirPlanCliente(){
    this._seEligePlanCliente.emit(true);
  }

}