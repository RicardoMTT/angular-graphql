import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CreateProductFlowBLoc } from '../../blocs/create-product-flow-bloc';
import { CREATE_PRODUCT } from '../../mutations/product.mutation';
import { GET_PRODUCTS_QUERY } from '../../queries/product.query';

@Component({
  selector: 'app-create-product-flow-second-step',
  templateUrl: './create-product-flow-second-step.component.html',
  styleUrls: ['./create-product-flow-second-step.component.scss'],
})
export class CreateProductFlowSecondStepComponent implements OnInit {
  discount;
  priceNormal;
  priceOffer;
  toBack = false;
  constructor(
    public createProductFlow: CreateProductFlowBLoc,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {}

  async handleStep2() {
    this.toBack = true;
    await this.createProductFlow.setStep2Info(
      { discount: this.discount },
      { priceNormal: this.priceNormal },
      { priceOffer: this.priceOffer }
    );
    const value = localStorage.getItem('create-product-flow-info');

    const valueJson = JSON.parse(value);
    console.log(valueJson);

    const responseConfirm = confirm('Desea publicar el producto');

    if (!responseConfirm) {
      return;
    }
    const newProduct = {
      nombre: valueJson.name,
      precioNormal: Number(valueJson.priceNormal),
      precioOferta: Number(valueJson.priceOffer),
      publicado: valueJson.published,
      descuento: valueJson.discount,
    };
    this.apollo
      .mutate({
        mutation: CREATE_PRODUCT,
        variables: {
          data: newProduct,
        },
        refetchQueries: [
          {
            query: GET_PRODUCTS_QUERY,
          },
        ],
      })
      .subscribe();
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
