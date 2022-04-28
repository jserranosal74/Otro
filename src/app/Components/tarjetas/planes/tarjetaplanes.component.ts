import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { plan } from 'src/app/Models/catalogos/planes.model';

@Component({
  selector: 'app-tarjetaplanes',
  templateUrl: './tarjetaplanes.component.html',
  styleUrls: ['./tarjetaplanes.component.css']
})
export class TarjetaplanesComponent implements OnInit {

  @Input() _plan : plan = new plan(0,'',0,0,0,'',new Date(),new Date(),0,0);
  //@Input() _ComprarElegir : string = '';

  @Output() _sePresionaComprar = new EventEmitter<boolean>();
  //@Output() _seEligePlan = new EventEmitter<boolean>();
  // @Output() _sePresionaPredeterminado = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  comprarPlan(){
    this._sePresionaComprar.emit(true);
  }

  elegirPlan(){
    //this._seEligePlan.emit(true);
  }

  predeterminarDatoFiscal(){
    //this._sePresionaPredeterminado.emit(true);
  }

}