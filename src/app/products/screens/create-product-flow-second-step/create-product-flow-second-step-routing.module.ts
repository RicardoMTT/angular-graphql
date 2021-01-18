import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProductFlowSecondStepComponent } from './create-product-flow-second-step.component';

const routes: Routes = [{ path: '', component: CreateProductFlowSecondStepComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateProductFlowSecondStepRoutingModule { }
