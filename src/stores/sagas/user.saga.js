import {
    delay,
    put,
    takeEvery
} from 'redux-saga/effects'
import { loginAction, 
    loginActionFailed, 
    loginActionSuccess,
    registerAction,
    registerActionFailed,
    registerActionSuccess,
    updateUserInfoAction,
    updateUserInfoActionFailed,
    updateUserInfoActionSuccess,
    updateUserInfoAction1, updateUserInfoActionSuccess1, updateUserInfoActionFailed1,
    fetchUserAction, fetchUserActionSuccess, fetchUserActionFailed,
    searchUserAction, searchUserActionSuccess, searchUserActionFailed,
     deleteUserActionSuccess, deleteUserActionFailed, deleteUserAction
} from '../slices/user.slice.js';
import { AuthAPI, UserAPI } from '../../api';

function* login(action) {
    try {
        const loginPayload = action.payload
        const response = yield AuthAPI.login({
            email: loginPayload.email,
            password: loginPayload.password,
        });
        yield put(loginActionSuccess(response.data.user));
    } catch (e) {
        yield put(loginActionFailed(e.response.data));
    }
}

function* register(action) {
    try {
        const registerPayload = action.payload
        const response = yield AuthAPI.register({
            email: registerPayload.email,
            password: registerPayload.password,
        });
        yield put(registerActionSuccess(response.data.user));
    } catch (e) {
        yield put(registerActionFailed(e.response.data));
    }
}

function* fetchUser(action) {
    try {
        yield delay(400)
        const {page, limit} = action.payload
        const response = yield UserAPI.getUser(page, limit);
        const dataUser = response.data;
        const totalUser = response.headers['x-total-count']
        yield put(fetchUserActionSuccess({dataUser:dataUser, totalUser:totalUser}))
    } catch (e) {
        put(fetchUserActionFailed(e.response.data))
    }
}

function* updateUser(action) {
    try {
        const updateUserInfo = action.payload;
        const response = yield UserAPI.updateUser(updateUserInfo.id,updateUserInfo.data)
        yield put(updateUserInfoActionSuccess(response.data))
    } catch (e) {
        yield put(updateUserInfoActionFailed(e.response.data))
    }
}
function* updateUser1(action) {
    try {
        const updateUserInfo = action.payload;
        const response = yield UserAPI.updateUser(updateUserInfo.id,updateUserInfo.data)
        yield put(updateUserInfoActionSuccess1(response.data))
    } catch (e) {
        yield put(updateUserInfoActionFailed1(e.response.data))
    }
}
// function* updateUser1(action) {
//     try {
//         const updateUserInfo = action.payload
//         const response = yield UserAPI.updateUser({
//             name: updateUserInfo.values.name,
//             email: updateUserInfo.values.email,
//             phone: updateUserInfo.values.phone,
//             address: updateUserInfo.values.address,
//             decentralization: updateUserInfo.decentralization
//         }, updateUserInfo.userID)
//         yield put(updateUserInfoActionSuccess(response.data))
//     } catch (error) {
//         yield put(updateUserInfoActionFailed(error.response))
//     }
// }
function* searchUser(action) {
    try {
        const value = action.payload;
        const response = yield UserAPI.searchUser(value);
        const data =response.data;
        yield put(searchUserActionSuccess(data))
    } catch (e) {
        yield put(searchUserActionFailed(e.response.data))
    }
}

function* deleteUser(action){
    try {
        const userId = action.payload;
        const response = yield UserAPI.deleteUser(userId);
        yield put(deleteUserActionSuccess(userId))
    } catch (e) {
        yield put(deleteUserActionFailed(e.response.data))
    }
}
export function* userSaga() {
    yield takeEvery(registerAction, register);
    yield takeEvery(loginAction, login);
    yield takeEvery(updateUserInfoAction1, updateUser1)
    yield takeEvery(updateUserInfoAction, updateUser);
    yield takeEvery(fetchUserAction, fetchUser);
    yield takeEvery(searchUserAction, searchUser);
    yield takeEvery(deleteUserAction, deleteUser)
}