import React from 'react';
import styles from './index.css';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import { pathFromIndex, indexFromPath } from '../../services/navigation';
import { push } from 'react-router-redux';

const {
  NavBar: navBarClass
} = styles;

interface NavBarProps {
  tabIndex?: number;
  onTabClick?: Function;
  path: string;
}

// graphQL query and selector

// Redux selectors
const mapStateToProps = (
  state = {},
  props: NavBarProps
) => ({
  tabIndex: indexFromPath(props.path),
  ...props
});

const mapDispatchToProps = (
  dispatch: Function,
  // merged graphQL and own props
) => ({
  onTabClick: (index: number) => dispatch(
    push(pathFromIndex(index))
  )
});

const NavBar = ({
  tabIndex,
  onTabClick
}: NavBarProps) => (
  <Tabs
    index={tabIndex}
    onChange={onTabClick}
    className={navBarClass}
  >
    <Tab label="Home"/>
    <Tab label="Wallets"/>
    <Tab label="Transactions"/>
    <Tab label="Portfolio"/>
  </Tabs>
);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);