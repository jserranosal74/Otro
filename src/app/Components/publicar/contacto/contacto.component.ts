import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  guardarPublicacion() {
    Swal.fire({
      icon: 'success',
      title: 'Buscando....',
      text: 'Espere un momento por favor',
      showCancelButton: false,
      showDenyButton: false,
    });
  }

}
