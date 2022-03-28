import { Routes } from '@angular/router';

import { MedioscontactoComponent } from './medioscontacto/medioscontacto.component';
import { TiposasentaientoComponent } from './tiposasentamiento/tiposasentaiento.component';

export const CATALOGOS_CHILD_ROUTES: Routes = [
  { path: 'medioscontacto', component: MedioscontactoComponent },
  { path: 'tiposasentamiento', component: TiposasentaientoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'medioscontacto'},
]
