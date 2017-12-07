import React, { Component } from 'react';
import styles from './index.css';
import { withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { User, withUser } from '../../services/auth';
import AppBody from '../AppBody';
import NavBar from '../NavBar';
import { withRouter } from 'react-router-dom';

const {
  AppContainer: appContainerClass
} = styles;

interface AppContainerProps {
  user: User;
  location: URL;
}

interface AppContainerState {

}

// graphQL query and selector

// Redux selectors
const mapStateToProps = () => ({});
const mapDispatchToProps = (
  dispatch: Function,
  // merged graphQL and own props
) => ({});

class AppContainer extends Component <AppContainerProps, AppContainerState> {
  render() {
    const {
      user,
      location: { pathname },
    } = this.props;

    return (
      <div className={appContainerClass}>
        {user ?
          <div>
            <NavBar path={pathname}/>
            <AppBody />
          </div>   :
          'Log in you putz!'
        }
      </div>
    );
  }
}

export default compose(
  withRouter,
  withApollo,
  withUser,
  connect(mapStateToProps, mapDispatchToProps)
)(AppContainer);
