import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TarjetaDatoFiscalComponent } from './datosfiscales/tarjetadatofiscal.component';
import { TarjetaPlanesClienteComponent } from './planesCliente/tarjetaplanescliente.component';
import { TarjetaplanesComponent } from './planes/tarjetaplanes.component';
import { TarjetabancoComponent } from './banco/tarjetabanco.component';


@NgModule({
  declarations: [
    TarjetaDatoFiscalComponent,
    TarjetaPlanesClienteComponent,
    TarjetaplanesComponent,
    TarjetabancoComponent
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
    TarjetabancoComponent
  ]
})

export class TarjetasModule { }
