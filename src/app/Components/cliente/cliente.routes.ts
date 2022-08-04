import { Routes } from '@angular/router';

import { ActivarclienteComponent } from './activarcliente/activarcliente.component';
import { IniciarsesionComponent } from './iniciarsesion/iniciarsesion.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';

export const USUARIO_CHILD_ROUTES: Routes = [
  { path: 'activar', component: ActivarclienteComponent},
  { path: 'iniciarsesion', component: IniciarsesionComponent },
  { path: 'propiedades/:id_cliente', component: PropiedadesComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'propiedades'},
]
