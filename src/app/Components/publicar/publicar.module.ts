import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotosComponent } from '../publicar/fotos/fotos.component';
import { UbicacionComponent } from '../publicar/ubicacion/ubicacion.component';
import { DetallesComponent } from '../publicar/detalles/detalles.component';
import { ContactoComponent } from '../publicar/contacto/contacto.component';
import { InformacionprincipalComponent } from '../publicar/informacionprincipal/informacionprincipal.component'

@NgModule({
  declarations: [
    FotosComponent,
    UbicacionComponent,
    DetallesComponent,
    ContactoComponent,
    InformacionprincipalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FotosComponent,
    UbicacionComponent,
    DetallesComponent,
    ContactoComponent,
    InformacionprincipalComponent
  ]
})

export class PublicarModule { }
