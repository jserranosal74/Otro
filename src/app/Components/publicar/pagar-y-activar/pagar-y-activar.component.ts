import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { BancosService } from 'src/app/Services/Catalogos/bancos.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PlanesClienteService } from 'src/app/Services/Procesos/planesCliente.service';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';

import { publicacion } from '../../../Models/procesos/publicacion.model';
import { banco } from '../../../Models/catalogos/banco.model';
import { plancliente } from '../../../Models/procesos/plancliente.model';
import { plan } from 'src/app/Models/catalogos/planes.model';
import { PlanesService } from 'src/app/Services/Catalogos/planes.service';
import { datoFiscal } from '../../../Models/procesos/datosFiscales.model';
import { DatosFiscalesService } from 'src/app/Services/Procesos/datosFiscales.service';
import { paqueteCliente } from 'src/app/Models/procesos/paquetecliente.model';
import { PaquetesClienteService } from 'src/app/Services/Procesos/paquetesCliente.service';

@Component({
  selector: 'app-pagar-y-activar',
  templateUrl: './pagar-y-activar.component.html',
  styleUrls: ['./pagar-y-activar.component.css']
})
export class PagarYActivarComponent implements OnInit {
  _numeroPaso = 1;
  _publicacion: publicacion = new publicacion(0,0,null,null,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0,'','',null,null,0);
  _id_publicacion : number = 0;
  _bancos : banco[] = [];
  _planesCliente : plancliente[] = [];
  _planes : plan[] = [];
  _planActualNuevo : boolean = false;
  _datosFiscales : datoFiscal[] = [];

  _planCliente : plancliente = new plancliente(0,0,0,null,null,'',0,0,0,0,'',new Date(),null,null,null,null,new Date(),new Date(),0,'',0,false);
  _banco : banco = new banco(0,'','','','','',0,new Date(), new Date(), 0,0,0);
  _plan : plan = new plan(0,'',0,0,0,'','',null,null,'',0,new Date(),new Date(),0,0,0);
  _datoFiscal : datoFiscal = new datoFiscal(0,0,null,0,'','','','','',0,new Date(),new Date(),0,0,0);

  _paquetesCliente : paqueteCliente[] = [];
  _paqueteCliente : paqueteCliente = new paqueteCliente(null,null,0,null,null,null,null,null,null,null,null,0,'',null,0,false);
  _esDesarrollo : boolean = false;
  _cargandoInformacion : boolean = true;
  
  _guardandoYpublicando : boolean = false;
  _guardandoYpublicandoSF : boolean = false;
  _guardandoYpublicandoCF : boolean = false;

  @ViewChild('myModalAceptarYPublicar') modalAceptarYPublicar : any;
  @ViewChild('myModalClose') modalClose : any;

  constructor(  private _activatedRoute: ActivatedRoute,
                private _publicacionesService: PublicacionesService,
                private _planClienteService: PlanesClienteService,
                private _bancosService: BancosService,
                private _loginService: LoginService,
                private _planService : PlanesService,
                private _paquetesClienteService : PaquetesClienteService,
                private _datosfiscalesService : DatosFiscalesService,
                private router: Router) {

    this._cargandoInformacion = true;
    this._activatedRoute.queryParams.subscribe(params => {
      this._id_publicacion = params['Id_Publicacion'];
      if (this._id_publicacion === undefined){
        this._id_publicacion = 0;
        setTimeout( () => { this.router.navigateByUrl('/publicar/operacion-tipo-inmueble'); }, 700 );
      }
    });

    this.obtenerBancos();
    this.obtenerDatosFiscales();
    this.CargarPublicacion();

   }

  ngOnInit(): void {
    //this._cargandoInformacion = true;
  }

  regresar(){
    this._numeroPaso = 2;
    //setTimeout( () => { this.router.navigateByUrl('/publicar/fotosyvideos'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/adicionales'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  pantallaSiguiente(){
    this._numeroPaso = 2;
    setTimeout( () => { this.router.navigate(['/publicar/operacion-tipo-inmueble'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  obtenerPlanesCliente(){
    let UID_Cliente = this._loginService.obtenerIdCliente()!;

    this._planClienteService.getPlanesCliente(UID_Cliente, 16, null).subscribe(
      (data) => {
        //console.log('----datos---: ', data);

        // Para un desarrollo solo se puede cargar el plan Premium
        data.forEach(item =>{
          if(this._publicacion.Id_TipoOperacion != 3){
            this._planesCliente.push(new plancliente(item.Id_PlanCliente, item.Id_Plan, item.Id_Cliente, item.UID_Cliente, item.Id_DatosFiscales, item.Descripcion, item.Disponibles, item.Utilizados, item.Restantes,  item.Id_Publicacion, item.TituloPublicacion, item.FechaDePago, item.FechaFacturacion, item.NombreRazonSocial, item.RFC, item.NumFactura, item.FechaAlta, item.FechaModificacion, item.Id_Estatus, item.DescripcionEstatus,0,false));
          }else if(this._publicacion.Id_TipoOperacion === 3){
            if(item.Id_Plan === 5){
              this._planesCliente.push(new plancliente(item.Id_PlanCliente, item.Id_Plan, item.Id_Cliente, item.UID_Cliente, item.Id_DatosFiscales, item.Descripcion, item.Disponibles, item.Utilizados, item.Restantes,  item.Id_Publicacion, item.TituloPublicacion, item.FechaDePago, item.FechaFacturacion, item.NombreRazonSocial, item.RFC, item.NumFactura, item.FechaAlta, item.FechaModificacion, item.Id_Estatus, item.DescripcionEstatus,0,false));
            }
          }
        });

        if (data.length === 0){
          this._planActualNuevo = true;
        }
        else{
          this._planActualNuevo = false;
        }

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

  obtenerPaquetesCliente() {
    let UID_Cliente = this._loginService.obtenerIdCliente()!;
    this._paquetesClienteService.getPaquetesCliente(UID_Cliente, 16, null).subscribe(
      (data) => {
        //console.log('obtenerMisPaquetes', data);

        data.forEach(item => {
          item.Detalle?.forEach(itemDetalle => {
            itemDetalle.Seleccionado = false;
          })
        });

        this._paquetesCliente = data;

        // Eliminados todos los paquetes que no contienen un plan Premium siempre y cuando se trate de un auncio de tipo desarrollo
        if (this._esDesarrollo){
          
          let paquetesFiltrados : paqueteCliente[] = [];
          this._paquetesCliente.forEach( item => {
            item.Detalle?.forEach(itemDet => { 
              if (itemDet.Descripcion === 'Premium')
                paquetesFiltrados.push(item);
            });
          });

          this._paquetesCliente = paquetesFiltrados;
        }
        
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
    debugger;
    this._planService.getPlanes(null, true).subscribe(
      (data) => {

        data.forEach((element,index)=>{
          if(element.Id_Plan === 1) data.splice(index,1);
        });

        // Solo se muestran los planes de Cantidad === 1
        data.forEach(item =>{
          if(this._publicacion.Id_TipoOperacion != 3){
            if ((item.Cantidad === 1) && (item.Id_Plan != 7)) {
              this._planes.push(new plan(item.Id_Plan, item.Descripcion, item.Precio, item.Cantidad, item.VigenciaXUnidad, item.Clave, item.ClaveProdServ, item.Id_Moneda, item.Id_Impuesto, item.UrlImagen, item.Visible, item.FechaAlta, item.FechaModificacion, item.Id_Usuario, item.Id_Estatus, 0));
            }
          }else if(this._publicacion.Id_TipoOperacion === 3){
            if (item.Id_Plan === 5){
              this._planes.push(new plan(item.Id_Plan, item.Descripcion, item.Precio, item.Cantidad, item.VigenciaXUnidad, item.Clave, item.ClaveProdServ, item.Id_Moneda, item.Id_Impuesto, item.UrlImagen, item.Visible, item.FechaAlta, item.FechaModificacion, item.Id_Usuario, item.Id_Estatus, 0));
            }
          }
        });

        //this._planes = data;

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

  obtenerDatosFiscales() {

    this._datosfiscalesService.getDatosFiscalesCliente(this._loginService.obtenerIdCliente()!).subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        data.forEach(item => {
          this._datosFiscales.push( new datoFiscal(item.Id_DatosFiscales,item.Id_Cliente,item.UID_Cliente,item.Id_TipoPersona,item.NombreRazonSocial,item.RFC,item.DomicilioFiscal, item.CodigoPostal, item.Email, item.Predeterminada,item.FechaAlta,item.FechaModificacion,item.Id_Usuario,item.Id_Estatus,item.Predeterminada));
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

  obtenerBancos(){
    if (this._id_publicacion != 0) {
      this._bancosService.getBancos().subscribe(
        (data) => {
          //console.log(data);
          //this._bancos = data;

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

  CargarPublicacion(){
    debugger;
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()!).subscribe(
          (data) => {
            //console.log(data);
            this._publicacion = data;

            if(this._publicacion.Id_TipoOperacion === 3){
              this._esDesarrollo = true;
            }
            else{
              this._esDesarrollo = false;
            }

            if ((data.Id_Estatus === 13) || (data.Id_Estatus === 14)) {
              //setTimeout( () => { this.router.navigate(['/publicar/operacion-tipo-inmueble'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );
              this.router.navigateByUrl('/micuenta/mis-anuncios');
            }

            // if (this._esDesarrollo){
            //   this.obtenerPlanesCliente();
            //   this.obtenerPaquetesCliente();
            //   this.obtenerPlanesDisponibles();
            // }
            // else{
            //   this.obtenerPlanesCliente();
            //   this.obtenerPaquetesCliente();
            //   this.obtenerPlanesDisponibles();
            // }

            this.obtenerPlanesCliente();
            this.obtenerPaquetesCliente();
            this.obtenerPlanesDisponibles();

            this._cargandoInformacion = false;

          },
          (error: HttpErrorResponse) => {

            this._cargandoInformacion = false;
            //this._id_publicacion = 0;
            this.router.navigateByUrl('/publicar/operacion-tipo-inmueble');

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

  cambiarPlan(valor : number){
    this._planActualNuevo = valor === 0 ? false : true;

    if(this._planActualNuevo){
      this._planes.forEach(item=>{
        item.Seleccionado = 0;
      })
    }else{
      this._bancos.forEach(item=>{
        item.Seleccionado = 0;
      })
      this._planesCliente.forEach(item=>{
        item.Seleccionado = 0;
      })
    }
  }

  seleccionarBanco(objBanco : banco){

    this._bancos.forEach(item=>{
      item.Seleccionado = 0;
    })
    this._planesCliente.forEach(item=>{
      item.Seleccionado = 0;
    })

    objBanco.Seleccionado = 1;
    this._banco = objBanco;

  }

  seleccionarPlanCliente(objPlanCliente : plancliente){

    this._planesCliente.forEach( item => {
      item.Seleccionado = 0;
    });

    this._planes.forEach( item => {
      item.Seleccionado = 0;
    });

    this._bancos.forEach( item => {
      item.Seleccionado = 0;
    });

    this._paquetesCliente.forEach( item => {
      item.Detalle?.forEach(itemDetalle=>{
        itemDetalle.Seleccionado = false;
      });
    });

    objPlanCliente.Seleccionado = 1;

    this._planCliente = objPlanCliente;

  }

  seleccionarPlanPaqueteCliente(objPaqueteCliente : paqueteCliente){

    this._paquetesCliente.forEach( item => {
      if (item != objPaqueteCliente){
        item.Detalle?.forEach(itemDetalle=>{
          itemDetalle.Seleccionado = false;
        });
      }
    });

    objPaqueteCliente.Detalle!.forEach( item => {
      if (item.Seleccionado === true){
        this._paqueteCliente = objPaqueteCliente;
      }
    });

    this._planesCliente.forEach( item => {
      item.Seleccionado = 0;
    });

    this._planes.forEach( item=> {
      item.Seleccionado = 0;
    });

    this._bancos.forEach( item=> {
      item.Seleccionado = 0;
    });

  }

  seleccionarPlan(objPlan : plan){

    this._planes.forEach(item=>{
      item.Seleccionado = 0;
    });

    this._planesCliente.forEach(item=>{
      item.Seleccionado = 0;
    });

    objPlan.Seleccionado = 1;

    this._plan = objPlan;
  }

  validarPlanYBanco(){
    debugger;

    let Id_PaqueteDetalle : number | null = null;

    this._paqueteCliente.Detalle?.forEach(item=>{
        if (item.Seleccionado)
          Id_PaqueteDetalle = item.Id_PaqueteDetalle;
    });

    if ((this._planActualNuevo === false) && (this._planCliente.Seleccionado === 0) && (Id_PaqueteDetalle === null)){
      Swal.fire({
        icon: 'warning',
        title: 'Deberá de seleccionar uno de los planes o uno de los planes del paquete que tiene disponibles para poder publicar su anuncio.',
        showCancelButton: false,
        showDenyButton: false,
      });  
    }
    else if ((this._planActualNuevo === true) && ((this._banco.Seleccionado === 0) || (this._plan.Seleccionado === 0))){
      Swal.fire({
        icon: 'warning',
        title: 'Deberá de seleccionar un plan y una Institución Bancaria para realizar el pago y asi poder publicar el anuncio.',
        showCancelButton: false,
        showDenyButton: false,
      });
    }else{
      if((this._planActualNuevo === false)){
        this.guardarPagaryActivar(0);
      }else{
        this.modalAceptarYPublicar.nativeElement.click();
      }
    }
  }

  guardarPagaryActivar(intConFactura : number) {
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
    let Id_PaqueteDetalle : number | null = null;
    let Id_PaqueteCliente : number | null = null;
    // Solo si es seleccionado uno de los planes de alguno de los paquetes mostrados en el fron end
    this._paqueteCliente.Detalle?.forEach( item => { 
      if ( item.Seleccionado === true ){
        Id_PaqueteCliente = item.Id_PaqueteCliente;
        Id_PaqueteDetalle = item.Id_PaqueteDetalle;
      }
    });

    this._guardandoYpublicando = true;

    if(intConFactura === 0)
      this._guardandoYpublicandoSF = true;
    else
      this._guardandoYpublicandoCF = true;

      debugger;
    this._publicacionesService.putActivarPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()!, this._planCliente.Seleccionado === 1 ? this._planCliente.Id_PlanCliente : null, this._planCliente.Seleccionado === 1 ? this._planCliente.Id_Plan : this._plan.Id_Plan, intConFactura === 1 ? this._datoFiscal.Id_DatosFiscales : null, this._banco.Id_Banco === 0 ? null : this._banco.Id_Banco, Id_PaqueteCliente, Id_PaqueteDetalle ).subscribe(
      (data) => {

        this._guardandoYpublicando = false;
        this._guardandoYpublicandoSF = false;
        this._guardandoYpublicandoCF = false;

        this.modalClose.nativeElement.click();

        if (this._planActualNuevo === false){
          Swal.fire({
            icon: 'success',
            title: 'Su anuncio ha sido publicado de manera exitosa.',
            text: '',
            showCancelButton: false,
            showDenyButton: false,
          });

          this.router.navigateByUrl('/micuenta/mis-anuncios');

        }
        else if (this._planActualNuevo === true){
          Swal.fire({
            icon: 'success',
            title: 'Su anuncio queda en espera de que realice el pago correspondiente.',
            text: 'Recibira un correo electrónico a su cuenta con la información necesaria.',
            showCancelButton: false,
            showDenyButton: false,
          });

          this.router.navigateByUrl('/micuenta/mis-planesypaquetes');
        }

      },
      (error: HttpErrorResponse) => {

        this._guardandoYpublicando = false;
        this._guardandoYpublicandoSF = false;
        this._guardandoYpublicandoCF = false;
        
        this.modalClose.nativeElement.click();

        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error al intentar Activar la publicación, intentelo de nuevo.',
          text: '',
          showCancelButton: false,
          showDenyButton: false,
        });

        this._id_publicacion = 0;
        this.router.navigateByUrl('/publicar/operacion-tipo-inmueble');

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

  seleccionarDatosFiscales(objDatoFiscal : datoFiscal){
    //debugger;
    this._datosFiscales.forEach(item => {
      item.Seleccionado = 0;
    })

    objDatoFiscal.Seleccionado = 1;
    this._datoFiscal = objDatoFiscal;
  }

}
