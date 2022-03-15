import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  profileForm = this.fb.group({
    nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
    apellido: ['', [Validators.required ] ],
    correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
    usuario : ['' ],
    pass1   : ['', Validators.required ],
    pass2   : ['', Validators.required ],
    direccion: this.fb.group({
      distrito: ['', Validators.required ],
      ciudad  : ['', Validators.required ],
    }),
    pasatiempos: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.profileForm.get('nombre')?.invalid && this.profileForm.get('nombre')?.touched
  }

  get apellidoNoValido() {
    return this.profileForm.get('apellido')?.invalid && this.profileForm.get('apellido')?.touched
  }

  get correoNoValido() {
    return this.profileForm.get('correo')?.invalid && this.profileForm.get('correo')?.touched
  }

  get usuarioNoValido() {
    return this.profileForm.get('usuario')?.invalid && this.profileForm.get('usuario')?.touched
  }

  get distritoNoValido() {
    return this.profileForm.get('direccion.distrito')?.invalid && this.profileForm.get('direccion.distrito')?.touched
  }

  get ciudadNoValido() {
    return this.profileForm.get('direccion.ciudad')?.invalid && this.profileForm.get('direccion.ciudad')?.touched
  }

    crearFormulario() {

    this.profileForm = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      apellido: ['', [Validators.required ] ],
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      usuario : ['' ],
      direccion: this.fb.group({
        distrito: ['', Validators.required ],
        ciudad  : ['', Validators.required ],
      })
    });

  }

  guardar() {
    console.log( this.profileForm );

    if ( this.profileForm.invalid ) {

      return Object.values( this.profileForm.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
        
      });
     
    }

    // Posteo de información
    this.profileForm.reset({
      nombre: 'Sin nombre'
    });

  }

}
