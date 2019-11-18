export default class ArticleQuery {
  constructor(options) {
    if (!options.apiUrl) {
      throw new Error('ArticleQuery: apiUrl is required option');
    }
    this.options = Object.assign({
      pageSize: 10
    }, options);
    this._cache = new Map();
  }

  async goToPage(page = 0) {
    let {apiUrl, pageSize, authToken} = this.options;
    if (this._cache.has(page)) {
      this._page = page;
      return this._cache.get(page);
    }
    let headers = {
      'content-type': 'application/json'
    };
    if (authToken) {
      headers['Authorization'] = `Token ${authToken}`;
    }
    return fetch(`${apiUrl}/articles?limit=${pageSize}&offset=${page * pageSize}`, {
      headers
    }).then(res => {
      if (res.status !== 200) {
        throw new Error('Something went wrong');
      };
      return res.json();
    }).then(({articles, articlesCount}) => {
      this._page = page;
      this._lastPage = Math.ceil(articlesCount / pageSize);
      return articles;
    });
  }

  get currentPage() {
    return this._page;// || -1;
  }

  get lastPage() {
    return this._lastPage;// || -1;
  }
}
