import React, { Component } from 'react';
import styles from './index.css';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import CoinDashboard from '../CoinDashboard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter, Switch, Route } from 'react-router-dom';
import { paths } from '../../services/navigation';

const {
  HOME,
  WALLETS,
  TRANSACTIONS,
  PORTFOLIO
} = paths;

const {
  AppBody: appBodyClass
} = styles;

interface AppBodyProps {
  location: URL;
}

interface AppBodyState {

}

// graphQL query and selector

// Redux selectors
const mapStateToProps = () => ({});
const mapDispatchToProps = (
  dispatch: Function,
  // merged graphQL and own props
) => ({});

class AppBody extends Component <AppBodyProps, AppBodyState> {
  render() {
    const { pathname } = location;
    return (
      <TransitionGroup className={appBodyClass}>
        <CSSTransition
          key={pathname}
          timeout={300}
          classNames="slide"
          appear={true}
        >
          <Switch>
            <Route exact={true} path={HOME} component={CoinDashboard} />
            <Route path={WALLETS} component={CoinDashboard} />
            <Route path={TRANSACTIONS} component={CoinDashboard} />
            <Route path={PORTFOLIO} component={CoinDashboard} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default compose(
  withRouter,
  // graphql selector
  connect(mapStateToProps, mapDispatchToProps)
)(AppBody);
