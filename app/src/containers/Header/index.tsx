import React, { Component } from 'react';
import styles from './index.css';
import Profile from '../../components/Profile';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import { connect } from 'react-redux';
import { User, withUser } from '../../services/auth';
import { actions as authActions } from '../../services/auth/state';
import { pathFromIndex, indexFromPath } from '../../services/navigation';
import { push } from 'react-router-redux';

import { withApollo, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

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
  tabIndex: number;
  onTabClick: Function;
  location: URL;
}

interface HeaderState {

}

const mapStateToProps = (
  state = {},
  { location: { pathname } }: { location: URL }
) => ({
  tabIndex: indexFromPath(pathname)
  });

const mapDispatchToProps = (
  dispatch: Function,
  { client: { resetStore } }: HeaderProps
) => {
  return {
    logIn: () => dispatch(authActions.auth.logIn()),
    logOut: () =>
      dispatch(authActions.auth.logOut(resetStore)),
    onTabClick: (index: number) =>
      dispatch(
        push(pathFromIndex(index))
      )
  };
};

export class Header extends Component<HeaderProps, HeaderState> {
  render() {
    const {
      user,
      loading,
      logIn,
      logOut,
      tabIndex,
      onTabClick
    } = this.props;

    return (
      <AppBar className={appHeader} title="Crypto DCA">
        <Tabs index={tabIndex} onChange={onTabClick}>
          <Tab label="Home"/>
          <Tab label="Wallets"/>
          <Tab label="Transactions"/>
          <Tab label="Portfolio"/>
        </Tabs>
        <Profile
          user={user}
          loading={loading}
          logIn={logIn}
          logOut={logOut}
        />
      </AppBar>
    );
  }
}

export default compose(
  withApollo,
  withUser,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);