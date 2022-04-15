import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { publicacion } from 'src/app/Models/procesos/publicacion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fotosyvideos',
  templateUrl: './fotosyvideos.component.html',
  styleUrls: ['./fotosyvideos.component.css']
})
export class FotosyvideosComponent implements OnInit {
  _numeroPaso = 1;
  _publicacion: publicacion = new publicacion(0,0,null,0,0,null,null,'','','',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, null, null, new Date(), new Date(),0,0);
  _id_publicacion : number = 0;

  constructor( private _activatedRoute: ActivatedRoute,
               private router: Router) { 

    this._activatedRoute.queryParams.subscribe(params => {
      this._id_publicacion = params['id_Publicacion'];
      if (this._id_publicacion === undefined){
        this._id_publicacion = 0;
        setTimeout( () => { this.router.navigateByUrl('/publicar/operaciontipoinmueble'); }, 700 );
      }
    });

  }

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
    // setTimeout( () => { this.router.navigateByUrl('/publicar/ubicacion'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/caracteristicas'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  pantallaSiguiente(){
    this._numeroPaso = 2;
    setTimeout( () => { this.router.navigate(['/publicar/pagar-y-activar'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  
  }

  guardarFotosyVideos() {
    this._numeroPaso = 2;

    setTimeout( () => { this.router.navigateByUrl('/publicar/pagar-y-activar'); }, 700 );
    // setTimeout( () => { this.router.navigate(['/publicar/operacionestipoinmueble'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

}
