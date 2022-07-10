import { Routes } from '@angular/router';
import { AuthGuardAdmin } from 'src/app/guards/authAdmin.guard';

import { ConfirmarPagosPlanesComponent } from './confirmarpagosplanes/confirmarpagosplanes.component';
import { AsignarPaqueteAClienteComponent } from './asignarpaqueteacliente/asignarpaqueteacliente.component';
import { ActualizarPublicacionesPlanesYPaquetesComponent } from './actualizarpublicacionesplanesypaquetes/actualizarpublicacionesplanesypaquetes.component';
import { BloquearPublicacionComponent } from './bloquearpublicacion/bloquearpublicacion.component';

export const PROCESOS_CHILD_ROUTES: Routes = [
  { path: 'actualizarpublicacionesplanesypaquetes', component: ActualizarPublicacionesPlanesYPaquetesComponent, canActivate: [AuthGuardAdmin] },
  { path: 'asignarpaqueteacliente', component: AsignarPaqueteAClienteComponent, canActivate: [AuthGuardAdmin] },
  { path: 'confirmarpagosplanes', component: ConfirmarPagosPlanesComponent, canActivate: [AuthGuardAdmin] },
  { path: 'bloquearpublicacion', component: BloquearPublicacionComponent, canActivate: [AuthGuardAdmin] },
  { path: '**', pathMatch: 'full', redirectTo: 'confirmarpagosplanes'},
]
