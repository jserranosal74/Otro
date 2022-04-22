import { Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';
import { AnuncioPreviewComponent } from './anuncio-preview/anuncio-preview.component';

export const ANUNCIOS_CHILD_ROUTES: Routes = [
  { path: 'preview/:info', component: AnuncioPreviewComponent, canActivate : [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'preview'},
]
