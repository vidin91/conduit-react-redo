import React from 'react';

export const {Provider, Consumer} = React.createContext({
  apiUrl: 'https://conduit.productionready.io/api'
});

export const withContext = Component => {
  let ret = props => (
    <Consumer>
      {ctx => <Component {...props} {...ctx} />}
    </Consumer>
  );
  ret.displayName = `withContext(${Component.displayName || Component.name || 'Component'})`;
  return ret;
}
