import React, { Component } from 'react';
import styles from './index.css';
import { withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';
import Page from '../../components/Page';

const {
  CoinDashboard: coinDashboardClass
} = styles;

interface CoinDashboardProps {

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
    return (
      <Page
        className={coinDashboardClass}
        body={'coinDashboard body'}
        sidebarOpen={false}
      />
    );
  }
}

export default compose(
  withApollo,
  connect(mapStateToProps, mapDispatchToProps)
)(CoinDashboard);
