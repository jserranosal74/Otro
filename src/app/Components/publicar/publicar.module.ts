import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FotosComponent } from '../publicar/fotos/fotos.component';
import { UbicacionComponent } from '../publicar/ubicacion/ubicacion.component';
import { DetallesComponent } from '../publicar/detalles/detalles.component';
import { ContactoComponent } from '../publicar/contacto/contacto.component';
import { InformacionprincipalComponent } from '../publicar/informacionprincipal/informacionprincipal.component';
import { OperaciontipoinmuebleComponent } from '../publicar/operaciontipoinmueble/operaciontipoinmueble.component'

@NgModule({
  declarations: [
    FotosComponent,
    UbicacionComponent,
    DetallesComponent,
    ContactoComponent,
    InformacionprincipalComponent,
    OperaciontipoinmuebleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    FotosComponent,
    UbicacionComponent,
    DetallesComponent,
    ContactoComponent,
    InformacionprincipalComponent,
    OperaciontipoinmuebleComponent
  ]
})

export class PublicarModule { }
