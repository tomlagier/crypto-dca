import * as React from 'react';
import styles from './index.css';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { graphql, withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { actions } from '../../services/auth/state';
import gql from 'graphql-tag';

const {
  ['App-header']: appHeader
} = styles;

interface User {
  name: string;
}

interface CurrentUserProps {
  data?: {
    loading?: boolean;
    currentUser?: User;
  };
}

interface HeaderProps {
  user: User;
  client: {
    resetStore: Function
  };
  loading: boolean;
  logIn: Function;
  logOut: Function;
}

const CURRENT_USER = gql`query { currentUser { id name }}`;
const withUser = graphql<Response, CurrentUserProps>(CURRENT_USER, {
  props: ({ data: { loading, currentUser } }: CurrentUserProps) =>
    ({ loading, user: currentUser })
});

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

export class Header extends React.Component<HeaderProps, {}> {
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

        </Navigation>
      </AppBar>
    );
  }
}

export default compose(
  withApollo,
  withUser,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);