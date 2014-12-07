'use strict';

var SidebarBox = React.createClass({
  render: function() {
    return (
      <div className="sidebar-box">
        <div className="sidebar-box-head">
          {this.props.title}
        </div>
        <div className="sidebar-box-body">
          {this.props.children}
        </div>
      </div>
    );
  },
});
