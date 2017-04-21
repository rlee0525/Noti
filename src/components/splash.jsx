import React from 'react';
import { connect } from 'react-redux';
import { loginUser, watchGmail } from '../actions/oauth_actions';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div onClick={this.props.watchGmail}> NOTI GMAIL!</div>
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
