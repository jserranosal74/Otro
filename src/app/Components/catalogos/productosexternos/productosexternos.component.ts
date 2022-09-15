import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';

import { productoExterno } from 'src/app/Models/catalogos/productoexterno.model';
import { ProductosExternosService } from 'src/app/Services/Catalogos/productosExternos.service';
import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';

@Component({
  selector: 'app-productosexternos',
  templateUrl: './productosexternos.component.html',
  styleUrls: ['./productosexternos.component.css']
})
export class ProductosExternosComponent implements OnInit {

  _productosExternos : productoExterno[] = [];
  _productoExterno : productoExterno = new productoExterno(0,null,null,null,null,null,null,null,null,null,null,null,null,0);
  _textoAccion ='';
  cargando : boolean = false;
  _buscandoProductos : boolean = false;

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
  @ViewChild('descripcion') modaldescripcion : any;

  formaProducto = this.fb.group({});

  constructor( private fb: FormBuilder,
               private _productosService: ProductosExternosService,
               private _loginService : LoginService,
  ) {
    //debugger;
    this.crearFormularios();
    this.limpiarFormulario();
    this.obtenerProductosExternos(0);
  }

  ngOnInit(): void {
    //this.limpiarFormulario();
  }

  crearFormularios() {
    this.formaProducto = this.fb.group({
      descripcion  : ['', Validators.required],
      precio       : ['', Validators.required],
      clave        : ['', Validators.required],
      claveProdSAT : ['', Validators.required]
    });

    this.formaNumeroPagina = this.fb.group({
      numeroPagina : ['', [Validators.required] ]
    });

    this._productoExterno = new productoExterno(0,null,null,null,null,null,null,null,null,null,null,null,null,0);
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';

    this.formaProducto.reset({
      descripcion  : '',
      precio       : '',
      clave        : '',
      claveProdSAT : ''
    });
    this._productoExterno = new productoExterno(0,null,null,null,null,null,null,null,null,null,null,null,null,0);
  }

  obtenerProductosExternos(numPagina : number | null) {
    
    if(numPagina === null){
      numPagina = this.formaNumeroPagina.get('numeroPagina')!.value - 1;
      if (numPagina! > this._paginadoDetalle.TotalPaginas)
          numPagina = this._paginadoDetalle.TotalPaginas - 1;
      if (numPagina! < 1)
          numPagina = 0
    }

    this._buscandoProductos = true;

    this._productosService.getProductos().subscribe(
      (data) => {

        this._productosExternos = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        this._productosService.getProductosPaginadoDet(10).subscribe(
          (data) => {
            //Next callback
            //console.log(data);
            this._paginadoDetalle = data;

            this.CargarPaginador(numPagina!);

            this._buscandoProductos = false;
    
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

  obtenerProductoExterno(objProductoExterno : productoExterno) {
    this._textoAccion = 'Modificar';
    this._productoExterno = objProductoExterno;
    debugger;
    this._productosService.getProducto(objProductoExterno.Id_Producto).subscribe(
      (data) => {
        //Next callback
        // console.log('obtenerPaquete: ', data);
        this._productoExterno = data[0];
        
        this.formaProducto.setValue({
          clave        : data[0].Clave,
          claveProdSAT : data[0].ClaveProdServ,
          descripcion  : data[0].Descripcion,
          precio       : data[0].Precio
        });

        // this.limpiarFormulario();
      },
      (error: HttpErrorResponse) => {
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

  guardarProducto(){

    if (this.formaProducto.invalid) {
      return Object.values(this.formaProducto.controls).forEach((control) => {
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

      if (this._productoExterno.Id_Producto != 0){
        this._esNuevo = false;
      }else{
        this._esNuevo = true;
      }

      this._productoExterno.Clave = this.formaProducto.get('clave')?.value.toUpperCase();
      this._productoExterno.ClaveProdServ = this.formaProducto.get('claveProdSAT')?.value.toUpperCase();
      this._productoExterno.Descripcion = this.formaProducto.get('descripcion')?.value;
      this._productoExterno.Precio = this.formaProducto.get('precio')?.value;
      // this._paquete.FechaAlta = new Date();
      // this._paquete.FechaModificacion = new Date();
      // this._paquete.Id_Usuario = 1;
      // this._paquete.Id_Estatus = 1;

      if (this._esNuevo){
        this._productoExterno.Id_Producto = 0;
        this._productosService.postProducto(this._productoExterno).subscribe(
          (data) => {
            //Next callback
            //console.log('datos: ',data);

            Swal.fire({
              icon: 'success',
              title: 'El producto se agrego de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.modalClose.nativeElement.click();
  
            this.obtenerProductosExternos(0);
  
            this.limpiarFormulario();
          },
          (error: HttpErrorResponse) => {
  
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
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudo actualizar información',
                  text: 'La clave ya existe o el producto no existe',
                  showCancelButton: false,
                  showDenyButton: false,
                });
                break;
            }
  
          }
        );
      }
      else{
        this._productosService.putProducto(this._productoExterno).subscribe(
          (data) => {
  
            this.modalClose.nativeElement.click();

            Swal.fire({
              icon: 'success',
              title: 'El producto se modifico de manera correcta.',
              showConfirmButton: false,
              timer: 1000
            })
  
            this.obtenerProductosExternos(0);
  
            this.limpiarFormulario();
          },
          (error: HttpErrorResponse) => {

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
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudo actualizar información',
                  text: 'La clave ya existe o el producto no existe',
                  showCancelButton: false,
                  showDenyButton: false,
                });
                break;
            }
  
          }
        );
      }
    }
  }

  eliminarProductoExterno(objProductoExterno : productoExterno) {
    // this._textoAccion = 'Eliminar';
    this._productoExterno = objProductoExterno;

    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de que desea eliminar el producto: "' + objProductoExterno.Descripcion + '"?',
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

        this._productosService.deleteProducto(objProductoExterno.Id_Producto).subscribe(
          (data) => {
            //Next callback

            Swal.fire({
              icon: 'success',
              title: 'El producto fue eliminado.',
              showConfirmButton: false,
              timer: 1500
            })
    
            this.obtenerProductosExternos(0);
    
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
    
            //throw error;   //You can also throw the error to a global error handler
          }
        );

        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
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

    this._buscandoProductos = true;

    this._productosService.getProductosPaginado(numPagina, 10).subscribe(
      (data) => {
        //Next callback

        this._productosExternos = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        // this.formaNumeroPagina.patchValue({
        //   numeroPagina : numPagina! + 1
        // });

        //this.CargarPaginador(numPagina!);

        // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
        this._productosService.getProductosPaginadoDet(10).subscribe(
          (data) => {
            //Next callback
            //console.log(data);
            this._paginadoDetalle = data;

            this.CargarPaginador(numPagina!);

            this._buscandoProductos = false;
    
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

  get descripcionNoValido() {
    return ( this.formaProducto.get('descripcion')?.invalid && this.formaProducto.get('descripcion')?.touched );
  }
      
  get precioNoValido() {
    return ( this.formaProducto.get('precio')?.invalid && this.formaProducto.get('precio')?.touched );
  }

  get claveNoValido() {
    return ( this.formaProducto.get('clave')?.invalid && this.formaProducto.get('clave')?.touched );
  }

  get claveProdSATNoValido() {
    return ( this.formaProducto.get('claveProdSAT')?.invalid && this.formaProducto.get('claveProdSAT')?.touched );
  }

}