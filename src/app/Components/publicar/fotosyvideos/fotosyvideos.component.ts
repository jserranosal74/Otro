import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { publicacion } from 'src/app/Models/procesos/publicacion.model';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';
import { archivo } from 'src/app/Models/Auxiliares/archivo.model';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-fotosyvideos',
  templateUrl: './fotosyvideos.component.html',
  styleUrls: ['./fotosyvideos.component.css']
})
export class FotosyvideosComponent implements OnInit {
  _numeroPaso = 1;
  _publicacion: publicacion = new publicacion(0,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0);
  _id_publicacion : number = 0;
  //_listaFotos : string[] = [];
  //_archivos : archivo[] = [];
  //imageURL = '';

  formaFotosyVideos = this.fb.group({
    fotosPropiedad   : this.fb.array([]),
    URLvideo         : [ '' ],
    planos           : [ '' ]
  });

  constructor(  private _activatedRoute: ActivatedRoute,
                private _publicacionesService: PublicacionesService,
                private _loginService: LoginService,
                private fb: FormBuilder,
                private router: Router) { 

    this._activatedRoute.queryParams.subscribe(params => {
      this._id_publicacion = params['id_Publicacion'];
      if (this._id_publicacion === undefined){
        this._id_publicacion = 0;
        setTimeout( () => { this.router.navigateByUrl('/publicar/adicionales'); }, 700 );
      }
    });
    this.CrearFormulario();
    this.CargarPublicacion();
  }

  ngOnInit(): void {
  }

  CrearFormulario() {
    this.formaFotosyVideos = this.fb.group({
      fotosPropiedad   : this.fb.array([]),
      URLvideo         : [ '' ],
      planos           : [ '' ]
    });
  }

  CargarPublicacion(){
    return;
    if (this._id_publicacion != 0) {
        this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
          (data) => {
            //console.log(data);
            this._publicacion = data;

          },
          (error: HttpErrorResponse) => {
            
            this._id_publicacion = 0;
            this.router.navigateByUrl('/publicar/operacion-tipo-inmueble');

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

          }
        );
      }
  }

  regresar(){
    this._numeroPaso = 2;
    // setTimeout( () => { this.router.navigateByUrl('/publicar/ubicacion'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/caracteristicas'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  pantallaSiguiente(){
    this._numeroPaso = 2;
    setTimeout( () => { this.router.navigate(['/publicar/adicionales'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  
  }

  obtenerArchivos(archivos : Event){
    //debugger;
    let lstArchivos = (<HTMLInputElement>archivos.target).files;

    this.imagenes.clear();

    for (let index = 0; index < lstArchivos!.length; index++) {
      this.imagenes.push( this.fb.group({ Id_FotoPublicacion : 0, ImagenURL : this.readFileAsText(lstArchivos![index]), Descripcion : lstArchivos![index].name + '-' + index, FotoPrincipal : 0 }));
    }

  }

  obtenerInfo(item : any){
    return item.controls['ImagenURL'].value.__zone_symbol__value;
  }

  readFileAsText(file : File){
    return new Promise(function(resolve,reject){
        let fr = new FileReader();

        fr.onload = function(){
            resolve(fr.result);
        };

        fr.onerror = function(){
            reject(fr);
        };
        fr.readAsDataURL(file);
    });
}


  get imagenes(): FormArray {
    return this.formaFotosyVideos.get('fotosPropiedad') as FormArray;
  }

  guardarFotosyVideos() {

    debugger;
    // this._numeroPaso = 2;
    // setTimeout( () => { this.router.navigate(['/publicar/adicionales'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
    // setTimeout( () => { this.router.navigate(['/publicar/operacionestipoinmueble'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );
  }

}
