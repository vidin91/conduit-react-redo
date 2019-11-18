import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {LOGOUT} from '../actions';

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch({type: LOGOUT})
});

class LogoutPage extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return (
      <div>
        <Redirect to="/login" />
      </div>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(LogoutPage);
