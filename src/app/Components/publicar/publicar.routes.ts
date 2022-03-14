import { Routes } from '@angular/router';

import { ContactoComponent } from './contacto/contacto.component';
import { DatosgeneralesComponent } from './datosgenerales/datosgenerales.component';
import { DetallesComponent } from './detalles/detalles.component';
import { FotosComponent } from './fotos/fotos.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';

export const PUBLICAR_CHILD_ROUTES: Routes = [
  { path: 'datosgenerales', component: DatosgeneralesComponent },
  { path: 'fotos', component: FotosComponent },
  { path: 'ubicacion', component: UbicacionComponent },
  { path: 'detalles', component: DetallesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'datosgenerales'},
]