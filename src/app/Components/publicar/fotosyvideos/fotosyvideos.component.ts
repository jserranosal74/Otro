import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';

import { publicacion } from 'src/app/Models/procesos/publicacion.model';
import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { imagenModel } from '../../../Models/procesos/publicacion.model';
import { MultimediaPublicacionService } from '../../../Services/Procesos/FotosPublicacion.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fotosyvideos',
  templateUrl: './fotosyvideos.component.html',
  styleUrls: ['./fotosyvideos.component.css']
})
export class FotosyvideosComponent implements OnInit {
  _numeroPaso = 1;
  _publicacion: publicacion = new publicacion(0,0,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Date(),new Date(),0,0);
  _id_publicacion : number = 0;
  _multimediaPublicacion : imagenModel[] = [];
  _loading = false;

  formaMultimedia = this.fb.group({
    urlVideo         : [ '' ],
    fotosPropiedad   : this.fb.array([]),
    videosPropiedad  : this.fb.array([]),
    planos           : [ '' ]
  });

  constructor(  private _activatedRoute: ActivatedRoute,
                private _fotosPublicacionService: MultimediaPublicacionService,
                private _loginService: LoginService,
                private fb: FormBuilder,
                private sanitizer: DomSanitizer,
                private router: Router) { 
//debugger;
    this._activatedRoute.queryParams.subscribe(params => {
      this._id_publicacion = params['id_Publicacion'];
      if (this._id_publicacion === undefined){
        this._id_publicacion = 0;
        setTimeout( () => { this.router.navigateByUrl('/publicar/adicionales'); }, 700 );
      }
    });
    this.CrearFormulario();
    this.CargarFotosPublicacion();
  }

  ngOnInit(): void {
  }

  CrearFormulario() {
    this.formaMultimedia = this.fb.group({
      urlVideo         : [ '' ],
      fotosPropiedad   : this.fb.array([]),
      videosPropiedad  : this.fb.array([]),
      planos           : [ '' ]
    });
  }

  CargarFotosPublicacion(){
    //debugger;
    if (this._id_publicacion != 0) {
        this._fotosPublicacionService.getFotosPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()).subscribe(
          (data) => {

            console.log(data);

            data.forEach(element => {
              if (element.Id_TipoMultimedia === 1) {
                this.imagenes.push( this.fb.group({ Id_Multimedia : element.Id_Multimedia, 
                                                    Id_TipoMultimedia : element.Id_TipoMultimedia,
                                                    Url : element.Url, 
                                                    Descripcion : element.Descripcion,
                                                    Predeterminada : element.Predeterminada,
                                                    ImagenBase64 : ''
                                                  }));
              }
            });

            data.forEach(element => {
              if (element.Id_TipoMultimedia === 2) {
                this.videos.push( this.fb.group({ Id_Multimedia : element.Id_Multimedia, 
                                                  Id_TipoMultimedia : element.Id_TipoMultimedia,
                                                  Url : element.Url, 
                                                  Descripcion : element.Descripcion,
                                                  Predeterminada : element.Predeterminada,
                                                  ImagenBase64 : ''
                                                }));
              }
            });

            this.formaMultimedia.setValue({
              urlVideo         : '',
              fotosPropiedad   : this.imagenes,
              videosPropiedad  : this.videos,
              planos           : ''
            });

          },
          (error: HttpErrorResponse) => {
            
            //this._id_publicacion = 0;
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
    // this.imagenes.clear();
    for (let index = 0; index < lstArchivos!.length; index++) {
      if (this.imagenes.controls.length === 0) {
        this.imagenes.push( this.fb.group({ Id_Multimedia : 0, 
                                          Id_TipoMultimedia : 1,
                                          Url : this.readFileAsText(lstArchivos![index]), 
                                          Descripcion : null, 
                                          Predeterminada : true,
                                          ImagenBase64 : '' }));
      }
      else{
        this.imagenes.push( this.fb.group({ Id_Multimedia : 0, 
          Id_TipoMultimedia : 1,
          Url : this.readFileAsText(lstArchivos![index]), 
          Descripcion : null, 
          Predeterminada : false,
          ImagenBase64 : '' }));
      }
    }

  }

  obtenerInfoUrl(item : any){
    if (typeof(item.controls['Url'].value) == 'string'){
      return item.controls['Url'].value;
    }else{
      return item.controls['Url'].value.__zone_symbol__value;
    }
  }

  obtenerInfoUrlVideo(item : any){
      return this.sanitizer.bypassSecurityTrustResourceUrl(item.controls['Url'].value);
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

borrarFotografia(control : any,  i : number ) {
  //debugger;
  if (control.controls['Predeterminada'].value){
    if ( i >= 1 ){
      this.imagenes.controls[i-1].patchValue({Predeterminada : true});
    }
    else if (i === 0 && this.imagenes.controls.length > 1){
      this.imagenes.controls[i+1].patchValue({Predeterminada : true});
    }
    else if (i === 0 && this.imagenes.controls.length === 1){
      this.imagenes.removeAt(i);
      return;
    }
    this.imagenes.removeAt(i);
    // Object.values( this.imagenes.controls ).forEach( control => {
    //   if ( control instanceof FormGroup ) {
    //     console.log('control',control);
    //     //control.controls['Predeterminada'].setValue(true);
    //   }
    // });
  }
  else{
    this.imagenes.removeAt(i);
  }
}

agregarVideo(){
  //debugger;
  //this.videos.clear();
    if (this.videos.controls.length === 0) {
      this.videos.push( this.fb.group({ Id_Multimedia : 0, 
                                        Id_TipoMultimedia : 2,
                                        Url : this.formaMultimedia.controls['urlVideo'].value, 
                                        Descripcion : this.formaMultimedia.controls['urlVideo'].value, 
                                        Predeterminada : true,
                                        ImagenBase64 : '' }));
    }
    else{
      this.videos.push( this.fb.group({ Id_Multimedia : 0, 
                                        Id_TipoMultimedia : 2,
                                        Url : this.formaMultimedia.controls['urlVideo'].value, 
                                        Descripcion : this.formaMultimedia.controls['urlVideo'].value, 
                                        Predeterminada : false,
                                        ImagenBase64 : '' }));
    }
    //this.formaFotosyVideos.controls['urlVideo'].value;
}

borrarVideo(control : any,  i : number){
  debugger;
  if (control.controls['Predeterminada'].value){
    if ( i >= 1 ){
      this.videos.controls[i-1].patchValue({Predeterminada : true});
    }
    else if (i === 0 && this.videos.controls.length > 1){
      this.videos.controls[i+1].patchValue({Predeterminada : true});
    }
    else if (i === 0 && this.videos.controls.length === 1){
      this.videos.removeAt(i);
      return;
    }
    this.videos.removeAt(i);
  }
  else{
    this.videos.removeAt(i);
  }
}

obtenerEstado(control: any){
  return control.controls['Predeterminada'].value;
}

cambiarPredeterminado(control : any){
  Object.values( this.imagenes.controls ).forEach( control => {
    if ( control instanceof FormGroup ) {
      control.controls['Predeterminada'].setValue(false);
    }
  });
  control.controls['Predeterminada'].value = true;
}

cambiarVideoPredeterminado(control : any){
  Object.values( this.videos.controls ).forEach( control => {
    if ( control instanceof FormGroup ) {
      control.controls['Predeterminada'].setValue(false);
    }
  });
  control.controls['Predeterminada'].value = true;
}

  get imagenes(): FormArray {
    return this.formaMultimedia.get('fotosPropiedad') as FormArray;
  }

  get videos(): FormArray {
    return this.formaMultimedia.get('videosPropiedad') as FormArray;
  }

  guardarFotosyVideos() {

  this._multimediaPublicacion = [];
  this._loading = true;
  //debugger;
    Object.values( this.imagenes.controls ).forEach( control => {
      if ( control instanceof FormGroup ) {
        //console.log('control.controls[Url]', control);
        if (typeof(control.controls['Url'].value) == 'string'){
          this._multimediaPublicacion.push(new imagenModel( control.controls['Id_Multimedia'].value, 
                                                          control.controls['Id_TipoMultimedia'].value,
                                                          control.controls['Url'].value,
                                                          'm',
                                                          control.controls['Descripcion'].value,
                                                          control.controls['Predeterminada'].value ? 1 : 0));
        }
        else{
          this._multimediaPublicacion.push(new imagenModel( control.controls['Id_Multimedia'].value, 
                                                          control.controls['Id_TipoMultimedia'].value,
                                                          'a',
                                                          control.controls['Url'].value.__zone_symbol__value.split(',')[1],
                                                          control.controls['Descripcion'].value,
                                                          control.controls['Predeterminada'].value ? 1 : 0));
                                                    
        }

      }
    });

    Object.values( this.videos.controls ).forEach( control => {
      if ( control instanceof FormGroup ) {
        //console.log('control.controls[Url]', control);
        if (typeof(control.controls['Url'].value) == 'string'){
          this._multimediaPublicacion.push(new imagenModel( control.controls['Id_Multimedia'].value, 
                                                          control.controls['Id_TipoMultimedia'].value,
                                                          control.controls['Url'].value,
                                                          'm',
                                                          control.controls['Descripcion'].value,
                                                          control.controls['Predeterminada'].value ? 1 : 0));
        }
      }
    });


    this._fotosPublicacionService.postFotosPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente(), this._multimediaPublicacion).subscribe(
      (data) => {
        //Next callback
        console.log(data);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'La informacion se guardo de manera correcta.'
        });

        this._loading = false;

        this.imagenes.clear();
        this.videos.clear();

        this.CargarFotosPublicacion();

        // Comentadas las siguientes 2 lineas de manera temporal
        this._numeroPaso = 2;
        setTimeout( () => { this.router.navigate(['/publicar/adicionales'], { queryParams: { id_Publicacion: this._id_publicacion } }); }, 500 );

      },
      (error: HttpErrorResponse) => {
        //Error callback

        switch (error.status) {
          case 401:
            Swal.fire({
              icon: 'error',
              title: 'Acceso no autorizado',
              text: 'debera autenticarse',
              showCancelButton: false,
              showDenyButton: false,
            });
            this._loginService.cerarSesion();
            break;
          case 403:
            //console.log('error 403');
            break;
          case 404:
            //console.log('error 404');
            break;
          case 409:
            //console.log('error 409');
            break;
        }

      }
    );

  }

}
