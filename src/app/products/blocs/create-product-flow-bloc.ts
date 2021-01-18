import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ProductFlowInfo = {
  name: string;
  published: boolean;
  discount: boolean;
  priceNormal: number;
  priceOffer: number;
};

@Injectable({
  providedIn: 'root',
})
export class CreateProductFlowBLoc {
  productFlowInfo = new BehaviorSubject<ProductFlowInfo>(null);

  constructor() {
    this.restore();
  }

  setStep1Info(
    info: Pick<ProductFlowInfo, 'name'>,
    published: Pick<ProductFlowInfo, 'published'>
  ) {
    this.productFlowInfo.next({
      ...this.productFlowInfo.value,
      name: info.name,
      published: published.published,
    });
    this.persist();
  }

  setStep2Info(
    discount: Pick<ProductFlowInfo, 'discount'>,
    priceNormal: Pick<ProductFlowInfo, 'priceNormal'>,
    priceOffer: Pick<ProductFlowInfo, 'priceOffer'>
  ) {
    this.productFlowInfo.next({
      ...this.productFlowInfo.value,
      discount: discount.discount,
      priceNormal: priceNormal.priceNormal,
      priceOffer: priceOffer.priceOffer,
    });
    this.persist();
    this.createProduct();
  }
  createProduct() {
    // const value = localStorage.getItem('create-product-flow-info');
    // const valueJson = JSON.parse(value);
    // console.log(valueJson);
  }

  private persist() {
    localStorage.setItem(
      'create-product-flow-info',
      JSON.stringify(this.productFlowInfo.value)
    );
  }

  private restore() {
    this.productFlowInfo.next(
      JSON.parse(localStorage.getItem('create-product-flow-info'))
    );
  }
}
