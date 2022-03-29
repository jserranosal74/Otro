import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {

  formIniciarsesion = this.fb.group({
    correo    : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
    password1 : ['', Validators.required ],
    password2 : ['', Validators.required ],
  });

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  crearFormulario() {

    this.formIniciarsesion = this.fb.group({
      correo    : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password1 : ['', Validators.required ],
      password2 : ['', Validators.required ],
    });

  }

  iniciarSesion() {

    console.log( this.formIniciarsesion );

    if ( this.formIniciarsesion.invalid ) {

      return Object.values( this.formIniciarsesion.controls ).forEach( control => {
        
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
    this.formIniciarsesion.reset({
      correo    : '',
      password1 : '',
      password2 : '',
    });
    }

    
    Swal.fire({
      icon: 'success',
      title: 'Buscando....',
      text: 'Espere un momento por favor',
      showCancelButton: false,
      showDenyButton: false,
    });
  }

  get correoNoValido() {
    return this.formIniciarsesion.get('correo')?.invalid && this.formIniciarsesion.get('correo')?.touched
  }

  get password1NoValido() {
    return this.formIniciarsesion.get('password1')?.invalid && this.formIniciarsesion.get('password1')?.touched
  }

}
