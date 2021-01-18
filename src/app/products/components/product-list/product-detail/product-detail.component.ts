import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/products/models/product.model';
import { tap } from 'rxjs/operators';
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
} from 'src/app/products/queries/product.query';
import { UPDATE_PRODUCT } from 'src/app/products/mutations/product.mutation';
import { EditProductFlowBLoc } from 'src/app/products/blocs/edit-product-flow-bloc';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  id: string;
  producto: any;
  precioNormal: any;
  precioOferta: any = 12.0;
  publicado: any;
  descuento: any;
  private sub: Subscription;
  productsResult$: Observable<ApolloQueryResult<{ producto: Product }>>;

  productForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private fb: FormBuilder,
    private editProductFlowBLoc: EditProductFlowBLoc
  ) {
    this.sub = this.route.params.subscribe((params) => {
      console.log(params);

      this.id = params.id;
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.id);
    this.productsResult$ = this.apollo
      .watchQuery<{ producto: Product }>({
        query: GET_PRODUCT_QUERY,
        variables: {
          id: this.id,
        },
      })
      .valueChanges.pipe(
        tap((val) => {
          this.editProductFlowBLoc.productFlowInfo.next({
            name: val.data.producto.nombre,
            discount: val.data.producto.descuento,
            priceNormal: val.data.producto.precioNormal,
            priceOffer: val.data.producto.precioOferta,
            published: val.data.producto.publicado,
          });

          this.editProductFlowBLoc.productFlowInfo.subscribe((val) => {
            console.log('vaa', val);
          });
          this.productForm = this.fb.group({
            nombre: [val.data.producto.nombre],
            precioNormal: [val.data.producto.precioNormal],
            precioOferta: [val.data.producto.precioOferta],
            descuento: [val.data.producto.descuento],
            publicado: [val.data.producto.publicado],
          });
        })
      );
  }
  async editProduct(productId) {
    const {
      nombre,
      precioNormal,
      precioOferta,
      descuento,
      publicado,
    } = this.productForm.value;

    await this.apollo
      .mutate({
        mutation: UPDATE_PRODUCT,
        variables: {
          id: productId,
          data: {
            publicado: publicado,
            descuento,
            precioNormal: Number(precioNormal),
            precioOferta: Number(precioOferta),
            nombre,
          },
        },
        refetchQueries: [
          {
            query: GET_PRODUCTS_QUERY,
          },
        ],
      })
      .subscribe();
    console.log(nombre, precioNormal, precioOferta, descuento, publicado);
    this.router.navigate(['']);
  }
  toBackHome() {
    this.router.navigate(['']);
  }
}
