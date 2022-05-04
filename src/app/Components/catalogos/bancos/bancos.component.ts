import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { banco } from 'src/app/Models/catalogos/banco.model';
import { BancosService } from 'src/app/Services/Catalogos/bancos.service';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent implements OnInit {
  _bancos : banco[] = [];

  constructor(private _bancosService: BancosService) {
    this.obtenerBancos();
   }

  ngOnInit(): void {
  }

  obtenerBancos(){
    this._bancosService.getBancos().subscribe(
      (data) => {

        data.forEach(item =>{
          this._bancos.push(new banco(item.Id_Banco,item.InstitucionBancaria,item.Sucursal,item.NumCuenta,item.ClabeInterbancaria,item.Titular,item.Orden,item.FechaAlta,item.FechaModificacion,item.Id_Usuario,item.Id_Estatus,0));
        });

      },
      (error: HttpErrorResponse) => {

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            break;
          case 409:
            break;
        }

      }
    );

  }


}
