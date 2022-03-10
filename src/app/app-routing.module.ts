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

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'comprar/:tipo', component: ComprarComponent },
  { path: 'rentar/:tipo', component: RentarComponent },
  { path: 'desarrollos/:tipo', component: DesarrollosComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'publicar', component: PublicarComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
