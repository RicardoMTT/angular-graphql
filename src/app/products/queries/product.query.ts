import { gql } from 'apollo-angular';

export const GET_PRODUCTS_QUERY = gql`
  query {
    productos {
      id
      nombre
      precioNormal
      publicado
      precioOferta
      descuento
    }
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query($id: ID!) {
    producto(id: $id) {
      id
      nombre
      publicado
      descuento
      precioNormal
      precioOferta
    }
  }
`;
