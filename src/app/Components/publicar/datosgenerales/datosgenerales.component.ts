import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datosgenerales',
  templateUrl: './datosgenerales.component.html',
  styleUrls: ['./datosgenerales.component.css']
})
export class DatosgeneralesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  guardarPublicacion(){
    Swal.fire({
      icon: 'success',
      title: 'Buscando....',
      text: 'Espere un momento por favor',
      showCancelButton:false,
      showDenyButton:false
    })

  }

}
