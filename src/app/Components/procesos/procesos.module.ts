import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { ConfirmarPagosPlanesComponent } from './confirmarpagosplanes/confirmarpagosplanes.component';
import { AsignarPaqueteAClienteComponent } from './asignarpaqueteacliente/asignarpaqueteacliente.component';
import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { ActualizarPublicacionesPlanesYPaquetesComponent } from './actualizarpublicacionesplanesypaquetes/actualizarpublicacionesplanesypaquetes.component';
import { BloquearPublicacionComponent } from './bloquearpublicacion/bloquearpublicacion.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';

@NgModule({
  declarations: [
    ConfirmarPagosPlanesComponent,
    AsignarPaqueteAClienteComponent,
    ActualizarPublicacionesPlanesYPaquetesComponent,
    BloquearPublicacionComponent,
    ConfiguracionesComponent
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
    ActualizarPublicacionesPlanesYPaquetesComponent,
    BloquearPublicacionComponent,
    ConfiguracionesComponent
  ]
})

export class ProcesosModule { }
