import * as React from 'react';
import { User } from '../../../services/auth';
import { Avatar } from 'react-toolbox/lib/avatar';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import styles from './index.css';

interface LoggedInProps {
  user: User;
  onClick: Function;
}

export default (
  { user: { name, avatar }, onClick }: LoggedInProps
) => {
  const avatarIcon = (
    <Avatar title={name} image={avatar} />
  );
  return (
    <IconMenu
      icon={avatarIcon}
      position="topRight"
      menuRipple={true}
      theme={styles}
    >
      <MenuItem caption="Log out" onClick={onClick}/>
    </IconMenu>
  );
};