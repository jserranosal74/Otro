import { Routes } from '@angular/router';

import { MiperfilComponent } from './miperfil/miperfil.component';
import { MisaldoComponent } from './misaldo/misaldo.component';
import { MisalertasComponent } from './misalertas/misalertas.component';
import { MisanunciosComponent } from './misanuncios/misanuncios.component';
import { MisfavoritosComponent } from './misfavoritos/misfavoritos.component';
import { MismensajesComponent } from './mismensajes/mismensajes.component';
import { SalirComponent } from './salir/salir.component';

export const MICUENTA_CR: Routes = [
  { path: 'miperfil', component: MiperfilComponent },
  { path: 'misaldo', component: MisaldoComponent },
  { path: 'misanuncios', component: MisanunciosComponent },
  { path: 'misfavoritos', component: MisfavoritosComponent },
  { path: 'mismensajes', component: MismensajesComponent },
  { path: 'misalertas', component: MisalertasComponent },
  { path: 'salir', component: SalirComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'miperfil'},
]
