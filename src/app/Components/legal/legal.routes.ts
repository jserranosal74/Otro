import { Routes } from '@angular/router';

import { TerminosycondicionesdeusoComponent } from './terminosycondicionesdeuso/terminosycondicionesdeuso.component';
import { TerminosycondicionesdecontratacionComponent } from './terminosycondicionesdecontratacion/terminosycondicionesdecontratacion.component';
import { PoliticadeprivacidadComponent } from './politicadeprivacidad/politicadeprivacidad.component';


export const LEGAL_CHILD_ROUTES: Routes = [
  { path: 'terminosycondicionesdeuso', component: TerminosycondicionesdeusoComponent },
  { path: 'terminosycondicionesdecontratacion', component: TerminosycondicionesdecontratacionComponent },
  { path: 'politicadeprivacidad', component: PoliticadeprivacidadComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'terminosycondicionesdeuso'},
]
