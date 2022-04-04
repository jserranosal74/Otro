import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';
import { cliente } from 'src/app/Models/catalogos/cliente.model';

@Component({
  selector: 'app-misanuncios',
  templateUrl: './misanuncios.component.html',
  styleUrls: ['./misanuncios.component.css']
})
export class MisanunciosComponent implements OnInit {

  formaAnuncios = this.fb.group({
    nombre: ['', Validators.required ],
    correo: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$') ], ],
    rfc: ['', Validators.required ],
    telefono: ['', Validators.required ]
  });

  constructor( private fb: FormBuilder,
               private _clienteService: ClientesService
  ) {
  }

  ngOnInit(): void {
  }

}
