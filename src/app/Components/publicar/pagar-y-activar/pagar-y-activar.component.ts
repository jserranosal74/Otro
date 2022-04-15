import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { publicacion } from 'src/app/Models/procesos/publicacion.model';


@Component({
  selector: 'app-pagar-y-activar',
  templateUrl: './pagar-y-activar.component.html',
  styleUrls: ['./pagar-y-activar.component.css']
})
export class PagarYActivarComponent implements OnInit {
  _numeroPaso = 1;
  _publicacion: publicacion = new publicacion(0,0,null,0,0,null,null,'','','',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, null, null, new Date(), new Date(),0,0);
  _id_publicacion : number = 0;

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

  constructor( private _activatedRoute: ActivatedRoute,
               private fb: FormBuilder,
               private router: Router) {

    this._activatedRoute.queryParams.subscribe(params => {
      this._id_publicacion = params['id_Publicacion'];
      if (this._id_publicacion === undefined){
        this._id_publicacion = 0;
        setTimeout( () => { this.router.navigateByUrl('/publicar/operaciontipoinmueble'); }, 700 );
      }
    });

    this.crearFormulario();
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
    setTimeout( () => { this.router.navigate(['/publicar/fotosyvideos'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  pantallaSiguiente(){
    this._numeroPaso = 2;
    setTimeout( () => { this.router.navigate(['/publicar/operaciontipoinmueble'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  guardarCaracteristicas() {

    this._numeroPaso = 2;

    //setTimeout( () => { this.router.navigateByUrl('/publicar/operaciontipoinmueble'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/operaciontipoinmueble'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );

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
