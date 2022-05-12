import { Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';
import { AnuncioVistaComponent } from './anuncio-vista/anuncio-vista.component';

export const ANUNCIOS_CHILD_ROUTES: Routes = [
  { path: 'vista/:info', component: AnuncioVistaComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'vista'},
]
