import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BancosService } from 'src/app/Services/Catalogos/bancos.service';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PlanesclienteService } from 'src/app/Services/Procesos/planesCliente.service';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';

import { publicacion } from '../../../Models/procesos/publicacion.model';
import { banco } from '../../../Models/catalogos/banco.model';
import { plancliente } from '../../../Models/procesos/plancliente.model';

@Component({
  selector: 'app-pagar-y-activar',
  templateUrl: './pagar-y-activar.component.html',
  styleUrls: ['./pagar-y-activar.component.css']
})
export class PagarYActivarComponent implements OnInit {
  _numeroPaso = 1;
  _publicacion: publicacion = new publicacion(0,0,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0);
  _id_publicacion : number = 0;
  _bancos : banco[] = [];
  _planesCliente : plancliente[] = [];

  formCaracteristicas = this.fb.group({
    nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
    apellido: ['', [Validators.required ] ],
    correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
    usuario : ['' ],
    pass1   : ['', Validators.required ],
    pass2   : ['', Validators.required ],
    direccion: this.fb.group({
      estado : ['', Validators.required ],
      ciudad : ['', Validators.required ],
      calle  : ['', Validators.required ],
    }),
    pasatiempos: this.fb.array([])
  });

  constructor(  private _activatedRoute: ActivatedRoute,
                private _publicacionesService: PublicacionesService,
                private _planClienteService: PlanesclienteService,
                private _bancosService: BancosService,
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
    this.obtenerPlanesCliente();
    this.obtenerBancos();
    this.CargarPublicacion();
   }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.formCaracteristicas.get('nombre')?.invalid && this.formCaracteristicas.get('nombre')?.touched
  }

  get apellidoNoValido() {
    return this.formCaracteristicas.get('apellido')?.invalid && this.formCaracteristicas.get('apellido')?.touched
  }

  get correoNoValido() {
    return this.formCaracteristicas.get('correo')?.invalid && this.formCaracteristicas.get('correo')?.touched
  }

  get usuarioNoValido() {
    return this.formCaracteristicas.get('usuario')?.invalid && this.formCaracteristicas.get('usuario')?.touched
  }

  get distritoNoValido() {
    return this.formCaracteristicas.get('direccion.estado')?.invalid && this.formCaracteristicas.get('direccion.estado')?.touched
  }

  get ciudadNoValido() {
    return this.formCaracteristicas.get('direccion.ciudad')?.invalid && this.formCaracteristicas.get('direccion.ciudad')?.touched
  }

  get calleNoValido() {
    return this.formCaracteristicas.get('direccion.calle')?.invalid && this.formCaracteristicas.get('direccion.calle')?.touched
  }

    crearFormulario() {

    this.formCaracteristicas = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      apellido: ['', [Validators.required ] ],
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      usuario : ['' ],
      direccion: this.fb.group({
        estado : ['', Validators.required ],
        ciudad : ['', Validators.required ],
        calle  : ['', Validators.required ],
      })
    });

  }

  regresar(){
    this._numeroPaso = 2;

    //setTimeout( () => { this.router.navigateByUrl('/publicar/fotosyvideos'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/adicionales'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  pantallaSiguiente(){
    this._numeroPaso = 2;
    setTimeout( () => { this.router.navigate(['/publicar/operacion-tipo-inmueble'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  obtenerPlanesCliente(){
    let Id_Usuario = this._loginService.obtenerIdCliente();
    this._planClienteService.getPlanesCliente(Id_Usuario).subscribe(
      (data) => {
        //console.log('----datos---: ', data);

        this._planesCliente = data;

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

  obtenerBancos(){
    if (this._id_publicacion != 0) {
      this._bancosService.getBancos().subscribe(
        (data) => {
          //console.log(data);
          this._bancos = data;

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
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
          (data) => {
            //console.log(data);
            this._publicacion = data;

            if(data.Id_Estatus === 13){
              setTimeout( () => { this.router.navigate(['/publicar/operacion-tipo-inmueble'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
            }

          },
          (error: HttpErrorResponse) => {

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

  seleccionarBanco(objBanco : banco){
    //TODO
  }

  elegirPlanCliente(objPlanCliente : plancliente){
    //TODO
  }

  guardarPagaryActivar() {

    this._numeroPaso = 2;

    //setTimeout( () => { this.router.navigateByUrl('/publicar/operacion-tipo-inmueble'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/operacion-tipo-inmueble'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );

    return;

    console.log( this.formCaracteristicas );

    if ( this.formCaracteristicas.invalid ) {

      return Object.values( this.formCaracteristicas.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
        
      });
     
    }
    else{
      //Envio de la informacion al servidor

      // Reseteo de la información
    this.formCaracteristicas.reset({
      nombre  : '',
      apellido: '',
      correo  : '',
      usuario : '',
      pass1   : '',
      pass2   : '',
      direccion: this.fb.group({
        estado : '',
        ciudad : '',
        calle  : '',
      }),
      pasatiempos: this.fb.array([])
    });
    }
  }

}
