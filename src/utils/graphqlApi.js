import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        category
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        brand
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query {
    category(input: { title: "tech" }) {
      name
      products {
        id
        name
        inStock
        gallery
        category
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        brand
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const getProductById = (id) => {
  return gql`
    query product($id: String!) {
      product(id: $id) {
        id
        name
        inStock
        gallery
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  `;
};

export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
