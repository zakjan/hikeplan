'use strict';

require('./sidebarBox.less');

var React = require('react');


class SidebarBox extends React.Component {
  render() {
    var className = React.addons.classSet({
      'sidebar-box': true,
      'loading': this.props.loading,
    });

    var loader;
    if (this.props.loading) {
      loader = (
        <div className="sidebar-box-loader">
          <i className="fa fa-circle-o-notch fa-spin fa-4x"></i>
        </div>
      );
    }

    return (
      <div className={className}>
        {loader}
        <div className="sidebar-box-head">
          {this.props.title}
        </div>
        <div className="sidebar-box-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}


module.exports = SidebarBox;
