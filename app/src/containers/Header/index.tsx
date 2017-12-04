import React, { Component } from 'react';
import styles from './index.css';
import Profile from '../../components/Profile';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Navigation } from 'react-toolbox/lib/navigation';
import { connect } from 'react-redux';
import { User, withUser } from '../../services/auth';
import { actions } from '../../services/auth/state';
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
) => {
  return {
    logIn: () => dispatch(actions.auth.logIn()),
    logOut: () =>
      dispatch(actions.auth.logOut(resetStore))
  };
};

export class Header extends Component<HeaderProps, HeaderState> {
  render() {
    const {
      user,
      loading,
      logIn,
      logOut
    } = this.props;

    return (
      <AppBar className={appHeader} title="Crypto DCA">
        <Navigation type="horizontal">
          Some nav goes here
        </Navigation>
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
  connect(mapStateToProps, mapDispatchToProps)
)(Header);