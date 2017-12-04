import React, { Component } from 'react';
import styles from './index.css';
import { withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { User, withUser } from '../../services/auth';

const {
  CoinDashboard: coinDashboardClass
} = styles;

interface CoinDashboardProps {
  user: User;
}

interface CoinDashboardState {

}

// graphQL query and selector

// Redux selectors
const mapStateToProps = () => ({});
const mapDispatchToProps = (
  dispatch: Function,
  // merged graphQL and own props
) => ({});

class CoinDashboard extends Component <CoinDashboardProps, CoinDashboardState> {
  render() {
    const {
      user
    } = this.props;

    return (
      <div className={coinDashboardClass}>
        { user ?
          'Okay, I\'ll show you some stuff' :
          'Log in you putz!'
        }
      </div>
    );
  }
}

export default compose(
  withApollo,
  withUser,
  connect(mapStateToProps, mapDispatchToProps)
)(CoinDashboard);
