import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { plan } from 'src/app/Models/catalogos/planes.model';

@Component({
  selector: 'app-tarjetaplanes',
  templateUrl: './tarjetaplanes.component.html',
  styleUrls: ['./tarjetaplanes.component.css']
})
export class TarjetaplanesComponent implements OnInit {

  @Input() _plan : plan = new plan(0,'',0,0,0,'',new Date(),new Date(),0,0,0);
  @Input() _origen : string = '';

  @Output() _sePresionaComprar = new EventEmitter<boolean>();
  @Output() _sePresionaModificar = new EventEmitter<boolean>();
  @Output() _sePresionaEliminar = new EventEmitter<boolean>();
  @Output() _sePresionaElegirPlan = new EventEmitter<boolean>();
  //@Output() _seEligePlan = new EventEmitter<boolean>();
  // @Output() _sePresionaPredeterminado = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  comprarPlan(){
    this._sePresionaComprar.emit(true);
  }

  modificarPlan(){
    this._sePresionaModificar.emit(true);
  }

  elegirPlanCliente(){
    this._sePresionaElegirPlan.emit(true);
  }

  eliminarPlan(){
    this._sePresionaEliminar.emit(true);
  }

}