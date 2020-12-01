import { takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { config } from '../../configs';

import {
  getAllUsers,
  getUserById,
  deleteUser,
  switchUserStatus,
  completeAdminRegister,
  registerAdmin,
  validateToken
} from './users.operations';

import {
  setUsers,
  setUser,
  setUserError,
  setUsersLoading,
  deleteUserLocally,
  updateUserLocally
} from './users.actions';

import {
  GET_USERS,
  GET_USER,
  DELETE_USER,
  UPDATE_USER_STATUS,
  REGISTER_ADMIN,
  CONFIRM_ADMIN,
  VALIDATE_TOKEN
} from './users.types';

import { setItemsCount, setPagesCount } from '../table/table.actions';
import { selectUsersAndTable } from '../selectors/users.selectors';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

const {
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS,
  SUCCESS_CREATION_STATUS,
  SUCCESS_CONFIRMATION_STATUS
} = config.statuses;

export function* handleUsersLoad() {
  try {
    yield put(setUsersLoading(true));
    const { usersState, tableState } = yield select(selectUsersAndTable);
    const result = yield call(getAllUsers, usersState, tableState);
    yield put(
      setPagesCount(Math.ceil(result.count / tableState.pagination.rowsPerPage))
    );
    yield put(setItemsCount(result.count));
    yield put(setUsers(result.items));
    yield put(setUsersLoading(false));
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleUserLoad({ payload }) {
  try {
    yield put(setUsersLoading(true));
    const user = yield call(getUserById, payload);
    yield put(setUser(user));
    yield put(setUsersLoading(false));
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleUsersDelete({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(deleteUser, payload);
    yield put(deleteUserLocally(payload));
    yield put(setUsersLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleUserStatusSwitch({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(switchUserStatus, payload);
    yield put(updateUserLocally(payload));
    yield put(setUsersLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleAdminRegister({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(registerAdmin, payload);
    yield put(setUsersLoading(false));
    yield put(push('/users'));
    yield call(handleSuccessSnackbar, SUCCESS_CREATION_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleAdminConfirm({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(completeAdminRegister, payload);
    yield put(setUsersLoading(false));
    yield put(push('/'));
    yield call(handleSuccessSnackbar, SUCCESS_CONFIRMATION_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleTokenValidation({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(validateToken, payload);
    yield put(setUsersLoading(false));
  } catch (err) {
    yield call(handleUsersError, err);
    yield put(push('/'));
  }
}

export function* handleUsersError(e) {
  yield put(setUsersLoading(false));
  yield put(setUserError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* usersSaga() {
  yield takeEvery(GET_USERS, handleUsersLoad);
  yield takeEvery(GET_USER, handleUserLoad);
  yield takeEvery(DELETE_USER, handleUsersDelete);
  yield takeEvery(UPDATE_USER_STATUS, handleUserStatusSwitch);
  yield takeEvery(REGISTER_ADMIN, handleAdminRegister);
  yield takeEvery(CONFIRM_ADMIN, handleAdminConfirm);
  yield takeEvery(VALIDATE_TOKEN, handleTokenValidation);
}
