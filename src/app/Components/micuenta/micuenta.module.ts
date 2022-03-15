import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MiperfilComponent } from '../micuenta/miperfil/miperfil.component';
import { MisaldoComponent } from '../micuenta/misaldo/misaldo.component';
import { MisfavoritosComponent } from '../micuenta/misfavoritos/misfavoritos.component';
import { MismensajesComponent } from '../micuenta/mismensajes/mismensajes.component';
import { MisanunciosComponent } from '../micuenta/misanuncios/misanuncios.component';
import { MisalertasComponent } from './misalertas/misalertas.component';
import { SalirComponent } from './salir/salir.component';

@NgModule({
  declarations: [
    MiperfilComponent,
    MisaldoComponent,
    MisfavoritosComponent,
    MismensajesComponent,
    MisanunciosComponent,
    MisalertasComponent,
    SalirComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    MiperfilComponent,
    MisaldoComponent,
    MisfavoritosComponent,
    MismensajesComponent,
    MisanunciosComponent,
    MisalertasComponent,
    SalirComponent
  ]
})

export class MicuentaModule { }
