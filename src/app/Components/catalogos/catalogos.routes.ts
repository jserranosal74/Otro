import { Routes } from '@angular/router';


import { AmenidadesComponent } from './amenidades/amenidades.component';
import { MedioscontactoComponent } from './medioscontacto/medioscontacto.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { TiposasentaientoComponent } from './tiposasentamiento/tiposasentaiento.component';


export const CATALOGOS_CHILD_ROUTES: Routes = [
  { path: 'amenidades', component: AmenidadesComponent },
  { path: 'municipios', component: MunicipiosComponent },
  { path: 'medioscontacto', component: MedioscontactoComponent },
  { path: 'tiposasentamiento', component: TiposasentaientoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'medioscontacto'},
]
