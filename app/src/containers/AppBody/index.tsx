import React, { Component } from 'react';
import styles from './index.css';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import CoinDashboard from '../CoinDashboard';
import WalletDashboard from '../WalletDashboard';
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group';
import {
  withRouter,
  Switch,
  Route
} from 'react-router-dom';
import {
  paths,
  indexFromPath
} from '../../services/navigation';
import classNames from 'classnames';

const { HOME, WALLETS, TRANSACTIONS, PORTFOLIO } = paths;

const { AppBody: appBodyClass } = styles;

interface AppBodyProps {
  location: any;
}

interface AppBodyState {
  direction: string;
}

// graphQL query and selector

// Redux selectors
const mapStateToProps = (state: AppBodyState) => ({});
const mapDispatchToProps = (
  dispatch: Function
  // merged graphQL and own props
) => ({});

class AppBody extends Component<
  AppBodyProps,
  AppBodyState
> {
  constructor(props: AppBodyProps) {
    super(props);
    this.state = {
      direction: 'left'
    };
  }

  componentWillReceiveProps({
    location: { pathname }
  }: AppBodyProps) {
    const {
      location: { pathname: lastPathname }
    } = this.props;
    const nextIdx = indexFromPath(pathname);
    const lastIdx = indexFromPath(lastPathname);

    const direction =
      lastIdx - nextIdx > 0 ? 'right' : 'left';

    if (direction !== this.state.direction) {
      this.setState({ direction });
    }
  }

  render() {
    const { location } = this.props;
    const { direction } = this.state;

    return (
      <TransitionGroup
        className={classNames(
          appBodyClass,
          styles[direction]
        )}
      >
        <CSSTransition
          key={location.pathname}
          timeout={300}
          classNames="slide"
        >
          <Switch location={location}>
            <Route
              exact={true}
              path={HOME}
              component={CoinDashboard}
            />
            <Route
              path={WALLETS}
              component={WalletDashboard}
            />
            <Route
              path={TRANSACTIONS}
              component={CoinDashboard}
            />
            <Route
              path={PORTFOLIO}
              component={CoinDashboard}
            />
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
