import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = this.fb.group({
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

    this.formLogin = this.fb.group({
      correo    : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password1 : ['', Validators.required ],
      password2 : ['', Validators.required ],
    });

  }

  guardarRegistro() {

    console.log( this.formLogin );

    if ( this.formLogin.invalid ) {

      return Object.values( this.formLogin.controls ).forEach( control => {
        
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
    this.formLogin.reset({
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
    return this.formLogin.get('correo')?.invalid && this.formLogin.get('correo')?.touched
  }

  get password1NoValido() {
    return this.formLogin.get('password1')?.invalid && this.formLogin.get('password1')?.touched
  }

  get password2NoValido() {
    return this.formLogin.get('password2')?.invalid && this.formLogin.get('password2')?.touched
  }

}
