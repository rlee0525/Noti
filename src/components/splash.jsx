import React from 'react';
import { connect } from 'react-redux';
import { loginUser, watchGmail } from '../actions/oauth_actions';
import { authenticateGithub } from '../util/client_oauth';
import { fetchNotifications } from '../util/notification_util';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div onClick={fetchNotifications}>Fetch Noti</div>
        <div onClick={this.props.watchGmail}> NOTI GMAIL!</div>
        <div onClick={authenticateGithub}>Github</div>
        NOTI!
        Sign Up.
        <div onClick={this.props.loginUser}>Log In.</div>
        <div onClick={ () => this.props.router.push('/app') }> CLICK ME </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
  loggedIn: Boolean(user)
});

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(loginUser()),
  watchGmail: () => dispatch(watchGmail())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
