import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from './loading/loading.component';

const sharedComponents = [LoadingComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [CommonModule, RouterModule],
  exports: [...sharedComponents],
  entryComponents: [...sharedComponents],
})
export class SharedModule {}
