import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'react-redux';
import Page from '../../components/Page';

const { WalletDashboard: walletDashboardClass } = styles;

interface WalletDashboardProps {}

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
    return <div>some snizz</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(
  WalletDashboard
);
