import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { RentarComponent } from './Components/rentar/rentar.component';
import { BuscarComponent } from './Components/buscar/buscar.component';
import { LoginComponent } from './Components/login/login.component';
import { PublicarComponent } from './Components/publicar/publicar.component';
import { ComprarComponent } from './Components/comprar/comprar.component';
import { AyudaComponent } from './Components/ayuda/ayuda.component';
import { DesarrollosComponent } from './Components/desarrollos/desarrollos.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import { PublicarModule } from './Components/publicar/publicar.module';
import { MicuentaModule } from './Components/micuenta/micuenta.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RentarComponent,
    BuscarComponent,
    LoginComponent,
    PublicarComponent,
    ComprarComponent,
    AyudaComponent,
    DesarrollosComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicarModule,
    MicuentaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
