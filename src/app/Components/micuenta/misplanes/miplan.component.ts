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

  _Planes : plan[] = [];
  _planesCliente : plancliente[] = [];
  _planCliente : plancliente = new plancliente(0,0,0,'',0,0,0,null,null,null,0,0);
  _planSeleccionado : number = 0;

  @ViewChild('myModalClose') modalClose : any;
  // @ViewChild('verformaInmobiliaria') formaInmobiliaria : any;

  formaAgregarPlan = this.fb.group({
    plan: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private _planClienteService: PlanesclienteService,
    private _loginService : LoginService,
    private _planService : PlanesService
  ) {
    this.crearFormulario();
    this.obtenerMisPlanes();
    this.obtenerPlanesDisponibles();
  }

  ngOnInit(): void {}

  crearFormulario() {
    this.formaAgregarPlan = this.fb.group({
      plan: ['', Validators.required]
    });
  }

  limpiarFormulario(){
    // Reseteo de la información
    this.formaAgregarPlan.reset({
      plan: ''
    });
  }

  obtenerDetallePlan(objPlanCliente: plancliente) {
    Swal.fire({
      icon: 'success',
      title: 'Aqui se mostrara el detalle del plan',
      text: 'Registro: ' + objPlanCliente.Descripcion + ' - ' + objPlanCliente.Id_PlanCliente,
      showCancelButton: false,
      showDenyButton: false,
    });
  }

  obtenerMisPlanes() {
    let Id_Usuario = this._loginService.obtenerIdCliente();
    this._planClienteService.getPlanesCliente(Id_Usuario).subscribe(
      (data) => {
        //console.log('----datos---: ', data);

        this._planesCliente = data;

        //this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

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
            //console.log('error 403');
            break;
          case 404:
            //console.log('error 404');
            break;
          case 409:
            //console.log('error 409');
            break;
        }
      }
    );
  }

  obtenerPlanesDisponibles() {
    let Id_Usuario = this._loginService.obtenerIdCliente();
    this._planService.getPlanes().subscribe(
      (data) => {

        this._Planes = data;

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
            //this.router.navigateByUrl("/unauthorized");
            //console.log('error 403');
            break;
          case 404:
            //this.router.navigateByUrl("/unauthorized");
            //console.log('error 404');
            break;
          case 409:
            //this.router.navigateByUrl("/unauthorized");
            //console.log('error 409');
            break;
        }
      }
    );
  }

  guardarPlanCliente(){

    if (this.formaAgregarPlan.invalid) {
      return Object.values(this.formaAgregarPlan.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    } else {
      //Envio de la informacion al servidor

      this._planCliente.Id_Cliente = this._loginService.obtenerIdCliente();
      this._planCliente.Id_Plan = this.formaAgregarPlan.get('plan')?.value;
      this._planCliente.Id_Usuario = 1; //this._loginService.obtenerIdCliente();

      this._planClienteService.postPlanesCliente(this._planCliente).subscribe(
        (data) => {
          //console.log('datos: ',data);

          this.modalClose.nativeElement.click();

          this.obtenerMisPlanes();

          this.limpiarFormulario();
        },
        (error: HttpErrorResponse) => {
          //Error callback
          //console.log('Error del servicio: ', error.error['Descripcion']);

          Swal.fire({
            icon: 'error',
            title: error.error['Descripcion'],
            text: '',
            showCancelButton: false,
            showDenyButton: false,
          });

          switch (error.status) {
            case 401:
              //console.log('error 401');
              break;
            case 403:
              //console.log('error 403');
              break;
            case 404:
              //console.log('error 404');
              break;
            case 409:
              //console.log('error 409');
              break;
          }

        }
      );
    }
  }

  planSeleccionado(plan:plan){
    // debugger;
    console.log('sel:' + plan.Descripcion);
    //console.log(sel);
    // this.obtenerMunicipios(this.formaUbicacion.controls['direccion'].value.estado);
  }

  get planNoValido() {
    return (
      this.formaAgregarPlan.get('plan')?.invalid &&
      this.formaAgregarPlan.get('plan')?.touched
    );
  }

}
