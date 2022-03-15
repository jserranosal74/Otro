import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacionprincipal',
  templateUrl: './informacionprincipal.component.html',
  styleUrls: ['./informacionprincipal.component.css'],
})
export class InformacionprincipalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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
