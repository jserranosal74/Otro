import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FotosyvideosComponent } from './fotosyvideos/fotosyvideos.component';
import { UbicacionComponent } from '../publicar/ubicacion/ubicacion.component';
import { InformacionprincipalComponent } from '../publicar/informacionprincipal/informacionprincipal.component';
import { OperaciontipoinmuebleComponent } from '../publicar/operaciontipoinmueble/operaciontipoinmueble.component'
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';

@NgModule({
  declarations: [
    FotosyvideosComponent,
    UbicacionComponent,
    CaracteristicasComponent,
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
    FotosyvideosComponent,
    UbicacionComponent,
    CaracteristicasComponent,
    InformacionprincipalComponent,
    OperaciontipoinmuebleComponent
  ]
})

export class PublicarModule { }
