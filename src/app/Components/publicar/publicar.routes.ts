import { Routes } from '@angular/router';

import { DetallesComponent } from './detalles/detalles.component';
import { FotosComponent } from './fotos/fotos.component';
import { InformacionprincipalComponent } from './informacionprincipal/informacionprincipal.component';
import { OperaciontipoinmuebleComponent } from './operaciontipoinmueble/operaciontipoinmueble.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { AuthGuard } from '../../guards/auth.guard';

export const PUBLICAR_CHILD_ROUTES: Routes = [
  { path: 'informacionprincipal', component: InformacionprincipalComponent, canActivate : [AuthGuard] },
  { path: 'operaciontipoinmueble', component: OperaciontipoinmuebleComponent, canActivate : [AuthGuard] },
  { path: 'fotos', component: FotosComponent, canActivate : [AuthGuard] },
  { path: 'ubicacion', component: UbicacionComponent, canActivate : [AuthGuard] },
  { path: 'detalles', component: DetallesComponent, canActivate : [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'informacionprincipal'},
]
