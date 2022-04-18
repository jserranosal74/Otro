import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AnuncioMiniaturaComponent } from './anuncio-miniatura/anuncio-miniatura.component';

@NgModule({
  declarations: [
    AnuncioMiniaturaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    AnuncioMiniaturaComponent
  ]
})

export class AnunciosModule { }
