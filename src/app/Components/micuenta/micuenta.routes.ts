import { Routes } from '@angular/router';

import { MiperfilComponent } from './miperfil/miperfil.component';
import { MisaldoComponent } from './misaldo/misaldo.component';
import { MisanunciosComponent } from './misanuncios/misanuncios.component';
import { MisfavoritosComponent } from './misfavoritos/misfavoritos.component';
import { MismensajesComponent } from './mismensajes/mismensajes.component';

export const MICUENTA_CHILD_ROUTES: Routes = [
  { path: 'miperfil', component: MiperfilComponent },
  { path: 'misaldo', component: MisaldoComponent },
  { path: 'misanuncios', component: MisanunciosComponent },
  { path: 'misfavoritos', component: MisfavoritosComponent },
  { path: 'mismensajes', component: MismensajesComponent },
  { path: '**', pathMatch: 'full', redirectTo: ''},
]
