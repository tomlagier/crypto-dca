import React, { Component } from 'react';
import styles from './index.css';
import { withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';
import Page from '../../components/Page';
import { Button } from 'react-toolbox/lib/button';
import { Coin, withCoins, createCoin, deleteCoin } from '../../services/coins';

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
    const { coins } = this.props;
    return (
      <div>
        {coins && coins.map(coin => (
          <div key={coin.id}>
            <span>Name: {coin.name}</span>
            <span>Code: {coin.code}</span>
            <Button onClick={() => this.props.deleteCoin({ id: coin.id })}>
              Delete
            </Button>
          </div>
        ))}
        <Button
          onClick={() =>
            this.props.createCoin({
              name: 'Test',
              code: 'TEST'
            })
          }
        >
          Add a coin
        </Button>
        <Button onClick={this.toggleSidebar}>Toggle sidebar</Button>
      </div>
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
