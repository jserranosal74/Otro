import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { plan } from 'src/app/Models/catalogos/planes.model';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PlanesService } from 'src/app/Services/Catalogos/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  formaPlan = this.fb.group({});

  _planes : plan[] = [];
  _plan : plan = new plan(0,'',0,0,0,'','',null,null,'',0,new Date(),new Date(),0,0,0);
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;

  constructor(
    private fb: FormBuilder,
    private _planService: PlanesService,
    private _loginService : LoginService,
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerPlanes();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaPlan = this.fb.group({
      descripcion     : ['', Validators.required],
      precio          : ['', Validators.required],
      cantidad        : ['', Validators.required],
      clave           : ['', Validators.required],
      claveProdSAT    : ['', Validators.required],
      vigenciaxunidad : ['', Validators.required],
      urlimagen       : [''],
      visible         : [0]
    });
    this._plan = new plan(0,'',0,0,0,'','',null,null,'',0,new Date(),new Date(),0,0,0);
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    this.formaPlan.reset({
      descripcion     : '',
      precio          : '',
      cantidad        : '',
      clave           : '',
      claveProdSAT    : '',
      vigenciaxunidad : '',
      urlimagen       : '',
      visible         : 0
    });
    this._plan = new plan(0,'',0,0,0,'','',null,null,'',0,new Date(),new Date(),0,0,0);
  }

  obtenerPlanes() {
    this._planService.getPlanes(null, null).subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        this._planes = data;

        // data.forEach( item => {
        //   if (item.TipoPlanAgregar === null) {
        //     this._planesFijos.push(item);
        //   }
        // });

        // console.log('this._planesFijos', this._planesFijos);

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        // Swal.fire({
        //   icon: 'error',
        //   title: error.error['Descripcion'],
        //   text: 'Error al cargar las inmobiliarias',
        //   showCancelButton: false,
        //   showDenyButton: false,
        // });

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

  obtenerPlan(objPlan : plan) {
    this._textoAccion = 'Modificar';
    this._plan = objPlan;
debugger;
    this._planService.getPlan(objPlan.Id_Plan).subscribe(
      (data) => {
        //Next callback
        console.log('obtenerPlan: ', data);

        this.formaPlan.patchValue({
          descripcion     : data[0].Descripcion,
          precio          : data[0].Precio,
          cantidad        : data[0].Cantidad,
          clave           : data[0].Clave,
          claveProdSAT    : data[0].ClaveProdServ,
          vigenciaxunidad : data[0].VigenciaXUnidad,
          urlimagen       : data[0].UrlImagen,
          visible         : data[0].Visible ? 1 : 0
        });

        // this.limpiarFormulario();
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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  guardarPlan(){

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
    } else {
      //Envio de la informacion al servidor

      if (this._plan.Id_Plan != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._plan.Descripcion = this.formaPlan.get('descripcion')?.value;
      this._plan.Precio = this.formaPlan.get('precio')?.value;
      this._plan.Cantidad = this.formaPlan.get('cantidad')?.value;
      this._plan.VigenciaXUnidad = this.formaPlan.get('vigenciaxunidad')?.value;
      this._plan.UrlImagen = this.formaPlan.get('urlimagen')?.value;
      //this._plan.TipoPlanAgregar = this.formaPlan.get('tipoplanagregar')?.value;
      this._plan.Visible = this.formaPlan.get('visible')?.value;
      this._plan.FechaAlta = new Date();
      this._plan.FechaModificacion = new Date();
      this._plan.Id_Usuario = 1;
      this._plan.Id_Estatus = 1;

      if (this._esNuevo){
        this._plan.Id_Plan = 0;
        this._planService.postPlan(this._plan).subscribe(
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
  
            this.obtenerPlanes();
  
            this.limpiarFormulario();
          },
          (error: HttpErrorResponse) => {
            //Error callback
            //console.log('Error del servicio: ', error.error['Descripcion']);
  
            // Swal.fire({
            //   icon: 'error',
            //   title: error.error['Descripcion'],
            //   text: '',
            //   showCancelButton: false,
            //   showDenyButton: false,
            // });
  
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
      else{
        this._planService.putPlan(this._plan).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'El plan se modifico de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerPlanes();
  
            this.limpiarFormulario();
          },
          (error: HttpErrorResponse) => {
            //Error callback
            //console.log('Error del servicio: ', error.error['Descripcion']);
  
            // Swal.fire({
            //   icon: 'error',
            //   title: 'ERROR',
            //   text: '',
            //   showCancelButton: false,
            //   showDenyButton: false,
            // });
  
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
    }
  }

  eliminarPlan(objPlan : plan) {
    // this._textoAccion = 'Eliminar';
    this._plan = objPlan;

    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que desea eliminar el plan: "' + objPlan.Descripcion + '"?',
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

        this._planService.deletePlan(objPlan.Id_Plan).subscribe(
          (data) => {
            //Next callback
            
            // Swal.fire('Los datos fiscales fueron eliminados', '', 'success')

            Swal.fire({
              icon: 'success',
              title: 'El plan fue eliminado.',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerPlanes();
    
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

  get descripcionNoValido() {
    return ( this.formaPlan.get('descripcion')?.invalid && this.formaPlan.get('descripcion')?.touched );
  }
      
  get precioNoValido() {
    return ( this.formaPlan.get('precio')?.invalid && this.formaPlan.get('precio')?.touched );
  }

  get cantidadNoValido() {
    return ( this.formaPlan.get('cantidad')?.invalid && this.formaPlan.get('cantidad')?.touched );
  }

  get vigenciaxunidadNoValido() {
    return ( this.formaPlan.get('vigenciaxunidad')?.invalid && this.formaPlan.get('vigenciaxunidad')?.touched );
  }

  get visibleNoValido() {
    return ( this.formaPlan.get('visible')?.invalid && this.formaPlan.get('visible')?.touched );
  }

  get claveNoValido() {
    return ( this.formaPlan.get('clave')?.invalid && this.formaPlan.get('clave')?.touched );
  }

  get claveProdSATNoValido() {
    return ( this.formaPlan.get('claveProdSAT')?.invalid && this.formaPlan.get('claveProdSAT')?.touched );
  }

}

