import * as React from 'react';
import styles from './index.css';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const {
  ['App-header']: appHeader
} = styles;

interface User {
  name: string;
}

interface CurrentUserProps {
  data?: {
    loading?: Boolean;
    currentUser?: User;
  };
}

interface HeaderProps {
  user: User;
  client: {
    resetStore: Function
  };
}

const CURRENT_USER = gql`query { currentUser { id name }}`;
const withUser = (header: any) => withApollo(
  graphql<Response, CurrentUserProps>(CURRENT_USER, {
    props: ({ data: { loading, currentUser } }: CurrentUserProps) => ({ loading, user: currentUser })
  })(header)
);

const logout = (resetStore: Function) => async () => {
  await fetch('http://localhost:8088/logout', {
    method: 'POST',
    credentials: 'include'
  });
  resetStore();
};

export class Header extends React.Component<HeaderProps, {}> {
  render() {
    const {
      user,
      client
    } = this.props;

    return (
      <div className={appHeader}>
        {user ?
          <LoggedIn name={user.name} logout={logout(client.resetStore)} /> :
          <LoggedOut />}
      </div>
    );
  }
}

export default withUser(Header);