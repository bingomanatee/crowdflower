/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';
import AppBar from 'material-ui/lib/app-bar';

const HeaderTheme = require('./headerTheme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import Typography from 'material-ui/lib/styles/typography';

@ThemeDecorator(ThemeManager.getMuiTheme(HeaderTheme))
@withStyles(styles) class Header extends Component {

  constructor() {
    super();

  }

  render() {
    return (
      <AppBar id="layout-header"
              iconElementLeft={<span />}
              zDepth={0}        >
        <div className="layout-header__inner">
          <h1 className="layout-header__title">Welcome to CrowdFlower, you amazing beast!</h1>
          <p>Get familiar with us by creating your first CrowdFlower job</p>
        </div>
      </AppBar>
    );
  }

}

export default Header;
