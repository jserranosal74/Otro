import { Routes } from '@angular/router';

import { ContactoComponent } from './contacto/contacto.component';

export const AYUDA_CHILD_ROUTES: Routes = [
  { path: 'contacto', component: ContactoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'contacto'},
]
