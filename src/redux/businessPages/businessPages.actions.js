import {
  SET_LOADING,
  SET_BUSINESS_PAGES,
  GET_ALL_BUSINESS_PAGES,
  SET_BUSINESS_PAGES_ERROR,
  ADD_BUSINESS_PAGE
} from './businessPages.types';

const setBusinessPages = (businessPage) => ({
  type: SET_BUSINESS_PAGES,
  payload: businessPage
});

const getAllBusinessPages = (payload) => ({
  type: GET_ALL_BUSINESS_PAGES,
  payload
});

const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

const setBusinessPagesError = (error) => ({
  type: SET_BUSINESS_PAGES_ERROR,
  payload: error
});

const addBusinessPage = (page) => ({
  type: ADD_BUSINESS_PAGE,
  payload: page
});

export {
  setBusinessPages,
  getAllBusinessPages,
  addBusinessPage,
  setLoading,
  setBusinessPagesError
};
