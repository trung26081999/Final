import { createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd';

export const USER_LIMIT = 10;
const USER_INFO_KEY = 'USER_INFO';

const userInfoFromStorage = localStorage.getItem(USER_INFO_KEY) ? JSON.parse(localStorage.getItem(USER_INFO_KEY)) : null;

const initialState = {
    userInfoState: {
        data: userInfoFromStorage,
        dataUser: [],
        userUpdate:{},
        createAccount: [],
        loading: false,
        error: null,
        search:[],
        pagination: {
            page: 1,
            limit: USER_LIMIT,
            total: null,
            totalPage: null,
          },
    },
}

export const USER_ID = userInfoFromStorage
console.log("🚀 ~ file: user.slice.js ~ line 18 ~ USER_ID", USER_ID)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginAction(state, action) {
            localStorage.removeItem(USER_INFO_KEY)
            state.userInfoState = {
                ...state.userInfoState,
                loading: true,
                
            }
        },
        loginActionSuccess(state, action) {
            notification.success({
                message: `Đăng nhập thành công!`,
            });
            const userInfoResponse = action.payload
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfoResponse))
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                data: userInfoResponse
            }
        },
        loginActionFailed(state, action) {
            notification.error({
                message: `Email hoặc mật khẩu không chính xác!`,
            });
            localStorage.removeItem(USER_INFO_KEY)
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: action.payload.error
            }
        },
        registerAction(state, action) {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true,
            }
        },
        registerActionSuccess(state, action) {
            notification.success({
                message: `Đăng ký thành công!`,
            });
            const userInfoResponse = action.payload;
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                createAccount: userInfoResponse,
                error: null
            }
        },
        registerActionFailed(state, action) {
            notification.error({
                message: `Email đã tồn tại`,
            });
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: action.payload
            }
        },
        logoutAction(state, action) {
            notification.success({
                message: `Đăng xuất thành công!`,
            });
            localStorage.removeItem(USER_INFO_KEY);
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                data: null
            }
        },
        fetchUserAction(state, action)  {
            const {page, limit} = action.payload

            state.userInfoState = {
                ...state.userInfoState,
                loading: true,
                pagination: {
                    ...state.userInfoState.pagination,
                    page,
                    limit,
                  },
            }
        },
        fetchUserActionSuccess(state, action)  {
            const { dataUser, totalUser } = action.payload;
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                dataUser: dataUser,
                pagination: {
                    ...state.userInfoState.pagination,
                    total: +totalUser,
                    totalPage: totalUser / USER_LIMIT,
                  },
            }
        },
        fetchUserActionFailed(state, action) {
            notification.error(action.payload)
        },
        updateUserInfoAction(state, action) {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        updateUserInfoActionSuccess(state, action) {
            notification.success({
                message: `Cập nhật thành công!`,
            });
            const userInfoUpdate = action.payload
            if(userInfoUpdate.id === userInfoFromStorage.id){
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfoUpdate))
            }
            // const newData = state.userInfoState.dataUser.filter(item => item.id !== userInfoUpdate.id)
            state.userInfoState = {
                ...state.userInfoState,
                dataUser: [...state.userInfoState.dataUser],
                userUpdate:userInfoUpdate,
                loading: false
            }
        },
        updateUserInfoActionFailed(state, action) {
            notification.error({
                message: `Cập nhật thất bại!`,
            });
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: action.payload.error
            }
        },
        
        updateUserInfoAction1(state, action) {
            state.userInfoState = {
                ...state.userInfoState,
                loading: true
            }
        },
        updateUserInfoActionSuccess1(state, action) {
            notification.success({
                message: `Cập nhật thành công!`,
            });
            const userInfoUpdate1 = action.payload
            if(userInfoUpdate1.id === userInfoFromStorage.id){
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfoUpdate1))
            }
            // const newData = state.userInfoState.dataUser.filter(item => item.id !== userInfoUpdate.id)
            state.userInfoState = {
                ...state.userInfoState,
                data:userInfoUpdate1,
                loading: false
            }
        },
        updateUserInfoActionFailed1(state, action) {
            notification.error({
                message: `Cập nhật thất bại!`,
            });
            state.userInfoState = {
                ...state.userInfoState,
                loading: false,
                error: action.payload.error
            }
        },
        searchUserAction(state, action) {
            state.userInfoState={
                ...state.userInfoState,
                loading:true
            }
        },
        searchUserActionSuccess(state, action) {
            const data = action.payload
            state.userInfoState = {
                ...state.userInfoState,
                search: data,
                loading:false
            }
        },
        searchUserActionFailed(state, action) {
            notification.error(action.payload)
        },
        deleteUserAction(state, action) {
            state.userInfoState ={
                ...state.userInfoState,
                loading:true
            }
        },
        deleteUserActionSuccess(state, action) {
            notification.success({
                message: `Đã xóa thành công`
            })
            const newDataUser = state.userInfoState.dataUser.filter(item => item.id !== action.payload)
            state.userInfoState ={
                ...state.userInfoState,
                dataUser:newDataUser,
                loading:false
            }
        },
        deleteUserActionFailed(state, action) {
           notification.error({message: `Xóa không thành công`})
        },
        
    },
})

export const { 
    loginAction, loginActionSuccess, loginActionFailed, 
    registerAction, registerActionSuccess, registerActionFailed,logoutAction,
    updateUserInfoAction, updateUserInfoActionSuccess, updateUserInfoActionFailed,
    updateUserInfoAction1, updateUserInfoActionSuccess1, updateUserInfoActionFailed1,
    fetchUserAction, fetchUserActionSuccess, fetchUserActionFailed,
    searchUserAction, searchUserActionSuccess, searchUserActionFailed,
    deleteUserAction, deleteUserActionSuccess,deleteUserActionFailed
} = userSlice.actions
export const userReducer = userSlice.reducer