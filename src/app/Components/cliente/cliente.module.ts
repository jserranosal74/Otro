import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PropiedadesComponent } from './propiedades/propiedades.component';
import { ActivarclienteComponent } from './activarcliente/activarcliente.component';
import { AnunciosModule } from '../anuncios/anuncios.module';
import { IniciarsesionComponent } from './iniciarsesion/iniciarsesion.component';

@NgModule({
  declarations: [
    ActivarclienteComponent,
    PropiedadesComponent,
    IniciarsesionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AnunciosModule
  ],
  exports: [
    ActivarclienteComponent,
    PropiedadesComponent,
    IniciarsesionComponent
  ]
})

export class UsuarioModule { }
