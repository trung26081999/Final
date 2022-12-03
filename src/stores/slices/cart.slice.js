import { createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'
import { toast } from 'react-toastify'

export const ORDER_LIMIT = 7

export const CART_ITEM_KEY = 'CART_ITEM'

// const cartInfoFromStorage = localStorage?.getItem(CART_ITEM_KEY)
//   ? JSON.parse(localStorage?.getItem(CART_ITEM_KEY))
//   : []

// console.log(cartInfoFromStorage)

const initialState = {
  cartState: {
    cancelled: '',
    bill: [],
    // cart: cartInfoFromStorage,
    cart: [],
    data: [],
    totalBill: 0,
    totalAmount: 0,
    totalQuantiy: 0,
    cartItem: 0,
    loading: false,
    error: null,
  },
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartAction: (state, action) => {
      const cartItem = action.payload
      // localStorage.setItem(CART_ITEM_KEY, JSON.stringify(cartItem))

      console.log(state.cartState.cart)
      // const cartStorage = JSON.parse(JSON.stringify(state.cartState.cart))
      // console.log(cartStorage)
      // const cart = { ...cartStorage }
      // console.log(cart)
      // const cartArr = [cart]
      // console.log(cartArr)

      // const cartArr = Object.entries(cart)
      // console.log(cartArr)
      // console.log('🚀 ~ file: cart.slice.js ~ line 35 ~ cart', cart)
      console.log('🚀 ~ file: cart.slice.js ~ line 36 ~ cartItem', cartItem)

      const cart = state.cartState.cart

      console.log('🚀 ~ file: cart.slice.js ~ line 35 ~ cart', cart)

      cart.push(cartItem)

      localStorage.setItem(CART_ITEM_KEY, JSON.stringify(cart))

      // state.cartState.cart.push(cartItem)

      // state.cartState = {
      //   ...state.cartState,
      //   cart: cart.push(cartItem),
      // }

      // console.log(state.cartState.cart)
      // state.cartState.cart.push(cartItem)
      // console.log(state.cartState)
    },
    increaseCart: (state, action) => {
      console.log(state.cartState.cart)
      const cart = state.cartState.cart
      const itemIndex = cart?.findIndex((item) => item.id === action.payload.id)

      if (itemIndex >= 0) {
        cart[itemIndex].amount += 1
        toast.success(`Item QTY Increased`)
      }
      localStorage.setItem(CART_ITEM_KEY, JSON.stringify(cart))
    },
    decreaseCart: (state, action) => {
      console.log(state.cartState.cart)
      const cart = state.cartState.cart
      const itemIndex = cart?.findIndex((item) => item.id === action.payload.id)

      if (cart[itemIndex].amount > 1) {
        cart[itemIndex].amount -= 1

        toast.success(`Item QTY Decreased`)
      }
      localStorage.setItem(CART_ITEM_KEY, JSON.stringify(cart))
    },
    removeCartAction: (state, action) => {
      const listCartItem = state.cartState.cart
      console.log(
        '🚀 ~ file: cart.slice.js ~ line 29 ~ listCartItem',
        listCartItem,
      )
      const remove = listCartItem.splice(action.payload, 1)
      console.log('🚀 ~ file: cart.slice.js ~ line 31 ~ remove', remove)
      state.cartState = {
        ...state.cartState,
        cart: remove,
      }
    },
    getTotalBill: (state, action) => {
      const totalBill = state?.cartState?.cart?.reduce?.(
        (cartTotal, cartItem) => (cartTotal += cartItem.total),
        0,
      )
      state.cartState.totalBill = totalBill
    },
    getTotalItem: (state, action) => {
      const cartItem = state?.cartState?.cart?.reduce?.(
        (cartTotal, cartItem) => (cartTotal += cartItem.count),
        0,
      )
      console.log(cartItem)
      console.log(state.cartState.cartItem)
      // localStorage.setItem(
      //   CART_ITEM_KEY,
      //   JSON.stringify(state.cartState.cartItem),
      // )

      state.cartState.cartItem = cartItem
    },
    getTotalAmount(state, action) {
      console.log(state.cartState.cart)
      const totalAmount = state?.cartState?.cart?.reduce?.(
        (cartTotal, cartItem) => (cartTotal += cartItem.total),
        0,
      )
      console.log(totalAmount)
      state.cartState.totalAmount = totalAmount
    },
    deleteCartItemAction: (state, action) => {
      const idCartItem = action.payload
      const deleteCart = state.cartState.cart.filter(
        (item) => item.id !== idCartItem,
      )
      state.cartState.cart = deleteCart
    },
    clearCart: (state, aciton) => {
      localStorage.removeItem(CART_ITEM_KEY)
      // state.cartState.data = []
      state.cartState = initialState
      toast.error('Cart cleared', { position: 'bottom-left' })
    },
    paymentAction: (state, action) => {
      state.cartState = {
        ...state.cartState,
        loading: true,
      }
    },
    paymentActionSuccess: (state, action) => {
      notification.success({
        message: `Đặt hàng thành công!`,
      })
      const infoBill = action.payload
      state.cartState = {
        ...state.cartState,
        bill: infoBill,
        loading: false,
        error: null,
      }
    },
    paymentActionFailed: (state, action) => {
      notification.error({
        message: `Payment failed: ${action.payload}`,
      })
      state.cartState = {
        ...state.cartState,
        loading: false,
        error: action.payload.error,
      }
    },
    fetchOrderAction: (state, action) => {
      state.cartState = {
        ...state.cartState,
        loading: true,
      }
    },
    fetchOrderActionSuccess: (state, action) => {
      const { data } = action.payload
      state.cartState = {
        ...state.cartState,
        data,
        loading: false,
      }
    },
    fetchOrderActionError: (state, action) => {
      notification.error(action.payload)
    },
    cancelOrderAction: (state, action) => {
      const statusCancel = action.payload
      state.cartState = {
        ...state.cartState,
        cancelled: statusCancel,
        loading: true,
      }
    },
    cancelOrderSuccessAction: (state, action) => {
      notification.success({
        message: `Bạn đã hủy đơn hàng!`,
      })
      const statusCancel = action.payload
      state.cartState = {
        ...state.cartState,
        cancelled: statusCancel,
        loading: false,
        error: null,
      }
    },
    cancelOrderFailedAction: (state, action) => {
      notification.error(action.payload)
      state.cartState = {
        ...state.cartState,
        loading: false,
        error: action.payload.error,
      }
    },
  },
})

export const {
  addToCartAction,
  removeCartAction,
  increaseCart,
  decreaseCart,
  getTotalBill,
  getTotalAmount,
  getTotalItem,
  deleteCartItemAction,
  clearCart,
  paymentAction,
  paymentActionSuccess,
  paymentActionFailed,
  fetchOrderAction,
  fetchOrderActionSuccess,
  fetchOrderActionError,
  cancelOrderAction,
  cancelOrderSuccessAction,
  cancelOrderFailedAction,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer
