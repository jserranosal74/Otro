import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent implements OnInit {

  formDetalle = this.fb.group({
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

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.formDetalle.get('nombre')?.invalid && this.formDetalle.get('nombre')?.touched
  }

  get apellidoNoValido() {
    return this.formDetalle.get('apellido')?.invalid && this.formDetalle.get('apellido')?.touched
  }

  get correoNoValido() {
    return this.formDetalle.get('correo')?.invalid && this.formDetalle.get('correo')?.touched
  }

  get usuarioNoValido() {
    return this.formDetalle.get('usuario')?.invalid && this.formDetalle.get('usuario')?.touched
  }

  get distritoNoValido() {
    return this.formDetalle.get('direccion.estado')?.invalid && this.formDetalle.get('direccion.estado')?.touched
  }

  get ciudadNoValido() {
    return this.formDetalle.get('direccion.ciudad')?.invalid && this.formDetalle.get('direccion.ciudad')?.touched
  }

  get calleNoValido() {
    return this.formDetalle.get('direccion.calle')?.invalid && this.formDetalle.get('direccion.calle')?.touched
  }

    crearFormulario() {

    this.formDetalle = this.fb.group({
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

  guardarDetalles() {
    console.log( this.formDetalle );

    if ( this.formDetalle.invalid ) {

      return Object.values( this.formDetalle.controls ).forEach( control => {
        
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
    this.formDetalle.reset({
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
