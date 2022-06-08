import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { paqueteCliente, planClienteDetalle } from 'src/app/Models/procesos/paquetecliente.model';

import { plancliente } from 'src/app/Models/procesos/plancliente.model';

declare var bootstrap: any;

@Component({
  selector: 'app-tarjetapaquetescliente',
  templateUrl: './tarjetapaquetescliente.component.html',
  styleUrls: ['./tarjetapaquetescliente.component.css']
})

export class TarjetaPaquetesClienteComponent implements OnInit {

  @Input() _paqueteCliente! : paqueteCliente;
  @Input() _tipoTarjeta : string = '';
  @Input() _enviando : boolean = false;

  @Output() _seEligePaqueteCliente = new EventEmitter<boolean>();
  @Output() _seEligePlanPaqueteCliente = new EventEmitter<planClienteDetalle>();
  @Output() _enviarInfoPagoPaquete = new EventEmitter<boolean>();
  @Output() _verDatosFiscales = new EventEmitter<boolean>();
  @Output() _eliminarPaqueteCliente = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  elegirPlanCliente(objPlanPaquete : planClienteDetalle){

    this._paqueteCliente.Detalle?.forEach(item => {
        item.Seleccionado = false;
    });

    objPlanPaquete.Seleccionado = true;
    this._seEligePlanPaqueteCliente.emit(objPlanPaquete);
  }

  obtenerInfoPagoPlan(){
    this._enviarInfoPagoPaquete.emit(true);
  }

  verDatosFiscales(){
    this._verDatosFiscales.emit(true);
  }

  eliminarPaqueteCliente(){
    this._eliminarPaqueteCliente.emit(true);
  }

}