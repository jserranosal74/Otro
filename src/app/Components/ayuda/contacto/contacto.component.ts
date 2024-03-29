import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

import { contacto } from 'src/app/Models/ayuda/contacto/contacto.model';
import { ContactoService } from 'src/app/Services/Procesos/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  formaContacto = this.fb.group({ });

  _enviandoMensaje = false;

  constructor(private fb: FormBuilder,
              private _contactoService: ContactoService) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }

  crearFormulario() {

    this.formaContacto = this.fb.group({
      nombre   : ['', Validators.required ],
      correo   : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      telefono : ['', Validators.required ],
      asunto   : ['', Validators.required ],
      mensaje  : ['', Validators.required ]
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

      let _contacto = new contacto(
        0,
        this.formaContacto.get('nombre')?.value,
        this.formaContacto.get('correo')?.value,
        this.formaContacto.get('telefono')?.value,
        this.formaContacto.get('asunto')?.value,
        this.formaContacto.get('mensaje')?.value,
        new Date(),
        new Date(),
        1,
        1
      );
  
      this._enviandoMensaje = true;

      this._contactoService.postContacto(_contacto).subscribe(
        (data) => {
          //Next callback
          //console.log('datos: ',data);

          // Swal.fire({
          //   icon: 'success',
          //   title: 'Gracias por mensaje',
          //   text: 'Se revisara el mensaje y si es necesario nos pondremos en contacto con usted.',
          //   showCancelButton: false,
          //   showDenyButton: false,
          // });

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
            title: 'Se revisara el mensaje y si es necesario nos pondremos en contacto con usted.'
          });

          this._enviandoMensaje = false;

          this.limpiarFormulario();
        },
        (error: HttpErrorResponse) => {
          //Error callback

          this._enviandoMensaje = false;
          
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
