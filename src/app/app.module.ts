import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

import { SlideprincipalComponent } from './Components/slideprincipal/slideprincipal.component';
import { RecomendadosparatiComponent } from './Components/recomendadosparati/recomendadosparati.component';
import { CategoriaspopularesComponent } from './Components/categoriaspopulares/categoriaspopulares.component';
import { BusquedadetalladaComponent } from './Components/buscar/busquedadetallada/busquedadetallada.component';
import { IniciarsesionComponent } from './Components/iniciarsesion/iniciarsesion.component';
import { RecuperarpasswordComponent } from './Components/recuperarpassword/recuperarpassword.component';
import { LegalComponent } from './Components/legal/legal.component';
import { MicuentaComponent } from './Components/micuenta/micuenta.component';

import { MicuentaModule } from './Components/micuenta/micuenta.module';
import { CatalogosModule } from './Components/catalogos/catalogos.module';
import { PublicarModule } from './Components/publicar/publicar.module';
import { AyudaModule } from './Components/ayuda/ayuda.module';

// import { MaterialModule } from './material.module';
// import { CoreModule } from './core/core.module';
// import { SharedModule } from './shared/shared.module';

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
    SlideprincipalComponent,
    RecomendadosparatiComponent,
    CategoriaspopularesComponent,
    BusquedadetalladaComponent,
    IniciarsesionComponent,
    RecuperarpasswordComponent,
    LegalComponent,
    MicuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicarModule,
    AyudaModule,
    CatalogosModule,
    MicuentaModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // MaterialModule,
    // CoreModule,
    // SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
