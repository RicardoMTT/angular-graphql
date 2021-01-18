import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import {
  DELETE_PRODUCT_MUTATION,
  UPDATE_PRODUCT,
} from '../../mutations/product.mutation';
import { GET_PRODUCTS_QUERY } from '../../queries/product.query';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  editProduct = false;
  productsResult$: Observable<ApolloQueryResult<{ productos: Product[] }>>;

  newPriceOffer;
  newPrice;
  constructor(private apollo: Apollo, private router: Router) {
    this.productsResult$ = this.apollo
      .watchQuery<{ productos: Product[] }>({
        query: GET_PRODUCTS_QUERY,
      })
      .valueChanges.pipe();
  }

  handlePublishedClick(productId, published) {
    this.apollo
      .mutate({
        mutation: UPDATE_PRODUCT,
        variables: {
          id: productId,
          data: {
            publicado: published,
          },
        },
      })
      .subscribe();
  }
  handleDiscountClick(productId, discount) {
    this.apollo
      .mutate({
        mutation: UPDATE_PRODUCT,
        variables: {
          id: productId,
          data: {
            descuento: discount,
          },
        },
      })
      .subscribe();
  }

  ngOnInit(): void {}

  updateProduct(productId, descuento, publicado) {
    console.log(descuento);
    console.log(publicado);

    this.apollo
      .mutate({
        mutation: UPDATE_PRODUCT,
        variables: {
          id: productId,
          data: {
            descuento,
            publicado,
            precioNormal: Number(this.newPrice),
            precioOferta: Number(this.newPriceOffer),
          },
        },
      })
      .subscribe();
  }
  changeToEditProduct(id) {
    this.router.navigate(['/product-list/product-details', id]);
  }
  deleteProduct(productId) {
    const response = confirm('Esta seguro de eliminar este producto');
    if (!response) {
      console.log('aca nomas quedas tio');

      return;
    }
    this.apollo
      .mutate({
        mutation: DELETE_PRODUCT_MUTATION,
        variables: {
          id: productId,
        },
        refetchQueries: [
          {
            query: GET_PRODUCTS_QUERY,
          },
        ],
      })
      .subscribe();
  }

  redirectFirstStep() {
    this.router.navigate(['/create-product-flow-first-step']);
  }
}
