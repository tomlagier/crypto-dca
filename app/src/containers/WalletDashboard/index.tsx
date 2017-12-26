import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import {
  Wallet,
  withWallets
} from '../../services/wallets';
import Page from '../../components/Page';

const { WalletDashboard: walletDashboardClass } = styles;

interface WalletDashboardProps {
  wallets: Wallet[];
}

interface WalletDashboardState {}

// graphQL query and selector

// Redux selectors
const mapStateToProps = () => ({});
const mapDispatchToProps = (
  dispatch: Function
  // merged graphQL and own props
) => ({});

class WalletDashboard extends Component<
  WalletDashboardProps,
  WalletDashboardState
> {
  constructor(props: WalletDashboardProps) {
    super(props);
    this.renderBody = this.renderBody.bind(this);
    this.renderSidebar = this.renderSidebar.bind(this);
  }
  renderBody() {
    return <div>{this.props.wallets}</div>;
  }
  renderSidebar() {
    return <div>sidebar</div>;
  }
  render() {
    return (
      <Page
        className={walletDashboardClass}
        body={this.renderBody()}
        sidebarOpen={false}
        sidebar={this.renderSidebar()}
      />
    );
  }
}

export default compose(
  withApollo,
  withWallets,
  connect(mapStateToProps, mapDispatchToProps)
)(WalletDashboard);
