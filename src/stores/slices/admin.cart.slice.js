import { notification } from "antd"

const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    cartState:{
        data: [],
        lengthStatus:null,
        loading:false,
        error:null
    }
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        fetchOrderAdminAction: (state, action) => {
            state.cartState = {
                ...state.cartState,
                loading: true,
            }
		},
        fetchOrderAdminSuccess: (state, action) => {
            const {data} = action.payload
            state.cartState = {
                ...state.cartState,
                data,
                loading: false,
            }
		},
        fetchOrderAdminError: (state, action) => {
            notification.error(action.payload)
		},
        ConfirmOrderAction:(state, action) => {
            const lengthStatus = state.cartState.data.filter(item => item.status === action.payload.status).length
            state.cartState = {...state.cartState,
                lengthStatus,
                loading:true}
        },
        ConfirmOrderSeccess:(state, action) => {
            state.cartState = {
                ...state.cartState,
                lengthStatus: state.lengthStatus + 1,
                loading:false,
            }
        },
        ConfirmOrderFailded:(state, action) => {
            notification.error(action.payload)
        },
        
    }
})

export const {fetchOrderAdminAction,fetchOrderAdminSuccess,fetchOrderAdminError,ConfirmOrderAction,ConfirmOrderSeccess,ConfirmOrderFailded} =  cartSlice.actions;

export const adminCartReducer = cartSlice.reducer;