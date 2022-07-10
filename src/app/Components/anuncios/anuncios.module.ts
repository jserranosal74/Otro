import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AnuncioMiniaturaComponent } from './anuncio-miniatura/anuncio-miniatura.component';
import { AnuncioVistaComponent } from './anuncio-vista/anuncio-vista.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { AnuncioVistaBuscadorComponent } from './anuncio-vista-buscador/anuncio-vista-buscador.component'; 
import { SafePipe } from '../../pipes/Safe.pipe';

@NgModule({
  declarations: [
    AnuncioMiniaturaComponent,
    AnuncioVistaComponent,
    AnuncioVistaBuscadorComponent,
    SafePipe
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
    AnuncioVistaComponent,
    AnuncioVistaBuscadorComponent,
    SafePipe
  ]
})

export class AnunciosModule { }
