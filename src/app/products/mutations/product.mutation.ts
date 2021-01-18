import { gql } from 'apollo-angular';

export const DELETE_PRODUCT_MUTATION = gql`
  mutation($id: ID!) {
    deleteProducto(input: { where: { id: $id } }) {
      producto {
        id
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation($id: ID!, $data: editProductoInput) {
    updateProducto(input: { where: { id: $id }, data: $data }) {
      producto {
        id
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation($data: ProductoInput) {
    createProducto(input: { data: $data }) {
      producto {
        id
      }
    }
  }
`;
