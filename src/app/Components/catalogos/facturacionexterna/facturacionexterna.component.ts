import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/Services/Catalogos/login.service';

import { producto, productoExterno } from 'src/app/Models/catalogos/productoexterno.model';
import { ProductosExternosService } from 'src/app/Services/Catalogos/productosExternos.service';
import { cliente } from 'src/app/Models/catalogos/cliente.model';
import { ClientesService } from 'src/app/Services/Catalogos/clientes.service';
import { DatosFiscalesService } from 'src/app/Services/Procesos/datosFiscales.service';
import { datoFiscal } from 'src/app/Models/procesos/datosFiscales.model';
import { FacturacionExternaService } from 'src/app/Services/Procesos/facturacionExterna.service';
import { CatalogosSATService } from 'src/app/Services/Catalogos/catalogosSAT.service';
import { usoCFDI, formaPago } from '../../../Models/catalogos/catalogosSAT.model';
import { pagina, paginadoDetalle } from 'src/app/Models/catalogos/asentamiento.model';
import { facturaExterna } from '../../../Models/procesos/facturaExterna.model';

@Component({
  selector: 'app-facturacionexterna',
  templateUrl: './facturacionexterna.component.html',
  styleUrls: ['./facturacionexterna.component.css']
})
export class FacturacionExternaComponent implements OnInit {
  formaFacturacion = this.fb.group({});
  formaBusqueda = this.fb.group({});
  _productosExternos : productoExterno[] = [];
  _productosAFacturar : productoExterno[] = [];
  _productos : producto[] = [];
  _productoExterno : productoExterno = new productoExterno(0,null,null,null,null,null,null,null,null,null,null,null,null,0);
  _clientesReceptores : cliente[] = [];
  _clienteReceptor : cliente = new cliente(0,null,1,null,0,null,1,'','','','','',[],'',0,0,0,'','',new Date(),new Date(),new Date(),1,'',1,'');
  _datosFiscalesReceptor : datoFiscal[] = [];
  _datoFiscalEmisor : datoFiscal = new datoFiscal(0,0,null,0,'','','','','',0,new Date(),new Date(), 0,0,0);
  _datoFiscalReceptor : datoFiscal = new datoFiscal(0,0,null,0,'','','','','',0,new Date(),new Date(), 0,0,0);
  _textoAccion ='';
  cargando : boolean = false;
  _buscandoClientes : boolean = false;
  _subTotal = 0;
  _iva = 0;
  _Total = 0;
  _usosCFDI : usoCFDI[] = [];
  _usosCFDIFiltrados : usoCFDI[] = [];
  _formasPago : formaPago[] = [];
  _facturando = false;

  _facturasExternas : facturaExterna[] = []
  _buscandoFacturas = false;

  //Paginador
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

  // _esNuevo : boolean = false;
  @ViewChild('myModalClose') modalClose : any;
  @ViewChild('descripcion') modaldescripcion : any;

  constructor( private fb: FormBuilder,
               private _productosService: ProductosExternosService,
               private _clientesService: ClientesService,
               private _datosfiscalesService : DatosFiscalesService,
               private _facturacionExternaService : FacturacionExternaService,
               private _catalogosSATService : CatalogosSATService,
               private _loginService : LoginService,
  ) {
    //debugger;
    this.crearFormularios();
    this.limpiarFormulario();
    this.obtenerDatosFiscalesEmisor();
    this.obtenerClientes();
    this.obtenerProductosExternos();
    this.obtenerUsosCFDI();
    this.obtenerFormasPagoSAT();
  }

  ngOnInit(): void {
  }

  crearFormularios() {
    this.formaFacturacion = this.fb.group({
      emisor     : ['', Validators.required],
      receptor   : ['', Validators.required],
      datoFiscal : ['', Validators.required],
      usoCFDI    : ['', Validators.required],
      formaPago  : ['3', Validators.required]
    });

    this.formaBusqueda = this.fb.group({
      idCliente    : [ '' ],
      fechaFactura : [ '' ]
    });

    this.formaNumeroPagina = this.fb.group({
      numeroPagina : ['', [Validators.required] ]
    });
  }

  limpiarFormulario() {
    this._textoAccion = 'Agregar';

    this.formaFacturacion.patchValue({
      receptor   : '',
      datoFiscal : '',
      usoCFDI    : '',
      formaPago  : '3'
    });

    this._productos = [];
    this._productosAFacturar = [];
    this._datosFiscalesReceptor = [];
    this._usosCFDIFiltrados = [];
    this._clienteReceptor = new cliente(0,null,1,null,0,null,1,'','','','','',[],'',0,0,0,'','',new Date(),new Date(),new Date(),1,'',1,'');
    this._datoFiscalReceptor = new datoFiscal(0,0,null,0,'','','','','',0,new Date(),new Date(), 0,0,0);
    this._subTotal = 0;
    this._iva = 0;
    this._Total = 0;
    
  }

  obtenerDatosFiscalesEmisor(){
    this._datosfiscalesService.getDatosFiscalesCliente(this._loginService.obtenerIdCliente()!).subscribe(
      (data) => {
        //console.log('obtenerDatosFiscalesEmisor: ', data);

        data.forEach(item =>{
          if (item.Predeterminada === 1)
            this._datoFiscalEmisor = item;
        });

        this.formaFacturacion.patchValue({
          emisor : this._datoFiscalEmisor.RFC
        });

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

  obtenerClientes() {
    
    this._buscandoClientes = true;

    this._clientesService.getClientesPaginado(null,null,'',2,null,0,10000).subscribe(
      (data) => {

        console.log('getClientesPaginado',data)

        this._clientesReceptores = data;

        // if (data.length > 0) {
        //   this._seRealizaBusqueda = true;
        // }

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
            break;
          case 404:
            break;
          case 409:
            break;
        }

      }
    );
  }

  obtenerDatosFiscalesReceptor(){
    debugger;

    // if (this.formaFacturacion.get('receptor')!.value === '')
    //   {
    //     this.formaFacturacion.patchValue({
    //       datoFiscal : '',
    //       usoCFDI    : ''
    //     });
    //     this._datosFiscalesReceptor = [];
    //     this._usosCFDIFiltrados = [];
    //     this._clienteReceptor = new cliente(0,null,1,null,0,null,1,'','','','','',[],'',0,0,0,'','',new Date(),new Date(),new Date(),1,'',1,'');
    //     this._datoFiscalReceptor = new datoFiscal(0,0,null,0,'','','','','',0,new Date(),new Date(), 0,0,0);
    //     return;
    //   }

    this._clienteReceptor = new cliente(0,null,1,null,0,null,1,'','','','','',[],'',0,0,0,'','',new Date(),new Date(),new Date(),1,'',1,'');
    this._datoFiscalReceptor = new datoFiscal(0,0,null,0,'','','','','',0,new Date(),new Date(), 0,0,0);

    this._clientesReceptores.forEach(item => {
      if (this.formaFacturacion.get('receptor')!.value === item.UID_Cliente ){
        this._clienteReceptor = item;
      }
    });

    this._datosfiscalesService.getDatosFiscalesCliente(this.formaFacturacion.get('receptor')!.value).subscribe(
      (data) => {
        //console.log('datos: ', data);

        this._datosFiscalesReceptor = data;

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

  obtenerUsosCFDIFiltrados(){
    debugger;

    this._datosFiscalesReceptor.forEach(item =>{
      if(this.formaFacturacion.get('datoFiscal')!.value == item.Id_DatosFiscales)
        this._datoFiscalReceptor = item;
    });

    this._usosCFDIFiltrados = [];
    this._usosCFDI.forEach( item => {
      if ((this._datoFiscalReceptor.Id_TipoPersona === 1) && (item.AplicaPersonaFisica === 1))
        this._usosCFDIFiltrados.push(item);
      else if ((this._datoFiscalReceptor.Id_TipoPersona === 2) && (item.AplicaPersonaMoral === 1))
        this._usosCFDIFiltrados.push(item);
    });

    this.formaFacturacion.patchValue({
      usoCFDI : '3'
    })

  }

  obtenerProductosExternos() {
    
    this._productosService.getProductos().subscribe(
      (data) => {

        //console.log('productos',data);

        this._productosExternos = data;

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

  obtenerUsosCFDI() {
    
    this._catalogosSATService.getUsosFCDI(null).subscribe(
      (data) => {

        this._usosCFDI = data;

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

  obtenerFormasPagoSAT() {
    
    this._catalogosSATService.getFormasPagoSAT(null).subscribe(
      (data) => {

        //console.log('productos',data);

        this._formasPago = data;

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

  realizarFactura(){
    debugger;
    if (this.formaFacturacion.invalid) {
      return Object.values(this.formaFacturacion.controls).forEach((control) => {
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
      let datoFiscal = 0;
      let Id_ClienteReceptor = 0;

      this._productos = [];

      // Se genera el JSON de los productos con cantidad > 0, su id y su respectivo precio
      this._productosAFacturar.forEach(item =>{
        if (item.Cantidad! > 0){
            this._productos.push(new producto(item.Id_Producto, item.Precio, item.Cantidad));
        }
      });

      this._datosFiscalesReceptor.forEach(item => {
          if (item.Id_DatosFiscales.toString() === this.formaFacturacion.get('datoFiscal')!.value){
            datoFiscal = item.Id_DatosFiscales;
            Id_ClienteReceptor = item.Id_Cliente;
          }
      });

      if(this._Total === 0){
        Swal.fire({
          icon: 'error',
          title: 'Deberá de agregar al menos un producto para facturar, no se puede hacer una factura en $0.00',
          showConfirmButton: false,
          timer: 3000
        });
        return;
      }

      this._facturando = true;

      this._facturacionExternaService.postFacturacionExterna(this._datoFiscalEmisor.Id_Cliente, Id_ClienteReceptor, datoFiscal, this.formaFacturacion.get('usoCFDI')!.value, this.formaFacturacion.get('formaPago')!.value, JSON.stringify(this._productos)).subscribe(
        (data) => {
          //Next callback
          //console.log('datos: ',data);
          if (data != 0){
            Swal.fire({
              icon: 'success',
              title: 'La factura se generó de manera correcta.',
              showConfirmButton: false,
              timer: 3000
            });
            this.limpiarFormulario();
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un error al intentar generar la factura',
              showConfirmButton: false,
              timer: 3000
            });
          }

          this._facturando = false;
        },
        (error: HttpErrorResponse) => {
          //Error callback
          this._facturando = false;
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
            case 500:
              this.limpiarFormulario();
              break;
          }

        }
      );
    }

  }

  quitarUnProductoExterno(objProductoExterno : productoExterno) {
    this._productoExterno = objProductoExterno;

    this._productosAFacturar.forEach(element => {
      if ((element.Id_Producto === objProductoExterno.Id_Producto) && (objProductoExterno.Cantidad! > 0)) {
        objProductoExterno.Cantidad = objProductoExterno.Cantidad! - 1;
      }
    });

    this.calcularTotales();
    
  }

  agregarUnProductoExterno(objProductoExterno : productoExterno) {
    this._productoExterno = objProductoExterno;

    this._productosAFacturar.forEach(element => {
      if (element.Id_Producto === objProductoExterno.Id_Producto) {
        objProductoExterno.Cantidad = objProductoExterno.Cantidad! + 1;
      }
    });

    this.calcularTotales();
    
  }

  quitarProductoExterno(objProductoExterno : productoExterno) {
    this._productoExterno = objProductoExterno;

    this._productosAFacturar.forEach((element, index) => {
      if (element.Id_Producto === objProductoExterno.Id_Producto) {
        this._productosAFacturar.splice(index,1);
      }
    });

    this.calcularTotales();
    
  }

  agregarProductoExterno(objProductoExterno : productoExterno) {
    let actualizado = false;
    this._productoExterno = objProductoExterno;
      //debugger;

    this._productosAFacturar.forEach( element => {
      if (element.Id_Producto === objProductoExterno.Id_Producto) {
        //console.log('element.Cantidad', element.Cantidad);
        element.Cantidad!++;
        actualizado = true;
      }
    });

    if (!actualizado){
      this._productoExterno.Cantidad = 1;
      this._productosAFacturar.push(objProductoExterno);
    }

    this.calcularTotales();
    
  }

  calcularTotales(){
    this._subTotal = 0;
    this._iva = 0;
    this._Total = 0;

    this._productosAFacturar.forEach( element => {
      this._subTotal = this._subTotal + ( (element.Cantidad! * element.Precio!) / 1.16 );
      this._iva = this._iva + ( (element.Precio! * element.Cantidad!) - ( (element.Cantidad! * element.Precio!) / 1.16 ) );
    });

    this._Total = this._subTotal + this._iva;
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

  obtenerPagina(numPagina : number | null){

    if(numPagina === null){
      numPagina = this.formaNumeroPagina.get('numeroPagina')!.value - 1;
      if (numPagina! > this._paginadoDetalle.TotalPaginas)
          numPagina = this._paginadoDetalle.TotalPaginas - 1;
      if (numPagina! < 1)
          numPagina = 0
    }

    this._facturacionExternaService.getFacturacionExternaPaginado(this.formaBusqueda.controls['idCliente'].value,this.formaBusqueda.controls['fechaFactura'].value, numPagina, 10).subscribe(
      (data) => {

        this._facturasExternas = data;

        if (data.length > 0) {
          this._seRealizaBusqueda = true;
        }

        this.formaNumeroPagina.patchValue({
          numeroPagina : numPagina! + 1
        });

        // Se obtiene el numero de paginas totales y el numero de renglones(registros) en total de la busqueda
        this._facturacionExternaService.getFacturacionExternaPagDet(this.formaBusqueda.controls['idCliente'].value,this.formaBusqueda.controls['fechaFactura'].value, 10).subscribe(
          (data) => {
            //Next callback
            console.log(data);
            this._paginadoDetalle = data;

            this.CargarPaginador(numPagina!);

            this._buscandoFacturas = false;
    
          },
          (error: HttpErrorResponse) => {
            this._buscandoFacturas = false;
            
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
        this._buscandoFacturas = false;

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

  buscarFacturas(){
    this._buscandoFacturas = true;
    this.obtenerPagina(0);
  }

  enviarFacturaExterna(objFacturaExterna : facturaExterna){
    debugger;
    objFacturaExterna.Enviando = true;
    this._facturacionExternaService.GetEnviarFacturaExterna(objFacturaExterna.UID_Cliente!, objFacturaExterna.Id_Factura!, objFacturaExterna.UUID!, objFacturaExterna.Email!).subscribe(
      (data) => {
        //Next callback

        if (data === 1){
          Swal.fire({
            icon: 'success',
            title: 'La factura se envio de manera correcta.',
            showConfirmButton: false,
            timer: 3000
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error al intentar enviar la factura al cliente.',
            showConfirmButton: false,
            timer: 3000
          });
        }

        objFacturaExterna.Enviando = false;

      },
      (error: HttpErrorResponse) => {

        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error al intentar enviar la factura al cliente, intentelo más tarde.',
          showConfirmButton: false,
          timer: 3000
        });

        objFacturaExterna.Enviando = false;
        
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
    return (this.formaBusqueda.get('idCliente')?.invalid && this.formaBusqueda.get('idCliente')?.touched);
  }

}