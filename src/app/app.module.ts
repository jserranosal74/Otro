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

import { ActivarclienteComponent } from './Components/activarcliente/activarcliente.component';
import { AyudaModule } from './Components/ayuda/ayuda.module';
import { CatalogosModule } from './Components/catalogos/catalogos.module';
import { MicuentaModule } from './Components/micuenta/micuenta.module';
import { ProcesosModule } from './Components/procesos/procesos.module';
import { PublicarModule } from './Components/publicar/publicar.module';
import { RestablecerpasswordComponent } from './Components/restablecerpassword/restablecerpassword.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

// import { MaterialModule } from './material.module';
// import { CoreModule } from './core/core.module';
// import { SharedModule } from './shared/shared.module';

const fbLoginOptions = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

const googleLoginOptions = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig


// let config = [
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider("871188979190-53oa9ctrooeiv32eslaocarmn1rnif8a.apps.googleusercontent.com")
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider("523699662832841")
//   }
// ];

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
    RestablecerpasswordComponent,
    LegalComponent,
    MicuentaComponent,
    ActivarclienteComponent
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
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '871188979190-53oa9ctrooeiv32eslaocarmn1rnif8a.apps.googleusercontent.com', googleLoginOptions
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('523699662832841', fbLoginOptions)
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
