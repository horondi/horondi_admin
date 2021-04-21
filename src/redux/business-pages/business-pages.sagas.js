import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  setBusinessPages,
  setLoading,
  setBusinessPagesError,
  setCurrentBusinessPage,
  removeBusinessPageFromStore
} from './business-pages.actions';
import {
  getAllBusinessPages,
  getBusinessPageById,
  createBusinessPage,
  deleteBusinessPage,
  updateBusinessPage
} from './business-pages.operations';
import {
  ADD_BUSINESS_PAGE,
  DELETE_BUSINESS_PAGE,
  GET_ALL_BUSINESS_PAGES,
  GET_BUSINESS_PAGE_BY_ID,
  UPDATE_BUSINESS_PAGE
} from './business-pages.types';

import { config } from '../../configs';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../snackbar/snackbar.sagas';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleRefreshTokenPair } from '../auth/auth.sagas';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

const { routes } = config;

export function* handleBusinessPagesLoad() {
  try {
    yield put(setLoading(true));
    const businessPages = yield call(getAllBusinessPages);
    yield put(setBusinessPages(businessPages));
    yield put(setLoading(false));
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

export function* handleCurrentBusinessPageLoad({ payload }) {
  try {
    yield put(setLoading(true));
    const businessPage = yield call(getBusinessPageById, payload);
    yield put(setCurrentBusinessPage(businessPage));
    yield put(setLoading(false));
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

export function* handleAddBusinessPage({ payload }) {
  try {
    yield put(setLoading(true));
    const newBusinessPage = yield call(createBusinessPage, payload);
    if (newBusinessPage?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleAddBusinessPage({ payload });
    } else {
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(setLoading(false));
      yield put(push(routes.pathToBusinessPages));
    }
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

export function* handleBusinessPageDelete({ payload }) {
  try {
    yield put(setLoading(true));
    const deletedItem = yield call(deleteBusinessPage, payload);

    if (deletedItem?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleBusinessPageDelete({ payload });
    } else {
      yield put(removeBusinessPageFromStore(payload));
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
      yield put(setLoading(false));
    }
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

export function* handleBusinessPageUpdate({ payload }) {
  try {
    yield put(setLoading(true));
    const updatedPage = yield call(updateBusinessPage, payload);

    if (updatedPage?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleBusinessPageUpdate({ payload });
    } else {
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(setLoading(false));
      yield put(push(routes.pathToBusinessPages));
    }
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

export function* handleBusinessPageError(e) {
  yield put(setLoading(false));
  yield put(setBusinessPagesError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* businessPagesSaga() {
  yield takeEvery(GET_ALL_BUSINESS_PAGES, handleBusinessPagesLoad);
  yield takeEvery(ADD_BUSINESS_PAGE, handleAddBusinessPage);
  yield takeEvery(DELETE_BUSINESS_PAGE, handleBusinessPageDelete);
  yield takeEvery(GET_BUSINESS_PAGE_BY_ID, handleCurrentBusinessPageLoad);
  yield takeEvery(UPDATE_BUSINESS_PAGE, handleBusinessPageUpdate);
}
