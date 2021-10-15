export const HOMEPAGE = "/products/";
export const AUTH = "/";

const domain = process.env.REACT_APP_API_DOMAIN;
export const CART_API = `${domain}/carts/`;
export const PRODUCT_API = `${domain}/products/api/`;
export const LOGIN_API = `${domain}/users/login/`;
export const REGISTER_API = `${domain}/users/`;
export const UPDATE_CART_API = `${domain}/carts/detail/`;
