import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { ConfirmarPagosPlanesComponent } from './confirmarpagosplanes/confirmarpagosplanes.component';
import { AsignarPaqueteAClienteComponent } from './asignarpaqueteacliente/asignarpaqueteacliente.component';
import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { ActualizarPublicacionesPlanesYPaquetesComponent } from './actualizarpublicacionesplanesypaquetes/actualizarpublicacionesplanesypaquetes.component';

@NgModule({
  declarations: [
    ConfirmarPagosPlanesComponent,
    AsignarPaqueteAClienteComponent,
    ActualizarPublicacionesPlanesYPaquetesComponent
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
    AsignarPaqueteAClienteComponent,
    ActualizarPublicacionesPlanesYPaquetesComponent
  ]
})

export class ProcesosModule { }
