import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { plancliente } from 'src/app/Models/procesos/plancliente.model';

declare var bootstrap: any;

@Component({
  selector: 'app-tarjetaplanescliente',
  templateUrl: './tarjetaplanescliente.component.html',
  styleUrls: ['./tarjetaplanescliente.component.css']
})

export class TarjetaPlanesClienteComponent implements OnInit {

  @Input() _planCliente : plancliente = new plancliente(0,0,0,null,null,'',0,0,0,0,'',new Date(),null,null,null,null,new Date(),new Date(),0,'',0,false);
  @Input() _tipoTarjeta : string = '';
  @Input() _enviando : boolean = false;

  @Output() _seEligePlanCliente = new EventEmitter<boolean>();
  @Output() _enviarInfoPagoPlan = new EventEmitter<boolean>();
  @Output() _verDatosFiscales = new EventEmitter<boolean>();
  @Output() _eliminarPlanCliente = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    // Bootstrap tooltip initialization
    // var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    // var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    //   return new bootstrap.Popover(popoverTriggerEl)
    // })
  }

  elegirPlanCliente(){
    this._seEligePlanCliente.emit(true);
  }

  obtenerInfoPagoPlan(){
    this._enviarInfoPagoPlan.emit(true);
  }

  verDatosFiscales(){
    this._verDatosFiscales.emit(true);
  }

  eliminarPlanCliente(){
    this._eliminarPlanCliente.emit(true);
  }

}