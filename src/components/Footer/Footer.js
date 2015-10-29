/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Footer.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import AppBar from 'material-ui/lib/app-bar';

const FooterTheme = require('./footerTheme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import FlatButton from 'material-ui/lib/flat-button';
const Colors = require('material-ui/lib/styles/colors');

const white = Colors.white;
const buttonLabelStyle = {
  textTransform: 'none',
  color: Colors.grey600,
  fontWeight: 600,
  fontSize: '1rem'
};

@ThemeDecorator(ThemeManager.getMuiTheme(FooterTheme))
@withViewport
@withStyles(styles) class Footer extends Component {

  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired
  };

  render() {

    var buttonStyle = {
      marginRight: '2rem'
    };

    return (
      <AppBar id="layout-footer"
              iconElementLeft={<span />}
              zDepth={0}>
        <div className="layout-footer__inner">
          <FlatButton linkButton={true} backgroundColor={white} labelStyle={buttonLabelStyle} label="Help"
                      style={buttonStyle}/>
          <FlatButton linkButton={true} backgroundColor={white} labelStyle={buttonLabelStyle} label="Email us"
                      style={buttonStyle}/>
          <FlatButton linkButton={true} backgroundColor={white} labelStyle={buttonLabelStyle} label="Upgrade your plan"
                      style={buttonStyle}/>
        </div>
      </AppBar>
    );
  }

}

export default Footer;
