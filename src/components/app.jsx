import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { receiveUser } from '../actions/oauth_actions';
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
          <div className="tab-list-logout"
               onClick={ () => { this.props.logout(); this.props.router.push('/'); } }> LOGOUT </div>
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

App.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(receiveUser(null))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
