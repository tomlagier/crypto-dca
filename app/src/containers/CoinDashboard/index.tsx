import * as React from 'react';
import styles from './index.css';
import Header from '../Header';

const {
  App: appClass
} = styles;

class CoinDashboard extends React.Component {
  render() {
    return (
      <div className={appClass}>
        <Header />

      </div>
    );
  }
}

export default CoinDashboard;
