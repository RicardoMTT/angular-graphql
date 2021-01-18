import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProductFlowFirstStepComponent } from './create-product-flow-first-step.component';

const routes: Routes = [{ path: '', component: CreateProductFlowFirstStepComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateProductFlowFirstStepRoutingModule { }
