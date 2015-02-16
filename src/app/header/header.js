'use strict';

require('./header.less');

var React = require('react');


var Header = React.createClass({
  render: function() {
    return (
      <header className="header">
        <div className="navbar navbar-inverse">
          <a href="/" className="navbar-brand">HikePlan</a>
          <ul className="nav navbar-nav">
            <li>
              <a onClick={this.props.onClickLoadSampleRoute}>Load sample route</a>
            </li>
          </ul>
        </div>
      </header>
    );
  },
});


module.exports = Header;
