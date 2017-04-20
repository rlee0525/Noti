import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import Notifications from '../notifications.json';
import NotiListItem from './noti_list_item';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'github',
      notifcations: {}
    };
  }

  renderTabs() {
    let tabs = Object.keys(Notifications);
    return tabs.map( tab => (
      <div 
        key={Math.random()} 
        onClick={() => this.setState({ tab })} >
        {tab}
      </div>
    ));
  }

  renderNotifcations() {
    let notifications = Notifications[this.state.tab];
    let keys = Object.keys(notifications);

    return keys.map( key => (
      <NotiListItem 
        key={key} 
        noti={key}
        description={notifications[key]} />
    ));
  }

  render() {
    return (
      <div className="relative-content">
        <div className='left'>
          <div className="tab-list">
            {this.renderTabs()}
          </div>
        </div>
        <div className='right'>
          <div className="noti-list">
            <div className='noti-list-header'>
              <h1>{this.state.tab}</h1>
            </div>
            <div className='noti-list-items'>
              {this.renderNotifcations()}
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
