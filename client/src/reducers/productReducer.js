import {
  PRODUCT_LOAD_SUCCESS,
  PRODUCT_LOAD_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_LOAD_DETAIL_SUCCESS,
  DELETE_PRODUCT_SUCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_LOAD_CATE_SUCCESS,
} from "../contexts/contants";

export const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LOAD_SUCCESS:
      return {
        ...state,
        products: payload,
        productsLoading: false,
      };
    case PRODUCT_LOAD_CATE_SUCCESS:
      return {
        ...state,
        graphics: payload,
        graphicsLoading: false,
      };
    case PRODUCT_LOAD_FAIL:
      return {
        ...state,
        products: [],
        productsLoading: false,
      };
    case PRODUCT_LOAD_DETAIL_SUCCESS:
      return {
        ...state,
        product: payload,
        productLoading: false,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        products: [...state.products, payload],
      };
    case PRODUCT_UPDATE_SUCCESS:
      const newProducts = state.products.map((product) => {
        if (product._id === payload._id) return payload;
        return product;
      });
      return {
        ...state,
        products: newProducts,
      };
    case DELETE_PRODUCT_SUCESS:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
      };
    default:
      return state;
  }
};
