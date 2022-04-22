import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AnuncioMiniaturaComponent } from './anuncio-miniatura/anuncio-miniatura.component';
import { AnuncioPreviewComponent } from './anuncio-preview/anuncio-preview.component';

@NgModule({
  declarations: [
    AnuncioMiniaturaComponent,
    AnuncioPreviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    AnuncioMiniaturaComponent,
    AnuncioPreviewComponent
  ]
})

export class AnunciosModule { }
