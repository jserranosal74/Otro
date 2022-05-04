import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { ConfirmarPagosPlanesComponent } from './confirmarpagosplanes/confirmarpagosplanes.component';

export const PROCESOS_CHILD_ROUTES: Routes = [
  { path: 'confirmarpagosplanes', component: ConfirmarPagosPlanesComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'confirmarpagosplanes'},
]
