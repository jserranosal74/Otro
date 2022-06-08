import { Routes } from '@angular/router';

import { MiperfilComponent } from './miperfil/miperfil.component';
import { MisplanesComponent } from './misplanes/miplan.component';
import { MisalertasComponent } from './misalertas/misalertas.component';
import { MisanunciosComponent } from './misanuncios/misanuncios.component';
import { MisfavoritosComponent } from './misfavoritos/misfavoritos.component';
import { MismensajesComponent } from './mismensajes/mismensajes.component';
import { SalirComponent } from './salir/salir.component';
import { AuthGuard } from '../../guards/auth.guard';
import { MisfacturasComponent } from './misfacturas/misfacturas.component';
import { DatosfiscalesComponent } from './datosfiscales/datosfiscales.component';

export const MICUENTA_CHILD_ROUTES: Routes = [
  { path: 'miperfil', component: MiperfilComponent, canActivate: [AuthGuard] },
  { path: 'misplanesypaquetes', component: MisplanesComponent, canActivate: [AuthGuard]  },
  { path: 'datosfiscales', component: DatosfiscalesComponent, canActivate: [AuthGuard]  },
  { path: 'misanuncios', component: MisanunciosComponent, canActivate: [AuthGuard]  },
  { path: 'misfavoritos', component: MisfavoritosComponent, canActivate: [AuthGuard]  },
  { path: 'mismensajes', component: MismensajesComponent, canActivate: [AuthGuard]  },
  { path: 'misalertas', component: MisalertasComponent, canActivate: [AuthGuard]  },
  { path: 'misfacturas', component: MisfacturasComponent, canActivate: [AuthGuard]  },
  { path: 'salir', component: SalirComponent, canActivate: [AuthGuard]  },
  { path: '**', pathMatch: 'full', redirectTo: 'miperfil'},
]
