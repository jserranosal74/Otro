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
import { DatosgeneralesComponent } from './Components/publicar/datosgenerales/datosgenerales.component';
import { FotosComponent } from './Components/publicar/fotos/fotos.component';
import { UbicacionComponent } from './Components/publicar/ubicacion/ubicacion.component';
import { DetallesComponent } from './Components/publicar/detalles/detalles.component';
import { ContactoComponent } from './Components/publicar/contacto/contacto.component';
import { MicuentaComponent } from './Components/micuenta/micuenta.component';
import { MisfavoritosComponent } from './Components/micuenta/misfavoritos/misfavoritos.component';
import { MiperfilComponent } from './Components/micuenta/miperfil/miperfil.component';
import { MismensajesComponent } from './Components/micuenta/mismensajes/mismensajes.component';
import { MisaldoComponent } from './Components/micuenta/misaldo/misaldo.component';

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
    NavbarComponent,
    DatosgeneralesComponent,
    FotosComponent,
    UbicacionComponent,
    DetallesComponent,
    ContactoComponent,
    MicuentaComponent,
    MisfavoritosComponent,
    MiperfilComponent,
    MismensajesComponent,
    MisaldoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
