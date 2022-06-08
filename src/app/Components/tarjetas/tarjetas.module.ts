import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TarjetaDatoFiscalComponent } from './datosfiscales/tarjetadatofiscal.component';
import { TarjetaPlanesClienteComponent } from './planesCliente/tarjetaplanescliente.component';
import { TarjetaplanesComponent } from './planes/tarjetaplanes.component';
import { TarjetabancoComponent } from './banco/tarjetabanco.component';
import { TarjetafacturaComponent } from './factura/tarjetafactura.component';
import { TarjetaPaquetesComponent } from './paquetes/tarjetapaquetes.component';
import { TarjetaPaquetesClienteComponent } from './paquetesCliente/tarjetapaquetescliente.component';
import { TarjetaArchivosFiscalesComponent } from './archivosfiscales/tarjetaarchivosfiscales.component';


@NgModule({
  declarations: [
    TarjetaDatoFiscalComponent,
    TarjetaPlanesClienteComponent,
    TarjetaplanesComponent,
    TarjetabancoComponent,
    TarjetafacturaComponent,
    TarjetaPaquetesComponent,
    TarjetaPaquetesClienteComponent,
    TarjetaArchivosFiscalesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    TarjetaDatoFiscalComponent,
    TarjetaPlanesClienteComponent,
    TarjetaplanesComponent,
    TarjetabancoComponent,
    TarjetafacturaComponent,
    TarjetaPaquetesComponent,
    TarjetaPaquetesClienteComponent,
    TarjetaArchivosFiscalesComponent
  ]
})

export class TarjetasModule { }
