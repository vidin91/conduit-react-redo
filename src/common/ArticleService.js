import isEqual from 'lodash/isEqual';
import {serializeQuery} from './utils';

export class ArticleService {
  constructor() {
    this.apiUrl = 'https://conduit.productionready.io/api';
    this._oldFilters = {};
    this._cache = new Map();
  }

  async getAll(filters, token = null) {
    let {limit, offset} = filters;
    let page = Math.round(offset / limit);
    if (
      this.shouldInvalidate(this._oldFilters, filters) ||
      this._oldToken !== token
    ) {
      this._cache = new Map();
    }
    this._oldFilters = filters;
    this._oldToken = token;

    if (this._cache.has(page)) {
      return this._cache.get(page);
    }

    let headers = {
      'content-type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    let search = serializeQuery(filters);

    return fetch(`${this.apiUrl}/articles?${search}`, {
      headers
    }).then(res => {
      if (res.status !== 200) {
        throw new Error('Something went wrong');
      };
      return res.json();
    }).then(res => {
      let ret = {
        ...res,
        currentPage: page,
        lastPage: Math.ceil(res.articlesCount / filters.limit)
      }
      this._cache.set(page, ret);
      return ret;
    });
  }

  shouldInvalidate(oldFilters, newFilters) {
    oldFilters = {...oldFilters};
    newFilters = {...newFilters};
    delete oldFilters.offset;
    delete newFilters.offset;
    return !isEqual(oldFilters, newFilters);
  }
}

export default new ArticleService();
