import React from 'react';
import {FETCH_ARTICLES} from '../actions';
import {connect} from 'react-redux';
import {withContext} from '../common/coreContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './home.module.css';
import isEmpty from 'lodash/isEmpty';
import ArticleList from './ArticleList';
import ArticleService from '../common/ArticleService';
import {serializeQuery, deserializeQuery} from '../common/utils';

const mapStateToProps = (state) => ({
  ...state.home,
  isLoading: state.common.isLoading,
  authToken: state.common.user && state.common.user.token || undefined
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({type: FETCH_ARTICLES, payload})
});

class HomePage extends React.Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  // componentWillReceiveProps(nextProps) {
  //   let {history, location, onLoad, authToken} = nextProps;
  //   if (!location.search) {
  //     let params = new URLSearchParams({limit: 10, offset: 0});
  //     history.push(`?${params.toString()}`);
  //   } else if (location.search !== this.props.location.search) {
  //     let params = new URLSearchParams(location.search);
  //     debugger;
  //     onLoad(ArticleService.getAll(params, authToken));
  //   }
  // }

  // New React recommendation - handle network calls in this hook
  componentDidUpdate(prevProps) {
    let {history, location, onLoad, authToken} = this.props;
    if (!location.search) {
      let params = {limit: 10, offset: 0};
      history.push(`?${serializeQuery(params)}`);
    } else if (!prevProps || location.search !== prevProps.location.search) {
      let params = deserializeQuery(location.search);
      onLoad(ArticleService.getAll(params, authToken));
    }
  }

  goToPage = (n) => {
    let params = deserializeQuery(this.props.location.search);
    params.offset = params.limit * n;
    this.props.history.push(`?${serializeQuery(params)}`);
  }

  render() {
    let {isLoading, articles, currentPage, lastPage} = this.props;
    window.myHistory = this.props.history;
    return (
      <div className="homepage">
        {isLoading &&
        <CircularProgress className={styles.progress} />}
        {!isLoading && !isEmpty(articles) &&
        <ArticleList
          articles={articles}
          currentPage={currentPage}
          lastPage={lastPage}
          onGoToPage={this.goToPage} />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withContext(HomePage));
