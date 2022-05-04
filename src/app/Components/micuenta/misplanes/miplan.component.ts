import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { PlanesclienteService } from '../../../Services/Procesos/planesCliente.service';
import { plancliente } from '../../../Models/procesos/plancliente.model';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { plan } from 'src/app/Models/catalogos/planes.model';
import { PlanesService } from 'src/app/Services/Catalogos/planes.service';

@Component({
  selector: 'app-miplan',
  templateUrl: './miplan.component.html',
  styleUrls: ['./miplan.component.css'],
})
export class MisplanesComponent implements OnInit {

  _planes : plan[] = [];
  _planesCliente : plancliente[] = [];
  _planCliente : plancliente = new plancliente(0,0,0,null,'',0,0,0,0,'',new Date(),null,null,new Date(),new Date(),0,'',0);
  _planSeleccionado : number = 0;

  @ViewChild('myModalClose') modalClose : any;
  // @ViewChild('verformaInmobiliaria') formaInmobiliaria : any;

  // formaAgregarPlan = this.fb.group({
  //   plan: ['', Validators.required]
  // });

  constructor(  private _planClienteService: PlanesclienteService,
                private _loginService : LoginService,
                private _planService : PlanesService
  ) {
    // this.crearFormulario();
    this.obtenerMisPlanes();
    this.obtenerPlanesDisponibles();
  }

  ngOnInit(): void {}

  obtenerMisPlanes() {
    let Id_Usuario = this._loginService.obtenerIdCliente();
    this._planClienteService.getPlanesCliente(Id_Usuario, null).subscribe(
      (data) => {
        //console.log('----datos---: ', data);

        this._planesCliente = data;

        //this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback

        switch (error.status) {
          case 401:
            Swal.fire({
              icon: 'error',
              title: 'Acceso no autorizado',
              text: 'debera autenticarse',
              showCancelButton: false,
              showDenyButton: false,
            });
            this._loginService.cerarSesion();
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

  obtenerPlanesDisponibles() {
    let Id_Usuario = this._loginService.obtenerIdCliente();
    this._planService.getPlanes().subscribe(
      (data) => {

        data.forEach((element,index)=>{
          if(element.Id_Plan === 1) data.splice(index,1);
        });

        this._planes = data;

        //this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback

        switch (error.status) {
          case 401:
            Swal.fire({
              icon: 'error',
              title: 'Acceso no autorizado',
              text: 'debera autenticarse',
              showCancelButton: false,
              showDenyButton: false,
            });
            this._loginService.cerarSesion();
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

  comprarPlan(objPlan : plan){
    //debugger;
    this._planCliente.Id_Cliente = this._loginService.obtenerIdCliente();
    this._planCliente.Id_Plan = objPlan.Id_Plan;

    this._planClienteService.postPlanesCliente(this._planCliente.Id_Cliente, this._planCliente.Id_Plan).subscribe(
      (data) => {
        //console.log('datos: ',data);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'Se adquirio el plan de manera correcta.'
        });

        this.modalClose.nativeElement.click();

        this.obtenerMisPlanes();

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback

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
