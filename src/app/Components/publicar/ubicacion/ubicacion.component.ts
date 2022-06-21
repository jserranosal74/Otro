import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { AsentamientosService } from '../../../Services/Catalogos/asentamientos.service';
import { EstadosService } from '../../../Services/Catalogos/estados.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { MunicipiosService } from '../../../Services/Catalogos/municipios.service';
import { PublicacionesService } from '../../../Services/Procesos/publicaciones.service';

import { asentamiento } from '../../../Models/catalogos/asentamiento.model';
import { estado } from '../../../Models/catalogos/estado.model';
import { municipio } from '../../../Models/catalogos/municipio.model';
import { publicacion } from 'src/app/Models/procesos/publicacion.model';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  _estados: estado[] = [];
  _municipios : municipio[] = [];
  _asentamientos : asentamiento[] = [];
  _asentamiento : asentamiento = new asentamiento(0,0,0,0,'','',0,0,new Date(), new Date(), 0, 0);
  _estadoSeleccionado : number = 0;
  _municipioSeleccionado : number = 0;
  _asentamientoSeleccionado : number = 0;
  _numeroPaso = 1;
  _publicacion: publicacion = new publicacion(0,0,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0);
  _id_publicacion : number = 0;
  _mostrarUbicacionExacta : boolean =false;

  loading : boolean = false;

  formaUbicacion = this.fb.group({
    estado : ['', Validators.required ],
    municipio : ['', Validators.required ],
    asentamiento : ['', Validators.required ],
    calleynumero : ['' ]
  });

  constructor( private _activatedRoute: ActivatedRoute,
               private _estadoService: EstadosService,
               private _municipioService: MunicipiosService,
               private _asentamientosService: AsentamientosService,
               private _publicacionesService: PublicacionesService,
               private _loginService: LoginService,
               private router: Router,
               private fb: FormBuilder) {

    this._activatedRoute.queryParams.subscribe(params => {
      this._id_publicacion = params['Id_Publicacion'];
      if (this._id_publicacion === undefined){
        this._id_publicacion = 0;
        setTimeout( () => { this.router.navigateByUrl('/publicar/operacion-tipo-inmueble'); }, 700 );
      }
    });

    this.crearFormulario();
    this.obtenerEstados();
    this._estadoSeleccionado = 0;
    this._municipioSeleccionado = 0;
    this._asentamientoSeleccionado = 0;
    this.CargarPublicacion();
   }

  ngOnInit(): void {
  }

  obtenerEstados(){
    //console.log('obtenerEstados' + this.loading);
    this._estadoService.getEstados(1).subscribe((data) => {
      this._estados = data;
      this.loading = true;
      this._municipios = [];
      // return 0;
    });
    
  }
  
  obtenerMunicipios(Id_Estado : number, Id_Municipio : number){
    // console.log('cargando municipios: ' + Id_Estado);

    if (Id_Estado == 0){
      this._municipioService.getMunicipios(this.formaUbicacion.controls['estado'].value).subscribe((data) => {
        this._municipios = data;
        this._asentamientos = [];
      });
    }
    else{
      this._municipioService.getMunicipios(Id_Estado).subscribe((data) => {
        this._municipios = data;
        this.obtenerAsentamientos(Id_Estado, Id_Municipio);

      });
    }
  }

  obtenerAsentamientos(Id_Estado : number, Id_Municipio : number){
    //console.log(this.loading);
    if (Id_Municipio == 0){
      this._asentamientosService.getAsentamientos(this.formaUbicacion.controls['estado'].value, this.formaUbicacion.controls['municipio'].value).subscribe((data) => {
        this._asentamientos = data;
        //this._Asentamientos.unshift(new asentamiento(0,0,0,0,'Selecccione el Asentamiento','',0,0,new Date(),new Date(),1,1));
        //this.loading = true;
        //return 0;
      });
    }
    else{
      this._asentamientosService.getAsentamientos(Id_Estado, Id_Municipio).subscribe((data) => {
        this._asentamientos = data;
        //this._Asentamientos.unshift(new asentamiento(0,0,0,0,'Selecccione el Asentamiento','',0,0,new Date(),new Date(),1,1));
        //this.loading = true;
        //return 0;
      });
    }

  }

  obtenerAsentamiento(objPublicacion : publicacion){
    //console.log(this.loading);

    this._asentamientosService.getAsentamiento(objPublicacion.Id_Asentamiento!).subscribe((data) => {
      this._asentamiento = data;

      this.estadoSeleccionado(data.Id_Estado, data.Id_Municipio);
      
      this.formaUbicacion.patchValue({
        estado : data.Id_Estado,
        municipio : data.Id_Municipio,
        asentamiento : data.Id_Asentamiento,
        calleynumero : objPublicacion.Direccion
      })
      
    });

  }

  get estadoNoValido() {
    return this.formaUbicacion.get('estado')?.invalid && this.formaUbicacion.get('estado')?.touched
  }

  get municipioNoValido() {
    return this.formaUbicacion.get('municipio')?.invalid && this.formaUbicacion.get('municipio')?.touched
  }

  get asentamientoNoValido() {
    return this.formaUbicacion.get('asentamiento')?.invalid && this.formaUbicacion.get('asentamiento')?.touched
  }

  get calleynumeroNoValido() {
    return this.formaUbicacion.get('calleynumero')?.invalid && this.formaUbicacion.get('calleynumero')?.touched
  }

crearFormulario() {

    this.formaUbicacion = this.fb.group({
        estado       : [ '', Validators.required ],
        municipio    : [ '', Validators.required ],
        asentamiento : [ '', Validators.required ],
        calleynumero : [ '' ]
    });
  }

  regresar(){
    this._numeroPaso = 2;

    //setTimeout( () => { this.router.navigateByUrl('/publicar/operacion-tipo-inmueble'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/operacion-tipo-inmueble'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  pantallaSiguiente(){
    this._numeroPaso = 2;
    setTimeout( () => { this.router.navigate(['/publicar/caracteristicas'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  guardarUbicacion() {
    //console.log( this.formaUbicacion );
    // debugger;
    if ( this.formaUbicacion.invalid ) {

      return Object.values( this.formaUbicacion.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
     
    }
    else{
      //Envio de la informacion al servidor
      debugger;
      this._publicacion.Id_Publicacion = this._id_publicacion;
      this._publicacion.Id_Cliente = this._loginService.obtenerIdCliente();
      this._publicacion.Id_Asentamiento = this.formaUbicacion.get('asentamiento')?.value;
      this._publicacion.Direccion = this.formaUbicacion.get('calleynumero')?.value;
      this._publicacion.MostrarDireccionExacta = this._mostrarUbicacionExacta === true ? 1 : 0;
      this._publicacion.FechaModificacion = new Date();

      this._publicacionesService.putPublicacion(this._publicacion).subscribe(
        (data) => {

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
            title: 'La información se guardo de manera correcta.'
          });

          this._numeroPaso = 2;
          setTimeout( () => { this.router.navigate(['/publicar/caracteristicas'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );

        },
        (error: HttpErrorResponse) => {
          //Error callback
          //console.log('Error del servicio: ', error.error['Descripcion']);

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

  CargarPublicacion(){
    //debugger;
      if (this._id_publicacion != 0) {
          this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
            (data) => {
              //Next callback
              //console.log(data);

              this._mostrarUbicacionExacta = data.MostrarDireccionExacta === 0 ? false : true;

              this._publicacion = data;

              this.obtenerAsentamiento(data);
  
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

  estadoSeleccionado(Id_Estado : number, Id_Municipio : number){
    //debugger;
    this.obtenerMunicipios(Id_Estado, Id_Municipio);
  }

  municipioSeleccionado(){
    //console.log('sel:' + sel + ',' + this.formaUbicacion.controls['direccion'].value.municipio);
    this.obtenerAsentamientos(0,0);
  }

  asentamientoSeleccionado(){
    //debugger;
    console.log('asentamientoSeleccionado: ' + this.formaUbicacion.controls['asentamiento'].value);
    //console.log(sel);
  }

  limpiarAsentamientos(){
    this._asentamientos = [];
  }

  buscarAsentamientos(){

    if (this.formaUbicacion.invalid) {
      return Object.values(this.formaUbicacion.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    } else {

      this._asentamientosService.getAsentamientosPaginado(parseInt(this.formaUbicacion.controls['estado'].value),parseInt(this.formaUbicacion.controls['municipio'].value), 0, 10).subscribe(
        (data) => {
          //Next callback
  
          this._asentamientos = data;

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
              break;
            case 403:
              break;
            case 404:
              break;
            case 409:
              break;
          }
  
          //throw error;   //You can also throw the error to a global error handler
        }
      );


    }
    
  }

  cambiarMDE(){
    this._mostrarUbicacionExacta = !this._mostrarUbicacionExacta;
  }

}
