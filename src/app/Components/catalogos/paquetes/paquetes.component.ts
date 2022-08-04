import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { EmpresasService } from '../../../Services/Catalogos/empresa.service';
import { PaquetesService } from '../../../Services/Catalogos/paquetes.service';

import { empresa } from 'src/app/Models/catalogos/empresa.model';
import { paquete } from 'src/app/Models/catalogos/paquetes.model';
import { plan } from 'src/app/Models/catalogos/planes.model';
import { PlanesService } from '../../../Services/Catalogos/planes.service';
import { paqueteDetalle } from '../../../Models/catalogos/paquetes.model';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {
  _paquetes : paquete[] = [];
  _paquete : paquete = new paquete(0,'',0,'','',null,null,[],new Date(),new Date(),0,0,0);
  _paqueteDetalle : paqueteDetalle[] = [];
  _empresas : empresa[] = [];
  _planes : plan[] = []
  _textoAccion ='';
  cargando : boolean = false;

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;
  @ViewChild('descripcion') modaldescripcion : any;

  formaPaquete = this.fb.group({});
  formaPlan = this.fb.group({});

  constructor( private fb: FormBuilder,
               private _empresasService: EmpresasService,
               private _planesService: PlanesService,
               private _paquetesService: PaquetesService,
               private _loginService : LoginService,
  ) {
    //debugger;
    this.crearFormularios();
    this.limpiarFormularios();
    this.obtenerEmpresas();
    this.obtenerPlanes();
    this.obtenerPaquetes();
  }

  ngOnInit(): void {
    //this.limpiarFormulario();
  }

  crearFormularios() {
    this.formaPaquete = this.fb.group({
      descripcion  : ['', Validators.required],
      precio       : ['', Validators.required],
      clave        : ['', Validators.required],
      claveProdSAT : ['82101603', Validators.required]
    });

    this.formaPlan = this.fb.group({
      plan     : ['', Validators.required],
      cantidad : ['', Validators.required],
      vigencia : ['30', Validators.required]
    });

    this._paquete = new paquete(0,'',0,'','',null,null,[],new Date(),new Date(),0,0,0);
  }

  limpiarFormularios() {
    this._textoAccion = 'Agregar';
    this._paqueteDetalle = [];
    this.formaPaquete.reset({
      descripcion  : '',
      precio       : '',
      clave        : '',
      claveProdSAT : '82101603'
    });
    this._paquete = new paquete(0,'',0,'','',null,null,[],new Date(),new Date(),0,0,0);
    this.limpiarFormularioPlan();
  }

  limpiarFormularioPlan(){
    this.formaPlan.reset({
      plan     : '',
      cantidad : '',
      vigencia : '30'
    });
  }

  obtenerEmpresas() {
    //this._id_Empresa = this._loginService.obtenerIdCliente();

    this._empresasService.getEmpresas().subscribe(
      (data) => {

        this._empresas = data;

      },
      (error: HttpErrorResponse) => {
        //Error callback

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            Swal.fire({
              icon: 'error',
              title: 'No hay usuarios dados de alta.',
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
            break;
          case 409:
            break;
        }

      }
    );
  }

  obtenerPaquetes() {
    this.cargando = true;
    
    this._paquetesService.getPaquetes().subscribe(
      (data) => {
        //Next callback
        console.log('obtenerPaquetes: ', data);

        this._paquetes = data

        //setTimeout(()=> this._paquetes = data, 10000);
        this.cargando = false;
      },
      (error: HttpErrorResponse) => {

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            this._paquetes = [];
            break;
          case 409:
            break;
        }

      }
    );
  }

  obtenerPlanes() {
    this.cargando = true;
    
    this._planesService.getPlanes(null,null).subscribe(
      (data) => {
        //Next callback

        this._planes = data

        this.cargando = false;
      },
      (error: HttpErrorResponse) => {

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

  obtenerPaquete(objPaquete : paquete) {
    this._textoAccion = 'Modificar';
    this._paquete = objPaquete;
    debugger;
    this._paquetesService.getPaquete(objPaquete.Id_Paquete).subscribe(
      (data) => {
        //Next callback
        // console.log('obtenerPaquete: ', data);
        this._paqueteDetalle = data[0].Detalle;
        
        this.formaPaquete.setValue({
          descripcion  : data[0].Descripcion,
          precio       : data[0].Precio,
          clave        : data[0].Clave,
          claveProdSAT : data[0].ClaveProdServ
        });

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  guardarPaquete(){

    if (this.formaPaquete.invalid) {
      return Object.values(this.formaPaquete.controls).forEach((control) => {
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

      if (this._paquete.Id_Paquete != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._paquete.Descripcion = this.formaPaquete.get('descripcion')?.value;
      this._paquete.Clave = this.formaPaquete.get('clave')?.value.toUpperCase();
      this._paquete.Precio = this.formaPaquete.get('precio')?.value;
      this._paquete.Detalle = this._paqueteDetalle;
      // this._paquete.FechaAlta = new Date();
      // this._paquete.FechaModificacion = new Date();
      // this._paquete.Id_Usuario = 1;
      // this._paquete.Id_Estatus = 1;

      if (this._esNuevo){
        this._paquete.Id_Paquete = 0;
        this._paquetesService.postPaquete(this._paquete).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'El plan se agrego de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerPaquetes();
  
            this.limpiarFormularios();
          },
          (error: HttpErrorResponse) => {
  
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
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudo actualizar información',
                  text: 'La clave ya existe o el paquete no existe',
                  showCancelButton: false,
                  showDenyButton: false,
                });
                break;
            }
  
          }
        );
      }
      else{
        this._paquetesService.putPaquete(this._paquete).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'El plan se modifico de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerPaquetes();
  
            this.limpiarFormularios();
          },
          (error: HttpErrorResponse) => {

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
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudo actualizar información',
                  text: 'La clave ya existe o el paquete no existe',
                  showCancelButton: false,
                  showDenyButton: false,
                });
                break;
            }
  
          }
        );
      }
    }
  }

  eliminarPaquete(objPaquete : paquete) {
    // this._textoAccion = 'Eliminar';
    this._paquete = objPaquete;

    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que desea eliminar el paquete: "' + objPaquete.Descripcion + '"?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1',
        confirmButton: 'order-3',
        denyButton: 'order-2',
      },
      backdrop: ` rgba(128,128,128,0.4)
                  left top
                  no-repeat
                `
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this._paquetesService.deletePaquete(objPaquete.Id_Paquete).subscribe(
          (data) => {
            //Next callback

            Swal.fire({
              icon: 'success',
              title: 'El paquete fue eliminado.',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerPaquetes();
    
          },
          (error: HttpErrorResponse) => {
            //Error callback
    
            Swal.fire({
              icon: 'error',
              title: error.error['Descripcion'],
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
    
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
    
            //throw error;   //You can also throw the error to a global error handler
          }
        );

        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  agregarPlan(){
    //this._paqueteDetalle = [];
    if (this.formaPlan.invalid) {
      return Object.values(this.formaPlan.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }
    else{
      debugger;

      let descripcion = '';

      this._planes.forEach(item=>{
          if (item.Id_Plan == this.formaPlan.get('plan')?.value )
          {
            descripcion = item.Descripcion;
          }
      });

      let pd = new paqueteDetalle(0,0,this.formaPlan.get('plan')?.value, descripcion, this.formaPlan.get('cantidad')?.value, this.formaPlan.get('vigencia')?.value, new Date(), new Date(), 0, 0, 0);

      this._paqueteDetalle.push(pd);

      this.limpiarFormularioPlan();

    }

    // this._paquete.Detalle.forEach((item,index) => {
    //     if (item.Id_Plan === objPaqueteDetalle.Id_Plan){
    //      this._planes.splice(index,1); 
    //     }
    // });

  }

  eliminarPlan(objPaqueteDetalle : paqueteDetalle){
    //debugger;
    this._paqueteDetalle.forEach((item,index) => {
        if (item.Id_Plan === objPaqueteDetalle.Id_Plan){
          this._paqueteDetalle.splice(index,1); 
        }
    });

  }

  get descripcionNoValido() {
    return ( this.formaPaquete.get('descripcion')?.invalid && this.formaPaquete.get('descripcion')?.touched );
  }
      
  get precioNoValido() {
    return ( this.formaPaquete.get('precio')?.invalid && this.formaPaquete.get('precio')?.touched );
  }

  get planNoValido() {
    return ( this.formaPlan.get('plan')?.invalid && this.formaPlan.get('plan')?.touched );
  }

  get cantidadNoValida() {
    return ( this.formaPlan.get('cantidad')?.invalid && this.formaPlan.get('cantidad')?.touched );
  }

  get vigenciaNoValida() {
    return ( this.formaPlan.get('vigencia')?.invalid && this.formaPlan.get('vigencia')?.touched );
  }

  get claveNoValido() {
    return ( this.formaPaquete.get('clave')?.invalid && this.formaPaquete.get('clave')?.touched );
  }

  get claveProdSATNoValido() {
    return ( this.formaPaquete.get('claveProdSAT')?.invalid && this.formaPaquete.get('claveProdSAT')?.touched );
  }

}