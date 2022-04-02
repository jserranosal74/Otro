import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PoliticadeprivacidadComponent } from './politicadeprivacidad/politicadeprivacidad.component';
import { TerminosycondicionesdecontratacionComponent } from './terminosycondicionesdecontratacion/terminosycondicionesdecontratacion.component';
import { TerminosycondicionesdeusoComponent } from './terminosycondicionesdeuso/terminosycondicionesdeuso.component';

@NgModule({
  declarations: [
    PoliticadeprivacidadComponent,
    TerminosycondicionesdecontratacionComponent,
    TerminosycondicionesdeusoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    PoliticadeprivacidadComponent,
    TerminosycondicionesdecontratacionComponent,
    TerminosycondicionesdeusoComponent
  ]
})

export class LegalModule { }
