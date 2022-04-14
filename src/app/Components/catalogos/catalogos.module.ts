import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MedioscontactoComponent } from './medioscontacto/medioscontacto.component';
import { TiposasentaientoComponent } from './tiposasentamiento/tiposasentamiento.component';
import { AmenidadesComponent } from './amenidades/amenidades.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { EstadosComponent } from './estados/estados.component';
import { AsentamientosComponent } from './asentamientos/asentamientos.component';
import { PlanesComponent } from './planes/planes.component';
import { ClientesComponent } from './clientes/clientes.component';
import { TipooperacionComponent } from './tipooperacion/tipooperacion.component';
import { TipopersonaComponent } from './tipopersona/tipopersona.component';
import { TipopropiedadComponent } from './tipopropiedad/tipopropiedad.component';
import { TipofotoComponent } from './tipofoto/tipofoto.component';
import { SubtipospropiedadComponent } from './subtipospropiedad/subtipospropiedad.component';

@NgModule({
  declarations: [
    MedioscontactoComponent,
    TiposasentaientoComponent,
    AmenidadesComponent,
    MunicipiosComponent,
    EstadosComponent,
    AsentamientosComponent,
    PlanesComponent,
    ClientesComponent,
    TipooperacionComponent,
    TipopersonaComponent,
    TipopropiedadComponent,
    TipofotoComponent,
    SubtipospropiedadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    MedioscontactoComponent,
    TiposasentaientoComponent,
    AmenidadesComponent,
    MunicipiosComponent,
    EstadosComponent,
    AsentamientosComponent,
    PlanesComponent,
    ClientesComponent,
    TipooperacionComponent,
    TipopersonaComponent,
    TipopropiedadComponent,
    TipofotoComponent,
    SubtipospropiedadComponent
  ]
})

export class CatalogosModule { }
