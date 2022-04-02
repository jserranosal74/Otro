import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  formaContacto = this.fb.group({
    nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
    correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
    telefono : ['', Validators.required ],
    asunto   : ['', Validators.required ],
    mensaje   : ['', Validators.required ]
  });

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  crearFormulario() {

    this.formaContacto = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      telefono : ['', Validators.required ],
      asunto   : ['', Validators.required ],
      mensaje   : ['', Validators.required ]
    });

  }

  enviarSolicitud(){
    console.log( this.formaContacto );

    if ( this.formaContacto.invalid ) {

      return Object.values( this.formaContacto.controls ).forEach( control => {
        
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
      this.limpiarFormulario();
  }
}

get nombreNoValido() {
  return this.formaContacto.get('nombre')?.invalid && this.formaContacto.get('nombre')?.touched
}

get correoNoValido() {
  return this.formaContacto.get('correo')?.invalid && this.formaContacto.get('correo')?.touched
}

get telefonoNoValido() {
  return this.formaContacto.get('telefono')?.invalid && this.formaContacto.get('telefono')?.touched
}

get asuntoNoValido() {
  return this.formaContacto.get('asunto')?.invalid && this.formaContacto.get('asunto')?.touched
}

get mensajeNoValido() {
  return this.formaContacto.get('mensaje')?.invalid && this.formaContacto.get('mensaje')?.touched
}

  limpiarFormulario(){
    this.formaContacto.reset({
      nombre  : '',
      correo  : '',
      telefono : '',
      asunto   : '',
      mensaje   : ''
    });
  }

}
