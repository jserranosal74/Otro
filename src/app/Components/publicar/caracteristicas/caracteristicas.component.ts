import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';


import { publicacion } from 'src/app/Models/procesos/publicacion.model';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent implements OnInit {
  _numeroPaso = 1;
  _publicacion: publicacion = new publicacion(0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0);
  _id_publicacion : number = 0;
  _AniosAntiguedad : number | null = 0;
  _mostrarAniosAntiguedad : boolean = false;

  _checkMoneda1 : boolean = false;
  _checkMoneda2 : boolean = false;

  _checkNueva : boolean = false;
  _checkEnConstruccion : boolean = false;
  _checkAnios : boolean = false;

  formCaracteristicas = this.fb.group({
    recamaras             : [ '' ],
    banios                : [ '' ],
    mediosbanios          : [ '' ],
    estacionamientos      : [ '' ],
    superficieConstruida  : [ '' ],
    superficieTerreno     : [ '' ],
    coutaMantenimiento    : [ '' ],
    aniosAntiguedad       : [ '' ],
    precioInmueble        : [ '' ],
    moneda                : [ '' ],
    precioNegociable      : [ '' ],
    titulo                : [ '' ],
    descripcion           : [ '' ]
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
    this.inicializarFormulario();
    this.CargarPublicacion();
   }

  ngOnInit(): void {
  }

  crearFormulario() {
      this.formCaracteristicas = this.fb.group({
        recamaras             : [ '' ],
        banios                : [ '' ],
        mediosbanios          : [ '' ],
        estacionamientos      : [ '' ],
        superficieConstruida  : [ '' ],
        superficieTerreno     : [ '' ],
        coutaMantenimiento    : [ '' ],
        aniosAntiguedad       : [ '' ],
        precioInmueble        : [ '' ],
        moneda                : [ '' ],
        precioNegociable      : [ '' ],
        titulo                : [ '' ],
        descripcion           : [ '' ]
      });

  }

  inicializarFormulario() {
    this.formCaracteristicas.patchValue({
      recamaras             : 0 ,
      banios                : 0 ,
      mediosbanios          : 0 ,
      estacionamientos      : 0 ,
      superficieConstruida  : 0 ,
      superficieTerreno     : 0 ,
      coutaMantenimiento    : 0 ,
      aniosAntiguedad       : '' ,
      precioInmueble        : 0 ,
      moneda                : '',
      precioNegociable      : 0 ,
      titulo                : '' ,
      descripcion           : '' 
    });

}

  regresar(){
    this._numeroPaso = 2;

    //setTimeout( () => { this.router.navigateByUrl('/publicar/fotosyvideos'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/ubicacion'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  pantallaSiguiente(){
    this._numeroPaso = 2;
    setTimeout( () => { this.router.navigate(['/publicar/fotosyvideos'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  seleccionarAntiguedad(intAnios : number){
    // debugger;
    this._AniosAntiguedad = intAnios;
    if ((intAnios === 0) || (intAnios === -1))
      this._mostrarAniosAntiguedad = true;
    
    else
      this._mostrarAniosAntiguedad = false;
    // this._AniosAntiguedad = this.formCaracteristicas.controls['aniosAntiguedad'].value;
    
  }

  CargarPublicacion(){
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
          (data) => {
            //Next callback
            console.log(data);

            this._publicacion = data;

            this._checkMoneda1 = data.Id_Moneda == 1 ? true : false;
            this._checkMoneda2 = data.Id_Moneda == 2 ? true : false;

            this._checkNueva = data.Antiguedad === 0 ? true : false;
            this._checkEnConstruccion = data.Antiguedad === -1 ? true : false;
            this._checkAnios = data.Antiguedad! >= 1 ? true : false;

            if (data.Antiguedad! <= 0){
              this._mostrarAniosAntiguedad = true;
            }
            else{
              this._mostrarAniosAntiguedad = false;
            }

            this.formCaracteristicas.patchValue({
              recamaras             : data.RecamarasDesde,
              banios                : data.BaniosCompDesde,
              mediosbanios          : data.MedioBanio,
              estacionamientos      : data.EstacionamientosDesde,
              superficieConstruida  : data.SuperficieConstruidaDesde,
              superficieTerreno     : data.SuperficieTerreno,
              coutaMantenimiento    : data.CuotaMantenimiento,
              aniosAntiguedad       : data.Antiguedad,
              precioInmueble        : data.PrecioDesde,
              moneda                : data.Id_Moneda,
              precioNegociable      : data.PrecioNegociable,
              titulo                : data.TituloPublicacion,
              descripcion           : data.Descripcion
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

  guardarCaracteristicas() {

    //Envio de la informacion al servidor
      debugger;
      this._publicacion.Id_Publicacion = this._id_publicacion;
      this._publicacion.Id_Cliente = this._loginService.obtenerIdCliente();
      this._publicacion.RecamarasDesde = this.formCaracteristicas.get('recamaras')?.value;
      this._publicacion.BaniosCompDesde = this.formCaracteristicas.get('banios')?.value;
      this._publicacion.MedioBanio = this.formCaracteristicas.get('mediosbanios')?.value;
      this._publicacion.EstacionamientosDesde = this.formCaracteristicas.get('estacionamientos')?.value;
      this._publicacion.SuperficieConstruidaDesde = this.formCaracteristicas.get('superficieConstruida')?.value;
      this._publicacion.SuperficieTerreno = this.formCaracteristicas.get('superficieTerreno')?.value;
      this._publicacion.CuotaMantenimiento = this.formCaracteristicas.get('coutaMantenimiento')?.value;
      // this._publicacion.Antiguedad = this.formCaracteristicas.get('aniosAntiguedad')?.value;
      if ((this._AniosAntiguedad === 0) || (this._AniosAntiguedad === -1))
        this._publicacion.Antiguedad = this._AniosAntiguedad;
      else
        this._publicacion.Antiguedad = this.formCaracteristicas.get('aniosAntiguedad')?.value

      this._publicacion.PrecioDesde = this.formCaracteristicas.get('precioInmueble')?.value;
      this._publicacion.Id_Moneda = this.formCaracteristicas.get('moneda')?.value;

      if (this.formCaracteristicas.get('precioNegociable')?.value)
        this._publicacion.PrecioNegociable = 1;
      else
        this._publicacion.PrecioNegociable = 0;

      this._publicacion.TituloPublicacion = this.formCaracteristicas.get('titulo')?.value;
      this._publicacion.Descripcion = this.formCaracteristicas.get('descripcion')?.value;
      this._publicacion.FechaModificacion = new Date();

      this._publicacionesService.putPublicacion(this._publicacion).subscribe(
        (data) => {

          this._numeroPaso = 2;
          setTimeout( () => { this.router.navigate(['/publicar/fotosyvideos'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );

          Swal.fire({
            icon: 'success',
            title: 'Se actualizaron los cambios',
            showConfirmButton: false,
            timer: 500
          })

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
