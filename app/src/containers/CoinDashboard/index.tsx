import * as React from 'react';
import styles from './index.css';
import Header from '../Header';

const {
  App: appClass,
  ['App-intro']: appIntro,
} = styles;

class CoinDashboard extends React.Component {
  render() {
    return (
      <div className={appClass}>
        <Header />
        <p className={appIntro}>
          To get started, do a funky dance.
        </p>
      </div>
    );
  }
}

export default CoinDashboard;
