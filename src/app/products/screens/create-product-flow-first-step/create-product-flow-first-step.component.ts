import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateProductFlowBLoc } from '../../blocs/create-product-flow-bloc';

@Component({
  selector: 'app-create-product-flow-first-step',
  templateUrl: './create-product-flow-first-step.component.html',
  styleUrls: ['./create-product-flow-first-step.component.scss'],
})
export class CreateProductFlowFirstStepComponent implements OnInit {
  productName: string;
  published;
  constructor(
    public createProductFlow: CreateProductFlowBLoc,
    private router: Router
  ) {
    console.log(this.createProductFlow.productFlowInfo);
  }

  ngOnInit(): void {}
  handleSubmit() {
    this.createProductFlow.setStep1Info(
      { name: this.productName },
      { published: this.published }
    );
    this.router.navigate(['create-product-flow-second-step']);
  }
}
