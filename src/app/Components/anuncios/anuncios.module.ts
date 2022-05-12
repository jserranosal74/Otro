import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AnuncioMiniaturaComponent } from './anuncio-miniatura/anuncio-miniatura.component';
import { AnuncioVistaComponent } from './anuncio-vista/anuncio-vista.component';

import { GoogleMapsModule } from '@angular/google-maps'; 

@NgModule({
  declarations: [
    AnuncioMiniaturaComponent,
    AnuncioVistaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  exports: [
    AnuncioMiniaturaComponent,
    AnuncioVistaComponent
  ]
})

export class AnunciosModule { }
