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
import { IniciarsesionComponent } from './Components/iniciarsesion/iniciarsesion.component';


import { PUBLICAR_CHILD_ROUTES } from './Components/publicar/publicar.routes';
import { CATALOGOS_CHILD_ROUTES } from './Components/catalogos/catalogos.routes';
import { MICUENTA_CR } from './Components/micuenta/micuenta.routes';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'comprar/:tipo', component: ComprarComponent },
  { path: 'rentar/:tipo', component: RentarComponent },
  { path: 'desarrollos/:tipo', component: DesarrollosComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'iniciarsesion', component: IniciarsesionComponent },
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
    path: 'micuenta',
    component: MicuentaComponent,
    children: MICUENTA_CR
  },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
