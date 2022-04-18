import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { estado } from '../../../Models/catalogos/estado.model';
import { municipio } from '../../../Models/catalogos/municipio.model';
import { asentamiento, pagina, paginadoDetalle } from '../../../Models/catalogos/asentamiento.model';
import { EstadosService } from '../../../Services/Catalogos/estados.service';
import { MunicipiosService } from '../../../Services/Catalogos/municipios.service';
import { AsentamientosService } from '../../../Services/Catalogos/asentamientos.service';
import { LoginService } from '../../../Services/Catalogos/login.service';

@Component({
  selector: 'app-asentamientos',
  templateUrl: './asentamientos.component.html',
  styleUrls: ['./asentamientos.component.css']
})
export class AsentamientosComponent implements OnInit {
  _estados : estado[] = [];
  _municipios : municipio[] = [];
  _estadosModal : estado[] = [];
  _municipiosModal : municipio[] = [];
  _asentamientos : asentamiento[] = [];
  _asentamiento : asentamiento = new asentamiento(0,0,0,0,'','',0,0,new Date(),new Date(),0,0);
  _paginadoDetalle : paginadoDetalle = new paginadoDetalle(0,0);

  _paginas: pagina[] = [];
  _numeroPaginasMostrar = 5;
  _paginaActual = 0;
  _paginaInicial = 0;
  _paginaFinal = 4;
  _mostrarPaginaAnterior = true;
  _mostrarPaginaSiguiente = true;

  _textoAccion ='';
  _esNuevo : boolean = false;
  _loading:boolean = false;
  _seRealizaBusqueda = false;

  @ViewChild('myModalClose') modalClose : any;

  formaBusqueda = this.fb.group({
    estado : ['', [Validators.required] ],
    municipio : ['', [Validators.required] ]
  });

  formaAsentamiento = this.fb.group({
    estadomodal : ['', [Validators.required] ],
    municipiomodal : ['', [Validators.required] ],
    asentamiento : ['', [Validators.required] ],
    codigopostal : ['', [Validators.required] ],
    latitud : ['', [Validators.required] ],
    longitud : ['', [Validators.required] ]
  });

  constructor( private fb: FormBuilder,
               private _estadosService: EstadosService,
               private _municipiosService: MunicipiosService,
               private _asentamientosService: AsentamientosService,
               private _loginService : LoginService) {
    
    this.crearFormularioBusquda();
    this.crearFormularioAsentamiento();
    this.obtenerEstados();
   }

  ngOnInit(): void {
  }

  crearFormularioBusquda() {
    this.formaBusqueda = this.fb.group({
      estado : ['', [Validators.required] ],
      municipio : ['', [Validators.required] ],
    });
  }

  crearFormularioAsentamiento() {
    this.formaAsentamiento = this.fb.group({
      estadomodal : ['', [Validators.required] ],
      municipiomodal : ['', [Validators.required] ],
      asentamiento : ['', [Validators.required] ],
      codigopostal : ['', [Validators.required] ],
      latitud : ['', [Validators.required] ],
      longitud : ['', [Validators.required] ]
    });
    this._asentamiento = new asentamiento(0,0,0,0,'','',0,0,new Date(),new Date(),0,0);
  }

  obtenerEstados() {

    // Por default enviamos 1 como Pais = Mexico
    this._estadosService.getEstados(1).subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        this._estados = data;
        this._estadosModal = data;

        this._municipios = [];
        this._municipiosModal = [];
        this._paginadoDetalle = new paginadoDetalle(0,0);

        this._asentamientos = [];
      },
      (error: HttpErrorResponse) => {
        //Error callback

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: '',
          showCancelButton: false,
          showDenyButton: false,
        });

        switch (error.status) {
          case 401:
            //console.log('error 401');
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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  obtenerMunicipios() {

    this._paginadoDetalle = new paginadoDetalle(0,0);
    
    this._municipiosService.getMunicipios(parseInt(this.formaBusqueda.controls['estado'].value)).subscribe(
      (data) => {
        //Next callback
        // console.log('datos: ', data);

        this._municipios = data;

        this._asentamientos = [];

        this._seRealizaBusqueda = false;

      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: '',
          showCancelButton: false,
          showDenyButton: false,
        });

        switch (error.status) {
          case 401:
            //console.log('error 401');
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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  obtenerMunicipiosModal() {

    this._municipiosService.getMunicipios(parseInt(this.formaAsentamiento.controls['estadomodal'].value)).subscribe(
      (data) => {
        //Next callback
        console.log('datos: ', data);

        this._municipiosModal = data;

      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: '',
          showCancelButton: false,
          showDenyButton: false,
        });

        switch (error.status) {
          case 401:
            //console.log('error 401');
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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  buscarAsentamientos(){

    if (this.formaBusqueda.invalid) {
      return Object.values(this.formaBusqueda.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    } else {

      this._asentamientosService.getAsentamientosPaginado(parseInt(this.formaBusqueda.controls['estado'].value),parseInt(this.formaBusqueda.controls['municipio'].value), 0, 10).subscribe(
        (data) => {
          //Next callback
  
          this._asentamientos = data;
  
          if (data.length > 0) {
            this._seRealizaBusqueda = true;
          }

          // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
          this._asentamientosService.getAsentamientosPaginadoDet(parseInt(this.formaBusqueda.controls['estado'].value),parseInt(this.formaBusqueda.controls['municipio'].value), 10).subscribe(
            (data) => {
              //Next callback
              console.log(data);
              this._paginadoDetalle = data;

              this.CargarPaginador(0);
      
            },
            (error: HttpErrorResponse) => {
              
              switch (error.status) {
                case 401:
                  //console.log('error 401');
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
      
              //throw error;   //You can also throw the error to a global error handler
            }
          );



  
        },
        (error: HttpErrorResponse) => {
          //Error callback
          //console.log('Error del servicio: ', error.error['Descripcion']);
  
          Swal.fire({
            icon: 'error',
            title: error.error['Descripcion'],
            text: '',
            showCancelButton: false,
            showDenyButton: false,
          });
  
          switch (error.status) {
            case 401:
              //console.log('error 401');
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
  
          //throw error;   //You can also throw the error to a global error handler
        }
      );


    }
    
  }

  CargarPaginador(paginaActual : number){
    // this._paginadoDetalle;
    this._paginas = [];

    if ( this._paginadoDetalle.TotalPaginas <= this._numeroPaginasMostrar ){
      for (let index = 0; index < this._paginadoDetalle.TotalPaginas; index++) {
        if (index == paginaActual)
          this._paginas.push(new pagina(true, index));
        else
          this._paginas.push(new pagina(false, index));
      }
      this._paginaInicial = 0;
      this._paginaFinal = this._paginadoDetalle.TotalPaginas;
    }
    else if ( paginaActual <= (this._paginadoDetalle.TotalPaginas - this._numeroPaginasMostrar) ){
      for (let index = paginaActual; index < (paginaActual + this._numeroPaginasMostrar); index++) {
        if (index == paginaActual)
          this._paginas.push(new pagina(true, index));
        else
          this._paginas.push(new pagina(false, index));
      }
      this._paginaInicial = paginaActual + 1;
      this._paginaFinal = paginaActual + this._numeroPaginasMostrar;
    }
    else {
        for (let index = (this._paginadoDetalle.TotalPaginas - this._numeroPaginasMostrar); index < this._paginadoDetalle.TotalPaginas; index++) {
          if (index == paginaActual)
          this._paginas.push(new pagina(true, index));
        else
          this._paginas.push(new pagina(false, index));
        }
        this._paginaInicial = (this._paginadoDetalle.TotalPaginas - this._numeroPaginasMostrar);
        this._paginaFinal = this._paginadoDetalle.TotalPaginas;
      }
    
    console.log(this._paginas);

    if ( paginaActual == 0 && paginaActual <= this._numeroPaginasMostrar && this._numeroPaginasMostrar >= this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = false;
      this._mostrarPaginaSiguiente = false;
      console.log('Configuracion 1');
    }
    else if(paginaActual > 0 && this._paginaFinal < this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = true;
      this._mostrarPaginaSiguiente = true;
      console.log('Configuracion 2');
    }
    else if(paginaActual >= 0 && this._paginaFinal < this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = false;
      this._mostrarPaginaSiguiente = true;
      console.log('Configuracion 3');
    }
    else if(paginaActual > 0 && this._paginaFinal == this._paginadoDetalle.TotalPaginas){
      this._mostrarPaginaAnterior = true;
      this._mostrarPaginaSiguiente = false;
      console.log('Configuracion 4');
    }

    console.log('paginaActual:' + paginaActual, 'this._paginaFinal:' + this._paginaFinal);

    this._paginaActual = paginaActual;

  }

  obtenerPaginaAnterior(){
    this.obtenerPagina(this._paginaActual - 1);
  }

  obtenerPaginaSiguiente(){
    this.obtenerPagina(this._paginaActual + 1);
  }

  obtenerPagina(item : number){
    // alert(item);

    this._asentamientosService.getAsentamientosPaginado(parseInt(this.formaBusqueda.controls['estado'].value),parseInt(this.formaBusqueda.controls['municipio'].value), item, 10).subscribe(
      (data) => {
        //Next callback

        this._asentamientos = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        this.CargarPaginador(item);

      },
      (error: HttpErrorResponse) => {
        //Error callback
        //console.log('Error del servicio: ', error.error['Descripcion']);

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: '',
          showCancelButton: false,
          showDenyButton: false,
        });

        switch (error.status) {
          case 401:
            //console.log('error 401');
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

        //throw error;   //You can also throw the error to a global error handler
      }
    );


  }

  limpiarAsentamientos(){
    this._asentamientos = [];
    this._paginadoDetalle = new paginadoDetalle(0,0);
    this._seRealizaBusqueda = false;
  }

  limpiarFormularioAsentamiento(){
    this._textoAccion = 'Agregar';

    this.formaAsentamiento.reset({
      estadomodal : '',
      municipiomodal : '',
      asentamiento : '',
      codigopostal : '',
      latitud : '',
      longitud : ''
    });
    this._asentamiento = new asentamiento(0,0,0,0,'','',0,0,new Date(),new Date(),0,0);
  }

  obtenerAsentamiento(objAsentamiento : asentamiento){
    this._textoAccion = 'Modificar';
    this._asentamiento = objAsentamiento;
    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];

    this.formaAsentamiento.setValue({
      estadomodal : objAsentamiento.Id_Estado,
      municipiomodal : objAsentamiento.Id_Municipio,
      asentamiento: objAsentamiento.Asentamiento,
      codigopostal: objAsentamiento.CodigoPostal,
      latitud: objAsentamiento.Latitud,
      longitud: objAsentamiento.Longitud,
    });

    this.obtenerMunicipiosModal();

    return;

    // this._asentamientosService.getAsentamiento(objAsentamiento.Id_Asentamiento).subscribe(
    //   (data) => {
    //     //Next callback
    //     debugger;

    //     this.formaAsentamiento.setValue({
    //       estadomodal : data.Id_Estado,
    //       municipiomodal : data.Id_Municipio,
    //       asentamiento: data.Asentamiento,
    //       codigopostal: data.CodigoPostal,
    //       latitud: data.Latitud,
    //       longitud: data.Longitud,
    //     });

    //     this.obtenerMunicipiosModal();
        
    //     this.formaAsentamiento.setValue({
    //       municipiomodal : data.Id_Municipio
    //     });

    //     // this.limpiarFormulario();
    //   },
    //   (error: HttpErrorResponse) => {
    //     //Error callback
    //     //console.log('Error del servicio: ', error.error['Descripcion']);

    //     Swal.fire({
    //       icon: 'error',
    //       title: error.error['Descripcion'],
    //       text: '',
    //       showCancelButton: false,
    //       showDenyButton: false,
    //     });

    //     switch (error.status) {
    //       case 401:
    //         //console.log('error 401');
    //         break;
    //       case 403:
    //         //console.log('error 403');
    //         break;
    //       case 404:
    //         //console.log('error 404');
    //         break;
    //       case 409:
    //         //console.log('error 409');
    //         break;
    //     }

    //     //throw error;   //You can also throw the error to a global error handler
    //   }
    // );

  }

  guardarAsentamiento(){
    if (this.formaAsentamiento.invalid) {
      return Object.values(this.formaAsentamiento.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    } else {
      //Envio de la informacion al servidor

      if (this._asentamiento.Id_Asentamiento != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._asentamiento.Id_Estado = this.formaAsentamiento.get('estadomodal')?.value;
      this._asentamiento.Id_Municipio = this.formaAsentamiento.get('municipiomodal')?.value;
      this._asentamiento.Id_TipoAsentamiento = 3;
      this._asentamiento.Asentamiento = this.formaAsentamiento.get('asentamiento')?.value;
      this._asentamiento.CodigoPostal = this.formaAsentamiento.get('codigopostal')?.value;
      this._asentamiento.Latitud = this.formaAsentamiento.get('latitud')?.value;
      this._asentamiento.Longitud = this.formaAsentamiento.get('longitud')?.value;
      this._asentamiento.FechaAlta = new Date();
      this._asentamiento.FechaModificacion = new Date();
      this._asentamiento.Id_Usuario = 1;
      this._asentamiento.Id_Estatus = 1;

      if (this._esNuevo){
        this._asentamiento.Id_Asentamiento = 0;
        this._asentamientosService.postAsentamiento(this._asentamiento).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'El asentamiento se agrego de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            //this.obtenerAsentamiento();
  
            this.limpiarFormularioAsentamiento();
          },
          (error: HttpErrorResponse) => {
            //Error callback
            //console.log('Error del servicio: ', error.error['Descripcion']);
  
            Swal.fire({
              icon: 'error',
              title: error.error['Descripcion'],
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
  
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
      else{
        this._asentamientosService.putAsentamiento(this._asentamiento).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'El asentamiento se modifico de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            // this.obtenerAmenidades();
  
            this.limpiarFormularioAsentamiento();
          },
          (error: HttpErrorResponse) => {
            //Error callback
            //console.log('Error del servicio: ', error.error['Descripcion']);
  
            Swal.fire({
              icon: 'error',
              title: 'ERROR',
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
  
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
  }

  eliminarAsentamiento(objAsentamiento : asentamiento){
    // this._textoAccion = 'Eliminar';
    this._asentamiento = objAsentamiento;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar el asentamiento: "' + objAsentamiento.Asentamiento + '"?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1',
        confirmButton: 'order-3',
        denyButton: 'order-2',
      },
      backdrop: ` rgba(128,128,128,0.4)
                  left top
                  no-repeat
                `
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this._asentamientosService.deleteAsentamiento(objAsentamiento.Id_Asentamiento).subscribe(
          (data) => {
            //Next callback
            
            // Swal.fire('Los datos fiscales fueron eliminados', '', 'success')

            Swal.fire({
              icon: 'success',
              title: 'El Asentamiento fue eliminado.',
              showConfirmButton: false,
              timer: 1500
            })

            this.buscarAsentamientos();

          },
          (error: HttpErrorResponse) => {
            //Error callback

            Swal.fire({
              icon: 'error',
              title: error.error['Descripcion'],
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });

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

            //throw error;   //You can also throw the error to a global error handler
          }
        );

        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  get estadoNoValido() {
    return (this.formaBusqueda.get('estado')?.invalid && this.formaBusqueda.get('estado')?.touched);
  }

  get municipioNoValido() {
    return (this.formaBusqueda.get('municipio')?.invalid && this.formaBusqueda.get('municipio')?.touched);
  }

  get estadomodalNoValido() {
    return (this.formaAsentamiento.get('estadomodal')?.invalid && this.formaAsentamiento.get('estadomodal')?.touched);
  }

  get municipiomodalNoValido() {
    return (this.formaAsentamiento.get('municipiomodal')?.invalid && this.formaAsentamiento.get('municipiomodal')?.touched);
  }

  get asentamientoNoValido() {
    return (this.formaAsentamiento.get('asentamiento')?.invalid && this.formaAsentamiento.get('asentamiento')?.touched);
  }

  get codigopostalNoValido() {
    return (this.formaAsentamiento.get('codigopostal')?.invalid && this.formaAsentamiento.get('codigopostal')?.touched);
  }

  get latitudNoValido() {
    return (this.formaAsentamiento.get('latitud')?.invalid && this.formaAsentamiento.get('latitud')?.touched);
  }

  get longitudNoValido() {
    return (this.formaAsentamiento.get('longitud')?.invalid && this.formaAsentamiento.get('longitud')?.touched);
  }

}
