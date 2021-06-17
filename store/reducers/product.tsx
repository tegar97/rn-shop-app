import PRODUCTS from "../../data/dummy-data ";
import { DELETE_PRODUCT } from "../actions/Product";

export const initialState = {
  availableProduct: PRODUCTS,
  userProduct: PRODUCTS.filter((prod) => prod.ownerId == "u1"),
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProduct: state.userProduct.filter(
          (product) => product.id !== action.pid
        ),
        availableProduct: state.availableProduct.filter(
          (availableProduct) => availableProduct.id !== action.pid
        ),
      };
  }

  return state;
};
