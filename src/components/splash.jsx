import React from 'react';
import { connect } from 'react-redux';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        NOTI!
        Sign Up.
        Log In.
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
  // receiveQuery: query => dispatch(receiveQuery(query)),
  // loginUser: () => dispatch(loginUser()),
  // logout: () => dispatch(receiveUser(null))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
