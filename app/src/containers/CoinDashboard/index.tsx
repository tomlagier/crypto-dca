import React, { Component } from 'react';
import styles from './index.css';
import { withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';
import Page from '../../components/Page';
import { Button } from 'react-toolbox/lib/button';
import { withCoins } from '../../services/coins';

const { CoinDashboard: coinDashboardClass } = styles;

interface CoinDashboardProps {
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
    return (
      <div>
        <Button onClick={this.toggleSidebar}>Toggle sidebar</Button>
      </div>
    );
  }

  renderSidebar() {
    return <div>sidebar</div>;
  }

  render() {
    const { sidebarOpen } = this.state;
    console.log(this.props);
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
  connect(mapStateToProps, mapDispatchToProps)
)(CoinDashboard);
