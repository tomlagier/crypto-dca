import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import {
  Wallet,
  withWallets,
  deleteWallet
} from '../../services/wallets';
import Page from '../../components/Page';
import AddWalletSection from '../../components/AddWalletSection';
import WalletTable from '../../components/WalletTable';
import {
  WalletDashboardState,
  actions as walletDashboardActions
} from '../../services/wallet-dashboard/state';
import { GraphQLError } from '../../types/error';

const { WalletDashboard: walletDashboardClass } = styles;

interface WalletDashboardProps {
  wallets: Wallet[];
  addDialogActive: boolean;
  addWallet: Function;
  createWallet: Function;
  closeDialog: Function;
  errors: GraphQLError[];
}

// graphQL query and selector

// Redux selectors
const mapStateToProps = ({
  walletDashboard: { sidebarOpen, addDialogActive, errors }
}: {
  walletDashboard: WalletDashboardState;
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
    walletDashboard: {
      addWallet,
      saveNewWallet,
      closeDialog
    }
  } = walletDashboardActions;

  return {
    createWallet: (wallet: Wallet) =>
      dispatch(saveNewWallet(wallet)),
    addWallet: () => dispatch(addWallet()),
    closeDialog: () => dispatch(closeDialog())
  };
};

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
    const {
      wallets,
      addWallet,
      createWallet,
      closeDialog,
      addDialogActive: active,
      errors
    } = this.props;

    return (
      <div>
        <WalletTable
          wallets={wallets}
          remove={deleteWallet}
          toggleSidebar={() => {}}
        />
        <AddWalletSection
          add={addWallet}
          save={createWallet}
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
