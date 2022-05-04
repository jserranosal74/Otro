import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from '../../../Services/Catalogos/login.service';
import { empresa, empresaMedioContacto } from '../../../Models/catalogos/empresa.model';
import { EmpresasService } from '../../../Services/Catalogos/empresa.service';
import { medioContacto } from '../../../Models/catalogos/medioContacto.model';
import { MediosContactoService } from 'src/app/Services/Catalogos/mediosContacto.service';
import { estado } from 'src/app/Models/catalogos/estado.model';
import { municipio } from 'src/app/Models/catalogos/municipio.model';
import { EstadosService } from 'src/app/Services/Catalogos/estados.service';
import { MunicipiosService } from 'src/app/Services/Catalogos/municipios.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  formaEmpresa : FormGroup = new FormGroup({});
  _empresas : empresa[] = [];
  _empresa : empresa = new empresa(0,0,0,0,'','',null,new Date(),new Date(),0,0);
  _mediosContacto : medioContacto[] = [];
  _estados : estado[] = [];
  _municipios : municipio[] = [];
  _textoAccion ='';

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;

  constructor(  private fb: FormBuilder,
                private _estadosService: EstadosService,
                private _municipiosService: MunicipiosService,
                private _empresaService: EmpresasService,
                private _loginService : LoginService,
                private _mediosContactoService: MediosContactoService,
  ) {

    this.crearFormulario();
    this.limpiarFormulario();
    this.obtenerEmpresas();
    this.obtenerMediosContacto();
    this.obtenerEstados();
  }

  ngOnInit(): void {
    this.limpiarFormulario();
  }

  crearFormulario() {
    this.formaEmpresa = this.fb.group({
      estado : ['', Validators.required],
      municipio : [0, Validators.required],
      nombreEmpresa : ['', Validators.required],
      descripcionEmpresa : ['', Validators.required],
      tipoEmpresa : ['', Validators.required],
      listaMediosContacto : this.fb.array([])
    });
    this._empresa = new empresa(0,0,0,0,'','',null,new Date(),new Date(),0,0);
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    this.mediosContacto.clear();
    this._municipios = [];
    this.formaEmpresa.reset({
      estado : '',
      municipio : '',
      nombreEmpresa : '',
      descripcionEmpresa : '',
      tipoEmpresa : 'Inmobiliaria',
      listaMediosContacto : this.mediosContacto
    });
    this._empresa = new empresa(0,0,0,0,'','',null,new Date(),new Date(),0,0);
  }

  obtenerEmpresas() {

    this._empresaService.getEmpresas().subscribe(
      (data) => {
        //Next callback

        this._empresas = data;

      },
      (error: HttpErrorResponse) => {
        //Error callback

        switch (error.status) {
          case 401:
            break;
          case 403:
            break;
          case 404:
            Swal.fire({
              icon: 'error',
              title: 'No hay empresas dadas de alta.',
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
            break;
          case 409:
            break;
        }

      }
    );
  }

  obtenerMediosContacto() {

    this._mediosContactoService.getMediosContacto().subscribe(
      (data) => {

        this._mediosContacto = data;

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
        //Error callback

        Swal.fire({
          icon: 'error',
          title: error.error['Descripcion'],
          text: 'Error al cargar las inmobiliarias',
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

      }
    );
  }

  obtenerEmpresa(objEmpresa : empresa) {
    this._textoAccion = 'Modificar';
    this._empresa = objEmpresa;

    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];

    this._empresaService.getEmpresa(objEmpresa.Id_Empresa).subscribe(
      (data) => {
        //Next callback
        //console.log('datos: ', data);

        this.mediosContacto.clear();

        if (data.MediosContacto != null){
          data.MediosContacto?.forEach(item => {
            this.mediosContacto.push( this.fb.group({ Id_EmpresaMedioContacto:[item.Id_EmpresaMedioContacto], 
                                                      Id_Empresa:[item.Id_Empresa], 
                                                      Id_MedioContacto:[item.Id_MedioContacto], 
                                                      Descripcion:[item.Descripcion], 
                                                      FechaAlta:[item.FechaAlta], 
                                                      FechaModificacion:[item.FechaModificacion], 
                                                      Id_Usuario:[item.Id_Usuario], 
                                                      Id_Estatus : [item.Id_Estatus]}) );  
          });
        }
        console.log(data);
        this.obtenerMunicipios(data.Id_Estado);

        this.formaEmpresa.setValue({
          estado : data.Id_Estado,
          municipio : data.Id_Municipio,
          nombreEmpresa : data.Nombre,
          descripcionEmpresa: data.Descripcion,
          tipoEmpresa : data.TipoEmpresa,
          listaMediosContacto : data.MediosContacto || []
        });

      },
      (error: HttpErrorResponse) => {
        //Error callback

        console.log('error.status',error.status);

        switch (error.status) {
          case 401:
            break;
          case 403:
            Swal.fire({
              icon: 'error',
              title: 'No hay empresas dadas de alta.',
              text: '',
              showCancelButton: false,
              showDenyButton: false,
            });
            break;
          case 404:
            break;
          case 409:
            break;
        }

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  obtenerEstados() {

    // Por default enviamos 1 como Pais = Mexico
    this._estadosService.getEstados(1).subscribe(
      (data) => {
        //Next callback

        this._estados = data;

        this._municipios = [];

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

  guardarEmpresa(){

    if (this.formaEmpresa.invalid) {
      return Object.values(this.formaEmpresa.controls).forEach((control) => {
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

      if (this._empresa.Id_Empresa != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._empresa.MediosContacto = [];
      this._empresa.Id_Estado = this.formaEmpresa.get('estado')?.value;
      this._empresa.Id_Municipio = this.formaEmpresa.get('municipio')?.value;
      this._empresa.Nombre = this.formaEmpresa.get('nombreEmpresa')?.value;
      this._empresa.Descripcion = this.formaEmpresa.get('descripcionEmpresa')?.value;
      this._empresa.TipoEmpresa = this.formaEmpresa.get('tipoEmpresa')?.value;

      Object.values(this.formaEmpresa.controls).forEach((control) => {
        if (control instanceof FormArray) {
          Object.values(control.controls).forEach((control) =>
            {
              if ((control instanceof FormGroup) && (control.get('Id_MedioContacto')?.value !== '')) {
                this._empresa.MediosContacto?.push( new empresaMedioContacto(0,0,control.get('Id_MedioContacto')?.value,control.get('Descripcion')?.value,new Date(),new Date(),1,1));
              }
            }
          );
        } 
      });

      //this._empresa.MediosContacto?.push( new empresaMedioContacto(0,0,'des',new Date(),new Date(),1,1));
      //this._empresa.MediosContacto = this.formaEmpresa.get('listaMediosContacto')?.value;
      this._empresa.FechaAlta = new Date();
      this._empresa.FechaModificacion = new Date();
      this._empresa.Id_Usuario = 1;
      this._empresa.Id_Estatus = 1;

      if (this._esNuevo){
        this._empresa.Id_Empresa = 0;
        this._empresaService.postEmpresa(this._empresa).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'La empresa se agrego de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerEmpresas();
  
            this.limpiarFormulario();
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
  
          }
        );
      }
      else{
// debugger;
        this._empresa.MediosContacto = [];
        Object.values(this.formaEmpresa.controls).forEach((control) => {
          if (control instanceof FormArray) {
            Object.values(control.controls).forEach((control) =>
              {
                if ((control instanceof FormGroup) && (control.get('Id_MedioContacto')?.value !== '')){
                  this._empresa.MediosContacto?.push( new empresaMedioContacto(control.get('Id_EmpresaMedioContacto')?.value,control.get('Id_Empresa')?.value,control.get('Id_MedioContacto')?.value,control.get('Descripcion')?.value,new Date(),new Date(),1,1));
                  // console.log('control', control);
                }
              }
            );
          } 
        });
// debugger;
        this._empresaService.putEmpresa(this._empresa).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'Los datos de la empresa se modificaron de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerEmpresas();
  
            this.limpiarFormulario();
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

  eliminarEmpresa(objEmpresa : empresa) {
    // this._textoAccion = 'Eliminar';
    this._empresa = objEmpresa;

    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro de que desea eliminar la empresa: "' + objEmpresa.Descripcion + '"?',
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

        this._empresaService.deleteEmpresa(objEmpresa.Id_Empresa).subscribe(
          (data) => {
            //Next callback
            
            Swal.fire({
              icon: 'success',
              title: 'La empresa fue eliminada.',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerEmpresas();
    
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
                break;
              case 404:
                break;
              case 409:
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

  obtenerMunicipios(Id_Estado : number) {
    this._empresa.Id_Municipio = 0;
    // debugger;
    this._municipios = [];
    if (Id_Estado === 0) {
      Id_Estado = this.formaEmpresa.controls['estado'].value;
    }

    this._municipiosService.getMunicipios(Id_Estado).subscribe(
      (data) => {
        //Next callback

        this._municipios = data;

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

  agregarMedioContactoEmpresa() {
    this.mediosContacto.push( this.fb.group({ Id_MedioContacto:[''], Descripcion : ['']}) );
  }
  
  borrarMedioContactoEmpresa( i : number ) {
    this.mediosContacto.removeAt(i);
  }

  get mediosContacto() {
    return this.formaEmpresa.get('listaMediosContacto') as FormArray;
  }

  get descripcionNoValido() {
    return ( this.formaEmpresa.get('descripcionEmpresa')?.invalid && this.formaEmpresa.get('descripcionEmpresa')?.touched );
  }

  get nombreNoValido() {
    return ( this.formaEmpresa.get('nombreEmpresa')?.invalid && this.formaEmpresa.get('nombreEmpresa')?.touched );
  }

  get tipoEmpresaNoValido() {
    return ( this.formaEmpresa.get('tipoEmpresa')?.invalid && this.formaEmpresa.get('tipoEmpresa')?.touched );
  }

  get estadoNoValido() {
    return (this.formaEmpresa.get('estado')?.invalid && this.formaEmpresa.get('estado')?.touched);
  }

  get municipioNoValido() {
    return (this.formaEmpresa.get('municipio')?.invalid && this.formaEmpresa.get('municipio')?.touched);
  }

}