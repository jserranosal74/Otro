import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { publicacion, publicacionCaracteristica } from 'src/app/Models/procesos/publicacion.model';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { publicacionCaracteristicaLigth } from '../../../Models/procesos/publicacion.model';

@Component({
  selector: 'app-adicionales',
  templateUrl: './adicionales.component.html',
  styleUrls: ['./adicionales.component.css']
})

export class AdicionalesComponent implements OnInit {
  _adicionales : publicacionCaracteristicaLigth[] = [];
  _numeroPaso = 1;
  _publicacion : publicacion = new publicacion(0,0,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0);
  _id_publicacion : number = 0;
  _misCaracteristicas : FormControl[] = [];
  _publicacionActivada : boolean = false;

  formAdicionales = this.fb.group({
    caracteristicasGenerales : this.fb.array([]),
    servicios : this.fb.array([]),
    exteriores : this.fb.array([]),
    ambientes : this.fb.array([])
  });
  

  constructor(  private _activatedRoute: ActivatedRoute,
                private _publicacionesService: PublicacionesService,
                private _loginService: LoginService,
                private fb: FormBuilder,
                private router: Router) {

    this._activatedRoute.queryParams.subscribe(params => {
      this._id_publicacion = params['id_Publicacion'];
      if (this._id_publicacion === undefined){
        this._id_publicacion = 0;
        setTimeout( () => { this.router.navigateByUrl('/publicar/operacion-tipo-inmueble'); }, 700 );
      }
    });

    this.crearFormulario();
    this.CargarPublicacion();
    this.CargarCaracteristicasAdicionales();
   }

  ngOnInit(): void {
  }

  crearFormulario() {
    
    // this.caracteristica = this._caracteristicasAdicionales;
    
    //this.caracteristica.push( this.fb.group({ Descripcion:new FormControl('sd'), Valor : ['']}));
    // this.caracteristica.push( this.fb.group({ Descripcion:['s'], Valor : ['1']}));
    // this.caracteristica.push( this.fb.group({ Descripcion:['d'], Valor : [1]}));
    // this.caracteristica.push( this.fb.group({ Descripcion:['ds'], Valor : ['1']}));
    // this.caracteristica.push( this.fb.group({ Descripcion:['as'], Valor : ['']}));
    // this.caracteristica.push( this.fb.group({ Descripcion:['s'], Valor : ['']}));
    // this.caracteristica.push( this.fb.group({ Descripcion:['s'], Valor : ['']}));
    // this.caracteristica.push( this.fb.group({ Descripcion:['s'], Valor : ['']}));
    // this.caracteristica.push( this.fb.group({ Descripcion:['d'], Valor : ['']}));
    // this.caracteristica.push( this.fb.group({ Descripcion:['sd'], Valor : ['']}));
    // this.caracteristica.push( this.fb.group({ Descripcion:['s'], Valor : ['']}));
    // debugger;
    // this.caracteristica.controls[0].setValue({
    //   Descripcion : 'nuevo',
    //   Valor : 1
    // })

      this.formAdicionales = this.fb.group({
        caracteristicasGenerales : this.fb.array([]),
        servicios : this.fb.array([]),
        exteriores : this.fb.array([]),
        ambientes : this.fb.array([])
      });
  }

  get caracteristica(): FormArray {
    return this.formAdicionales.get('caracteristicasGenerales') as FormArray;
  }

  get servicio(): FormArray {
    return this.formAdicionales.get('servicios') as FormArray;
  }

  get exterior(): FormArray {
    return this.formAdicionales.get('exteriores') as FormArray;
  }

  get ambiente(): FormArray {
    return this.formAdicionales.get('ambientes') as FormArray;
  }

  inicializarFormulario() {
    this.formAdicionales.patchValue({
      caracteristicas : this.caracteristica
    });

}

  regresar(){
    this._numeroPaso = 2;

    //setTimeout( () => { this.router.navigateByUrl('/publicar/fotosyvideos'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/fotosyvideos'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  pantallaSiguiente(){
    this._numeroPaso = 2;
    setTimeout( () => { this.router.navigate(['/publicar/pagar-y-activar'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  // seleccionarAntiguedad(intAnios : number){
  //   // debugger;
  //   this._AniosAntiguedad = intAnios;
  //   if ((intAnios === 0) || (intAnios === -1))
  //     this._mostrarAniosAntiguedad = true;
    
  //   else
  //     this._mostrarAniosAntiguedad = false;
  //   // this._AniosAntiguedad = this.formCaracteristicas.controls['aniosAntiguedad'].value;
    
  // }

  CargarCaracteristicasAdicionales(){
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacionCaracteristicas(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
          (data) => {
            //Next callback
            console.log(data);

            //this._caracteristicasAdicionales = data;

            data.forEach( obj => { 
              if (obj.Id_TipoCaracteristica === 1){
                  this.caracteristica.push(this.fb.group({ Id_Caracteristica:[obj.Id_Caracteristica], Id_TipoCaracteristica:[obj.Id_TipoCaracteristica], Descripcion:[obj.Descripcion], Valor : [obj.Valor]}))
                }
                if (obj.Id_TipoCaracteristica === 2){
                  this.servicio.push(this.fb.group({ Id_Caracteristica:[obj.Id_Caracteristica], Id_TipoCaracteristica:[obj.Id_TipoCaracteristica], Descripcion:[obj.Descripcion], Valor : [obj.Valor]}))
                }
                if (obj.Id_TipoCaracteristica === 3){
                  this.exterior.push(this.fb.group({ Id_Caracteristica:[obj.Id_Caracteristica], Id_TipoCaracteristica:[obj.Id_TipoCaracteristica], Descripcion:[obj.Descripcion], Valor : [obj.Valor]}))
                }
                if (obj.Id_TipoCaracteristica === 5){
                  this.ambiente.push(this.fb.group({ Id_Caracteristica:[obj.Id_Caracteristica], Id_TipoCaracteristica:[obj.Id_TipoCaracteristica], Descripcion:[obj.Descripcion], Valor : [obj.Valor]}))
                }
            });

            this.formAdicionales.patchValue({
              caracteristicasGenerales : this.caracteristica,
              servicios : this.servicio,
              exteriores : this.exterior,
              ambientes : this.ambiente
          });

          },
          (error: HttpErrorResponse) => {
            //Error callback

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
  }

  getControlLabel(item : any){
    return item.value['Descripcion']

  }

  guardarCaracteristicas() {

      // this._publicacion.Id_Publicacion = this._id_publicacion;
      // this._publicacion.Id_Cliente = this._loginService.obtenerIdCliente();

      Object.values( this.caracteristica.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          this._adicionales.push(new publicacionCaracteristicaLigth(control.controls['Id_Caracteristica'].value, control.controls['Id_TipoCaracteristica'].value, control.controls['Valor'].value ? 1 : 0))
        }
      });
      Object.values( this.servicio.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          this._adicionales.push(new publicacionCaracteristicaLigth(control.controls['Id_Caracteristica'].value, control.controls['Id_TipoCaracteristica'].value, control.controls['Valor'].value ? 1 : 0))
        }
      });
      Object.values( this.exterior.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          this._adicionales.push(new publicacionCaracteristicaLigth(control.controls['Id_Caracteristica'].value, control.controls['Id_TipoCaracteristica'].value, control.controls['Valor'].value ? 1 : 0))
        }
      });
      Object.values( this.ambiente.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          this._adicionales.push(new publicacionCaracteristicaLigth(control.controls['Id_Caracteristica'].value, control.controls['Id_TipoCaracteristica'].value, control.controls['Valor'].value ? 1 : 0))
        }
      });

      this._publicacionesService.putPublicacionCaracteristicas(this._id_publicacion, this._loginService.obtenerIdCliente(), JSON.stringify(this._adicionales)).subscribe(
        (data) => {

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
            title: 'La información se guardo de manera correcta.'
          });

          if(this._publicacionActivada){
            this._numeroPaso = 2;
            setTimeout( () => { this.router.navigate(['/publicar/operaciontipoinmueble'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
          }
          else{
            this._numeroPaso = 2;
            setTimeout( () => { this.router.navigate(['/publicar/pagar-y-activar'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
          }

        },
        (error: HttpErrorResponse) => {
          //Error callback
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
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
              //this._loginService.cerarSesion();
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

  CargarPublicacion(){
    //debugger;
      if (this._id_publicacion != 0) {
          this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
            (data) => {
              //Next callback
              console.log(data);

              this._publicacion = data;

              if(data.Id_Estatus === 13){
                this._publicacionActivada = true;
              }
  
            },
            (error: HttpErrorResponse) => {
              //Error callback
  
              this._id_publicacion = 0;
              //this.router.navigateByUrl('/publicar/operacion-tipo-inmueble');
  
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

}