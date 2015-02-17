'use strict';

require('./header.less');

var React = require('react');


class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="navbar navbar-inverse">
          <a href="/" className="navbar-brand">HikePlan</a>
          <ul className="nav navbar-nav">
            <li><a onClick={this.props.onClickLoadSampleWaypoints}>Load sample</a></li>
            <li><a onClick={this.props.onClickClearWaypoints}>Clear</a></li>
          </ul>
        </div>
      </header>
    );
  }
}


module.exports = Header;
