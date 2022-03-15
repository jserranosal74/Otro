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
import { MICUENTA_CHILD_ROUTES } from './Components/micuenta/micuenta.routes';
import { MiperfilComponent } from './Components/micuenta/miperfil/miperfil.component';
import { MisaldoComponent } from './Components/micuenta/misaldo/misaldo.component';
import { MisanunciosComponent } from './Components/micuenta/misanuncios/misanuncios.component';
import { MisfavoritosComponent } from './Components/micuenta/misfavoritos/misfavoritos.component';
import { MismensajesComponent } from './Components/micuenta/mismensajes/mismensajes.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'comprar/:tipo', component: ComprarComponent },
  { path: 'rentar/:tipo', component: RentarComponent },
  { path: 'desarrollos/:tipo', component: DesarrollosComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'publicar',
    component: PublicarComponent,
    children: PUBLICAR_CHILD_ROUTES,
  },
  {
    path: 'micuenta',
    component: MicuentaComponent
  },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
