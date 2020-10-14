import {
  GET_ALL_EMAIL_QUESTIONS,
  SET_ALL_EMAIL_QUESTIONS,
  GET_EMAIL_QUESTION_BY_ID,
  SET_CURRENT_EMAIL_QUESTION,
  MAKE_EMAIL_QUESTION_SPAM,
  ANSWER_TO_EMAIL_QUESTION,
  DELETE_EMAIL_QUESTION,
  SET_EMAIL_QUESTIONS_LOADING,
  SET_EMAIL_QUESTIONS_ERROR,
  SET_EMAIL_QUESTIONS_PENDING_COUNT,
  GET_EMAIL_QUESTIONS_PENDING_COUNT,
  SET_EMAIL_QUESTIONS_PAGES_COUNT,
  SET_EMAIL_QUESTION_CURRENT_PAGE
} from './email-questions.types';

const setAllEmailQuestion = (questionsList) => ({
  type: SET_ALL_EMAIL_QUESTIONS,
  payload: questionsList
});

const getAllEmailQuestions = (filterData) => ({
  type: GET_ALL_EMAIL_QUESTIONS,
  payload: filterData
});

const getEmailQuestionById = (id) => ({
  type: GET_EMAIL_QUESTION_BY_ID,
  payload: id
});

const setCurrentEmailQuestion = (question) => ({
  type: SET_CURRENT_EMAIL_QUESTION,
  payload: question
});

const setEmailQuestionLoading = (loading) => ({
  type: SET_EMAIL_QUESTIONS_LOADING,
  payload: loading
});

const setEmailQuestionsError = (error) => ({
  type: SET_EMAIL_QUESTIONS_ERROR,
  payload: error
});

const makeEmailQuestionSpam = (id) => ({
  type: MAKE_EMAIL_QUESTION_SPAM,
  payload: id
});

const deleteEmailQuestion = (id) => ({
  type: DELETE_EMAIL_QUESTION,
  payload: id
});

const answerToEmailQuestion = (payload) => ({
  type: ANSWER_TO_EMAIL_QUESTION,
  payload
});

const setEmailQuestionsPagesCount = (count) => ({
  type: SET_EMAIL_QUESTIONS_PAGES_COUNT,
  payload: count
});

const setEmailQuestionsCurrentPage = (pageNumber) => ({
  type: SET_EMAIL_QUESTION_CURRENT_PAGE,
  payload: pageNumber
});

const getEmailQuestionsPendingCount = () => ({
  type: GET_EMAIL_QUESTIONS_PENDING_COUNT
});

const setEmailQuestionsPendingCount = (count) => ({
  type: SET_EMAIL_QUESTIONS_PENDING_COUNT,
  payload: count
});

export {
  setAllEmailQuestion,
  getAllEmailQuestions,
  getEmailQuestionById,
  setCurrentEmailQuestion,
  setEmailQuestionLoading,
  setEmailQuestionsError,
  makeEmailQuestionSpam,
  deleteEmailQuestion,
  answerToEmailQuestion,
  setEmailQuestionsPendingCount,
  getEmailQuestionsPendingCount,
  setEmailQuestionsCurrentPage,
  setEmailQuestionsPagesCount
};
