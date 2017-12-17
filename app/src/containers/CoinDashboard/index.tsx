import React, { Component } from 'react';
import styles from './index.css';
import { withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';
import Page from '../../components/Page';
import { Coin, withCoins, createCoin, deleteCoin } from '../../services/coins';
import CoinTable from '../../components/CoinTable';

const { CoinDashboard: coinDashboardClass } = styles;

interface CoinDashboardProps {
  coins: Coin[];
  createCoin: Function;
  deleteCoin: Function;
}

interface CoinDashboardState {
  sidebarOpen: boolean;
}

// Redux selectors
const mapStateToProps = () => ({});
const mapDispatchToProps = (
  dispatch: Function
  // merged graphQL and own props
) => ({});

class CoinDashboard extends Component<CoinDashboardProps, CoinDashboardState> {
  constructor(props: CoinDashboardProps) {
    super(props);
    this.state = {
      sidebarOpen: false
    };

    this.renderBody = this.renderBody.bind(this);
    this.renderSidebar = this.renderSidebar.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
  }

  toggleSidebar() {
    const { sidebarOpen } = this.state;
    this.setState({ sidebarOpen: !sidebarOpen });
  }

  hideSidebar() {
    this.setState({ sidebarOpen: false });
  }

  renderBody() {
    const { coins, createCoin: add, deleteCoin: remove } = this.props;
    return (
      <CoinTable
        coins={coins}
        add={add}
        remove={remove}
        toggleSidebar={this.toggleSidebar}
      />
    );
  }

  renderSidebar() {
    return <div>sidebar</div>;
  }

  render() {
    const { sidebarOpen } = this.state;
    return (
      <Page
        className={coinDashboardClass}
        body={this.renderBody()}
        sidebarOpen={sidebarOpen}
        sidebar={this.renderSidebar()}
      />
    );
  }
}

export default compose(
  withApollo,
  withCoins,
  createCoin,
  deleteCoin,
  connect(mapStateToProps, mapDispatchToProps)
)(CoinDashboard);
