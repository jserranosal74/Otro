import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { banco } from 'src/app/Models/catalogos/banco.model';

@Component({
  selector: 'app-tarjetabanco',
  templateUrl: './tarjetabanco.component.html',
  styleUrls: ['./tarjetabanco.component.css']
})
export class TarjetabancoComponent implements OnInit {

  @Input() _banco : banco = new banco(0,'','','','','',0,new Date(),new Date(),0,0,0);
  @Input() _origen : string = '';

  @Output() _seEligeBanco = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  elegirBanco(){
    this._seEligeBanco.emit(this._banco.Id_Banco);
  }

}