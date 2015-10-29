jest.dontMock('../MenuPage');
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
const MenuPage = require('./../MenPageBase');

describe('cantsubmit', () => {

  var menu = TestUtils.renderIntoDocument(<MenuPage />);

  //var menuNode = ReactDOM.findDOMNode(menu);

  expect(menu.state.text).toEqual('');

});
