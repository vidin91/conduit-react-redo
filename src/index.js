import React from 'react';
import ReactDOM from 'react-dom';
import store, {history} from './store';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {Switch, Route, Redirect} from 'react-router-dom';

import HomePage from './home/HomePage';
import ProfilePage from './profile';
import Header from './common/Header';
import LoginPage from './login/LoginPage';
import LogoutPage from './logout/LogoutPage';

const Main = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Header />
        <Switch>
          <Route path="/home/:feed?" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Main />, document.querySelector('#root'));