import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './Components/inicio/inicio.component';
import { ComprarComponent } from './Components/comprar/comprar.component';
import { RentarComponent } from './Components/rentar/rentar.component';
import { BuscarComponent } from './Components/buscar/buscar.component';
import { LoginComponent } from './Components/login/login.component';
import { PublicarComponent } from './Components/publicar/publicar.component';
import { AyudaComponent } from './Components/ayuda/ayuda.component';
import { DesarrollosComponent } from './Components/desarrollos/desarrollos.component';
import { MicuentaComponent } from './Components/micuenta/micuenta.component';

import { PUBLICAR_CHILD_ROUTES } from './Components/publicar/publicar.routes';
import { CATALOGOS_CHILD_ROUTES } from './Components/catalogos/catalogos.routes';
import { LEGAL_CHILD_ROUTES } from './Components/legal/legal.routes';
import { MICUENTA_CHILD_ROUTES } from './Components/micuenta/micuenta.routes';
import { AYUDA_CHILD_ROUTES } from './Components/ayuda/ayuda.routes';
import { ANUNCIOS_CHILD_ROUTES } from './Components/anuncios/anuncios.routes' 
import { PROCESOS_CHILD_ROUTES } from './Components/procesos/procesos.routes';

import { RecuperarpasswordComponent } from './Components/recuperarpassword/recuperarpassword.component';
import { LegalComponent } from './Components/legal/legal.component';
import { RestablecerpasswordComponent } from './Components/restablecerpassword/restablecerpassword.component';
import { LoadtkComponent } from './Components/loadtk/loadtk.component';
import { USUARIO_CHILD_ROUTES } from './Components/cliente/cliente.routes';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: ':filtros', component: InicioComponent },
  { path: 'comprar/:tipo', component: ComprarComponent },
  { path: 'rentar/:tipo', component: RentarComponent },
  { path: 'desarrollos/:tipo', component: DesarrollosComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperarpassword', component: RecuperarpasswordComponent },
  { path: 'restablecerpassword', component: RestablecerpasswordComponent },
  { path: 'loadtk/:info/:Id_Publicacion', component: LoadtkComponent },
  // { path: 'cliente', component: ActivarclienteComponent, children: [
  //   {
  //     path: 'activar',
  //     component: ActivarclienteComponent
  //   }] 
  // },
  { path: 'ayuda', component: AyudaComponent, children: AYUDA_CHILD_ROUTES },
  {
    path: 'publicar',
    component: PublicarComponent,
    children: PUBLICAR_CHILD_ROUTES,
  },
  {
    path: 'catalogos',
    children: CATALOGOS_CHILD_ROUTES,
  },
  {
    path: 'procesos',
    children: PROCESOS_CHILD_ROUTES,
  },
  {
    path: 'micuenta',
    component: MicuentaComponent,
    children: MICUENTA_CHILD_ROUTES
  },
  {
    path: 'propiedad',
    children: ANUNCIOS_CHILD_ROUTES
  },
  {
    path: 'usuario',
    children: USUARIO_CHILD_ROUTES
  },
  {
    path: 'legal',
    component: LegalComponent,
    children: LEGAL_CHILD_ROUTES
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
