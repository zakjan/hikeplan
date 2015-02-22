'use strict';

require('./header.less');

var React = require('react');


class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="navbar navbar-inverse">
          <a href="/" className="navbar-brand">HikePlan <sup><small>preview</small></sup></a>
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown">Samples <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a onClick={this.props.onClickLoadSampleWaypoints.bind(this, 0)}>Fagaraš</a></li>
                <li><a onClick={this.props.onClickLoadSampleWaypoints.bind(this, 1)}>Tatry</a></li>
                <li><a onClick={this.props.onClickLoadSampleWaypoints.bind(this, 2)}>Krkonoše</a></li>
                <li><a onClick={this.props.onClickLoadSampleWaypoints.bind(this, 3)}>Jizerky</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}


module.exports = Header;
