import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';

@Component({
  selector: 'app-activarcliente',
  templateUrl: './activarcliente.component.html',
  styleUrls: ['./activarcliente.component.css']
})
export class ActivarclienteComponent implements OnInit {
  token = '';
  mensaje = '';
  ExisteRespuesta = true;

  constructor( private _activatedRoute: ActivatedRoute,
               private _clienteService: ClientesService) { 
    
    this._activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.ActivarCliente();
  }

  ngOnInit(): void {
  }

  ActivarCliente(){
    this._clienteService.getActivarCliente(this.token).subscribe(data=>{
      this.ExisteRespuesta = true;
      switch (data) {
        case 1:
          this.mensaje = 'La cuenta ha sido activada de manera satisfactoria';
          break;
        case 2:
          this.mensaje = 'La cuenta ya se encuentra activada, solo necesita iniciar la sesión.';
          break;
        default:
          this.mensaje = 'Ocurrio un error en la activación de la cuenta.';
          break;
      }
      
    });

  }

}
