import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProductFlowSecondStepRoutingModule } from './create-product-flow-second-step-routing.module';
import { CreateProductFlowSecondStepComponent } from './create-product-flow-second-step.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateProductFlowSecondStepComponent],
  imports: [
    CommonModule,
    CreateProductFlowSecondStepRoutingModule,
    FormsModule,
  ],
})
export class CreateProductFlowSecondStepModule {}
