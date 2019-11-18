import {
  FETCH_ARTICLES
} from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        ...action.payload // articles, articlesCount, currentPage, lastPage
      };
    default: return state;
  }
}
