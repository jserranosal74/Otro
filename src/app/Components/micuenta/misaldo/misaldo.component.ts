import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';
import { cliente } from 'src/app/Models/catalogos/cliente.model';

@Component({
  selector: 'app-misaldo',
  templateUrl: './misaldo.component.html',
  styleUrls: ['./misaldo.component.css']
})
export class MisaldoComponent implements OnInit {

  formaPlanes = this.fb.group({
    nombre: ['', Validators.required ],
    correo: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$') ], ],
    rfc: ['', Validators.required ],
    telefono: ['', Validators.required ]
  });

  constructor( private fb: FormBuilder,
               private _clienteService: ClientesService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.formaPlanes = this.fb.group({
      nombre: ['', Validators.required ],
      correo: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$') ], ],
      rfc: ['', Validators.required ],
      telefono: ['', Validators.required ]
    });
  }

  limpiarFormulario(){
    // Reseteo de la información
    this.formaPlanes.reset({
      nombre: ['', Validators.required ],
      correo: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$') ], ],
      rfc: ['', Validators.required ],
      telefono: ['', Validators.required ]
    });
  }

  guardarPerfil() {

    Swal.fire({
      icon: 'success',
      title: 'Aqui se mostrara el detalle del plan',
      text: 'Revise su correo por favor para activar su cuenta.',
      showCancelButton: false,
      showDenyButton: false,
    });
      
    }

}