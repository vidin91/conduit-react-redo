import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import styles from './Header.module.css';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  user: state.common.user
});

export class Header extends React.Component {
  render() {
    let {user} = this.props;
    return (
      <AppBar position="static" color="primary">
        <ToolBar>
          <Typography className={styles.header}>
            <div>
              <Button color="inherit">
                <Link to="/" color="inherit" component={RouterLink}>home</Link>
              </Button>
              <Button color="inherit">
                <Link to="/profile" color="inherit" component={RouterLink}>profile</Link>
              </Button>
            </div>
            <div>
            {user &&
              <Button color="inherit">
                <Link to="/logout" color="inherit" component={RouterLink}>logout</Link>
              </Button>}
              {!user &&
              <Button color="inherit">
                <Link to="/login" color="inherit" component={RouterLink}>login</Link>
              </Button>}
            </div>
          </Typography>
        </ToolBar>
      </AppBar>
    )
  }
}

export default connect(mapStateToProps)(Header);
