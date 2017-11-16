import * as React from 'react';
import styles from './App.css';
import { Button } from 'react-toolbox/lib/button';

const {
  App: appClass,
  ['App-intro']: appIntro,
  ['App-header']: appHeader,
  ['App-logo']: appLogo
} = styles;

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className={appClass}>
        <div className={appHeader}>
          <img src={logo} className={appLogo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={appIntro}>
          To get started, do a funky dance.
          <Button label="Clickus" />
        </p>
      </div>
    );
  }
}

export default App;
