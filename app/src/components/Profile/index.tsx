import * as React from 'react';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import { User } from '../../services/auth';
import styles from './index.css';

const {
  Profile: profileClass
} = styles;

interface ProfileProps {
  user: User;
  loading: boolean;
  logIn: Function;
  logOut: Function;
}

const Profile = (
  {
    user,
    loading,
    logIn,
    logOut,
  }: ProfileProps
) => (
  <div className={profileClass}>
    { user ?
      <LoggedIn
        name={user.name}
        onClick={logOut}
      /> :
      <LoggedOut
        loading={loading}
        onClick={logIn}
      /> }
  </div>
);

export default Profile;
