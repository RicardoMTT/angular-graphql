import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProductFlowFirstStepRoutingModule } from './create-product-flow-first-step-routing.module';
import { CreateProductFlowFirstStepComponent } from './create-product-flow-first-step.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateProductFlowFirstStepComponent],
  imports: [CommonModule, CreateProductFlowFirstStepRoutingModule, FormsModule],
})
export class CreateProductFlowFirstStepModule {}
