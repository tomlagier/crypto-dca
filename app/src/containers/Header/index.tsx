import React, { Component } from 'react';
import styles from './index.css';
import Profile from '../../components/Profile';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { connect } from 'react-redux';
import { User, withUser } from '../../services/auth';
import { actions as authActions } from '../../services/auth/state';

import { withApollo, compose } from 'react-apollo';

const {
  ['App-header']: appHeader
} = styles;

interface HeaderProps {
  user: User;
  client: {
    resetStore: Function
  };
  loading: boolean;
  logIn: Function;
  logOut: Function;
}

interface HeaderState {

}

const mapStateToProps = () => ({});

const mapDispatchToProps = (
  dispatch: Function,
  { client: { resetStore } }: HeaderProps
) => ({
  logIn: () => dispatch(authActions.auth.logIn()),
  logOut: () =>
    dispatch(authActions.auth.logOut(resetStore))
});

export class Header extends Component<HeaderProps, HeaderState> {
  render() {
    const {
      user,
      loading,
      logIn,
      logOut
    } = this.props;

    return (
      <div className={appHeader}>
        <AppBar className={appHeader} title="Crypto DCA">
          <Profile
            user={user}
            loading={loading}
            logIn={logIn}
            logOut={logOut}
          />
        </AppBar>
      </div>
    );
  }
}

export default compose(
  withApollo,
  withUser,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);