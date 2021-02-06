import {
  SET_COMMENTS_LOADING,
  SET_COMMENTS,
  REMOVE_COMMENT_FROM_STORE,
  SET_COMMENTS_ERROR
  // SET_COMMENTS_CURRENT_PAGE,
  // SET_COMMENTS_PER_PAGE,
  // SET_COMMENTS_PAGES_COUNT
} from './comments.types';

const initialState = {
  list: [],
  comments: null,
  commentsLoading: false,
  commentsError: null
};

export const selectComment = ({ Comments }) => ({
  list: Comments.list,
  loading: Comments.commentsLoading,
  comment: Comments.comment
});

const commentsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_COMMENTS:
    return {
      ...state,
      list: action.payload
    };

  case SET_COMMENTS_LOADING:
    return {
      ...state,
      commentsLoading: action.payload
    };

  case REMOVE_COMMENT_FROM_STORE:
    return {
      ...state,
      list: state.list.filter((item) => item._id !== action.payload)
    };

  case SET_COMMENTS_ERROR:
    return {
      ...state,
      commentsError: action.payload
    };

    /*
  case SET_COMMENTS_CURRENT_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: action.payload - 1
      }
    };

  case SET_COMMENTS_PER_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        commentsPerPage: action.payload
      }
    };

  case SET_COMMENTS_PAGES_COUNT:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        pagesCount: action.payload
      }
    }; */

  default:
    return state;
  }
};

export default commentsReducer;
