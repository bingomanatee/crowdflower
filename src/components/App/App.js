/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Footer from '../Footer';

@withContext
@withStyles(styles)
class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  render() {
    return !this.props.error ? (
      <div id="layout__wrapper">
        <Header id="layout__head" />
        <div id="layout__main">
        {this.props.children}
        </div>
        <Footer id="layout__footer" />
      </div>
    ) : this.props.children;
  }

}

export default App;
