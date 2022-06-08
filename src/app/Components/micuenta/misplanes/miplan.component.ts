import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { DatosFiscalesService } from 'src/app/Services/Procesos/datosFiscales.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PlanesClienteService } from '../../../Services/Procesos/planesCliente.service';
import { PlanesService } from 'src/app/Services/Catalogos/planes.service';
import { PaquetesService } from 'src/app/Services/Catalogos/paquetes.service';
import { PaquetesClienteService } from '../../../Services/Procesos/paquetesCliente.service';

import { datoFiscal } from 'src/app/Models/procesos/datosFiscales.model';
import { paquete } from 'src/app/Models/catalogos/paquetes.model';
import { paqueteCliente } from 'src/app/Models/procesos/paquetecliente.model';
import { plan } from 'src/app/Models/catalogos/planes.model';
import { plancliente } from '../../../Models/procesos/plancliente.model';

@Component({
  selector: 'app-miplan',
  templateUrl: './miplan.component.html',
  styleUrls: ['./miplan.component.css'],
})
export class MisplanesComponent implements OnInit {

  _planes : plan[] = [];
  _plan : plan = new plan(0,'',0,0,0,'','',null,null,'',0,new Date(),new Date(),0,0,0);
  _planesCliente : plancliente[] = [];
  _planCliente : plancliente = new plancliente(0,0,0,null,'',0,0,0,0,'',new Date(),null,null,null,null,new Date(),new Date(),0,'',0,false);
  _datosFiscales : datoFiscal[] = [];
  _datoFiscal : datoFiscal = new datoFiscal(0,0,0,'','','','','',0,new Date(),new Date(),0,0,0);
  _planesOPaquetes : boolean = false;

  //_paquetes : paquete[] = [];
  _paquetesEmpresa : paquete[] = [];
  _paquetesCliente : paqueteCliente[] = [];
  _paqueteCliente : paqueteCliente = new paqueteCliente(0,0,null,null,null,null,null,null,null,0,'',null,0,false);
  _paquete! : paquete;

  _planSeleccionado : number = 0;
  // _loading : boolean = false;

  @ViewChild('myModalClose') modalClose : any;
  @ViewChild('myModalCloseFacturas') modalCloseFacturas : any;

  constructor(  private _planClienteService: PlanesClienteService,
                private _loginService : LoginService,
                private _planService : PlanesService,
                //private _paquetesService : PaquetesService,
                private _paquetesClienteService : PaquetesClienteService,
                private _datosfiscalesService : DatosFiscalesService,
  ) {
    // this.crearFormulario();
    this.obtenerMisPlanes();
    this.obtenerMisPaquetes();
    this.obtenerPlanesDisponibles();
    this.obtenerPaquetesDisponibles();
    this.obtenerDatosFiscales();
  }

  ngOnInit(): void {}

  obtenerMisPlanes() {
    let Id_Usuario = this._loginService.obtenerIdCliente();
    this._planClienteService.getPlanesCliente(Id_Usuario, null).subscribe(
      (data) => {
        console.log('----datos---: ', data);

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

  obtenerMisPaquetes() {
    let Id_Cliente = this._loginService.obtenerIdCliente();
    this._paquetesClienteService.getPaquetesCliente(Id_Cliente, null).subscribe(
      (data) => {
        console.log('obtenerMisPaquetes', data);

        this._paquetesCliente = data;

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
    //let Id_Usuario = this._loginService.obtenerIdCliente();
    debugger;
    this._planService.getPlanes(null,true).subscribe(
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

  obtenerPaquetesDisponibles() {
    //let Id_Usuario = this._loginService.obtenerIdCliente();
    //debugger;
    this._paquetesClienteService.getPaquetesEmpresa(this._loginService.obtenerIdEmpresa()).subscribe(
      (data) => {

        this._paquetesEmpresa = data;

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

  comprarPlan(objPlanSeleccionado : plan){

    this._plan = objPlanSeleccionado;

  }

  comprarPaquete(objPaqueteSeleccionado : paquete){

    this._paquete = objPaqueteSeleccionado;

  }

  enviarCorreoPlan(objplanCliente : plancliente){
    debugger;
    objplanCliente.Enviando = true;
    this._planClienteService.putEnviarCorreoPlan(objplanCliente.Id_Cliente, objplanCliente.Id_PlanCliente, ( objplanCliente.Id_Publicacion === 0 ? null : objplanCliente.Id_Publicacion ) ).subscribe(
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

  enviarCorreoPaquete(objPaqueteCliente : paqueteCliente){
    //debugger;
    objPaqueteCliente.Enviando = true;
    this._paquetesClienteService.putEnviarCorreoPaquete(objPaqueteCliente.Id_Cliente, objPaqueteCliente.Id_Paquete, null ).subscribe(
      (data) => {
        //console.log('datos: ',data);
        objPaqueteCliente.Enviando = false;
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
        objPaqueteCliente.Enviando = false;
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

  eliminarPlanCliente(objplanCliente : plancliente){
    //this._loading= true;
    this._planClienteService.deletePlanCliente(objplanCliente.Id_PlanCliente).subscribe(
      (data) => {
        //console.log('datos: ',data);

        this.obtenerMisPlanes();

//        this._loading= false;
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
          title: 'El plan ha sido eliminado'
        });

      },
      (error: HttpErrorResponse) => {
        //Error callback
        //this._loading= false;
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

  eliminarPaqueteCliente(objPaqueteCliente : paqueteCliente){
    //debugger;
    this._paquetesClienteService.deletePaqueteCliente(objPaqueteCliente.Id_Paquete, objPaqueteCliente.Id_Cliente).subscribe(
      (data) => {
        //console.log('datos: ',data);

        this.obtenerMisPaquetes();

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
          title: 'El paquete ha sido eliminado de manera satisfactoria.'
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

  obtenerDatosFiscales() {

    this._datosfiscalesService.getDatosFiscalesCliente(this._loginService.obtenerIdCliente()).subscribe(
      (data) => {
        //Next callback
        console.log('obtenerDatosFiscales ', data);

        data.forEach(item => {
          this._datosFiscales.push( new datoFiscal(item.Id_DatosFiscales,item.Id_Cliente,item.Id_TipoPersona,item.NombreRazonSocial,item.RFC,item.DomicilioFiscal, item.CodigoPostal, item.Email, item.Predeterminada,item.FechaAlta,item.FechaModificacion,item.Id_Usuario,item.Id_Estatus,item.Predeterminada));
          if (item.Predeterminada === 1){
            this._datoFiscal = item;
          }
        })

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: 'Error al cargar los datos fiscales del cliente',
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

  guardarPlanPaquete(intConFactura : number) {
    // 0 sin factura, 1 con factura
    if (intConFactura === 1){
      if (this._datoFiscal.Seleccionado === 0){
        Swal.fire({
          icon: 'error',
          title: 'Seleccione una de las facturas o de de alta sus datos fiscales.',
          html: '<a href="/micuenta/datosfiscales">Dar de alta datos fiscales</a>',
          showCancelButton: false,
          showDenyButton: false,
        });
        return;
      }
    }

    debugger;

    if (!this._planesOPaquetes){
      this._planCliente.Id_Cliente = this._loginService.obtenerIdCliente();
      this._planCliente.Id_Plan = this._plan.Id_Plan;
  
      if ( intConFactura === 0 )
        this._planCliente.Id_DatosFiscales = null;
      else
        this._planCliente.Id_DatosFiscales = this._datoFiscal.Id_DatosFiscales;
  
      this._planClienteService.postPlanesCliente(this._planCliente.Id_Cliente, this._planCliente.Id_Plan, this._planCliente.Id_DatosFiscales).subscribe(
        (data) => {
          //console.log('datos: ',data);
  
          this._planCliente.Id_PlanCliente = data;
  
          this.enviarCorreoPlan(this._planCliente);
  
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
  
          this.modalCloseFacturas.nativeElement.click();
  
          this.obtenerMisPlanes();
  
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
    else{

      this._paqueteCliente.Id_Cliente = this._loginService.obtenerIdCliente();
      this._paqueteCliente.Id_Paquete = this._paquete.Id_Paquete;
  
      if ( intConFactura === 0 )
        this._paqueteCliente.Id_DatosFiscales = null;
      else
        this._paqueteCliente.Id_DatosFiscales = this._datoFiscal.Id_DatosFiscales;
  
      this._paquetesClienteService.postPaqueteCliente(this._paqueteCliente.Id_Cliente, this._paquete.Id_Paquete, this._paqueteCliente.Id_DatosFiscales).subscribe(
        (data) => {
          //console.log('datos: ',data);
  
          //this._paqueteCliente.Id_PlanCliente = data;
  
          this.enviarCorreoPaquete(this._paqueteCliente);
  
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
            title: 'Se adquirio el paquete de manera correcta.'
          });
  
          this.modalCloseFacturas.nativeElement.click();
  
          this.obtenerMisPaquetes();
  
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

  seleccionarDatosFiscales(objDatoFiscal : datoFiscal){
    //debugger;
    this._datosFiscales.forEach(item => {
      item.Seleccionado = 0;
    })

    objDatoFiscal.Seleccionado = 1;
    this._datoFiscal = objDatoFiscal;
  }

  cambiarPlanPaquete(valor : number){
    this._planesOPaquetes = valor === 0 ? false : true;
  }

}
