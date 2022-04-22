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
import { LEGAL_CHILD_ROUTES } from './Components/legal/legal.routes';
import { MICUENTA_CHILD_ROUTES } from './Components/micuenta/micuenta.routes';
import { AYUDA_CHILD_ROUTES } from './Components/ayuda/ayuda.routes';
import { ANUNCIOS_CHILD_ROUTES } from './Components/anuncios/anuncios.routes' 

import { RecuperarpasswordComponent } from './Components/recuperarpassword/recuperarpassword.component';
import { LegalComponent } from './Components/legal/legal.component';
import { ActivarclienteComponent } from './Components/activarcliente/activarcliente.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'comprar/:tipo', component: ComprarComponent },
  { path: 'rentar/:tipo', component: RentarComponent },
  { path: 'desarrollos/:tipo', component: DesarrollosComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'iniciarsesion', component: IniciarsesionComponent },
  { path: 'recuperarpassword', component: RecuperarpasswordComponent },
  { path: 'cliente', component: ActivarclienteComponent, children: [
    {
      path: 'activar',
      component: ActivarclienteComponent
    }] 
  },
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
    path: 'micuenta',
    component: MicuentaComponent,
    children: MICUENTA_CHILD_ROUTES
  },
  {
    path: 'anuncio',
    children: ANUNCIOS_CHILD_ROUTES
  },
  {
    path: 'legal',
    component: LegalComponent,
    children: LEGAL_CHILD_ROUTES
  },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
