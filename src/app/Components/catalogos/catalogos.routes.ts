import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { AmenidadesComponent } from './amenidades/amenidades.component';
import { AsentamientosComponent } from './asentamientos/asentamientos.component';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { MedioscontactoComponent } from './medioscontacto/medioscontacto.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { PlanesComponent } from './planes/planes.component';
import { SubtipospropiedadComponent } from './subtipospropiedad/subtipospropiedad.component';
import { TipooperacionComponent } from './tipooperacion/tipooperacion.component';
import { TipopropiedadComponent } from './tipopropiedad/tipopropiedad.component';
import { TiposasentaientoComponent } from './tiposasentamiento/tiposasentamiento.component';
import { UsuariosempresaComponent } from './usuariosempresa/usuariosempresa.component';

export const CATALOGOS_CHILD_ROUTES: Routes = [
  { path: 'asentamientos', component: AsentamientosComponent, canActivate: [AuthGuard] },
  { path: 'caracteristicas', component: CaracteristicasComponent, canActivate: [AuthGuard] },
  { path: 'amenidades', component: AmenidadesComponent, canActivate: [AuthGuard] },
  { path: 'municipios', component: MunicipiosComponent, canActivate: [AuthGuard] },
  { path: 'medioscontacto', component: MedioscontactoComponent, canActivate: [AuthGuard] },
  { path: 'tiposasentamiento', component: TiposasentaientoComponent, canActivate: [AuthGuard] },
  { path: 'tiposoperacion', component: TipooperacionComponent, canActivate: [AuthGuard] },
  { path: 'planes', component: PlanesComponent, canActivate: [AuthGuard] },
  { path: 'tipospropiedad', component: TipopropiedadComponent, canActivate: [AuthGuard] },
  { path: 'subtipospropiedad', component: SubtipospropiedadComponent, canActivate: [AuthGuard] },
  { path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuard] },
  { path: 'usuariosempresa', component: UsuariosempresaComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'medioscontacto'},
]
