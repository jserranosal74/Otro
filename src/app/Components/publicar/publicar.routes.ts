import { Routes } from '@angular/router';

import { ContactoComponent } from './contacto/contacto.component';
import { DetallesComponent } from './detalles/detalles.component';
import { FotosComponent } from './fotos/fotos.component';
import { InformacionprincipalComponent } from './informacionprincipal/informacionprincipal.component';
import { OperaciontipoinmuebleComponent } from './operaciontipoinmueble/operaciontipoinmueble.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';

export const PUBLICAR_CHILD_ROUTES: Routes = [
  { path: 'informacionprincipal', component: InformacionprincipalComponent },
  { path: 'operaciontipoinmueble', component: OperaciontipoinmuebleComponent },
  { path: 'fotos', component: FotosComponent },
  { path: 'ubicacion', component: UbicacionComponent },
  { path: 'detalles', component: DetallesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'informacionprincipal'},
]
