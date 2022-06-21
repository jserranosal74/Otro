import { Routes } from '@angular/router';
import { AuthGuardAdmin } from 'src/app/guards/authAdmin.guard';

import { AmenidadesComponent } from './amenidades/amenidades.component';
import { ArchivosFiscalesComponent } from './archivosfiscales/archivosfiscales.component';
import { AsentamientosComponent } from './asentamientos/asentamientos.component';
import { BancosComponent } from './bancos/bancos.component';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { MedioscontactoComponent } from './medioscontacto/medioscontacto.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { PlanesComponent } from './planes/planes.component';
import { SubtipospropiedadComponent } from './subtipospropiedad/subtipospropiedad.component';
import { TipooperacionComponent } from './tipooperacion/tipooperacion.component';
import { TipopropiedadComponent } from './tipopropiedad/tipopropiedad.component';
import { TiposasentaientoComponent } from './tiposasentamiento/tiposasentamiento.component';
import { UsuariosempresaComponent } from './usuariosempresa/usuariosempresa.component';

export const CATALOGOS_CHILD_ROUTES: Routes = [
  { path: 'archivosfiscales', component: ArchivosFiscalesComponent, canActivate: [AuthGuardAdmin] },
  { path: 'amenidades', component: AmenidadesComponent, canActivate: [AuthGuardAdmin] },
  { path: 'asentamientos', component: AsentamientosComponent, canActivate: [AuthGuardAdmin] },
  { path: 'bancos', component: BancosComponent, canActivate: [AuthGuardAdmin] },
  { path: 'caracteristicas', component: CaracteristicasComponent, canActivate: [AuthGuardAdmin] },
  { path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuardAdmin] },
  { path: 'municipios', component: MunicipiosComponent, canActivate: [AuthGuardAdmin] },
  { path: 'medioscontacto', component: MedioscontactoComponent, canActivate: [AuthGuardAdmin] },
  { path: 'paquetes', component: PaquetesComponent, canActivate: [AuthGuardAdmin] },
  { path: 'planes', component: PlanesComponent, canActivate: [AuthGuardAdmin] },
  { path: 'subtipospropiedad', component: SubtipospropiedadComponent, canActivate: [AuthGuardAdmin] },
  { path: 'tipospropiedad', component: TipopropiedadComponent, canActivate: [AuthGuardAdmin] },
  { path: 'tiposoperacion', component: TipooperacionComponent, canActivate: [AuthGuardAdmin] },
  { path: 'tiposasentamiento', component: TiposasentaientoComponent, canActivate: [AuthGuardAdmin] },
  { path: 'usuariosempresa', component: UsuariosempresaComponent, canActivate: [AuthGuardAdmin] },
  { path: '**', pathMatch: 'full', redirectTo: 'medioscontacto'},
]
