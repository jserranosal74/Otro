import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { ConfirmarPagosPlanesComponent } from './confirmarpagosplanes/confirmarpagosplanes.component';

@NgModule({
  declarations: [
    ConfirmarPagosPlanesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ConfirmarPagosPlanesComponent
  ]
})

export class ProcesosModule { }
