import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MedioscontactoComponent } from '../../Components/catalogos/medioscontacto/medioscontacto.component';
import { TiposasentaientoComponent } from '../../Components/catalogos/tiposasentamiento/tiposasentaiento.component';

@NgModule({
  declarations: [
    MedioscontactoComponent,
    TiposasentaientoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    MedioscontactoComponent,
    TiposasentaientoComponent
  ]
})

export class CatalogosModule { }
