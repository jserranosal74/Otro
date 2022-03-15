import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiperfilComponent } from '../micuenta/miperfil/miperfil.component';
import { MisaldoComponent } from '../micuenta/misaldo/misaldo.component';
import { MisfavoritosComponent } from '../micuenta/misfavoritos/misfavoritos.component';
import { MismensajesComponent } from '../micuenta/mismensajes/mismensajes.component';
import { MisanunciosComponent } from './misanuncios/misanuncios.component';

@NgModule({
  declarations: [
    MiperfilComponent,
    MisaldoComponent,
    MisfavoritosComponent,
    MismensajesComponent,
    MisanunciosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MiperfilComponent,
    MisaldoComponent,
    MisfavoritosComponent,
    MismensajesComponent,
    MisanunciosComponent
  ]
})

export class MicuentaModule { }
