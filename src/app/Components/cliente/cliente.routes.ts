import { Routes } from '@angular/router';
import { ActivarclienteComponent } from './activarcliente/activarcliente.component';

import { PropiedadesComponent } from './propiedades/propiedades.component';

export const CLIENTE_CHILD_ROUTES: Routes = [
  { path: 'activar', component: ActivarclienteComponent},
  { path: 'propiedades/:id_cliente', component: PropiedadesComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'propiedades'},
]
