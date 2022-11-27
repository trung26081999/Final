import { delay, put, takeEvery } from "redux-saga/effects";
import { ProductAPI } from "../../api";
import {
  fetchProductActionAdmin,
  fetchProductActionAdminSuccess,
  fetchProductActionAdminFailed,
  addProductAction,
  addProductFailed,
  addProductSuccess,
  deleteProductAction,
  deleteProductSuccess,
  updateProductAction,
  updateProductFailed,
  updateProductSuccess,
  searchProductActionAdmin,
  searchProductActionAdminSuccess,
  searchProductActionAdminFailed,
  deleteProductFailed,
} from "../slices/admin.product.slice";
import {
  fetchCategoryAction,
  fetchCategoryActionSuccess,
  fetchProductAction,
  fetchProductActionError,
  fetchProductActionSuccess,
  searchProductAction,
  searchProductActionSuccess,
  searchProductActionFailed,
} from "../slices/product.slice";

function* fetchProduct(action) {
  try {
    yield delay(500);
    const { page, limit } = action.payload;
    const response = yield ProductAPI.fetchProduct1(page, limit);
    const productData = response.data;
    const totalProduct = response.headers["x-total-count"];

    yield put(
      fetchProductActionSuccess({
        data: productData,
        totalProduct: totalProduct,
      })
    );
  } catch (error) {
    yield put(fetchProductActionError(error.response.data));
  }
}
function* fetchProductAdmin(action) {
  try {
    yield delay(500);
    // const { page, limit } = action.payload;
    const response = yield ProductAPI.fetchProduct();
    const productData = response.data;
    const totalProduct = response.data.length;
    // const totalProduct = response.headers['x-total-count']

    yield put(
      fetchProductActionAdminSuccess({
        data: productData,
        totalProduct: totalProduct,
      })
    );
  } catch (error) {
    yield put(fetchProductActionAdminFailed(error.response.data));
  }
}

function* searchProduct(action) {
  try {
    const response = yield ProductAPI.searchProductList(action.payload);
    const productData = response.data;
    yield put(
      searchProductActionSuccess({
        search: productData,
      })
    );
  } catch (error) {
    yield put(searchProductActionFailed(error.response.data));
  }
}
function* searchProductAdmin(action) {
  try {
    const response = yield ProductAPI.searchProductList(action.payload);
    const productData = response.data;
    yield put(
      searchProductActionAdminSuccess({
        search: productData,
      })
    );
  } catch (error) {
    yield put(searchProductActionAdminFailed(error.response.data));
  }
}

function* fetchCategory(action) {
  try {
    const response = yield ProductAPI.fetchCategory();
    const category = response.data;
    yield put(
      fetchCategoryActionSuccess({
        category: category,
      })
    );
  } catch (e) {
    yield put(fetchCategoryAction(e.response.data));
  }
}

function* addProductItems(action) {
  try {
    const productItem = action.payload;
    const response = yield ProductAPI.addProduct(productItem);
    yield put(addProductSuccess(response));
  } catch (e) {
    yield put(addProductFailed(e.response.data));
  }
}

function* updateProductItems(action) {
  try {
    const productUpdate = action.payload;
    const responseUpdate = yield ProductAPI.updateProduct(
      productUpdate.id,
      productUpdate
    );
    yield put(updateProductSuccess(responseUpdate.data));
  } catch (e) {
    yield put(updateProductFailed(e.response.data));
  }
}

function* deleteProductItems(action) {
  try {
    const productDelete = action.payload;
    const responseUpdate = yield ProductAPI.deleteProduct(productDelete);
    yield put(deleteProductSuccess(productDelete));
  } catch (e) {
    yield put(deleteProductFailed(e.response.data));
  }
}

export function* productSaga() {
  yield takeEvery(searchProductAction, searchProduct);
  yield takeEvery(searchProductActionAdmin, searchProductAdmin);
  yield takeEvery(fetchCategoryAction, fetchCategory);
  yield takeEvery(fetchProductAction, fetchProduct);
  yield takeEvery(fetchProductActionAdmin, fetchProductAdmin);
  yield takeEvery(addProductAction, addProductItems);
  yield takeEvery(updateProductAction, updateProductItems);
  yield takeEvery(deleteProductAction, deleteProductItems);
}
