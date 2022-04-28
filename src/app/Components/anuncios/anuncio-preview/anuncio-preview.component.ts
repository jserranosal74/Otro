import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { publicacion } from 'src/app/Models/procesos/publicacion.model';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';

@Component({
  selector: 'app-anuncio-preview',
  templateUrl: './anuncio-preview.component.html',
  styleUrls: ['./anuncio-preview.component.css']
})
export class AnuncioPreviewComponent implements OnInit {
  _parametro : string = '';
  _id_publicacion : number = 0;
  _publicacion: publicacion = new publicacion(0,0,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0);

  constructor(  private _activatedRoute : ActivatedRoute,
                private router : Router,
                private _publicacionesService: PublicacionesService,
               private _loginService: LoginService ) {
    this._activatedRoute.queryParams.subscribe(params => {
      this._parametro = this._activatedRoute.snapshot.params['info'];
      this._id_publicacion = parseInt(this._parametro.split('-')[this._parametro.split('-').length-1]);
      if (this._id_publicacion === undefined){
        setTimeout( () => { this.router.navigateByUrl('/micuenta/miperfil'); }, 700 );
      }
    });
    this.probarAutenticacion();
    this.CargarPublicacion();
  }

  ngOnInit(): void {
  }

  probarAutenticacion(){
    this._loginService.sesionValida().subscribe((data)=> { 

    },(error : HttpErrorResponse) => {
    console.log('error',error);
        switch (error.status) {
          case 401:
            this._loginService.cerarSesion();
            this.router.navigateByUrl('/login');
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

  CargarPublicacion(){
    //debugger;
      if (this._id_publicacion != 0) {
          this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
            (data) => {
              //Next callback
              console.log(data);

              this._publicacion = data;
  
            },
            (error: HttpErrorResponse) => {
              //Error callback
  
              this._id_publicacion = 0;
              //this.router.navigateByUrl('/publicar/operacion-tipo-inmueble');
  
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

}
