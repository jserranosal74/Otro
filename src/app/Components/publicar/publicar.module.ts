import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FotosyvideosComponent } from './fotosyvideos/fotosyvideos.component';
import { UbicacionComponent } from '../publicar/ubicacion/ubicacion.component';
import { InformacionprincipalComponent } from '../publicar/informacionprincipal/informacionprincipal.component';
import { OperaciontipoinmuebleComponent } from '../publicar/operaciontipoinmueble/operaciontipoinmueble.component'
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { PagarYActivarComponent } from './pagar-y-activar/pagar-y-activar.component';

@NgModule({
  declarations: [
    FotosyvideosComponent,
    UbicacionComponent,
    CaracteristicasComponent,
    InformacionprincipalComponent,
    OperaciontipoinmuebleComponent,
    PagarYActivarComponent
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
    OperaciontipoinmuebleComponent,
    PagarYActivarComponent
  ]
})

export class PublicarModule { }
