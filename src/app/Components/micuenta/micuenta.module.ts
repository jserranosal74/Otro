import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MiperfilComponent } from '../micuenta/miperfil/miperfil.component';
import { MisplanesComponent } from './misplanes/miplan.component';
import { MisfavoritosComponent } from '../micuenta/misfavoritos/misfavoritos.component';
import { MismensajesComponent } from '../micuenta/mismensajes/mismensajes.component';
import { MisanunciosComponent } from '../micuenta/misanuncios/misanuncios.component';
import { MisalertasComponent } from './misalertas/misalertas.component';
import { SalirComponent } from './salir/salir.component';
import { MisfacturasComponent } from './misfacturas/misfacturas.component';
import { DatosfiscalesComponent } from './datosfiscales/datosfiscales.component';
import { AnunciosModule } from '../../Components/anuncios/anuncios.module'
import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { MensajeusuarioComponent } from './mensajeusuario/mensajeusuario.component';

@NgModule({
  declarations: [
    MiperfilComponent,
    MisplanesComponent,
    MisfavoritosComponent,
    MismensajesComponent,
    MisanunciosComponent,
    MisalertasComponent,
    SalirComponent,
    MisfacturasComponent,
    DatosfiscalesComponent,
    MensajeusuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AnunciosModule,
    TarjetasModule
  ],
  exports: [
    MiperfilComponent,
    MisplanesComponent,
    MisfavoritosComponent,
    MismensajesComponent,
    MisanunciosComponent,
    MisalertasComponent,
    SalirComponent,
    MisfacturasComponent,
    DatosfiscalesComponent,
    MensajeusuarioComponent
  ]
})

export class MicuentaModule { }
