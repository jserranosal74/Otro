import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from '../../../Services/Catalogos/login.service';
import { medioContacto } from '../../../Models/catalogos/medioContacto.model';
import { ClientesService } from '../../../Services/Catalogos/clientes.service';
import { cliente } from 'src/app/Models/catalogos/cliente.model';
import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { estatus } from 'src/app/Models/catalogos/estatus.model';
import { EstatusService } from '../../../Services/Catalogos/estatus.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  formaCliente : FormGroup = new FormGroup({});
  formaBuscar : FormGroup = new FormGroup({});
  _clientes : cliente[] = [];
  _cliente : cliente = new cliente(0,null,1,null,0,null,1,'','','','','',[],'',0,0,0,'','',new Date(),new Date(),new Date(),1,'',1,'');
  _mediosContacto : medioContacto[] = [];
  _textoAccion ='';
  _estatusClientes : estatus[] = [];
  _buscandoClientes : boolean = false;

  // Paginador
  formaNumeroPagina = this.fb.group({});
  _paginadoDetalle : paginadoDetalle = new paginadoDetalle(0,0);
  _paginas : pagina[] = [];
  _numeroPaginasMostrar = 5;
  _paginaActual = 0;
  _paginaInicial = 0;
  _paginaFinal = 4;
  _mostrarPaginaAnterior = true;
  _mostrarPaginaSiguiente = true;
  _seRealizaBusqueda = false;

  _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;

  constructor(  private fb: FormBuilder,
                private _clientesService: ClientesService,
                private _loginService : LoginService,
                private _estatusService: EstatusService,
  ) {

    this.crearFormularioCliente();
    this.crearFormularioBuscar();
    this.crearFormularioNumeroPagina();
    //this.limpiarFormulario();
    this.obtenerClientes(0);
    this.obtenerEstatusCliente();
  }

  ngOnInit(): void {
    //this.limpiarFormulario();
  }

  crearFormularioCliente() {
    this.formaCliente = this.fb.group({
      tipoClienteModal : ['2', Validators.required],
      nombre           : ['', Validators.required],
      apellidos        : ['', Validators.required],
      email            : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), ], ],
      password         : ['', Validators.required],
      rfc              : ['']
    });
    this._cliente = new cliente(0,null,1,null,0,null,1,'','','','','',[],'',0,0,0,'','',new Date(),new Date(),new Date(),1,'',1,'');
  }

  crearFormularioBuscar() {
    this.formaBuscar = this.fb.group({
      tipoCliente    : ['', Validators.required],
      estatusCliente : ['', Validators.required]
    });
  }

  crearFormularioNumeroPagina() {
    this.formaNumeroPagina = this.fb.group({
      numeroPagina : ['', [Validators.required] ]
    });
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';
    //this.mediosContacto.clear();
    this.formaCliente.reset({
      tipoClienteModal : '2',
      nombre           : '',
      apellidos        : '',
      email            : '',
      password         : '',
      rfc              : ''
    });
    this._cliente = new cliente(0,null,1,null,0,null,1,'','','','','',[],'',0,0,0,'','',new Date(),new Date(),new Date(),1,'',1,'');
  }

  obtenerCliente(objCliente : cliente) {
    this._textoAccion = 'Modificar';
    this._cliente = objCliente;

    //let Id_Usuario = JSON.parse(localStorage.getItem('usuario')!)['Id_Cliente'];

    this._clientesService.getCliente(objCliente.UID_Cliente!, null).subscribe(
      (data) => {

        console.log('getCliente', data);

        this.formaCliente.patchValue({
          tipoClienteModal : data.Id_TipoCliente,
          nombre           : data.Nombre,
          apellidos        : data.Apellidos,
          email            : data.Email,
          rfc              : data.RFC
        });

      },
      (error: HttpErrorResponse) => {
        //Error callback

        //console.log('error.status',error.status);

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

        //throw error;   //You can also throw the error to a global error handler
      }
    );
  }

  guardarCliente(){

    if (this.formaCliente.invalid) {
      return Object.values(this.formaCliente.controls).forEach((control) => {
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
      debugger;
      if (this._cliente.Id_Cliente != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._cliente.Id_TipoCliente = this.formaCliente.get('tipoClienteModal')?.value;
      this._cliente.Nombre = this.formaCliente.get('nombre')?.value;
      this._cliente.Apellidos = this.formaCliente.get('apellidos')?.value;
      this._cliente.Email = this.formaCliente.get('email')?.value;
      this._cliente.RFC = this.formaCliente.get('rfc')?.value;
      this._cliente.FechaAlta = new Date();
      this._cliente.FechaModificacion = new Date();
      this._cliente.Id_Usuario = 1;
      this._cliente.Id_Estatus = 1;

      if (this._esNuevo){
        this._cliente.Id_Cliente = 0;
        this._cliente.Id_Rol = 2;           // Cliente
        this._cliente.Id_TipoPersona = 1;
        this._cliente.TipoAutenticacion = 1;
        this._cliente.Password = this.formaCliente.get('password')?.value;
        this._clientesService.postCliente(this._cliente).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'El cliente se agregó de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            //this.obtenerEmpresas();
  
            this.limpiarFormulario();
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
      else{
        //debugger;
        this._clientesService.putCliente(this._cliente).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'Los datos del cliente se modificaron de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.limpiarFormulario();
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
    this.obtenerClientes(this._paginaActual - 1);
  }

  obtenerPaginaSiguiente(){
    this.obtenerClientes(this._paginaActual + 1);
  }

  obtenerClientes(numPagina : number | null){
    debugger;

    if(numPagina === null){
      numPagina = this.formaNumeroPagina.get('numeroPagina')!.value - 1;
      if (numPagina! > this._paginadoDetalle.TotalPaginas)
          numPagina = this._paginadoDetalle.TotalPaginas - 1;
      if (numPagina! < 1)
          numPagina = 0
    }

    this._buscandoClientes = true;

    this._clientesService.getClientesPaginado(null,null,'',this.formaBuscar.get('tipoCliente')!.value,this.formaBuscar.get('estatusCliente')!.value, numPagina, 10).subscribe(
      (data) => {
        //Next callback

        this._clientes = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        // this.formaNumeroPagina.patchValue({
        //   numeroPagina : numPagina! + 1
        // });

        //this.CargarPaginador(numPagina!);

        // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
        this._clientesService.getClientesPaginadoDet(null,null,'',this.formaBuscar.get('tipoCliente')!.value,this.formaBuscar.get('estatusCliente')!.value, 10).subscribe(
          (data) => {
            //Next callback
            //console.log(data);
            this._paginadoDetalle = data;

            this.CargarPaginador(numPagina!);

            this._buscandoClientes = false;
    
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

  obtenerEstatusCliente(){
    this._estatusService.getEstatusProceso('cliente').subscribe(
      (data) => {
        //Next callback
        //console.log(data);
        this._estatusClientes = data;

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
  }

  get emailNoValido() {
    return ( this.formaCliente.get('email')?.invalid && this.formaCliente.get('email')?.touched );
  }

  get nombreNoValido() {
    return ( this.formaCliente.get('nombre')?.invalid && this.formaCliente.get('nombre')?.touched );
  }

  get apellidosNoValido() {
    return ( this.formaCliente.get('apellidos')?.invalid && this.formaCliente.get('apellidos')?.touched );
  }

  get rfcNoValido() {
    return ( this.formaCliente.get('rfc')?.invalid && this.formaCliente.get('rfc')?.touched );
  }

  get passwordNoValido() {
    return ( this.formaCliente.get('password')?.invalid && this.formaCliente.get('password')?.touched );
  }

}