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
import { AdicionalesComponent } from './adicionales/adicionales.component';
import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { TipoOperacionPipe } from '../../pipes/TipoOperacion.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FotosyvideosComponent,
    UbicacionComponent,
    CaracteristicasComponent,
    InformacionprincipalComponent,
    OperaciontipoinmuebleComponent,
    PagarYActivarComponent,
    AdicionalesComponent,
    TipoOperacionPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TarjetasModule,
    SharedModule
  ],
  exports: [
    FotosyvideosComponent,
    UbicacionComponent,
    CaracteristicasComponent,
    InformacionprincipalComponent,
    OperaciontipoinmuebleComponent,
    PagarYActivarComponent,
    AdicionalesComponent,
    TipoOperacionPipe
  ]
})

export class PublicarModule { }
