import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


import { AmenidadesComponent } from './amenidades/amenidades.component';
import { MedioscontactoComponent } from './medioscontacto/medioscontacto.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { TiposasentaientoComponent } from './tiposasentamiento/tiposasentaiento.component';


export const CATALOGOS_CHILD_ROUTES: Routes = [
  { path: 'amenidades', component: AmenidadesComponent, canActivate: [AuthGuard] },
  { path: 'municipios', component: MunicipiosComponent, canActivate: [AuthGuard] },
  { path: 'medioscontacto', component: MedioscontactoComponent, canActivate: [AuthGuard] },
  { path: 'tiposasentamiento', component: TiposasentaientoComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'medioscontacto'},
]
