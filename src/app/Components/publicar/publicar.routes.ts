import { Routes } from '@angular/router';

import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { FotosyvideosComponent } from './fotosyvideos/fotosyvideos.component';
import { InformacionprincipalComponent } from './informacionprincipal/informacionprincipal.component';
import { OperaciontipoinmuebleComponent } from './operaciontipoinmueble/operaciontipoinmueble.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { AuthGuard } from '../../guards/auth.guard';

export const PUBLICAR_CHILD_ROUTES: Routes = [
  { path: 'informacionprincipal', component: InformacionprincipalComponent, canActivate : [AuthGuard] },
  { path: 'operaciontipoinmueble', component: OperaciontipoinmuebleComponent, canActivate : [AuthGuard] },
  { path: 'fotosyvideos', component: FotosyvideosComponent, canActivate : [AuthGuard] },
  { path: 'ubicacion', component: UbicacionComponent, canActivate : [AuthGuard] },
  { path: 'caracteristicas', component: CaracteristicasComponent, canActivate : [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'operaciontipoinmueble'},
]
