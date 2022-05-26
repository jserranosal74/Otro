import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { plan } from 'src/app/Models/catalogos/planes.model';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PlanesService } from 'src/app/Services/Catalogos/planes.service';
import { plancliente } from 'src/app/Models/procesos/plancliente.model';
import { PlanesclienteService } from 'src/app/Services/Procesos/planesCliente.service';
import { datoFiscal } from 'src/app/Models/procesos/datosFiscales.model';
import { DatosFiscalesService } from 'src/app/Services/Procesos/datosFiscales.service';
import { clienteVista } from 'src/app/Models/catalogos/cliente.model';
import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';

@Component({
  selector: 'app-agregarplanacliente',
  templateUrl: './agregarplanacliente.component.html',
  styleUrls: ['./agregarplanacliente.component.css']
})
export class AgregarplanaclienteComponent implements OnInit {
  formaCliente = this.fb.group({});

  _planes : plan[] = [];
  _plan : plan = new plan(0,'',0,0,0,'',0,new Date(),new Date(),0,0,0);
  _planCliente : plancliente = new plancliente(0,0,0,null,'',0,0,0,0,'',new Date(),null,null,null,null,new Date(),new Date(),0,'',0,false);
  _datosFiscales : datoFiscal[] = [];
  _datoFiscal : datoFiscal = new datoFiscal(0,0,0,'','','','',0,new Date(),new Date(),0,0,0);
  _clienteVista! : clienteVista;
  _planSeleccionado! : plan;

  @ViewChild('mostrarFacturas') modalFacturas : any;
  @ViewChild('myModalCloseFacturas') modalCloseFacturas : any;

  constructor(  private fb: FormBuilder,
                private _planService: PlanesService,
                private _loginService : LoginService,
                private _planClienteService : PlanesclienteService,
                private _datosfiscalesService : DatosFiscalesService,
                private _clienteService: ClientesService
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerPlanes();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaCliente = this.fb.group({
      email    : [ '', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ]
    });
    this._plan = new plan(0,'',0,0,0,'',0,new Date(),new Date(),0,0,0);
  }

  limpiarFormulario() {
    this.formaCliente.reset({
      email : ''
    });
    this._plan = new plan(0,'',0,0,0,'',0,new Date(),new Date(),0,0,0);
  }

  obtenerPlanes() {
    this._planService.getPlanes(null, false).subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        data.forEach( item =>{
            item.Seleccionado = 0;
        });

        this._planes = data;

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

  asignarPlanACliente(){

    if (this.formaCliente.invalid) {
      return Object.values(this.formaCliente.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    } else {

      debugger;
      if (this._planSeleccionado === undefined){
          Swal.fire({
            icon: 'error',
            title: 'Seleccione el plan que será asignado al cliente con correo: ' + this.formaCliente.get('email')?.value,
            showCancelButton: false,
            showDenyButton: false,
          });
          return;
      }

      this.obtenerCliente();

    }
  }

  obtenerCliente() {
    //let Id_Usuario = this._loginService.obtenerIdCliente();

    this._clienteService.getClienteVista(null, this.formaCliente.get('email')?.value).subscribe(
      (data) => {
        //Next callback
        this._clienteVista = data;

        this.obtenerDatosFiscales();

        this.modalFacturas.nativeElement.click();

      },
      (error: HttpErrorResponse) => {

        Swal.fire({
          icon: 'error',
          title: 'Al parecer el cliente con correo ' + this.formaCliente.get('email')?.value + ' no existe. Verifique.',
          showCancelButton: false,
          showDenyButton: false,
        });

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

  seleccionarPlanCliente(objPlanSeleccionado : plan){
    this._planes.forEach(item => {
        item.Seleccionado = 0;
    });
    this._planSeleccionado = objPlanSeleccionado;
    this._planSeleccionado.Seleccionado = 1;
  }

  guardarPagaryActivar(intConFactura : number) {
    // 0 sin factura, 1 con factura
    if (intConFactura === 1){
      if (this._datoFiscal.Seleccionado === 0){
        Swal.fire({
          icon: 'error',
          title: 'Comentarle al cliente que debe de dar de alta sus datos fiscales en el sistema',
          showCancelButton: false,
          showDenyButton: false,
        });
        return;
      }
    }

    //debugger;
    this._planCliente.Id_Cliente = this._clienteVista.Id_Cliente;
    this._planCliente.Id_Plan = this._plan.Id_Plan;

    if ( intConFactura === 0 )
      this._planCliente.Id_DatosFiscales = null;
    else
      this._planCliente.Id_DatosFiscales = this._datoFiscal.Id_DatosFiscales;

    this._planClienteService.postPlanesCliente(this._planCliente.Id_Cliente, this._planSeleccionado.Id_Plan, this._planCliente.Id_DatosFiscales).subscribe(
      (data) => {
        //console.log('datos: ',data);

        this._planCliente.Id_PlanCliente = data;

        this.enviarCorreo(this._planCliente);

        this.limpiarFormulario();

        this._planes.forEach(item=>{
          item.Seleccionado = 0;
        })
          
          

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
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

        //this.modalClose.nativeElement.click();
        this.modalCloseFacturas.nativeElement.click();

        this.obtenerPlanes();

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

  obtenerDatosFiscales() {

    this._datosfiscalesService.getDatosFiscalesCliente(this._clienteVista.Id_Cliente).subscribe(
      (data) => {
        //Next callback
        //console.log('obtenerDatosFiscales ', data);

        this._datosFiscales = [];

        data.forEach(item => {
          this._datosFiscales.push( new datoFiscal(item.Id_DatosFiscales,item.Id_Cliente,item.Id_TipoPersona,item.NombreRazonSocial,item.RFC,item.DomicilioFiscal,item.Email,item.Predeterminada,item.FechaAlta,item.FechaModificacion,item.Id_Usuario,item.Id_Estatus,item.Predeterminada));
          if (item.Predeterminada === 1){
            this._datoFiscal = item;
          }
        })

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback

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

  seleccionarDatosFiscales(objDatoFiscal : datoFiscal){
    //debugger;
    this._datosFiscales.forEach(item => {
      item.Seleccionado = 0;
    })

    objDatoFiscal.Seleccionado = 1;
    this._datoFiscal = objDatoFiscal;
  }

  enviarCorreo(objplanCliente : plancliente){
    //debugger;
    objplanCliente.Enviando = true;
    this._planClienteService.putEnviarCorreo(objplanCliente.Id_Cliente, objplanCliente.Id_PlanCliente, ( objplanCliente.Id_Publicacion === 0 ? null : objplanCliente.Id_Publicacion ) ).subscribe(
      (data) => {
        //console.log('datos: ',data);
        objplanCliente.Enviando = false;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'La información ha sido enviada a su cuenta de correo, revise por favor.'
        });

      },
      (error: HttpErrorResponse) => {
        //Error callback
        objplanCliente.Enviando = false;
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

  get emailNoValido() {
    return ( this.formaCliente.get('email')?.invalid && this.formaCliente.get('email')?.touched );
  }

}