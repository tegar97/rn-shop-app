import PRODUCTS from "../../data/dummy-data ";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/Product";
import Product from "./../../models/product";
export const initialState = {
  availableProduct: PRODUCTS,
  userProduct: PRODUCTS.filter((prod) => prod.ownerId == "u1"),
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        availableProductIndex: action.products,
        userProduct: action.products.filter(
          (prod: any) => prod.ownerId === "u1"
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProduct: state.availableProduct.concat(newProduct),
        userProduct: state.userProduct.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProduct.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProduct[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProduct[productIndex].price
      );

      const updatedUserProducts = [...state.userProduct];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProduct.findIndex(
        (prod) => prod.id === action.pid
      );
      const updateAvailableProduct = [...state.availableProduct];
      updateAvailableProduct[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProduct: updateAvailableProduct,
        userProduct: updatedUserProducts,
      };

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
