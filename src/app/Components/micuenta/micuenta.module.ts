import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MiPerfilComponent } from '../micuenta/miperfil/miperfil.component';
import { MisPlanesYPaquetesComponent } from './misplanes/miplan.component';
import { MisFavoritosComponent } from '../micuenta/misfavoritos/misfavoritos.component';
import { MisMensajesComponent } from '../micuenta/mismensajes/mismensajes.component';
import { MisAnunciosComponent } from '../micuenta/misanuncios/misanuncios.component';
import { MisAlertasComponent } from './misalertas/misalertas.component';
import { SalirComponent } from './salir/salir.component';
import { MisFacturasComponent } from './misfacturas/misfacturas.component';
import { MisDatosFiscalesComponent } from './misdatosfiscales/misdatosfiscales.component';
import { AnunciosModule } from '../../Components/anuncios/anuncios.module'
import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { MensajeusuarioComponent } from './mensajeusuario/mensajeusuario.component';
import { MisIndicadoresComponent } from './misindicadores/misindicadores.component';
import { TipoOperacionPipe } from 'src/app/pipes/TipoOperacion.pipe';

@NgModule({
  declarations: [
    MiPerfilComponent,
    MisPlanesYPaquetesComponent,
    MisFavoritosComponent,
    MisMensajesComponent,
    MisAnunciosComponent,
    MisAlertasComponent,
    SalirComponent,
    MisFacturasComponent,
    MisDatosFiscalesComponent,
    MensajeusuarioComponent,
    MisIndicadoresComponent
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
    MiPerfilComponent,
    MisPlanesYPaquetesComponent,
    MisFavoritosComponent,
    MisMensajesComponent,
    MisAnunciosComponent,
    MisAlertasComponent,
    SalirComponent,
    MisFacturasComponent,
    MisDatosFiscalesComponent,
    MensajeusuarioComponent,
    MisIndicadoresComponent
  ]
})

export class MicuentaModule { }
