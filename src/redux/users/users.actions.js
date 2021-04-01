import {
  GET_USERS,
  SET_USERS,
  GET_USER,
  SET_USER,
  SET_USERS_ERROR,
  SET_USERS_LOADING,
  DELETE_USER,
  DELETE_USER_LOCALLY,
  REGISTER_ADMIN,
  CONFIRM_ADMIN,
  VALIDATE_TOKEN,
  SET_FILTER,
  SET_SORT,
  SET_TAB,
  CLEAR_FILTERS,
  BLOCK_USER,
  UNLOCK_USER
} from './users.types';

const getUsers = (payload) => ({
  type: GET_USERS,
  payload
});

const setUsers = (users) => ({
  type: SET_USERS,
  payload: users
});

const setUsersLoading = (loading) => ({
  type: SET_USERS_LOADING,
  payload: loading
});

const setUser = (payload) => ({
  type: SET_USER,
  payload
});

const getUser = (payload) => ({
  type: GET_USER,
  payload
});

const deleteUser = (payload) => ({
  type: DELETE_USER,
  payload
});

const setUserError = (error) => ({
  type: SET_USERS_ERROR,
  payload: error
});

const deleteUserLocally = (id) => ({
  type: DELETE_USER_LOCALLY,
  payload: id
});

const registerAdmin = (user) => ({
  type: REGISTER_ADMIN,
  payload: user
});

const confirmAdmin = (data) => ({
  type: CONFIRM_ADMIN,
  payload: data
});

const validateToken = (token) => ({
  type: VALIDATE_TOKEN,
  payload: token
});

const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

const clearFilters = () => ({
  type: CLEAR_FILTERS
});

const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort
});

const setTab = (tab) => ({
  type: SET_TAB,
  payload: tab
});
const blockUserByAdmin = (payload) => ({
  type: BLOCK_USER,
  payload
});
const unlockUserByAdmin = (payload) => ({
  type: UNLOCK_USER,
  payload
});

export {
  getUsers,
  setUsers,
  setUser,
  getUser,
  deleteUser,
  setUserError,
  setUsersLoading,
  deleteUserLocally,
  registerAdmin,
  confirmAdmin,
  validateToken,
  setTab,
  setFilter,
  setSort,
  clearFilters,
  blockUserByAdmin,
  unlockUserByAdmin
};
