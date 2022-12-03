import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

export const ORDER_LIMIT = 7;
const CART_LOCALSTORAGE = "CART_LOCAL";

const cartInfoFromStorage =
localStorage.getItem(CART_LOCALSTORAGE) ? JSON.parse(localStorage.getItem(CART_LOCALSTORAGE)) : [];

const initialState = {
  cartState: {
    cancelled: "",
    bill: [],
    cart: cartInfoFromStorage,
    cartLocal: [],
    data: [],
    totalBill: 0,
    cartItem: 0,
    loading: false,
    error: null,
  },
};
export const CART_ID = cartInfoFromStorage;
console.log("🚀 ~ file: user.slice.js ~ line 18 ~ CART_ID", CART_ID);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartAction: (state, action) => {
      const cartItem = [action.payload, ...cartInfoFromStorage];
      localStorage.setItem(CART_LOCALSTORAGE, JSON.stringify(cartItem));
      state.cartState = {
        ...state.cartItem,
        cartInfoFromStorage: cartItem,
        loading: false,
      };
    },
    removeCartAction: (state, action) => {
      localStorage.removeItem(CART_LOCALSTORAGE);
      // const listCartItem = state.cartState.cart
      // console.log("🚀 ~ file: cart.slice.js ~ line 29 ~ listCartItem", listCartItem)
      // const remove = listCartItem.splice(action.payload, 1)
      // console.log("🚀 ~ file: cart.slice.js ~ line 31 ~ remove", remove)
      state.cartState = {
        ...state.cartState,
        loading: true,
      };
    },
    getTotalBill: (state, action) => {
      const totalBill = state?.cartState?.cart?.reduce?.(
        (cartTotal, cartItem) => (cartTotal += cartItem.total),
        0
      );
      state.cartState.totalBill = totalBill;
    },
    getTotalItem: (state, action) => {
      const cartItem = state?.cartState?.cart?.reduce?.(
        (cartTotal, cartItem) => (cartTotal += cartItem.count),
        0
      );
      state.cartState.cartItem = cartItem;
    },
    deleteCartItemAction: (state, action) => {
      const idCartItem = action.payload;
      const deleteCart = state.cartState.cart.filter(
        (item) => item.id !== idCartItem
      );
      state.cartState.cart = deleteCart;
    },
    paymentAction: (state, action) => {
      state.cartState = {
        ...state.cartState,
        loading: true,
      };
    },
    paymentActionSuccess: (state, action) => {
      notification.success({
        message: `Đặt hàng thành công!`,
      });
      const infoBill = action.payload;
      state.cartState = {
        ...state.cartState,
        bill: infoBill,
        loading: false,
        error: null,
      };
    },
    paymentActionFailed: (state, action) => {
      notification.error({
        message: `Payment failed: ${action.payload}`,
      });
      state.cartState = {
        ...state.cartState,
        loading: false,
        error: action.payload.error,
      };
    },
    fetchOrderAction: (state, action) => {
      state.cartState = {
        ...state.cartState,
        loading: true,
      };
    },
    fetchOrderActionSuccess: (state, action) => {
      const { data } = action.payload;
      state.cartState = {
        ...state.cartState,
        data,
        loading: false,
      };
    },
    fetchOrderActionError: (state, action) => {
      notification.error(action.payload);
    },
    cancelOrderAction: (state, action) => {
      const statusCancel = action.payload;
      state.cartState = {
        ...state.cartState,
        cancelled: statusCancel,
        loading: true,
      };
    },
    cancelOrderSuccessAction: (state, action) => {
      notification.success({
        message: `Bạn đã hủy đơn hàng!`,
      });
      const statusCancel = action.payload;
      state.cartState = {
        ...state.cartState,
        cancelled: statusCancel,
        loading: false,
        error: null,
      };
    },
    cancelOrderFailedAction: (state, action) => {
      notification.error(action.payload);
      state.cartState = {
        ...state.cartState,
        loading: false,
        error: action.payload.error,
      };
    },
  },
});

export const {
  addToCartAction,
  removeCartAction,
  getTotalBill,
  getTotalItem,
  deleteCartItemAction,
  paymentAction,
  paymentActionSuccess,
  paymentActionFailed,
  fetchOrderAction,
  fetchOrderActionSuccess,
  fetchOrderActionError,
  cancelOrderAction,
  cancelOrderSuccessAction,
  cancelOrderFailedAction,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

