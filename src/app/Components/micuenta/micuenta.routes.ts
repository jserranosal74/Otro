import { Routes } from '@angular/router';

import { MiPerfilComponent } from './miperfil/miperfil.component';
import { MisPlanesYPaquetesComponent } from './misplanes/miplan.component';
import { MisAlertasComponent } from './misalertas/misalertas.component';
import { MisAnunciosComponent } from './misanuncios/misanuncios.component';
import { MisFavoritosComponent } from './misfavoritos/misfavoritos.component';
import { MisMensajesComponent } from './mismensajes/mismensajes.component';
import { SalirComponent } from './salir/salir.component';
import { AuthGuard } from '../../guards/auth.guard';
import { MisFacturasComponent } from './misfacturas/misfacturas.component';
import { MisDatosFiscalesComponent } from './misdatosfiscales/misdatosfiscales.component';
import { MisIndicadoresComponent } from './misindicadores/misindicadores.component';

export const MICUENTA_CHILD_ROUTES: Routes = [
  { path: 'mi-perfil', component: MiPerfilComponent, canActivate: [AuthGuard] },
  { path: 'mis-planesypaquetes', component: MisPlanesYPaquetesComponent, canActivate: [AuthGuard]  },
  { path: 'mis-datosfiscales', component: MisDatosFiscalesComponent, canActivate: [AuthGuard]  },
  { path: 'mis-anuncios', component: MisAnunciosComponent, canActivate: [AuthGuard]  },
  { path: 'mis-favoritos', component: MisFavoritosComponent, canActivate: [AuthGuard]  },
  { path: 'mis-mensajes', component: MisMensajesComponent, canActivate: [AuthGuard]  },
  { path: 'mis-alertas', component: MisAlertasComponent, canActivate: [AuthGuard]  },
  { path: 'mis-facturas', component: MisFacturasComponent, canActivate: [AuthGuard]  },
  { path: 'mis-indicadores', component: MisIndicadoresComponent, canActivate: [AuthGuard]  },
  { path: 'salir', component: SalirComponent, canActivate: [AuthGuard]  },
  { path: '**', pathMatch: 'full', redirectTo: 'miperfil'},
]
