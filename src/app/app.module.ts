import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InicioComponent } from './Components/inicio/inicio.component';
import { BuscarComponent } from './Components/buscadores/buscador-inicial/buscador-inicial.component';
import { LoginComponent } from './Components/login/login.component';
import { PublicarComponent } from './Components/publicar/publicar.component';
import { AyudaComponent } from './Components/ayuda/ayuda.component';
import { DesarrollosComponent } from './Components/desarrollos/desarrollos.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import { SlideprincipalComponent } from './Components/slideprincipal/slideprincipal.component';
import { BusquedadetalladaComponent } from './Components/buscadores/buscador-detallado/buscador-detallado.component';
import { RecuperarpasswordComponent } from './Components/recuperarpassword/recuperarpassword.component';
import { LegalComponent } from './Components/legal/legal.component';
import { MicuentaComponent } from './Components/micuenta/micuenta.component';

import { AyudaModule } from './Components/ayuda/ayuda.module';
import { CatalogosModule } from './Components/catalogos/catalogos.module';
import { MicuentaModule } from './Components/micuenta/micuenta.module';
import { ProcesosModule } from './Components/procesos/procesos.module';
import { PublicarModule } from './Components/publicar/publicar.module';
import { RestablecerpasswordComponent } from './Components/restablecerpassword/restablecerpassword.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { LoadtkComponent } from './Components/loadtk/loadtk.component';

import { UsuarioModule } from './Components/cliente/cliente.module';
import { AnunciosModule } from './Components/anuncios/anuncios.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BuscarComponent,
    LoginComponent,
    PublicarComponent,
    AyudaComponent,
    DesarrollosComponent,
    FooterComponent,
    NavbarComponent,
    SlideprincipalComponent,
    BusquedadetalladaComponent,
    RecuperarpasswordComponent,
    RestablecerpasswordComponent,
    LegalComponent,
    MicuentaComponent,
    LoadtkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicarModule,
    AyudaModule,
    CatalogosModule,
    ProcesosModule,
    MicuentaModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    UsuarioModule,
    SocialLoginModule,
    AnunciosModule,
    SharedModule
  ],
  
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('523699662832841')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
