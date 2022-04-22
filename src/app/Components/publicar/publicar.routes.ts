import { Routes } from '@angular/router';

import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { FotosyvideosComponent } from './fotosyvideos/fotosyvideos.component';
import { OperaciontipoinmuebleComponent } from './operaciontipoinmueble/operaciontipoinmueble.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { AuthGuard } from '../../guards/auth.guard';
import { PagarYActivarComponent } from './pagar-y-activar/pagar-y-activar.component';
import { AdicionalesComponent } from './adicionales/adicionales.component';

export const PUBLICAR_CHILD_ROUTES: Routes = [
  { path: 'operacion-tipo-inmueble', component: OperaciontipoinmuebleComponent, canActivate : [AuthGuard] },
  { path: 'ubicacion', component: UbicacionComponent, canActivate : [AuthGuard] },
  { path: 'caracteristicas', component: CaracteristicasComponent, canActivate : [AuthGuard] },
  { path: 'fotosyvideos', component: FotosyvideosComponent, canActivate : [AuthGuard] },
  { path: 'adicionales', component: AdicionalesComponent, canActivate : [AuthGuard] },
  { path: 'pagar-y-activar', component: PagarYActivarComponent, canActivate : [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'operacion-tipo-inmueble'},
]
