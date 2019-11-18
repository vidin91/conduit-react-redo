import querystring from 'querystring'

export function serializeQuery(query) {
  return querystring.stringify(query);
}

export function deserializeQuery(query) {
  if (query.includes('?')) {
    query = query.split('?')[1];
  }
  return querystring.parse(query);
}