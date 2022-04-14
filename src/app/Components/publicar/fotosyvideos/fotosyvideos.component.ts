import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fotosyvideos',
  templateUrl: './fotosyvideos.component.html',
  styleUrls: ['./fotosyvideos.component.css']
})
export class FotosyvideosComponent implements OnInit {
  _numeroPaso = 1;

  constructor(private router: Router) { }

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

  regresar(){
    this._numeroPaso = 2;

    setTimeout( () => { this.router.navigateByUrl('/publicar/ubicacion'); }, 700 );
  }

  guardarFotosyVideos() {
    this._numeroPaso = 2;

    setTimeout( () => { this.router.navigateByUrl('/publicar/caracteristicas'); }, 700 );
  }

}
