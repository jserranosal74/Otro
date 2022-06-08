import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { ConfirmarPagosPlanesComponent } from './confirmarpagosplanes/confirmarpagosplanes.component';
import { AsignarPaqueteAClienteComponent } from './asignarpaqueteacliente/asignarpaqueteacliente.component';
import { TarjetasModule } from '../tarjetas/tarjetas.module';

@NgModule({
  declarations: [
    ConfirmarPagosPlanesComponent,
    AsignarPaqueteAClienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TarjetasModule
  ],
  exports: [
    ConfirmarPagosPlanesComponent,
    AsignarPaqueteAClienteComponent
  ]
})

export class ProcesosModule { }
