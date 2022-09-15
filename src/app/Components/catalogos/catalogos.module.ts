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
import { EmpresasComponent } from './empresas/empresas.component';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { TipoCaracteristicaPipe } from '../../pipes/TipoCaracteristica.pipe';
import { UsuariosempresaComponent } from './usuariosempresa/usuariosempresa.component';
import { BancosComponent } from './bancos/bancos.component';
import { TarjetasModule } from '../tarjetas/tarjetas.module';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { ArchivosFiscalesComponent } from './archivosfiscales/archivosfiscales.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { ProductosExternosComponent } from './productosexternos/productosexternos.component';
import { FacturacionExternaComponent } from './facturacionexterna/facturacionexterna.component';

@NgModule({
  declarations: [
    AmenidadesComponent,
    ArchivosFiscalesComponent,
    AsentamientosComponent,
    BancosComponent,
    CaracteristicasComponent,
    ClientesComponent,
    EmpresasComponent,
    EstadosComponent,
    FacturacionExternaComponent,
    IndicadoresComponent,
    MedioscontactoComponent,
    MunicipiosComponent,
    PaquetesComponent,
    PlanesComponent,
    ProductosExternosComponent,
    SubtipospropiedadComponent,
    TipoCaracteristicaPipe,
    TipofotoComponent,
    TipooperacionComponent,
    TipopersonaComponent,
    TipopropiedadComponent,
    TiposasentaientoComponent,
    UsuariosempresaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TarjetasModule
  ],
  exports: [
    AmenidadesComponent,
    ArchivosFiscalesComponent,
    AsentamientosComponent,
    BancosComponent,
    CaracteristicasComponent,
    ClientesComponent,
    EmpresasComponent,
    EstadosComponent,
    FacturacionExternaComponent,
    IndicadoresComponent,
    MedioscontactoComponent,
    MunicipiosComponent,
    PaquetesComponent,
    PlanesComponent,
    ProductosExternosComponent,
    SubtipospropiedadComponent,
    TipoCaracteristicaPipe,
    TipofotoComponent,
    TipooperacionComponent,
    TipopersonaComponent,
    TipopropiedadComponent,
    TiposasentaientoComponent,
    UsuariosempresaComponent
  ]
})

export class CatalogosModule { }
