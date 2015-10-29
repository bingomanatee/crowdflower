/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './MenuPage.css';
import withStyles from '../../decorators/withStyles';
import HttpClient from  '../../core/HttpClient';
import FlatButton from 'material-ui/lib/flat-button';
let Colors = require('material-ui/lib/styles/colors');
import TextField from 'material-ui/lib/text-field';
import Dropzone from 'react-dropzone';
import RaisedButton from "material-ui/lib/raised-button";
import Dialog from "material-ui/lib/dialog";

const buttonTheme = require('./buttonTheme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

const white = Colors.white;
const moreLabelStyle = {
  textTransform: 'none',
  color: Colors.blue600,
  fontWeight: 600,
  fontSize: '1rem'
};

const dropStyle2 = {
  width: "5rem",
  height: "3rem"
};

const MAX_LENGTH = 140;

const buttonLabelStyle = {
  textTransform: "none",
  fontSize: '1rem',
  fontWeight: 600
};

@ThemeDecorator(ThemeManager.getMuiTheme(buttonTheme))
class BlueButton extends RaisedButton {

}

@withStyles(styles) class MenuPage extends Component {

  constructor() {
    super();
    this.state = {
      menus: [],
      text: '',
      files: [],
      submitted: false,
      page: 0,
      totalItems: 0
    };
  }

  componentWillMount() {
    this.loadMenus();
  }

  loadMenus(page) {
    if (arguments.length < 1) {
      page = this.state.page;
    }

    HttpClient.get(`/api/menu?page=${page}`)
      .then((data) => {
        console.log('menu data:', data);
        this.setState(data);
      });
  }

  menuItems(menus) {
    var out = menus.map((menu) => {
      const style = {backgroundImage: 'url(/images/' + menu.image + ')'};
      return <div className="menuPage__button">
        <div className="menuPage__button-inner">
          <div className="menuPage__button-inner-panel" style={style}>
          </div>
          <h2>{menu.title}</h2>
        </div>
      </div>;
    });

    while (out.length < 4) {
      out.push(<div className="menuPage__button-shim"/>);
    }

    return out;
  }

  textPrompt() {
    if ((!this.state.text) || (this.state.text.length < 1)) {
      return "enter a description of your requirements. 140 characters maximum."
    }
    else if (this.state.text.length < MAX_LENGTH) {
      return `you have used ${this.state.text.length} of your available ${MAX_LENGTH} characters (${MAX_LENGTH - this.state.text.length} remaining)`
    } else {
      return `YOUR MESSAGE IS TOO LONG. you have used ${this.state.text.length}
      of your available ${MAX_LENGTH} characters. (${ this.state.text.length - MAX_LENGTH} over)`
    }
  }

  cantSubmit() {
    return (!this.state.text) || (this.state.text.length < 1) || (this.state.text.length > MAX_LENGTH);
  }

  menuSections(menus) {
    if (!menus.length) {
      return '';
    }
    const rows = [];
    var menuItems = menus.slice(0);

    while (menuItems.length > 0) {
      let menuSet = menuItems.splice(0, 4);
      rows.push(<nav className="menuPage__row">{this.menuItems(menuSet)}</nav>);
    }

    return rows;
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  onDrop(files) {
    console.log('files: ', files);
    this.setState({files: files});
  }

  clearFiles() {
    this.setState({files: []});
  }

  backButton() {
    if (this.state.page < 1) {
      return '';
    }
    return <FlatButton label="Back" onClick={this.seeLess.bind(this)} labelStyle={buttonLabelStyle}/>;
  }

  onSubmit() {
    this.setState({submitted: true})
  }

  see(offset) {
    var page = this.state.page + offset;

    this.setState({page: page});
    this.loadMenus(page);
  }

  seeMore() {
    this.see(1);
  }

  seeLess() {
    this.see(-1);
  }

  doneSubmit() {

    if (this.refs.dialog) {
      this.refs.dialog.dismiss();
      this.setState({submitted: false});
    }
  }

  nextButton() {
    var endOfSeries = ((1 + this.state.page) * 8);

    if (endOfSeries >= this.state.totalItems) {
      return '';
    }
    return <FlatButton label="See More" onClick={this.seeMore.bind(this)} labelStyle={buttonLabelStyle}/>;
  }

  render() {

    const cantSubmit = this.cantSubmit();
    var files = '';
    var killFileButton = '';

    if (this.state.files && this.state.files.length > 0) {
      files = this.state.files.map((file) => <li>{file.name}</li>);
      files = ( <ul>{files}</ul>);

      killFileButton =
        <RaisedButton label="Clear Files"
                      labelStyle={buttonLabelStyle}
                      onClick={this.clearFiles.bind(this)}/>
    }

    var dialog = '';

    if (this.state.submitted) {
      var dialogButton = <BlueButton
        label="OK"
        primary={true}
        key="raisedButton"
        onClick={this.doneSubmit.bind(this)}
        labelStyle={buttonLabelStyle}/>;
      var dialogActions = [dialogButton];

      dialog = <Dialog title="Content Submitted" actions={dialogActions}
                       ref="dialog"
                       autoDetectWindowHeight={true}
                       openImmediately={true}
                       autoScrollBodyContent={true}>
        <div>Your request has been submitted</div>
      </Dialog>;
    }

    return (<div className="menuPage">
        <h3 className="menuPage__subtitle">What would you like to do?</h3>
        <section className="menuPage__menus">
          {this.menuSections(this.state.menus)}
        </section>
        <section className="menuPage__seeMoreButtons">
          {this.backButton()}
          <div>Viewing {this.state.menus.length} of {this.state.totalItems} items</div>
          {this.nextButton()}
        </section>
        <section className="menuPage__footer">
          <div className="menuPage__footer-links">
            <h3 className="menuPage__subtitle">Need help getting started?</h3>

            <div><FlatButton
              labelStyle={buttonLabelStyle} label="Read help docs" labelStyle={moreLabelStyle}/></div>
            <div><FlatButton
              labelStyle={buttonLabelStyle} label="View example case studies" labelStyle={moreLabelStyle}/></div>
            <div><FlatButton
              labelStyle={buttonLabelStyle} label="Watch training videos" labelStyle={moreLabelStyle}/></div>
          </div>

          <div className="menuPage__form">
            <h3 className="menuPage__subtitle">Don't see what you are looking for?</h3>

            <p>Tell us your data needs -- we'll get back to you with a recommendation</p>

            <div className="menuPage__entry">
            <textarea className="menuPage__field"
                      rows="8"
                      placeholder="describe your data goals in a short summary"
                      value={this.state.text} onChange={this.handleChange.bind(this)}/>

              <p className="menuPage__textPrompt">{this.textPrompt.bind(this)()}</p>

              <h3>Attach a sample of your data (optional)</h3>

              <div className="menuPage__buttons">
                <div className="menuPage__buttons-item">
                  <RaisedButton label="Upload File" onClick={this.onOpenClick.bind(this)}
                                f className="menuPage__buttons-item"
                                labelStyle={buttonLabelStyle}
                                backgroundColor={Colors.grey400}
                                labelColor={Colors.white}/>
                </div>
                <div className="menuPage__buttons-item">
                  <Dropzone ref="dropzone"
                            className="menuPage__dropzone"
                            onDrop={this.onDrop.bind(this)}>
                    <div>Or drop files here.</div>
                  </Dropzone>
                </div>
                <div className="menuPage__buttons-item">
                  {killFileButton}
                </div>
              </div>
              {files}
            </div>


            <div className="menuPage__finalButton-row">
              <BlueButton disabledBackgroundColor={Colors.cyan100}
                          labelStyle={buttonLabelStyle}
                          primary={true}
                          disabled={cantSubmit}
                          onClick={this.onSubmit.bind(this)}
                          label="Send">
              </BlueButton>
            </div>
          </div>
        </section>
        {dialog}
      </div>
    );
  }

}

export default MenuPage;
