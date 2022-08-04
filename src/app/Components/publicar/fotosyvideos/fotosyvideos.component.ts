import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';
import { imagenModel, publicacion } from '../../../Models/procesos/publicacion.model';
import { MultimediaPublicacionService } from '../../../Services/Procesos/MultimediaPublicacion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { configuracion } from 'src/app/Models/catalogos/condiguracion.model';
import { ConfiguracionService } from 'src/app/Services/Catalogos/configuracion.service';
import { PublicacionesService } from 'src/app/Services/Procesos/publicaciones.service';

@Component({
  selector: 'app-fotosyvideos',
  templateUrl: './fotosyvideos.component.html',
  styleUrls: ['./fotosyvideos.component.css']
})
export class FotosyvideosComponent implements OnInit {
  _publicacion! : publicacion;
  _numeroPaso = 1;
  _id_publicacion : number = 0;
  _multimediaPublicacion : imagenModel[] = [];
  _configuraciones : configuracion[] = [];
  _loading = false;
  _NumeroFotos = 0;
  _NumeroPlanos = 0;
  _TamanioArchivo = 0;

  formaMultimedia = this.fb.group({});

  constructor(  private _activatedRoute: ActivatedRoute,
                private _multimediaPublicacionService: MultimediaPublicacionService,
                private _configuracionService: ConfiguracionService,
                private _loginService: LoginService,
                private fb: FormBuilder,
                private sanitizer: DomSanitizer,
                private _publicacionesService: PublicacionesService,
                private router: Router) { 
//debugger;
    this._activatedRoute.queryParams.subscribe(params => {
      this._id_publicacion = params['Id_Publicacion'];
      if (this._id_publicacion === undefined){
        this._id_publicacion = 0;
        setTimeout( () => { this.router.navigateByUrl('/publicar/adicionales'); }, 700 );
      }
    });
    this.CargarPublicacion();
    this.CrearFormulario();
    this.CargarMultimediaPublicacion();
    this.ObtenerConfiguraciones();
  }

  ngOnInit(): void {
  }

  CrearFormulario() {
    this.formaMultimedia = this.fb.group({
      urlVideo        : [ '' ],
      fotosPropiedad  : this.fb.array([]),
      planosPropiedad : this.fb.array([]),
      videosPropiedad : this.fb.array([])
    });
  }

  CargarMultimediaPublicacion(){
    //debugger;
    if (this._id_publicacion != 0) {
        this._multimediaPublicacionService.getMultimediaPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()!, null).subscribe(
          (data) => {

            console.log(data);

            data.forEach(element => {
              if (element.Id_TipoMultimedia === 1) {
                this.imagenes.push( this.fb.group({ Id_Multimedia     : element.Id_Multimedia, 
                                                    Id_TipoMultimedia : element.Id_TipoMultimedia,
                                                    Url               : element.Url, 
                                                    Url_Medium        : element.Url_Medium, 
                                                    Url_Thumb         : element.Url_Thumb, 
                                                    Descripcion       : element.Descripcion,
                                                    Predeterminada    : element.Predeterminada,
                                                    ImagenBase64      : ''
                                                  }));
              }
            });

            data.forEach(element => {
              if (element.Id_TipoMultimedia === 3) {
                this.planos.push( this.fb.group({ Id_Multimedia     : element.Id_Multimedia, 
                                                  Id_TipoMultimedia : element.Id_TipoMultimedia,
                                                  Url               : element.Url, 
                                                  Url_Medium        : element.Url_Medium, 
                                                  Url_Thumb         : element.Url_Thumb, 
                                                  Descripcion       : element.Descripcion,
                                                  Predeterminada    : element.Predeterminada,
                                                  ImagenBase64      : ''
                                                }));
              }
            });

            data.forEach(element => {
              if (element.Id_TipoMultimedia === 2) {
                this.videos.push( this.fb.group({ Id_Multimedia     : element.Id_Multimedia, 
                                                  Id_TipoMultimedia : element.Id_TipoMultimedia,
                                                  Url               : element.Url, 
                                                  Url_Medium        : element.Url_Medium, 
                                                  Url_Thumb         : element.Url_Thumb, 
                                                  Descripcion       : element.Descripcion,
                                                  Predeterminada    : element.Predeterminada,
                                                  ImagenBase64      : ''
                                                }));
              }
            });

            // this.formaMultimedia.patchValue({
            //   fotosPropiedad  : this.imagenes,
            //   planosPropiedad : this.planos,
            //   videosPropiedad : this.videos
            // });

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

  ObtenerConfiguraciones(){
    //debugger;
    this._configuracionService.getConfiguracion(null).subscribe(
      (data) => {

        //console.log('ObtenerConfiguraciones',data);

        this._configuraciones = data;

        data.forEach(item=> {
          if (item.Configuracion === 'TamanioArchivos')
            this._TamanioArchivo = item.Valor;
        })
    
        this._configuraciones.forEach(item=> {
          if (item.Configuracion === 'Planos')
          this._NumeroPlanos = item.Valor;
        })

        this._configuraciones.forEach(item=> {
          if (item.Configuracion === 'Fotos')
          this._NumeroFotos = item.Valor;
        })
    

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

  regresar(){
    this._numeroPaso = 2;
    // setTimeout( () => { this.router.navigateByUrl('/publicar/ubicacion'); }, 700 );
    setTimeout( () => { this.router.navigate(['/publicar/caracteristicas'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );
  }

  pantallaSiguiente(){
    this._numeroPaso = 2;
    setTimeout( () => { this.router.navigate(['/publicar/adicionales'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );
  
  }

  obtenerArchivosFotografias(archivos : Event){
    debugger;
    let lstArchivos = (<HTMLInputElement>archivos.target).files;
    let lstArrayArch = Array.prototype.slice.call(lstArchivos);
    let errortamanio = false;
    
    lstArrayArch.forEach(item => {
      if (((item.size/1024)/1024) > this._TamanioArchivo)
      {
        Swal.fire({
          icon  : 'error',
          title : 'El tamaño máximo del archivo debe de ser de ' + this._TamanioArchivo + ' MB',
          html  : 'El archivo <strong>' + item.name + '</strong> es demasiado grande.<br>Reduzca su tamaño por favor.',
          showCancelButton: false,
          showDenyButton: false,
        });

        errortamanio = true;
      }
    });

    if ((lstArrayArch.length + this.imagenes.length) > this._NumeroFotos){
      Swal.fire({
        icon  : 'error',
        title : 'El número de fotos a guardar excede el número de fotos máximo que son: ' + this._NumeroFotos,
        html  : 'Solo cargue máximo <strong>' + this._NumeroFotos + '</strong> fotos',
        showCancelButton: false,
        showDenyButton: false,
      });
      (<HTMLInputElement>archivos.target).value = '';
      return;
    }

    if (errortamanio)
    {
      (<HTMLInputElement>archivos.target).value = '';
      return;
    }

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

  obtenerArchivosPlanos(archivos : Event){
    //debugger;
    let lstArchivos = (<HTMLInputElement>archivos.target).files;
    let lstArrayArch = Array.prototype.slice.call(lstArchivos);
    let errortamanio = false;

    lstArrayArch.forEach(item => {
      if (((item.size/1024)/1024) > this._TamanioArchivo)
      {
        Swal.fire({
          icon  : 'error',
          title : 'El tamaño máximo del archivo debe de ser de ' + this._TamanioArchivo + ' MB',
          html  : 'El archivo <strong>' + item.name + '</strong> es demasiado grande.<br>Reduzca su tamaño por favor.',
          showCancelButton: false,
          showDenyButton: false,
        });

        errortamanio = true;
      }
    });

    if ((lstArrayArch.length + this.planos.length) > this._NumeroPlanos){
      Swal.fire({
        icon  : 'error',
        title : 'El número de planos a guardar excede el número de planos máximo que son: ' + this._NumeroPlanos,
        html  : 'Solo cargue máximo <strong>' + this._NumeroPlanos + '</strong> planos.',
        showCancelButton: false,
        showDenyButton: false,
      });
      (<HTMLInputElement>archivos.target).value = '';
      return;
    }

    if (errortamanio)
    {
      (<HTMLInputElement>archivos.target).value = '';
      return;
    }

    for (let index = 0; index < lstArchivos!.length; index++) {
      if (this.planos.controls.length === 0) {
        this.planos.push( this.fb.group({ Id_Multimedia : 0, 
                                          Id_TipoMultimedia : 3,
                                          Url : this.readFileAsText(lstArchivos![index]), 
                                          Descripcion : null, 
                                          Predeterminada : true,
                                          ImagenBase64 : '' }));
      }
      else{
        this.planos.push( this.fb.group({ Id_Multimedia : 0, 
                                          Id_TipoMultimedia : 3,
                                          Url : this.readFileAsText(lstArchivos![index]), 
                                          Descripcion : null, 
                                          Predeterminada : false,
                                          ImagenBase64 : '' }));
      }
    }

  }

  obtenerInfoUrl(item : any){
    if (typeof(item.controls['Url'].value) == 'string'){
      return item.controls['Url_Medium'].value;
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

borrarPlano(control : any,  i : number ) {
  //debugger;
  if (control.controls['Predeterminada'].value){
    if ( i >= 1 ){
      this.planos.controls[i-1].patchValue({Predeterminada : true});
    }
    else if (i === 0 && this.planos.controls.length > 1){
      this.planos.controls[i+1].patchValue({Predeterminada : true});
    }
    else if (i === 0 && this.planos.controls.length === 1){
      this.planos.removeAt(i);
      return;
    }
    this.planos.removeAt(i);
    // Object.values( this.imagenes.controls ).forEach( control => {
    //   if ( control instanceof FormGroup ) {
    //     console.log('control',control);
    //     //control.controls['Predeterminada'].setValue(true);
    //   }
    // });
  }
  else{
    this.planos.removeAt(i);
  }
}

agregarVideo(){
  debugger;
  //this.videos.clear();

  if (this.formaMultimedia.controls['urlVideo'].value === ''){
    Swal.fire({
      icon  : 'error',
      title : 'Escriba la Url del video a agregar',
      html  : 'o teclea la dirección del video a agregar a tu anuncio.',
      showCancelButton: false,
      showDenyButton: false,
    });
    return;
  }

    if (this.videos.controls.length === 0) {
      this.videos.push( this.fb.group({ Id_Multimedia : 0, 
                                        Id_TipoMultimedia : 2,
                                        Url : this.formaMultimedia.controls['urlVideo'].value, 
                                        Descripcion : '', 
                                        Predeterminada : true,
                                        ImagenBase64 : '' }));
    }
    else{
      this.videos.push( this.fb.group({ Id_Multimedia : 0, 
                                        Id_TipoMultimedia : 2,
                                        Url : this.formaMultimedia.controls['urlVideo'].value, 
                                        Descripcion : '', 
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

cambiarPlanoPredeterminado(control : any){
  Object.values( this.planos.controls ).forEach( control => {
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

  get planos(): FormArray {
    return this.formaMultimedia.get('planosPropiedad') as FormArray;
  }

  get videos(): FormArray {
    return this.formaMultimedia.get('videosPropiedad') as FormArray;
  }

  guardarFotosPlanosyVideos() {
    debugger;
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
                                                            control.controls['Url_Medium'].value,
                                                            control.controls['Url_Thumb'].value,
                                                            'm',
                                                            control.controls['Descripcion'].value,
                                                            control.controls['Predeterminada'].value ? 1 : 0));
        }
        else{
          this._multimediaPublicacion.push(new imagenModel( control.controls['Id_Multimedia'].value, 
                                                          control.controls['Id_TipoMultimedia'].value,
                                                          'a',
                                                          null,
                                                          null,
                                                          control.controls['Url'].value.__zone_symbol__value.split(',')[1],
                                                          control.controls['Descripcion'].value,
                                                          control.controls['Predeterminada'].value ? 1 : 0));
                                                    
        }

      }
    });

    Object.values( this.planos.controls ).forEach( control => {
      if ( control instanceof FormGroup ) {
        //console.log('control.controls[Url]', control);
        if (typeof(control.controls['Url'].value) == 'string'){
          this._multimediaPublicacion.push(new imagenModel( control.controls['Id_Multimedia'].value, 
                                                            control.controls['Id_TipoMultimedia'].value,
                                                            control.controls['Url'].value,
                                                            control.controls['Url_Medium'].value,
                                                            control.controls['Url_Thumb'].value,
                                                            'm',
                                                            control.controls['Descripcion'].value,
                                                            control.controls['Predeterminada'].value ? 1 : 0));
        }
        else{
          this._multimediaPublicacion.push(new imagenModel( control.controls['Id_Multimedia'].value, 
                                                            control.controls['Id_TipoMultimedia'].value,
                                                            'a',
                                                            null,
                                                            null,
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
                                                            null,
                                                            null,
                                                            'm',
                                                            control.controls['Descripcion'].value,
                                                            control.controls['Predeterminada'].value ? 1 : 0));
        }
      }
    });

    debugger;
    this._multimediaPublicacionService.postFotosPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()!, this._multimediaPublicacion).subscribe(
      (data) => {
        //Next callback
        console.log(data);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
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

        this.CargarMultimediaPublicacion();

        // Comentadas las siguientes 2 lineas de manera temporal
        this._numeroPaso = 2;
        setTimeout( () => { this.router.navigate(['/publicar/adicionales'], { queryParams: { Id_Publicacion: this._id_publicacion } }); }, 500 );

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

  CargarPublicacion(){
    //debugger;
      if (this._id_publicacion != 0) {
          this._publicacionesService.getPublicacion(this._id_publicacion, this._loginService.obtenerIdCliente()!).subscribe(
            (data) => {
              //Next callback
              //console.log(data);

              this._publicacion = data;

              if((data.Id_Estatus === 13) || (data.Id_Estatus === 14)){
                this.router.navigateByUrl('/micuenta/mis-anuncios');
              }
  
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
