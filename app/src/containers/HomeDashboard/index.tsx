import React, { Component } from 'react';
import styles from './index.css';
import { withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';
import Page from '../../components/Page';
import {
  Coin,
  withCoins,
  deleteCoin
} from '../../services/coins';
import CoinTable from '../../components/CoinTable';
import AddCoinSection from '../../components/AddCoinSection';
import HomeOptions from '../../components/HomeOptions';
import {
  HomeDashboardState,
  actions as homeDashboardActions
} from '../../services/home-dashboard/state';
import { GraphQLError } from '../../types/error';

const { HomeDashboard: homeDashboardClass } = styles;

interface HomeDashboardProps {
  coins: Coin[];
  sidebarOpen: boolean;
  addDialogActive: boolean;
  addCoin: Function;
  createCoin: Function;
  closeDialog: Function;
  errors: GraphQLError[];
}

// Redux selectors
const mapStateToProps = ({
  homeDashboard: { sidebarOpen, addDialogActive, errors }
}: {
  homeDashboard: HomeDashboardState;
}) => ({
  sidebarOpen,
  addDialogActive,
  errors
});
const mapDispatchToProps = (
  dispatch: Function
  // merged graphQL and own props
) => {
  const {
    homeDashboard: { addCoin, saveNewCoin, closeDialog }
  } = homeDashboardActions;

  return {
    createCoin: (coin: Coin) => dispatch(saveNewCoin(coin)),
    addCoin: () => dispatch(addCoin()),
    closeDialog: () => dispatch(closeDialog())
  };
};

class HomeDashboard extends Component<
  HomeDashboardProps,
  {}
> {
  constructor(props: HomeDashboardProps) {
    super(props);
    this.state = {
      sidebarOpen: false
    };

    this.renderBody = this.renderBody.bind(this);
    this.renderSidebar = this.renderSidebar.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
  }

  hideSidebar() {
    this.setState({ sidebarOpen: false });
  }

  renderBody() {
    const {
      coins,
      addCoin,
      createCoin,
      closeDialog,
      addDialogActive: active,
      errors
    } = this.props;
    return (
      <div>
        <HomeOptions />
        <CoinTable
          coins={coins}
          remove={deleteCoin}
          toggleSidebar={() => {}}
        />
        <AddCoinSection
          add={addCoin}
          save={createCoin}
          active={active}
          close={closeDialog}
          errors={errors}
        />
      </div>
    );
  }

  renderSidebar() {
    return <div>sidebar</div>;
  }

  render() {
    const { sidebarOpen } = this.props;
    return (
      <Page
        className={homeDashboardClass}
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
)(HomeDashboard);
